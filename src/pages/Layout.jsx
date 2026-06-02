import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { signOutUser } from '../utils/firebase'
import { Home, Music, Leaf, TrendingUp, BookOpen, Users, Menu, X, Mic, LogOut, Sparkles, Activity } from 'lucide-react'

const navItems = [
  { to: '/welcome', icon: Mic, label: 'Welcome' },
  { to: '/dashboard', icon: Home, label: 'Dashboard' },
  { to: '/riyaz', icon: Music, label: 'Riyaz Framework' },
  { to: '/herbs', icon: Leaf, label: 'SwaraSuraksha' },
  { to: '/progress', icon: TrendingUp, label: 'Progress' },
  { to: '/library', icon: BookOpen, label: 'Library' },
  { to: '/community', icon: Users, label: 'Community' },
]

export default function Layout({ user }) {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const handleSignOut = async () => { await signOutUser(); navigate('/') }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile toggle */}
      <button onClick={() => setOpen(!open)} className="fixed top-4 left-4 z-50 lg:hidden bg-sidebar text-sidebar-foreground p-2 rounded-lg">
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {open && <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-sidebar text-sidebar-foreground z-40 flex flex-col transition-transform duration-300 lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C45C26] to-[#D4956B] flex items-center justify-center">
              <Music size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg text-sidebar-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>Swarataa</h1>
              <p className="text-xs text-sidebar-foreground/60">Your Riyaz Companion</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {navItems.map(item => (
            <NavLink key={item.to} to={item.to} onClick={() => setOpen(false)}
              className={({ isActive }) => `flex items-center gap-3 px-6 py-2.5 text-sm transition-colors ${isActive ? 'bg-sidebar-accent text-sidebar-primary border-r-2 border-sidebar-primary' : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50'}`}
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}

          <div className="mt-4 mx-4 border-t border-sidebar-border pt-4">
            <NavLink to="/quiz" onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-2 py-2.5 text-sm text-sidebar-primary hover:text-sidebar-primary/80 transition-colors"
            >
              <Sparkles size={18} />
              Prakriti Quiz
            </NavLink>
          </div>
        </nav>

        {/* Streak + user */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="bg-sidebar-accent rounded-lg p-3 text-center mb-3">
            <p className="text-xs text-sidebar-foreground/70 mb-1">Practice Streak</p>
            <p className="text-2xl text-sidebar-primary" style={{ fontFamily: "'Playfair Display', serif" }}>12 Days</p>
          </div>
          {user && (
            <div className="flex items-center gap-2 mb-2">
              {user.photoURL && <img src={user.photoURL} className="w-7 h-7 rounded-full" alt="" referrerPolicy="no-referrer" />}
              <span className="text-xs text-sidebar-foreground truncate flex-1">{user.displayName}</span>
            </div>
          )}
          <button onClick={handleSignOut} className="flex items-center gap-2 text-xs text-sidebar-foreground/50 hover:text-sidebar-foreground/80 transition-colors">
            <LogOut size={14} /> Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 lg:ml-64 min-h-screen">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
