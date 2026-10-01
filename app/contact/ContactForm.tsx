"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, Mail, Phone, MapPin } from "lucide-react";

export function ContactForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (res.ok) {
        alert('Message sent successfully! We will get back to you soon. You can check your dashboard for updates.');
        form.reset();
      } else {
        alert('Failed to send message.');
      }
    } catch (err) {
      alert('Error sending message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 py-24 px-6 relative flex items-center justify-center">
      {/* Background Decorative elements */}
      <div className="absolute inset-0 bg-[url('/assets/textures/handmade-fiber.webp')] opacity-5 mix-blend-overlay pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F9F0EC] rounded-full blur-3xl opacity-50 -z-10 transform translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F9F0EC] rounded-full blur-3xl opacity-50 -z-10 transform -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-4xl w-full mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/40 bg-white text-[#8C4A52] text-xs font-bold mb-6 shadow-sm">
            <Sparkles className="w-3 h-3" />
            <span>We&apos;re Here to Help</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-[#2C2623]" style={{ fontFamily: 'Cinzel, serif' }}>
            Contact Us
          </h1>
          <p className="text-[#7C7267] font-serif text-lg max-w-2xl mx-auto italic">
            Have questions or need a custom design? Send us a message and we&apos;ll get back to you shortly.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#D4AF37]/20 shadow-floating-ceremony">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-bold text-[#2C2623] uppercase tracking-wide">Name *</label>
                <input 
                  required 
                  id="name" 
                  name="name" 
                  type="text" 
                  className="px-4 py-3 rounded-xl border border-gray-200 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all font-serif bg-[#FAF8F5]/50 focus:bg-white" 
                  placeholder="Your full name" 
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-bold text-[#2C2623] uppercase tracking-wide">Email Address *</label>
                <input 
                  required 
                  id="email" 
                  name="email" 
                  type="email" 
                  className="px-4 py-3 rounded-xl border border-gray-200 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all font-serif bg-[#FAF8F5]/50 focus:bg-white" 
                  placeholder="Your email address" 
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="text-sm font-bold text-[#2C2623] uppercase tracking-wide">Phone Number (Optional)</label>
              <input 
                id="phone" 
                name="phone" 
                type="tel" 
                className="px-4 py-3 rounded-xl border border-gray-200 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all font-serif bg-[#FAF8F5]/50 focus:bg-white" 
                placeholder="Your phone number" 
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-bold text-[#2C2623] uppercase tracking-wide">Message *</label>
              <textarea 
                required 
                id="message" 
                name="message" 
                rows={5} 
                className="px-4 py-3 rounded-xl border border-gray-200 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all font-serif bg-[#FAF8F5]/50 focus:bg-white resize-none" 
                placeholder="How can we help you?"
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="mt-6 w-full py-4 rounded-full bg-[#8C4A52] text-white font-bold shadow-elevated-card hover:bg-[#7a3e45] hover:shadow-floating-ceremony transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span>Sending Message...</span>
              ) : (
                <>
                  <span>Send Message</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>
        
        {/* Quick Contact Info */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-[#F9F0EC] flex items-center justify-center text-[#8C4A52] mb-4">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#2C2623] mb-1">Email Us</h3>
            <p className="text-sm text-[#7C7267] font-serif">support@utsab.com</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-[#F9F0EC] flex items-center justify-center text-[#8C4A52] mb-4">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#2C2623] mb-1">Call Us</h3>
            <p className="text-sm text-[#7C7267] font-serif">+880 1234 567890</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-[#F9F0EC] flex items-center justify-center text-[#8C4A52] mb-4">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#2C2623] mb-1">Visit Us</h3>
            <p className="text-sm text-[#7C7267] font-serif">Dhaka, Bangladesh</p>
          </div>
        </div>
      </div>
    </main>
  );
}
