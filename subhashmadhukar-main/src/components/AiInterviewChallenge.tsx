import { motion, useInView } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { BrainCircuit, Sparkles, Trophy, Copy, RotateCcw } from "lucide-react";

type TargetRole = "Full-Stack" | "Backend" | "Frontend" | "Product Engineer";
type Step = "idle" | "question_ready" | "grading" | "graded";

const portfolioContext = `
Portfolio context:
- Subhash Madhukar — Full-stack developer, final year B.Tech (IIT Jodhpur)
- Strong in: full-stack dev, system design, DSA, real-time systems
- Projects: production-grade apps, real-time features, scalable backend systems
`;

const AiInterviewChallenge = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [role, setRole] = useState<TargetRole>("Full-Stack");
  const [step, setStep] = useState<Step>("idle");
  const [isLoading, setIsLoading] = useState(false);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const systemPrompt = useMemo(() => {
    return `You are an expert technical interviewer and evaluator.
${portfolioContext}

You will do TWO tasks depending on the user's instruction:

Task A (Generate): produce ONE interview question that is specific, practical, and tied to the portfolio context.
Task B (Evaluate): grade the user's answer and then show an ideal answer as "Subhash's approach".

Always respond in clean Markdown, no extra commentary.`;
  }, []);

  const fetchChat = async (messages: Array<{ role: string; content: string }>) => {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
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
    return String(data?.message || "");
  };

  const startChallenge = async () => {
    setIsLoading(true);
    setError("");
    setResult("");
    setAnswer("");
    setQuestion("");
    setStep("idle");

    try {
      const prompt = `Task A (Generate)
Target role: ${role}

Output format:
## Question
<one question only>

Constraints:
- Must test system design + practical engineering judgement.
- Should relate to portfolio (real-time features / production systems / full-stack).
- Keep it concise.`;

      const msg = await fetchChat([
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ]);

      setQuestion(msg.trim());
      setStep("question_ready");
    } catch (e: any) {
      setError(e?.message || "Failed to generate question.");
    } finally {
      setIsLoading(false);
    }
  };

  const evaluateAnswer = async () => {
    if (!answer.trim() || !question.trim()) return;

    setIsLoading(true);
    setError("");
    setResult("");
    setStep("grading");

    try {
      const prompt = `Task B (Evaluate)
Target role: ${role}

Here is the question:
${question}

Visitor answer:
${answer}

Output format (strict):
## Score
<0-10> / 10

## Feedback (what's good + what to improve)
- ...

## Subhash's approach (ideal answer)
- ...

## One-liner takeaway
<single sentence>`;

      const msg = await fetchChat([
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ]);

      setResult(msg.trim());
      setStep("graded");
    } catch (e: any) {
      setError(e?.message || "Failed to evaluate answer.");
      setStep("question_ready");
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setStep("idle");
    setQuestion("");
    setAnswer("");
    setResult("");
    setError("");
  };

  const canStart = !isLoading;
  const canSubmit = !isLoading && step === "question_ready" && answer.trim().length >= 10;

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(result);
    } catch {
      // ignore
    }
  };

  return (
    <section id="ai-challenge" className="py-32 relative overflow-hidden">
      <div className="floating-orb w-80 h-80 bg-primary/20 -left-40 top-1/3" />
      <div className="floating-orb w-64 h-64 bg-accent/20 right-0 bottom-20" />

      <div className="container mx-auto px-6" ref={ref}>
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-primary text-sm font-medium uppercase tracking-widest"
          >
            Unique AI Experience
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold mt-4"
          >
            AI <span className="gradient-text">Interview Challenge</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-lg mt-4 max-w-3xl mx-auto"
          >
            Pick a role, answer a real engineering interview question, and get a scored review—plus
            “Subhash’s approach” as the ideal answer. Visitors almost always try it once.
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
                <BrainCircuit className="text-primary" size={20} />
              </div>
              <div>
                <h3 className="font-display font-semibold text-xl">Try it</h3>
                <p className="text-sm text-muted-foreground">1 question • 1 answer • instant feedback</p>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block">
                <span className="text-sm text-muted-foreground">Target role</span>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as TargetRole)}
                  className="mt-2 w-full px-3 py-2 rounded-lg bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  disabled={isLoading}
                >
                  <option value="Full-Stack">Full-Stack</option>
                  <option value="Backend">Backend</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Product Engineer">Product Engineer</option>
                </select>
              </label>

              {error && (
                <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={startChallenge}
                  disabled={!canStart}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50"
                >
                  <Sparkles size={18} />
                  {isLoading ? "Working..." : "Generate Question"}
                </button>

                <button
                  onClick={reset}
                  disabled={isLoading}
                  className="inline-flex items-center gap-2 glass-card px-6 py-3 rounded-full font-medium text-foreground transition-all duration-300 hover:border-primary/50 disabled:opacity-50"
                >
                  <RotateCcw size={18} />
                  Reset
                </button>
              </div>

              {question && (
                <div className="mt-4 rounded-2xl bg-secondary/50 border border-border p-4 md:p-5">
                  <div className="text-sm text-muted-foreground mb-2">Question</div>
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans">{question}</pre>
                </div>
              )}

              {step !== "idle" && (
                <label className="block">
                  <span className="text-sm text-muted-foreground">Your answer</span>
                  <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    rows={7}
                    placeholder="Write your approach (tradeoffs, steps, data model, scaling, reliability)..."
                    className="mt-2 w-full px-3 py-2 rounded-lg bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                    disabled={isLoading}
                  />
                </label>
              )}

              {step !== "idle" && (
                <button
                  onClick={evaluateAnswer}
                  disabled={!canSubmit}
                  className="w-full inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-accent/25 disabled:opacity-50"
                >
                  <Trophy size={18} />
                  {isLoading ? "Evaluating..." : "Score my answer"}
                </button>
              )}
            </div>
          </div>

          <div className="glass-card p-6 md:p-8">
            <div className="flex items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Trophy className="text-accent" size={20} />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-xl">Result</h3>
                  <p className="text-sm text-muted-foreground">Scored feedback + ideal answer</p>
                </div>
              </div>

              <button
                onClick={copyResult}
                disabled={!result}
                className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
                title="Copy result"
              >
                <Copy size={16} />
                Copy
              </button>
            </div>

            {!result ? (
              <div className="text-muted-foreground text-sm leading-relaxed">
                Generate a question, write an answer, then click{" "}
                <span className="text-foreground font-medium">Score my answer</span>.
                <div className="mt-3 text-xs">
                  This is designed to show system design depth + real engineering judgement.
                </div>
              </div>
            ) : (
              <div className="rounded-2xl bg-secondary/50 border border-border p-4 md:p-5 overflow-auto max-h-[560px]">
                <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans">{result}</pre>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AiInterviewChallenge;

