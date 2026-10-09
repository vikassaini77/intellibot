import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { NeuralBackground } from "@/components/NeuralBackground";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Neural — AI Assistant" },
      { name: "description", content: "A calm, intelligent AI chat experience with an ambient neural background." },
      { property: "og:title", content: "Neural — AI Assistant" },
      { property: "og:description", content: "A calm, intelligent AI chat experience with an ambient neural background." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Msg = { role: "user" | "assistant"; text: string };

function Index() {
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "assistant", text: "Hello — how can I help you think today?" },
  ]);
  const [input, setInput] = useState("");

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMsgs((m) => [...m, { role: "user", text: input }, { role: "assistant", text: "This is a demo reply. Connect a model to get real answers." }]);
    setInput("");
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden text-foreground">
      <NeuralBackground />
      <main className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col px-4 py-8">
        <h1 className="mb-6 text-center text-sm tracking-[0.3em] text-muted-foreground uppercase">Neural</h1>
        <div className="flex-1 space-y-4 overflow-y-auto">
          {msgs.map((m, i) => (
            <div key={i} className={m.role === "user" ? "flex justify-end" : "flex"}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${m.role === "user" ? "bubble-user" : "glass"}`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={send} className="glass mt-6 flex gap-2 rounded-2xl p-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message Neural…"
            className="flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground"
          />
          <button className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Send</button>
        </form>
      </main>
    </div>
  );
}
