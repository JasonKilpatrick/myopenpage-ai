import { useState } from 'react'
import Questionnaire from './components/Questionnaire'
import PageGenerator from './components/PageGenerator'
import './App.css'

function App() {
  const [currentView, setCurrentView] = useState('landing')
  const [questionnaireData, setQuestionnaireData] = useState(null)

  const handleStartQuestionnaire = () => {
    setCurrentView('questionnaire')
  }

  const handleQuestionnaireComplete = (data) => {
    setQuestionnaireData(data)
    setCurrentView('generating')
  }

  const handleBackToLanding = () => {
    setCurrentView('landing')
    setQuestionnaireData(null)
  }

  if (currentView === 'questionnaire') {
    return <Questionnaire onComplete={handleQuestionnaireComplete} onBack={handleBackToLanding} />
  }

  if (currentView === 'generating') {
    return <PageGenerator data={questionnaireData} onBack={handleBackToLanding} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Landing Page */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
<div className="flex items-center justify-center mb-10 pb-6">
  <span className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
    MyOpenPage.ai
  </span>
</div>
          <p className="text-xl text-gray-600 mb-8">
            Your AI-Powered Dynamic Bio Page
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Create a professional bio page that showcases both your career achievements and wellness journey. 
            Connect your health data from Strava, Fitbit, and more to tell your complete story.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered Creation</h3>
            <p className="text-gray-600">Answer simple questions and let AI create your perfect bio page</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="text-4xl mb-4">💪</div>
            <h3 className="text-xl font-semibold mb-2">Health Integration</h3>
            <p className="text-gray-600">Connect Strava, Fitbit, and other health platforms to showcase your wellness journey</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">Dynamic Content</h3>
            <p className="text-gray-600">Your page evolves with you - real-time updates from your connected platforms</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-2">Professional Focus</h3>
            <p className="text-gray-600">Perfect for networking, job searching, and personal branding</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <button
            onClick={handleStartQuestionnaire}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Create Your Dynamic Bio Page
          </button>
          <p className="text-sm text-gray-500 mt-4">
            Takes just 2-3 minutes • No credit card required
          </p>
        </div>

        {/* Demo Section */}
        <div className="mt-16 bg-white rounded-lg p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-center mb-6">See How It Works</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h4 className="font-semibold mb-2">Answer Questions</h4>
              <p className="text-gray-600">Tell us about yourself, your goals, and your health journey</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">2</span>
              </div>
              <h4 className="font-semibold mb-2">AI Creates Your Page</h4>
              <p className="text-gray-600">Our AI generates a personalized bio page tailored to your story</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h4 className="font-semibold mb-2">Share & Connect</h4>
              <p className="text-gray-600">Share your dynamic bio page and watch it evolve with your achievements</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
