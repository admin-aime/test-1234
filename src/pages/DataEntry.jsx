import React, { useState } from 'react'
  import { useStore } from '../store/useStore'
  import { Heart, Brain, Activity, Plus, Check } from 'lucide-react'

  const DataEntry = () => {
    const { addBiometricData, addMoodData } = useStore()
    const [activeSection, setActiveSection] = useState('biometrics')
    const [biometrics, setBiometrics] = useState({
      weight: '',
      bloodPressureSystolic: '',
      bloodPressureDiastolic: '',
      heartRate: '',
      sleepHours: '',
      steps: ''
    })
    const [mood, setMood] = useState({
      overall: 5,
      energy: 5,
      stress: 5,
      happiness: 5,
      anxiety: 5,
      notes: ''
    })
    const [saved, setSaved] = useState(false)

    const handleBiometricChange = (field, value) => {
      setBiometrics({ ...biometrics, [field]: value })
    }

    const handleMoodChange = (field, value) => {
      setMood({ ...mood, [field]: value })
    }

    const saveBiometrics = () => {
      const dataToSave = Object.entries(biometrics).reduce((acc, [key, value]) => {
        if (value) acc[key] = parseFloat(value)
        return acc
      }, {})
      
      if (Object.keys(dataToSave).length > 0) {
        addBiometricData(dataToSave)
        setBiometrics({
          weight: '',
          bloodPressureSystolic: '',
          bloodPressureDiastolic: '',
          heartRate: '',
          sleepHours: '',
          steps: ''
        })
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
      }
    }

    const saveMood = () => {
      addMoodData(mood)
      setMood({
        overall: 5,
        energy: 5,
        stress: 5,
        happiness: 5,
        anxiety: 5,
        notes: ''
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 safe-top">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="px-4 py-6">
            <h1 className="text-2xl font-bold text-gray-900">Track Your Data</h1>
            <p className="text-gray-600 mt-1">Log your daily wellness metrics</p>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="bg-white shadow-sm">
          <div className="flex px-4">
            <button
              onClick={() => setActiveSection('biometrics')}
              className={`flex-1 py-3 border-b-2 transition-colors ${
                activeSection === 'biometrics'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Activity className="w-4 h-4" />
                <span className="text-sm font-medium">Biometrics</span>
              </div>
            </button>
            <button
              onClick={() => setActiveSection('mood')}
              className={`flex-1 py-3 border-b-2 transition-colors ${
                activeSection === 'mood'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Brain className="w-4 h-4" />
                <span className="text-sm font-medium">Mood</span>
              </div>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 py-6">
          {activeSection === 'biometrics' && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Physical Metrics</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      value={biometrics.weight}
                      onChange={(e) => handleBiometricChange('weight', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter weight"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        BP Systolic
                      </label>
                      <input
                        type="number"
                        value={biometrics.bloodPressureSystolic}
                        onChange={(e) => handleBiometricChange('bloodPressureSystolic', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="120"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        BP Diastolic
                      </label>
                      <input
                        type="number"
                        value={biometrics.bloodPressureDiastolic}
                        onChange={(e) => handleBiometricChange('bloodPressureDiastolic', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="80"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Heart Rate (bpm)
                    </label>
                    <input
                      type="number"
                      value={biometrics.heartRate}
                      onChange={(e) => handleBiometricChange('heartRate', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter heart rate"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sleep Hours
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      value={biometrics.sleepHours}
                      onChange={(e) => handleBiometricChange('sleepHours', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Hours of sleep"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Steps Today
                    </label>
                    <input
                      type="number"
                      value={biometrics.steps}
                      onChange={(e) => handleBiometricChange('steps', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Number of steps"
                    />
                  </div>
                </div>

                <button
                  onClick={saveBiometrics}
                  className="w-full mt-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
                >
                  {saved ? (
                    <>
                      <Check className="w-5 h-5" />
                      Saved!
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      Save Biometrics
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {activeSection === 'mood' && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">How are you feeling?</h3>
                
                <div className="space-y-6">
                  {[
                    { key: 'overall', label: 'Overall Mood', color: 'blue' },
                    { key: 'energy', label: 'Energy Level', color: 'green' },
                    { key: 'stress', label: 'Stress Level', color: 'red' },
                    { key: 'happiness', label: 'Happiness', color: 'yellow' },
                    { key: 'anxiety', label: 'Anxiety Level', color: 'purple' }
                  ].map((item) => (
                    <div key={item.key}>
                      <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium text-gray-700">
                          {item.label}
                        </label>
                        <span className="text-sm font-semibold text-gray-900">
                          {mood[item.key]}/10
                        </span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={mood[item.key]}
                        onChange={(e) => handleMoodChange(item.key, parseInt(e.target.value))}
                        className="w-full"
                      />
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-500">Low</span>
                        <span className="text-xs text-gray-500">High</span>
                      </div>
                    </div>
                  ))}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notes (Optional)
                    </label>
                    <textarea
                      value={mood.notes}
                      onChange={(e) => handleMoodChange('notes', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows="3"
                      placeholder="Any thoughts or feelings to note?"
                    />
                  </div>
                </div>

                <button
                  onClick={saveMood}
                  className="w-full mt-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
                >
                  {saved ? (
                    <>
                      <Check className="w-5 h-5" />
                      Saved!
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      Save Mood
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  export default DataEntry
