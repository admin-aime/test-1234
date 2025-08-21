import { create } from 'zustand'
  import { persist } from 'zustand/middleware'

  export const useStore = create(
    persist(
      (set, get) => ({
        user: null,
        biometricData: [],
        moodData: [],
        
        setUser: (userData) => {
          set({ user: userData })
        },
        
        loadUserData: () => {
          // This will be handled by persist middleware
        },
        
        addBiometricData: (data) => {
          set((state) => ({
            biometricData: [...state.biometricData, { ...data, timestamp: new Date().toISOString() }]
          }))
        },
        
        addMoodData: (data) => {
          set((state) => ({
            moodData: [...state.moodData, { ...data, timestamp: new Date().toISOString() }]
          }))
        },
        
        clearAllData: () => {
          set({ user: null, biometricData: [], moodData: [] })
        },
        
        getLatestBiometrics: () => {
          const data = get().biometricData
          return data.length > 0 ? data[data.length - 1] : null
        },
        
        getTodaysMood: () => {
          const data = get().moodData
          const today = new Date().toDateString()
          return data.filter(m => new Date(m.timestamp).toDateString() === today)
        }
      }),
      {
        name: 'wellness-storage',
      }
    )
  )
