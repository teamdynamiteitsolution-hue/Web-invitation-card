import Link from "next/link";
import { ArrowRight, User } from "lucide-react";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function Header() {
  const cookieStore = cookies();
  const token = cookieStore.get('auth_token')?.value;
  let username = null;
  let role = null;

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret");
      const { payload } = await jwtVerify(token, secret);
      username = payload.username as string;
      role = payload.role as string;
    } catch (e) {
      // Invalid token
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full px-6 md:px-12 py-4 md:py-5 flex items-center justify-between border-b border-[#D4AF37]/20 bg-[#FAF8F5]/90 backdrop-blur-md shadow-sm transition-all duration-300">
      <Link href="/" className="text-3xl md:text-4xl font-bold text-[#8C4A52]" style={{ fontFamily: 'Noto Serif Bengali, serif' }}>
        উৎসব
      </Link>
      
      <nav className="hidden md:flex items-center gap-8 font-serif text-[#7C7267] text-sm tracking-wide">
        <Link href="/" className="hover:text-[#D4AF37] transition-colors">Home</Link>
        <Link href="/templates" className="hover:text-[#D4AF37] transition-colors">Templates</Link>
        <Link href="/how-it-works" className="hover:text-[#D4AF37] transition-colors">How It Works</Link>
        <Link href="/contact" className="hover:text-[#D4AF37] transition-colors">Contact Us</Link>
      </nav>
      
      <div className="flex items-center gap-4">
        {username ? (
          <Link href={role === "ADMIN" ? "/admin" : "/dashboard"} className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-[#E8D8D0] border border-[#D4AF37]/50 flex items-center justify-center text-[#8C4A52] group-hover:bg-[#D4AF37]/20 transition-colors">
              <User className="w-5 h-5" />
            </div>
            <span className="hidden md:block text-sm font-bold text-[#2C2623] capitalize">
              {username}
            </span>
          </Link>
        ) : (
          <Link href="/login" className="hidden md:block text-sm font-serif text-[#7C7267] hover:text-[#2C2623]">
            Sign In
          </Link>
        )}
        <Link href="/create" className="px-5 py-2.5 rounded-full bg-[#8C4A52] text-white text-sm font-bold shadow-soft-surface hover:bg-[#7a3e45] hover:shadow-elevated-card transition-all active:scale-95 flex items-center gap-2">
          <span className="hidden md:inline">Get Started</span>
          <ArrowRight className="w-4 h-4 md:hidden" />
        </Link>
      </div>
    </header>
  );
}
