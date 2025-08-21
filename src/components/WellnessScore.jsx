import React from 'react'
  import { Activity, Brain, Sparkles } from 'lucide-react'

  const WellnessScore = ({ scores }) => {
    const dimensions = [
      { 
        key: 'physical', 
        label: 'Physical', 
        icon: Activity, 
        color: 'green',
        bgColor: 'bg-green-100',
        textColor: 'text-green-600'
      },
      { 
        key: 'emotional', 
        label: 'Emotional', 
        icon: Brain, 
        color: 'purple',
        bgColor: 'bg-purple-100',
        textColor: 'text-purple-600'
      },
      { 
        key: 'spiritual', 
        label: 'Spiritual', 
        icon: Sparkles, 
        color: 'amber',
        bgColor: 'bg-amber-100',
        textColor: 'text-amber-600'
      }
    ]

    const getScoreLevel = (score) => {
      if (score >= 80) return 'Excellent'
      if (score >= 60) return 'Good'
      if (score >= 40) return 'Fair'
      return 'Needs Attention'
    }

    return (
      <div className="grid grid-cols-3 gap-3">
        {dimensions.map((dim) => {
          const Icon = dim.icon
          const score = scores[dim.key] || 0
          
          return (
            <div key={dim.key} className="text-center">
              <div className={`w-20 h-20 mx-auto ${dim.bgColor} rounded-full flex items-center justify-center mb-2 relative`}>
                <Icon className={`w-8 h-8 ${dim.textColor}`} />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-xs font-bold text-gray-900">{Math.round(score)}</span>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-900">{dim.label}</p>
              <p className="text-xs text-gray-600">{getScoreLevel(score)}</p>
            </div>
          )
        })}
      </div>
    )
  }

  export default WellnessScore
