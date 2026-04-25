import { useEffect, useRef, useState } from "react";
import DecryptedText from "./components/DecryptedText";
import ShapeGrid from "./components/ShapeGrid";

function IconGithub({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function IconExternalLink({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function IconLinkedIn({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconSun() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function IconMoon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

const ARCH_LABELS = [
  "CDN Edge", "API Gateway", "Auth Service", "Load Balancer",
  "Service A", "Service B", "Service C", "Message Queue",
  "Worker Pool", "Primary DB", "Read Replica", "Cache Layer",
  "Object Storage", "Monitor", "Event Bus"
];

const ARCH_POS: [number, number][] = [
  [0.07, 0.1], [0.3, 0.1], [0.6, 0.1], [0.87, 0.17],
  [0.17, 0.38], [0.47, 0.36], [0.77, 0.36], [0.11, 0.63],
  [0.38, 0.63], [0.65, 0.63], [0.88, 0.55], [0.48, 0.23],
  [0.2, 0.86], [0.58, 0.86], [0.38, 0.86]
];

const ARCH_EDGES: [number, number][] = [
  [0, 1], [1, 2], [1, 4], [1, 5], [2, 5], [3, 5], [3, 6],
  [4, 7], [4, 8], [5, 9], [5, 11], [6, 10], [7, 8],
  [8, 12], [9, 13], [9, 14], [14, 4]
];

const ARCH_EDGES_BACK: [number, number][] = [
  [11, 5], [10, 9]
];

const tickerRows = [
  ["AAPL +1.2%", "MSFT +0.4%", "NVDA +2.1%", "SPY +0.3%", "QQQ +0.6%", "GS -0.2%", "JPM +0.5%"],
  ["BTC +1.8%", "ETH +0.9%", "VIX -1.1%", "TLT +0.2%", "XLF +0.4%", "US10Y 4.2%", "DXY -0.1%"]
];

type Theme = "dark" | "light";

type Project = {
  title: string;
  description: string;
  year: number;
  stack: string[];
  github?: string;
  live?: string;
};

const projects: Project[] = [
  {
    title: "FinLit",
    description: "Financial literacy web app focused on budgeting, saving, and investment fundamentals.",
    year: 2026,
    stack: ["JavaScript", "Frontend", "Education"],
    github: "https://github.com/SolomonRES/FinLit",
    live: "https://solomonres.github.io/FinLit/"
  },
  {
    title: "FinLit Backend",
    description: "Backend API for FinLit handling persistence, business logic, and service endpoints.",
    year: 2026,
    stack: ["Node.js", "Express", "REST API"],
    github: "https://github.com/SolomonRES/finlit-backend",
    live: "https://finlit-backend-zwic.onrender.com/"
  }
];

function rrect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    if (saved === "dark" || saved === "light") {
      return saved;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return [theme, () => setTheme((current) => (current === "dark" ? "light" : "dark"))];
}

function ArchCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    let raf = 0;
    let hlTimeout: ReturnType<typeof setTimeout>;
    const packets: {
      edgeIdx: number;
      t: number;
      speed: number;
      trail: { x: number; y: number }[];
    }[] = [];

    let nodes: {
      x: number;
      y: number;
      homeX: number;
      homeY: number;
      label: string;
      w: number;
      h: number;
      driftT: number;
      driftPhi: number;
      driftAmp: number;
      pulse: number;
      lit: number;
    }[] = [];

    const buildNodes = (width: number, height: number) => {
      nodes = ARCH_POS.map(([xr, yr], index) => {
        const label = ARCH_LABELS[index];
        return {
          x: xr * width,
          y: yr * height,
          homeX: xr * width,
          homeY: yr * height,
          label,
          w: label.length * 6.2 + 26,
          h: 24,
          driftT: 9 + Math.random() * 7,
          driftPhi: Math.random() * Math.PI * 2,
          driftAmp: 5 + Math.random() * 5,
          pulse: Math.random(),
          lit: 0
        };
      });
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.parentElement?.offsetWidth ?? window.innerWidth;
      const height = canvas.parentElement?.offsetHeight ?? window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildNodes(width, height);
    };

    const spawnPacket = () => {
      if (packets.length >= 10) {
        return;
      }

      packets.push({
        edgeIdx: Math.floor(Math.random() * ARCH_EDGES.length),
        t: 0,
        speed: 0.001 + Math.random() * 0.0018,
        trail: []
      });
    };

    const scheduleHighlight = () => {
      hlTimeout = setTimeout(() => {
        const edge = ARCH_EDGES[Math.floor(Math.random() * ARCH_EDGES.length)];
        nodes[edge[0]].lit = 1;
        nodes[edge[1]].lit = 1;
        scheduleHighlight();
      }, 2200 + Math.random() * 3800);
    };

    const drawEdge = (fromIndex: number, toIndex: number, dashed: boolean, foreground: string) => {
      const fromNode = nodes[fromIndex];
      const toNode = nodes[toIndex];

      if (!fromNode || !toNode) {
        return;
      }

      const dx = toNode.x - fromNode.x;
      const dy = toNode.y - fromNode.y;
      const len = Math.sqrt(dx * dx + dy * dy);

      if (len < 1) {
        return;
      }

      const ux = dx / len;
      const uy = dy / len;
      const x1 = fromNode.x + ux * (fromNode.w / 2 + 3);
      const y1 = fromNode.y + uy * (fromNode.h / 2 + 2);
      const x2 = toNode.x - ux * (toNode.w / 2 + 9);
      const y2 = toNode.y - uy * (toNode.h / 2 + 2);
      const alpha = (dashed ? 0.03 : 0.045) + ((fromNode.lit + toNode.lit) / 2) * 0.08;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = `rgba(${foreground},${alpha})`;
      ctx.lineWidth = 0.6;
      ctx.setLineDash(dashed ? [3, 5] : []);
      ctx.stroke();
      ctx.setLineDash([]);

      const tipX = toNode.x - ux * (toNode.w / 2);
      const tipY = toNode.y - uy * (toNode.h / 2);
      const arrowLength = 5.5;
      const arrowWidth = 2.8;

      ctx.beginPath();
      ctx.moveTo(tipX, tipY);
      ctx.lineTo(tipX - ux * arrowLength + -uy * arrowWidth, tipY - uy * arrowLength + ux * arrowWidth);
      ctx.lineTo(tipX - ux * arrowLength - -uy * arrowWidth, tipY - uy * arrowLength - ux * arrowWidth);
      ctx.closePath();
      ctx.fillStyle = `rgba(${foreground},${alpha * 1.7})`;
      ctx.fill();
    };

    const draw = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      const now = Date.now() / 1000;
      const isLight = document.documentElement.getAttribute("data-theme") === "light";
      const foreground = isLight ? "0,0,0" : "255,255,255";

      ctx.clearRect(0, 0, width, height);

      for (const node of nodes) {
        node.x = node.homeX + Math.sin(now / node.driftT + node.driftPhi) * node.driftAmp;
        node.y = node.homeY + Math.cos(now / (node.driftT * 0.75) + node.driftPhi * 1.3) * node.driftAmp * 0.6;
        node.pulse = 0.5 + 0.5 * Math.sin(now / 3.4 + node.driftPhi);
        if (node.lit > 0) {
          node.lit = Math.max(0, node.lit - 0.005);
        }
      }

      for (const [fromIndex, toIndex] of ARCH_EDGES) {
        drawEdge(fromIndex, toIndex, false, foreground);
      }

      for (const [fromIndex, toIndex] of ARCH_EDGES_BACK) {
        drawEdge(fromIndex, toIndex, true, foreground);
      }

      for (let index = packets.length - 1; index >= 0; index -= 1) {
        const packet = packets[index];
        packet.t += packet.speed;

        if (packet.t >= 1) {
          packets.splice(index, 1);
          continue;
        }

        const [fromIndex, toIndex] = ARCH_EDGES[packet.edgeIdx];
        const fromNode = nodes[fromIndex];
        const toNode = nodes[toIndex];

        if (!fromNode || !toNode) {
          packets.splice(index, 1);
          continue;
        }

        const x = fromNode.x + (toNode.x - fromNode.x) * packet.t;
        const y = fromNode.y + (toNode.y - fromNode.y) * packet.t;
        packet.trail.push({ x, y });

        if (packet.trail.length > 6) {
          packet.trail.shift();
        }

        for (let trailIndex = 0; trailIndex < packet.trail.length - 1; trailIndex += 1) {
          ctx.beginPath();
          ctx.moveTo(packet.trail[trailIndex].x, packet.trail[trailIndex].y);
          ctx.lineTo(packet.trail[trailIndex + 1].x, packet.trail[trailIndex + 1].y);
          ctx.strokeStyle = `rgba(${foreground},${(trailIndex / packet.trail.length) * (isLight ? 0.14 : 0.18)})`;
          ctx.lineWidth = 1.1;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(x, y, 1.7, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${foreground},${isLight ? 0.28 : 0.36})`;
        ctx.fill();
      }

      for (const node of nodes) {
        const x = node.x - node.w / 2;
        const y = node.y - node.h / 2;
        const bgAlpha = isLight ? 0.018 + node.lit * 0.03 : 0.02 + node.lit * 0.04;
        const borderAlpha = isLight ? 0.05 + node.pulse * 0.02 + node.lit * 0.08 : 0.07 + node.pulse * 0.02 + node.lit * 0.09;
        const textAlpha = isLight ? 0.12 + node.lit * 0.14 : 0.14 + node.lit * 0.16;

        rrect(ctx, x, y, node.w, node.h, 4);
        ctx.fillStyle = `rgba(${foreground},${bgAlpha})`;
        ctx.fill();

        rrect(ctx, x, y, node.w, node.h, 4);
        ctx.strokeStyle = `rgba(${foreground},${borderAlpha})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();

        ctx.font = "500 8px 'Space Grotesk', monospace";
        ctx.fillStyle = `rgba(${foreground},${textAlpha})`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(node.label.toUpperCase(), node.x, node.y);
      }

      raf = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();

    for (let index = 0; index < 7; index += 1) {
      setTimeout(spawnPacket, index * 450);
    }

    const spawnTimer = setInterval(spawnPacket, 1600);
    scheduleHighlight();
    draw();

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(spawnTimer);
      clearTimeout(hlTimeout);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="arch-canvas" aria-hidden="true" />;
}

function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let raf = 0;

    const onMove = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.07;
      currentY += (targetY - currentY) * 0.07;
      element.style.transform = `translate(${currentX - 180}px, ${currentY - 180}px)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <div className="cursor-glow" ref={ref} aria-hidden="true" />;
}

function NoiseOverlay() {
  return (
    <>
      <svg width="0" height="0" aria-hidden="true" focusable="false">
        <filter id="grain-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      <div className="noise-overlay" />
    </>
  );
}

function TickerRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const loopItems = [...items, ...items];

  return (
    <div className={`ticker-row${reverse ? " reverse" : ""}`}>
      <div className="ticker-track">
        {loopItems.map((item, index) => (
          <span key={`${item}-${index}`} className="ticker-chip">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function MarketBackdrop() {
  return (
    <div className="market-backdrop" aria-hidden="true">
      <div className="market-widget market-widget-quote glass-card">
        <div className="widget-label">Market Pulse</div>
        <div className="widget-metrics">
          <span>NASDAQ +0.62</span>
          <span>SPX +0.31</span>
          <span>10Y 4.21</span>
        </div>
      </div>

      <div className="market-widget market-widget-spark glass-card">
        <div className="widget-label">Intraday Trend</div>
        <svg viewBox="0 0 220 90" className="sparkline" preserveAspectRatio="none">
          <path d="M0 68 L22 64 L44 66 L66 54 L88 58 L110 42 L132 48 L154 31 L176 36 L198 22 L220 18" />
        </svg>
      </div>

      <div className="market-widget market-widget-bars glass-card">
        <div className="widget-label">Volume Profile</div>
        <div className="bar-group">
          <span className="bar bar-1" />
          <span className="bar bar-2" />
          <span className="bar bar-3" />
          <span className="bar bar-4" />
          <span className="bar bar-5" />
          <span className="bar bar-6" />
        </div>
      </div>

      <div className="market-tickers">
        <TickerRow items={tickerRows[0]} />
        <TickerRow items={tickerRows[1]} reverse />
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card glass-card">
      <div className="card-top">
        <span className="card-year">{project.year}</span>
        <div className="card-links">
          {project.github ? (
            <a href={project.github} target="_blank" rel="noreferrer" className="icon-link" aria-label={`${project.title} source`}>
              <IconGithub size={14} />
            </a>
          ) : null}
          {project.live ? (
            <a href={project.live} target="_blank" rel="noreferrer" className="icon-link" aria-label={`${project.title} live site`}>
              <IconExternalLink size={14} />
            </a>
          ) : null}
        </div>
      </div>

      <h2 className="card-title">{project.title}</h2>
      <p className="card-desc">{project.description}</p>

      <div className="card-footer">
        {project.stack.map((item) => (
          <span key={`${project.title}-${item}`} className="tag">
            {item}
          </span>
        ))}
      </div>
    </article>
  );
}

export default function App() {
  const [theme, toggleTheme] = useTheme();

  return (
    <>
      <CursorGlow />
      <NoiseOverlay />

      <div className="site-wrapper">
        <header className="header">
          <div className="header-inner">
            <a href="#hero" className="logo">
              <IconGithub size={13} />
              <span>SolomonRES</span>
            </a>

            <nav className="nav" aria-label="Primary">
              <a href="#projects" className="nav-link">Projects</a>
              <a href="https://github.com/SolomonRES" target="_blank" rel="noreferrer" className="nav-link nav-link-icon" aria-label="GitHub">
                <IconGithub size={14} />
              </a>
              <a href="https://www.linkedin.com/in/solomonellissummers/" target="_blank" rel="noreferrer" className="nav-link nav-link-icon" aria-label="LinkedIn">
                <IconLinkedIn size={14} />
              </a>
            </nav>

            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <IconSun /> : <IconMoon />}
            </button>
          </div>
        </header>

        <main>
          <section className="hero" id="hero">
            <ShapeGrid
              className="hero-shape-grid"
              speed={0.22}
              squareSize={48}
              direction="diagonal"
              borderColor={theme === "dark" ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)"}
              hoverFillColor={theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"}
              shape="square"
              hoverTrailAmount={4}
            />
            <ArchCanvas />
            <MarketBackdrop />
            <div className="hero-overlay" />

            <div className="container hero-shell">
              <div className="hero-copy">
                <p className="hero-kicker">Finance x Technology</p>
                <h1 className="hero-heading">
                  <DecryptedText
                    text="Solomon"
                    animateOn="view"
                    sequential
                    speed={45}
                    revealDirection="start"
                    className="hero-heading-char"
                    encryptedClassName="hero-heading-char hero-heading-char-encrypted"
                    parentClassName="hero-heading-line"
                  />
                </h1>
                <p className="hero-subname">
                  <DecryptedText
                    text="Ellis-Summers"
                    animateOn="view"
                    sequential
                    speed={38}
                    revealDirection="center"
                    className="hero-subname-char"
                    encryptedClassName="hero-subname-char hero-subname-char-encrypted"
                    parentClassName="hero-subname-line"
                  />
                </p>
                <p className="hero-descriptor">
                  <DecryptedText
                    text="Shaped by markets, systems, and software."
                    animateOn="view"
                    speed={32}
                    maxIterations={18}
                    characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+-/*"
                    className="hero-descriptor-char"
                    encryptedClassName="hero-descriptor-char hero-descriptor-char-encrypted"
                    parentClassName="hero-descriptor-line"
                  />
                </p>

                <div className="hero-actions">
                  <a href="https://github.com/SolomonRES" target="_blank" rel="noreferrer" className="btn btn-primary">
                    <IconGithub size={13} />
                    GitHub
                  </a>
                  <a href="https://www.linkedin.com/in/solomonellissummers/" target="_blank" rel="noreferrer" className="btn btn-ghost">
                    <IconLinkedIn size={13} />
                    LinkedIn
                  </a>
                </div>
              </div>

              <div className="hero-projects" id="projects">
                <p className="hero-projects-label">Selected Projects</p>
                <div className="hero-projects-grid">
                  {projects.map((project) => (
                    <ProjectCard key={project.title} project={project} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="footer">
          <div className="container footer-inner">
            <p className="footer-copy">Solomon Ellis-Summers</p>
            <div className="footer-links">
              <a href="mailto:SolomonEllisSummers@gmail.com" className="footer-link">SolomonEllisSummers@gmail.com</a>
              <a href="https://github.com/SolomonRES" target="_blank" rel="noreferrer" className="footer-link">GitHub</a>
              <a href="https://www.linkedin.com/in/solomonellissummers/" target="_blank" rel="noreferrer" className="footer-link">LinkedIn</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
