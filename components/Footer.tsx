import Link from "next/link";
import { Sparkles, Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-[#1A1614] text-white pt-20 pb-10 px-6 border-t-[8px] border-[#8C4A52]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="lg:col-span-1">
            <Link href="/" className="text-3xl font-bold text-[#D4AF37] mb-6 block" style={{ fontFamily: 'Noto Serif Bengali, serif' }}>
              উৎসব
            </Link>
            <p className="text-gray-400 font-serif italic mb-6">
              Transforming traditional life events into timeless, interactive digital experiences.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#1A1614] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#1A1614] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#1A1614] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-[#F9F0EC] uppercase tracking-widest mb-6">Explore</h4>
            <ul className="space-y-4">
              <li><Link href="/templates" className="text-gray-400 hover:text-[#D4AF37] transition-colors">Templates & Collections</Link></li>
              <li><Link href="/pricing" className="text-gray-400 hover:text-[#D4AF37] transition-colors">Pricing Plans</Link></li>
              <li><Link href="/how-it-works" className="text-gray-400 hover:text-[#D4AF37] transition-colors">How It Works</Link></li>
              <li><Link href="/create" className="text-gray-400 hover:text-[#D4AF37] transition-colors">Create Invitation</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#F9F0EC] uppercase tracking-widest mb-6">Support</h4>
            <ul className="space-y-4">
              <li><Link href="/faq" className="text-gray-400 hover:text-[#D4AF37] transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-[#D4AF37] transition-colors">Contact Us</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-[#D4AF37] transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-[#D4AF37] transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#F9F0EC] uppercase tracking-widest mb-6">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-4">Subscribe for the latest premium templates and features.</p>
            <div className="flex items-center">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-white/10 border border-white/20 text-white px-4 py-3 rounded-l-lg focus:outline-none focus:border-[#D4AF37] w-full"
              />
              <button className="bg-[#D4AF37] text-[#1A1614] px-4 py-3 rounded-r-lg font-bold hover:bg-[#c09d2f] transition-colors">
                <Sparkles className="w-5 h-5" />
              </button>
            </div>
          </div>
          
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Utsab Interactive. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span>Made with ❤️ in Bangladesh</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
