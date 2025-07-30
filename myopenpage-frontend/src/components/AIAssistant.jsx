import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Separator } from '@/components/ui/separator.jsx';
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Sparkles,
  Lightbulb,
  X,
  Minimize2,
  Maximize2
} from 'lucide-react';

const AIAssistant = ({ currentQuestion, currentStep, onSuggestion }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Question-specific AI prompts and suggestions
  const questionPrompts = {
    1: {
      title: "Full Name Help",
      suggestions: [
        "Use your professional name as it appears on LinkedIn",
        "Consider using your full name for credibility",
        "If you have a preferred name, that's fine too"
      ],
      aiPrompt: "Help me choose the best version of my name for a professional bio page"
    },
    2: {
      title: "Professional Title Ideas",
      suggestions: [
        "Be specific about your role (e.g., 'Senior Software Engineer' vs 'Developer')",
        "Include your specialization if relevant",
        "Avoid jargon that others might not understand"
      ],
      aiPrompt: "Help me craft a compelling professional title that stands out"
    },
    3: {
      title: "Bio Summary Tips",
      suggestions: [
        "Start with your current role and key expertise",
        "Mention 2-3 major achievements or skills",
        "Keep it conversational and authentic",
        "End with what drives or motivates you"
      ],
      aiPrompt: "Help me write a compelling bio summary that showcases my strengths"
    },
    4: {
      title: "Skills & Expertise",
      suggestions: [
        "List both technical and soft skills",
        "Include tools, technologies, and methodologies",
        "Mention industry-specific knowledge",
        "Don't forget leadership or communication skills"
      ],
      aiPrompt: "Help me identify and articulate my key professional skills"
    },
    5: {
      title: "Achievements & Projects",
      suggestions: [
        "Use specific numbers and metrics when possible",
        "Include both work and personal projects",
        "Mention awards, certifications, or recognition",
        "Focus on impact and results"
      ],
      aiPrompt: "Help me highlight my most impressive achievements and projects"
    },
    6: {
      title: "Contact Information",
      suggestions: [
        "Use a professional email address",
        "Include your LinkedIn profile URL",
        "Consider adding your website or portfolio",
        "Only share what you're comfortable with publicly"
      ],
      aiPrompt: "Help me decide what contact information to include"
    },
    7: {
      title: "Social Media Links",
      suggestions: [
        "LinkedIn is essential for professional networking",
        "Include Twitter if you share professional content",
        "Add GitHub if you're in tech",
        "Only include active, professional profiles"
      ],
      aiPrompt: "Help me choose which social media profiles to include"
    },
    8: {
      title: "Fitness Goals",
      suggestions: [
        "Be specific about your current fitness objective",
        "Include both short-term and long-term goals",
        "Mention any sports or activities you enjoy",
        "Connect fitness to your overall wellness journey"
      ],
      aiPrompt: "Help me articulate my fitness goals in an inspiring way"
    },
    9: {
      title: "Health Tracking Platforms",
      suggestions: [
        "Strava is great for running and cycling",
        "Fitbit tracks overall daily activity",
        "MyFitnessPal for nutrition tracking",
        "Apple Health integrates multiple data sources"
      ],
      aiPrompt: "Help me choose the best health tracking platforms for my goals"
    },
    10: {
      title: "Page Goals",
      suggestions: [
        "Networking: Connect with like-minded professionals",
        "Job Search: Attract potential employers",
        "Personal Branding: Build your professional reputation",
        "Business: Attract clients or customers"
      ],
      aiPrompt: "Help me define the main purpose of my bio page"
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && currentStep && questionPrompts[currentStep]) {
      // Add welcome message when opening for a new question
      const welcomeMessage = {
        id: Date.now(),
        type: 'ai',
        content: `Hi! I'm here to help you with "${questionPrompts[currentStep].title}". I can provide suggestions, examples, or help you brainstorm ideas. What would you like help with?`,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, currentStep]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response (in production, this would call OpenAI API)
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage, currentStep);
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput, step) => {
    const responses = {
      1: [
        "For professional credibility, I'd recommend using your full name as it appears on your LinkedIn profile. This helps with recognition and networking.",
        "Your name is the foundation of your personal brand. Consider how you want to be addressed professionally - formal or approachable?",
        "If you have a unique name, embrace it! It can help you stand out and be more memorable."
      ],
      2: [
        "A great professional title should be specific and highlight your expertise. Instead of 'Manager', try 'Digital Marketing Manager' or 'Product Development Manager'.",
        "Consider including your level of experience: 'Senior', 'Lead', or 'Principal' can add credibility and attract the right opportunities.",
        "Think about what makes you unique in your role. Do you specialize in a particular technology, industry, or methodology?"
      ],
      3: [
        "Start your bio with a strong opening that captures who you are professionally. Try: 'I'm a [title] with [X years] of experience in [field]...'",
        "Include a mix of your expertise, achievements, and what drives you. This creates a well-rounded picture of who you are.",
        "End with your passion or mission. This helps people connect with you on a personal level and remember you."
      ],
      4: [
        "Balance technical skills with soft skills. Employers value both your ability to do the work and work with others.",
        "Include tools and technologies you're proficient in, but also mention skills like 'cross-functional collaboration' or 'strategic thinking'.",
        "Think about skills that set you apart from others in your field. What unique combination of abilities do you bring?"
      ],
      5: [
        "Quantify your achievements whenever possible. 'Increased sales by 30%' is more impactful than 'improved sales'.",
        "Include both professional achievements and meaningful personal projects. They show your initiative and diverse interests.",
        "Don't forget about leadership experiences, volunteer work, or certifications that demonstrate your commitment to growth."
      ]
    };

    const stepResponses = responses[step] || [
      "That's a great question! Let me help you think through this systematically.",
      "I can definitely help you with that. Here are some ideas to consider...",
      "Based on what you're sharing, here's what I'd recommend..."
    ];

    return stepResponses[Math.floor(Math.random() * stepResponses.length)];
  };

  const useSuggestion = (suggestion) => {
    if (onSuggestion) {
      onSuggestion(suggestion);
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full p-4 shadow-lg animate-pulse"
        >
          <MessageCircle className="h-6 w-6 mr-2" />
          AI Assistant
        </Button>
      </div>
    );
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Card className="w-80 shadow-xl border-2 border-blue-200">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Bot className="h-5 w-5 mr-2" />
                <span className="font-semibold">AI Assistant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(false)}
                  className="text-white hover:bg-white/20 p-1"
                >
                  <Maximize2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 p-1"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const currentPrompt = questionPrompts[currentStep];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-96 h-[600px] shadow-xl border-2 border-blue-200 flex flex-col">
        {/* Header */}
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Bot className="h-6 w-6 mr-2" />
              <div>
                <CardTitle className="text-lg">AI Assistant</CardTitle>
                {currentPrompt && (
                  <p className="text-sm opacity-90">{currentPrompt.title}</p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(true)}
                className="text-white hover:bg-white/20 p-1"
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-1"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* Quick Suggestions */}
        {currentPrompt && (
          <div className="p-3 bg-blue-50 border-b flex-shrink-0">
            <div className="flex items-center mb-2">
              <Lightbulb className="h-4 w-4 text-blue-600 mr-1" />
              <span className="text-sm font-medium text-blue-800">Quick Tips:</span>
            </div>
            <div className="space-y-1">
              {currentPrompt.suggestions.slice(0, 2).map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => useSuggestion(suggestion)}
                  className="text-xs text-blue-700 hover:text-blue-900 hover:bg-blue-100 p-1 rounded block w-full text-left"
                >
                  • {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <div className="flex items-start space-x-2">
                  {message.type === 'ai' && <Bot className="h-4 w-4 mt-0.5 text-blue-600" />}
                  {message.type === 'user' && <User className="h-4 w-4 mt-0.5" />}
                  <div className="text-sm">{message.content}</div>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Bot className="h-4 w-4 text-blue-600" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </CardContent>

        {/* Input */}
        <div className="p-4 border-t flex-shrink-0">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask me anything about this question..."
              className="flex-1 p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AIAssistant;

