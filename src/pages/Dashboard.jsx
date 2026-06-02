import { useNavigate } from 'react-router-dom'
import { Play, Wind, Flame, Heart, Clock, TrendingUp, Sun, Music, Sparkles } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const weeklyData = [
  { day: 'Mon', minutes: 35, score: 72 },
  { day: 'Tue', minutes: 45, score: 75 },
  { day: 'Wed', minutes: 50, score: 78 },
  { day: 'Thu', minutes: 30, score: 74 },
  { day: 'Fri', minutes: 60, score: 82 },
  { day: 'Sat', minutes: 55, score: 80 },
  { day: 'Sun', minutes: 40, score: 76 },
]

const recommendations = [
  { icon: Sun, title: 'Morning Raag Bhairav', subtitle: 'Best for early morning practice', time: '15 min', color: '#C45C26' },
  { icon: Wind, title: 'Bhramari Pranayama', subtitle: 'Vocal resonance warm-up', time: '8 min', color: '#1A8A7A' },
  { icon: Music, title: 'Alankar Practice', subtitle: 'Sa Re Ga Ma variations', time: '20 min', color: '#8B6914' },
  { icon: Heart, title: 'Chakradhyan Session', subtitle: 'Sound-based meditation', time: '12 min', color: '#2D6B5E' },
]

export default function Dashboard({ user, plan }) {
  const navigate = useNavigate()
  const firstName = user?.displayName?.split(' ')[0] || 'Singer'
  const now = new Date()
  const hour = now.getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
            {greeting}, {firstName} 🙏
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {plan ? `Your ${plan.prakriti?.primary} prakriti plan is ready` : 'Take the Prakriti quiz to get your personalized plan'}
          </p>
        </div>
        <div className="flex gap-3">
          {!plan && (
            <button
              onClick={() => navigate('/quiz')}
              className="flex items-center gap-2 bg-accent text-white px-5 py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity"
            >
              <Sparkles size={16} /> Take Prakriti Quiz
            </button>
          )}
          <button className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
            <Play size={16} /> Start Riyaz
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Flame, label: 'Practice Streak', value: '12 Days', color: '#C45C26' },
          { icon: Heart, label: 'Vocal Health', value: '82/100', color: '#1A8A7A' },
          { icon: Clock, label: "Today's Practice", value: '45 min', color: '#8B6914' },
          { icon: TrendingUp, label: 'Pitch Accuracy', value: '76%', color: '#2D6B5E' },
        ].map(stat => (
          <div key={stat.label} className="bg-card rounded-2xl p-4 border border-border shadow-sm">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: `${stat.color}18` }}>
              <stat.icon size={20} style={{ color: stat.color }} />
            </div>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
            <p className="text-xl mt-0.5" style={{ fontFamily: "'Playfair Display', serif", color: stat.color }}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Chart + Health Score */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-2xl p-5 border border-border shadow-sm">
          <h3 className="text-lg mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Weekly Practice Overview</h3>
          <p className="text-sm text-muted-foreground mb-4">Minutes practiced & vocal health score</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="gMin" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C45C26" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#C45C26" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1A8A7A" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#1A8A7A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0E6D8" />
                <XAxis dataKey="day" stroke="#8B7355" fontSize={12} />
                <YAxis stroke="#8B7355" fontSize={12} />
                <Tooltip contentStyle={{ background: '#FFF8F0', border: '1px solid #F0E6D8', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="minutes" stroke="#C45C26" strokeWidth={2} fillOpacity={1} fill="url(#gMin)" />
                <Area type="monotone" dataKey="score" stroke="#1A8A7A" strokeWidth={2} fillOpacity={1} fill="url(#gScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-5 border border-border shadow-sm">
          <h3 className="text-lg mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Vocal Health Score</h3>
          <p className="text-sm text-muted-foreground mb-4">Current assessment</p>
          <div className="flex justify-center mb-5">
            <div className="relative w-32 h-32">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#F0E6D8" strokeWidth="8" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="#1A8A7A" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${82 * 2.64} ${264 - 82 * 2.64}`} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl text-accent" style={{ fontFamily: "'Playfair Display', serif" }}>82</span>
                <span className="text-xs text-muted-foreground">/ 100</span>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { label: 'Breath Strength', value: 78, color: '#C45C26' },
              { label: 'Pitch Accuracy', value: 76, color: '#1A8A7A' },
              { label: 'Vocal Endurance', value: 85, color: '#8B6914' },
            ].map(item => (
              <div key={item.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span style={{ color: item.color }}>{item.value}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${item.value}%`, backgroundColor: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Plan Banner (if quiz taken) */}
      {plan && (
        <div className="bg-gradient-to-r from-sidebar to-sidebar/80 rounded-2xl p-6 text-sidebar-foreground">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-wider opacity-60 mb-1">Your Prakriti Plan</p>
              <h3 className="text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                {plan.prakriti?.primary?.charAt(0).toUpperCase() + plan.prakriti?.primary?.slice(1)} Constitution
              </h3>
              <p className="text-sm opacity-70 mt-1 max-w-md">{plan.prakriti?.summary?.slice(0, 100)}...</p>
            </div>
            <button onClick={() => navigate('/results')} className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity whitespace-nowrap">
              View Full Plan →
            </button>
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div>
        <h2 className="text-xl mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Swar Samay Recommendations</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recommendations.map(rec => (
            <div key={rec.title} className="bg-card rounded-2xl p-4 border border-border shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: `${rec.color}18` }}>
                <rec.icon size={22} style={{ color: rec.color }} />
              </div>
              <h4 className="text-sm font-medium text-foreground">{rec.title}</h4>
              <p className="text-xs text-muted-foreground mt-0.5 mb-3">{rec.subtitle}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock size={12} /> {rec.time}</span>
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Play size={14} className="text-primary ml-0.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
