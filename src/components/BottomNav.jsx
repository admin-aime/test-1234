import React from 'react'
  import { useLocation, useNavigate } from 'react-router-dom'
  import { Home, TrendingUp, Plus, User } from 'lucide-react'

  const BottomNav = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const navItems = [
      { path: '/', icon: Home, label: 'Home' },
      { path: '/insights', icon: TrendingUp, label: 'Insights' },
      { path: '/data', icon: Plus, label: 'Track' },
      { path: '/profile', icon: User, label: 'Profile' }
    ]

    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-bottom">
        <div className="flex">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex-1 py-3 flex flex-col items-center gap-1 transition-colors ${
                  isActive ? 'text-primary-600' : 'text-gray-400'
                }`}
              >
                <Icon className={`w-5 h-5 ${item.path === '/data' && isActive ? 'fill-current' : ''}`} />
                <span className="text-xs">{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  export default BottomNav
