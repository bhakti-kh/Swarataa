import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Leaf, Droplets, Pill, Ear, Star, Info, CheckCircle, Sparkles } from 'lucide-react'
import { ImageWithFallback } from '../components/ImageWithFallback'

const products = [
  { name: 'Morning Gargle Mix', desc: 'Herbal throat cleansing formula for morning vocal preparation', usage: 'Mix 1 tsp with warm water, gargle for 2 minutes', icon: Droplets, color: '#1A8A7A', rating: 4.8, benefits: ['Clears throat mucus', 'Soothes vocal cords', 'Reduces inflammation'] },
  { name: 'Dosha Balancer', desc: 'Personalized Ayurvedic blend based on your Prakriti', usage: 'Take 2 tablets after meals with warm water', icon: Leaf, color: '#C45C26', rating: 4.9, benefits: ['Balances Vata-Pitta', 'Supports voice clarity', 'Boosts immunity'] },
  { name: 'Vocal Support Dots', desc: 'Chewable herbal lozenges for instant vocal relief', usage: 'Chew 1 dot before practice or performance', icon: Pill, color: '#8B6914', rating: 4.7, benefits: ['Instant soothing', 'Reduces vocal strain', 'Natural ingredients'] },
  { name: 'Ear Training Drops', desc: 'Ayurvedic ear oil for enhanced auditory sensitivity', usage: '2 drops in each ear before sleep', icon: Ear, color: '#2D6B5E', rating: 4.6, benefits: ['Improves hearing clarity', 'Reduces ear fatigue', 'Traditional formula'] },
]

const prakritiQuestions = [
  { q: 'My body frame is generally...', options: ['Thin & light', 'Medium & athletic', 'Broad & sturdy'] },
  { q: 'My skin tends to be...', options: ['Dry & cool', 'Warm & sensitive', 'Oily & smooth'] },
  { q: 'My voice quality is naturally...', options: ['Thin & high', 'Sharp & clear', 'Deep & resonant'] },
]

export default function HerbSupport({ plan }) {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('products')

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 style={{ fontFamily: "'Playfair Display', serif" }}>SwaraSuraksha</h1>
        <p className="text-muted-foreground mt-1">Herbal support for vocal wellness</p>
      </div>

      {/* Banner */}
      <div className="relative rounded-2xl overflow-hidden h-44">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=1080&q=80"
          alt="Ayurvedic herbs"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2D1810]/80 to-transparent flex items-center">
          <div className="p-6 sm:p-8 text-white">
            <p className="text-xs uppercase tracking-wider opacity-80">Ayurvedic Voice Care</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif" }}>Personalized Herbal Kit</h2>
            <p className="text-sm opacity-80 mt-1 max-w-md">Traditional formulations designed specifically for classical singers</p>
          </div>
        </div>
      </div>

      {/* AI plan kit if available */}
      {plan?.swarSuraksha && (
        <div className="bg-sidebar rounded-2xl p-6">
          <p className="text-xs uppercase tracking-wider text-sidebar-foreground/50 mb-1">Your AI-Generated Kit</p>
          <h2 className="text-xl text-sidebar-foreground mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>{plan.swarSuraksha.kitName}</h2>
          <div className="grid sm:grid-cols-3 gap-4 mb-5">
            {plan.swarSuraksha.herbs.map((h, i) => (
              <div key={i} className="bg-white/8 border border-white/10 rounded-xl p-4">
                <p className="text-sidebar-primary font-medium text-sm mb-1">{h.name}</p>
                <p className="text-xs text-sidebar-primary/70 uppercase tracking-wide mb-2">{h.form}</p>
                <p className="text-xs text-sidebar-foreground/60 leading-relaxed">{h.benefit}</p>
              </div>
            ))}
          </div>
          <div className="bg-white/8 border-l-2 border-sidebar-primary rounded-r-xl p-4 text-sm text-sidebar-foreground/80">
            <strong className="text-sidebar-foreground">Morning Gargle:</strong> {plan.swarSuraksha.morningGargle}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2">
        {['products', 'prakriti'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-xl text-sm transition-colors capitalize ${activeTab === tab ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}
          >
            {tab === 'prakriti' ? 'Prakriti Assessment' : 'Products'}
          </button>
        ))}
        {!plan?.swarSuraksha && (
          <button onClick={() => navigate('/quiz')} className="ml-auto flex items-center gap-1.5 text-xs text-accent border border-accent/30 px-3 py-2 rounded-xl hover:bg-accent/5 transition-colors">
            <Sparkles size={12} /> Get AI Kit
          </button>
        )}
      </div>

      {activeTab === 'products' ? (
        <div className="grid sm:grid-cols-2 gap-4">
          {products.map(p => (
            <div key={p.name} className="bg-card rounded-2xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${p.color}15` }}>
                  <p.icon size={24} style={{ color: p.color }} />
                </div>
                <span className="text-xs flex items-center gap-1" style={{ color: '#C45C26' }}>
                  <Star size={12} fill="#C45C26" /> {p.rating}
                </span>
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif" }}>{p.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>
              <div className="mt-3 space-y-1.5">
                {p.benefits.map(b => (
                  <div key={b} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle size={12} style={{ color: p.color }} /> {b}
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-secondary/50 rounded-xl">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1"><Info size={12} /> Usage</div>
                <p className="text-xs">{p.usage}</p>
              </div>
              <button className="w-full mt-4 py-2.5 rounded-xl text-sm text-white transition-opacity hover:opacity-90" style={{ backgroundColor: p.color }}>
                View Details
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-card rounded-2xl p-6 border border-border shadow-sm max-w-2xl">
          <h3 className="mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Prakriti Assessment</h3>
          <p className="text-sm text-muted-foreground mb-6">Discover your Ayurvedic constitution for personalized herb recommendations</p>
          <div className="space-y-6">
            {prakritiQuestions.map((q, i) => (
              <div key={i}>
                <p className="text-sm mb-3">{i + 1}. {q.q}</p>
                <div className="grid grid-cols-3 gap-2">
                  {q.options.map(opt => (
                    <button key={opt} className="p-3 rounded-xl border border-border text-xs text-center hover:border-primary hover:bg-primary/5 transition-colors">{opt}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => navigate('/quiz')} className="mt-6 w-full bg-primary text-primary-foreground py-3 rounded-xl hover:opacity-90 transition-opacity">
            Take Full Prakriti Quiz
          </button>
        </div>
      )}
    </div>
  )
}
