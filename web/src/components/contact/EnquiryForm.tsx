"use client";

import { type ReactNode, useActionState, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { TopicSelect } from "@/components/contact/TopicSelect";
import { submitEnquiry } from "@/lib/enquiry/actions";
import { type CheckedField, checkField } from "@/lib/enquiry/schema";
import { EMPTY_STATE, type EnquiryField } from "@/lib/enquiry/types";

const FIELD_CLASS =
  "h-11 w-full rounded-lg border bg-white px-3.5 text-[15px] text-ink";

interface EnquiryFormProps {
  submitLabel: string;
  privacyNote: string;
  /** Rendered on the server and passed down, so the icon registry stays out
   *  of the client bundle. */
  lockIcon: ReactNode;
}

/**
 * The enquiry form. Ported from the <form> in
 * php/include/sections/contact.php plus the client validation in
 * js/site.js lines 227-312.
 *
 * The client check exists only to spare the visitor a round trip; the Server
 * Action remains the authority and is what runs when the script does not.
 * Both sides import the same Zod schema, so the two cannot drift.
 */
export function EnquiryForm({
  submitLabel,
  privacyNote,
  lockIcon,
}: EnquiryFormProps) {
  // The third argument is the permalink: on a failed submit with JavaScript
  // off, the browser lands there instead of re-rendering the POST, preserving
  // both the post-redirect-get and the #contact scroll position.
  const [state, formAction] = useActionState(
    submitEnquiry,
    EMPTY_STATE,
    "/#contact",
  );

  // Live client-side errors, merged over whatever the server returned.
  const [clientErrors, setClientErrors] = useState<
    Partial<Record<EnquiryField, string>>
  >({});
  const [showAlert, setShowAlert] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const errors = { ...state.errors, ...clientErrors };

  function validateField(name: CheckedField, value: string) {
    setClientErrors((prev) => ({
      ...prev,
      [name]: checkField(name, value) ?? undefined,
    }));
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    const form = e.currentTarget;
    const next: Partial<Record<EnquiryField, string>> = {};

    for (const name of ["name", "phone", "email"] as CheckedField[]) {
      const input = form.elements.namedItem(name) as HTMLInputElement | null;
      const message = checkField(name, input?.value ?? "");
      if (message) next[name] = message;
    }

    if (Object.keys(next).length > 0) {
      e.preventDefault();
      setClientErrors(next);
      setShowAlert(true);
      const first = Object.keys(next)[0];
      const input = form.elements.namedItem(first) as HTMLInputElement | null;
      input?.focus({ preventScroll: true });
      input?.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }

    setShowAlert(false);
  }

  const alertVisible = showAlert || Object.keys(state.errors).length > 0;

  return (
    <>
      <div
        role="alert"
        hidden={!alertVisible}
        className="rounded-[10px] border border-[#F0C9C9] bg-[#FDF1F1] px-4 py-3.5 text-[14.5px] text-[#8C2B2B]"
      >
        Please check the highlighted fields and try again.
      </div>

      {/* noValidate suppresses the browser's own bubbles so the messages match
          the site. key={state.formKey} remounts the form after a failed
          submit: React 19 resets uncontrolled fields once an action
          completes, and the remount is what lets defaultValue restore what
          the visitor typed. */}
      <form
        key={state.formKey}
        ref={formRef}
        action={formAction}
        onSubmit={onSubmit}
        noValidate
        className="flex flex-col gap-5"
      >
        {/* Honeypot. Named hp_ref rather than "website", and with no visible
            label: "website" sits in Chrome's autofill heuristics, so the
            browser could fill it for a real visitor and get them rejected as
            a bot. autocomplete="off" alone is not reliably honoured. */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <input
            type="text"
            id="hp_ref"
            name="hp_ref"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(140px,100%),1fr))] gap-3.5">
          <InputRow
            name="name"
            label="Your name"
            placeholder="Full name"
            autoComplete="name"
            required
            defaultValue={state.values.name}
            error={errors.name}
            onValidate={validateField}
          />
          <InputRow
            name="phone"
            label="Phone"
            type="tel"
            placeholder="+91"
            autoComplete="tel"
            required
            defaultValue={state.values.phone}
            error={errors.phone}
            onValidate={validateField}
          />
        </div>

        <InputRow
          name="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          defaultValue={state.values.email}
          error={errors.email}
          onValidate={validateField}
        />

        <TopicSelect defaultValue={state.values.topic} />

        <div className="flex flex-col gap-[7px]">
          <label
            htmlFor="f-details"
            className="text-[13.5px] font-semibold text-body"
          >
            A few details
          </label>
          <textarea
            id="f-details"
            name="details"
            rows={4}
            maxLength={2000}
            defaultValue={state.values.details}
            placeholder="Salaried with some capital gains this year, first time filing ITR-2…"
            className="w-full resize-y rounded-lg border border-line-input bg-white p-3.5 text-[15px] leading-normal text-ink"
          />
        </div>

        <SubmitButton label={submitLabel} />

        <div className="flex items-center justify-center gap-2">
          {lockIcon}
          <span className="text-[13.5px] text-muted-2">{privacyNote}</span>
        </div>
      </form>
    </>
  );
}

/**
 * The PHP form had no pending state, but a Server Action takes a second or
 * three and a marketing form with no feedback gets double-submitted — and a
 * duplicate lead in the inbox is a real cost.
 */
function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex h-12 cursor-pointer items-center justify-center rounded-lg border-none bg-brand text-base font-semibold text-white shadow-[0_8px_20px_-10px_rgba(20,102,190,0.65)] transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Sending…" : label}
    </button>
  );
}

interface InputRowProps {
  name: CheckedField;
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  defaultValue: string;
  error?: string;
  onValidate: (name: CheckedField, value: string) => void;
}

/**
 * One text input with its label and a persistent error slot.
 *
 * The <p> is always in the DOM (hidden when empty) so the server and the
 * client check write to the same element, rather than one of them having to
 * invent markup the other also knows how to produce.
 */
function InputRow({
  name,
  label,
  type = "text",
  placeholder = "",
  autoComplete = "off",
  required = false,
  defaultValue,
  error,
  onValidate,
}: InputRowProps) {
  return (
    <div className="flex flex-col gap-[7px]">
      <label
        htmlFor={`f-${name}`}
        className="text-[13.5px] font-semibold text-body"
      >
        {label}
      </label>
      <input
        type={type}
        id={`f-${name}`}
        name={name}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        autoComplete={autoComplete}
        aria-describedby={`e-${name}`}
        aria-invalid={error ? true : undefined}
        onBlur={(e) => onValidate(name, e.target.value)}
        onInput={(e) => onValidate(name, e.currentTarget.value)}
        className={`${FIELD_CLASS} ${error ? "border-[#D98A8A]" : "border-line-input"}`}
      />
      <p
        id={`e-${name}`}
        hidden={!error}
        className="text-[13px] text-[#8C2B2B]"
      >
        {error}
      </p>
    </div>
  );
}
