export const analyzeHealthTrends = (biometricData, moodData) => {
    // Get last 7 days of data
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const recentBiometrics = biometricData.filter(d => new Date(d.timestamp) >= sevenDaysAgo)
    const recentMoods = moodData.filter(d => new Date(d.timestamp) >= sevenDaysAgo)

    // Calculate trends
    const calculateTrend = (data, field) => {
      if (data.length < 2) return { trend: 'stable', change: 0 }
      
      const values = data.map(d => d[field]).filter(v => v !== undefined)
      if (values.length < 2) return { trend: 'stable', change: 0 }

      const firstHalf = values.slice(0, Math.floor(values.length / 2))
      const secondHalf = values.slice(Math.floor(values.length / 2))
      
      const firstAvg = firstHalf.reduce((sum, v) => sum + v, 0) / firstHalf.length
      const secondAvg = secondHalf.reduce((sum, v) => sum + v, 0) / secondHalf.length
      
      const change = ((secondAvg - firstAvg) / firstAvg) * 100

      return {
        trend: change > 5 ? 'up' : change < -5 ? 'down' : 'stable',
        change: Math.abs(Math.round(change))
      }
    }

    // Physical trends
    const sleepTrend = calculateTrend(recentBiometrics, 'sleepHours')
    const stepsTrend = calculateTrend(recentBiometrics, 'steps')
    const physicalTrend = {
      trend: stepsTrend.trend || sleepTrend.trend || 'stable',
      change: Math.round((stepsTrend.change + sleepTrend.change) / 2)
    }

    // Emotional trends
    const moodTrend = calculateTrend(recentMoods, 'overall')
    const stressTrend = calculateTrend(recentMoods, 'stress')
    const emotionalTrend = {
      trend: moodTrend.trend,
      change: moodTrend.change
    }

    // Spiritual trends (based on consistency and balance)
    const daysTracked = new Set([
      ...recentBiometrics.map(d => new Date(d.timestamp).toDateString()),
      ...recentMoods.map(d => new Date(d.timestamp).toDateString())
    ]).size

    const spiritualTrend = {
      trend: daysTracked >= 5 ? 'up' : daysTracked >= 3 ? 'stable' : 'down',
      change: Math.round((daysTracked / 7) * 100)
    }

    // Identify patterns
    const patterns = []
    
    if (recentBiometrics.length > 0) {
      const avgSleep = recentBiometrics.reduce((sum, d) => sum + (d.sleepHours || 0), 0) / recentBiometrics.length
      if (avgSleep < 7) patterns.push('Sleep duration below recommended levels')
      if (avgSleep > 9) patterns.push('Extended sleep may indicate fatigue')
    }

    if (recentMoods.length > 0) {
      const avgStress = recentMoods.reduce((sum, d) => sum + (d.stress || 5), 0) / recentMoods.length
      if (avgStress > 7) patterns.push('Elevated stress levels detected')
      
      const avgEnergy = recentMoods.reduce((sum, d) => sum + (d.energy || 5), 0) / recentMoods.length
      if (avgEnergy < 4) patterns.push('Low energy levels throughout the week')
    }

    if (patterns.length === 0) {
      patterns.push('Maintaining steady wellness patterns')
    }

    // Generate recommendations
    const recommendations = []

    if (physicalTrend.trend === 'down') {
      recommendations.push('Increase physical activity gradually')
    }
    if (emotionalTrend.trend === 'down') {
      recommendations.push('Practice stress-reduction techniques daily')
    }
    if (spiritualTrend.trend === 'down') {
      recommendations.push('Establish a consistent daily wellness routine')
    }
    
    if (sleepTrend.trend === 'down') {
      recommendations.push('Prioritize sleep hygiene and consistent bedtime')
    }
    if (stressTrend.trend === 'up') {
      recommendations.push('Incorporate relaxation practices into your day')
    }

    if (recommendations.length === 0) {
      recommendations.push('Continue your current wellness practices')
      recommendations.push('Consider setting new wellness goals')
    }

    return {
      physical: physicalTrend,
      emotional: emotionalTrend,
      spiritual: spiritualTrend,
      patterns,
      recommendations
    }
  }
