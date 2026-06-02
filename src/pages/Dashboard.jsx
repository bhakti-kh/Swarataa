import { useNavigate } from 'react-router-dom'
import { Play, Flame, Heart, Clock, TrendingUp, Sun, Music, Wind, Sparkles } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { DoshaTimeWidget } from '../components/DoshaTimeWidget'
import AICheckIn from '../components/AICheckIn'
import styles from './Dashboard.module.css'

const weeklyData = [
  { day: 'Mon', minutes: 35, score: 72 }, { day: 'Tue', minutes: 45, score: 75 },
  { day: 'Wed', minutes: 50, score: 78 }, { day: 'Thu', minutes: 30, score: 74 },
  { day: 'Fri', minutes: 60, score: 82 }, { day: 'Sat', minutes: 55, score: 80 },
  { day: 'Sun', minutes: 40, score: 76 },
]

const recommendations = [
  { icon: Sun, title: 'Morning Raag Bhairav', subtitle: 'Best for early morning practice', time: '15 min', color: 'var(--saffron)' },
  { icon: Wind, title: 'Bhramari Pranayama', subtitle: 'Vocal resonance warm-up', time: '8 min', color: 'var(--soft-green)' },
  { icon: Music, title: 'Alankar Practice', subtitle: 'Sa Re Ga Ma variations', time: '20 min', color: 'var(--gold)' },
  { icon: Heart, title: 'Chakradhyan Session', subtitle: 'Sound-based meditation', time: '12 min', color: 'var(--deep-teal)' },
]

const tooltipStyle = { background: 'var(--warm-cream)', border: '1px solid rgba(26,74,74,0.1)', borderRadius: '12px', fontFamily: 'Inter, sans-serif', fontSize: 12 }

export default function Dashboard({ user, plan }) {
  const navigate = useNavigate()
  const firstName = user?.displayName?.split(' ')[0] || 'Singer'
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.greeting}>{greeting}, {firstName} 🙏</h1>
          <p className={styles.greetingSub}>
            {plan ? `Your ${plan.prakriti?.primary} prakriti plan is ready` : 'Take the Prakriti quiz to get your personalized plan'}
          </p>
        </div>
        <div className={styles.headerActions}>
          {!plan && (
            <button className="btn-secondary" onClick={() => navigate('/quiz')}>
              <Sparkles size={14} /> Take Prakriti Quiz
            </button>
          )}
          <button className="btn-primary">
            <Play size={14} /> Start Riyaz
          </button>
        </div>
      </div>

      {/* AI Check-In */}
      <AICheckIn plan={plan} />

      {/* Stats */}
      <div className={styles.statsGrid}>
        {[
          { icon: Flame, label: 'Practice Streak', value: '12 Days', color: 'var(--saffron)' },
          { icon: Heart, label: 'Vocal Health', value: '82/100', color: 'var(--soft-green)' },
          { icon: Clock, label: "Today's Practice", value: '45 min', color: 'var(--gold)' },
          { icon: TrendingUp, label: 'Pitch Accuracy', value: '76%', color: 'var(--deep-teal)' },
        ].map(stat => (
          <div key={stat.label} className="card">
            <div className={styles.statIcon} style={{ background: stat.color + '18' }}>
              <stat.icon size={18} color={stat.color} />
            </div>
            <p className={styles.statLabel}>{stat.label}</p>
            <p className={styles.statValue} style={{ color: stat.color }}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Chart + Health Score */}
      <div className={styles.chartGrid}>
        <div className="card">
          <h3 className={styles.cardTitle}>Weekly Practice Overview</h3>
          <p className={styles.cardSub}>Minutes practiced & vocal health score</p>
          <div className={styles.chartWrap}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="gMin" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E8873A" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#E8873A" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4A7C6A" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#4A7C6A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(26,74,74,0.08)" />
                <XAxis dataKey="day" stroke="#8A9A9A" fontSize={11} />
                <YAxis stroke="#8A9A9A" fontSize={11} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="minutes" stroke="#E8873A" strokeWidth={2} fillOpacity={1} fill="url(#gMin)" />
                <Area type="monotone" dataKey="score" stroke="#4A7C6A" strokeWidth={2} fillOpacity={1} fill="url(#gScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 className={styles.cardTitle}>Vocal Health Score</h3>
          <p className={styles.cardSub}>Current assessment</p>
          <div className={styles.scoreCircleWrap}>
            <svg viewBox="0 0 100 100" className={styles.scoreCircle}>
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(26,74,74,0.1)" strokeWidth="8" />
              <circle cx="50" cy="50" r="42" fill="none" stroke="var(--soft-green)" strokeWidth="8" strokeLinecap="round"
                strokeDasharray={`${82 * 2.64} ${264 - 82 * 2.64}`} />
            </svg>
            <div className={styles.scoreInner}>
              <span className={styles.scoreNum}>82</span>
              <span className={styles.scoreDenom}>/ 100</span>
            </div>
          </div>
          <div className={styles.scoreBars}>
            {[
              { label: 'Breath Strength', value: 78, color: 'var(--saffron)' },
              { label: 'Pitch Accuracy', value: 76, color: 'var(--soft-green)' },
              { label: 'Vocal Endurance', value: 85, color: 'var(--gold)' },
            ].map(item => (
              <div key={item.label} className={styles.scoreBar}>
                <div className={styles.scoreBarRow}>
                  <span>{item.label}</span>
                  <span style={{ color: item.color }}>{item.value}%</span>
                </div>
                <div className={styles.scoreBarTrack}>
                  <div className={styles.scoreBarFill} style={{ width: `${item.value}%`, background: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dosha Time Widget */}
      <DoshaTimeWidget plan={plan} />

      {/* AI Plan Banner */}
      {plan && (
        <div className={styles.planBanner}>
          <div>
            <p className={styles.planBannerLabel}>Your Prakriti Plan</p>
            <h3 className={styles.planBannerTitle}>
              {plan.prakriti?.primary?.charAt(0).toUpperCase() + plan.prakriti?.primary?.slice(1)} Constitution
            </h3>
            <p className={styles.planBannerSub}>{plan.prakriti?.summary?.slice(0, 100)}...</p>
          </div>
          <button className="btn-primary" onClick={() => navigate('/results')}>View Full Plan →</button>
        </div>
      )}

      {/* Recommendations */}
      <div>
        <h2 className={styles.sectionTitle}>Swar Samay Recommendations</h2>
        <div className={styles.recsGrid}>
          {recommendations.map(rec => (
            <div key={rec.title} className={`card ${styles.recCard}`}>
              <div className={styles.recIcon} style={{ background: rec.color + '15' }}>
                <rec.icon size={20} color={rec.color} />
              </div>
              <h4 className={styles.recTitle}>{rec.title}</h4>
              <p className={styles.recSub}>{rec.subtitle}</p>
              <div className={styles.recRow}>
                <span className={styles.recTime}><Clock size={11} /> {rec.time}</span>
                <div className={styles.playBtn} style={{ background: rec.color + '15' }}>
                  <Play size={12} color={rec.color} style={{ marginLeft: 1 }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
