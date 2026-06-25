import {
  ArrowRight,
  Check,
  Activity,
  Globe,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Award,
  type LucideIcon,
} from "lucide-react";
import {
  motion,
  MotionValue,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

const primaryText = "#E1E0CC";
const easeOut = [0.16, 1, 0.3, 1] as const;

const heroVideo =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4";
const heroPoster = `${import.meta.env.BASE_URL}hero-poster.jpg`;

type StyledSegment = {
  text: string;
  className?: string;
};

const navItems = [
  { label: "关于", href: "#about" },
  { label: "项目", href: "#projects" },
  { label: "技能", href: "#skills" },
  { label: "经历", href: "#experience" },
  { label: "联系", href: "#contact" },
];

type Project = {
  icon: LucideIcon;
  title: string;
  role: string;
  description: string;
  tech: string[];
  highlights: string[];
};

const featuredProject = {
  badge: "核心项目 · AI Agent",
  status: "论文写作阶段",
  title: "TGVP · 网页智能体任务规划",
  role: "主要开发者 / 研究",
  description:
    "围绕大模型驱动的网页智能体（Web Agent）任务规划不稳定问题，设计模板约束、槽位填充与验证器的可验证规划框架，降低模型自由生成带来的步骤漂移与不可执行风险。",
  tech: ["Python", "LLM API", "Prompt Engineering", "DSL / JSON", "实验工程", "数据分析"],
  highlights: [
    "设计 Planner、模板库、槽位填充、验证器与实验流水线等核心模块。",
    "对比 free-form / JSON / TGVP 三种规划方式，完成 K=10 主实验（约 900 条记录）。",
    "设计组件消融（约 1200 条记录）、温度鲁棒性与任务复杂度实验，支撑论文写作。",
  ],
};

const projects: Project[] = [
  {
    icon: Activity,
    title: "智愈 · 肌电信号康复监测",
    role: "算法与软件开发 · 创新比赛项目",
    description:
      "面向运动损伤康复中恢复进展难以量化的问题，基于表面肌电信号搭建康复监测 Demo。",
    tech: ["Python", "PyQt6", "NumPy", "Pandas", "Matplotlib"],
    highlights: [
      "提取 RMS 等基础特征，做患侧 / 健侧肌电对比。",
      "用 PyQt6 实现数据处理与可视化界面。",
      "面向医院康复科、社区与家庭康复场景。",
    ],
  },
  {
    icon: Globe,
    title: "CoFind · AI 浏览器 Agent",
    role: "独立开发",
    description:
      "基于 CEF 嵌入真实 Chromium 的桌面浏览器，配悬浮 AI 助手面板。用户用自然语言下达指令，Agent 临时接管浏览器执行任务后归还控制权。",
    tech: [
      "CEF / Chromium",
      "C++",
      "React · TypeScript",
      "Python · FastAPI",
      "browser-use",
      "LLM API",
    ],
    highlights: [
      "CEF（C++）原生宿主嵌入 Chromium，通过 CDP 统一管理浏览器与执行生命周期。",
      "React + TypeScript 悬浮助手面板，经原生 window.shell 桥与宿主通信。",
      "Python / FastAPI 后端接入 browser-use 引擎，SSE 推送执行事件。",
      "双执行模式：确定性 DSL 步骤执行器 + ReAct（browser-use）兜底。",
    ],
  },
];

const skillGroups = [
  {
    title: "编程语言",
    items: ["Python（主力）", "C（基础）", "JavaScript / TypeScript", "HTML / CSS", "SQL"],
  },
  {
    title: "AI / 大模型",
    items: [
      "Vibe Coding（熟练）",
      "Claude Code / Codex 长期使用",
      "LLM API 调用",
      "Prompt Engineering",
      "Web Agent 工作流",
      "任务规划与结构化输出",
    ],
  },
  {
    title: "数据与科学计算",
    items: ["NumPy", "Pandas", "Matplotlib", "数据清洗 / 可视化", "实验统计分析"],
  },
  {
    title: "框架与工具",
    items: [
      "PyQt6",
      "Flask / FastAPI",
      "Playwright",
      "Electron / React",
      "Git",
      "PostgreSQL",
      "VS Code · Anaconda · Docker（了解）",
    ],
  },
];

type ExperienceItem = {
  icon: LucideIcon;
  period: string;
  title: string;
  role: string;
  points: string[];
};

const experience: ExperienceItem[] = [
  {
    icon: GraduationCap,
    period: "2025 – 2029",
    title: "云南中医药大学 · 信息学院",
    role: "医学信息工程 · 本科在读",
    points: [
      "专业方向涉及医学信息系统、数据处理、程序设计与医学数据分析。",
      "持续学习数据结构、线性代数、机器学习基础等计算机与 AI 课程。",
    ],
  },
  {
    icon: Award,
    period: "2026.06 · 昆明",
    title: "ICBDSE 2026 · IEEE 第三届大数据科学与工程国际会议",
    role: "志愿者 · 获评「最佳志愿者」",
    points: [
      "协助会议签到、嘉宾引导、会场秩序与会务支持。",
      "接触大数据科学与工程领域的学术交流流程。",
    ],
  },
];

const contacts = [
  { icon: Mail, label: "邮箱", value: "yunbinsun7215@foxmail.com", href: "mailto:yunbinsun7215@foxmail.com" },
  { icon: GraduationCap, label: "学校", value: "云南中医药大学 · 医学信息工程", href: null },
  {
    icon: MapPin,
    label: "实习地点",
    value: "青岛（首选）· 北京 · 上海 · 杭州 · 成都 · 昆明 等",
    href: null,
  },
];

const CJK_RE = /[　-〿぀-ヿ㐀-䶿一-鿿豈-﫿＀-￯]/;

// Split mixed Chinese/English text into render tokens: each CJK character stands
// alone (so it can animate per-glyph and wrap freely) while runs of Latin text
// stay grouped (so words like "Web Agent" never break mid-word).
function tokenize(text: string): string[] {
  const tokens: string[] = [];
  let buffer = "";
  for (const ch of Array.from(text)) {
    if (CJK_RE.test(ch)) {
      if (buffer) {
        tokens.push(buffer);
        buffer = "";
      }
      tokens.push(ch);
    } else {
      buffer += ch;
    }
  }
  if (buffer) tokens.push(buffer);
  return tokens;
}

function NamePullUp({ name }: { name: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const chars = useMemo(() => Array.from(name), [name]);

  return (
    <span ref={ref} className="inline-flex">
      {chars.map((char, index) => (
        <span key={`${char}-${index}`} className="inline-block overflow-visible">
          <motion.span
            className="inline-block will-change-transform"
            initial={reduceMotion ? false : { y: 26 }}
            animate={isInView || reduceMotion ? { y: 0 } : { y: 26 }}
            transition={{
              duration: 0.85,
              delay: reduceMotion ? 0 : index * 0.1,
              ease: easeOut,
            }}
          >
            {char}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function PullUpHeading({
  segments,
  className = "",
}: {
  segments: StyledSegment[];
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const tokens = useMemo(
    () =>
      segments.flatMap((segment, segmentIndex) =>
        tokenize(segment.text).map((token) => ({
          token,
          className: segment.className ?? "",
          segmentIndex,
        })),
      ),
    [segments],
  );

  return (
    <div ref={ref} className={`inline-flex flex-wrap justify-center ${className}`}>
      {tokens.map(({ token, className: tokenClassName, segmentIndex }, index) => (
        <span
          key={`${segmentIndex}-${index}`}
          className="inline-block overflow-visible"
        >
          <motion.span
            className={`inline-block will-change-transform ${tokenClassName}`}
            initial={reduceMotion ? false : { y: 22 }}
            animate={isInView || reduceMotion ? { y: 0 } : { y: 22 }}
            transition={{
              duration: 0.72,
              delay: reduceMotion ? 0 : Math.min(index * 0.04, 0.9),
              ease: easeOut,
            }}
          >
            {token.trim() === "" ? " " : token}
          </motion.span>
        </span>
      ))}
    </div>
  );
}

function AnimatedToken({
  token,
  index,
  total,
  scrollYProgress,
}: {
  token: string;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const progress = index / total;
  const opacity = useTransform(
    scrollYProgress,
    [progress - 0.1, progress + 0.05],
    [0.2, 1],
  );

  return (
    <motion.span aria-hidden="true" style={{ opacity }}>
      {token}
    </motion.span>
  );
}

function ScrollRevealText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.3"],
  });
  const tokens = useMemo(() => tokenize(text), [text]);
  const total = Math.max(tokens.length, 1);

  return (
    <p
      ref={ref}
      aria-label={text}
      className="mx-auto mt-8 max-w-2xl text-sm leading-[1.9] text-[#DEDBC8] sm:mt-10 sm:text-base"
    >
      {tokens.map((token, index) => (
        <AnimatedToken
          key={`${token}-${index}`}
          token={token}
          index={index}
          total={total}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </p>
  );
}

function Reveal({
  children,
  index = 0,
  className = "",
  lift = false,
}: {
  children: ReactNode;
  index?: number;
  className?: string;
  lift?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={isInView || reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{
        duration: 0.7,
        delay: reduceMotion ? 0 : index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={lift && !reduceMotion ? { y: -6 } : undefined}
    >
      {children}
    </motion.div>
  );
}

function TechTags({ tech }: { tech: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tech.map((item) => (
        <span
          key={item}
          className="inline-flex rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] text-stone-300"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function SectionTitle({
  index,
  kicker,
  title,
}: {
  index: string;
  kicker: string;
  title: string;
}) {
  return (
    <Reveal className="mb-10 md:mb-14">
      <div className="mb-5 flex items-center gap-4">
        <span className="font-serif text-base italic text-accent">{index}</span>
        <span className="h-px flex-1 bg-gradient-to-r from-accent/40 via-white/10 to-transparent" />
        <p className="text-[11px] tracking-[0.25em] text-primary/50">{kicker}</p>
      </div>
      <h2 className="text-3xl font-medium leading-tight text-primary sm:text-4xl md:text-5xl">
        {title}
      </h2>
    </Reveal>
  );
}

function Navbar() {
  return (
    <nav
      aria-label="主导航"
      className="absolute left-1/2 top-0 z-20 max-w-[calc(100%-1rem)] -translate-x-1/2 overflow-x-auto rounded-b-2xl bg-ink px-4 py-2 md:rounded-b-3xl md:px-8"
    >
      <ul className="flex items-center gap-3 whitespace-nowrap text-[11px] sm:gap-7 sm:text-xs md:gap-12 md:text-sm">
        {navItems.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              className="text-primary/75 transition-colors duration-300 hover:text-primary"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Hero() {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;

    const playPromise = video.play();
    if (playPromise) {
      playPromise.catch(() => {
        // Some mobile browsers still block autoplay in low-power/data-saver modes.
        // In that case the poster remains visible until the user/browser allows playback.
      });
    }
  }, []);

  return (
    <section className="relative min-h-[100dvh] bg-ink p-4 md:p-6">
      <div className="relative min-h-[calc(100dvh-2rem)] overflow-hidden rounded-2xl md:min-h-[calc(100dvh-3rem)] md:rounded-[2rem]">
        <img
          src={heroPoster}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
          src={heroVideo}
          poster={heroPoster}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onLoadedData={() => setVideoReady(true)}
          onCanPlay={() => setVideoReady(true)}
          onPlaying={() => setVideoReady(true)}
          onError={() => setVideoReady(false)}
        />
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/5 to-ink/80" />

        <Navbar />

        <div className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-6 sm:px-6 md:px-8 md:pb-8">
          <div className="grid grid-cols-12 items-end gap-5 md:gap-6">
            <div className="col-span-12 md:col-span-8">
              <motion.p
                className="mb-3 text-[11px] tracking-[0.25em] text-primary/70 sm:text-xs md:mb-5"
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: reduceMotion ? 0 : 0.3, ease: easeOut }}
              >
                AI 应用开发 · 大模型智能体 · 医学信息工程
              </motion.p>
              <h1
                className="select-none overflow-visible py-[0.08em] text-[20vw] font-medium leading-[1.02] tracking-[-0.03em] text-primary sm:text-[20vw] sm:tracking-[-0.03em] md:text-[15vw] lg:text-[13vw] xl:text-[12vw]"
              >
                <NamePullUp name="孙允斌" />
              </h1>
              <motion.p
                className="mt-3 font-serif text-lg italic text-primary/55 sm:text-xl md:mt-4 md:text-2xl"
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: reduceMotion ? 0 : 0.6, ease: easeOut }}
              >
                Yunbin Sun
              </motion.p>
            </div>
            <div className="col-span-12 flex max-w-[34rem] flex-col items-start gap-5 pb-1 md:col-span-4 md:pb-2">
              <motion.p
                className="text-sm leading-[1.7] text-primary/75 sm:text-base"
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: reduceMotion ? 0 : 0.5, ease: easeOut }}
              >
                医学信息工程本科生，专注 AI 应用开发与大模型智能体。围绕 Web Agent
                任务规划做研究型项目，也做过医疗信息化与数据分析方向的原型实践。
              </motion.p>
              <motion.div
                className="flex flex-wrap items-center gap-4"
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: reduceMotion ? 0 : 0.7, ease: easeOut }}
              >
                <a
                  href="#projects"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary py-1.5 pl-5 pr-1.5 text-sm font-medium text-black transition-[gap,transform] duration-300 hover:gap-3 active:translate-y-px sm:text-base"
                >
                  <span className="whitespace-nowrap">查看项目</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink transition-transform duration-300 group-hover:scale-110 sm:h-10 sm:w-10">
                    <ArrowRight className="h-4 w-4 text-primary" strokeWidth={1.5} />
                  </span>
                </a>
                <a
                  href="#contact"
                  className="text-sm text-primary/80 underline-offset-4 transition-colors duration-300 hover:text-primary hover:underline sm:text-base"
                >
                  联系我 →
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  const aboutCopy =
    "我围绕网页智能体（Web Agent）的任务规划做研究型项目，尝试用模板约束、槽位填充和验证器，让大模型的规划更稳定、更可验证；也独立做过肌电信号康复监测和 AI 浏览器 Agent 等医工交叉与应用实践。目前仍在本科低年级，工程与科研经验还在积累，但愿意从基础任务做起，在真实项目里持续学习。";

  return (
    <section id="about" className="bg-ink px-4 py-16 sm:px-6 md:py-24">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl bg-surface px-5 py-16 text-center sm:px-8 md:rounded-[2rem] md:py-24 lg:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] max-w-[120%] -translate-x-1/2 -translate-y-1/3 rounded-full bg-primary/[0.06] blur-[130px]"
        />
        <div className="relative z-10">
          <p className="mb-6 text-[11px] tracking-[0.25em] text-primary/60">关于我</p>
          <h2 className="mx-auto max-w-3xl text-3xl font-normal leading-[1.15] text-primary sm:text-4xl md:text-5xl lg:text-6xl">
            <PullUpHeading
              segments={[
                { text: "我是孙允斌，", className: "text-primary" },
                { text: "医学信息工程本科生，", className: "text-primary" },
                { text: "专注 AI 应用与大模型智能体。", className: "text-stone-500" },
              ]}
            />
          </h2>
          <ScrollRevealText text={aboutCopy} />
        </div>
      </div>
    </section>
  );
}

function FeaturedProject() {
  return (
    <Reveal className="overflow-hidden rounded-2xl border border-white/10 bg-surface-raised shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] md:rounded-[1.75rem]">
      <div className="grid gap-8 p-6 sm:p-8 md:grid-cols-5 md:gap-10 md:p-10">
        <div className="md:col-span-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex rounded-full bg-primary px-3 py-1 text-[11px] font-medium text-black">
              {featuredProject.badge}
            </span>
            <span className="inline-flex rounded-full border border-white/15 px-3 py-1 text-[11px] text-primary/70">
              {featuredProject.status}
            </span>
          </div>
          <h3 className="mt-6 text-2xl font-medium leading-tight text-primary sm:text-3xl">
            {featuredProject.title}
          </h3>
          <p className="mt-2 text-sm text-stone-500">{featuredProject.role}</p>
          <p className="mt-5 text-sm leading-[1.8] text-stone-300 sm:text-base">
            {featuredProject.description}
          </p>
          <div className="mt-7">
            <TechTags tech={featuredProject.tech} />
          </div>
        </div>
        <div className="md:col-span-2">
          <p className="text-[11px] tracking-[0.2em] text-primary/50">实验与产出</p>
          <ul className="mt-5 space-y-4">
            {featuredProject.highlights.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-stone-400">
                <Check
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 flex-none text-primary"
                  strokeWidth={1.5}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const Icon = project.icon;

  return (
    <Reveal
      index={index}
      lift
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/5 bg-surface-raised p-6 transition-colors duration-300 hover:border-white/20 md:rounded-[1.5rem] sm:p-7"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <span
        aria-hidden="true"
        className="absolute right-6 top-6 font-serif text-sm italic text-primary/25"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-accent transition-colors duration-300 group-hover:border-accent/40">
        <Icon aria-hidden="true" className="h-6 w-6" strokeWidth={1.5} />
      </span>
      <h3 className="mt-6 text-xl font-normal leading-tight text-primary sm:text-2xl">
        {project.title}
      </h3>
      <p className="mt-2 text-xs text-stone-500 sm:text-sm">{project.role}</p>
      <p className="mt-4 text-sm leading-[1.75] text-stone-400">{project.description}</p>
      <ul className="mt-5 space-y-3">
        {project.highlights.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-snug text-stone-400">
            <Check
              aria-hidden="true"
              className="mt-0.5 h-4 w-4 flex-none text-primary"
              strokeWidth={1.5}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-7">
        <TechTags tech={project.tech} />
      </div>
    </Reveal>
  );
}

function Projects() {
  return (
    <section id="projects" className="relative overflow-hidden bg-ink px-4 py-20 sm:px-6 md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-10 h-[420px] w-[620px] max-w-[80%] translate-x-1/4 rounded-full bg-accent/[0.05] blur-[150px]"
      />
      <div className="relative mx-auto max-w-6xl">
        <SectionTitle index="01" kicker="项目经历" title="把研究与场景做成系统" />
        <FeaturedProject />
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden bg-ink px-4 py-20 sm:px-6 md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-[420px] w-[620px] max-w-[80%] -translate-x-1/4 rounded-full bg-accent/[0.045] blur-[150px]"
      />
      <div className="relative mx-auto max-w-6xl">
        <SectionTitle index="02" kicker="技能" title="工具与方向" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {skillGroups.map((group, index) => (
            <Reveal
              key={group.title}
              index={index}
              lift
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-surface-raised p-6 transition-colors duration-300 hover:border-white/20 sm:p-7"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="flex items-baseline justify-between gap-4">
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-sm italic text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-base font-medium text-primary sm:text-lg">{group.title}</h3>
                </div>
                <span className="text-[11px] tabular-nums tracking-[0.1em] text-primary/30">
                  {String(group.items.length).padStart(2, "0")}
                </span>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="inline-flex rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-stone-300 transition-colors duration-300 group-hover:border-white/15"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const phoneDigits = ["180", "8298", "4726"] as const;

function phoneImageSrc() {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="150" height="28" viewBox="0 0 150 28" role="img" aria-label="联系电话">
      <rect width="150" height="28" rx="7" fill="transparent"/>
      <text x="0" y="20" fill="#e7e5d7" font-size="16" font-family="-apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif" letter-spacing="0.4">${phoneDigits.join("")}</text>
    </svg>
  `;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

function PhoneReveal({ index }: { index: number }) {
  const [revealed, setRevealed] = useState(false);
  const reduceMotion = useReducedMotion();
  const viewport = { once: true, margin: "-60px" };

  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : { opacity: 0, x: index % 2 === 0 ? -28 : 28 }
      }
      whileInView={{ opacity: 1, x: 0 }}
      viewport={viewport}
      transition={{ duration: 0.6, delay: index * 0.1, ease: easeOut }}
      whileHover={reduceMotion ? undefined : { y: -3 }}
    >
      <button
        type="button"
        className="block h-full w-full text-left"
        onClick={() => setRevealed(true)}
        aria-label={revealed ? "联系电话已显示" : "点击显示联系电话"}
      >
        <div className="flex h-full items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-5 transition-colors duration-300 hover:border-white/15">
          <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg border border-white/10 bg-white/[0.03]">
            <Phone aria-hidden="true" className="h-5 w-5 text-primary" strokeWidth={1.5} />
          </span>
          <div className="min-w-0">
            <p className="text-[11px] tracking-[0.15em] text-primary/50">电话</p>
            {revealed ? (
              <img
                src={phoneImageSrc()}
                alt="联系电话"
                className="mt-1 h-7 max-w-full select-none"
                draggable={false}
              />
            ) : (
              <p className="mt-1 text-sm leading-snug text-stone-200">点击显示手机号</p>
            )}
          </div>
        </div>
      </button>
    </motion.div>
  );
}

function Experience() {
  return (
    <section id="experience" className="bg-ink px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionTitle index="03" kicker="教育与经历" title="学习、研究与参与" />
        <div className="relative">
          <span
            aria-hidden="true"
            className="absolute left-[27px] top-6 bottom-6 w-px bg-gradient-to-b from-accent/40 via-white/10 to-transparent md:left-[31px]"
          />
          <div className="space-y-5">
            {experience.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal
                  key={item.title}
                  index={index}
                  className="relative pl-[72px] md:pl-20"
                >
                  <span className="absolute left-0 top-0 flex h-14 w-14 flex-none items-center justify-center rounded-full border border-white/10 bg-surface-raised md:h-16 md:w-16">
                    <Icon aria-hidden="true" className="h-5 w-5 text-accent md:h-6 md:w-6" strokeWidth={1.5} />
                  </span>
                  <div className="rounded-2xl border border-white/5 bg-surface-raised p-6 transition-colors duration-300 hover:border-white/10 sm:p-8">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                      <span className="text-xs tracking-[0.15em] text-accent/80">{item.period}</span>
                      <span className="h-3 w-px bg-white/15" aria-hidden="true" />
                      <span className="text-xs text-stone-500">{item.role}</span>
                    </div>
                    <h3 className="mt-3 text-lg font-medium leading-snug text-primary sm:text-xl">
                      {item.title}
                    </h3>
                    <ul className="mt-5 space-y-3">
                      {item.points.map((point) => (
                        <li key={point} className="flex gap-3 text-sm leading-relaxed text-stone-400">
                          <Check
                            aria-hidden="true"
                            className="mt-0.5 h-4 w-4 flex-none text-primary"
                            strokeWidth={1.5}
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const reduceMotion = useReducedMotion();
  const viewport = { once: true, margin: "-60px" };

  return (
    <section id="contact" className="bg-ink px-4 py-16 sm:px-6 md:py-24">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl bg-surface px-5 py-16 sm:px-8 md:rounded-[2rem] md:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[460px] w-[860px] max-w-[120%] -translate-x-1/2 -translate-y-1/3 rounded-full bg-primary/[0.07] blur-[140px]"
        />
        <div className="relative z-10">
        <div className="text-center">
          <p className="mb-6 text-[11px] tracking-[0.25em] text-primary/60">联系</p>
          <h2 className="mx-auto max-w-3xl text-3xl font-normal leading-[1.15] text-primary sm:text-4xl md:text-5xl">
            <PullUpHeading
              segments={[
                { text: "想聊聊，或给我一个", className: "text-primary" },
                { text: "实习机会？", className: "text-stone-500" },
              ]}
            />
          </h2>
          <motion.p
            className="mx-auto mt-6 max-w-xl text-sm leading-[1.8] text-stone-400 sm:text-base"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.7, delay: 0.1, ease: easeOut }}
          >
            正在寻找 AI 应用开发、大模型 / Web Agent、数据分析或医疗信息化方向的暑期实习与科研助理机会，欢迎通过邮箱或电话联系。
          </motion.p>
          <motion.a
            href="mailto:yunbinsun7215@foxmail.com"
            className="group mt-9 inline-flex items-center gap-2 rounded-full bg-primary py-1.5 pl-5 pr-1.5 text-sm font-medium text-black transition-[gap] duration-300 hover:gap-3 sm:text-base"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewport}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
            whileHover={reduceMotion ? undefined : { y: -2 }}
            whileTap={reduceMotion ? undefined : { y: 0, scale: 0.98 }}
          >
            <span className="whitespace-nowrap">发邮件给我</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink transition-transform duration-300 group-hover:scale-110 sm:h-10 sm:w-10">
              <ArrowRight className="h-4 w-4 text-primary" strokeWidth={1.5} />
            </span>
          </motion.a>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <PhoneReveal index={1} />
          {contacts.map(({ icon: Icon, label, value, href }, index) => {
            const motionIndex = index === 0 ? 0 : index + 1;
            const inner = (
              <div className="flex h-full items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-5 transition-colors duration-300 hover:border-white/15">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg border border-white/10 bg-white/[0.03]">
                  <Icon aria-hidden="true" className="h-5 w-5 text-primary" strokeWidth={1.5} />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] tracking-[0.15em] text-primary/50">{label}</p>
                  <p className="mt-1 break-words text-sm leading-snug text-stone-200">{value}</p>
                </div>
              </div>
            );
            return (
              <motion.div
                key={label}
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, x: motionIndex % 2 === 0 ? -28 : 28 }
                }
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewport}
                transition={{ duration: 0.6, delay: motionIndex * 0.1, ease: easeOut }}
                whileHover={reduceMotion ? undefined : { y: -3 }}
              >
                {href ? (
                  <a href={href} className="block h-full">
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.p
          className="mt-14 text-center text-xs text-stone-600"
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewport}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          © 2026 孙允斌 · Yunbin Sun　|　Built with React · Tailwind · Framer Motion
        </motion.p>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ink"
      >
        跳到主要内容
      </a>
      <main className="min-h-[100dvh] bg-ink" style={{ color: primaryText }}>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <div className="grain" aria-hidden="true" />
    </>
  );
}
