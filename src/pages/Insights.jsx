import React, { useEffect, useState } from 'react'
  import { useStore } from '../store/useStore'
  import { Star, Hash, Activity, Brain, Sparkles, Calendar } from 'lucide-react'
  import { getDetailedAstrology } from '../utils/astrology'
  import { getDetailedNumerology } from '../utils/numerology'
  import { analyzeHealthTrends } from '../utils/healthAnalyzer'

  const Insights = () => {
    const { user, biometricData, moodData } = useStore()
    const [activeTab, setActiveTab] = useState('astrology')
    const [astrology, setAstrology] = useState(null)
    const [numerology, setNumerology] = useState(null)
    const [healthTrends, setHealthTrends] = useState(null)

    useEffect(() => {
      if (user) {
        setAstrology(getDetailedAstrology(user.birthDate, user.birthTime))
        setNumerology(getDetailedNumerology(user.birthDate, user.name))
        setHealthTrends(analyzeHealthTrends(biometricData, moodData))
      }
    }, [user, biometricData, moodData])

    const tabs = [
      { id: 'astrology', label: 'Astrology', icon: Star },
      { id: 'numerology', label: 'Numerology', icon: Hash },
      { id: 'health', label: 'Health Trends', icon: Activity }
    ]

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 safe-top">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="px-4 py-6">
            <h1 className="text-2xl font-bold text-gray-900">Deep Insights</h1>
            <p className="text-gray-600 mt-1">Understand your holistic wellness patterns</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white shadow-sm sticky top-0 z-10">
          <div className="flex px-4">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-3 flex items-center justify-center gap-2 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Content */}
        <div className="px-4 py-6">
          {activeTab === 'astrology' && astrology && (
            <div className="space-y-4">
              {/* Sun Sign */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Your Sun Sign</h3>
                    <p className="text-sm text-gray-600">{astrology.sunSign}</p>
                  </div>
                </div>
                <p className="text-gray-700">{astrology.sunSignDescription}</p>
              </div>

              {/* Current Planetary Influence */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Today's Planetary Influence</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{astrology.planetaryInfluence.planet}</p>
                      <p className="text-xs text-gray-600">{astrology.planetaryInfluence.effect}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
                <h3 className="font-semibold mb-3">Cosmic Recommendations</h3>
                <ul className="space-y-2">
                  {astrology.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-xs mt-0.5">•</span>
                      <span className="text-sm">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'numerology' && numerology && (
            <div className="space-y-4">
              {/* Life Path Number */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                    <Hash className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Life Path Number</h3>
                    <p className="text-2xl font-bold text-amber-600">{numerology.lifePathNumber}</p>
                  </div>
                </div>
                <p className="text-gray-700">{numerology.lifePathDescription}</p>
              </div>

              {/* Personal Year */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Personal Year: {numerology.personalYear}</h3>
                <p className="text-gray-700 mb-3">{numerology.personalYearMeaning}</p>
                <div className="p-3 bg-amber-50 rounded-lg">
                  <p className="text-sm text-amber-800">
                    <span className="font-medium">Focus Area:</span> {numerology.yearFocus}
                  </p>
                </div>
              </div>

              {/* Lucky Elements */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Your Lucky Elements</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600">Lucky Days</p>
                    <p className="text-sm font-medium text-gray-900">{numerology.luckyDays.join(', ')}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600">Lucky Colors</p>
                    <p className="text-sm font-medium text-gray-900">{numerology.luckyColors.join(', ')}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'health' && healthTrends && (
            <div className="space-y-4">
              {/* Trend Summary */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">7-Day Health Trends</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Activity className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium text-gray-900">Physical</span>
                    </div>
                    <span className={`text-sm font-semibold ${
                      healthTrends.physical.trend === 'up' ? 'text-green-600' : 
                      healthTrends.physical.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {healthTrends.physical.trend === 'up' ? '↑' : 
                       healthTrends.physical.trend === 'down' ? '↓' : '→'} {healthTrends.physical.change}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Brain className="w-5 h-5 text-purple-600" />
                      <span className="text-sm font-medium text-gray-900">Emotional</span>
                    </div>
                    <span className={`text-sm font-semibold ${
                      healthTrends.emotional.trend === 'up' ? 'text-green-600' : 
                      healthTrends.emotional.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {healthTrends.emotional.trend === 'up' ? '↑' : 
                       healthTrends.emotional.trend === 'down' ? '↓' : '→'} {healthTrends.emotional.change}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-amber-600" />
                      <span className="text-sm font-medium text-gray-900">Spiritual</span>
                    </div>
                    <span className={`text-sm font-semibold ${
                      healthTrends.spiritual.trend === 'up' ? 'text-green-600' : 
                      healthTrends.spiritual.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {healthTrends.spiritual.trend === 'up' ? '↑' : 
                       healthTrends.spiritual.trend === 'down' ? '↓' : '→'} {healthTrends.spiritual.change}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Patterns */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Identified Patterns</h3>
                <div className="space-y-2">
                  {healthTrends.patterns.map((pattern, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Calendar className="w-4 h-4 text-gray-400 mt-0.5" />
                      <p className="text-sm text-gray-700">{pattern}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-6 text-white">
                <h3 className="font-semibold mb-3">Personalized Recommendations</h3>
                <ul className="space-y-2">
                  {healthTrends.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-xs mt-0.5">•</span>
                      <span className="text-sm">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  export default Insights
