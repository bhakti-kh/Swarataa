import { Flame, Clock, TrendingUp, Wind, Heart, Award } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import styles from './Progress.module.css'

const monthlyData = [
  { month: 'Sep', hours: 18 }, { month: 'Oct', hours: 22 }, { month: 'Nov', hours: 28 },
  { month: 'Dec', hours: 25 }, { month: 'Jan', hours: 32 }, { month: 'Feb', hours: 35 }, { month: 'Mar', hours: 30 },
]
const pitchData = [
  { week: 'W1', score: 58 }, { week: 'W2', score: 62 }, { week: 'W3', score: 64 },
  { week: 'W4', score: 68 }, { week: 'W5', score: 71 }, { week: 'W6', score: 73 },
  { week: 'W7', score: 76 }, { week: 'W8', score: 78 },
]
const wellnessData = [
  { name: 'Yoga', value: 85, color: 'var(--soft-green)' },
  { name: 'Pranayama', value: 72, color: 'var(--saffron)' },
  { name: 'Meditation', value: 60, color: 'var(--gold)' },
  { name: 'Remaining', value: 83, color: 'rgba(26,74,74,0.1)' },
]
const achievements = [
  { title: '7-Day Streak', desc: 'Practiced 7 days in a row', icon: Flame, earned: true },
  { title: 'Pitch Master', desc: 'Reached 75% pitch accuracy', icon: TrendingUp, earned: true },
  { title: 'Breath Warrior', desc: 'Completed all pranayama sessions', icon: Wind, earned: true },
  { title: '30-Day Streak', desc: 'Practice 30 consecutive days', icon: Award, earned: false },
  { title: 'Perfect Pitch', desc: 'Achieve 90% pitch accuracy', icon: TrendingUp, earned: false },
  { title: 'Wellness Complete', desc: 'Complete all wellness modules', icon: Heart, earned: false },
]
const tooltip = { background: 'var(--warm-cream)', border: '1px solid rgba(26,74,74,0.1)', borderRadius: 10, fontFamily: 'Inter', fontSize: 12 }

export default function Progress() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Progress Tracking</h1>
        <p>Your vocal journey at a glance</p>
      </div>
      <div className={styles.stats}>
        {[
          { icon: Flame, label: 'Current Streak', value: '12 Days', color: 'var(--saffron)' },
          { icon: Clock, label: 'Total Practice', value: '190 hrs', color: 'var(--soft-green)' },
          { icon: TrendingUp, label: 'Pitch Growth', value: '+20%', color: 'var(--gold)' },
          { icon: Wind, label: 'Breath Score', value: '82/100', color: 'var(--deep-teal)' },
        ].map(s => (
          <div key={s.label} className="card">
            <div className={styles.statIcon} style={{ background: s.color + '18' }}><s.icon size={18} color={s.color} /></div>
            <p className={styles.statLabel}>{s.label}</p>
            <p className={styles.statValue} style={{ color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>
      <div className={styles.charts}>
        <div className="card">
          <h3 className={styles.cardTitle}>Monthly Practice Hours</h3>
          <p className={styles.cardSub}>Last 7 months</p>
          <div className={styles.chartWrap}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(26,74,74,0.08)" />
                <XAxis dataKey="month" stroke="#8A9A9A" fontSize={11} />
                <YAxis stroke="#8A9A9A" fontSize={11} />
                <Tooltip contentStyle={tooltip} />
                <Bar dataKey="hours" fill="#E8873A" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card">
          <h3 className={styles.cardTitle}>Pitch Accuracy Trend</h3>
          <p className={styles.cardSub}>Weekly improvement</p>
          <div className={styles.chartWrap}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={pitchData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(26,74,74,0.08)" />
                <XAxis dataKey="week" stroke="#8A9A9A" fontSize={11} />
                <YAxis stroke="#8A9A9A" fontSize={11} domain={[50, 100]} />
                <Tooltip contentStyle={tooltip} />
                <Line type="monotone" dataKey="score" stroke="#4A7C6A" strokeWidth={2} dot={{ fill: '#4A7C6A', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className="card">
          <h3 className={styles.cardTitle}>Wellness Completion</h3>
          <p className={styles.cardSub}>This month</p>
          <div className={styles.pieWrap}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart><Pie data={wellnessData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                {wellnessData.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie></PieChart>
            </ResponsiveContainer>
          </div>
          <div className={styles.pieLegend}>
            {wellnessData.slice(0, 3).map(w => (
              <div key={w.name} className={styles.legendItem}>
                <div className={styles.legendDot} style={{ background: w.color }} />
                <span>{w.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h3 className={styles.cardTitle} style={{ marginBottom: 16 }}>Achievements</h3>
          <div className={styles.achievements}>
            {achievements.map(a => (
              <div key={a.title} className={`${styles.achievement} ${a.earned ? styles.earned : styles.locked}`}>
                <div className={`${styles.achieveIcon} ${a.earned ? styles.achieveIconEarned : ''}`}>
                  <a.icon size={16} color={a.earned ? 'var(--soft-green)' : 'var(--text-light)'} />
                </div>
                <div>
                  <p className={styles.achieveTitle}>{a.title}</p>
                  <p className={styles.achieveDesc}>{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
