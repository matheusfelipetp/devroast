import { twMerge } from "tailwind-merge";

type ScoreRingProps = {
  score: number;
  maxScore?: number;
  size?: number;
  className?: string;
};

export function ScoreRing({
  score,
  maxScore = 10,
  size = 180,
  className,
}: ScoreRingProps) {
  const scale = size / 180;
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(score / maxScore, 1);
  const strokeDashoffset = circumference * (1 - progress);
  const scoreFontSize = 48 * scale;
  const denomFontSize = 16 * scale;

  return (
    <div
      className={twMerge("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        className="absolute -rotate-90"
      >
        <defs>
          <linearGradient id="score-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-accent-green)" />
            <stop offset="100%" stopColor="var(--color-accent-amber)" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className="stroke-border-primary"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#score-gradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>

      <div className="flex items-center gap-0.5">
        <span
          className="font-mono font-bold text-text-primary leading-none"
          style={{ fontSize: scoreFontSize }}
        >
          {score}
        </span>
        <span
          className="font-mono text-text-tertiary leading-none"
          style={{ fontSize: denomFontSize }}
        >
          /{maxScore}
        </span>
      </div>
    </div>
  );
}
