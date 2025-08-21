import React, { useState } from 'react'
  import { useStore } from '../store/useStore'
  import { ChevronRight, Calendar, User, Heart, Star } from 'lucide-react'

  const Onboarding = () => {
    const setUser = useStore((state) => state.setUser)
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
      name: '',
      birthDate: '',
      birthTime: '',
      birthPlace: '',
      gender: '',
      healthGoals: [],
      currentConditions: []
    })

    const healthGoalOptions = [
      'Better Sleep', 'Stress Management', 'Weight Management', 
      'Energy Boost', 'Mental Clarity', 'Emotional Balance',
      'Spiritual Growth', 'Physical Fitness'
    ]

    const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const toggleHealthGoal = (goal) => {
      setFormData(prev => ({
        ...prev,
        healthGoals: prev.healthGoals.includes(goal)
          ? prev.healthGoals.filter(g => g !== goal)
          : [...prev.healthGoals, goal]
      }))
    }

    const handleSubmit = () => {
      const userData = {
        ...formData,
        createdAt: new Date().toISOString(),
        onboardingComplete: true
      }
      setUser(userData)
    }

    const canProceed = () => {
      switch(step) {
        case 1: return formData.name && formData.gender
        case 2: return formData.birthDate
        case 3: return formData.healthGoals.length > 0
        default: return false
      }
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-purple-50 p-4 safe-top safe-bottom">
        <div className="max-w-md mx-auto">
          {/* Progress Bar */}
          <div className="mb-8 mt-8">
            <div className="flex justify-between mb-2">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`flex-1 h-2 mx-1 rounded-full transition-colors ${
                    s <= step ? 'bg-primary-500' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <p className="text-center text-sm text-gray-600 mt-2">
              Step {step} of 3
            </p>
          </div>

          {/* Step Content */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            {step === 1 && (
              <>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-8 h-8 text-primary-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Welcome to Wellness</h2>
                  <p className="text-gray-600 mt-2">Let's personalize your experience</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {['Male', 'Female', 'Other'].map((option) => (
                        <button
                          key={option}
                          onClick={() => setFormData({ ...formData, gender: option })}
                          className={`py-3 px-4 rounded-lg border-2 transition-colors ${
                            formData.gender === option
                              ? 'border-primary-500 bg-primary-50 text-primary-700'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Birth Information</h2>
                  <p className="text-gray-600 mt-2">For astrological and numerological insights</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Birth Date
                    </label>
                    <input
                      type="date"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Birth Time (Optional)
                    </label>
                    <input
                      type="time"
                      name="birthTime"
                      value={formData.birthTime}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Birth Place (Optional)
                    </label>
                    <input
                      type="text"
                      name="birthPlace"
                      value={formData.birthPlace}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="City, Country"
                    />
                  </div>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Health Goals</h2>
                  <p className="text-gray-600 mt-2">What would you like to focus on?</p>
                </div>

                <div className="space-y-3">
                  <p className="text-sm text-gray-600 mb-3">Select all that apply:</p>
                  <div className="grid grid-cols-2 gap-3">
                    {healthGoalOptions.map((goal) => (
                      <button
                        key={goal}
                        onClick={() => toggleHealthGoal(goal)}
                        className={`py-3 px-4 rounded-lg border-2 text-sm transition-colors ${
                          formData.healthGoals.includes(goal)
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {goal}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Navigation Buttons */}
            <div className="mt-8 flex gap-3">
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
              )}
              
              {step < 3 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  disabled={!canProceed()}
                  className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                    canProceed()
                      ? 'bg-primary-500 text-white hover:bg-primary-600'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Continue
                  <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!canProceed()}
                  className={`flex-1 py-3 px-4 rounded-lg transition-colors ${
                    canProceed()
                      ? 'bg-primary-500 text-white hover:bg-primary-600'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Get Started
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  export default Onboarding
