import { useNavigate } from 'react-router-dom'

const LEVELS = [
  {
    level: 'Fresher / Beginner',
    duration: '30–45 min',
    color: '#1A8A7A',
    focus: 'Foundation — Sa, Ma, Pa, basic alankars, breath control',
    phases: [
      { name: '🌅 Warmup', time: '10 min', items: ['Humming on Sa', 'Vowel exercises (Aa, Ee, Oo)', 'Lip trills for breath support'] },
      { name: '🎵 Swara Abhyas', time: '15 min', items: ['Shadja sthapana (finding Sa)', 'Saral alankars: 1–2–3–4–5', 'Practice in lower octave only'] },
      { name: '🎼 Raga Intro', time: '10 min', items: ['Simple raga — Yaman or Bhoopali', 'Aaroha–Avaroha practice', 'Slow alaap'] },
      { name: '🌙 Cool Down', time: '5 min', items: ['Humming on Sa–Pa', 'Deep breathing', 'Complete silence (2 min)'] },
    ],
  },
  {
    level: 'Intermediate',
    duration: '60–90 min',
    color: '#C45C26',
    focus: 'Expression — taans, layakari, expanding raga repertoire',
    phases: [
      { name: '🌅 Warmup', time: '15 min', items: ['Mandodatta exercises', 'Meend practice across octaves', 'Gamak exercises'] },
      { name: '🎵 Alankars', time: '20 min', items: ['Complex alankars (5+ note patterns)', 'Layakari: vilambit, madhya', 'Taan patterns: seedhi, vakra'] },
      { name: '🎼 Raga Practice', time: '40 min', items: ['Deep alaap in chosen raga', 'Vilambit khyal — bandish + badhat', 'Drut khyal with taans'] },
      { name: '🌙 Cool Down', time: '10 min', items: ['Soft bhajan or folk melody', 'Humming cool-down', 'Breath awareness rest'] },
    ],
  },
  {
    level: 'Advanced',
    duration: '90–180 min',
    color: '#7B5EA7',
    focus: 'Mastery — improvisation, layakari, voice stamina',
    phases: [
      { name: '🌅 Warmup', time: '20 min', items: ['Full range swara exercises', 'Murchhana practice', 'Complex gamak and andolan'] },
      { name: '🎵 Deep Practice', time: '60+ min', items: ['Extended alaap with full raga exploration', 'Bandish mastery — multiple ragas', 'Advanced taan constructions'] },
      { name: '🎼 Improvisation', time: '30 min', items: ['Free raga improvisation', 'Sargam patterns across ragas', 'Layakari: tigun, chaugun'] },
      { name: '🌙 Cool Down', time: '15 min', items: ['Slow vilambit alaap', 'Quiet humming', 'Vocal rest with steam if needed'] },
    ],
  },
]

const SWAR_SAMAY = [
  { time: '4–7 AM', ragas: 'Bhairav, Lalit, Todi', dosha: 'Kapha hour', note: 'Voice is heavy and full — best for Kapha singers' },
  { time: '7–10 AM', ragas: 'Bilawal, Alhaiya Bilawal', dosha: 'Transition', note: 'Good for all doshas — moderate energy' },
  { time: '10 AM–1 PM', ragas: 'Sarang, Shuddha Sarang', dosha: 'Pitta hour', note: 'Pitta singers peak — strong projection and clarity' },
  { time: '4–7 PM', ragas: 'Poorvi, Marwa, Shree', dosha: 'Transition', note: 'Vata singers prefer this calm transition window' },
  { time: '7–10 PM', ragas: 'Yaman, Bhimpalasi, Darbari', dosha: 'Evening', note: 'Emotional depth — ideal for khyal practice' },
  { time: '10 PM–1 AM', ragas: 'Darbari Kanada, Malkauns', dosha: 'Night ragas', note: 'Deep, meditative — for advanced singers only' },
]

export default function RiyazFramework() {
  const navigate = useNavigate()

  return (
    <div className="space-y-10 max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>Riyaz Framework</h1>
        <p className="text-muted-foreground text-sm mt-1">A structured approach to Hindustani classical vocal practice — from first lessons to mastery.</p>
      </div>

      {/* Levels */}
      <section>
        <h2 className="text-xl mb-4 text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>Practice by Level</h2>
        <div className="space-y-6">
          {LEVELS.map(level => (
            <div key={level.level} className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm" style={{ borderTop: `3px solid ${level.color}` }}>
              <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2" style={{ background: `${level.color}0d` }}>
                <div>
                  <span className="inline-block text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full text-white mb-2" style={{ background: level.color }}>
                    {level.level}
                  </span>
                  <p className="text-sm text-muted-foreground">{level.focus}</p>
                </div>
                <span className="text-sm text-muted-foreground">⏱ {level.duration}</span>
              </div>
              <div className="grid sm:grid-cols-4 divide-x divide-border">
                {level.phases.map(phase => (
                  <div key={phase.name} className="p-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-semibold text-foreground">{phase.name}</span>
                      <span className="text-xs text-muted-foreground">{phase.time}</span>
                    </div>
                    <ul className="space-y-1.5">
                      {phase.items.map((item, i) => (
                        <li key={i} className="text-xs text-muted-foreground leading-relaxed flex gap-1.5">
                          <span className="text-primary mt-0.5 flex-shrink-0">·</span>{item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Swar Samay */}
      <section className="bg-sidebar rounded-2xl p-8">
        <h2 className="text-2xl text-sidebar-foreground mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Swar Samay — Raga Time Theory</h2>
        <p className="text-sidebar-foreground/60 text-sm mb-6 max-w-lg">Each raga has an ideal time of day for performance, aligned with the body's natural rhythms and the three doshas.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SWAR_SAMAY.map(s => (
            <div key={s.time} className="bg-white/8 border border-white/10 rounded-xl p-4">
              <p className="text-primary font-semibold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{s.time}</p>
              <p className="text-sidebar-foreground text-sm font-medium mb-0.5">{s.ragas}</p>
              <p className="text-xs text-sidebar-foreground/40 uppercase tracking-wide mb-2">{s.dosha}</p>
              <p className="text-xs text-sidebar-foreground/60 leading-relaxed">{s.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="text-center py-4">
        <h3 className="text-lg mb-2 text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>Get Your Personalized Riyaz Time</h3>
        <p className="text-muted-foreground text-sm mb-4">Take the Prakriti quiz to get a schedule matched to your constitution.</p>
        <button onClick={() => navigate('/quiz')} className="bg-primary text-white px-6 py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity">
          Discover My Prakriti →
        </button>
      </div>
    </div>
  )
}
