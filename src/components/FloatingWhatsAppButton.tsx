import { useSiteConfig } from "../hooks/useSiteConfig";

const WHATSAPP_MESSAGE = "Hello, TUAN Creations. I need your assistance:";

export default function FloatingWhatsAppButton() {
  const [config] = useSiteConfig();
  const whatsappNumber = config["social.whatsapp"] || "256753414058";

  return (
    <a
      className="whatsapp-float"
      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <span className="whatsapp-float__label">WhatsApp Us</span>
      <span className="whatsapp-float__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" role="presentation" focusable="false">
          <path
            d="M20.5 3.5A11.6 11.6 0 0 0 2.7 18.2L1 23l4.9-1.6A11.6 11.6 0 1 0 20.5 3.5Zm-8.9 18.1c-1.9 0-3.7-.5-5.3-1.5l-.4-.2-2.9.9 1-2.8-.2-.4a9.6 9.6 0 1 1 7.8 4Zm5.3-7.2c-.3-.1-1.8-.9-2.1-1-.3-.1-.5-.1-.7.1l-.6.8c-.2.2-.4.2-.7.1-2-.8-3.2-2.8-3.3-3-.2-.3 0-.5.1-.6l.5-.6c.1-.1.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.7-1-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.7 1.2 2.8c.1.2 2 3 4.9 4.2.7.3 1.2.4 1.7.5.7.2 1.3.2 1.8.1.5-.1 1.8-.7 2-1.3.3-.6.3-1.2.2-1.3-.1-.2-.3-.2-.6-.3Z"
            fill="currentColor"
          />
        </svg>
      </span>
    </a>
  );
}