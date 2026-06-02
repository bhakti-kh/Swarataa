import { Users, MessageCircle, Heart, Music } from 'lucide-react'

const POSTS = [
  { name: 'Anjali Deshpande', time: '2 hours ago', avatar: 'AD', dosha: 'Vata', text: 'Just completed my first full Raag Yaman session without breaks! The Bhramari pranayama warmup really helped my breath support. Grateful for this community 🎵', likes: 24, comments: 6, color: '#7B5EA7' },
  { name: 'Rajesh Kumar', time: '5 hours ago', avatar: 'RK', dosha: 'Pitta', text: 'Pro tip for Pitta singers — avoid practicing in peak afternoon heat (12–3pm). Evening sessions with Yaman or Bhimpalasi feel so much better. The Swar Samay framework is real!', likes: 41, comments: 12, color: '#C45C26' },
  { name: 'Meera Sharma', time: '1 day ago', avatar: 'MS', dosha: 'Kapha', text: 'The SwarSuraksha herb kit suggestion for Kapha — Pippali with honey before practice — has genuinely cleared the morning heaviness in my voice. Try it!', likes: 37, comments: 9, color: '#1A8A7A' },
  { name: 'Priya Nair', time: '2 days ago', avatar: 'PN', dosha: 'Vata-Pitta', text: 'Mixed constitution here — Vata-Pitta. The personalized plan suggestion to avoid Vata-aggravating cold foods in winter and Pitta-aggravating spicy food in summer has made a noticeable difference in vocal consistency.', likes: 29, comments: 7, color: '#8B6914' },
]

const GROUPS = [
  { name: 'Beginners Circle', members: 128, desc: 'New to Hindustani classical? Share your journey here', color: '#1A8A7A' },
  { name: 'Intermediate Sangat', members: 84, desc: 'Khyal, taan, and raga exploration', color: '#C45C26' },
  { name: 'Ayurveda & Voice', members: 56, desc: 'Deep dive into traditional vocal health practices', color: '#8B6914' },
  { name: 'Vata Singers', members: 43, desc: 'Tips and support for Vata-dominant voices', color: '#7B5EA7' },
]

export default function Community() {
  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>Community</h1>
          <p className="text-muted-foreground text-sm mt-1">Connect with fellow Hindustani classical singers</p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-xl text-sm hover:opacity-90">+ Share Post</button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Feed */}
        <div className="lg:col-span-2 space-y-4">
          {POSTS.map(post => (
            <div key={post.name} className="bg-card border border-border rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium" style={{ backgroundColor: post.color }}>
                  {post.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-foreground">{post.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: `${post.color}18`, color: post.color }}>{post.dosha}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{post.time}</span>
                </div>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed mb-4">{post.text}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
                  <Heart size={14} /> {post.likes}
                </button>
                <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
                  <MessageCircle size={14} /> {post.comments}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Groups sidebar */}
        <div className="space-y-4">
          <h2 className="text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>Groups</h2>
          {GROUPS.map(g => (
            <div key={g.name} className="bg-card border border-border rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${g.color}18` }}>
                  <Users size={16} style={{ color: g.color }} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground">{g.name}</h3>
                  <p className="text-xs text-muted-foreground">{g.members} members</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{g.desc}</p>
            </div>
          ))}

          <div className="bg-secondary rounded-2xl p-4 text-center">
            <Music size={24} className="text-primary mx-auto mb-2" />
            <p className="text-sm font-medium text-foreground mb-1">Practice Together</p>
            <p className="text-xs text-muted-foreground mb-3">Join live riyaz sessions every morning at 6 AM</p>
            <button className="bg-primary text-white text-xs px-4 py-2 rounded-full hover:opacity-90">Join Session</button>
          </div>
        </div>
      </div>
    </div>
  )
}
