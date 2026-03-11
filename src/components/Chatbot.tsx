import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

async function streamChat({
  messages,
  onDelta,
  onDone,
  onError,
}: {
  messages: Msg[];
  onDelta: (text: string) => void;
  onDone: () => void;
  onError: (msg: string) => void;
}) {
  const resp = await fetch(CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ messages }),
  });

  if (!resp.ok) {
    const data = await resp.json().catch(() => ({}));
    onError(data.error || "Something went wrong. Please try again.");
    return;
  }

  if (!resp.body) {
    onError("No response received.");
    return;
  }

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let streamDone = false;

  while (!streamDone) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    let idx: number;
    while ((idx = buffer.indexOf("\n")) !== -1) {
      let line = buffer.slice(0, idx);
      buffer = buffer.slice(idx + 1);
      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (line.startsWith(":") || line.trim() === "") continue;
      if (!line.startsWith("data: ")) continue;
      const json = line.slice(6).trim();
      if (json === "[DONE]") { streamDone = true; break; }
      try {
        const parsed = JSON.parse(json);
        const content = parsed.choices?.[0]?.delta?.content as string | undefined;
        if (content) onDelta(content);
      } catch {
        buffer = line + "\n" + buffer;
        break;
      }
    }
  }

  // flush remaining
  if (buffer.trim()) {
    for (let raw of buffer.split("\n")) {
      if (!raw) continue;
      if (raw.endsWith("\r")) raw = raw.slice(0, -1);
      if (!raw.startsWith("data: ")) continue;
      const json = raw.slice(6).trim();
      if (json === "[DONE]") continue;
      try {
        const parsed = JSON.parse(json);
        const content = parsed.choices?.[0]?.delta?.content as string | undefined;
        if (content) onDelta(content);
      } catch { /* ignore */ }
    }
  }

  onDone();
}

const GREETING: Msg = {
  role: "assistant",
  content: "Hi there! 👋 I'm the Social Factory assistant. Ask me anything about our programmes, mission, or how to get involved!",
};

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");

    const userMsg: Msg = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    let assistantSoFar = "";
    const upsert = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && last !== GREETING || (prev.length > 1 && prev[prev.length - 1]?.role === "assistant" && prev[prev.length - 2]?.role === "user" && prev[prev.length - 2]?.content === text)) {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      // Send only the conversation (excluding greeting)
      const history = [...messages.filter((_, i) => i > 0), userMsg];
      await streamChat({
        messages: history,
        onDelta: upsert,
        onDone: () => setIsLoading(false),
        onError: (msg) => {
          setMessages((prev) => [...prev, { role: "assistant", content: `⚠️ ${msg}` }]);
          setIsLoading(false);
        },
      });
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "⚠️ Something went wrong. Please try again." }]);
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-coral text-cream shadow-hover transition-all duration-300 hover:scale-110",
          open && "rotate-90"
        )}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex w-[360px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-3xl border-2 border-border bg-card shadow-hover animate-fade-in"
          style={{ height: "min(500px, calc(100vh - 8rem))" }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 bg-coral px-5 py-4">
            <Bot className="h-6 w-6 text-cream" />
            <div>
              <p className="font-bold text-cream text-sm">Social Factory Assistant</p>
              <p className="text-cream/80 text-xs">Ask me anything</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={cn("flex gap-2", msg.role === "user" ? "justify-end" : "justify-start")}>
                {msg.role === "assistant" && (
                  <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                    <Bot className="h-4 w-4" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  )}
                >
                  {msg.role === "assistant" ? (
                    <div className="prose prose-sm max-w-none dark:prose-invert [&_p]:m-0 [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  ) : (
                    msg.content
                  )}
                </div>
                {msg.role === "user" && (
                  <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-coral text-cream">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
              <div className="flex gap-2">
                <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="rounded-2xl bg-muted px-4 py-2.5 text-sm text-muted-foreground">
                  Thinking…
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => { e.preventDefault(); send(); }}
            className="flex items-center gap-2 border-t border-border px-4 py-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message…"
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              variant="green"
              className="h-9 w-9 rounded-full"
              disabled={!input.trim() || isLoading}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;
