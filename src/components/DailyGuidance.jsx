import React from 'react'
  import { Lightbulb, Star, Hash } from 'lucide-react'

  const DailyGuidance = ({ insights, scores }) => {
    const getMainGuidance = () => {
      const lowestDimension = Object.entries(scores).reduce((min, [key, value]) => 
        value < min.value ? { key, value } : min, 
        { key: 'physical', value: scores.physical }
      )

      const guidanceMap = {
        physical: "Focus on movement today. Even a short walk can boost your physical wellness.",
        emotional: "Take time for emotional self-care. Practice mindfulness or connect with loved ones.",
        spiritual: "Nurture your spiritual side. Spend time in nature or practice gratitude."
      }

      return guidanceMap[lowestDimension.key]
    }

    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-yellow-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Daily Guidance</h2>
        </div>

        <div className="space-y-4">
          {/* Main Guidance */}
          <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <p className="text-sm text-gray-700">{getMainGuidance()}</p>
          </div>

          {/* Cosmic Insights */}
          {insights.astrology && (
            <div className="flex items-start gap-3">
              <Star className="w-5 h-5 text-purple-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Astrological Insight</p>
                <p className="text-xs text-gray-600 mt-1">{insights.astrology.dailyMessage}</p>
              </div>
            </div>
          )}

          {insights.numerology && (
            <div className="flex items-start gap-3">
              <Hash className="w-5 h-5 text-amber-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Numerology Message</p>
                <p className="text-xs text-gray-600 mt-1">{insights.numerology.dailyMessage}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  export default DailyGuidance
