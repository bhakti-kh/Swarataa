import { Users, MessageCircle, Heart, Music } from 'lucide-react'
import styles from './Community.module.css'

const posts = [
  { user: 'Anjali D.', level: 'Intermediate', time: '2 hours ago', content: 'Finally nailed the meend in Raag Yaman after 3 weeks of practice! The key was slowing down and focusing on breath support. 🎵', likes: 12, comments: 4 },
  { user: 'Rajesh K.', level: 'Advanced', time: '5 hours ago', content: 'Question for the group — how do you manage vocal fatigue during long riyaz sessions? I find Bhramari pranayama helps but curious about other methods.', likes: 8, comments: 7 },
  { user: 'Meera S.', level: 'Beginner', time: '1 day ago', content: 'Just completed my first week of consistent practice! 30 minutes every morning with Saral Alankars. Already noticing improvement in breath control.', likes: 24, comments: 11 },
  { user: 'Priya V.', level: 'Intermediate', time: '2 days ago', content: 'Sharing my herb routine: Yashtimadhu tea 30 min before riyaz + rock salt gargle after. Voice feels noticeably clearer.', likes: 19, comments: 6 },
]

const levelColors = { Beginner: 'var(--soft-green)', Intermediate: 'var(--saffron)', Advanced: 'var(--deep-teal)' }

export default function Community() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Community</h1>
        <p>Connect with fellow Hindustani classical singers</p>
      </div>

      <div className={styles.stats}>
        {[
          { icon: Users, label: 'Active Singers', value: '248' },
          { icon: MessageCircle, label: 'Posts This Week', value: '34' },
          { icon: Music, label: 'Practice Hours Logged', value: '1,240' },
        ].map(s => (
          <div key={s.label} className="card" style={{ textAlign: 'center' }}>
            <s.icon size={22} color="var(--saffron)" style={{ margin: '0 auto 8px' }} />
            <p className={styles.statValue}>{s.value}</p>
            <p className={styles.statLabel}>{s.label}</p>
          </div>
        ))}
      </div>

      <div>
        <h2 className={styles.sectionTitle}>Recent Posts</h2>
        <div className={styles.posts}>
          {posts.map((p, i) => (
            <div key={i} className="card">
              <div className={styles.postHeader}>
                <div className={styles.avatar}>{p.user.charAt(0)}</div>
                <div>
                  <div className={styles.postUser}>
                    {p.user}
                    <span className={styles.level} style={{ color: levelColors[p.level], background: levelColors[p.level] + '15' }}>{p.level}</span>
                  </div>
                  <p className={styles.postTime}>{p.time}</p>
                </div>
              </div>
              <p className={styles.postContent}>{p.content}</p>
              <div className={styles.postActions}>
                <button className={styles.action}><Heart size={14} /> {p.likes}</button>
                <button className={styles.action}><MessageCircle size={14} /> {p.comments}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
