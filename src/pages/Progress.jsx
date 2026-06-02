import { Flame, Clock, TrendingUp, Wind, Heart, Award } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'

const monthlyData = [
  { month: 'Sep', hours: 18, accuracy: 62 },
  { month: 'Oct', hours: 22, accuracy: 66 },
  { month: 'Nov', hours: 28, accuracy: 70 },
  { month: 'Dec', hours: 25, accuracy: 72 },
  { month: 'Jan', hours: 32, accuracy: 74 },
  { month: 'Feb', hours: 35, accuracy: 76 },
  { month: 'Mar', hours: 30, accuracy: 78 },
]

const pitchImprovement = [
  { week: 'W1', score: 58 }, { week: 'W2', score: 62 }, { week: 'W3', score: 64 },
  { week: 'W4', score: 68 }, { week: 'W5', score: 71 }, { week: 'W6', score: 73 },
  { week: 'W7', score: 76 }, { week: 'W8', score: 78 },
]

const wellnessCompletion = [
  { name: 'Yoga', value: 85, color: '#1A8A7A' },
  { name: 'Pranayama', value: 72, color: '#C45C26' },
  { name: 'Meditation', value: 60, color: '#8B6914' },
  { name: 'Remaining', value: 83, color: '#F0E6D8' },
]

const achievements = [
  { title: '7-Day Streak', desc: 'Practiced 7 days in a row', icon: Flame, earned: true },
  { title: 'Pitch Master', desc: 'Reached 75% pitch accuracy', icon: TrendingUp, earned: true },
  { title: 'Breath Warrior', desc: 'Completed all pranayama sessions', icon: Wind, earned: true },
  { title: '30-Day Streak', desc: 'Practice 30 consecutive days', icon: Award, earned: false },
  { title: 'Perfect Pitch', desc: 'Achieve 90% pitch accuracy', icon: TrendingUp, earned: false },
  { title: 'Wellness Complete', desc: 'Complete all wellness modules', icon: Heart, earned: false },
]

const tooltipStyle = { background: '#FFF8F0', border: '1px solid #F0E6D8', borderRadius: '12px' }

export default function Progress() {
  return (
    <div className="space-y-6">
      <div>
        <h1 style={{ fontFamily: "'Playfair Display', serif" }}>Progress Tracking</h1>
        <p className="text-muted-foreground mt-1">Your journey at a glance</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Flame, label: 'Current Streak', value: '12 Days', color: '#C45C26' },
          { icon: Clock, label: 'Total Practice', value: '190 hrs', color: '#1A8A7A' },
          { icon: TrendingUp, label: 'Pitch Growth', value: '+20%', color: '#8B6914' },
          { icon: Wind, label: 'Breath Score', value: '82/100', color: '#2D6B5E' },
        ].map(s => (
          <div key={s.label} className="bg-card rounded-2xl p-4 border border-border shadow-sm">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: `${s.color}15` }}>
              <s.icon size={20} style={{ color: s.color }} />
            </div>
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="text-xl mt-0.5" style={{ fontFamily: "'Playfair Display', serif", color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-2xl p-5 border border-border shadow-sm">
          <h3 style={{ fontFamily: "'Playfair Display', serif" }}>Monthly Practice Hours</h3>
          <p className="text-sm text-muted-foreground mb-4">Last 7 months</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0E6D8" />
                <XAxis dataKey="month" stroke="#8B7355" fontSize={12} />
                <YAxis stroke="#8B7355" fontSize={12} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="hours" fill="#C45C26" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-5 border border-border shadow-sm">
          <h3 style={{ fontFamily: "'Playfair Display', serif" }}>Pitch Accuracy Trend</h3>
          <p className="text-sm text-muted-foreground mb-4">Weekly improvement</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <LineChart data={pitchImprovement}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0E6D8" />
                <XAxis dataKey="week" stroke="#8B7355" fontSize={12} />
                <YAxis stroke="#8B7355" fontSize={12} domain={[50, 100]} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="score" stroke="#1A8A7A" strokeWidth={2} dot={{ fill: '#1A8A7A', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="bg-card rounded-2xl p-5 border border-border shadow-sm">
          <h3 style={{ fontFamily: "'Playfair Display', serif" }}>Wellness Completion</h3>
          <p className="text-sm text-muted-foreground mb-4">This month</p>
          <div className="h-48 flex justify-center">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <PieChart>
                <Pie data={wellnessCompletion} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                  {wellnessCompletion.map(entry => <Cell key={entry.name} fill={entry.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-2">
            {wellnessCompletion.slice(0, 3).map(w => (
              <div key={w.name} className="flex items-center gap-1.5 text-xs">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: w.color }} />
                <span className="text-muted-foreground">{w.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-card rounded-2xl p-5 border border-border shadow-sm">
          <h3 className="mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Achievements</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {achievements.map(a => (
              <div key={a.title} className={`flex items-center gap-3 p-3 rounded-xl ${a.earned ? 'bg-accent/5 border border-accent/20' : 'bg-secondary/50 opacity-60'}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${a.earned ? 'bg-accent/15' : 'bg-muted'}`}>
                  <a.icon size={18} className={a.earned ? 'text-accent' : 'text-muted-foreground'} />
                </div>
                <div>
                  <p className="text-sm">{a.title}</p>
                  <p className="text-xs text-muted-foreground">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
