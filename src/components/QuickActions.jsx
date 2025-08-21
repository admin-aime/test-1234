import React from 'react'
  import { useNavigate } from 'react-router-dom'
  import { Plus, Activity, Brain, TrendingUp } from 'lucide-react'

  const QuickActions = () => {
    const navigate = useNavigate()

    const actions = [
      {
        icon: Plus,
        label: 'Log Data',
        color: 'bg-primary-500',
        onClick: () => navigate('/data')
      },
      {
        icon: Activity,
        label: 'Exercise',
        color: 'bg-green-500',
        onClick: () => alert('Exercise tracking coming soon!')
      },
      {
        icon: Brain,
        label: 'Meditate',
        color: 'bg-purple-500',
        onClick: () => alert('Meditation guide coming soon!')
      },
      {
        icon: TrendingUp,
        label: 'Insights',
        color: 'bg-amber-500',
        onClick: () => navigate('/insights')
      }
    ]

    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-4 gap-3">
          {actions.map((action, index) => {
            const Icon = action.icon
            return (
              <button
                key={index}
                onClick={action.onClick}
                className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className={`w-12 h-12 ${action.color} rounded-full flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs text-gray-700">{action.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  export default QuickActions
