"use client";

import { useState } from "react";

const recipes = [
  { 
    id: "plov",
    name: "Plov", 
    country: "Uzbekistan",
    difficulty: "Medium",
    time: "2 hours",
    servings: 6,
    description: "Traditional rice dish with lamb, carrots, and aromatic spices",
    ingredients: [
      { name: "Rice", amount: "2 cups", notes: "Basmati or long-grain rice" },
      { name: "Lamb", amount: "1 lb", notes: "Shoulder or leg, cut into chunks" },
      { name: "Carrots", amount: "3 large", notes: "Julienned" },
      { name: "Onions", amount: "2 large", notes: "Sliced" },
      { name: "Garlic", amount: "1 head", notes: "Whole cloves" },
      { name: "Cumin", amount: "2 tsp", notes: "Ground" },
      { name: "Coriander", amount: "1 tsp", notes: "Ground" },
      { name: "Oil", amount: "1/2 cup", notes: "Vegetable or cottonseed oil" },
      { name: "Salt", amount: "To taste", notes: "" }
    ],
    steps: [
      {
        number: 1,
        title: "Prepare the Rice",
        description: "Rinse the rice thoroughly until the water runs clear. Soak in cold water for 30 minutes, then drain.",
        image: "/patterns/pattern1.jpg",
        tips: "This step is crucial for fluffy rice"
      },
      {
        number: 2,
        title: "Brown the Meat",
        description: "Heat oil in a large pot over high heat. Add lamb pieces and brown on all sides, about 5-7 minutes.",
        image: "/patterns/pattern2.jpg",
        tips: "Don't overcrowd the pot - brown in batches if needed"
      },
      {
        number: 3,
        title: "Add Vegetables",
        description: "Add sliced onions and cook until translucent. Add julienned carrots and cook for 3-4 minutes.",
        image: "/patterns/pattern3.jpg",
        tips: "Carrots should be cut into thin strips for even cooking"
      },
      {
        number: 4,
        title: "Season and Simmer",
        description: "Add cumin, coriander, salt, and whole garlic cloves. Add 4 cups of water and bring to a boil.",
        image: "/patterns/pattern4.jpg",
        tips: "Adjust seasoning to your taste preference"
      },
      {
        number: 5,
        title: "Add Rice",
        description: "Gently spread the drained rice over the meat and vegetables. Do not stir.",
        image: "/patterns/pattern5.jpg",
        tips: "The rice should form an even layer on top"
      },
      {
        number: 6,
        title: "Steam the Plov",
        description: "Reduce heat to low, cover tightly, and cook for 20-25 minutes until rice is tender.",
        image: "/patterns/pattern6.jpg",
        tips: "Resist the urge to stir - this creates the layered effect"
      },
      {
        number: 7,
        title: "Rest and Serve",
        description: "Remove from heat and let rest for 10 minutes. Gently mix the layers before serving.",
        image: "/patterns/pattern7.jpg",
        tips: "The resting time allows flavors to meld"
      }
    ]
  },
  { 
    id: "beshbarmak",
    name: "Beshbarmak", 
    country: "Kazakhstan",
    difficulty: "Hard",
    time: "3 hours",
    servings: 8,
    description: "Boiled horse meat or lamb with flat noodles",
    ingredients: [
      { name: "Horse meat", amount: "2 lbs", notes: "Or lamb shoulder" },
      { name: "Flour", amount: "3 cups", notes: "For noodles" },
      { name: "Eggs", amount: "2", notes: "For noodle dough" },
      { name: "Onions", amount: "3 large", notes: "Sliced" },
      { name: "Bay leaves", amount: "2", notes: "" },
      { name: "Black pepper", amount: "1 tsp", notes: "Whole peppercorns" },
      { name: "Salt", amount: "To taste", notes: "" }
    ],
    steps: [
      {
        number: 1,
        title: "Prepare the Meat",
        description: "Place meat in a large pot with bay leaves, peppercorns, and salt. Cover with water and bring to a boil.",
        image: "/patterns/pattern8.jpg",
        tips: "Skim any foam that rises to the top"
      },
      {
        number: 2,
        title: "Simmer the Meat",
        description: "Reduce heat and simmer for 2-3 hours until meat is very tender and falls off the bone.",
        image: "/patterns/pattern1.jpg",
        tips: "The longer you simmer, the more tender the meat"
      },
      {
        number: 3,
        title: "Make the Noodles",
        description: "Mix flour, eggs, and water to form a stiff dough. Knead for 10 minutes, then let rest for 30 minutes.",
        image: "/patterns/pattern2.jpg",
        tips: "The dough should be firm but not dry"
      },
      {
        number: 4,
        title: "Roll and Cut Noodles",
        description: "Roll dough very thin and cut into wide strips. Dust with flour to prevent sticking.",
        image: "/patterns/pattern3.jpg",
        tips: "Traditional noodles are about 1 inch wide"
      },
      {
        number: 5,
        title: "Cook Noodles",
        description: "Boil noodles in the meat broth for 3-4 minutes until tender. Drain and set aside.",
        image: "/patterns/pattern4.jpg",
        tips: "Don't overcook - noodles should be al dente"
      },
      {
        number: 6,
        title: "Assemble and Serve",
        description: "Layer noodles on a large platter, top with shredded meat and caramelized onions.",
        image: "/patterns/pattern5.jpg",
        tips: "Serve hot with broth on the side"
      }
    ]
  },
  { 
    id: "manti",
    name: "Manti", 
    country: "Kyrgyzstan",
    difficulty: "Medium",
    time: "1.5 hours",
    servings: 4,
    description: "Steamed dumplings filled with meat and onions",
    ingredients: [
      { name: "Flour", amount: "2 cups", notes: "All-purpose" },
      { name: "Ground meat", amount: "1 lb", notes: "Lamb or beef" },
      { name: "Onions", amount: "2 medium", notes: "Finely chopped" },
      { name: "Salt", amount: "1 tsp", notes: "" },
      { name: "Black pepper", amount: "1/2 tsp", notes: "" },
      { name: "Water", amount: "1/2 cup", notes: "For dough" }
    ],
    steps: [
      {
        number: 1,
        title: "Make the Dough",
        description: "Mix flour, water, and salt to form a smooth dough. Knead for 10 minutes, then rest for 30 minutes.",
        image: "/patterns/pattern6.jpg",
        tips: "The dough should be firm and elastic"
      },
      {
        number: 2,
        title: "Prepare Filling",
        description: "Mix ground meat, chopped onions, salt, and pepper. Let the mixture rest for 15 minutes.",
        image: "/patterns/pattern7.jpg",
        tips: "The onions will release moisture into the meat"
      },
      {
        number: 3,
        title: "Roll the Dough",
        description: "Roll dough very thin (about 1/8 inch) and cut into 3-inch squares.",
        image: "/patterns/pattern8.jpg",
        tips: "Keep unused dough covered to prevent drying"
      },
      {
        number: 4,
        title: "Fill and Shape",
        description: "Place a spoonful of filling in the center of each square. Pinch corners together to form a pouch.",
        image: "/patterns/pattern1.jpg",
        tips: "Don't overfill - leave room to seal properly"
      },
      {
        number: 5,
        title: "Steam the Manti",
        description: "Arrange manti in a steamer basket and steam for 20-25 minutes until cooked through.",
        image: "/patterns/pattern2.jpg",
        tips: "Make sure water is boiling before adding manti"
      },
      {
        number: 6,
        title: "Serve Hot",
        description: "Serve manti hot with sour cream, melted butter, or a spicy sauce.",
        image: "/patterns/pattern3.jpg",
        tips: "Traditional accompaniment is sour cream with black pepper"
      }
    ]
  },
  { 
    id: "laghman",
    name: "Laghman", 
    country: "Tajikistan",
    difficulty: "Easy",
    time: "1 hour",
    servings: 4,
    description: "Hand-pulled noodles with meat and vegetables",
    ingredients: [
      { name: "Flour", amount: "3 cups", notes: "All-purpose" },
      { name: "Beef", amount: "1 lb", notes: "Thinly sliced" },
      { name: "Bell peppers", amount: "2", notes: "Sliced" },
      { name: "Carrots", amount: "2", notes: "Julienned" },
      { name: "Soy sauce", amount: "3 tbsp", notes: "" },
      { name: "Oil", amount: "2 tbsp", notes: "For stir-frying" },
      { name: "Salt", amount: "To taste", notes: "" }
    ],
    steps: [
      {
        number: 1,
        title: "Make Noodle Dough",
        description: "Mix flour, water, and salt to form a smooth dough. Knead until elastic, then rest for 30 minutes.",
        image: "/patterns/pattern4.jpg",
        tips: "The dough should be firm but pliable"
      },
      {
        number: 2,
        title: "Shape and Pull Noodles",
        description: "Roll dough into ropes and pull into long, thin noodles. Dust with flour to prevent sticking.",
        image: "/patterns/pattern5.jpg",
        tips: "Practice makes perfect - don't worry if they're not uniform"
      },
      {
        number: 3,
        title: "Cook Noodles",
        description: "Boil noodles in salted water for 3-4 minutes until al dente. Drain and rinse with cold water.",
        image: "/patterns/pattern6.jpg",
        tips: "Don't overcook - noodles should have some bite"
      },
      {
        number: 4,
        title: "Stir-fry Meat and Vegetables",
        description: "Heat oil in a wok and stir-fry beef until browned. Add vegetables and cook until tender.",
        image: "/patterns/pattern7.jpg",
        tips: "Cook on high heat for best results"
      },
      {
        number: 5,
        title: "Combine and Serve",
        description: "Add cooked noodles to the wok with soy sauce. Toss everything together and serve hot.",
        image: "/patterns/pattern8.jpg",
        tips: "Add a splash of water if the dish seems dry"
      }
    ]
  }
];

export default function RecipesPage() {
  const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null);
  const [viewingRecipe, setViewingRecipe] = useState<string | null>(null);

  const selectedRecipeData = recipes.find(r => r.id === viewingRecipe);

  if (viewingRecipe && selectedRecipeData) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-6">
          <button 
            onClick={() => setViewingRecipe(null)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to Recipes
          </button>
        </div>

        <div className="space-y-8">
          {/* Recipe Header */}
          <div className="text-center space-y-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold">{selectedRecipeData.name}</h1>
              <p className="text-lg text-muted-foreground">{selectedRecipeData.country}</p>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">{selectedRecipeData.description}</p>
            
            <div className="flex justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                {selectedRecipeData.difficulty}
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                {selectedRecipeData.time}
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                {selectedRecipeData.servings} servings
              </div>
            </div>
          </div>

          {/* Ingredients */}
          <div className="rounded-2xl border p-6">
            <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedRecipeData.ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-secondary rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{ingredient.name}</div>
                    <div className="text-sm text-muted-foreground">{ingredient.amount}</div>
                    {ingredient.notes && (
                      <div className="text-xs text-muted-foreground mt-1">{ingredient.notes}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Step-by-Step Instructions</h2>
            {selectedRecipeData.steps.map((step) => (
              <div key={step.number} className="rounded-2xl border p-6">
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                      {step.number}
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold">{step.title}</h3>
                      <p className="text-muted-foreground mt-1">{step.description}</p>
                    </div>
                    
                    {step.image && (
                      <div className="aspect-video rounded-lg overflow-hidden border">
                        <img 
                          src={step.image} 
                          alt={`Step ${step.number}: ${step.title}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    {step.tips && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-blue-800">
                          <span className="text-sm font-medium">💡 Tip:</span>
                          <span className="text-sm">{step.tips}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold">Recipe Collection</h1>
      <p className="mt-3 text-muted-foreground max-w-prose">
        Step-by-step cooking instructions and photos from across Central Asia.
      </p>
      
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {recipes.map((recipe) => (
          <div 
            key={recipe.id} 
            className="rounded-2xl border p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            onClick={() => setSelectedRecipe(selectedRecipe === recipe.id ? null : recipe.id)}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="font-semibold text-xl">{recipe.name}</div>
                <div className="text-sm text-muted-foreground">{recipe.country}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">{recipe.time}</div>
                <div className="text-xs text-muted-foreground">{recipe.servings} servings</div>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-4">{recipe.description}</p>
            
            <div className="flex items-center gap-4 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {recipe.difficulty}
              </span>
              <span className="text-xs text-muted-foreground">{recipe.steps.length} steps</span>
            </div>
            
            <div className="grid grid-cols-5 gap-2 mb-4">
              {recipe.steps.slice(0, 5).map((_, i) => (
                <div key={i} className="aspect-square rounded-lg bg-secondary border-2 border-dashed border-muted-foreground/20" />
              ))}
            </div>

            {selectedRecipe === recipe.id && (
              <div className="mt-4 space-y-3">
                <div className="p-4 bg-secondary rounded-lg">
                  <div className="font-medium mb-2">Key Ingredients:</div>
                  <div className="flex flex-wrap gap-2">
                    {recipe.ingredients.slice(0, 4).map((ingredient) => (
                      <span key={ingredient.name} className="px-2 py-1 bg-background rounded text-xs">
                        {ingredient.name}
                      </span>
                    ))}
                    {recipe.ingredients.length > 4 && (
                      <span className="px-2 py-1 bg-background rounded text-xs">
                        +{recipe.ingredients.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setViewingRecipe(recipe.id);
                  }}
                  className="w-full rounded-lg bg-primary text-primary-foreground px-4 py-2 font-medium hover:bg-primary/90 transition-colors"
                >
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