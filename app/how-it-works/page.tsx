import Link from "next/link";
import { ArrowRight, Calendar, CreditCard, LayoutTemplate, MapPin, Share2, Sparkles, Wand2 } from "lucide-react";
import { Header } from "@/components/Header";

export const metadata = {
  title: "How It Works | উৎসব (Utsab)",
  description: "Learn how to create and share your interactive digital invitation in 8 simple steps.",
};

export default function HowItWorksPage() {
  const steps = [
    {
      num: "01",
      title: "Choose Your Occasion",
      desc: "Start by selecting the perfect category for your event—Wedding, Haldi, Boubhat, Akhd, Birthday, or Anniversary. Every category is tailored with a unique ceremonial identity.",
      icon: <Calendar className="w-6 h-6 text-[#D4AF37]" />,
      image: "/assets/previews/how-it-works/step-1.webp",
      color: "bg-[#F9F0EC]"
    },
    {
      num: "02",
      title: "Select a Masterpiece",
      desc: "Browse professionally art-directed invitation templates. We provide carefully curated typography, botanical frames, and ceremonial color palettes so you don't have to start from scratch.",
      icon: <LayoutTemplate className="w-6 h-6 text-[#D4AF37]" />,
      image: "/assets/previews/how-it-works/step-2.webp",
      color: "bg-[#E8D8D0]"
    },
    {
      num: "03",
      title: "Choose the Opening Experience",
      desc: "Your invitation is not just a flat image. Decide how it reveals itself to your guests: a wax-sealed envelope, a theatrical curtain, a multi-scratch card, or a scroll story.",
      icon: <Sparkles className="w-6 h-6 text-[#D4AF37]" />,
      image: "/assets/previews/how-it-works/step-3.webp",
      color: "bg-[#2C2623]",
      dark: true
    },
    {
      num: "04",
      title: "Personalize Your Details",
      desc: "Enter your names, event date, venue, Google Maps location, and personal message in our intuitive studio builder. Typography and layout stay perfectly bounded.",
      icon: <MapPin className="w-6 h-6 text-[#D4AF37]" />,
      image: "/assets/previews/how-it-works/step-4.webp",
      color: "bg-[#FAF8F5]"
    },
    {
      num: "05",
      title: "Preview the Magic",
      desc: "Experience the interactive opening sequence exactly as your guests will see it on their mobile devices before you finalize your order.",
      icon: <Wand2 className="w-6 h-6 text-[#D4AF37]" />,
      image: "/assets/previews/how-it-works/step-5.webp",
      color: "bg-[#F9F0EC]"
    },
    {
      num: "06",
      title: "Select Hosting Duration",
      desc: "Decide how long you want your invitation URL to remain active. Choose between 15, 30, 45, 60, or 90 days of secure premium hosting.",
      icon: <Calendar className="w-6 h-6 text-[#D4AF37]" />,
      image: "/assets/previews/how-it-works/step-6.webp",
      color: "bg-[#E8D8D0]"
    },
    {
      num: "07",
      title: "Pay Securely",
      desc: "Checkout easily using verified local Bangladesh payment methods including bKash, Nagad, Rocket, or any major credit card.",
      icon: <CreditCard className="w-6 h-6 text-[#D4AF37]" />,
      image: "/assets/previews/how-it-works/step-7.webp",
      color: "bg-[#FAF8F5]"
    },
    {
      num: "08",
      title: "Share Your Joy",
      desc: "Your invitation is instantly published. Share your unique premium link via WhatsApp, Messenger, or any social platform. Your guests are ready to be amazed.",
      icon: <Share2 className="w-6 h-6 text-[#D4AF37]" />,
      image: "/assets/previews/how-it-works/step-8.webp",
      color: "bg-[#2C2623]",
      dark: true
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C2623] font-sans selection:bg-[#D4AF37]/30">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'Cinzel, serif' }}>
          The Journey of Your Invitation
        </h1>
        <p className="text-[#7C7267] font-serif text-lg italic max-w-2xl mx-auto leading-relaxed">
          Creating a breathtaking interactive digital invitation shouldn’t be complicated. Here is how you can transform your traditional moments into a digital masterpiece in just a few steps.
        </p>
      </section>

      {/* Alternating Steps Section */}
      <section className="pb-32 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="space-y-0">
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={step.num} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-stretch rounded-[32px] overflow-hidden mb-12 shadow-soft-surface ${step.color} ${step.dark ? 'text-white' : 'text-[#2C2623]'}`}>
                
                {/* Content Side */}
                <div className="flex-1 p-10 md:p-16 flex flex-col justify-center relative">
                  <div className="absolute top-8 left-8 text-6xl md:text-8xl font-bold opacity-10 pointer-events-none" style={{ fontFamily: 'Cinzel, serif' }}>
                    {step.num}
                  </div>
                  
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-[#D4AF37]/30 flex items-center justify-center mb-6 shadow-inner-emboss">
                      {step.icon}
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Cinzel, serif' }}>
                      {step.title}
                    </h3>
                    <p className={`font-serif text-lg leading-relaxed ${step.dark ? 'text-[#D8CFC4]' : 'text-[#7C7267]'}`}>
                      {step.desc}
                    </p>
                  </div>
                </div>

                {/* Visual Side */}
                <div className={`flex-1 relative min-h-[300px] lg:min-h-[400px] bg-black/5 flex items-center justify-center p-8`}>
                  <div className="absolute inset-0 bg-[url('/assets/textures/handmade-fiber.webp')] opacity-30 mix-blend-multiply pointer-events-none" />
                  
                  {/* Decorative Placeholder for Image */}
                  <div className="relative w-full max-w-sm aspect-[4/5] rounded-xl bg-white/20 backdrop-blur-sm border border-white/40 shadow-elevated-card flex items-center justify-center overflow-hidden">
                     {/* In a real scenario, this would be an actual mockup image */}
                     <img 
                        src={step.image} 
                        alt={step.title} 
                        className="w-full h-full object-cover"
                     />
                     <div className="absolute inset-0 flex items-center justify-center opacity-50 pointer-events-none">
                        <span className="font-serif italic text-sm">Visual Placeholder {step.num}</span>
                     </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center px-6 border-t border-[#D4AF37]/20 bg-gradient-to-b from-[#FAF8F5] to-[#F9F0EC]">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#2C2623]" style={{ fontFamily: 'Cinzel, serif' }}>
          Ready to Begin?
        </h2>
        <p className="text-[#7C7267] font-serif text-lg mb-10 max-w-xl mx-auto">
          Start exploring our collection and create an invitation that your guests will remember forever.
        </p>
        <Link href="/templates" className="inline-flex px-8 py-4 rounded-full bg-[#8C4A52] text-white font-bold shadow-elevated-card hover:bg-[#7a3e45] transition-all active:scale-95 items-center gap-3">
          <span>Explore Templates</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
