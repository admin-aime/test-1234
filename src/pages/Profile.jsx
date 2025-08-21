import React from 'react'
  import { useStore } from '../store/useStore'
  import { User, Calendar, MapPin, Target, LogOut, Trash2 } from 'lucide-react'

  const Profile = () => {
    const { user, clearAllData } = useStore()

    const handleLogout = () => {
      if (confirm('Are you sure you want to log out? Your data will be saved.')) {
        clearAllData()
      }
    }

    const handleDeleteData = () => {
      if (confirm('Are you sure you want to delete all your data? This cannot be undone.')) {
        clearAllData()
      }
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 safe-top">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="px-4 py-6">
            <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
            <p className="text-gray-600 mt-1">Manage your account and preferences</p>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 py-6 space-y-4">
          {/* User Info */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-primary-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{user?.name}</h2>
                <p className="text-sm text-gray-600">Member since {new Date(user?.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-600">Birth Date</p>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(user?.birthDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>

              {user?.birthPlace && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-600">Birth Place</p>
                    <p className="text-sm font-medium text-gray-900">{user.birthPlace}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Target className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-600">Health Goals</p>
                  <p className="text-sm font-medium text-gray-900">
                    {user?.healthGoals?.join(', ') || 'None set'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Settings</h3>
            
            <div className="space-y-3">
              <button className="w-full p-3 text-left bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <p className="text-sm font-medium text-gray-900">Notifications</p>
                <p className="text-xs text-gray-600">Manage your notification preferences</p>
              </button>

              <button className="w-full p-3 text-left bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <p className="text-sm font-medium text-gray-900">Privacy</p>
                <p className="text-xs text-gray-600">Control your data and privacy settings</p>
              </button>

              <button className="w-full p-3 text-left bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <p className="text-sm font-medium text-gray-900">Export Data</p>
                <p className="text-xs text-gray-600">Download your wellness data</p>
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={handleLogout}
              className="w-full py-3 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
            >
              <LogOut className="w-5 h-5" />
              Log Out
            </button>

            <button
              onClick={handleDeleteData}
              className="w-full py-3 px-4 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 className="w-5 h-5" />
              Delete All Data
            </button>
          </div>

          {/* App Info */}
          <div className="text-center py-6">
            <p className="text-xs text-gray-500">Version 0.1.0 (MVP)</p>
            <p className="text-xs text-gray-500 mt-1">© 2024 Holistic Wellness</p>
          </div>
        </div>
      </div>
    )
  }

  export default Profile
