const zodiacSigns = [
    { sign: 'Aries', start: '03-21', end: '04-19', element: 'Fire', ruling: 'Mars' },
    { sign: 'Taurus', start: '04-20', end: '05-20', element: 'Earth', ruling: 'Venus' },
    { sign: 'Gemini', start: '05-21', end: '06-20', element: 'Air', ruling: 'Mercury' },
    { sign: 'Cancer', start: '06-21', end: '07-22', element: 'Water', ruling: 'Moon' },
    { sign: 'Leo', start: '07-23', end: '08-22', element: 'Fire', ruling: 'Sun' },
    { sign: 'Virgo', start: '08-23', end: '09-22', element: 'Earth', ruling: 'Mercury' },
    { sign: 'Libra', start: '09-23', end: '10-22', element: 'Air', ruling: 'Venus' },
    { sign: 'Scorpio', start: '10-23', end: '11-21', element: 'Water', ruling: 'Pluto' },
    { sign: 'Sagittarius', start: '11-22', end: '12-21', element: 'Fire', ruling: 'Jupiter' },
    { sign: 'Capricorn', start: '12-22', end: '01-19', element: 'Earth', ruling: 'Saturn' },
    { sign: 'Aquarius', start: '01-20', end: '02-18', element: 'Air', ruling: 'Uranus' },
    { sign: 'Pisces', start: '02-19', end: '03-20', element: 'Water', ruling: 'Neptune' }
  ]

  export const getZodiacSign = (birthDate) => {
    const date = new Date(birthDate)
    const month = date.getMonth() + 1
    const day = date.getDate()
    const monthDay = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`

    for (const zodiac of zodiacSigns) {
      const start = zodiac.start
      const end = zodiac.end

      if (zodiac.sign === 'Capricorn') {
        if (monthDay >= '12-22' || monthDay <= '01-19') {
          return zodiac
        }
      } else {
        if (monthDay >= start && monthDay <= end) {
          return zodiac
        }
      }
    }
    return zodiacSigns[0] // Default to Aries if not found
  }

  export const getAstrologyInsight = (birthDate) => {
    const zodiac = getZodiacSign(birthDate)
    const today = new Date()
    const dayOfWeek = today.getDay()

    const dailyMessages = {
      Fire: [
        "Your energy is high today. Channel it into physical activities.",
        "Leadership opportunities await. Trust your instincts.",
        "Adventure calls. Step out of your comfort zone.",
        "Your passion inspires others. Share your enthusiasm.",
        "Take bold action on delayed decisions.",
        "Your confidence attracts positive outcomes.",
        "Initiative brings rewards today."
      ],
      Earth: [
        "Focus on practical matters. Small steps lead to big results.",
        "Your patience will be rewarded. Stay grounded.",
        "Material abundance flows when you trust the process.",
        "Nurture your body with wholesome activities.",
        "Stability in routine brings peace of mind.",
        "Your reliability makes you invaluable today.",
        "Connect with nature for renewed energy."
      ],
      Air: [
        "Communication flows easily. Express your ideas.",
        "Social connections bring unexpected opportunities.",
        "Your curiosity leads to important discoveries.",
        "Mental clarity helps solve complex problems.",
        "Share your knowledge with others.",
        "Fresh perspectives emerge through dialogue.",
        "Flexibility is your strength today."
      ],
      Water: [
        "Trust your intuition. It guides you well today.",
        "Emotional connections deepen. Open your heart.",
        "Creative inspiration flows abundantly.",
        "Your empathy helps heal others.",
        "Dreams carry important messages.",
        "Emotional release brings relief.",
        "Your sensitivity is a superpower."
      ]
    }

    const message = dailyMessages[zodiac.element][dayOfWeek]

    return {
      sign: zodiac.sign,
      element: zodiac.element,
      ruling: zodiac.ruling,
      dailyMessage: message
    }
  }

  export const getDetailedAstrology = (birthDate, birthTime) => {
    const zodiac = getZodiacSign(birthDate)
    
    const signDescriptions = {
      'Aries': 'Bold, ambitious, and driven. You are a natural leader with boundless energy.',
      'Taurus': 'Reliable, patient, and practical. You value stability and sensual pleasures.',
      'Gemini': 'Curious, adaptable, and communicative. You thrive on variety and mental stimulation.',
      'Cancer': 'Nurturing, intuitive, and protective. You value emotional security and family.',
      'Leo': 'Confident, generous, and creative. You shine brightest when expressing yourself.',
      'Virgo': 'Analytical, helpful, and detail-oriented. You strive for perfection and service.',
      'Libra': 'Diplomatic, charming, and fair-minded. You seek harmony and balance.',
      'Scorpio': 'Intense, passionate, and transformative. You dive deep into life\'s mysteries.',
      'Sagittarius': 'Adventurous, optimistic, and philosophical. You seek truth and expansion.',
      'Capricorn': 'Ambitious, disciplined, and responsible. You build lasting foundations.',
      'Aquarius': 'Independent, humanitarian, and innovative. You envision a better future.',
      'Pisces': 'Compassionate, artistic, and intuitive. You connect with universal consciousness.'
    }

    // Simplified planetary influence (would need ephemeris data for accuracy)
    const planetaryInfluences = [
      { planet: 'Mercury', effect: 'Communication and mental clarity are enhanced' },
      { planet: 'Venus', effect: 'Relationships and creativity flow harmoniously' },
      { planet: 'Mars', effect: 'Energy and motivation are heightened' },
      { planet: 'Jupiter', effect: 'Expansion and good fortune are available' },
      { planet: 'Saturn', effect: 'Discipline and structure support your goals' }
    ]

    const currentInfluence = planetaryInfluences[new Date().getDay() % 5]

    const recommendations = [
      `Embrace your ${zodiac.element} element nature today`,
      `Connect with your ruling planet ${zodiac.ruling} through meditation`,
      `Balance your energy with complementary ${zodiac.element === 'Fire' ? 'Water' : zodiac.element === 'Earth' ? 'Air' : zodiac.element === 'Air' ? 'Earth' : 'Fire'} activities`,
      `Your sign\'s strength is most powerful during ${zodiac.element === 'Fire' || zodiac.element === 'Air' ? 'daytime' : 'evening'}`
    ]

    return {
      sunSign: zodiac.sign,
      sunSignDescription: signDescriptions[zodiac.sign],
      element: zodiac.element,
      rulingPlanet: zodiac.ruling,
      planetaryInfluence: currentInfluence,
      recommendations
    }
  }
