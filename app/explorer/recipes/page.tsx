"use client";

import { useState } from "react";

const recipes = [
  { 
    name: "Plov", 
    country: "Uzbekistan",
    difficulty: "Medium",
    time: "2 hours",
    servings: 6,
    steps: 8,
    description: "Traditional rice dish with lamb, carrots, and aromatic spices",
    ingredients: ["Rice", "Lamb", "Carrots", "Onions", "Spices"]
  },
  { 
    name: "Beshbarmak", 
    country: "Kazakhstan",
    difficulty: "Hard",
    time: "3 hours",
    servings: 8,
    steps: 6,
    description: "Boiled horse meat or lamb with flat noodles",
    ingredients: ["Horse meat", "Noodles", "Onions", "Broth"]
  },
  { 
    name: "Manti", 
    country: "Kyrgyzstan",
    difficulty: "Medium",
    time: "1.5 hours",
    servings: 4,
    steps: 7,
    description: "Steamed dumplings filled with meat and onions",
    ingredients: ["Dough", "Ground meat", "Onions", "Spices"]
  },
  { 
    name: "Laghman", 
    country: "Tajikistan",
    difficulty: "Easy",
    time: "1 hour",
    servings: 4,
    steps: 5,
    description: "Hand-pulled noodles with meat and vegetables",
    ingredients: ["Noodles", "Beef", "Vegetables", "Sauce"]
  },
];

export default function RecipesPage() {
  const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold">Recipe Collection</h1>
      <p className="mt-3 text-muted-foreground max-w-prose">
        Step-by-step cooking videos and photos from across Central Asia.
      </p>
      
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {recipes.map((recipe) => (
          <div 
            key={recipe.name} 
            className="rounded-2xl border p-4 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedRecipe(selectedRecipe === recipe.name ? null : recipe.name)}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="font-semibold text-lg">{recipe.name}</div>
                <div className="text-sm text-muted-foreground">{recipe.country}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">{recipe.time}</div>
                <div className="text-xs text-muted-foreground">{recipe.servings} servings</div>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-3">{recipe.description}</p>
            
            <div className="flex items-center gap-4 mb-3">
              <span className={`px-2 py-1 rounded text-xs ${
                recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {recipe.difficulty}
              </span>
              <span className="text-xs text-muted-foreground">{recipe.steps} steps</span>
            </div>
            
            <div className="grid grid-cols-5 gap-1 mb-3">
              {Array.from({ length: recipe.steps }).map((_, i) => (
                <div key={i} className="aspect-square rounded bg-secondary" />
              ))}
            </div>

            {selectedRecipe === recipe.name && (
              <div className="mt-4 p-4 bg-secondary rounded-lg">
                <div className="font-medium mb-2">Key Ingredients:</div>
                <div className="flex flex-wrap gap-1">
                  {recipe.ingredients.map((ingredient) => (
                    <span key={ingredient} className="px-2 py-1 bg-background rounded text-xs">
                      {ingredient}
                    </span>
                  ))}
                </div>
                <button className="mt-3 w-full rounded-lg bg-primary text-primary-foreground px-3 py-2 text-sm font-medium">
                  View Full Recipe
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Cooking Tips */}
      <div className="mt-12 rounded-2xl border p-6">
        <h2 className="text-xl font-semibold mb-4">Cooking Tips</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-secondary rounded-lg">
            <div className="font-medium">Spice Balance</div>
            <div className="text-sm text-muted-foreground">Central Asian cuisine emphasizes the perfect balance of cumin, coriander, and black pepper</div>
          </div>
          <div className="p-4 bg-secondary rounded-lg">
            <div className="font-medium">Rice Preparation</div>
            <div className="text-sm text-muted-foreground">For perfect plov, rinse rice until water runs clear and soak for 30 minutes</div>
          </div>
          <div className="p-4 bg-secondary rounded-lg">
            <div className="font-medium">Meat Selection</div>
            <div className="text-sm text-muted-foreground">Lamb shoulder or beef chuck work best for slow-cooked dishes</div>
          </div>
          <div className="p-4 bg-secondary rounded-lg">
            <div className="font-medium">Dough Handling</div>
            <div className="text-sm text-muted-foreground">For manti, let dough rest for at least 30 minutes before rolling</div>
          </div>
        </div>
      </div>
    </div>
  );
} 