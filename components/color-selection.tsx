"use client"

import { useState } from "react"

interface ColorSelectionProps {
  selectedColor: string
  onColorChange: (color: string) => void
  colors?: string[]
  className?: string
}

export function ColorSelection({ 
  selectedColor, 
  onColorChange, 
  colors = ["Oak", "Walnut", "White"],
  className = ""
}: ColorSelectionProps) {
  return (
    <div className={`border border-gray-200 rounded-lg p-4 bg-white shadow-sm ${className}`}>
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-800">Choose Option</h3>
        <div className="flex gap-3">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => onColorChange(color)}
              className={`px-4 py-2 rounded-lg border text-sm transition-all duration-200 ${
                selectedColor === color 
                  ? "bg-blue-800 text-white border-blue-800" 
                  : "bg-white text-gray-700 border-gray-200 hover:border-blue-300"
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
