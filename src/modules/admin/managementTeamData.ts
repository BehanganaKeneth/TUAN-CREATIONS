export type ManagementTeamMember = {
  id: string;
  name: string;
  position: string;
  nationality: string;
  occupation: string;
  photo: string;
  description: string;
  experience: string[];
  email: string;
  phone: string;
  linkedin?: string;
  twitter?: string;
};

export const MANAGEMENT_TEAM_STORAGE_KEY = "tuan_management_team";

const avatarPalette = ["#1f2937", "#0f766e", "#92400e", "#1d4ed8", "#7c3aed", "#be123c", "#0f172a", "#166534", "#b45309"];

function withEngineeringPrefix(name: string, occupation: string) {
  if (!occupation.toUpperCase().includes("ENGINEER")) return name;
  return name.startsWith("ENG.") ? name : `ENG. ${name}`;
}

function createFacelessAvatar(seed: string, accent: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" role="img" aria-label="Faceless profile avatar">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#e5e7eb" />
          <stop offset="100%" stop-color="#cbd5e1" />
        </linearGradient>
      </defs>
      <rect width="256" height="256" rx="32" fill="url(#g)" />
      <circle cx="128" cy="104" r="42" fill="#94a3b8" opacity="0.95" />
      <path d="M64 214c14-38 41-58 64-58s50 20 64 58" fill="#64748b" opacity="0.95" />
      <circle cx="92" cy="88" r="10" fill="${accent}" opacity="0.9" />
      <circle cx="164" cy="88" r="10" fill="${accent}" opacity="0.9" />
      <path d="M104 120c10 8 38 8 48 0" fill="none" stroke="#475569" stroke-width="10" stroke-linecap="round" />
      <text x="18" y="238" font-family="Arial, sans-serif" font-size="16" fill="#334155" opacity="0.4">${seed}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export const DEFAULT_MANAGEMENT_TEAM: ManagementTeamMember[] = [
  {
    id: "behangana-keneth",
    name: "ENG. BEHANGANA KENETH",
    position: "CHAIRMAN B.O.D",
    nationality: "Ugandan",
    occupation: "SOFTWARE ENGINEER",
    photo: createFacelessAvatar("BK", avatarPalette[0]),
    description: "Chairman of the Board providing strategic oversight, governance, and stakeholder relations.",
    experience: ["Board governance", "Strategic oversight", "Stakeholder engagement"],
    email: "grandeekeneth@gmail.com",
    phone: "+256 753 414 058",
    linkedin: "https://www.linkedin.com/",
    twitter: "https://twitter.com/",
  },
  {
    id: "nakimuli-hanifah",
    name: "NAKIMULI HANIFAH",
    position: "CHIEF COMMERCIAL STRATEGIST B.O.D",
    nationality: "Ugandan",
    occupation: "ACCOUNTANT",
    photo: createFacelessAvatar("NH", avatarPalette[1]),
    description: "Leads commercial strategy, partnerships, and revenue development for the company, and provides compliance and tax optimization advisory.",
    experience: ["Commercial strategy", "Partnership development", "Revenue growth", "Compliance & tax optimization advisory"],
    email: "hanifahnakimuli95@gmail.com",
    phone: "+256 706 965 504",
    linkedin: "https://www.linkedin.com/",
    twitter: "https://twitter.com/",
  },
  {
    id: "butera-marcel",
    name: "ENG. BUTERA MARCEL",
    position: "SOFTWARE DEVELOPMENT LEAD",
    nationality: "Congolese",
    occupation: "SOFTWARE ENGINEER",
    photo: createFacelessAvatar("BM", avatarPalette[2]),
    description: "Leads the software engineering team and the development of the company's digital products.",
    experience: ["Product architecture", "Engineering leadership", "Quality assurance"],
    email: "buteramarcel@gmail.com",
    phone: "+256 783 858 472",
    linkedin: "https://www.linkedin.com/",
    twitter: "https://twitter.com/",
  },
  {
    id: "ofwono-godwin",
    name: "ENG. OFWONO GODWIN",
    position: "HEAD OF MARKETING AND SALES",
    nationality: "Ugandan",
    occupation: "SOFTWARE ENGINEER",
    photo: createFacelessAvatar("OG", avatarPalette[3]),
    description: "Directs marketing strategy, brand development, and sales operations to grow the business.",
    experience: ["Marketing strategy", "Brand management", "Sales enablement"],
    email: "godwinofwono933@gmail.com",
    phone: "+256 757 013 189",
    linkedin: "https://www.linkedin.com/",
    twitter: "https://twitter.com/",
  },
  {
    id: "nuwahereza-peter",
    name: "ENG. NUWAHEREZA PETER",
    position: "ASSISTANT TECH LEAD",
    nationality: "Ugandan",
    // retained as developer but not shown publicly in this default set
    photo: createFacelessAvatar("NP", avatarPalette[4]),
    description: "Assists technical leadership by supporting engineering operations, deployments, and infrastructure.",
    experience: ["Engineering operations support", "Deployment coordination", "Technical troubleshooting"],
    email: "nuwaherezapeter34@gmail.com",
    phone: "+256 779 081 600",
    linkedin: "https://www.linkedin.com/",
    twitter: "https://twitter.com/",
    occupation: "SOFTWARE ENGINEER",
  },
  {
    id: "nakiyingi-irene",
    name: "DR. IRENE NAKIYINGI",
    position: "HEAD OF OPERATIONS & EXECUTIVE DIRECTOR (C.E.O)",
    nationality: "Ugandan",
    occupation: "MEDICAL DOCTOR & DATA SCIENTIST",
    photo: createFacelessAvatar("NI", avatarPalette[5]),
    description: "Chief Executive responsible for overall operations, service delivery, and organizational leadership.",
    experience: ["Operational leadership", "Service delivery oversight", "Risk & compliance"],
    email: "iryntracy@gmail.com",
    phone: "+256 786 691 998",
    linkedin: "https://www.linkedin.com/",
    twitter: "https://twitter.com/",
  },
  {
    id: "agaba-francis",
    name: "AGABA FRANCIS",
    position: "MANAGEMENT ADVISOR B.O.D",
    nationality: "Ugandan",
    occupation: "BANK MANAGER",
    photo: createFacelessAvatar("AF", avatarPalette[6]),
    description: "Advises the executive team on management practices and coordinates cross-functional initiatives.",
    experience: ["Executive advisory", "Program coordination", "Partnership facilitation"],
    email: "francisagaba137@gmail.com",
    phone: "+256 783 387 303",
    linkedin: "https://www.linkedin.com/",
    twitter: "https://twitter.com/",
  },
  {
    id: "mugumya-benard",
    name: "MUGUMYA BENARD",
    position: "VICE CHAIRMAN B.O.D",
    nationality: "Ugandan",
    occupation: "HUMAN RESOURCE MANAGER",
    photo: createFacelessAvatar("MB", avatarPalette[7]),
    description: "Vice Chairman supporting board governance, stakeholder relations, and company administration.",
    experience: ["Board liaison", "Governance support", "Administrative oversight"],
    email: "benardmugumya@gmail.com",
    phone: "+256 777 997 258",
    linkedin: "https://www.linkedin.com/",
    twitter: "https://twitter.com/",
  },
  {
    id: "akankwatssa-amon",
    name: "AKANKWASA AMON",
    position: "HEAD OF ACCOUNTS & COMPLIANCE",
    nationality: "Ugandan",
    occupation: "ACCOUNTANT",
    photo: createFacelessAvatar("AA", avatarPalette[8]),
    description: "Leads accounts, compliance, and statutory financial reporting for the company.",
    experience: ["Financial controls", "Compliance management", "Statutory reporting"],
    email: "amonbobia2017@gmail.com",
    phone: "+256 787 666 907",
    linkedin: "https://www.linkedin.com/",
    twitter: "https://twitter.com/",
  },
];

export function loadManagementTeam(): ManagementTeamMember[] {
  try {
    const raw = localStorage.getItem(MANAGEMENT_TEAM_STORAGE_KEY);
    if (!raw) return DEFAULT_MANAGEMENT_TEAM;

    const parsed = JSON.parse(raw) as ManagementTeamMember[];
    if (!Array.isArray(parsed) || parsed.length === 0) return DEFAULT_MANAGEMENT_TEAM;

    return parsed.map((member) => {
      const fallback = DEFAULT_MANAGEMENT_TEAM.find((item) => item.id === member.id);
      const occupation = member.occupation || fallback?.occupation || "";
      return {
        ...fallback,
        ...member,
        occupation,
        name: withEngineeringPrefix(member.name || fallback?.name || "", occupation),
      };
    });
  } catch {
    return DEFAULT_MANAGEMENT_TEAM;
  }
}

export function saveManagementTeam(members: ManagementTeamMember[]) {
  localStorage.setItem(MANAGEMENT_TEAM_STORAGE_KEY, JSON.stringify(members));
}
