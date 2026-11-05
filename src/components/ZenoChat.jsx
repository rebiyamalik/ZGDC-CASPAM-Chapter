import { useState, useRef, useEffect } from "react";
import { ZGDC } from "../data/zgdcInfo";

// Worker URL (not a secret). The API key stays inside Cloudflare.
const ZENO_API_URL = "https://zeno-ai.callmemrsheeqa.workers.dev";

// Logo file lives in the project's public/ folder
const ZENO_LOGO = "/zgdc-agent-logo.jpg";

const WELCOME =
  "Assalam o Alaikum! I'm ZGDC Agent, the assistant of the Zakariyan Google Developer Club (CASPAM Chapter). Ask me about our events, members or the chapter.";

const SUGGESTIONS = [
  "What is the ZGDC–CASPAM Chapter?",
  "Upcoming events?",
  "How can I contact you?",
];

const css = `
.zeno-fab{position:fixed;right:18px;bottom:18px;z-index:9999;width:96px;height:96px;padding:0;border:0;
  background:transparent;cursor:pointer;transition:transform .2s;animation:zeno-float 3s ease-in-out infinite}
.zeno-fab img{width:100%;height:100%;object-fit:contain;display:block;filter:drop-shadow(0 6px 12px rgba(0,0,0,.35))}
.zeno-fab:hover{transform:scale(1.1)}
@keyframes zeno-float{0%,100%{translate:0 0}50%{translate:0 -6px}}
@media (max-width:480px){.zeno-fab{width:82px;height:82px;right:12px;bottom:12px}}
.zeno-head-logo{width:34px;height:34px;object-fit:contain;margin-right:10px;flex:none}
.zeno-head-text{flex:1;min-width:0}
.zeno-head-left{display:flex;align-items:center;min-width:0}
.zeno-panel{position:fixed;right:20px;bottom:20px;z-index:9999;width:min(380px,calc(100vw - 24px));
  height:min(560px,calc(100vh - 40px));display:flex;flex-direction:column;overflow:hidden;
  background:var(--surface,#fff);color:var(--ink,#111827);border-radius:16px;box-shadow:0 16px 48px rgba(0,0,0,.3);
  font:14px/1.5 system-ui,sans-serif}
.zeno-head{display:flex;align-items:center;justify-content:space-between;padding:12px 14px;
  color:#fff;background:var(--brand-main,#1d4ed8)}
.zeno-head b{font-size:15px}
.zeno-head small{display:block;opacity:.85;font-size:11px}
.zeno-close{border:0;background:transparent;color:#fff;font-size:22px;line-height:1;cursor:pointer;padding:4px 8px}
.zeno-body{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px;background:var(--surface-2,#f3f4f6)}
.zeno-msg{max-width:85%;padding:9px 12px;border-radius:14px;white-space:pre-wrap;word-wrap:break-word}
.zeno-msg.bot{align-self:flex-start;background:var(--surface,#fff);border:1px solid var(--line,#e5e7eb)}
.zeno-msg.user{align-self:flex-end;color:#fff;background:var(--brand-main,#1d4ed8)}
.zeno-msg.err{align-self:flex-start;background:#fef2f2;border:1px solid #fecaca;color:#991b1b}
.zeno-chips{display:flex;flex-wrap:wrap;gap:6px}
.zeno-chip{border:1px solid var(--line,#d1d5db);background:var(--surface,#fff);color:inherit;border-radius:999px;padding:6px 10px;font-size:12px;cursor:pointer}
.zeno-chip:hover{background:var(--tint-blue,#eef2ff)}
.zeno-dots{display:inline-flex;gap:4px;padding:4px 0}
.zeno-dots i{width:6px;height:6px;border-radius:50%;background:#9ca3af;animation:zeno-b 1s infinite}
.zeno-dots i:nth-child(2){animation-delay:.15s}.zeno-dots i:nth-child(3){animation-delay:.3s}
@keyframes zeno-b{0%,80%,100%{opacity:.3}40%{opacity:1}}
.zeno-form{display:flex;gap:8px;padding:10px;border-top:1px solid var(--line,#e5e7eb);background:var(--surface,#fff)}
.zeno-input{flex:1;border:1px solid var(--line,#d1d5db);background:var(--surface,#fff);color:inherit;border-radius:10px;padding:9px 11px;font:inherit;outline:none}
.zeno-input:focus{border-color:var(--brand-main,#1d4ed8)}
.zeno-send{border:0;border-radius:10px;padding:0 14px;font:600 14px system-ui,sans-serif;cursor:pointer;
  color:#fff;background:var(--brand-main,#1d4ed8)}
.zeno-send:disabled{opacity:.5;cursor:not-allowed}
.zeno-msg.err a{color:inherit;font-weight:600;text-decoration:underline}
:root[data-theme="dark"] .zeno-msg.err{background:rgba(255,125,112,.14);border-color:rgba(255,125,112,.4);color:#ffb4ab}
:root[data-theme="dark"] .zeno-head,
:root[data-theme="dark"] .zeno-close,
:root[data-theme="dark"] .zeno-msg.user,
:root[data-theme="dark"] .zeno-send{color:#0b1220}
`;

// Shown whenever the AI cannot answer (all models busy, network problem, empty reply)
function UnavailableNotice() {
  return (
    <>
      ZGDC Agent is not available right now. Please contact the team via our{" "}
      <a href={ZGDC.facebook} target="_blank" rel="noopener noreferrer">Facebook page</a>,{" "}
      <a href={ZGDC.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>, or our official{" "}
      <a href={`mailto:${ZGDC.email}`}>email</a>.
    </>
  );
}

export default function ZenoChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: "bot", text: WELCOME }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bodyRef = useRef(null);

  // Keep the newest message in view
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, loading, open]);

  async function send(text) {
    const question = (text ?? input).trim();
    if (!question || loading) return;

    // Previous real conversation (skip welcome + errors) for context
    const history = messages
      .slice(1)
      .filter((m) => m.role === "user" || m.role === "bot")
      .map((m) => ({
        role: m.role === "user" ? "user" : "model",
        text: m.text,
      }));

    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(ZENO_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question, history, stream: true }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Request failed");
      }

      // Read the answer piece by piece and show it as it arrives
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let reply = "";
      let started = false;
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        reply += decoder.decode(value, { stream: true });
        if (!started) {
          started = true;
          setLoading(false); // hide the typing dots, answer has begun
          setMessages((prev) => [...prev, { role: "bot", text: reply }]);
        } else {
          const current = reply;
          setMessages((prev) => {
            const copy = prev.slice();
            copy[copy.length - 1] = { role: "bot", text: current };
            return copy;
          });
        }
      }
      if (!reply.trim()) throw new Error("Empty reply");
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "err" },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    send();
  }

  return (
    <>
      <style>{css}</style>

      {!open && (
        <button
          className="zeno-fab"
          onClick={() => setOpen(true)}
          aria-label="Open ZGDC Agent chat"
          title="Ask ZGDC Agent"
        >
          <img src={ZENO_LOGO} alt="ZGDC Agent" />
        </button>
      )}

      {open && (
        <section className="zeno-panel" role="dialog" aria-label="ZGDC Agent chat">
          <header className="zeno-head">
            <div className="zeno-head-left">
              <img className="zeno-head-logo" src={ZENO_LOGO} alt="" />
              <div className="zeno-head-text">
                <b>ZGDC Agent</b>
                <small>{ZGDC.name}</small>
              </div>
            </div>
            <button
              className="zeno-close"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              ×
            </button>
          </header>

          <div className="zeno-body" ref={bodyRef} aria-live="polite">
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  "zeno-msg " +
                  (m.role === "user" ? "user" : m.role === "err" ? "err" : "bot")
                }
              >
                {m.role === "err" ? <UnavailableNotice /> : m.text}
              </div>
            ))}

            {messages.length === 1 && !loading && (
              <div className="zeno-chips">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    className="zeno-chip"
                    onClick={() => send(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {loading && (
              <div className="zeno-msg bot" aria-label="ZGDC Agent is typing">
                <span className="zeno-dots">
                  <i />
                  <i />
                  <i />
                </span>
              </div>
            )}
          </div>

          <form className="zeno-form" onSubmit={onSubmit}>
            <input
              className="zeno-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              maxLength={500}
              aria-label="Your question"
            />
            <button
              className="zeno-send"
              type="submit"
              disabled={loading || !input.trim()}
            >
              Send
            </button>
          </form>
        </section>
      )}
    </>
  );
}
