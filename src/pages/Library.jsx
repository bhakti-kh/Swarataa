import { useState } from 'react'
import { Play, Clock, Music, Wind, Heart, Sparkles } from 'lucide-react'

const CATEGORIES = ['All', 'Alankars', 'Ragas', 'Pranayama', 'Yogasana', 'Chakradhyan']

const ITEMS = [
  { cat: 'Alankars', title: 'Saral Alankar 1–5', desc: 'Basic ascending-descending patterns in all swaras', time: '10 min', level: 'Beginner', icon: Music, color: '#C45C26' },
  { cat: 'Alankars', title: 'Gamak Alankar', desc: 'Quick oscillation between adjacent notes', time: '15 min', level: 'Intermediate', icon: Music, color: '#C45C26' },
  { cat: 'Ragas', title: 'Raag Yaman', desc: 'Evening raga — Kalyan thaat, teevra Ma, serene mood', time: '30 min', level: 'Beginner', icon: Music, color: '#8B6914' },
  { cat: 'Ragas', title: 'Raag Bhairav', desc: 'Morning raga — komal Re & Dha, devotional mood', time: '30 min', level: 'Beginner', icon: Music, color: '#8B6914' },
  { cat: 'Ragas', title: 'Raag Darbari Kanada', desc: 'Late night raga — deep, meditative, complex', time: '45 min', level: 'Advanced', icon: Music, color: '#8B6914' },
  { cat: 'Pranayama', title: 'Bhramari Pranayama', desc: 'Humming bee breath — resonates vocal cords', time: '8 min', level: 'All levels', icon: Wind, color: '#1A8A7A' },
  { cat: 'Pranayama', title: 'Anulom Vilom', desc: 'Alternate nostril breathing — balances doshas', time: '10 min', level: 'All levels', icon: Wind, color: '#1A8A7A' },
  { cat: 'Pranayama', title: 'Ujjayi Pranayama', desc: 'Ocean breath — strengthens breath support for singing', time: '12 min', level: 'Intermediate', icon: Wind, color: '#1A8A7A' },
  { cat: 'Yogasana', title: 'Matsyasana', desc: 'Fish pose — opens throat and chest for singers', time: '5 min', level: 'All levels', icon: Heart, color: '#2D6B5E' },
  { cat: 'Yogasana', title: 'Sarvangasana', desc: 'Shoulder stand — stimulates thyroid, benefits voice', time: '10 min', level: 'Intermediate', icon: Heart, color: '#2D6B5E' },
  { cat: 'Chakradhyan', title: 'Vishuddha Chakra Dhyan', desc: 'Throat chakra meditation — voice activation', time: '15 min', level: 'All levels', icon: Sparkles, color: '#7B5EA7' },
  { cat: 'Chakradhyan', title: 'Ajna Chakra Dhyan', desc: 'Third eye meditation — focus and musical intuition', time: '15 min', level: 'All levels', icon: Sparkles, color: '#7B5EA7' },
]

const LEVEL_COLORS = { Beginner: '#1A8A7A', Intermediate: '#8B6914', Advanced: '#C45C26', 'All levels': '#2D6B5E' }

export default function Library() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? ITEMS : ITEMS.filter(i => i.cat === active)

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>Practice Library</h1>
        <p className="text-muted-foreground text-sm mt-1">Alankars, ragas, pranayama, yoga and meditation guides</p>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              active === cat ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground hover:text-foreground'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Items */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(item => (
          <div key={item.title} className="bg-card border border-border rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${item.color}18` }}>
                <item.icon size={18} style={{ color: item.color }} />
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: `${LEVEL_COLORS[item.level]}18`, color: LEVEL_COLORS[item.level] }}>
                {item.level}
              </span>
            </div>
            <h3 className="font-medium text-foreground text-sm mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{item.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">{item.desc}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock size={11} /> {item.time}</span>
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Play size={13} className="text-primary ml-0.5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
