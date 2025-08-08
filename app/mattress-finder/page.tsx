"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

export default function MattressFinderPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const totalSteps = 6

  const questions = [
    {
      id: 'sleep_position',
      title: 'What is your primary sleep position?',
      options: [
        { value: 'side', label: 'Side sleeper' },
        { value: 'back', label: 'Back sleeper' },
        { value: 'stomach', label: 'Stomach sleeper' },
        { value: 'combination', label: 'Combination sleeper' }
      ]
    },
    {
      id: 'firmness',
      title: 'What firmness level do you prefer?',
      options: [
        { value: 'soft', label: 'Soft (1-3)' },
        { value: 'medium', label: 'Medium (4-6)' },
        { value: 'firm', label: 'Firm (7-10)' },
        { value: 'unsure', label: 'Not sure' }
      ]
    },
    {
      id: 'temperature',
      title: 'Do you sleep hot or cold?',
      options: [
        { value: 'hot', label: 'I sleep hot' },
        { value: 'cold', label: 'I sleep cold' },
        { value: 'neutral', label: 'I sleep at a comfortable temperature' }
      ]
    },
    {
      id: 'partner',
      title: 'Do you share your bed?',
      options: [
        { value: 'yes', label: 'Yes, I share my bed' },
        { value: 'no', label: 'No, I sleep alone' }
      ]
    },
    {
      id: 'budget',
      title: 'What is your budget range?',
      options: [
        { value: 'under_500', label: 'Under $500' },
        { value: '500_1000', label: '$500 - $1,000' },
        { value: '1000_2000', label: '$1,000 - $2,000' },
        { value: 'over_2000', label: 'Over $2,000' }
      ]
    },
    {
      id: 'size',
      title: 'What size mattress do you need?',
      options: [
        { value: 'twin', label: 'Twin' },
        { value: 'full', label: 'Full' },
        { value: 'queen', label: 'Queen' },
        { value: 'king', label: 'King' },
        { value: 'cal_king', label: 'California King' }
      ]
    }
  ]

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const getRecommendations = () => {
    // Simple recommendation logic based on answers
    const recommendations = []
    
    if (answers.sleep_position === 'side' && answers.firmness === 'soft') {
      recommendations.push('Memory Foam Mattress')
    }
    if (answers.temperature === 'hot') {
      recommendations.push('Cooling Gel Mattress')
    }
    if (answers.partner === 'yes') {
      recommendations.push('Hybrid Mattress with Motion Isolation')
    }
    
    return recommendations.length > 0 ? recommendations : ['Memory Foam Mattress', 'Hybrid Mattress']
  }

  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Mattress Finder Quiz</h1>
            <p className="text-lg text-gray-700">
              Answer a few questions to find your perfect mattress match
            </p>
          </div>

          <Card>
            <CardHeader>
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Question {currentStep} of {totalSteps}</span>
                  <span>{Math.round(progress)}% Complete</span>
                </div>
                <Progress value={progress} className="w-full" />
              </div>
            </CardHeader>
            <CardContent>
              {currentStep <= totalSteps ? (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {questions[currentStep - 1]?.title}
                  </h2>
                  
                  <RadioGroup
                    value={answers[questions[currentStep - 1]?.id] || ''}
                    onValueChange={(value) => handleAnswer(questions[currentStep - 1]?.id, value)}
                  >
                    {questions[currentStep - 1]?.options.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.value} id={option.value} />
                        <Label htmlFor={option.value} className="cursor-pointer">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>

                  <div className="flex justify-between pt-6">
                    <Button
                      variant="outline"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                    >
                      Previous
                    </Button>
                    <Button
                      onClick={nextStep}
                      disabled={!answers[questions[currentStep - 1]?.id]}
                      className="bg-blue-900 hover:bg-blue-800"
                    >
                      {currentStep === totalSteps ? 'Get Results' : 'Next'}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">Your Recommended Mattresses</h2>
                  <div className="space-y-4">
                    {getRecommendations().map((recommendation, index) => (
                      <Card key={index} className="border-blue-200">
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-lg text-blue-900">{recommendation}</h3>
                          <p className="text-gray-600">Perfect match based on your preferences</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <Button className="bg-blue-900 hover:bg-blue-800">
                    Shop Recommended Mattresses
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
