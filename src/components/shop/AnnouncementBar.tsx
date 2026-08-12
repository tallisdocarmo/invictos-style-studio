import { useEffect, useState } from "react";

const MESSAGES = [
  "Entregamos para todo o Brasil",
  "Parcele suas compras em até 10x",
  "Compre online ou visite nossa loja em Nova Soure — BA",
];

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % MESSAGES.length),
      5000,
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="bg-ink-soft">
      <p
        key={index}
        className="label-xs fade-up mx-auto max-w-[1400px] px-5 py-2.5 text-center text-[0.6rem] text-ink-foreground/75 md:text-[0.65rem]"
      >
        {MESSAGES[index]}
      </p>
    </div>
  );
}
