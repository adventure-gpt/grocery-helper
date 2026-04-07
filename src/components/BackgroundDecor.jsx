export default function BackgroundDecor() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Carrot - top left */}
      <svg viewBox="0 0 80 120" className="absolute w-16 opacity-[0.07]" style={{ top: '8%', left: '3%', transform: 'rotate(25deg)' }}>
        <path d="M40 20 C38 20 30 50 28 80 C26 95 32 110 40 115 C48 110 54 95 52 80 C50 50 42 20 40 20Z" fill="#f97316" />
        <path d="M38 20 C35 10 30 2 25 0 C30 5 33 12 35 20" fill="#16a34a" stroke="none" />
        <path d="M42 20 C45 10 50 2 55 0 C50 5 47 12 45 20" fill="#16a34a" stroke="none" />
        <path d="M40 18 C40 8 40 2 40 0 C40 5 40 12 40 18" fill="#22c55e" stroke="none" />
      </svg>

      {/* Apple - top right area */}
      <svg viewBox="0 0 100 110" className="absolute w-14 opacity-[0.06]" style={{ top: '12%', right: '5%', transform: 'rotate(-15deg)' }}>
        <path d="M50 25 C30 25 10 45 10 70 C10 95 30 105 50 105 C70 105 90 95 90 70 C90 45 70 25 50 25Z" fill="#ef4444" />
        <path d="M50 25 C50 15 55 5 65 2" stroke="#16a34a" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M52 22 C58 18 65 16 72 18 C66 14 58 14 52 18Z" fill="#16a34a" />
      </svg>

      {/* Lemon - mid left */}
      <svg viewBox="0 0 100 70" className="absolute w-12 opacity-[0.07]" style={{ top: '35%', left: '2%', transform: 'rotate(-30deg)' }}>
        <ellipse cx="50" cy="35" rx="42" ry="28" fill="#facc15" />
        <ellipse cx="20" cy="35" rx="10" ry="6" fill="#eab308" />
        <ellipse cx="80" cy="35" rx="10" ry="6" fill="#eab308" />
      </svg>

      {/* Broccoli - right side */}
      <svg viewBox="0 0 90 100" className="absolute w-14 opacity-[0.06]" style={{ top: '42%', right: '3%', transform: 'rotate(10deg)' }}>
        <rect x="38" y="60" width="14" height="35" rx="5" fill="#15803d" />
        <circle cx="30" cy="35" r="20" fill="#22c55e" />
        <circle cx="55" cy="30" r="22" fill="#16a34a" />
        <circle cx="45" cy="20" r="18" fill="#22c55e" />
        <circle cx="65" cy="45" r="15" fill="#16a34a" />
        <circle cx="25" cy="50" r="14" fill="#15803d" />
      </svg>

      {/* Tomato - lower left */}
      <svg viewBox="0 0 100 100" className="absolute w-12 opacity-[0.06]" style={{ top: '65%', left: '5%', transform: 'rotate(15deg)' }}>
        <circle cx="50" cy="55" r="38" fill="#ef4444" />
        <path d="M50 20 C45 15 40 10 38 5" stroke="#16a34a" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M50 20 C55 15 60 10 62 5" stroke="#16a34a" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M42 22 C35 18 28 20 25 18 C30 22 38 24 44 22Z" fill="#22c55e" />
        <path d="M58 22 C65 18 72 20 75 18 C70 22 62 24 56 22Z" fill="#22c55e" />
      </svg>

      {/* Avocado - lower right */}
      <svg viewBox="0 0 80 120" className="absolute w-14 opacity-[0.07]" style={{ top: '70%', right: '6%', transform: 'rotate(-20deg)' }}>
        <path d="M40 10 C25 10 10 35 10 65 C10 95 25 115 40 115 C55 115 70 95 70 65 C70 35 55 10 40 10Z" fill="#84cc16" />
        <ellipse cx="40" cy="72" rx="18" ry="22" fill="#65a30d" />
        <circle cx="40" cy="72" r="12" fill="#713f12" />
      </svg>

      {/* Pepper - top center-left */}
      <svg viewBox="0 0 60 110" className="absolute w-10 opacity-[0.06]" style={{ top: '18%', left: '25%', transform: 'rotate(35deg)' }}>
        <path d="M30 25 C20 25 10 40 8 60 C6 80 15 100 30 105 C45 100 54 80 52 60 C50 40 40 25 30 25Z" fill="#f97316" />
        <path d="M30 25 C30 15 32 5 35 0" stroke="#16a34a" strokeWidth="3" fill="none" strokeLinecap="round" />
      </svg>

      {/* Pear - bottom center */}
      <svg viewBox="0 0 80 120" className="absolute w-12 opacity-[0.06]" style={{ top: '85%', left: '45%', transform: 'rotate(5deg)' }}>
        <path d="M40 15 C32 15 25 25 25 38 C25 48 30 55 28 70 C26 90 32 115 40 118 C48 115 54 90 52 70 C50 55 55 48 55 38 C55 25 48 15 40 15Z" fill="#84cc16" />
        <path d="M40 15 C40 8 43 2 48 0" stroke="#15803d" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </svg>

      {/* Strawberry - mid center-right */}
      <svg viewBox="0 0 70 90" className="absolute w-10 opacity-[0.06]" style={{ top: '50%', right: '22%', transform: 'rotate(-10deg)' }}>
        <path d="M35 15 C20 15 5 35 5 55 C5 75 20 85 35 88 C50 85 65 75 65 55 C65 35 50 15 35 15Z" fill="#ef4444" />
        <path d="M25 12 C20 6 15 4 10 5 C16 8 22 12 28 14Z" fill="#22c55e" />
        <path d="M45 12 C50 6 55 4 60 5 C54 8 48 12 42 14Z" fill="#22c55e" />
        <path d="M35 10 C35 4 35 1 35 0 C35 4 35 8 35 12Z" fill="#16a34a" />
        <circle cx="25" cy="40" r="1.5" fill="#fca5a5" />
        <circle cx="35" cy="50" r="1.5" fill="#fca5a5" />
        <circle cx="45" cy="42" r="1.5" fill="#fca5a5" />
        <circle cx="30" cy="60" r="1.5" fill="#fca5a5" />
        <circle cx="42" cy="65" r="1.5" fill="#fca5a5" />
      </svg>

      {/* Leaf accent - far right mid */}
      <svg viewBox="0 0 60 80" className="absolute w-8 opacity-[0.05]" style={{ top: '28%', right: '15%', transform: 'rotate(45deg)' }}>
        <path d="M30 5 C10 20 5 50 15 70 C20 60 25 45 30 35 C35 45 40 60 45 70 C55 50 50 20 30 5Z" fill="#22c55e" />
        <path d="M30 15 L30 65" stroke="#16a34a" strokeWidth="2" fill="none" />
      </svg>

      {/* Small orange - bottom left */}
      <svg viewBox="0 0 80 80" className="absolute w-10 opacity-[0.06]" style={{ top: '80%', left: '18%', transform: 'rotate(8deg)' }}>
        <circle cx="40" cy="40" r="32" fill="#f97316" />
        <circle cx="40" cy="40" r="28" fill="#fb923c" opacity="0.3" />
        <path d="M40 10 C40 6 42 3 45 2" stroke="#16a34a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M38 9 C34 6 30 6 28 8 C32 8 36 10 38 12Z" fill="#22c55e" />
      </svg>
    </div>
  );
}
