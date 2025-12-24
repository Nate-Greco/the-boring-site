import { memo, useEffect, useState } from "react";
import { Button, Card, CardContent, Link } from "@heroui/react";
import { Download, Heart, Music, Calendar, Zap, ArrowRight, Star, Battery, Camera, Sliders, Sparkles, ChevronDown } from "lucide-react";
import { NotchSimulator } from "./notch-simulator";
import { useGitHubStats, formatNumber } from "./hooks/use-github-stats";
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image';
import logo from "../public/logo.png";

const GitHubLogo = memo(({ size = 18, className = "", ...props }: { size?: number; className?: string }) => (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M8 .198a8 8 0 00-2.53 15.59c.4.074.547-.174.547-.388 0-.192-.007-.7-.01-1.374-2.226.483-2.695-1.073-2.695-1.073-.364-.924-.89-1.171-.89-1.171-.727-.497.055-.487.055-.487.803.056 1.226.825 1.226.825.714 1.223 1.873.87 2.33.666.072-.517.28-.87.508-1.07-1.777-.202-3.644-.888-3.644-3.955 0-.874.312-1.588.824-2.148-.083-.203-.357-1.017.078-2.12 0 0 .672-.215 2.2.82a7.65 7.65 0 012.004-.27c.68.003 1.366.092 2.004.27 1.526-1.035 2.197-.82 2.197-.82.437 1.103.163 1.917.08 2.12.513.56.823 1.274.823 2.148 0 3.076-1.87 3.75-3.653 3.947.287.247.543.735.543 1.48 0 1.068-.01 1.93-.01 2.192 0 .215.145.466.55.387A8.001 8.001 0 008 .198z" />
    </svg>
  ));
  GitHubLogo.displayName = 'GitHubLogo';
export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const { stats, loading } = useGitHubStats();
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []); 
    return (
        <header className={`fixed top-0 left-0 right-0 z-50 border-b glass left-0 border-white/[0.04] transition-all duration-300 backdrop-blur-xs`}>
        <div className={`flex items-center justify-between px-6 py-4 max-w-7xl mx-auto transition-all duration-300`}>
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
          >
            <Image
                src={logo}
                width={40}
                style={{paddingRight: 5}}
                alt="Notch Logo"
                >
              </Image>
            <p className="font-bold text-[#F5F0EB] tracking-tight text-xl">Boring Notch</p>
          </motion.div>
          <nav className="hidden md:flex items-center gap-2 text-sm">
            {["Features", "Testimonials", "FAQ", "Discord"].map((item, i) => (
              <motion.a
                key={item}
                href={item === "Discord" ? "https://discord.com/invite/HznxBpnJmQ" : `#${item.toLowerCase()}`}
                target={item === "Discord" ? "_blank" : undefined}
                rel={item === "Discord" ? "noopener noreferrer" : undefined}
                className="no-underline px-4 py-2 text-[#A89B91] hover:text-[#F5F0EB] rounded-lg hover:bg-white/[0.04] transition-all duration-200"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22, delay: 0.06 * i }}
              >
                {item}
              </motion.a>
            ))}
          </nav>
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
          >
            <Button asChild variant="ghost" className="hidden sm:flex btn-secondary rounded-xl px-4 py-2">
              <Link href="https://github.com/TheBoredTeam/boring.notch" target="_blank" className="flex items-center gap-2 no-underline text-[#A89B91] hover:text-[#F5F0EB]">
                <GitHubLogo size={18} />
                <span className="hidden lg:inline">Star</span>
                {!loading && stats && (
                  <span className="bg-[#8B5A5A]/20 text-[#C9A87C] px-2 py-0.5 rounded-full text-xs font-medium">
                    {formatNumber(stats.stars)}
                  </span>
                )}
              </Link>
            </Button>
            <Button asChild variant="primary" className="btn-primary font-semibold rounded-xl px-5 py-2.5 text-white">
              <Link href="#download" className="flex items-center no-underline">
                Download
              </Link>
            </Button>
          </motion.div>
        </div>
      </header>
    );
}