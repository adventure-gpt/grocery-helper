const DECORATIONS = [
  // Edges and corners
  { emoji: '🍎', top: '3%', left: '2%', size: 'text-4xl', rotate: 15, anim: 'decor-float', dur: '7s', op: 0.4, delay: '0s' },
  { emoji: '🥕', top: '8%', right: '3%', size: 'text-3xl', rotate: -20, anim: 'decor-float-slow', dur: '9s', op: 0.35, delay: '1s' },
  { emoji: '🍋', top: '18%', left: '1%', size: 'text-3xl', rotate: 25, anim: 'decor-drift', dur: '11s', op: 0.35, delay: '2s' },
  { emoji: '🥦', top: '28%', right: '2%', size: 'text-4xl', rotate: -10, anim: 'decor-pulse', dur: '6s', op: 0.38, delay: '0.5s' },
  { emoji: '🍅', top: '40%', left: '3%', size: 'text-3xl', rotate: 12, anim: 'decor-float', dur: '8s', op: 0.4, delay: '3s' },
  { emoji: '🥑', top: '52%', right: '4%', size: 'text-4xl', rotate: -15, anim: 'decor-float-slow', dur: '10s', op: 0.35, delay: '1.5s' },
  { emoji: '🍊', top: '62%', left: '2%', size: 'text-3xl', rotate: 20, anim: 'decor-drift', dur: '9s', op: 0.38, delay: '4s' },
  { emoji: '🌽', top: '72%', right: '3%', size: 'text-3xl', rotate: -8, anim: 'decor-float', dur: '7s', op: 0.35, delay: '2.5s' },
  { emoji: '🍇', top: '82%', left: '4%', size: 'text-4xl', rotate: 10, anim: 'decor-pulse', dur: '8s', op: 0.4, delay: '0s' },
  { emoji: '🍓', top: '90%', right: '5%', size: 'text-3xl', rotate: -25, anim: 'decor-float-slow', dur: '11s', op: 0.35, delay: '3.5s' },

  // Inner scattered — more spread out
  { emoji: '🍌', top: '5%', left: '35%', size: 'text-3xl', rotate: -12, anim: 'decor-drift', dur: '12s', op: 0.3, delay: '1s' },
  { emoji: '🍒', top: '10%', left: '60%', size: 'text-2xl', rotate: 8, anim: 'decor-float', dur: '7s', op: 0.32, delay: '2s' },
  { emoji: '🫐', top: '15%', right: '25%', size: 'text-2xl', rotate: -5, anim: 'decor-pulse', dur: '6s', op: 0.3, delay: '4s' },
  { emoji: '🍑', top: '22%', left: '18%', size: 'text-3xl', rotate: 15, anim: 'decor-float-slow', dur: '10s', op: 0.32, delay: '0.5s' },
  { emoji: '🍐', top: '30%', right: '35%', size: 'text-2xl', rotate: -18, anim: 'decor-drift', dur: '11s', op: 0.28, delay: '3s' },
  { emoji: '🍆', top: '35%', left: '12%', size: 'text-3xl', rotate: 22, anim: 'decor-float', dur: '8s', op: 0.3, delay: '1.5s' },
  { emoji: '🌶️', top: '45%', left: '45%', size: 'text-2xl', rotate: -30, anim: 'decor-pulse', dur: '7s', op: 0.28, delay: '2.5s' },
  { emoji: '🥬', top: '48%', right: '18%', size: 'text-3xl', rotate: 5, anim: 'decor-float-slow', dur: '9s', op: 0.3, delay: '4.5s' },
  { emoji: '🍉', top: '55%', left: '28%', size: 'text-4xl', rotate: -8, anim: 'decor-drift', dur: '13s', op: 0.28, delay: '0s' },
  { emoji: '🧄', top: '58%', right: '40%', size: 'text-2xl', rotate: 18, anim: 'decor-float', dur: '8s', op: 0.25, delay: '3.5s' },
  { emoji: '🥝', top: '65%', left: '50%', size: 'text-2xl', rotate: -15, anim: 'decor-pulse', dur: '6s', op: 0.3, delay: '1s' },
  { emoji: '🫑', top: '68%', left: '15%', size: 'text-3xl', rotate: 10, anim: 'decor-float-slow', dur: '10s', op: 0.28, delay: '2s' },
  { emoji: '🥭', top: '75%', right: '22%', size: 'text-3xl', rotate: -12, anim: 'decor-drift', dur: '11s', op: 0.32, delay: '4s' },
  { emoji: '🍄', top: '78%', left: '38%', size: 'text-2xl', rotate: 8, anim: 'decor-float', dur: '7s', op: 0.25, delay: '0.5s' },
  { emoji: '🥒', top: '85%', right: '40%', size: 'text-3xl', rotate: -20, anim: 'decor-float-slow', dur: '9s', op: 0.3, delay: '3s' },
  { emoji: '🍍', top: '88%', left: '55%', size: 'text-3xl', rotate: 5, anim: 'decor-pulse', dur: '8s', op: 0.28, delay: '1.5s' },
  { emoji: '🧅', top: '92%', left: '22%', size: 'text-2xl', rotate: 15, anim: 'decor-drift', dur: '12s', op: 0.3, delay: '2.5s' },
];

export default function BackgroundDecor() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {DECORATIONS.map((d, i) => (
        <span
          key={i}
          className={`absolute select-none ${d.size} ${d.anim}`}
          style={{
            top: d.top,
            left: d.left,
            right: d.right,
            '--rotate': `${d.rotate}deg`,
            '--dur': d.dur,
            '--op': d.op,
            opacity: d.op,
            animationDelay: d.delay,
            transform: `rotate(${d.rotate}deg)`,
            filter: 'saturate(0.85)',
          }}
        >
          {d.emoji}
        </span>
      ))}
    </div>
  );
}
