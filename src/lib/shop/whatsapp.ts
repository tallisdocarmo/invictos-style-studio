/**
 * Configuração central do WhatsApp.
 * Para publicar com o número real da loja, altere apenas STORE_WHATSAPP.
 */
export const STORE_WHATSAPP = "5575999999999"; // TODO: substituir pelo número real da Invictos

export const STORE_INFO = {
  name: "Invictos Calçados",
  street: "Luiz Viana Filho, 118",
  district: "Centro",
  city: "Nova Soure",
  state: "BA",
  instagram: "@invictos_calcados",
  instagramUrl: "https://instagram.com/invictos_calcados",
  hours: [
    { days: "Segunda a sexta", time: "08h00 — 18h00" },
    { days: "Sábado", time: "08h00 — 13h00" },
  ],
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Luiz+Viana+Filho,+118,+Centro,+Nova+Soure+-+BA",
} as const;

export function whatsappLink(message: string, phone: string = STORE_WHATSAPP) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export const waMessages = {
  general: "Olá! Vim pelo site da Invictos Calçados e gostaria de atendimento.",
  product: (name: string) =>
    `Olá! Tenho interesse no produto ${name}. Poderiam me passar mais informações?`,
  cart: (lines: string[], total: string) =>
    `Olá! Gostaria de finalizar meu pedido pelo WhatsApp:\n\n${lines.join("\n")}\n\nTotal: ${total}`,
  location: "Olá! Gostaria de saber como chegar à loja da Invictos em Nova Soure.",
};
