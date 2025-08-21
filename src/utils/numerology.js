export const calculateLifePath = (birthDate) => {
    const date = new Date(birthDate)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    // Reduce to single digit
    const reduceToSingle = (num) => {
      while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
        num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0)
      }
      return num
    }

    const yearSum = reduceToSingle(year)
    const monthSum = reduceToSingle(month)
    const daySum = reduceToSingle(day)

    return reduceToSingle(yearSum + monthSum + daySum)
  }

  export const calculatePersonalYear = (birthDate) => {
    const date = new Date(birthDate)
    const currentYear = new Date().getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    const reduceToSingle = (num) => {
      while (num > 9) {
        num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0)
      }
      return num
    }

    return reduceToSingle(day + month + currentYear)
  }

  export const calculateNameNumber = (name) => {
    const letterValues = {
      A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
      J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
      S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8
    }

    const sum = name.toUpperCase().split('').reduce((total, letter) => {
      return total + (letterValues[letter] || 0)
    }, 0)

    const reduceToSingle = (num) => {
      while (num > 9 && num !== 11 && num !== 22) {
        num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0)
      }
      return num
    }

    return reduceToSingle(sum)
  }

  export const getNumerologyInsight = (birthDate) => {
    const lifePath = calculateLifePath(birthDate)
    const personalYear = calculatePersonalYear(birthDate)

    const dailyMessages = {
      1: "Leadership and independence guide your day. Take initiative.",
      2: "Cooperation and balance are key. Seek harmony in relationships.",
      3: "Creativity and communication flow. Express yourself freely.",
      4: "Hard work and stability pay off. Build solid foundations.",
      5: "Adventure and freedom call. Embrace change and variety.",
      6: "Nurturing and responsibility are highlighted. Care for others.",
      7: "Introspection and spirituality deepen. Seek inner wisdom.",
      8: "Material success and achievement are within reach. Take charge.",
      9: "Compassion and service to others bring fulfillment. Give generously.",
      11: "Intuition and inspiration are heightened. Trust your inner voice.",
      22: "Master builder energy is strong. Create something lasting.",
      33: "Master teacher energy flows. Share your wisdom with others."
    }

    return {
      lifePathNumber: lifePath,
      personalYear: personalYear,
      dailyMessage: dailyMessages[lifePath] || dailyMessages[1]
    }
  }

  export const getDetailedNumerology = (birthDate, name) => {
    const lifePath = calculateLifePath(birthDate)
    const personalYear = calculatePersonalYear(birthDate)
    const nameNumber = name ? calculateNameNumber(name) : 5

    const lifePathMeanings = {
      1: "The Leader - Independent, pioneering, and innovative. You're meant to forge new paths.",
      2: "The Peacemaker - Cooperative, sensitive, and diplomatic. You bring harmony to others.",
      3: "The Communicator - Creative, expressive, and optimistic. You inspire through self-expression.",
      4: "The Builder - Practical, loyal, and hardworking. You create lasting foundations.",
      5: "The Freedom Seeker - Adventurous, versatile, and progressive. You embrace change and variety.",
      6: "The Nurturer - Responsible, protective, and caring. You heal and support others.",
      7: "The Seeker - Analytical, intuitive, and spiritual. You search for deeper truths.",
      8: "The Achiever - Ambitious, organized, and material. You manifest abundance.",
      9: "The Humanitarian - Compassionate, generous, and idealistic. You serve humanity.",
      11: "The Intuitive - Visionary, inspired, and sensitive. You bridge the spiritual and material.",
      22: "The Master Builder - Powerful, practical, and visionary. You build dreams into reality.",
      33: "The Master Teacher - Compassionate, devoted, and wise. You uplift humanity."
    }

    const personalYearMeanings = {
      1: "New Beginnings - Start fresh projects and set new goals",
      2: "Cooperation - Build relationships and practice patience",
      3: "Creative Expression - Communicate, create, and socialize",
      4: "Hard Work - Build foundations and focus on details",
      5: "Change & Freedom - Embrace adventure and new experiences",
      6: "Responsibility - Focus on family, home, and service",
      7: "Introspection - Seek spiritual growth and inner wisdom",
      8: "Material Mastery - Focus on career and financial goals",
      9: "Completion - Release the old and prepare for new cycles"
    }

    const yearFocus = [
      "Personal growth and self-discovery",
      "Relationships and partnerships",
      "Creative projects and self-expression",
      "Building security and stability",
      "Exploring new horizons",
      "Family and community service",
      "Spiritual development",
      "Career advancement",
      "Humanitarian service"
    ]

    const luckyDays = []
    const dayMap = { 1: 'Sunday', 2: 'Monday', 3: 'Tuesday', 4: 'Wednesday', 5: 'Thursday', 6: 'Friday', 7: 'Saturday', 8: 'Sunday', 9: 'Monday' }
    luckyDays.push(dayMap[lifePath] || 'Wednesday')
    luckyDays.push(dayMap[personalYear] || 'Friday')

    const luckyColors = {
      1: ['Red', 'Orange'],
      2: ['White', 'Silver'],
      3: ['Yellow', 'Pink'],
      4: ['Green', 'Brown'],
      5: ['Blue', 'Turquoise'],
      6: ['Blue', 'Pink'],
      7: ['Purple', 'Violet'],
      8: ['Black', 'Brown'],
      9: ['Red', 'Pink']
    }

    return {
      lifePathNumber: lifePath,
      lifePathDescription: lifePathMeanings[lifePath] || lifePathMeanings[1],
      personalYear: personalYear,
      personalYearMeaning: personalYearMeanings[personalYear] || personalYearMeanings[1],
      yearFocus: yearFocus[personalYear - 1],
      nameNumber: nameNumber,
      luckyDays: [...new Set(luckyDays)],
      luckyColors: luckyColors[lifePath] || luckyColors[5]
    }
  }
