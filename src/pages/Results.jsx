import { useNavigate } from 'react-router-dom'

const DOSHA = {
  vata: { label: 'Vata', color: '#7B5EA7', bg: '#F0EAF8' },
  pitta: { label: 'Pitta', color: '#C45C26', bg: '#FFF0E8' },
  kapha: { label: 'Kapha', color: '#1A8A7A', bg: '#E8F4F1' },
}

export default function Results({ plan }) {
  const navigate = useNavigate()

  if (!plan) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4 px-4">
        <p className="text-muted-foreground">No results yet. Take the Prakriti quiz first.</p>
        <button onClick={() => navigate('/quiz')} className="bg-primary text-white px-6 py-2.5 rounded-xl text-sm hover:opacity-90">
          Take Quiz
        </button>
      </div>
    )
  }

  const { prakriti, voiceProfile, riyazPlan, ayurveda, pranayama, yoga, swarSuraksha } = plan
  const primary = DOSHA[prakriti.primary] || DOSHA.vata
  const total = Object.values(prakriti.scores).reduce((a, b) => a + b, 0)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero header */}
      <div className="px-6 py-10 text-center" style={{ background: primary.bg }}>
        <button onClick={() => navigate('/')} className="text-sm text-muted-foreground hover:text-foreground mb-6 block mx-auto">
          ← Home
        </button>
        <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full text-white mb-4" style={{ background: primary.color }}>
          {primary.label} Dominant{prakriti.secondary !== 'none' ? ` · ${DOSHA[prakriti.secondary]?.label} Secondary` : ''}
        </span>
        <h1 className="text-3xl text-foreground mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
          Your Vocal Health Plan
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed mb-6">
          {prakriti.summary}
        </p>

        {/* Dosha scores */}
        <div className="flex flex-col gap-2 max-w-xs mx-auto">
          {Object.entries(prakriti.scores).map(([d, score]) => (
            <div key={d} className="flex items-center gap-3 text-sm">
              <span className="w-12 text-left text-foreground/70 capitalize">{d}</span>
              <div className="flex-1 h-2 bg-white/60 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${(score / total) * 100}%`, background: DOSHA[d]?.color }} />
              </div>
              <span className="w-4 text-right text-foreground/50 text-xs">{score}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-10">

        {/* Voice Profile */}
        <section>
          <h2 className="text-2xl mb-4 text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>Your Voice Profile</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-semibold mb-3" style={{ color: primary.color }}>✓ Strengths</h3>
              <ul className="space-y-2">
                {voiceProfile.strengths.map((s, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-primary mt-0.5">·</span>{s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-red-500 mb-3">⚠ Watch Out For</h3>
              <ul className="space-y-2">
                {voiceProfile.vulnerabilities.map((v, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-red-400 mt-0.5">·</span>{v}
                  </li>
                ))}
              </ul>
              <div className="mt-4 bg-accent/10 rounded-xl p-3 text-xs text-accent">
                🌿 {voiceProfile.seasonalAdvice}
              </div>
            </div>
          </div>
        </section>

        {/* Riyaz Plan */}
        <section>
          <h2 className="text-2xl mb-4 text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>Personalized Riyaz Plan</h2>
          <div className="flex gap-4 mb-4 flex-wrap">
            <div className="bg-card border border-border rounded-xl px-5 py-3 shadow-sm">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Best Time</p>
              <p className="text-lg font-medium text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>{riyazPlan.bestTime}</p>
            </div>
            <div className="bg-card border border-border rounded-xl px-5 py-3 shadow-sm">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Duration</p>
              <p className="text-lg font-medium text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>{riyazPlan.duration}</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            {[
              { label: '🌅 Warmup', items: riyazPlan.warmup },
              { label: '🎵 Core Practice', items: riyazPlan.core },
              { label: '🌙 Cool Down', items: riyazPlan.cooldown },
            ].map(phase => (
              <div key={phase.label} className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-sidebar text-sidebar-foreground px-4 py-2.5 text-sm font-medium">{phase.label}</div>
                {phase.items.map((item, i) => (
                  <div key={i} className="px-4 py-2.5 text-sm text-muted-foreground border-b border-border last:border-0 leading-snug">
                    {item}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="bg-accent/10 rounded-xl px-4 py-3 text-sm text-accent">
            📅 {riyazPlan.weeklyStructure}
          </div>
        </section>

        {/* Ayurveda + Pranayama + Yoga */}
        <section>
          <h2 className="text-2xl mb-4 text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>Ayurveda & Holistic Support</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-foreground mb-3">🥗 Diet</h3>
              <ul className="space-y-2 mb-3">
                {ayurveda.dietTips.map((t, i) => (
                  <li key={i} className="text-xs text-muted-foreground leading-relaxed flex gap-2">
                    <span className="text-primary mt-0.5">·</span>{t}
                  </li>
                ))}
              </ul>
              <div className="border-t border-border pt-3 text-xs text-muted-foreground">
                <strong className="text-foreground">Avoid:</strong> {ayurveda.toAvoid.join(', ')}
              </div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-foreground mb-3">🌬️ Pranayama</h3>
              {pranayama.map((p, i) => (
                <div key={i} className="mb-3 last:mb-0 pb-3 last:pb-0 border-b border-border last:border-0">
                  <p className="text-xs font-medium text-foreground">{p.name} · {p.duration}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{p.benefit}</p>
                </div>
              ))}
            </div>
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-foreground mb-3">🧘 Yoga</h3>
              {yoga.map((y, i) => (
                <div key={i} className="mb-3 last:mb-0 pb-3 last:pb-0 border-b border-border last:border-0">
                  <p className="text-xs font-medium text-foreground">{y.name}</p>
                  <p className="text-xs italic text-muted-foreground">{y.sanskrit}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{y.benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SwarSuraksha */}
        <section className="bg-sidebar rounded-2xl p-8">
          <h2 className="text-2xl text-sidebar-foreground mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
            🌿 SwarSuraksha — Your Herb Kit
          </h2>
          <p className="text-sidebar-foreground/60 mb-6 text-sm">{swarSuraksha.kitName}</p>
          <div className="grid sm:grid-cols-3 gap-4 mb-5">
            {swarSuraksha.herbs.map((h, i) => (
              <div key={i} className="bg-white/8 border border-white/10 rounded-xl p-4">
                <p className="text-sidebar-foreground font-medium text-sm mb-1">{h.name}</p>
                <p className="text-xs text-primary uppercase tracking-wide mb-2">{h.form}</p>
                <p className="text-xs text-sidebar-foreground/60 leading-relaxed">{h.benefit}</p>
              </div>
            ))}
          </div>
          <div className="bg-white/8 border-l-2 border-primary rounded-r-xl p-4 text-sm text-sidebar-foreground/80">
            <strong className="text-sidebar-foreground">Morning Gargle:</strong> {swarSuraksha.morningGargle}
          </div>
        </section>

        {/* Actions */}
        <div className="flex gap-4 justify-center pb-8">
          <button onClick={() => navigate('/quiz')} className="border-2 border-border text-foreground px-6 py-2.5 rounded-xl text-sm hover:border-primary transition-colors">
            Retake Quiz
          </button>
          <button onClick={() => navigate('/dashboard')} className="bg-primary text-white px-6 py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity">
            Go to Dashboard →
          </button>
        </div>
      </div>
    </div>
  )
}
