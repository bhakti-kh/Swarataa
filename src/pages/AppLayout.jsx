import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { signOutUser } from '../utils/firebase'
import { LayoutDashboard, FileText, Leaf, TrendingUp, BookOpen, Users, Menu, X, Mic, LogOut, Sparkles, PlayCircle } from 'lucide-react'
import styles from './AppLayout.module.css'

const navItems = [
  { to: '/app/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/app/start', icon: PlayCircle, label: 'Start Riyaz', highlight: true },
  { to: '/app/plan', icon: FileText, label: 'My Vocal Plan' },
  { to: '/app/herbs', icon: Leaf, label: 'SwarSuraksha' },
  { to: '/app/progress', icon: TrendingUp, label: 'Progress' },
  { to: '/app/library', icon: BookOpen, label: 'Library' },
  { to: '/app/community', icon: Users, label: 'Community' },
]

export default function AppLayout({ user, hasPlan }) {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

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
          {navItems.map(item => {
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
