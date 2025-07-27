import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Separator } from '@/components/ui/separator.jsx';
import { 
  Sparkles, 
  Heart, 
  Activity, 
  ArrowLeft, 
  Mail, 
  Linkedin, 
  Download,
  Share2,
  Edit,
  Eye,
  Target,
  Award,
  Zap
} from 'lucide-react';

// Updated for Vercel deployment
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:5001/api';

const PageGenerator = ({ data, onBack }) => {
  const [generatedPage, setGeneratedPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    generatePage();
  }, []);

  const generatePage = async () => {
    try {
      setLoading(true);
      
      // Simulate AI page generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Generate mock page content based on user answers
      const mockPage = generateMockPage(data.answers);
      setGeneratedPage(mockPage);
      
    } catch (err) {
      setError('Failed to generate your page. Please try again.');
      console.error('Page generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const generateMockPage = (answers) => {
    const name = answers.full_name || 'Your Name';
    const title = answers.professional_title || 'Professional';
    const bio = answers.bio_summary || 'A passionate professional dedicated to excellence.';
    const skills = answers.skills || 'Various professional skills and expertise.';
    const achievements = answers.achievements || 'Notable accomplishments and projects.';
    const email = answers.contact_email;
    const linkedin = answers.social_linkedin;
    const fitnessGoal = answers.fitness_goals;
    const healthPlatforms = answers.health_tracking || [];
    const pageGoal = answers.page_goal;

    return {
      id: 'generated-' + Date.now(),
      name,
      title,
      bio,
      skills,
      achievements,
      email,
      linkedin,
      fitnessGoal,
      healthPlatforms,
      pageGoal,
      theme: 'modern',
      createdAt: new Date().toISOString(),
      url: `myopenpage.ai/${name.toLowerCase().replace(/\s+/g, '-')}`
    };
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${generatedPage.name}'s Bio Page`,
        text: `Check out ${generatedPage.name}'s dynamic bio page on MyOpenPage.ai`,
        url: `https://${generatedPage.url}`
      });
    } else {
      navigator.clipboard.writeText(`https://${generatedPage.url}`);
      alert('Page URL copied to clipboard!');
    }
  };

  const handleDownload = () => {
    const pageData = JSON.stringify(generatedPage, null, 2);
    const blob = new Blob([pageData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${generatedPage.name}-bio-page.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="mb-6">
            <Sparkles className="h-16 w-16 mx-auto text-blue-600 animate-spin" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Creating Your Dynamic Bio Page</h2>
          <p className="text-gray-600 mb-4">
            Our AI is analyzing your responses and crafting a personalized bio page that showcases both your professional achievements and wellness journey.
          </p>
          <div className="space-y-2 text-sm text-gray-500">
            <p>✨ Generating personalized content...</p>
            <p>🎨 Designing your layout...</p>
            <p>💪 Integrating health features...</p>
            <p>🚀 Finalizing your page...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 mb-4">
            <Zap className="h-16 w-16 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-x-4">
            <Button onClick={generatePage} variant="outline">
              Try Again
            </Button>
            <Button onClick={onBack}>
              Back to Questionnaire
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Questionnaire
            </button>
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-red-500" />
              <span className="text-xl font-bold">MyOpenPage.ai</span>
              <Activity className="h-6 w-6 text-green-500" />
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="bg-green-100 border border-green-200 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-green-500 rounded-full p-2">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">
              🎉 Your Dynamic Bio Page is Ready!
            </h2>
            <p className="text-green-700">
              Your personalized bio page has been generated and is ready to share with the world.
            </p>
            <div className="mt-4 text-sm text-green-600">
              <p>URL: <span className="font-mono bg-green-50 px-2 py-1 rounded">https://{generatedPage.url}</span></p>
            </div>
          </div>
        </div>

        {/* Generated Page Preview */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Section */}
            <Card>
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                    {generatedPage.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </div>
                  <h1 className="text-3xl font-bold mb-2">{generatedPage.name}</h1>
                  <p className="text-xl text-gray-600 mb-4">{generatedPage.title}</p>
                  <div className="flex justify-center space-x-4 mb-6">
                    {generatedPage.email && (
                      <Button variant="outline" size="sm">
                        <Mail className="h-4 w-4 mr-1" />
                        Contact
                      </Button>
                    )}
                    {generatedPage.linkedin && (
                      <Button variant="outline" size="sm">
                        <Linkedin className="h-4 w-4 mr-1" />
                        LinkedIn
                      </Button>
                    )}
                  </div>
                  <p className="text-gray-700 leading-relaxed">{generatedPage.bio}</p>
                </div>
              </CardContent>
            </Card>

            {/* Skills & Expertise */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Skills & Expertise
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{generatedPage.skills}</p>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Achievements & Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{generatedPage.achievements}</p>
              </CardContent>
            </Card>

            {/* Health & Wellness */}
            {(generatedPage.fitnessGoal || generatedPage.healthPlatforms.length > 0) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="h-5 w-5 mr-2" />
                    Health & Wellness Journey
                  </CardTitle>
                  <CardDescription>
                    Showcasing the intersection of professional success and personal wellness
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {generatedPage.fitnessGoal && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Current Fitness Goal</h4>
                      <Badge variant="secondary">{generatedPage.fitnessGoal}</Badge>
                    </div>
                  )}
                  {generatedPage.healthPlatforms.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Connected Health Platforms</h4>
                      <div className="flex flex-wrap gap-2">
                        {generatedPage.healthPlatforms.map((platform, index) => (
                          <Badge key={index} variant="outline">{platform}</Badge>
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Real-time health data integration coming soon!
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Page Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Page Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Created</span>
                  <span className="font-medium">Just now</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Views</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shares</span>
                  <span className="font-medium">0</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-600">Page Goal</span>
                  <Badge variant="secondary" className="text-xs">
                    {generatedPage.pageGoal}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Next Steps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Customize Design
                </Button>
                <Button className="w-full" variant="outline">
                  <Activity className="h-4 w-4 mr-2" />
                  Connect Health Apps
                </Button>
                <Button className="w-full" variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview Live Page
                </Button>
                <Separator />
                <p className="text-sm text-gray-600">
                  Your page is ready to share! Connect your health platforms to unlock dynamic content updates.
                </p>
              </CardContent>
            </Card>

            {/* Upgrade Prompt */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg text-blue-800">Unlock Premium Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2 text-blue-700 mb-4">
                  <li>• Real-time health data sync</li>
                  <li>• Custom domain (yourname.com)</li>
                  <li>• Advanced analytics</li>
                  <li>• Priority support</li>
                </ul>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Upgrade to Pro
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageGenerator;

