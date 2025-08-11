"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function MattressFinderPage() {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const questions = [
    {
      id: "sleep-position",
      question: "What's your primary sleep position?",
      options: ["Side", "Back", "Stomach", "Combination"]
    },
    {
      id: "firmness",
      question: "What firmness level do you prefer?",
      options: ["Soft", "Medium", "Firm", "Not sure"]
    },
    {
      id: "budget",
      question: "What's your budget range?",
      options: ["Under $500", "$500-$1000", "$1000-$2000", "$2000+"]
    }
  ]

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }))
  }

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  const getRecommendation = () => {
    const sleepPosition = answers["sleep-position"]
    const firmness = answers["firmness"]
    
    if (sleepPosition === "Side") {
      return "Memory Foam Mattress - Medium to Soft firmness for pressure relief"
    } else if (sleepPosition === "Back") {
      return "Hybrid Mattress - Medium to Firm firmness for spinal alignment"
    } else if (sleepPosition === "Stomach") {
      return "Firm Mattress - Firm support to prevent sinking"
    } else {
      return "Hybrid Mattress - Medium firmness for versatility"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Mattress Finder Quiz</h1>
          <p className="text-xl text-gray-700">Answer a few questions to find your perfect mattress</p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          {step <= questions.length ? (
            <Card>
              <CardHeader>
                <CardTitle>Question {step} of {questions.length}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {questions[step - 1].question}
                  </h3>
                  
                  <RadioGroup
                    value={answers[questions[step - 1].id] || ""}
                    onValueChange={(value) => handleAnswer(questions[step - 1].id, value)}
                  >
                    {questions[step - 1].options.map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className="text-lg">{option}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                  
                  <div className="flex gap-4 pt-4">
                    {step > 1 && (
                      <Button variant="outline" onClick={prevStep}>
                        Previous
                      </Button>
                    )}
                    <Button 
                      onClick={nextStep}
                      disabled={!answers[questions[step - 1].id]}
                      className="flex-1"
                    >
                      {step === questions.length ? "Get Results" : "Next"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Your Mattress Recommendation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-6">
                  <h3 className="text-2xl font-semibold text-gray-900">
                    {getRecommendation()}
                  </h3>
                  <p className="text-gray-600">
                    Based on your preferences, we recommend this type of mattress for optimal comfort and support.
                  </p>
                  <Button onClick={() => setStep(1)} variant="outline">
                    Take Quiz Again
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
