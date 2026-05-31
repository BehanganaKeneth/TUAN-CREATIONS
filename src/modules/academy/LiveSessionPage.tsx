import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Select from "react-select";
import countryList from "react-select-country-list";
import { Globe, X } from "lucide-react";
import { io, type Socket } from "socket.io-client";
import { getApiOrigin, getCourses, getLiveSession, getStoredToken, joinLiveSession, recordAction, startRecording, stopRecording, type Course, type SessionMeta } from "../../services/api";
import { useAuth } from "../../store/auth";
import BackButton from "../../components/BackButton";

type Role = "instructor" | "co-instructor" | "student" | "admin";

type User = {
  id: string;
  name: string;
  role: Role;
  isOnline?: boolean;
  isSpeaking?: boolean;
};

type ChatMessage = {
  id: string | number;
  senderId?: string;
  senderName: string;
  text: string;
  time: string;
  isInstructor?: boolean;
};

export default function LiveSessionPage() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const selectedCourseId = Number(searchParams.get("courseId"));
  const [courseCatalog, setCourseCatalog] = useState<Course[]>([]);

  // ----- demo/local state -----
  const [session, setSession] = useState<SessionMeta | null>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(true);

  const [participants, setParticipants] = useState<User[]>([]);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const socketRef = useRef<Socket | null>(null);

  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isRecordingLoading, setIsRecordingLoading] = useState(false);

  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isRealtimeConnected, setIsRealtimeConnected] = useState(false);
  const [usersTyping, setUsersTyping] = useState<Set<string>>(new Set());
  const typingTimeoutRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  // ----- Notification subscription -----
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState<{ label: string; value: string } | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showSubscribeOverlay, setShowSubscribeOverlay] = useState(true);

  const countries = useMemo(() => countryList().getData(), []);

  const showToast = useCallback((type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const subscribeNotifications = useCallback(() => {
    if (!email || !phoneNumber || !countryCode) {
      showToast("error", "Please fill all fields");
      return;
    }
    recordAction("live.subscribe", {
      courseId: selectedCourseId,
      email,
      phone: `${countryCode.value}${phoneNumber}`,
    }).catch(() => null);
    showToast("success", "Subscribed for live notifications!");
    setShowSubscribeOverlay(false);
  }, [email, phoneNumber, countryCode, showToast, selectedCourseId]);

  // ----- Chat -----
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setIsLoadingSession(true);
      try {
        const normalizedCourseId = Number.isNaN(selectedCourseId) ? 1 : selectedCourseId;

        if (user) {
          await joinLiveSession(normalizedCourseId);
        }

        const [catalog, liveSession] = await Promise.all([
          getCourses(),
          getLiveSession(normalizedCourseId),
        ]);

        if (!isMounted) return;

        setCourseCatalog(catalog);
        setSession(liveSession);
        setParticipants(
          (liveSession.participants ?? []).map((participant) => ({
            id: participant.id,
            name: participant.name,
            role: participant.role as Role,
            isOnline: participant.isOnline,
            isSpeaking: participant.isSpeaking,
          }))
        );
        setChatMessages(
          (liveSession.chatMessages ?? []).map((message) => ({
            id: message.id,
            senderId: message.senderId,
            senderName: message.senderName,
            text: message.text,
            time: message.time,
            isInstructor: message.isInstructor,
          }))
        );
      } catch {
        if (!isMounted) return;
        showToast("error", user ? "Unable to join this live room. Enroll first from Academy." : "Sign in and enroll before joining live sessions.");
      }

      if (!isMounted) return;
      setIsLoadingSession(false);
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [selectedCourseId, showToast, user]);

  const selectedCourse = useMemo(() => {
    if (Number.isNaN(selectedCourseId)) {
      return courseCatalog[0];
    }

    return courseCatalog.find((course) => course.id === selectedCourseId) ?? courseCatalog[0];
  }, [courseCatalog, selectedCourseId]);

  useEffect(() => {
    if (!selectedCourse || session) return;
    setSession((prev) =>
      prev
        ? {
            ...prev,
            title: selectedCourse.title,
            instructor: selectedCourse.instructor,
          }
        : prev
    );
  }, [selectedCourse, session]);

  useEffect(() => {
    const token = getStoredToken();
    const courseId = Number.isNaN(selectedCourseId) ? selectedCourse?.id : selectedCourseId;

    if (!session || !courseId) {
      return;
    }

    // Socket.IO requires authentication in production
    if (!token) {
      console.warn("[Socket] No auth token available - socket features disabled");
      showToast("error", "Please sign in to use real-time chat features");
      return;
    }

    const socket = io(getApiOrigin(), {
      transports: ["websocket"],
      auth: { token },
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });

    socketRef.current = socket;
    const typingTimeouts = typingTimeoutRef.current;

    const mergeRoomState = (nextSession: SessionMeta) => {
      setSession((current) => ({
        ...(current ?? nextSession),
        ...nextSession,
      }));
      setParticipants(nextSession.participants ?? []);
      setChatMessages(nextSession.chatMessages ?? []);
    };

    socket.on("connect", () => {
      console.log("[Socket] Connected with ID:", socket.id);
      setIsRealtimeConnected(true);
      socket.emit("live:join", { courseId });
    });

    socket.on("live:room-state", (nextSession: SessionMeta) => {
      mergeRoomState(nextSession);
    });

    socket.on("live:participant-joined", (participant: User) => {
      setParticipants((current) => {
        const next = current.filter((entry) => entry.id !== participant.id);
        return [...next, participant];
      });
    });

    socket.on("live:participant-left", ({ userId }: { userId: string }) => {
      setParticipants((current) => current.filter((entry) => entry.id !== userId));
    });

    socket.on("live:participants", (nextParticipants: User[]) => {
      setParticipants(nextParticipants);
    });

    socket.on("live:chat-message", (message: ChatMessage) => {
      setChatMessages((current) => {
        if (current.some((entry) => entry.id === message.id)) {
          return current;
        }
        return [...current, message];
      });
    });

    socket.on("live:user-typing", ({ userId, isTyping }: { userId: string; isTyping: boolean }) => {
      setUsersTyping((current) => {
        const next = new Set(current);
        if (isTyping) {
          next.add(userId);
        } else {
          next.delete(userId);
        }
        return next;
      });

      // Clear typing timeout
      const existingTimeout = typingTimeoutRef.current.get(userId);
      if (existingTimeout) clearTimeout(existingTimeout);

      // Auto-clear typing indicator after 3 seconds if not updated
      if (isTyping) {
        const timeout = setTimeout(() => {
          setUsersTyping((current) => {
            const next = new Set(current);
            next.delete(userId);
            return next;
          });
        }, 3000);
        typingTimeoutRef.current.set(userId, timeout);
      }
    });