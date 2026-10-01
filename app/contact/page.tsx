import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactForm } from "./ContactForm";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C2623] font-sans overflow-x-clip selection:bg-[#D4AF37]/30 flex flex-col">
      <Header />
      <ContactForm />
      <Footer />
    </div>
  );
}
