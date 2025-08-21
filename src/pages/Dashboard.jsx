import React, { useEffect, useState } from 'react'
  import { useStore } from '../store/useStore'
  import { Activity, Brain, Sparkles, TrendingUp, AlertCircle } from 'lucide-react'
  import WellnessScore from '../components/WellnessScore'
  import DailyGuidance from '../components/DailyGuidance'
  import QuickActions from '../components/QuickActions'
  import { calculateWellnessScores } from '../utils/wellnessCalculator'
  import { getAstrologyInsight } from '../utils/astrology'
  import { getNumerologyInsight } from '../utils/numerology'

  const Dashboard = () => {
    const { user, biometricData, moodData } = useStore()
    const [scores, setScores] = useState({ physical: 0, emotional: 0, spiritual: 0 })
    const [insights, setInsights] = useState({})

    useEffect(() => {
      if (user) {
        const calculatedScores = calculateWellnessScores(user, biometricData, moodData)
        setScores(calculatedScores)
        
        const astroInsight = getAstrologyInsight(user.birthDate)
        const numeroInsight = getNumerologyInsight(user.birthDate)
        setInsights({ astrology: astroInsight, numerology: numeroInsight })
      }
    }, [user, biometricData, moodData])

    const getGreeting = () => {
      const hour = new Date().getHours()
      if (hour < 12) return 'Good morning'
      if (hour < 18) return 'Good afternoon'
      return 'Good evening'
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 safe-top">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="px-4 py-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {getGreeting()}, {user?.name}
            </h1>
            <p className="text-gray-600 mt-1">Your wellness journey continues</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 py-6 space-y-6">
          {/* Wellness Scores */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Wellness</h2>
            <WellnessScore scores={scores} />
            
            {/* Overall Status */}
            <div className="mt-4 p-4 bg-gradient-to-r from-primary-50 to-purple-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Overall Health</p>
                  <p className="text-xs text-gray-600">
                    {Math.round((scores.physical + scores.emotional + scores.spiritual) / 3)}% balanced
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Daily Guidance */}
          <DailyGuidance insights={insights} scores={scores} />

          {/* Quick Actions */}
          <QuickActions />

          {/* Today's Focus */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Focus</h2>
            <div className="space-y-3">
              {scores.physical < 70 && (
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <Activity className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Physical Activity</p>
                    <p className="text-xs text-gray-600">Consider a 20-minute walk or light exercise</p>
                  </div>
                </div>
              )}
              
              {scores.emotional < 70 && (
                <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                  <Brain className="w-5 h-5 text-purple-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Emotional Balance</p>
                    <p className="text-xs text-gray-600">Try 5 minutes of meditation or journaling</p>
                  </div>
                </div>
              )}
              
              {scores.spiritual < 70 && (
                <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
                  <Sparkles className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Spiritual Connection</p>
                    <p className="text-xs text-gray-600">Practice gratitude or connect with nature</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Insights Alert */}
          {insights.astrology && (
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 mt-0.5" />
                <div>
                  <p className="font-semibold mb-1">Cosmic Insight</p>
                  <p className="text-sm opacity-90">{insights.astrology.dailyMessage}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  export default Dashboard
