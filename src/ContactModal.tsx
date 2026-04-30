import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FORM_ENDPOINT = "/api/contact";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("submitting");
    setError(null);

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Submission failed");
      }
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-foreground/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[101] flex items-start md:items-center justify-center p-4 pointer-events-none overflow-y-auto"
          >
            <div className="w-full max-w-2xl bg-background border border-border shadow-2xl pointer-events-auto my-8">
              <div className="flex items-start justify-between p-8 md:p-10 border-b border-border">
                <div>
                  <p className="kicker mb-3">Contact</p>
                  <h2 className="font-serif text-3xl md:text-4xl">Get in Touch</h2>
                  <p className="text-[15px] text-muted-foreground mt-3 leading-relaxed">
                    Fill out the form below and we&rsquo;ll get back to you as soon as possible.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="text-muted-foreground hover:text-foreground transition-colors p-1 -mr-1 -mt-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {status === "success" ? (
                <div className="p-10 md:p-12 text-center">
                  <p className="font-serif text-3xl italic text-accent mb-4">Thank you.</p>
                  <p className="text-muted-foreground mb-8">
                    We&rsquo;ve received your message and will be in touch shortly.
                  </p>
                  <button
                    onClick={() => {
                      setStatus("idle");
                      onClose();
                    }}
                    className="inline-flex items-center px-6 py-3 border border-foreground/80 text-[14px] tracking-widest uppercase hover:bg-foreground hover:text-background transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-6">
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute -left-[9999px] w-px h-px opacity-0"
                  />
                  <div className="grid md:grid-cols-2 gap-6">
                    <Field label="First Name" name="firstName" required />
                    <Field label="Last Name" name="lastName" required />
                  </div>
                  <Field label="Email" name="email" type="email" required />
                  <Field label="Message" name="message" required textarea />

                  {status === "error" && (
                    <p className="text-sm text-red-700 bg-red-50 border border-red-200 px-4 py-3">
                      {error || "Something went wrong. Please try again."}
                    </p>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="inline-flex items-center px-8 py-3.5 bg-foreground text-background hover:bg-accent transition-colors text-[14px] tracking-widest uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === "submitting" ? "Sending…" : "Send"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  textarea,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  const baseClass =
    "w-full bg-white border border-foreground/30 focus:border-foreground focus:ring-2 focus:ring-accent/20 outline-none px-4 py-3 text-[16px] text-foreground transition-colors";
  return (
    <label className="block">
      <span className="block text-[14px] font-medium tracking-wide mb-2 text-foreground">
        {label}
        {required && <span className="text-muted-foreground ml-1.5 font-normal">(required)</span>}
      </span>
      {textarea ? (
        <textarea name={name} required={required} rows={5} className={baseClass + " resize-none"} />
      ) : (
        <input name={name} type={type} required={required} className={baseClass} />
      )}
    </label>
  );
}
