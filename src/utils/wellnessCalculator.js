export const calculateWellnessScores = (user, biometricData, moodData) => {
    // Get latest data
    const latestBiometrics = biometricData.length > 0 ? biometricData[biometricData.length - 1] : null
    const todaysMood = moodData.filter(m => {
      const moodDate = new Date(m.timestamp).toDateString()
      return moodDate === new Date().toDateString()
    })
    const latestMood = todaysMood.length > 0 ? todaysMood[todaysMood.length - 1] : null

    // Calculate Physical Score
    let physicalScore = 70 // Base score
    if (latestBiometrics) {
      // Sleep score (7-9 hours is optimal)
      if (latestBiometrics.sleepHours) {
        const sleepScore = latestBiometrics.sleepHours >= 7 && latestBiometrics.sleepHours <= 9 ? 100 :
                          latestBiometrics.sleepHours >= 6 && latestBiometrics.sleepHours <= 10 ? 70 : 40
        physicalScore = (physicalScore + sleepScore) / 2
      }
      
      // Steps score (10000 steps is optimal)
      if (latestBiometrics.steps) {
        const stepsScore = Math.min((latestBiometrics.steps / 10000) * 100, 100)
        physicalScore = (physicalScore + stepsScore) / 2
      }

      // Heart rate score (60-100 bpm is normal)
      if (latestBiometrics.heartRate) {
        const hrScore = latestBiometrics.heartRate >= 60 && latestBiometrics.heartRate <= 100 ? 90 :
                       latestBiometrics.heartRate >= 50 && latestBiometrics.heartRate <= 110 ? 70 : 50
        physicalScore = (physicalScore + hrScore) / 2
      }
    }

    // Calculate Emotional Score
    let emotionalScore = 65 // Base score
    if (latestMood) {
      const moodFactors = [
        latestMood.overall * 10,
        latestMood.happiness * 10,
        (10 - latestMood.stress) * 10,
        (10 - latestMood.anxiety) * 10,
        latestMood.energy * 10
      ]
      emotionalScore = moodFactors.reduce((sum, score) => sum + score, 0) / moodFactors.length
    }

    // Calculate Spiritual Score (based on consistency and balance)
    let spiritualScore = 60 // Base score
    
    // Consistency bonus (if user has been tracking regularly)
    const daysTracked = new Set(moodData.map(m => new Date(m.timestamp).toDateString())).size
    if (daysTracked > 0) {
      spiritualScore += Math.min(daysTracked * 5, 20) // Up to 20 points for consistency
    }

    // Balance bonus (if physical and emotional are balanced)
    const balance = 100 - Math.abs(physicalScore - emotionalScore)
    spiritualScore = (spiritualScore + balance) / 2

    // Add some randomness for demo purposes (represents external factors)
    const cosmicInfluence = Math.random() * 10 - 5 // -5 to +5
    spiritualScore = Math.max(0, Math.min(100, spiritualScore + cosmicInfluence))

    return {
      physical: Math.round(physicalScore),
      emotional: Math.round(emotionalScore),
      spiritual: Math.round(spiritualScore)
    }
  }

  export const getWellnessRecommendations = (scores) => {
    const recommendations = []

    if (scores.physical < 70) {
      recommendations.push({
        type: 'physical',
        priority: 'high',
        action: 'Increase physical activity',
        suggestion: 'Try a 20-minute walk or light stretching routine'
      })
    }

    if (scores.emotional < 70) {
      recommendations.push({
        type: 'emotional',
        priority: 'high',
        action: 'Practice stress management',
        suggestion: 'Try 5 minutes of deep breathing or meditation'
      })
    }

    if (scores.spiritual < 70) {
      recommendations.push({
        type: 'spiritual',
        priority: 'medium',
        action: 'Connect with your inner self',
        suggestion: 'Spend time in nature or practice gratitude journaling'
      })
    }

    return recommendations
  }
