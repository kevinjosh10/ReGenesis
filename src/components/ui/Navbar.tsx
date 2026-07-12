import { Link, useLocation } from "react-router-dom"
import { Leaf, Sun, Moon } from "lucide-react"
import { useTheme } from "../ThemeProvider"

interface NavbarProps {
  actions?: React.ReactNode
}

export function Navbar({ actions }: NavbarProps) {
  const { theme, setTheme } = useTheme()
  const location = useLocation()
  const currentPath = location.pathname

  const NavLink = ({ to, label }: { to: string, label: string }) => {
    const isActive = currentPath === to || (to !== '/' && currentPath.startsWith(to))
    
    if (isActive) {
      return (
        <div className="px-3 py-1 text-sm font-medium bg-background rounded shadow-sm">
          {label}
        </div>
      )
    }
    
    return (
      <Link 
        to={to} 
        className="px-3 py-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
      >
        {label}
      </Link>
    )
  }

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10 sticky top-0">
      <div className="container relative mx-auto px-6 h-14 flex items-center justify-between">
        
        {/* Left Side */}
        <div className="flex flex-1 items-center justify-start">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center transition-transform group-hover:scale-105">
              <Leaf className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold tracking-tight hidden sm:block">ReGenesis</span>
          </Link>
        </div>

        {/* Center Nav Links - Absolutely positioned for flawless centering */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center shrink-0">
          <div className="hidden md:flex items-center gap-1 border rounded-md p-1 bg-muted/50 shadow-sm">
            <NavLink to="/dashboard" label="Inventory" />
            <NavLink to="/opportunities" label="Engine" />
            <NavLink to="/composer" label="Composer" />
            <NavLink to="/studio" label="Studio" />
            <NavLink to="/intelligence" label="Insights" />
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex flex-1 items-center justify-end gap-4">
          <div className="hidden sm:flex">{actions}</div>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Toggle theme"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-muted-foreground" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-muted-foreground" />
          </button>
        </div>
      </div>
    </nav>
  )
}
