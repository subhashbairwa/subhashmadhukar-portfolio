import { motion, useInView } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { FileText, Sparkles, Target } from "lucide-react";

type TargetRole = "Full-Stack" | "Backend" | "Frontend" | "Product Engineer";

const ResumeCritique = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [role, setRole] = useState<TargetRole>("Full-Stack");
  const [resumeText, setResumeText] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string>("");

  const canSubmit = useMemo(
    () => resumeText.trim().length >= 100 && !isLoading,
    [resumeText, isLoading],
  );

  const systemPrompt = useMemo(() => {
    return `You are a senior hiring manager + technical interviewer for SWE roles.
Your job: critique and improve the candidate's resume/projects content.

Return output in clean Markdown with these exact headings:
## Summary (3 bullets max)
## Strength signals (5 bullets max)
## Gaps / risks (5 bullets max)
## ATS keywords to add (comma-separated)
## Rewrite suggestions (rewrite 4 bullets with metrics; keep it truthful)
## 7-day action plan (day-wise)

Rules:
- Be concrete, specific, and tough but fair.
- Prefer measurable impact (latency, scale, revenue, users, cost, reliability).
- Tailor advice to the target role and the provided job description if any.
- Do not invent achievements; mark unknowns as "Add numbers here: ____".
`;
  }, []);

  const handleAnalyze = async () => {
    if (!canSubmit) return;

    setIsLoading(true);
    setError("");
    setOutput("");

    try {
      const userPrompt = `Target role: ${role}

Job description (optional):
${jobDesc.trim() || "(not provided)"}

Candidate resume / portfolio text:
${resumeText.trim()}
`;

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
        }),
      });

      if (!response.ok) {
        let msg = `API error: ${response.status}`;
        try {
          const err = await response.json();
          if (typeof err?.error === "string") msg = err.error;
          else if (err?.error?.message) msg = err.error.message;
        } catch {
          // ignore
        }
        throw new Error(msg);
      }

      const data = await response.json();
      setOutput(data?.message || "No response generated.");
    } catch (e: any) {
      setError(e?.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-review" className="py-32 relative overflow-hidden bg-secondary/20">
      <div className="floating-orb w-96 h-96 bg-accent/15 -left-48 top-24" />
      <div className="floating-orb w-80 h-80 bg-primary/15 right-0 -bottom-40" />

      <div className="container mx-auto px-6" ref={ref}>
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-primary text-sm font-medium uppercase tracking-widest"
          >
            AI Feature
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold mt-4"
          >
            AI <span className="gradient-text">Resume Critique</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto"
          >
            Paste your resume or project write-up. Get ATS keywords, bullet rewrites with metrics,
            and a 7-day improvement plan—tailored to your target role.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-6"
        >
          <div className="glass-card p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileText className="text-primary" size={20} />
              </div>
              <div>
                <h3 className="font-display font-semibold text-xl">Input</h3>
                <p className="text-sm text-muted-foreground">Resume/portfolio text + optional JD</p>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block">
                <span className="text-sm text-muted-foreground">Target role</span>
                <div className="mt-2 relative">
                  <Target
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    size={16}
                  />
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as TargetRole)}
                    className="w-full pl-10 pr-3 py-2 rounded-lg bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  >
                    <option value="Full-Stack">Full-Stack</option>
                    <option value="Backend">Backend</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Product Engineer">Product Engineer</option>
                  </select>
                </div>
              </label>

              <label className="block">
                <span className="text-sm text-muted-foreground">Resume / portfolio text</span>
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  rows={10}
                  placeholder="Paste your resume text here (recommended 150+ words)..."
                  className="mt-2 w-full px-3 py-2 rounded-lg bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
                <div className="mt-2 text-xs text-muted-foreground">
                  Tip: include project descriptions, tech stack, and outcomes. (Min ~100 chars)
                </div>
              </label>

              <label className="block">
                <span className="text-sm text-muted-foreground">Job description (optional)</span>
                <textarea
                  value={jobDesc}
                  onChange={(e) => setJobDesc(e.target.value)}
                  rows={5}
                  placeholder="Paste the JD here to tailor keywords and bullet rewrites..."
                  className="mt-2 w-full px-3 py-2 rounded-lg bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </label>

              {error && (
                <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              <button
                onClick={handleAnalyze}
                disabled={!canSubmit}
                className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50 disabled:hover:shadow-none"
              >
                <Sparkles size={18} />
                {isLoading ? "Analyzing..." : "Analyze & Improve"}
              </button>
            </div>
          </div>

          <div className="glass-card p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Sparkles className="text-accent" size={20} />
              </div>
              <div>
                <h3 className="font-display font-semibold text-xl">Output</h3>
                <p className="text-sm text-muted-foreground">Actionable critique + rewrites</p>
              </div>
            </div>

            {!output ? (
              <div className="text-muted-foreground text-sm leading-relaxed">
                Paste your content and click <span className="text-foreground font-medium">Analyze & Improve</span>.
                <div className="mt-3 text-xs">
                  You’ll get ATS keywords, rewritten bullets with metrics, and a 7-day plan.
                </div>
              </div>
            ) : (
              <div className="rounded-2xl bg-secondary/50 border border-border p-4 md:p-5 overflow-auto max-h-[560px]">
                <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans">{output}</pre>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResumeCritique;

