import { useNavigate } from 'react-router-dom'
import { Leaf, Sparkles } from 'lucide-react'

const DEFAULT_HERBS = [
  { name: 'Yashtimadhu', sanskrit: 'Glycyrrhiza glabra', form: 'Honey mix, morning', benefit: 'Soothes vocal cords, reduces inflammation, enhances voice quality', dosha: 'All doshas', color: '#C45C26' },
  { name: 'Tulsi', sanskrit: 'Ocimum sanctum', form: 'Fresh leaf tea, twice daily', benefit: 'Anti-bacterial, clears respiratory tract, strengthens immunity', dosha: 'Vata & Kapha', color: '#1A8A7A' },
  { name: 'Pippali', sanskrit: 'Piper longum', form: 'Honey + ghee, morning', benefit: 'Clears mucus, improves breath capacity, supports Kapha balance', dosha: 'Vata & Kapha', color: '#8B6914' },
  { name: 'Haritaki', sanskrit: 'Terminalia chebula', form: 'Warm water decoction', benefit: 'Rejuvenates voice, balances all doshas, aids digestion', dosha: 'Tridoshic', color: '#2D6B5E' },
  { name: 'Vibhitaki', sanskrit: 'Terminalia bellirica', form: 'Honey, before singing', benefit: 'Clears throat, reduces hoarseness, tones vocal muscles', dosha: 'Pitta & Kapha', color: '#C45C26' },
  { name: 'Brahmi', sanskrit: 'Bacopa monnieri', form: 'Warm milk, evening', benefit: 'Reduces performance anxiety, improves memory and focus', dosha: 'Pitta', color: '#1A8A7A' },
]

const GARGLE_RECIPES = [
  { name: 'Morning Gargle Mix', ingredients: 'Warm water + rock salt + turmeric + a drop of sesame oil', benefit: 'Clears overnight mucus, reduces inflammation', time: 'Before riyaz' },
  { name: 'Triphala Gargle', ingredients: 'Triphala decoction (cooled) + honey', benefit: 'Tones vocal cords, antiseptic', time: 'Evening' },
  { name: 'Licorice Gargle', ingredients: 'Yashtimadhu decoction + warm water', benefit: 'Soothes strained voice, reduces dryness', time: 'After long practice' },
]

export default function HerbSupport({ plan }) {
  const navigate = useNavigate()
  const herbs = plan?.swarSuraksha?.herbs ? null : DEFAULT_HERBS

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>🌿 SwarSuraksha</h1>
          <p className="text-muted-foreground text-sm mt-1">Ayurvedic herb support for your vocal health</p>
        </div>
        {!plan && (
          <button onClick={() => navigate('/quiz')} className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-xl text-sm hover:opacity-90">
            <Sparkles size={14} /> Get Personalized Kit
          </button>
        )}
      </div>

      {/* Personalized kit from AI */}
      {plan?.swarSuraksha && (
        <div className="bg-sidebar rounded-2xl p-6">
          <p className="text-xs uppercase tracking-wider text-sidebar-foreground/50 mb-1">Your AI-Generated Kit</p>
          <h2 className="text-xl text-sidebar-foreground mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            {plan.swarSuraksha.kitName}
          </h2>
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            {plan.swarSuraksha.herbs.map((h, i) => (
              <div key={i} className="bg-white/8 border border-white/10 rounded-xl p-4">
                <div className="text-sidebar-primary text-sm font-medium mb-1">{h.name}</div>
                <div className="text-xs text-sidebar-primary/70 uppercase tracking-wider mb-2">{h.form}</div>
                <div className="text-xs text-sidebar-foreground/60 leading-relaxed">{h.benefit}</div>
              </div>
            ))}
          </div>
          <div className="bg-white/8 border-l-2 border-sidebar-primary rounded-r-xl p-4">
            <span className="text-sidebar-foreground/70 text-sm"><strong className="text-sidebar-foreground">Morning Gargle:</strong> {plan.swarSuraksha.morningGargle}</span>
          </div>
        </div>
      )}

      {/* General herbs */}
      <div>
        <h2 className="text-xl mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
          {plan?.swarSuraksha ? 'General Herb Reference' : 'Recommended Herbs for Singers'}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DEFAULT_HERBS.map(herb => (
            <div key={herb.name} className="bg-card border border-border rounded-2xl p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-medium text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>{herb.name}</h3>
                  <p className="text-xs italic text-muted-foreground">{herb.sanskrit}</p>
                </div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${herb.color}18` }}>
                  <Leaf size={14} style={{ color: herb.color }} />
                </div>
              </div>
              <div className="inline-block text-xs px-2 py-0.5 rounded-full mb-3" style={{ backgroundColor: `${herb.color}18`, color: herb.color }}>
                {herb.dosha}
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mb-2">{herb.benefit}</p>
              <div className="text-xs font-medium text-foreground/60 border-t border-border pt-2 mt-2">
                📋 {herb.form}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gargle recipes */}
      <div>
        <h2 className="text-xl mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Gargle Recipes</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {GARGLE_RECIPES.map(g => (
            <div key={g.name} className="bg-secondary rounded-2xl p-5">
              <h3 className="font-medium text-foreground mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{g.name}</h3>
              <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{g.ingredients}</p>
              <p className="text-xs text-accent font-medium">{g.benefit}</p>
              <p className="text-xs text-muted-foreground mt-1">⏰ {g.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
