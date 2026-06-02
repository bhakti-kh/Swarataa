import { TrendingUp, Award, Calendar, Mic } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

const monthlyData = [
  { week: 'Week 1', minutes: 180, sessions: 4 },
  { week: 'Week 2', minutes: 240, sessions: 5 },
  { week: 'Week 3', minutes: 200, sessions: 4 },
  { week: 'Week 4', minutes: 300, sessions: 6 },
]

const pitchData = [
  { date: 'Jun 1', accuracy: 68 },
  { date: 'Jun 5', accuracy: 71 },
  { date: 'Jun 10', accuracy: 73 },
  { date: 'Jun 15', accuracy: 75 },
  { date: 'Jun 20', accuracy: 74 },
  { date: 'Jun 25', accuracy: 78 },
  { date: 'Jun 30', accuracy: 76 },
]

const milestones = [
  { icon: Award, title: '12-Day Streak', desc: 'Consistent daily practice', date: 'Jun 30', color: '#C45C26', achieved: true },
  { icon: Mic, title: 'First Taan', desc: 'Completed first taan exercise', date: 'Jun 20', color: '#1A8A7A', achieved: true },
  { icon: TrendingUp, title: '75% Pitch Accuracy', desc: 'Reached accuracy milestone', date: 'Jun 25', color: '#8B6914', achieved: true },
  { icon: Calendar, title: '30-Day Streak', desc: 'Practice every day for a month', date: 'Upcoming', color: '#2D6B5E', achieved: false },
]

export default function Progress() {
  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-2xl text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>Progress Tracker</h1>
        <p className="text-muted-foreground text-sm mt-1">Your vocal journey over time</p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Sessions', value: '47', color: '#C45C26' },
          { label: 'Hours Practiced', value: '38h', color: '#1A8A7A' },
          { label: 'Current Streak', value: '12 days', color: '#8B6914' },
          { label: 'Avg. Pitch Score', value: '74%', color: '#2D6B5E' },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border rounded-2xl p-4 shadow-sm text-center">
            <p className="text-2xl font-medium" style={{ fontFamily: "'Playfair Display', serif", color: s.color }}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
          <h3 className="text-lg mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Monthly Practice</h3>
          <p className="text-xs text-muted-foreground mb-4">Minutes per week this month</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0E6D8" />
                <XAxis dataKey="week" stroke="#8B7355" fontSize={11} />
                <YAxis stroke="#8B7355" fontSize={11} />
                <Tooltip contentStyle={{ background: '#FFF8F0', border: '1px solid #F0E6D8', borderRadius: '12px' }} />
                <Bar dataKey="minutes" fill="#C45C26" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
          <h3 className="text-lg mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Pitch Accuracy</h3>
          <p className="text-xs text-muted-foreground mb-4">Score trend over June</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={pitchData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0E6D8" />
                <XAxis dataKey="date" stroke="#8B7355" fontSize={11} />
                <YAxis stroke="#8B7355" fontSize={11} domain={[60, 90]} />
                <Tooltip contentStyle={{ background: '#FFF8F0', border: '1px solid #F0E6D8', borderRadius: '12px' }} />
                <Line type="monotone" dataKey="accuracy" stroke="#1A8A7A" strokeWidth={2} dot={{ fill: '#1A8A7A', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Milestones */}
      <div>
        <h2 className="text-xl mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Milestones</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {milestones.map(m => (
            <div key={m.title} className={`bg-card border rounded-2xl p-4 shadow-sm flex items-center gap-4 ${m.achieved ? 'border-border' : 'border-dashed border-muted-foreground/30 opacity-60'}`}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${m.color}18` }}>
                <m.icon size={22} style={{ color: m.color }} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground text-sm">{m.title}</h4>
                <p className="text-xs text-muted-foreground">{m.desc}</p>
                <p className="text-xs mt-1" style={{ color: m.achieved ? m.color : '#8B7355' }}>
                  {m.achieved ? `✓ Achieved ${m.date}` : `🎯 ${m.date}`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
