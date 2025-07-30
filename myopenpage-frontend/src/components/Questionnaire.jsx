import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Checkbox } from '@/components/ui/checkbox.jsx';
import { Progress } from '@/components/ui/progress.jsx';
import { Upload, ChevronLeft, ChevronRight, Sparkles, Heart, Activity, ArrowLeft } from 'lucide-react';
import AIAssistant from './AIAssistant.jsx';

// Updated for Vercel deployment - will use environment variable
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:5001/api';

const Questionnaire = ({ onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchQuestionnaire();
  }, []);

  const fetchQuestionnaire = async () => {
    try {
      // For now, use mock questions since we're migrating to Vercel
      setQuestions(getMockQuestions());
    } catch (error) {
      console.error('Failed to fetch questionnaire:', error);
      setQuestions(getMockQuestions());
    } finally {
      setLoading(false);
    }
  };

  const getMockQuestions = () => [
    {
      id: "full_name",
      type: "text",
      question: "What's your full name?",
      placeholder: "Enter your full name",
      required: true,
      category: "basic"
    },
    {
      id: "professional_title",
      type: "text",
      question: "What's your current professional title or role?",
      placeholder: "e.g., Software Engineer, Marketing Manager, Freelance Designer",
      required: true,
      category: "basic"
    },
    {
      id: "bio_summary",
      type: "textarea",
      question: "Tell us about yourself in a few sentences",
      placeholder: "Describe your background, interests, and what makes you unique...",
      required: true,
      category: "content"
    },
    {
      id: "skills",
      type: "textarea",
      question: "What are your key skills and expertise?",
      placeholder: "List your main skills, technologies, or areas of expertise...",
      required: false,
      category: "content"
    },
    {
      id: "achievements",
      type: "textarea",
      question: "What are some of your notable achievements or projects?",
      placeholder: "Share your accomplishments, awards, or projects you're proud of...",
      required: false,
      category: "content"
    },
    {
      id: "fitness_goals",
      type: "select",
      question: "What are your current fitness or wellness goals?",
      options: [
        "Weight loss",
        "Muscle building",
        "Endurance training",
        "General wellness",
        "Mental health",
        "Not applicable"
      ],
      required: false,
      category: "content"
    },
    {
      id: "health_tracking",
      type: "multiselect",
      question: "Which health platforms or devices do you use?",
      options: [
        "Strava",
        "Fitbit",
        "Apple Health",
        "Garmin",
        "MyFitnessPal",
        "Oura Ring",
        "None"
      ],
      required: false,
      category: "content"
    },
    {
      id: "contact_email",
      type: "text",
      question: "Contact email (will be displayed on your page)",
      placeholder: "your@email.com",
      required: false,
      category: "basic"
    },
    {
      id: "social_linkedin",
      type: "text",
      question: "LinkedIn profile URL (optional)",
      placeholder: "https://linkedin.com/in/yourprofile",
      required: false,
      category: "basic"
    },
    {
      id: "page_goal",
      type: "select",
      question: "What's the main purpose of your bio page?",
      options: [
        "Professional networking",
        "Job searching",
        "Client acquisition",
        "Personal branding",
        "Sharing fitness journey",
        "General online presence"
      ],
      required: true,
      category: "advanced"
    }
  ];

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleMultiSelectChange = (questionId, option, checked) => {
    setAnswers(prev => {
      const currentAnswers = prev[questionId] || [];
      if (checked) {
        return {
          ...prev,
          [questionId]: [...currentAnswers, option]
        };
      } else {
        return {
          ...prev,
          [questionId]: currentAnswers.filter(item => item !== option)
        };
      }
    });
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      // Simulate API call to generate page content
      const formData = {
        answers,
        uploadedFiles: uploadedFiles.map(file => ({
          name: file.name,
          size: file.size,
          type: file.type
        }))
      };
      
      // Call the completion handler
      onComplete(formData);
    } catch (error) {
      console.error('Failed to submit questionnaire:', error);
      alert('Failed to generate your page. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const renderQuestion = (question) => {
    const value = answers[question.id] || '';

    switch (question.type) {
      case 'text':
        return (
          <Input
            type="text"
            placeholder={question.placeholder}
            value={value}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            className="w-full"
          />
        );

      case 'textarea':
        return (
          <Textarea
            placeholder={question.placeholder}
            value={value}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            className="w-full min-h-[100px]"
          />
        );

      case 'select':
        return (
          <Select value={value} onValueChange={(val) => handleAnswerChange(question.id, val)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {question.options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'multiselect':
        const selectedOptions = value || [];
        return (
          <div className="space-y-2">
            {question.options.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={`${question.id}-${option}`}
                  checked={selectedOptions.includes(option)}
                  onCheckedChange={(checked) => 
                    handleMultiSelectChange(question.id, option, checked)
                  }
                />
                <Label htmlFor={`${question.id}-${option}`}>{option}</Label>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  const progress = questions.length > 0 ? ((currentStep + 1) / questions.length) * 100 : 0;
  const currentQuestion = questions[currentStep];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <Sparkles className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-lg">Preparing your personalized questionnaire...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Home
          </button>
          <div className="flex items-center justify-center mb-4">
            <Heart className="h-8 w-8 text-red-500 mr-2" />
            <h1 className="text-3xl font-bold text-gray-900">MyOpenPage.ai</h1>
            <Activity className="h-8 w-8 text-green-500 ml-2" />
          </div>
          <p className="text-gray-600">Let's create your dynamic bio page together</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Step {currentStep + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>

        {/* Question Card */}
        <div key={currentStep}>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">
                {currentQuestion?.question}
              </CardTitle>
              {currentQuestion?.required && (
                <CardDescription className="text-red-500">
                  * This field is required
                </CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentQuestion && renderQuestion(currentQuestion)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* File Upload Section */}
        {currentStep === questions.length - 1 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="h-5 w-5 mr-2" />
                Upload Files (Optional)
              </CardTitle>
              <CardDescription>
                Upload photos, documents, or health data files to enhance your bio page
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                  accept="image/*,.pdf,.txt,.json"
                />
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-gray-600">Click to upload files or drag and drop</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Images, PDFs, health data files
                  </p>
                </Label>
              </div>
              {uploadedFiles.length > 0 && (
                <div className="mt-4">
                  <p className="font-medium mb-2">Uploaded files:</p>
                  <ul className="space-y-1">
                    {uploadedFiles.map((file, index) => (
                      <li key={index} className="flex items-center justify-between text-sm text-gray-600 bg-gray-50 p-2 rounded">
                        <span>{file.name} ({(file.size / 1024).toFixed(1)} KB)</span>
                        <button
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>

          {currentStep === questions.length - 1 ? (
            <Button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              {submitting ? (
                <>
                  <Sparkles className="h-4 w-4 mr-1 animate-spin" />
                  Creating Your Page...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-1" />
                  Create My Page
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={nextStep}
              className="flex items-center"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>
      </div>

      {/* AI Assistant */}
      <AIAssistant
        currentQuestion={currentQuestion}
        currentStep={currentStep + 1}
        onSuggestion={(suggestion) => {
          if (currentQuestion) {
            setAnswers(prev => ({
              ...prev,
              [currentQuestion.id]: suggestion
            }));
          }
        }}
      />
    </div>
  );
};

export default Questionnaire;

