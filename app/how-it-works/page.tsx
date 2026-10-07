import { Header } from "@/components/Header";
import HowItWorksClient from "./HowItWorksClient";

export const metadata = {
  title: "How It Works | উৎসব (Utsab)",
  description: "Learn how to create, customize, and share your interactive digital invitation in 5 simple steps.",
};

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C2623] font-sans selection:bg-[#D4AF37]/30">
      <Header />
      <HowItWorksClient />
    </div>
  );
}


