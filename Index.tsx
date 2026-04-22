import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Mail, Phone, MapPin, Github, Linkedin, Instagram, Send,
  ArrowRight, Code2, Sparkles, Bot, Cpu, Palette, Brain,
  GraduationCap, Calendar, Award, ExternalLink, Menu, X, ChevronDown
} from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { z } from "zod";

import sowmiyaPhoto from "@/assets/sowmiya.jpg";
import projGenAI from "@/assets/project-genai.jpg";
import proj3D from "@/assets/project-3d.jpg";
import projRobotics from "@/assets/project-robotics.jpg";
import projPython from "@/assets/project-python.jpg";

import type { Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Gallery", href: "#gallery" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

/* ---------------- Loader ---------------- */
function Loader({ done }: { done: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: done ? 0 : 1, pointerEvents: done ? "none" : "auto" }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
    >
      <div className="relative">
        <div className="w-24 h-24 rounded-full border-2 border-primary/20" />
        <div className="absolute inset-0 w-24 h-24 rounded-full border-2 border-t-primary border-r-secondary animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center font-display text-2xl text-gradient">
          S
        </div>
      </div>
    </motion.div>
  );
}

/* ---------------- Navbar ---------------- */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onS = () => setScrolled(window.scrollY > 30);
    onS();
    window.addEventListener("scroll", onS);
    return () => window.removeEventListener("scroll", onS);
  }, []);
  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, delay: 1.4 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className={`mx-auto max-w-6xl px-4 transition-all ${scrolled ? "" : ""}`}>
        <div className={`flex items-center justify-between rounded-full px-5 py-3 ${scrolled ? "glass-strong" : "glass"}`}>
          <a href="#home" className="font-display text-lg font-bold text-gradient">S. Sowmiya</a>
          <ul className="hidden md:flex items-center gap-7">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group">
                  {l.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="hidden md:inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium hover:opacity-90 transition">
            Let's talk <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-full glass">
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
        {open && (
          <div className="md:hidden mt-2 glass-strong rounded-2xl p-5 flex flex-col gap-4">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-foreground">
                {l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.nav>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 150]);
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-24">
      {/* Aurora bg */}
      <motion.div style={{ y }} className="absolute inset-0 aurora-bg animate-aurora" />
      <div className="absolute inset-0 grid-overlay" />

      <div className="relative mx-auto max-w-6xl px-4 grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
        {/* Text */}
        <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.15 } } }}>
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-xs text-muted-foreground tracking-wide">Available for collaborations</span>
          </motion.div>
          <motion.h1 variants={fadeUp} className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.95]">
            Hi, I'm<br />
            <span className="text-gradient glow-text">S. Sowmiya</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
            Engineering Student · Python Developer · Creative Thinker — exploring the intersection of{" "}
            <span className="text-foreground">Generative AI</span>,{" "}
            <span className="text-foreground">3D Animation</span> and{" "}
            <span className="text-foreground">Robotics</span>.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
            <a href="#projects" className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium animate-glow-pulse hover:scale-105 transition-transform">
              View My Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full glass-strong hover:bg-white/10 transition">
              Get in touch
            </a>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-12 flex items-center gap-8">
            <div>
              <div className="font-display text-2xl text-gradient">3+</div>
              <div className="text-xs text-muted-foreground">Live Projects</div>
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <div className="font-display text-2xl text-gradient">RA</div>
              <div className="text-xs text-muted-foreground">Robotics & Automation</div>
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <div className="font-display text-2xl text-gradient">∞</div>
              <div className="text-xs text-muted-foreground">Curiosity</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Profile */}
        <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.4 }} className="relative flex justify-center">
          <div className="relative w-72 h-72 sm:w-80 sm:h-80">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary via-primary-glow to-secondary blur-2xl opacity-60 animate-glow-pulse" />
            <div className="absolute -inset-2 rounded-full border border-primary/40 animate-spin-slow" style={{ borderStyle: "dashed" }} />
            <div className="relative w-full h-full rounded-full p-1 bg-gradient-to-tr from-primary via-primary-glow to-secondary">
              <div className="w-full h-full rounded-full overflow-hidden bg-background">
                <img src={sowmiyaPhoto} alt="S. Sowmiya" className="w-full h-full object-cover" />
              </div>
            </div>
            <motion.div className="absolute -top-3 -right-3 px-3 py-2 rounded-full glass-strong text-xs animate-float">🐍 Python</motion.div>
            <motion.div className="absolute top-1/2 -left-8 px-3 py-2 rounded-full glass-strong text-xs animate-float" style={{ animationDelay: "1.5s" }}>✨ Gen AI</motion.div>
            <motion.div className="absolute -bottom-2 right-4 px-3 py-2 rounded-full glass-strong text-xs animate-float" style={{ animationDelay: "3s" }}>🎬 3D</motion.div>
          </div>
        </motion.div>
      </div>

      <a href="#about" className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground text-xs">
        Scroll
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </a>
    </section>
  );
}

/* ---------------- Section helpers ---------------- */
function Section({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
  return <section id={id} className={`relative py-28 px-4 ${className}`}>{children}</section>;
}
function SectionTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7 }} className="text-center max-w-3xl mx-auto mb-16">
      <div className="inline-block px-4 py-1.5 rounded-full glass text-xs tracking-[0.2em] text-secondary uppercase mb-5">{eyebrow}</div>
      <h2 className="font-display text-4xl sm:text-5xl font-bold text-gradient">{title}</h2>
      {description && <p className="mt-5 text-muted-foreground text-lg">{description}</p>}
    </motion.div>
  );
}

/* ---------------- About ---------------- */
function About() {
  const cards = [
    { icon: GraduationCap, title: "Robotics & Automation", desc: "Pursuing engineering at Paavai Engineering College, Pachal — diving deep into intelligent machines." },
    { icon: Brain, title: "Generative AI Enthusiast", desc: "Fascinated by how AI can imagine, create and collaborate — from text and images to entire worlds." },
    { icon: Palette, title: "3D Animation & Storytelling", desc: "Bringing characters and ideas to life through motion, light and a little bit of magic." },
    { icon: Code2, title: "Python Developer", desc: "I love solving problems with clean, expressive Python — automating, analysing and building." },
  ];
  return (
    <Section id="about">
      <SectionTitle eyebrow="About me" title="A curious mind, an engineer's heart" description="I'm Sowmiya — an engineering student who believes technology is the most beautiful canvas of our time." />
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((c, i) => (
          <motion.div key={c.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}>
            <div className="group relative h-full p-6 rounded-3xl glass hover:bg-white/[0.06] transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-primary/10 to-secondary/10 pointer-events-none" />
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-5">
                  <c.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto mt-16">
        <div className="p-8 sm:p-10 rounded-3xl glass-strong text-center">
          <p className="text-lg sm:text-xl text-foreground/90 italic leading-relaxed">
            "I believe the future belongs to those who think both like an{" "}
            <span className="text-gradient font-semibold not-italic">engineer</span> and an{" "}
            <span className="text-gradient font-semibold not-italic">artist</span>. My journey through Robotics & Automation constantly inspires me to explore Generative AI and 3D animation — turning imagination into something you can see, feel and share."
          </p>
          <p className="mt-5 text-sm text-muted-foreground">— Sowmiya, Paavai Engineering College</p>
        </div>
      </motion.div>
    </Section>
  );
}

/* ---------------- Projects ---------------- */
function Projects() {
  const projects = [
    { img: projGenAI, title: "Dreamscape — Gen AI Art", category: "Generative AI", description: "An exploration of text-to-image models, crafting surreal dreamscapes with diffusion pipelines and prompt engineering.", tags: ["Python", "Diffusion", "Prompting"] },
    { img: proj3D, title: "Lumen — 3D Character", category: "3D Animation", description: "A stylised 3D character study designed and lit with cinematic intent — every frame told a tiny story.", tags: ["Blender", "Lighting", "Animation"] },
    { img: projRobotics, title: "ArmIQ — Smart Robotic Arm", category: "Robotics", description: "A concept for a sensor-driven robotic arm that learns simple pick-and-place tasks through reinforcement learning.", tags: ["Robotics", "Python", "ML"] },
    { img: projPython, title: "PyToolkit — Mini Utilities", category: "Python", description: "A growing collection of small Python tools that automate boring stuff so I can focus on creating cool stuff.", tags: ["Python", "Automation", "CLI"] },
  ];
  return (
    <Section id="projects">
      <SectionTitle eyebrow="My work" title="Projects I love" description="A peek into things I've been building, breaking and learning from." />
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 gap-6">
        {projects.map((p, i) => (
          <motion.article key={p.title} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7, delay: i * 0.1 }}>
            <div className="group relative rounded-3xl overflow-hidden glass hover:shadow-[0_30px_80px_-20px_hsl(265_90%_30%/0.6)] transition-all duration-500">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={p.img} alt={p.title} loading="lazy" width={1024} height={768} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full glass-strong text-xs text-secondary">{p.category}</div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-gradient transition-all">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{p.description}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {p.tags.map((t) => (
                    <span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-muted text-muted-foreground">{t}</span>
                  ))}
                </div>
                <button className="inline-flex items-center gap-2 text-sm text-secondary hover:text-primary-glow transition group/btn">
                  View Project <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition" />
                </button>
              </div>
              <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Gallery ---------------- */
function Gallery() {
  const images = [
    { src: sowmiyaPhoto, alt: "Sowmiya — campus" },
    { src: proj3D, alt: "3D study" },
    { src: projGenAI, alt: "Gen AI dreamscape" },
    { src: projRobotics, alt: "Robotics concept" },
    { src: projPython, alt: "Code aesthetics" },
    { src: sowmiyaPhoto, alt: "Sowmiya portrait" },
  ];
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const layout = ["sm:row-span-2", "", "", "sm:col-span-2", "", ""];
  return (
    <Section id="gallery">
      <SectionTitle eyebrow="Gallery" title="Moments & frames" description="A few favourite captures — life, college and creative experiments." />
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 auto-rows-[200px] gap-4">
        {images.map((img, i) => (
          <button key={i} onClick={() => { setIdx(i); setOpen(true); }} className={`group relative rounded-2xl overflow-hidden glass ${layout[i]}`}>
            <img src={img.src} alt={img.alt} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-3 left-3 right-3 text-xs text-foreground/90 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">{img.alt}</div>
          </button>
        ))}
      </div>
      <Lightbox open={open} close={() => setOpen(false)} index={idx} slides={images.map((i) => ({ src: i.src, alt: i.alt }))} />
    </Section>
  );
}

/* ---------------- Skills ---------------- */
function Skills() {
  const skills = [
    { name: "Python", value: 88 },
    { name: "Generative AI / Prompting", value: 82 },
    { name: "3D Animation (Blender)", value: 70 },
    { name: "Web Development", value: 75 },
    { name: "Problem Solving", value: 90 },
    { name: "Robotics Concepts", value: 78 },
  ];
  const tools = ["Python", "C", "HTML/CSS", "JavaScript", "Blender", "Figma", "Git", "VS Code", "ChatGPT", "Stable Diffusion"];
  return (
    <Section id="skills">
      <SectionTitle eyebrow="Skills" title="What I bring to the table" />
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl glass space-y-6">
          {skills.map((s, i) => (
            <motion.div key={s.name} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08 }}>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-foreground/90">{s.name}</span>
                <span className="text-secondary">{s.value}%</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <motion.div initial={{ width: 0 }} whileInView={{ width: `${s.value}%` }} viewport={{ once: true }} transition={{ duration: 1.2, delay: i * 0.08, ease: "easeOut" }} className="h-full rounded-full bg-gradient-to-r from-primary via-primary-glow to-secondary" />
              </div>
            </motion.div>
          ))}
        </div>
        <div className="p-8 rounded-3xl glass">
          <h3 className="font-display text-2xl font-semibold mb-3">Tools & Tech</h3>
          <p className="text-sm text-muted-foreground mb-6">Languages, libraries and creative apps in my daily rotation.</p>
          <div className="flex flex-wrap gap-2.5">
            {tools.map((t, i) => (
              <motion.span key={t} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }} className="px-4 py-2 rounded-full glass-strong text-sm hover:bg-gradient-to-r hover:from-primary/30 hover:to-secondary/30 transition-all cursor-default">
                {t}
              </motion.span>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[{ l: "Languages", v: "5+" }, { l: "Tools", v: "10+" }, { l: "Projects", v: "3+" }].map((m) => (
              <div key={m.l} className="text-center p-4 rounded-2xl bg-muted/50">
                <div className="font-display text-2xl text-gradient">{m.v}</div>
                <div className="text-[11px] text-muted-foreground uppercase tracking-wider mt-1">{m.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------------- Education ---------------- */
function Education() {
  const items = [
    { period: "2023 — Present", title: "B.E. Robotics & Automation", place: "Paavai Engineering College, Pachal", detail: "Currently pursuing my engineering degree, exploring intelligent systems, automation and AI alongside.", icon: GraduationCap },
    { period: "2022 — 2023", title: "Higher Secondary (12th)", place: "State Board", detail: "Completed higher secondary education with focus on Mathematics & Science.", icon: Award },
    { period: "2020 — 2021", title: "Secondary School (10th)", place: "State Board", detail: "Built strong fundamentals and discovered an early love for computers and creativity.", icon: Calendar },
  ];
  return (
    <Section id="education">
      <SectionTitle eyebrow="Education" title="My academic journey" />
      <div className="max-w-4xl mx-auto relative">
        <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-transparent -translate-x-1/2" />
        <div className="space-y-12">
          {items.map((it, i) => {
            const left = i % 2 === 0;
            return (
              <motion.div key={it.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className={`relative flex ${left ? "sm:justify-start" : "sm:justify-end"}`}>
                <div className={`pl-12 sm:pl-0 sm:w-[45%] ${left ? "sm:pr-8 sm:text-right" : "sm:pl-8"}`}>
                  <div className="p-6 rounded-3xl glass hover:bg-white/[0.07] transition">
                    <div className="inline-block px-3 py-1 rounded-full bg-primary/15 text-secondary text-xs mb-3">{it.period}</div>
                    <h3 className="font-display text-xl font-semibold">{it.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{it.place}</p>
                    <p className="text-sm text-foreground/80 mt-3 leading-relaxed">{it.detail}</p>
                  </div>
                </div>
                <div className="absolute left-4 sm:left-1/2 top-6 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-primary">
                  <it.icon className="w-4 h-4 text-primary-foreground" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

/* ---------------- Contact ---------------- */
const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  message: z.string().trim().min(10, "Message should be at least 10 characters").max(1000),
});

function Contact() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const r = contactSchema.safeParse({ name: fd.get("name"), email: fd.get("email"), message: fd.get("message") });
    if (!r.success) {
      toast.error(r.error.issues[0]?.message ?? "Invalid input");
      return;
    }
    const subject = encodeURIComponent(`Portfolio enquiry from ${r.data.name}`);
    const body = encodeURIComponent(`${r.data.message}\n\n— ${r.data.name} (${r.data.email})`);
    window.location.href = `mailto:sowmee126@gmail.com?subject=${subject}&body=${body}`;
    toast.success("Opening your email app… thank you!");
    e.currentTarget.reset();
  };

  return (
    <Section id="contact">
      <SectionTitle eyebrow="Contact" title="Let's create something" description="Whether it's a collaboration, a project idea or a simple hello — I'd love to hear from you." />
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl glass space-y-6">
          <h3 className="font-display text-2xl font-semibold">Reach out directly</h3>
          <p className="text-sm text-muted-foreground">Currently studying in Pachal, but always reachable online.</p>
          <div className="space-y-4">
            {[
              { icon: Mail, label: "Email", value: "sowmee126@gmail.com", href: "mailto:sowmee126@gmail.com" },
              { icon: Phone, label: "Phone", value: "+91 75503 82273", href: "tel:+917550382273" },
              { icon: MapPin, label: "Location", value: "Pachal, Tamil Nadu, India" },
            ].map((c) => (
              <a key={c.label} href={c.href} className="flex items-center gap-4 p-4 rounded-2xl bg-muted/40 hover:bg-muted transition group">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <c.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{c.label}</div>
                  <div className="text-sm text-foreground group-hover:text-secondary transition">{c.value}</div>
                </div>
              </a>
            ))}
          </div>
          <div className="pt-4 border-t border-border">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Find me on</div>
            <div className="flex gap-3">
              {[
                { Icon: Linkedin, href: "#", label: "LinkedIn" },
                { Icon: Github, href: "#", label: "GitHub" },
                { Icon: Instagram, href: "#", label: "Instagram" },
              ].map(({ Icon, href, label }) => (
                <a key={label} href={href} aria-label={label} className="w-11 h-11 rounded-full glass-strong flex items-center justify-center hover:bg-gradient-to-r hover:from-primary hover:to-secondary transition-all hover:-translate-y-1">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <form onSubmit={onSubmit} className="p-8 rounded-3xl glass-strong space-y-5">
          <div>
            <label className="text-xs uppercase tracking-wider text-muted-foreground">Your name</label>
            <Input name="name" placeholder="Jane Doe" className="mt-2 bg-muted/50 border-border h-12" maxLength={100} required />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-muted-foreground">Email</label>
            <Input name="email" type="email" placeholder="jane@example.com" className="mt-2 bg-muted/50 border-border h-12" maxLength={255} required />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-muted-foreground">Message</label>
            <Textarea name="message" placeholder="Tell me about your idea…" className="mt-2 bg-muted/50 border-border min-h-[140px]" maxLength={1000} required />
          </div>
          <Button type="submit" className="w-full h-12 rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground font-medium">
            Send Message <Send className="w-4 h-4 ml-2" />
          </Button>
        </form>
      </div>
    </Section>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer className="border-t border-border py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} <span className="text-gradient font-semibold">S. Sowmiya</span>. Crafted with curiosity & ☕.
        </p>
        <div className="flex gap-3">
          {[
            { Icon: Mail, href: "mailto:sowmee126@gmail.com" },
            { Icon: Linkedin, href: "#" },
            { Icon: Github, href: "#" },
            { Icon: Instagram, href: "#" },
          ].map(({ Icon, href }, i) => (
            <a key={i} href={href} className="w-9 h-9 rounded-full glass flex items-center justify-center hover:bg-primary/30 transition">
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Page ---------------- */
const Index = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    document.title = "S. Sowmiya — Engineering Student · Python Developer";
    const meta = document.querySelector('meta[name="description"]') || document.head.appendChild(Object.assign(document.createElement("meta"), { name: "description" }));
    meta.setAttribute("content", "Personal portfolio of S. Sowmiya — Robotics & Automation engineering student at Paavai Engineering College exploring Generative AI, 3D animation and Python.");
    const t = setTimeout(() => setLoaded(true), 1200);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Loader done={loaded} />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Gallery />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
