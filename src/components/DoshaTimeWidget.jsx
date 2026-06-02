import { useState, useEffect } from 'react'
import { Sun, Moon, Sunrise, Sunset, Wind, Flame, Droplets, AlertCircle, CheckCircle2, Clock, Sparkles } from 'lucide-react'

const userPrakriti = { primary: 'vata', secondary: 'pitta', scores: { vata: 68, pitta: 55, kapha: 32 }, label: 'Vata-Pitta' }

const doshaConfig = {
  vata: { color: '#6B5CE7', bg: '#6B5CE715', icon: Wind },
  pitta: { color: '#C45C26', bg: '#C45C2615', icon: Flame },
  kapha: { color: '#1A8A7A', bg: '#1A8A7A15', icon: Droplets },
}

function getDoshaPeriod(hour) {
  if (hour >= 2 && hour < 6) return { dosha: 'vata', label: 'Vata Kaal', timeRange: '2:00 AM – 6:00 AM', icon: Wind, periodIcon: Moon, color: '#6B5CE7', bgGradient: 'from-[#2D1B4E] to-[#1A1035]', element: 'Vayu (Air) + Akasha (Ether)', qualities: ['Light', 'Subtle', 'Creative'], vocalAdvice: 'Ideal for silent meditation & mental rehearsal of raag structures. Voice is resting — avoid heavy singing.', practiceType: 'Dhyana & Swar Chintan' }
  if (hour >= 6 && hour < 10) return { dosha: 'kapha', label: 'Kapha Kaal', timeRange: '6:00 AM – 10:00 AM', icon: Droplets, periodIcon: Sunrise, color: '#1A8A7A', bgGradient: 'from-[#0F3D35] to-[#1A5C4E]', element: 'Prithvi (Earth) + Jala (Water)', qualities: ['Steady', 'Grounded', 'Stable'], vocalAdvice: 'Perfect for deep alaap & slow-paced raags like Bhairav, Todi. Kapha stability supports sustained notes.', practiceType: 'Alaap & Vilambit Khayal' }
  if (hour >= 10 && hour < 14) return { dosha: 'pitta', label: 'Pitta Kaal', timeRange: '10:00 AM – 2:00 PM', icon: Flame, periodIcon: Sun, color: '#C45C26', bgGradient: 'from-[#4A2510] to-[#6B3A1A]', element: 'Agni (Fire) + Jala (Water)', qualities: ['Intense', 'Focused', 'Sharp'], vocalAdvice: 'Peak energy for fast taans, layakari & challenging alankars. Pitta fuels precision and power.', practiceType: 'Taan & Drut Khayal' }
  if (hour >= 14 && hour < 18) return { dosha: 'vata', label: 'Vata Kaal', timeRange: '2:00 PM – 6:00 PM', icon: Wind, periodIcon: Sunset, color: '#6B5CE7', bgGradient: 'from-[#2D1B4E] to-[#3D2A5E]', element: 'Vayu (Air) + Akasha (Ether)', qualities: ['Creative', 'Expressive', 'Mobile'], vocalAdvice: 'Great for creative exploration — improvisation, bandish variations, and expressive meend practice.', practiceType: 'Improvisation & Meend' }
  if (hour >= 18 && hour < 22) return { dosha: 'kapha', label: 'Kapha Kaal', timeRange: '6:00 PM – 10:00 PM', icon: Droplets, periodIcon: Sunset, color: '#1A8A7A', bgGradient: 'from-[#0F3D35] to-[#0A2B25]', element: 'Prithvi (Earth) + Jala (Water)', qualities: ['Calm', 'Deep', 'Resonant'], vocalAdvice: 'Evening raags like Yaman, Bihag shine here. Kapha depth enriches resonance and emotional expression.', practiceType: 'Sandhya Raag & Bhajan' }
  return { dosha: 'pitta', label: 'Pitta Kaal', timeRange: '10:00 PM – 2:00 AM', icon: Flame, periodIcon: Moon, color: '#C45C26', bgGradient: 'from-[#4A2510] to-[#2D1810]', element: 'Agni (Fire) + Jala (Water)', qualities: ['Introspective', 'Transformative', 'Digesting'], vocalAdvice: 'Time for vocal rest & listening. Let your body assimilate the day\'s practice. Light humming only.', practiceType: 'Shravan & Vocal Rest' }
}

function getCorrelation(activeDosha, prakriti) {
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1)
  if (activeDosha === prakriti.primary) return {
    harmony: 'high',
    message: `Your dominant ${cap(prakriti.primary)} prakriti is amplified now. Practice with awareness to avoid ${prakriti.primary === 'vata' ? 'strain from overexertion' : prakriti.primary === 'pitta' ? 'vocal heat & pushing' : 'lethargy & heaviness'}.`,
    tips: prakriti.primary === 'vata' ? ['Warm water with honey before singing', 'Ground with slow alaap first', 'Avoid cold/dry environments'] : prakriti.primary === 'pitta' ? ['Cool water between sessions', 'Take breaks every 20 min', 'Practice in cool, ventilated space'] : ['Start with energizing pranayama', 'Include faster alankars', 'Stay upright while practicing'],
  }
  if (activeDosha === prakriti.secondary) return {
    harmony: 'moderate',
    message: `Your secondary ${cap(prakriti.secondary)} is active. Good conditions for nuanced practice.`,
    tips: prakriti.secondary === 'vata' ? ['Channel creative energy into improvisation', 'Keep sessions structured', 'Warm herbal tea recommended'] : prakriti.secondary === 'pitta' ? ['Use this focused energy for technique', 'Practice challenging passages', 'Stay hydrated'] : ['Use grounding energy for sustained notes', 'Explore lower octave raags', 'Gentle warm-up first'],
  }
  return {
    harmony: 'balancing',
    message: `${cap(activeDosha)} kaal naturally balances your ${prakriti.label} constitution. Excellent time for complementary practices.`,
    tips: activeDosha === 'kapha' ? ['Harness stability for long alaap', 'Practice breath retention exercises', 'Deep resonance work'] : activeDosha === 'pitta' ? ['Use fire energy for precision work', 'Taan practice will be effective', 'Stay cool and hydrated'] : ['Embrace lightness for creativity', 'Explore new raag combinations', 'Gentle vocal warm-ups first'],
  }
}

function getTimeProgress(hour, minute) {
  const totalMinutes = hour * 60 + minute
  const blocks = [2, 6, 10, 14, 18, 22, 26]
  for (let i = 0; i < blocks.length - 1; i++) {
    const start = blocks[i] * 60, end = blocks[i + 1] * 60
    if (totalMinutes >= start && totalMinutes < end) return ((totalMinutes - start) / (end - start)) * 100
  }
  if (totalMinutes >= 22 * 60) return ((totalMinutes - 22 * 60) / (4 * 60)) * 100
  if (totalMinutes < 2 * 60) return ((totalMinutes + 2 * 60) / (4 * 60)) * 100
  return 0
}

export function DoshaTimeWidget({ plan }) {
  const [now, setNow] = useState(new Date())
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 60000); return () => clearInterval(t) }, [])

  const hour = now.getHours(), minute = now.getMinutes()
  const period = getDoshaPeriod(hour)

  const prakriti = plan?.prakriti ? {
    primary: plan.prakriti.primary,
    secondary: plan.prakriti.secondary !== 'none' ? plan.prakriti.secondary : 'kapha',
    scores: plan.prakriti.scores,
    label: `${plan.prakriti.primary.charAt(0).toUpperCase() + plan.prakriti.primary.slice(1)}${plan.prakriti.secondary !== 'none' ? '-' + plan.prakriti.secondary.charAt(0).toUpperCase() + plan.prakriti.secondary.slice(1) : ''}`,
  } : userPrakriti

  const correlation = getCorrelation(period.dosha, prakriti)
  const progress = getTimeProgress(hour, minute)
  const harmonyColors = {
    high: { bg: '#C45C2620', border: '#C45C2640', text: '#C45C26', label: 'High Resonance' },
    moderate: { bg: '#8B691420', border: '#8B691440', text: '#8B6914', label: 'Balanced Flow' },
    balancing: { bg: '#1A8A7A20', border: '#1A8A7A40', text: '#1A8A7A', label: 'Harmonizing' },
  }
  const hs = harmonyColors[correlation.harmony]
  const PeriodIcon = period.periodIcon

  return (
    <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
      <div className={`bg-gradient-to-r ${period.bgGradient} p-5 relative overflow-hidden`}>
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-10" style={{ backgroundColor: period.color }} />
        <div className="flex items-start justify-between relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <PeriodIcon size={14} className="text-white/60" />
              <p className="text-xs text-white/60 uppercase tracking-wider">Dosha Kaal — Live</p>
            </div>
            <h3 className="text-white text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>{period.label}</h3>
            <p className="text-white/50 text-xs mt-0.5">{period.element}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1.5 text-white/80">
              <Clock size={13} />
              <span className="text-sm">{now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}</span>
            </div>
            <p className="text-white/40 text-xs mt-0.5">{period.timeRange}</p>
          </div>
        </div>
        <div className="mt-4 relative z-10">
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, backgroundColor: period.color }} />
          </div>
        </div>
        <div className="flex gap-2 mt-3 relative z-10">
          {period.qualities.map(q => (
            <span key={q} className="text-[10px] px-2.5 py-1 rounded-full border" style={{ color: period.color, borderColor: `${period.color}40`, backgroundColor: `${period.color}15` }}>{q}</span>
          ))}
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Prakriti Correlation</span>
            </div>
            <span className="text-[10px] px-2.5 py-1 rounded-full" style={{ color: hs.text, backgroundColor: hs.bg, border: `1px solid ${hs.border}` }}>{hs.label}</span>
          </div>
          <div className="space-y-2.5 mb-3">
            {['vata', 'pitta', 'kapha'].map(d => {
              const cfg = doshaConfig[d]
              const score = prakriti.scores[d] || 0
              const isActive = d === period.dosha
              const Icon = cfg.icon
              return (
                <div key={d}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <Icon size={12} style={{ color: cfg.color }} />
                      <span className="text-xs capitalize">{d}{d === prakriti.primary && <span className="text-[10px] text-muted-foreground ml-1">(dominant)</span>}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs" style={{ color: cfg.color }}>{score}%</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: cfg.color }} />}
                    </div>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${score}%`, backgroundColor: cfg.color, opacity: isActive ? 1 : 0.5 }} />
                  </div>
                </div>
              )
            })}
          </div>
          <div className="rounded-xl p-3 text-xs" style={{ backgroundColor: hs.bg, border: `1px solid ${hs.border}` }}>
            <div className="flex gap-2">
              {correlation.harmony === 'high' ? <AlertCircle size={14} className="flex-shrink-0 mt-0.5" style={{ color: hs.text }} /> : <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" style={{ color: hs.text }} />}
              <p className="text-muted-foreground">{correlation.message}</p>
            </div>
          </div>
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Recommended Now: {period.practiceType}</p>
          <p className="text-sm text-muted-foreground/80">{period.vocalAdvice}</p>
        </div>
        <div className="border-t border-border pt-3">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Tips for {prakriti.label} Prakriti</p>
          <div className="space-y-1.5">
            {correlation.tips.map((tip, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: period.color }} />
                <span className="text-xs text-muted-foreground">{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
