/* CSS extracted from the previous polished design */
:root {
  --wine-dark: #2e0206;
  --wine-red: #4a040d;
  --wine-light: #7a0e1a;
  --gold: #c5a059;
  --gold-light: #e8d4b2;
  --parchment: #fdfbf7;
  --ink: #1f120d;
  --line: rgba(197, 160, 89, 0.3);
}

html {
  scroll-behavior: smooth;
}

body {
  background: #fff;
  color: var(--ink);
}

.hero-bg {
  background:
    linear-gradient(135deg, rgba(46, 2, 6, 0.96), rgba(74, 4, 13, 0.88)),
    radial-gradient(circle at top, rgba(197, 160, 89, 0.18), transparent 45%),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cg fill='none' stroke='%23C5A059' stroke-width='1.2' opacity='0.18'%3E%3Cpath d='M80 15c-25 20-40 35-40 55 0 26 18 40 40 40s40-14 40-40c0-20-15-35-40-55z'/%3E%3C/g%3E%3C/svg%3E");
  background-size: cover;
}

.dot-grid {
  background-image: radial-gradient(#d9c08a 1.1px, transparent 1.1px);
  background-size: 28px 28px;
}

.ornate-card {
  border: 1.5px solid rgba(197, 160, 89, 0.8);
  box-shadow: inset 0 0 14px rgba(197, 160, 89, 0.12), 0 12px 30px rgba(17, 10, 8, 0.06);
}

.btn-primary {
  background: linear-gradient(135deg, #d5b26d, #c5a059);
  color: #2e0206;
  font-weight: 700;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 24px rgba(197, 160, 89, 0.22);
}

.card-hover {
  transition: all 0.25s ease;
}

.card-hover:hover {
  transform: translateY(-5px);
  box-shadow: 0 22px 38px rgba(46, 2, 6, 0.08);
}

.fade-up {
  animation: fadeUp 0.45s ease;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.read-more {
  position: relative;
  overflow: hidden;
}

.read-more::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.08);
  transform: translateX(-100%);
  transition: transform 0.35s ease;
}

.read-more:hover::before {
  transform: translateX(0);
}
