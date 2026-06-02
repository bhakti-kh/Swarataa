import { useNavigate } from 'react-router-dom'
import { signOutUser } from '../utils/firebase'
import { Mic, Music, Leaf, BarChart2, Sparkles } from 'lucide-react'

const FEATURES = [
  { icon: '🎵', title: 'Personalized Riyaz Plan', desc: 'AI-generated daily practice schedule based on your prakriti, experience level, and Swar Samay timing.' },
  { icon: '🌿', title: 'SwarSuraksha Herb Kit', desc: 'Curated Ayurvedic herb recommendations matched to your dosha and specific vocal needs.' },
  { icon: '🧘', title: 'Yoga & Pranayama', desc: 'Targeted breathwork, yogasana, and chakradhyan practices to support your voice and wellbeing.' },
  { icon: '📊', title: 'Vocal Insights', desc: 'Understand your voice type, seasonal vulnerabilities, and how to protect your vocal health daily.' },
]

export default function Landing({ user }) {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Nav */}
      <nav className="bg-white border-b border-border px-8 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-sidebar rounded-xl flex items-center justify-center">
            <Mic size={20} className="text-white" />
          </div>
          <span className="text-xl font-medium text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>Swarataa</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/riyaz')} className="text-sm text-muted-foreground hover:text-foreground transition-colors px-4 py-2">
            Riyaz Framework
          </button>
          {user ? (
            <div className="flex items-center gap-3">
              <button onClick={() => navigate('/dashboard')} className="bg-primary text-white px-4 py-2 rounded-xl text-sm hover:opacity-90 transition-opacity">
                Go to Dashboard
              </button>
              {user.photoURL && <img src={user.photoURL} className="w-8 h-8 rounded-full" alt="" referrerPolicy="no-referrer" />}
              <button onClick={() => signOutUser()} className="text-xs text-muted-foreground hover:text-foreground">Sign out</button>
            </div>
          ) : (
            <button onClick={() => navigate('/login')} className="bg-primary text-white px-4 py-2 rounded-xl text-sm hover:opacity-90 transition-opacity">
              Sign in
            </button>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex items-center justify-center px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Sparkles size={14} /> AI-Powered Vocal Health
          </div>
          <h1 className="text-5xl md:text-6xl mb-6 text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
            Harmonize Your Voice,<br />
            <span className="text-primary">Harmonize Your Life</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            A personalized vocal health companion for Hindustani classical singers — blending Ayurveda, pranayama, and modern voice science.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => navigate(user ? '/quiz' : '/login')}
              className="bg-primary text-white px-8 py-3.5 rounded-xl font-medium hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
            >
              Discover Your Prakriti →
            </button>
            <button
              onClick={() => navigate('/riyaz')}
              className="border-2 border-foreground/20 text-foreground px-8 py-3.5 rounded-xl font-medium hover:border-foreground/40 transition-colors"
            >
              Explore Riyaz Framework
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-20 px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl text-center mb-12 text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>What Swarataa Offers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map(f => (
              <div key={f.title} className="bg-secondary rounded-2xl p-6 hover:-translate-y-1 transition-transform">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-base font-medium mb-2 text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-sidebar py-20 px-8 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl text-sidebar-foreground mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Start with Your Prakriti</h2>
          <p className="text-sidebar-foreground/70 mb-8 leading-relaxed">
            Answer 10 research-backed questions. Our AI generates your personalized riyaz plan, Ayurvedic recommendations, and SwarSuraksha herb kit in under 2 minutes.
          </p>
          <button
            onClick={() => navigate(user ? '/quiz' : '/login')}
            className="bg-primary text-white px-8 py-3.5 rounded-xl font-medium hover:opacity-90 transition-opacity"
          >
            Take the Prakriti Quiz
          </button>
        </div>
      </section>

      <footer className="bg-white border-t border-border px-8 py-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-sidebar rounded-lg flex items-center justify-center">
            <Mic size={14} className="text-white" />
          </div>
          <span className="font-medium text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>Swarataa</span>
        </div>
        <p className="text-sm text-muted-foreground">MDes Thesis · IIT Hyderabad · Bhakti Khandekar</p>
      </footer>
    </div>
  )
}
