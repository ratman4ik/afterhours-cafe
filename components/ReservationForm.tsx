"use client";

import { ArrowUpRight, Check } from "lucide-react";
import { FormEvent, useState } from "react";

type Errors = Partial<Record<"name" | "email" | "date" | "guests", string>>;

export function ReservationForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next: Errors = {};
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const date = String(data.get("date") || "");
    const guests = String(data.get("guests") || "");
    if (name.length < 2) next.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email address.";
    if (!date) next.date = "Choose a date.";
    if (!guests) next.guests = "Select your party size.";
    setErrors(next);
    if (Object.keys(next).length === 0) setSent(true);
  };

  if (sent) {
    return (
      <div className="form-success" role="status">
        <Check aria-hidden="true" />
        <h3>Table noted.</h3>
        <p>This is a demo confirmation only. No reservation was sent.</p>
        <button type="button" onClick={() => setSent(false)}>Make another request</button>
      </div>
    );
  }

  return (
    <form className="reservation-form" onSubmit={submit} noValidate>
      <p className="demo-label">Demo form — submissions are not sent</p>
      <div className="field-grid">
        <label>
          <span>Name</span>
          <input name="name" autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} placeholder="Your name" />
          {errors.name && <small id="name-error">{errors.name}</small>}
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} placeholder="you@example.com" />
          {errors.email && <small id="email-error">{errors.email}</small>}
        </label>
        <label>
          <span>Date</span>
          <input name="date" type="date" aria-invalid={Boolean(errors.date)} aria-describedby={errors.date ? "date-error" : undefined} />
          {errors.date && <small id="date-error">{errors.date}</small>}
        </label>
        <label>
          <span>Party</span>
          <select name="guests" defaultValue="" aria-invalid={Boolean(errors.guests)} aria-describedby={errors.guests ? "guests-error" : undefined}>
            <option value="" disabled>Select</option>
            {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>)}
          </select>
          {errors.guests && <small id="guests-error">{errors.guests}</small>}
        </label>
      </div>
      <label className="message-field">
        <span>Anything we should know? <i>Optional</i></span>
        <textarea name="message" rows={3} placeholder="Accessibility needs, dietary notes..." />
      </label>
      <button className="submit-button" type="submit"><span>Request a table</span><ArrowUpRight aria-hidden="true" /></button>
    </form>
  );
}
