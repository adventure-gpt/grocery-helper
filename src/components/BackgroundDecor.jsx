export default function BackgroundDecor() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Carrot - top left */}
      <svg viewBox="0 0 80 120" className="absolute w-24 opacity-[0.15]" style={{ top: '5%', left: '2%', transform: 'rotate(25deg)' }}>
        <path d="M40 20 C38 20 30 50 28 80 C26 95 32 110 40 115 C48 110 54 95 52 80 C50 50 42 20 40 20Z" fill="#f97316" />
        <path d="M38 20 C35 10 30 2 25 0 C30 5 33 12 35 20" fill="#16a34a" stroke="none" />
        <path d="M42 20 C45 10 50 2 55 0 C50 5 47 12 45 20" fill="#16a34a" stroke="none" />
        <path d="M40 18 C40 8 40 2 40 0 C40 5 40 12 40 18" fill="#22c55e" stroke="none" />
      </svg>

      {/* Apple - top right */}
      <svg viewBox="0 0 100 110" className="absolute w-20 opacity-[0.14]" style={{ top: '8%', right: '4%', transform: 'rotate(-15deg)' }}>
        <path d="M50 25 C30 25 10 45 10 70 C10 95 30 105 50 105 C70 105 90 95 90 70 C90 45 70 25 50 25Z" fill="#ef4444" />
        <path d="M50 25 C50 15 55 5 65 2" stroke="#16a34a" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M52 22 C58 18 65 16 72 18 C66 14 58 14 52 18Z" fill="#16a34a" />
      </svg>

      {/* Lemon - mid left */}
      <svg viewBox="0 0 100 70" className="absolute w-20 opacity-[0.15]" style={{ top: '32%', left: '1%', transform: 'rotate(-30deg)' }}>
        <ellipse cx="50" cy="35" rx="42" ry="28" fill="#facc15" />
        <ellipse cx="20" cy="35" rx="10" ry="6" fill="#eab308" />
        <ellipse cx="80" cy="35" rx="10" ry="6" fill="#eab308" />
      </svg>

      {/* Broccoli - right side */}
      <svg viewBox="0 0 90 100" className="absolute w-22 opacity-[0.14]" style={{ top: '40%', right: '2%', transform: 'rotate(10deg)' }}>
        <rect x="38" y="60" width="14" height="35" rx="5" fill="#15803d" />
        <circle cx="30" cy="35" r="20" fill="#22c55e" />
        <circle cx="55" cy="30" r="22" fill="#16a34a" />
        <circle cx="45" cy="20" r="18" fill="#22c55e" />
        <circle cx="65" cy="45" r="15" fill="#16a34a" />
        <circle cx="25" cy="50" r="14" fill="#15803d" />
      </svg>

      {/* Tomato - lower left */}
      <svg viewBox="0 0 100 100" className="absolute w-20 opacity-[0.14]" style={{ top: '62%', left: '4%', transform: 'rotate(15deg)' }}>
        <circle cx="50" cy="55" r="38" fill="#ef4444" />
        <path d="M50 20 C45 15 40 10 38 5" stroke="#16a34a" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M50 20 C55 15 60 10 62 5" stroke="#16a34a" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M42 22 C35 18 28 20 25 18 C30 22 38 24 44 22Z" fill="#22c55e" />
        <path d="M58 22 C65 18 72 20 75 18 C70 22 62 24 56 22Z" fill="#22c55e" />
      </svg>

      {/* Avocado - lower right */}
      <svg viewBox="0 0 80 120" className="absolute w-22 opacity-[0.15]" style={{ top: '68%', right: '5%', transform: 'rotate(-20deg)' }}>
        <path d="M40 10 C25 10 10 35 10 65 C10 95 25 115 40 115 C55 115 70 95 70 65 C70 35 55 10 40 10Z" fill="#84cc16" />
        <ellipse cx="40" cy="72" rx="18" ry="22" fill="#65a30d" />
        <circle cx="40" cy="72" r="12" fill="#713f12" />
      </svg>

      {/* Pepper - top center-left */}
      <svg viewBox="0 0 60 110" className="absolute w-16 opacity-[0.14]" style={{ top: '15%', left: '22%', transform: 'rotate(35deg)' }}>
        <path d="M30 25 C20 25 10 40 8 60 C6 80 15 100 30 105 C45 100 54 80 52 60 C50 40 40 25 30 25Z" fill="#f97316" />
        <path d="M30 25 C30 15 32 5 35 0" stroke="#16a34a" strokeWidth="3" fill="none" strokeLinecap="round" />
      </svg>

      {/* Pear - bottom center */}
      <svg viewBox="0 0 80 120" className="absolute w-20 opacity-[0.14]" style={{ top: '82%', left: '42%', transform: 'rotate(5deg)' }}>
        <path d="M40 15 C32 15 25 25 25 38 C25 48 30 55 28 70 C26 90 32 115 40 118 C48 115 54 90 52 70 C50 55 55 48 55 38 C55 25 48 15 40 15Z" fill="#84cc16" />
        <path d="M40 15 C40 8 43 2 48 0" stroke="#15803d" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </svg>

      {/* Strawberry - mid center-right */}
      <svg viewBox="0 0 70 90" className="absolute w-16 opacity-[0.14]" style={{ top: '48%', right: '20%', transform: 'rotate(-10deg)' }}>
        <path d="M35 15 C20 15 5 35 5 55 C5 75 20 85 35 88 C50 85 65 75 65 55 C65 35 50 15 35 15Z" fill="#ef4444" />
        <path d="M25 12 C20 6 15 4 10 5 C16 8 22 12 28 14Z" fill="#22c55e" />
        <path d="M45 12 C50 6 55 4 60 5 C54 8 48 12 42 14Z" fill="#22c55e" />
        <path d="M35 10 C35 4 35 1 35 0 C35 4 35 8 35 12Z" fill="#16a34a" />
        <circle cx="25" cy="40" r="2" fill="#fca5a5" />
        <circle cx="35" cy="50" r="2" fill="#fca5a5" />
        <circle cx="45" cy="42" r="2" fill="#fca5a5" />
        <circle cx="30" cy="60" r="2" fill="#fca5a5" />
        <circle cx="42" cy="65" r="2" fill="#fca5a5" />
      </svg>

      {/* Banana - top center */}
      <svg viewBox="0 0 120 80" className="absolute w-24 opacity-[0.14]" style={{ top: '3%', left: '40%', transform: 'rotate(-12deg)' }}>
        <path d="M15 55 C25 20 55 5 95 10 C100 12 105 18 100 22 C65 18 35 32 28 58 C25 65 18 62 15 55Z" fill="#facc15" />
        <path d="M95 10 C98 9 102 10 105 14 C102 11 99 10 95 10Z" fill="#a16207" />
        <path d="M15 55 C13 60 12 62 15 65 C14 62 14 58 15 55Z" fill="#a16207" />
      </svg>

      {/* Grapes - mid left lower */}
      <svg viewBox="0 0 80 100" className="absolute w-20 opacity-[0.13]" style={{ top: '52%', left: '15%', transform: 'rotate(8deg)' }}>
        <circle cx="30" cy="35" r="10" fill="#7c3aed" />
        <circle cx="50" cy="35" r="10" fill="#8b5cf6" />
        <circle cx="22" cy="52" r="10" fill="#8b5cf6" />
        <circle cx="40" cy="50" r="10" fill="#7c3aed" />
        <circle cx="58" cy="50" r="10" fill="#6d28d9" />
        <circle cx="30" cy="65" r="10" fill="#6d28d9" />
        <circle cx="48" cy="65" r="10" fill="#7c3aed" />
        <circle cx="38" cy="78" r="10" fill="#8b5cf6" />
        <path d="M40 35 C40 20 42 10 48 5" stroke="#15803d" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M46 8 C50 6 54 8 52 12 C50 8 48 7 46 8Z" fill="#22c55e" />
      </svg>

      {/* Watermelon slice - bottom right */}
      <svg viewBox="0 0 120 70" className="absolute w-28 opacity-[0.13]" style={{ top: '88%', right: '15%', transform: 'rotate(-8deg)' }}>
        <path d="M10 60 C10 60 60 0 110 60Z" fill="#22c55e" />
        <path d="M18 58 C18 58 60 8 102 58Z" fill="#ef4444" />
        <circle cx="45" cy="42" r="3" fill="#1a1a1a" />
        <circle cx="60" cy="35" r="3" fill="#1a1a1a" />
        <circle cx="75" cy="42" r="3" fill="#1a1a1a" />
        <circle cx="52" cy="50" r="3" fill="#1a1a1a" />
        <circle cx="68" cy="50" r="3" fill="#1a1a1a" />
      </svg>

      {/* Corn - right upper */}
      <svg viewBox="0 0 50 120" className="absolute w-14 opacity-[0.14]" style={{ top: '22%', right: '12%', transform: 'rotate(20deg)' }}>
        <path d="M25 25 C18 25 12 40 12 65 C12 90 18 110 25 112 C32 110 38 90 38 65 C38 40 32 25 25 25Z" fill="#facc15" />
        <circle cx="18" cy="45" r="3" fill="#eab308" />
        <circle cx="25" cy="43" r="3" fill="#eab308" />
        <circle cx="32" cy="45" r="3" fill="#eab308" />
        <circle cx="18" cy="55" r="3" fill="#eab308" />
        <circle cx="25" cy="53" r="3" fill="#eab308" />
        <circle cx="32" cy="55" r="3" fill="#eab308" />
        <circle cx="18" cy="65" r="3" fill="#eab308" />
        <circle cx="25" cy="63" r="3" fill="#eab308" />
        <circle cx="32" cy="65" r="3" fill="#eab308" />
        <circle cx="18" cy="75" r="3" fill="#eab308" />
        <circle cx="25" cy="73" r="3" fill="#eab308" />
        <circle cx="32" cy="75" r="3" fill="#eab308" />
        <path d="M20 25 C15 15 10 8 5 5 C12 10 18 18 22 25Z" fill="#22c55e" />
        <path d="M30 25 C35 15 40 8 45 5 C38 10 32 18 28 25Z" fill="#22c55e" />
        <path d="M25 22 C25 12 25 5 25 0 C25 8 25 16 25 22Z" fill="#16a34a" />
      </svg>

      {/* Cherry pair - top area */}
      <svg viewBox="0 0 90 80" className="absolute w-18 opacity-[0.15]" style={{ top: '10%', left: '55%', transform: 'rotate(-5deg)' }}>
        <path d="M45 5 C35 15 25 30 25 45" stroke="#15803d" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M45 5 C55 15 65 30 65 45" stroke="#15803d" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M45 5 C50 3 55 5 52 10 C50 6 48 5 45 5Z" fill="#22c55e" />
        <circle cx="25" cy="52" r="16" fill="#dc2626" />
        <circle cx="22" cy="48" r="4" fill="#ef4444" opacity="0.5" />
        <circle cx="65" cy="52" r="16" fill="#dc2626" />
        <circle cx="62" cy="48" r="4" fill="#ef4444" opacity="0.5" />
      </svg>

      {/* Eggplant - left mid */}
      <svg viewBox="0 0 50 120" className="absolute w-16 opacity-[0.13]" style={{ top: '42%', left: '8%', transform: 'rotate(-25deg)' }}>
        <path d="M25 30 C15 30 8 50 8 75 C8 100 15 115 25 118 C35 115 42 100 42 75 C42 50 35 30 25 30Z" fill="#7c3aed" />
        <path d="M25 30 C25 22 28 15 32 12 C30 18 28 24 25 30Z" fill="#16a34a" />
        <path d="M25 30 C20 22 15 18 12 18 C16 22 20 26 25 30Z" fill="#22c55e" />
        <ellipse cx="28" cy="15" rx="6" ry="4" fill="#15803d" transform="rotate(-20, 28, 15)" />
      </svg>

      {/* Mushroom - bottom left area */}
      <svg viewBox="0 0 90 90" className="absolute w-18 opacity-[0.13]" style={{ top: '78%', left: '8%', transform: 'rotate(12deg)' }}>
        <rect x="35" y="50" width="20" height="35" rx="5" fill="#fef3c7" />
        <path d="M5 55 C5 30 25 10 45 10 C65 10 85 30 85 55Z" fill="#a16207" />
        <circle cx="30" cy="35" r="5" fill="#fef3c7" opacity="0.4" />
        <circle cx="55" cy="30" r="7" fill="#fef3c7" opacity="0.4" />
        <circle cx="45" cy="45" r="4" fill="#fef3c7" opacity="0.4" />
      </svg>

      {/* Garlic - upper mid */}
      <svg viewBox="0 0 70 80" className="absolute w-16 opacity-[0.12]" style={{ top: '18%', left: '72%', transform: 'rotate(15deg)' }}>
        <path d="M35 20 C20 20 10 35 10 52 C10 68 20 78 35 78 C50 78 60 68 60 52 C60 35 50 20 35 20Z" fill="#fef9c3" />
        <path d="M35 20 C32 25 30 40 30 55 C30 40 28 25 25 20 C28 18 32 18 35 20Z" fill="#fef3c7" stroke="#e5e7eb" strokeWidth="0.5" />
        <path d="M35 20 C38 25 40 40 40 55 C40 40 42 25 45 20 C42 18 38 18 35 20Z" fill="#fef3c7" stroke="#e5e7eb" strokeWidth="0.5" />
        <path d="M35 15 C35 10 36 6 38 5" stroke="#a16207" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>

      {/* Radish - mid right */}
      <svg viewBox="0 0 60 100" className="absolute w-14 opacity-[0.14]" style={{ top: '55%', right: '35%', transform: 'rotate(18deg)' }}>
        <path d="M30 30 C20 30 12 42 12 58 C12 74 20 85 30 88 C40 85 48 74 48 58 C48 42 40 30 30 30Z" fill="#e11d48" />
        <path d="M30 85 C28 92 27 98 28 105" stroke="#fef2f2" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M32 86 C34 92 36 97 35 102" stroke="#fef2f2" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M25 30 C20 22 15 16 10 14 C16 18 22 24 27 30Z" fill="#22c55e" />
        <path d="M35 30 C40 22 45 16 50 14 C44 18 38 24 33 30Z" fill="#16a34a" />
      </svg>

      {/* Onion - bottom center-left */}
      <svg viewBox="0 0 80 90" className="absolute w-18 opacity-[0.13]" style={{ top: '75%', left: '30%', transform: 'rotate(-8deg)' }}>
        <path d="M40 15 C22 15 8 35 8 55 C8 75 22 85 40 85 C58 85 72 75 72 55 C72 35 58 15 40 15Z" fill="#fbbf24" />
        <path d="M40 15 C35 20 32 35 32 55 C32 35 30 20 28 15 C32 12 36 12 40 15Z" fill="#f59e0b" opacity="0.4" />
        <path d="M40 15 C45 20 48 35 48 55 C48 35 50 20 52 15 C48 12 44 12 40 15Z" fill="#f59e0b" opacity="0.4" />
        <path d="M40 12 C40 6 41 2 43 0" stroke="#a16207" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>

      {/* Blueberries cluster - upper left area */}
      <svg viewBox="0 0 60 50" className="absolute w-16 opacity-[0.15]" style={{ top: '25%', left: '35%', transform: 'rotate(5deg)' }}>
        <circle cx="15" cy="28" r="10" fill="#3b82f6" />
        <circle cx="32" cy="25" r="10" fill="#2563eb" />
        <circle cx="48" cy="30" r="10" fill="#3b82f6" />
        <circle cx="22" cy="40" r="10" fill="#1d4ed8" />
        <circle cx="40" cy="42" r="10" fill="#2563eb" />
        <circle cx="14" cy="27" r="2" fill="#1d4ed8" opacity="0.5" />
        <circle cx="31" cy="24" r="2" fill="#1d4ed8" opacity="0.5" />
        <circle cx="47" cy="29" r="2" fill="#1d4ed8" opacity="0.5" />
      </svg>

      {/* Hot pepper - right mid-lower */}
      <svg viewBox="0 0 40 110" className="absolute w-12 opacity-[0.14]" style={{ top: '60%', right: '10%', transform: 'rotate(-30deg)' }}>
        <path d="M20 20 C14 20 8 35 6 55 C4 75 8 95 14 105 C16 108 18 108 20 105 C22 95 24 80 22 60 C20 40 22 25 20 20Z" fill="#dc2626" />
        <path d="M20 20 C20 12 22 5 25 2" stroke="#16a34a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M20 18 C16 12 12 10 10 12 C14 12 18 16 20 20Z" fill="#22c55e" />
      </svg>

      {/* Peach - lower center-right */}
      <svg viewBox="0 0 90 90" className="absolute w-20 opacity-[0.13]" style={{ top: '72%', right: '28%', transform: 'rotate(10deg)' }}>
        <circle cx="45" cy="48" r="35" fill="#fb923c" />
        <path d="M45 15 C40 18 38 22 42 25 C44 20 46 18 48 25 C52 22 50 18 45 15Z" fill="#fb923c" />
        <path d="M45 13 C45 8 47 3 50 1" stroke="#15803d" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M44 14 C40 10 36 10 34 12 C38 12 42 14 44 16Z" fill="#22c55e" />
        <path d="M30 35 C32 42 35 50 35 55" stroke="#f97316" strokeWidth="1" fill="none" opacity="0.3" />
      </svg>

      {/* Peas in pod - upper right area */}
      <svg viewBox="0 0 120 50" className="absolute w-24 opacity-[0.13]" style={{ top: '5%', right: '20%', transform: 'rotate(15deg)' }}>
        <path d="M10 25 C10 10 30 5 60 5 C90 5 110 10 110 25 C110 40 90 45 60 45 C30 45 10 40 10 25Z" fill="#22c55e" />
        <circle cx="35" cy="25" r="12" fill="#4ade80" />
        <circle cx="60" cy="25" r="12" fill="#4ade80" />
        <circle cx="85" cy="25" r="12" fill="#4ade80" />
        <path d="M10 25 C10 10 30 5 60 5 C90 5 110 10 110 25" fill="none" stroke="#16a34a" strokeWidth="2" />
      </svg>

      {/* Small carrot 2 - scattered */}
      <svg viewBox="0 0 80 120" className="absolute w-16 opacity-[0.12]" style={{ top: '45%', left: '42%', transform: 'rotate(-40deg)' }}>
        <path d="M40 20 C38 20 30 50 28 80 C26 95 32 110 40 115 C48 110 54 95 52 80 C50 50 42 20 40 20Z" fill="#f97316" />
        <path d="M38 20 C35 10 30 2 25 0 C30 5 33 12 35 20" fill="#16a34a" stroke="none" />
        <path d="M42 20 C45 10 50 2 55 0 C50 5 47 12 45 20" fill="#16a34a" stroke="none" />
      </svg>

      {/* Leaf accent - far right mid */}
      <svg viewBox="0 0 60 80" className="absolute w-14 opacity-[0.12]" style={{ top: '30%', right: '40%', transform: 'rotate(45deg)' }}>
        <path d="M30 5 C10 20 5 50 15 70 C20 60 25 45 30 35 C35 45 40 60 45 70 C55 50 50 20 30 5Z" fill="#22c55e" />
        <path d="M30 15 L30 65" stroke="#16a34a" strokeWidth="2" fill="none" />
      </svg>

      {/* Orange - bottom left */}
      <svg viewBox="0 0 80 80" className="absolute w-18 opacity-[0.14]" style={{ top: '85%', left: '15%', transform: 'rotate(8deg)' }}>
        <circle cx="40" cy="40" r="32" fill="#f97316" />
        <circle cx="40" cy="40" r="28" fill="#fb923c" opacity="0.3" />
        <path d="M40 10 C40 6 42 3 45 2" stroke="#16a34a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M38 9 C34 6 30 6 28 8 C32 8 36 10 38 12Z" fill="#22c55e" />
      </svg>

      {/* Lime - scattered right */}
      <svg viewBox="0 0 80 80" className="absolute w-16 opacity-[0.13]" style={{ top: '35%', right: '8%', transform: 'rotate(-15deg)' }}>
        <circle cx="40" cy="40" r="32" fill="#84cc16" />
        <circle cx="40" cy="40" r="26" fill="#a3e635" opacity="0.3" />
        <path d="M40 10 C40 6 42 3 44 2" stroke="#15803d" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>

      {/* Pineapple - lower left area */}
      <svg viewBox="0 0 70 130" className="absolute w-20 opacity-[0.12]" style={{ top: '58%', left: '28%', transform: 'rotate(5deg)' }}>
        <path d="M35 40 C20 40 10 55 10 80 C10 105 20 120 35 125 C50 120 60 105 60 80 C60 55 50 40 35 40Z" fill="#f59e0b" />
        <path d="M15 55 L55 85 M55 55 L15 85 M15 70 L55 70 M35 50 L35 100" stroke="#d97706" strokeWidth="1.5" fill="none" opacity="0.4" />
        <path d="M30 40 C25 30 18 20 12 15 C20 22 28 32 32 40Z" fill="#22c55e" />
        <path d="M40 40 C45 30 52 20 58 15 C50 22 42 32 38 40Z" fill="#16a34a" />
        <path d="M35 38 C35 28 35 18 35 10 C35 20 35 30 35 38Z" fill="#22c55e" />
        <path d="M28 42 C20 35 14 28 8 25 C15 30 24 38 30 42Z" fill="#16a34a" />
        <path d="M42 42 C50 35 56 28 62 25 C55 30 46 38 40 42Z" fill="#22c55e" />
      </svg>

      {/* Second strawberry - upper area */}
      <svg viewBox="0 0 70 90" className="absolute w-14 opacity-[0.14]" style={{ top: '12%', left: '12%', transform: 'rotate(20deg)' }}>
        <path d="M35 15 C20 15 5 35 5 55 C5 75 20 85 35 88 C50 85 65 75 65 55 C65 35 50 15 35 15Z" fill="#ef4444" />
        <path d="M25 12 C20 6 15 4 10 5 C16 8 22 12 28 14Z" fill="#22c55e" />
        <path d="M45 12 C50 6 55 4 60 5 C54 8 48 12 42 14Z" fill="#22c55e" />
        <circle cx="25" cy="40" r="2" fill="#fca5a5" />
        <circle cx="35" cy="50" r="2" fill="#fca5a5" />
        <circle cx="45" cy="42" r="2" fill="#fca5a5" />
        <circle cx="30" cy="60" r="2" fill="#fca5a5" />
        <circle cx="42" cy="65" r="2" fill="#fca5a5" />
      </svg>

      {/* Second apple - scattered */}
      <svg viewBox="0 0 100 110" className="absolute w-16 opacity-[0.12]" style={{ top: '38%', left: '55%', transform: 'rotate(22deg)' }}>
        <path d="M50 25 C30 25 10 45 10 70 C10 95 30 105 50 105 C70 105 90 95 90 70 C90 45 70 25 50 25Z" fill="#22c55e" />
        <path d="M50 25 C50 15 55 5 65 2" stroke="#15803d" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M52 22 C58 18 65 16 72 18 C66 14 58 14 52 18Z" fill="#16a34a" />
      </svg>
    </div>
  );
}
