import { MessageCircle } from "lucide-react";
import { waMessages, whatsappLink } from "@/lib/shop/whatsapp";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink(waMessages.general)}
      target="_blank"
      rel="noreferrer"
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-3 bg-ink py-3.5 pl-4 pr-5 text-ink-foreground shadow-panel transition-colors hover:bg-ink-soft"
    >
      <MessageCircle className="h-5 w-5 text-gold" strokeWidth={1.5} />
      <span className="label-xs hidden text-[0.6rem] sm:block">Fale com a Invictos</span>
    </a>
  );
}
