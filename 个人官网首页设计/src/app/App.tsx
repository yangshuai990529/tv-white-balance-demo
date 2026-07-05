import { useState, useEffect } from "react";
import { ArrowUpRight, Mail, Github, Twitter, Linkedin } from "lucide-react";

const WORKS = [
  {
    id: 1,
    title: "AI智能终端体验平台",
    category: "AI Agent · 终端系统",
    year: "2024",
    desc: "以AI Agent为核心，整合PQ、智能交互、多模态能力及终端系统能力，打造覆盖画质优化、AI创作等场景的终端能力平台。",
    img: "1677442136019-21780ecaa9c1",
    color: "#ff4d00",
  },
  {
    id: 2,
    title: "云诊断与远程服务平台",
    category: "SaaS · 端云协同",
    year: "2024",
    desc: "覆盖终端、云端及企业后台的一体化智能诊断平台，实现设备问题快速定位及远程服务闭环。",
    img: "1551288049-bebda4e38f71",
    color: "#2dd4bf",
  },
  {
    id: 3,
    title: "HarmonyOS Next 产品",
    category: "OS · 系统入口",
    year: "2023",
    desc: "围绕系统入口、元服务生态、隐私安全及跨终端体验建设，提升系统服务触达效率与多设备一致性。",
    img: "1618044736000-405948346261",
    color: "#a78bfa",
  },
  {
    id: 4,
    title: "新能源充电平台",
    category: "小程序 · 商业化",
    year: "2022",
    desc: "覆盖充电站搜索、预约、导航、订单及支付等核心流程的新能源充电平台及微信小程序。",
    img: "1593941707882-a5bba149a5bf",
    color: "#fcd34d",
  },
];

const SKILLS = [
  { label: "产品规划", detail: "0-1构建 · 商业化策略 · 跨终端协同" },
  { label: "AI智能终端", detail: "AI Agent · 画质策略 · 多模态交互" },
  { label: "端云架构", detail: "自诊断闭环 · SaaS后台 · RBAC权限" },
  { label: "系统级产品", detail: "OS入口设计 · 元服务生态 · 隐私安全" },
  { label: "国际化业务", detail: "多平台适配 · 区域差异化 · 合规要求" },
  { label: "数据驱动", detail: "行为分析 · A/B测试 · NPS优化" },
];

export default function App() {
  const [activeWork, setActiveWork] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const year = new Date().getFullYear();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── NAV ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "border-b border-border bg-background/95 backdrop-blur-sm" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
          <span
            className="text-sm tracking-[0.2em] uppercase text-foreground/60"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            YS·STUDIO
          </span>
          <div className="flex items-center gap-8">
            {["项目", "能力", "联系"].map((item) => (
              <a
                key={item}
                href={`#${item === "项目" ? "works" : item === "能力" ? "skills" : "contact"}`}
                className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground hover:text-accent transition-colors duration-200"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="pt-32 pb-24 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* index label */}
          <div className="hidden md:flex md:col-span-1 items-start justify-center pt-4">
            <span
              className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              01 / 简介
            </span>
          </div>

          <div className="md:col-span-11">
            {/* Giant name */}
            <h1
              className="leading-none tracking-tight text-foreground mb-0 select-none"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "clamp(3.5rem, 11vw, 10rem)",
                fontWeight: 800,
              }}
            >
              YANG
              <br />
              <span style={{ color: "#ff4d00" }}>SHUAI.</span>
            </h1>

            <div className="mt-10 pt-10 border-t border-border grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
              <p className="text-lg md:text-xl text-foreground/60 leading-relaxed font-light">
                拥有4年+ToC产品经理经验，聚焦AI智能终端及系统级产品设计。致力于打造以AI为核心的新一代智能终端产品体验，让AI真正成为连接用户意图与系统能力的自然入口。
              </p>

              <div className="flex flex-col justify-between gap-8">
                <div className="space-y-0">
                  {[
                    { key: "Status", val: "Available", hot: true },
                    { key: "Experience", val: "4+ years", hot: false },
                    { key: "Education", val: "湖南城市学院 (本科)", hot: false },
                    { key: "Focus", val: "AI终端 · 系统级产品", hot: false },
                  ].map((row) => (
                    <div
                      key={row.key}
                      className="flex justify-between items-baseline py-3 border-b border-border"
                    >
                      <span
                        className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {row.key}
                      </span>
                      <span
                        className={`text-xs ${row.hot ? "text-accent flex items-center gap-1.5" : "text-foreground/70"}`}
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {row.hot && (
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        )}
                        {row.val}
                      </span>
                    </div>
                  ))}
                </div>

                <a
                  href="#contact"
                  className="group inline-flex items-center gap-3 bg-accent text-background px-6 py-3 text-xs tracking-[0.18em] uppercase font-medium hover:bg-foreground transition-colors duration-200 self-start"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  联系我
                  <ArrowUpRight
                    size={13}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SELECTED WORKS ── */}
      <section id="works" className="py-24 px-6 md:px-10 max-w-7xl mx-auto">
        {/* section header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 mb-10">
          <div className="hidden md:flex md:col-span-1 items-start justify-center pt-2">
            <span
              className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              02 / 项目
            </span>
          </div>
          <div className="md:col-span-11 flex items-end justify-between border-b border-border pb-6">
            <h2
              className="leading-none tracking-tight text-foreground"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "clamp(2rem, 5vw, 4rem)",
                fontWeight: 800,
              }}
            >
              精选
              <br className="md:hidden" />
              {" "}项目
            </h2>
            <span
              className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {year}
            </span>
          </div>
        </div>

        {/* works grid */}
        <div className="md:ml-[calc(100%/12)] grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {WORKS.map((work) => (
            <article
              key={work.id}
              className="bg-background group cursor-pointer p-8 relative overflow-hidden transition-colors duration-200 hover:bg-card"
              onMouseEnter={() => setActiveWork(work.id)}
              onMouseLeave={() => setActiveWork(null)}
            >
              <div
                className="absolute top-0 left-0 w-full h-0.5 transition-all duration-300"
                style={{
                  backgroundColor:
                    activeWork === work.id ? work.color : "transparent",
                }}
              />

              <div className="aspect-video mb-6 overflow-hidden bg-muted">
                <img
                  src={`https://images.unsplash.com/photo-${work.img}?w=900&h=506&fit=crop&auto=format`}
                  alt={work.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="text-[10px] tracking-[0.18em] uppercase"
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        color: work.color,
                      }}
                    >
                      {work.category}
                    </span>
                    <span
                      className="text-[10px] text-muted-foreground"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {work.year}
                    </span>
                  </div>
                  <h3
                    className="text-xl md:text-2xl font-bold tracking-tight text-foreground mb-3 group-hover:text-accent transition-colors duration-200"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {work.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light">
                    {work.desc}
                  </p>
                </div>
                <ArrowUpRight
                  size={18}
                  className="shrink-0 mt-1 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200"
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="py-24 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 mb-10">
          <div className="hidden md:flex md:col-span-1 items-start justify-center pt-2">
            <span
              className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              03 / 能力
            </span>
          </div>
          <div className="md:col-span-11 border-b border-border pb-6">
            <h2
              className="leading-none tracking-tight text-foreground"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "clamp(2rem, 5vw, 4rem)",
                fontWeight: 800,
              }}
            >
              核心能力
            </h2>
          </div>
        </div>

        <div className="md:ml-[calc(100%/12)]">
          {SKILLS.map((skill, i) => (
            <div
              key={i}
              className="group flex items-center justify-between border-b border-border py-5 md:py-6 px-0 hover:px-5 hover:bg-card transition-all duration-200 cursor-default"
            >
              <div className="flex items-center gap-5 md:gap-8">
                <span
                  className="text-[10px] text-muted-foreground w-5"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="text-lg md:text-2xl font-bold tracking-tight text-foreground group-hover:text-accent transition-colors duration-200"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {skill.label}
                </span>
              </div>
              <span
                className="text-[10px] tracking-[0.1em] text-muted-foreground text-right"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {skill.detail}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-24 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          <div className="hidden md:flex md:col-span-1 items-start justify-center pt-4">
            <span
              className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              04 / 联系
            </span>
          </div>
          <div className="md:col-span-11">
            <div className="border border-border p-8 md:p-16">
              <h2
                className="leading-none tracking-tight text-foreground mb-8"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "clamp(2.5rem, 7vw, 6rem)",
                  fontWeight: 800,
                }}
              >
                {"LET'S BUILD"}
                <br />
                <span style={{ color: "#ff4d00" }}>THE FUTURE.</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-md mb-12 leading-relaxed font-light">
                如果您正在寻找一位深耕AI终端与系统级产品设计的产品经理，欢迎随时与我联系。
                <br /><br />
                电话：15526382152
              </p>
              <a
                href="mailto:ys1147911877@163.com"
                className="group inline-flex items-center gap-3 border border-foreground text-foreground px-8 py-4 text-xs tracking-[0.18em] uppercase hover:bg-foreground hover:text-background transition-colors duration-200"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                <Mail size={13} />
                ys1147911877@163.com
                <ArrowUpRight
                  size={13}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-border px-6 md:px-10 py-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <span
            className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            © {year} YANG SHUAI — 保留所有权利
          </span>
          <div className="flex items-center gap-6">
            {[
              { icon: Github, href: "#" },
              { icon: Twitter, href: "#" },
              { icon: Linkedin, href: "#" },
            ].map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                className="text-muted-foreground hover:text-accent transition-colors duration-200"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
