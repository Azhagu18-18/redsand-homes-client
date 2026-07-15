"use client";

import ContactHero from "./ContactHero";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import OfficeLocation from "./OfficeLocation";
import ContactCTA from "./ContactCTA";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero */}
      <ContactHero />

      {/* Contact Form + Info */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <ContactForm />
          <ContactInfo />
        </div>
      </section>

      {/* Office Location */}
      <OfficeLocation />

      {/* Bottom CTA */}
      <ContactCTA />
    </main>
  );
}