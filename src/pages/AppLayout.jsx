import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { signOutUser } from '../utils/firebase'
import { Home, Music, Leaf, TrendingUp, BookOpen, Users, Menu, X, Mic, LogOut, Sparkles, LayoutDashboard } from 'lucide-react'
import styles from './AppLayout.module.css'

const navItems = [
  { to: '/app/welcome', icon: Mic, label: 'Welcome' },
  { to: '/app/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/app/riyaz', icon: Music, label: 'Riyaz Framework' },
  { to: '/app/herbs', icon: Leaf, label: 'SwarSuraksha' },
  { to: '/app/progress', icon: TrendingUp, label: 'Progress' },
  { to: '/app/library', icon: BookOpen, label: 'Library' },
  { to: '/app/community', icon: Users, label: 'Community' },
]

export default function AppLayout({ user }) {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOutUser()
    navigate('/')
  }

  return (
    <div className={styles.layout}>
      {/* Mobile toggle */}
      <button className={styles.mobileToggle} onClick={() => setOpen(!open)}>
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {open && <div className={styles.overlay} onClick={() => setOpen(false)} />}

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${open ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarLogo}>
          <div className={styles.logoIcon}>
            <Music size={18} color="white" />
          </div>
          <div>
            <div className={styles.logoName}>Swarataa</div>
            <div className={styles.logoSub}>Your Riyaz Companion</div>
          </div>
        </div>

        <nav className={styles.nav}>
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
              }
            >
              <item.icon size={17} />
              {item.label}
            </NavLink>
          ))}

          <div className={styles.navDivider} />
          <NavLink
            to="/quiz"
            onClick={() => setOpen(false)}
            className={styles.navQuiz}
          >
            <Sparkles size={17} />
            Prakriti Quiz
          </NavLink>
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.streak}>
            <span className={styles.streakLabel}>Practice Streak</span>
            <span className={styles.streakValue}>12 Days 🔥</span>
          </div>
          {user && (
            <div className={styles.user}>
              {user.photoURL && (
                <img src={user.photoURL} className={styles.avatar} alt="" referrerPolicy="no-referrer" />
              )}
              <span className={styles.userName}>{user.displayName?.split(' ')[0]}</span>
              <button className={styles.signOut} onClick={handleSignOut} title="Sign out">
                <LogOut size={14} />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main content */}
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}
