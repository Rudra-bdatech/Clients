"use client";

import { useRef, useState } from "react";
import { CircleCheckBig } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  company: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

function validateField(field: keyof FormValues, value: string): string | undefined {
  const trimmed = value.trim();
  switch (field) {
    case "name":
      return trimmed.length === 0 ? "Name is required" : undefined;
    case "email":
      return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
        ? "Please enter a valid email"
        : undefined;
    case "phone":
      return trimmed.length === 0 ? "Phone number is required" : undefined;
    case "company":
      return trimmed.length === 0 ? "Company name is required" : undefined;
  }
}

export default function ContactPage() {
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    phone: "",
    company: "",
  });
  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const companyRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      const nextError = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: nextError }));
    }
  };

  const handleBlur = (field: keyof FormValues) => {
    if (!values[field].trim() && !touched[field]) return;
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field, values[field]);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nextErrors: FormErrors = {
      name: validateField("name", values.name),
      email: validateField("email", values.email),
      phone: validateField("phone", values.phone),
      company: validateField("company", values.company),
    };

    setErrors(nextErrors);
    setTouched({ name: true, email: true, phone: true, company: true });

    const firstInvalid = (["name", "email", "phone", "company"] as const).find(
      (key) => Boolean(nextErrors[key])
    );

    if (firstInvalid) {
      const refMap = {
        name: nameRef,
        email: emailRef,
        phone: phoneRef,
        company: companyRef,
      };
      refMap[firstInvalid].current?.focus();
      return;
    }

    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-hidden">
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-mint/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-mint/5 rounded-full blur-3xl" />
      </div>

      <Navbar />

      <main className="relative z-10 flex-1 pt-32 pb-20 px-6">
        <div className="max-w-xl mx-auto">
          <div className="text-center">
            <div className="mb-4 animate-fade-up">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mint/10 border border-mint/20">
                <span aria-hidden="true" className="w-2 h-2 bg-mint rounded-full" />
                <span className="text-sm font-mono text-mint">GET IN TOUCH</span>
              </span>
            </div>

            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4 animate-fade-up"
              style={{ animationDelay: "80ms" }}
            >
              Let&apos;s Talk Business.
            </h1>

            <p
              className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto animate-fade-up"
              style={{ animationDelay: "160ms" }}
            >
              Ready to accelerate your growth? Fill out the form below and
              we&apos;ll get back to you within 24 hours.
            </p>
          </div>

          <div
            className="relative overflow-hidden mt-12 p-8 bg-card/50 backdrop-blur-sm border border-border rounded-2xl animate-fade-up"
            style={{ animationDelay: "220ms" }}
          >
            {submitted ? (
              <div
                role="status"
                aria-live="polite"
                className="text-center py-8 space-y-4"
              >
                <div className="w-12 h-12 rounded-full bg-mint/15 border border-mint/30 flex items-center justify-center mx-auto">
                  <CircleCheckBig
                    className="w-6 h-6 text-mint"
                    aria-hidden="true"
                  />
                </div>
                <h2 className="text-2xl font-bold">Inquiry Received</h2>
                <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
                  Thanks,{" "}
                  <span className="text-foreground font-semibold">
                    {values.name}
                  </span>
                  . Our team will review your details for{" "}
                  <span className="text-foreground font-semibold">
                    {values.company}
                  </span>{" "}
                  and reach out within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setValues({ name: "", email: "", phone: "", company: "" });
                    setErrors({});
                    setTouched({});
                  }}
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-border text-sm font-mono text-muted-foreground hover:text-mint hover:border-mint/40 transition-colors"
                >
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form
                method="POST"
                noValidate
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="space-y-6">
                  <div
                    className="space-y-2 animate-fade-up"
                    style={{ animationDelay: "280ms" }}
                  >
                    <label
                      htmlFor="name"
                      className="block font-medium text-foreground font-mono text-sm"
                    >
                      Full Name
                    </label>
                    <input
                      ref={nameRef}
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      enterKeyHint="next"
                      placeholder="John Doe"
                      value={values.name}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      onChange={(e) => handleChange("name", e.target.value)}
                      onBlur={() => handleBlur("name")}
                      className="flex h-10 w-full rounded-md border px-3 py-2 text-base md:text-sm bg-secondary/50 border-border focus:border-mint/50 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors"
                    />
                    {errors.name && (
                      <p
                        id="name-error"
                        role="alert"
                        className="text-xs font-mono text-destructive"
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div
                    className="space-y-2 animate-fade-up"
                    style={{ animationDelay: "340ms" }}
                  >
                    <label
                      htmlFor="email"
                      className="block font-medium text-foreground font-mono text-sm"
                    >
                      Email Address
                    </label>
                    <input
                      ref={emailRef}
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      autoCorrect="off"
                      autoCapitalize="none"
                      spellCheck={false}
                      enterKeyHint="next"
                      placeholder="john@company.com"
                      value={values.email}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      onChange={(e) => handleChange("email", e.target.value)}
                      onBlur={() => handleBlur("email")}
                      className="flex h-10 w-full rounded-md border px-3 py-2 text-base md:text-sm bg-secondary/50 border-border focus:border-mint/50 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors"
                    />
                    {errors.email && (
                      <p
                        id="email-error"
                        role="alert"
                        className="text-xs font-mono text-destructive"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div
                    className="space-y-2 animate-fade-up"
                    style={{ animationDelay: "400ms" }}
                  >
                    <label
                      htmlFor="phone"
                      className="block font-medium text-foreground font-mono text-sm"
                    >
                      Phone Number
                    </label>
                    <input
                      ref={phoneRef}
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      inputMode="tel"
                      enterKeyHint="next"
                      placeholder="+91 98765 43210"
                      value={values.phone}
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      onBlur={() => handleBlur("phone")}
                      className="flex h-10 w-full rounded-md border px-3 py-2 text-base md:text-sm bg-secondary/50 border-border focus:border-mint/50 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors"
                    />
                    {errors.phone && (
                      <p
                        id="phone-error"
                        role="alert"
                        className="text-xs font-mono text-destructive"
                      >
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div
                    className="space-y-2 animate-fade-up"
                    style={{ animationDelay: "460ms" }}
                  >
                    <label
                      htmlFor="company"
                      className="block font-medium text-foreground font-mono text-sm"
                    >
                      Company Name
                    </label>
                    <input
                      ref={companyRef}
                      id="company"
                      name="company"
                      type="text"
                      required
                      autoComplete="organization"
                      enterKeyHint="done"
                      placeholder="Acme Inc."
                      value={values.company}
                      aria-invalid={Boolean(errors.company)}
                      aria-describedby={
                        errors.company ? "company-error" : undefined
                      }
                      onChange={(e) => handleChange("company", e.target.value)}
                      onBlur={() => handleBlur("company")}
                      className="flex h-10 w-full rounded-md border px-3 py-2 text-base md:text-sm bg-secondary/50 border-border focus:border-mint/50 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors"
                    />
                    {errors.company && (
                      <p
                        id="company-error"
                        role="alert"
                        className="text-xs font-mono text-destructive"
                      >
                        {errors.company}
                      </p>
                    )}
                  </div>

                  <div
                    className="animate-fade-up"
                    style={{ animationDelay: "520ms" }}
                  >
                    <button
                      type="submit"
                      disabled={submitting}
                      className="cta-glow inline-flex items-center justify-center gap-2 whitespace-nowrap bg-mint text-primary-foreground hover:bg-mint/90 font-bold h-14 rounded-xl px-10 text-base w-full mt-4 transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer"
                    >
                      {submitting ? "Submitting..." : "Submit Inquiry"}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
