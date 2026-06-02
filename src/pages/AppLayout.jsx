import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { signOutUser } from '../utils/firebase'
import { LayoutDashboard, FileText, Leaf, TrendingUp, BookOpen, Users, Menu, X, Mic, LogOut, Sparkles, PlayCircle, User, MessageSquare } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import styles from './AppLayout.module.css'

const NAV_ITEMS = [
  { to: '/app/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/app/start', icon: PlayCircle, label: 'Start Riyaz', highlight: true },
  { to: '/app/plan', icon: FileText, label: 'My Vocal Plan' },
  { to: '/app/herbs', icon: Leaf, label: 'SwarSuraksha' },
  { to: '/app/progress', icon: TrendingUp, label: 'Progress' },
  { to: '/app/library', icon: BookOpen, label: 'Library' },
  { to: '/app/community', icon: Users, label: 'Community' },
  { to: '/app/profile', icon: User, label: 'Profile' },
]

export default function AppLayout({ user, hasPlan }) {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { lang, changeLang, t } = useLanguage()

  const handleSignOut = async () => {
    await signOutUser()
    navigate('/')
  }

  return (
    <div className={styles.layout}>
      <button className={styles.mobileToggle} onClick={() => setOpen(!open)}>
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {open && <div className={styles.overlay} onClick={() => setOpen(false)} />}

      <aside className={`${styles.sidebar} ${open ? styles.sidebarOpen : ''}`}>
        {/* Logo */}
        <div className={styles.sidebarLogo}>
          <div className={styles.logoIcon}><Mic size={17} color="white" /></div>
          <div>
            <div className={styles.logoName}>Swarataa</div>
            <div className={styles.logoSub}>Vocal Health Platform</div>
          </div>
        </div>

        {/* Nav */}
        <nav className={styles.nav}>
          {NAV_ITEMS.map(item => {
            const locked = item.to === '/app/plan' && !hasPlan
            if (item.comingSoon) {
              return (
                <div key={item.to} className={`${styles.navItem} ${styles.navItemComingSoon}`} title="Coming soon">
                  <item.icon size={17} />
                  <span>{item.label}</span>
                  <span className={styles.comingSoonBadge}>Soon</span>
                </div>
              )
            }
            return (
              <NavLink
                key={item.to}
                to={locked ? '/onboarding' : item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `${styles.navItem} ${isActive && !locked ? styles.navItemActive : ''} ${locked ? styles.navItemLocked : ''} ${item.highlight && !locked ? styles.navItemHighlight : ''}`
                }
                title={locked ? 'Complete the assessment to unlock' : item.label}
              >
                <item.icon size={17} />
                <span>{item.label}</span>
                {locked && <span className={styles.lockBadge}>Assess first</span>}
              </NavLink>
            )
          })}
        </nav>

        {/* Plan language */}
        <div className={styles.langWrap}>
          <span className={styles.langLabel}>Plan language</span>
          <div className={styles.langBtns}>
            {['en', 'hi', 'mr'].map(code => (
              <button key={code} className={`${styles.langBtn} ${lang === code ? styles.langBtnActive : ''}`} onClick={() => changeLang(code)} title={`Generate plan in ${code === 'en' ? 'English' : code === 'hi' ? 'Hindi' : 'Marathi'}`}>
                {code === 'en' ? 'EN' : code === 'hi' ? 'हिं' : 'म'}
              </button>
            ))}
          </div>
        </div>

        {/* Retake assessment */}
        {hasPlan && (
          <div className={styles.retakeWrap}>
            <button className={styles.retakeBtn} onClick={() => { setOpen(false); navigate('/onboarding') }}>
              <Sparkles size={14} /> Retake Assessment
            </button>
          </div>
        )}

        {/* User */}
        <div className={styles.sidebarFooter}>
          {user && (
            <div className={styles.user}>
              {user.photoURL && <img src={user.photoURL} className={styles.avatar} alt="" referrerPolicy="no-referrer" />}
              <div className={styles.userInfo}>
                <span className={styles.userName}>{user.displayName}</span>
                <span className={styles.userEmail}>{user.email}</span>
              </div>
              <button className={styles.signOut} onClick={handleSignOut} title="Sign out">
                <LogOut size={14} />
              </button>
            </div>
          )}
        </div>
      </aside>

      <main className={styles.main}>
        <Outlet />
      </main>

      {/* Chatbot FAB — Coming Soon */}
      <div className={styles.chatFab} title="AI Vocal Coach — Coming Soon">
        <MessageSquare size={18} color="white" />
        <span className={styles.chatFabBadge}>Soon</span>
      </div>
    </div>
  )
}
