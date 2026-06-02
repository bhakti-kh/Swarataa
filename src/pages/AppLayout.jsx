import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { signOutUser } from '../utils/firebase'
import { LayoutDashboard, FileText, Leaf, TrendingUp, BookOpen, Users, Menu, X, Mic, LogOut, Sparkles, PlayCircle } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import styles from './AppLayout.module.css'

const getNavItems = (t) => [
  { to: '/app/dashboard', icon: LayoutDashboard, label: t.dashboard },
  { to: '/app/start', icon: PlayCircle, label: t.startRiyaz, highlight: true },
  { to: '/app/plan', icon: FileText, label: t.myPlan },
  { to: '/app/herbs', icon: Leaf, label: t.swarSuraksha },
  { to: '/app/progress', icon: TrendingUp, label: t.progress },
  { to: '/app/library', icon: BookOpen, label: t.library },
  { to: '/app/community', icon: Users, label: t.community },
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
          {getNavItems(t).map(item => {
            // Lock My Vocal Plan if no plan yet
            const locked = item.to === '/app/plan' && !hasPlan
            return (
              <NavLink
                key={item.to}
                to={locked ? '/quiz' : item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `${styles.navItem} ${isActive && !locked ? styles.navItemActive : ''} ${locked ? styles.navItemLocked : ''} ${item.highlight && !locked ? styles.navItemHighlight : ''}`
                }
                title={locked ? 'Complete the Prakriti quiz to unlock' : item.label}
              >
                <item.icon size={17} />
                <span>{item.label}</span>
                {locked && <span className={styles.lockBadge}>Quiz first</span>}
              </NavLink>
            )
          })}
        </nav>

        {/* Language switcher */}
        <div className={styles.langWrap}>
          {['en', 'hi', 'mr'].map(code => (
            <button key={code} className={`${styles.langBtn} ${lang === code ? styles.langBtnActive : ''}`} onClick={() => changeLang(code)}>
              {code === 'en' ? 'EN' : code === 'hi' ? 'हिं' : 'म'}
            </button>
          ))}
        </div>

        {/* Retake quiz */}
        {hasPlan && (
          <div className={styles.retakeWrap}>
            <button className={styles.retakeBtn} onClick={() => { setOpen(false); navigate('/quiz') }}>
              <Sparkles size={14} /> Retake Prakriti Quiz
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
    </div>
  )
}
