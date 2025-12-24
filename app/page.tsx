"use client";

import { Button, Card, CardContent, Link } from "@heroui/react";
import { Download, Heart, Music, Calendar, Zap, ArrowRight, Star, Battery, Camera, Sliders, Sparkles, ChevronDown } from "lucide-react";
import { NotchSimulator } from "./notch-simulator";
import { useGitHubStats, formatNumber } from "./hooks/use-github-stats";
import { motion, AnimatePresence } from "framer-motion";
import { useState, memo } from "react";
import Navbar from "./navbar";
import logo from "../public/logo.png";
import Image from 'next/image';

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
      delayChildren: 0.01
    }
  }
};

export default function Home() {
  const { stats, loading } = useGitHubStats();

  return (
    <div className="flex flex-col min-h-screen noise-overlay">
      
      <Navbar></Navbar>

      <section className="relative pt-36 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#9b2635]/20 blur-[120px] rounded-full" />
          <div className="absolute top-20 right-1/4 w-[600px] h-[600px] bg-[#9b2635]/10 blur-[100px] rounded-full" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[#5f2a5b]/15 blur-[80px] rounded-full" />
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="inline-flex items-center gap-2.5 mb-10 px-5 py-2.5 rounded-full border backdrop-blur-xl"
            style={{
              backgroundColor: 'rgba(139, 90, 90, 0.1)',
              borderColor: 'rgba(139, 90, 90, 0.25)',
            }}
          >
            <Sparkles size={14} className="text-[#C9A87C]" />
            <span className="text-[#C9A87C] font-medium text-sm">
              {loading ? "Loading..." : stats?.version || "v2.0"} is now available
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.06, ease: [0.4, 0, 0.2, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.05]"
          >
            <span className="text-[#A89B91]/60">Not so boring</span>
            <br/>
            <span className="gradient-text-hero">
              Notch
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.12 }}
            className="text-lg md:text-xl text-[#A89B91] mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Transform your MacBook&apos;s notch into a dynamic experience. 
            Music controls, file shelf, calendar, and more.
            <span className="text-[#F5F0EB]"> 100% Free & Open Source.</span>
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.18 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
          >
            <Button 
              asChild
              size="lg" 
              className="btn-primary text-white font-semibold px-8 h-14 text-base rounded-xl"
              variant="primary"
            >
              <a href="https://github.com/TheBoredTeam/boring.notch/releases/latest/download/boringNotch.dmg" className="flex items-center">
                <Download size={20} className="mr-3" />
                Download for macOS
              </a>
            </Button>
            <Button 
              asChild
              size="lg" 
              variant="ghost" 
              className="btn-secondary text-[#F5F0EB] h-14 px-8 rounded-xl"
            >
              <a href="https://github.com/TheBoredTeam/boring.notch" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 no-underline">
                <GitHubLogo size={20} />
                View on GitHub
              </a>
            </Button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.22 }}
            className="flex items-center justify-center gap-8 text-sm text-[#A89B91]/70 mb-20"
          >
            <div className="flex items-center gap-2">
              <Star size={16} className="text-[#C9A87C]" />
              <span>{loading ? "..." : formatNumber(stats?.stars || 0)} stars</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-[#A89B91]/30" />
            <div className="flex items-center gap-2">
              <Download size={16} className="text-[#8B5A5A]" />
              <span>{loading ? "..." : formatNumber(stats?.downloads || 0)} downloads</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-[#A89B91]/30 hidden sm:block" />
            <div className="hidden sm:flex items-center gap-2">
              <span>Free & Open Source</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.15, type: "tween" }}
            style={{ willChange: "transform, opacity" }}
          >
            <NotchSimulator />
          </motion.div>
        </div>
      </section>

      <section id="features" className="py-32 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#8B5A5A]/5 blur-[100px] rounded-full" />
          <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-[#C9A87C]/5 blur-[80px] rounded-full" />
        </div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.35 }}
          >
            <span className="inline-block text-[#C9A87C] text-sm font-medium tracking-wider uppercase mb-4">Features</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#F5F0EB]">
              Transform Your Notch
            </h2>
            <p className="text-[#A89B91] text-lg max-w-2xl mx-auto">
              Packed with features that make your MacBook&apos;s notch actually useful
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <FeatureCard 
              icon={<Music className="text-[#8B5A5A]" size={28} />}
              title="Music Controls"
              description="Your favorite tunes at your fingertips. Watch album covers blend beautifully with magical color effects in your notch."
              gradient="from-[#8B5A5A]/20 to-[#6B4444]/20"
              iconBg="bg-[#8B5A5A]/10"
              delay={0}
            />
            <FeatureCard 
              icon={<Calendar className="text-[#C9A87C]" size={28} />}
              title="Calendar Integration"
              description="All your important dates and meetings pop up right in your notch — super easy to see what's coming up next."
              gradient="from-[#C9A87C]/20 to-[#8B5A5A]/20"
              iconBg="bg-[#C9A87C]/10"
              delay={0.1}
            />
            <FeatureCard 
              icon={<Camera className="text-[#A67C7C]" size={28} />}
              title="Quick Mirror"
              description="Quick camera check before your video call? We've got you covered with a tiny mirror right in your notch."
              gradient="from-[#A67C7C]/20 to-[#8B5A5A]/20"
              iconBg="bg-[#A67C7C]/10"
              delay={0.2}
            />
            <FeatureCard 
              icon={<Battery className="text-[#C9A87C]" size={28} />}
              title="Battery Status"
              description="See how much juice your MacBook has left with elegant battery indicators. No more surprise shutdowns."
              gradient="from-[#C9A87C]/20 to-[#6B4444]/20"
              iconBg="bg-[#C9A87C]/10"
              delay={0.3}
            />
            <FeatureCard 
              icon={<Zap className="text-[#8B5A5A]" size={28} />}
              title="File Shelf"
              description="Drop files right into your notch for super-quick sharing! Drag, drop, done. It's like a temporary pocket."
              gradient="from-[#8B5A5A]/20 to-[#C9A87C]/20"
              iconBg="bg-[#8B5A5A]/10"
              delay={0.4}
            />
            <FeatureCard 
              icon={<Sliders className="text-[#A67C7C]" size={28} />}
              title="Redesigned HUD"
              description="Replace the standard macOS HUDs with beautiful sliders that blend seamlessly into the notch."
              gradient="from-[#A67C7C]/20 to-[#6B4444]/20"
              iconBg="bg-[#A67C7C]/10"
              delay={0.5}
            />
          </motion.div>
        </div>
      </section>

      <section id="testimonials" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#121010] to-transparent" />
          <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#8B5A5A]/5 blur-[150px] rounded-full" />
          <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-[#C9A87C]/5 blur-[120px] rounded-full" />
        </div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.35 }}
          >
            <span className="inline-block text-[#C9A87C] text-sm font-medium tracking-wider uppercase mb-4">Testimonials</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#F5F0EB]">
              Loved by the Community
            </h2>
            <p className="text-[#A89B91] text-lg">
              See what people are saying about Boring Notch
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <TestimonialCard 
              quote="The Boring notch is the best open source project for Mac both my team and I have ever used. It improved team meeting attendance rate by over 63%."
              author="Dextr Studios"
              delay={0}
            />
            <TestimonialCard 
              quote="Boring Notch is an incredibly handy tool. The shelf feature, in particular, is amazing—it has made my daily tasks so much easier."
              author="Alessandrx"
              delay={0.1}
            />
            <TestimonialCard 
              quote="I love the intuitive design, the smoothness and the ability to add on a non-notch Mac is the piece de resistance. Absolute Perfection."
              author="Akki."
              delay={0.2}
            />
            <TestimonialCard 
              quote="Boring Notch makes amazing use of the notch space on MacBooks, which is normally really annoying. Can't believe I used to live without it!"
              author="Dan"
              delay={0.3}
            />
            <TestimonialCard 
              quote="I hate tabbing in and out just to change what song I'm listening to, boring notch has significantly improved my workflow. I love it."
              author="grim"
              delay={0.4}
            />
            <TestimonialCard 
              quote="Boring notch speeds up my workflow by at least 2X, can't return to when I didn't have one!"
              author="Benjamin"
              delay={0.5}
            />
          </motion.div>

          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.32, delay: 0.18 }}
          >
            <Button asChild variant="ghost" className="btn-secondary text-[#A89B91] hover:text-[#F5F0EB] rounded-xl px-6 py-3">
              <a href="https://tally.so/r/3qj8pG" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 no-underline">
                Share your experience
                <ArrowRight size={16} />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      <section id="faq" className="py-32 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[#8B5A5A]/5 blur-[100px] rounded-full" />
        </div>
        
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.35 }}
          >
            <span className="inline-block text-[#C9A87C] text-sm font-medium tracking-wider uppercase mb-4">FAQ</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#F5F0EB]">
              Common Questions
            </h2>
            <p className="text-[#A89B91] text-lg">
              Everything you need to know
            </p>
          </motion.div>
          
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.28 }}
          >
            <FAQItem 
              question="What is Boring Notch?"
              answer="Boring Notch is an open-source application that transforms your MacBook's notch into a functional area, similar to the Dynamic Island feature on iPhones. It adds music controls, visualizations, a file shelf to enhance drag and drop and file sharing, and other useful features to the notch area."
            />
            <FAQItem 
              question="Is Boring Notch compatible with all Mac models?"
              answer="Boring Notch works best on MacBooks with a notch (2021 and newer MacBook Pro and MacBook Air models). However, it also supports non-notch Macs with a simulated notch experience!"
            />
            <FAQItem 
              question="How do I install Boring Notch?"
              answer="Download the DMG file from our releases page, open it, and drag Boring Notch to your Applications folder. Since we don't have an Apple Developer account, you'll need to go to Settings → Privacy & Security and click 'Open Anyway' after the first launch."
            />
            <FAQItem 
              question="What features does Boring Notch offer?"
              answer="Currently, Boring Notch has media controls, battery indicators, calendar and reminders, a replacement for the default macOS HUDs, and a file shelf for easy drag and drop. Boring Notch is actively maintained, and new features are always being added!"
            />
            <FAQItem 
              question="Is Boring Notch free to use?"
              answer="Yes! Boring Notch is completely free and open-source. Unlike some paid alternatives, we offer all our features for free. If you'd like to support development, you can sponsor us on GitHub or buy us a coffee!"
            />
            <FAQItem 
              question="Is Boring Notch resource-intensive?"
              answer="Boring Notch is designed to be extremely lightweight and efficient. However, as with any application, its impact on system resources may vary depending on your Mac's specifications and the features you use."
            /> 
          </motion.div>
        </div>
      </section>

      <section id="download" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-[#8B5A5A]/10 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#8B5A5A]/15 blur-[100px] rounded-full" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-[#C9A87C]/10 blur-[80px] rounded-full" />
        </div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.35 }}
          >
            <span className="inline-block text-[#C9A87C] text-sm font-medium tracking-wider uppercase mb-4">Get Started</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#F5F0EB]">
              Ready to transform your notch?
            </h2>
            <p className="text-[#A89B91] text-lg mb-12 max-w-2xl mx-auto">
              Download now and join thousands of users who&apos;ve transformed their MacBook experience.
            </p>
          </motion.div>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.32, delay: 0.12 }}
          >
            <Button 
              asChild
              size="lg" 
              className="btn-primary text-white font-semibold px-10 h-14 text-base rounded-xl"
              variant="primary"
            >
              <a href="https://github.com/TheBoredTeam/boring.notch/releases/latest/download/boringNotch.dmg" className="flex items-center">
                <Download size={20} className="mr-3" />
                Download for macOS
              </a>
            </Button>
            <Button 
              asChild
              size="lg" 
              variant="ghost" 
              className="btn-secondary text-[#F5F0EB] h-14 px-8 rounded-xl"
            >
              <a href="https://github.com/TheBoredTeam/boring.notch" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <GitHubLogo size={20} />
                View Source
              </a>
            </Button>
          </motion.div>

          <motion.div 
            className="gradient-border p-px max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.32, delay: 0.18 }}
          >
            <div className="bg-[#1A1616] rounded-2xl p-5">
              <p className="text-[#C9A87C]/90 text-sm">
                <strong className="text-[#C9A87C]">First-time install?</strong> After opening, go to Settings → Privacy & Security and click &quot;Open Anyway&quot;. This is a one-time step since we&apos;re not signed with Apple.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
          >
            <Card className="gradient-border overflow-hidden">
              <CardContent className="flex flex-col md:flex-row items-center justify-between gap-8 p-10 text-center md:text-left bg-gradient-to-br from-[#1A1616] to-[#121010]">
                <div>
                  <h3 className="text-2xl font-bold mb-3 flex items-center justify-center md:justify-start gap-3 text-[#F5F0EB]">
                    <Heart className="text-[#8B5A5A] fill-[#8B5A5A]" size={24} />
                    Support Open Source
                  </h3>
                  <p className="text-[#A89B91] max-w-md">
                    Boring Notch is completely free. If you love the app, consider supporting the development to keep the updates coming!
                  </p>
                </div>
                <div className="flex gap-4">
                  <Button asChild className="btn-primary text-white font-semibold rounded-xl w-40 h-10">
                    <a href="https://github.com/sponsors/TheBoredTeam" target="_blank" rel="noopener noreferrer" className="flex items-center no-underline">
                      <GitHubLogo size={20} className="mr-2" />
                      Sponsor
                    </a>
                  </Button>
                  <a href="https://ko-fi.com/alexander5015" target="_blank" rel="noopener noreferrer" className="inline-block py-0 h-10 coffee rounded-xl">
                    <img 
                      src="https://storage.ko-fi.com/cdn/kofi1.png?v=3" 
                      alt="Buy Me a Coffee at ko-fi.com" 
                      style={{ height: '100%', border: '0px' }}
                    />
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-white/[0.04] py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3">
              <Image
                src={logo}
                width={40}
                style={{paddingRight: 5}}
                alt="Notch Logo"
                >
              </Image>
              <span className="font-semibold text-[#F5F0EB]">Boring Notch</span>
            </div>
            
            <div className="flex items-center gap-8 text-sm text-[#A89B91]">
              <a href="https://github.com/TheBoredTeam/boring.notch" target="_blank" rel="noopener noreferrer" className="hover:text-[#F5F0EB] transition-colors duration-300 flex items-center gap-2">
                <GitHubLogo size={16} />
                GitHub
              </a>
              <a href="https://discord.com/invite/HznxBpnJmQ" target="_blank" rel="noopener noreferrer" className="hover:text-[#F5F0EB] transition-colors duration-300">
                Discord
              </a>
              <a href="https://github.com/TheBoredTeam/boring.notch/issues" target="_blank" rel="noopener noreferrer" className="hover:text-[#F5F0EB] transition-colors duration-300">
                Report Bug
              </a>
              <a href="https://peerlist.io/theboringteam/project/boringnotch" target="_blank" rel="noopener noreferrer" className="hover:text-[#F5F0EB] transition-colors duration-300">
                Peerlist
              </a>
            </div>
            
            <p className="text-[#A89B91]/60 text-sm">
              © {new Date().getFullYear()} TheBoringTeam. GPLv3 License.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const FeatureCard = memo(({ 
  icon, 
  title, 
  description, 
  gradient,
  iconBg,
  delay = 0
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  gradient: string;
  iconBg?: string;
  delay?: number;
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
          visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.32, delay, ease: [0.4, 0, 0.2, 1] }
        }
      }}
    >
      <Card className="premium-card rounded-2xl overflow-hidden group h-full">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-220`} />
        <CardContent className="p-7 relative z-10">
          <div className={`mb-5 p-3.5 ${iconBg || 'bg-white/5'} rounded-xl w-fit`}>
            {icon}
          </div>
          <h4 className="font-semibold text-lg mb-3 text-[#F5F0EB]">{title}</h4>
          <p className="text-[#A89B91] text-sm leading-relaxed">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
});
FeatureCard.displayName = 'FeatureCard';


const TestimonialCard = memo(({ quote, author, delay = 0 }: { quote: string; author: string; delay?: number }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.32, delay, ease: [0.4, 0, 0.2, 1] }
        }
      }}
    >
      <Card className="premium-card rounded-2xl h-full">
        <CardContent className="p-7">
          <div className="mb-4">
            <svg className="w-8 h-8 text-[#8B5A5A]/40" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
            </svg>
          </div>
          <p className="text-[#F5F0EB]/80 text-sm leading-relaxed mb-5">{quote}</p>
          <p className="text-[#C9A87C] text-sm font-medium">— {author}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
});
TestimonialCard.displayName = 'TestimonialCard';

const FAQItem = memo(({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      className="premium-card rounded-xl overflow-hidden cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
      whileHover={{ scale: 1.005 }}
      transition={{ duration: 0.12 }}
    >
      <div className="flex items-center justify-between p-5">
        <h4 className="font-medium text-[#F5F0EB] pr-4">{question}</h4>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
          className="flex-shrink-0"
        >
          <ChevronDown size={20} className="text-[#8B5A5A]" />
        </motion.div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <p className="text-[#A89B91] text-sm leading-relaxed px-5 pb-5">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});
FAQItem.displayName = 'FAQItem';