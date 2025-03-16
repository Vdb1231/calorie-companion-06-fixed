
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import CircularProgress from '@/components/ui/CircularProgress';
import { 
  Utensils, 
  Plus, 
  Trash2, 
  RotateCcw, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Loader2,
  AlertCircle,
  Camera 
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { formatDistanceToNow } from 'date-fns';
import FoodScanner from '@/components/FoodScanner';
import { useTranslation } from '@/contexts/LanguageContext';

// Mock data for meals
const initialMeals = [
  {
    id: 1,
    description: 'Greek yogurt with honey, granola, and mixed berries',
    calories: 325,
    protein: 18,
    carbs: 42,
    fat: 8,
    timestamp: new Date(new Date().setHours(new Date().getHours() - 4)),
    deleted: false
  },
  {
    id: 2,
    description: 'Chicken salad with mixed greens, cherry tomatoes, cucumber, and balsamic vinaigrette',
    calories: 420,
    protein: 35,
    carbs: 12,
    fat: 24,
    timestamp: new Date(new Date().setHours(new Date().getHours() - 8)),
    deleted: false
  },
  {
    id: 3,
    description: 'Protein smoothie with banana, almond milk, peanut butter, and chocolate protein powder',
    calories: 380,
    protein: 30,
    carbs: 38,
    fat: 12,
    timestamp: new Date(new Date().setHours(new Date().getHours() - 12)),
    deleted: false
  }
];

const Meals = () => {
  const [meals, setMeals] = useState(initialMeals);
  const [mealInput, setMealInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<null | {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  }>(null);
  const [showScanner, setShowScanner] = useState(false);
  const { t } = useTranslation();
  const { toast } = useToast();

  // Calculate daily totals excluding deleted meals
  const activeMeals = meals.filter(meal => !meal.deleted);
  const dailyTotals = {
    calories: activeMeals.reduce((sum, meal) => sum + meal.calories, 0),
    protein: activeMeals.reduce((sum, meal) => sum + meal.protein, 0),
    carbs: activeMeals.reduce((sum, meal) => sum + meal.carbs, 0),
    fat: activeMeals.reduce((sum, meal) => sum + meal.fat, 0),
  };

  // Daily goals
  const dailyGoals = {
    calories: 2200,
    protein: 120,
    carbs: 250,
    fat: 70,
  };

  const handleAnalyzeMeal = () => {
    if (!mealInput.trim()) {
      toast({
        title: "Empty meal description",
        description: "Please enter a description of your meal.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate API call to analyze meal
    setTimeout(() => {
      // Mock analysis result based on input length (in a real app, this would come from GPT-4o)
      const words = mealInput.split(' ').length;
      const mockResult = {
        calories: Math.round(words * 30 + Math.random() * 100),
        protein: Math.round(words * 1.5 + Math.random() * 10),
        carbs: Math.round(words * 3 + Math.random() * 20),
        fat: Math.round(words * 1 + Math.random() * 8),
      };
      
      setAnalysisResult(mockResult);
      setIsAnalyzing(false);
    }, 1500);
  };

  const handleAddMeal = () => {
    if (!analysisResult) return;
    
    const newMeal = {
      id: Date.now(),
      description: mealInput,
      ...analysisResult,
      timestamp: new Date(),
      deleted: false
    };
    
    setMeals([newMeal, ...meals]);
    setMealInput('');
    setAnalysisResult(null);
    
    toast({
      title: "Meal added",
      description: "Your meal has been added to your daily log.",
    });
  };

  const handleAddScannedMeal = (nutritionData: {
    foodName: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    description: string;
  }) => {
    const newMeal = {
      id: Date.now(),
      description: `${nutritionData.foodName} - ${nutritionData.description}`,
      calories: nutritionData.calories,
      protein: nutritionData.protein,
      carbs: nutritionData.carbs,
      fat: nutritionData.fat,
      timestamp: new Date(),
      deleted: false
    };
    
    setMeals([newMeal, ...meals]);
    setShowScanner(false);
    
    toast({
      title: "Meal added",
      description: "Your scanned meal has been added to your daily log.",
    });
  };

  const handleDeleteMeal = (id: number) => {
    setMeals(meals.map(meal => 
      meal.id === id ? { ...meal, deleted: true } : meal
    ));
    
    toast({
      title: "Meal deleted",
      description: "Your meal has been removed from your daily totals.",
    });
  };

  const handleUndoDelete = (id: number) => {
    setMeals(meals.map(meal => 
      meal.id === id ? { ...meal, deleted: false } : meal
    ));
    
    toast({
      title: "Meal restored",
      description: "Your meal has been added back to your daily totals.",
    });
  };

  return (
    <div className="container mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Meals Log</h1>
        <p className="text-foreground/70">
          Track your daily food intake and nutrition
        </p>
      </div>

      {/* Daily nutrition summary */}
      <Card className="bg-white/80 border-rose-gold-100 shadow-sm mb-8">
        <CardHeader className="pb-4">
          <CardTitle>Today's Nutrition</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <CircularProgress 
              value={dailyTotals.calories} 
              max={dailyGoals.calories} 
              label="Calories" 
              valueLabel={`${dailyTotals.calories} / ${dailyGoals.calories}`}
              color="#F4795F"
            />
            <CircularProgress 
              value={dailyTotals.protein} 
              max={dailyGoals.protein} 
              label="Protein" 
              valueLabel={`${dailyTotals.protein}g / ${dailyGoals.protein}g`}
              color="#10B981"
            />
            <CircularProgress 
              value={dailyTotals.carbs} 
              max={dailyGoals.carbs} 
              label="Carbs" 
              valueLabel={`${dailyTotals.carbs}g / ${dailyGoals.carbs}g`}
              color="#FAB0A7"
            />
            <CircularProgress 
              value={dailyTotals.fat} 
              max={dailyGoals.fat} 
              label="Fat" 
              valueLabel={`${dailyTotals.fat}g / ${dailyGoals.fat}g`}
              color="#D06150"
            />
          </div>
        </CardContent>
      </Card>

      {/* Meal input or scanner */}
      {showScanner ? (
        <div className="mb-8">
          <FoodScanner 
            onAddMeal={handleAddScannedMeal} 
            onClose={() => setShowScanner(false)} 
          />
        </div>
      ) : (
        <Card className="bg-white/80 border-rose-gold-100 shadow-sm mb-8">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Add a Meal</CardTitle>
            </div>
            <Button
              onClick={() => setShowScanner(true)}
              variant="outline"
              className="text-rose-gold-500 hover:text-rose-gold-700 hover:bg-rose-gold-50"
            >
              <Camera size={16} className="mr-2" />
              Scan Food
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Textarea
                value={mealInput}
                onChange={(e) => setMealInput(e.target.value)}
                placeholder="Describe your meal in detail (e.g., 'Greek yogurt with honey, granola, and mixed berries')"
                className="input-gold min-h-24 resize-none"
              />
            </div>
            
            <div className="flex gap-3">
              <Button 
                onClick={handleAnalyzeMeal} 
                disabled={isAnalyzing || !mealInput.trim()}
                className="bg-rose-gold-500 hover:bg-rose-gold-600 text-white"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    Analyze Meal
                    <ArrowRight size={16} className="ml-2" />
                  </>
                )}
              </Button>
            </div>
            
            {/* Analysis result */}
            {analysisResult && (
              <div className="mt-6 p-4 bg-rose-gold-50 rounded-lg border border-rose-gold-100 animate-fade-in">
                <h3 className="font-semibold mb-3">Nutrition Analysis</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <div className="text-rose-gold-500 font-semibold text-xl">{analysisResult.calories}</div>
                    <div className="text-xs text-foreground/70">Calories</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <div className="text-rose-gold-500 font-semibold text-xl">{analysisResult.protein}g</div>
                    <div className="text-xs text-foreground/70">Protein</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <div className="text-rose-gold-500 font-semibold text-xl">{analysisResult.carbs}g</div>
                    <div className="text-xs text-foreground/70">Carbs</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <div className="text-rose-gold-500 font-semibold text-xl">{analysisResult.fat}g</div>
                    <div className="text-xs text-foreground/70">Fat</div>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button onClick={handleAddMeal} className="bg-rose-gold-500 hover:bg-rose-gold-600 text-white">
                    <Plus size={16} className="mr-2" />
                    Add to Meals
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Meals list */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-1">Today's Meals</h2>
        <p className="text-foreground/70 text-sm">
          {activeMeals.length} active meals, {meals.filter(m => m.deleted).length} deleted
        </p>
      </div>
      
      {meals.length === 0 ? (
        <Card className="bg-white/80 border-rose-gold-100 shadow-sm text-center p-8">
          <AlertCircle className="mx-auto text-rose-gold-500 mb-3" size={32} />
          <h3 className="text-lg font-medium mb-1">No meals logged yet</h3>
          <p className="text-foreground/70">
            Add your first meal using the form above
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {meals.map((meal) => (
            <Card 
              key={meal.id} 
              className={`border-rose-gold-100 shadow-sm transition-all ${
                meal.deleted 
                  ? 'bg-gray-100 border-gray-200 opacity-70' 
                  : 'bg-white/80 hover:shadow-md'
              }`}
            >
              <CardContent className="p-5">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-start">
                      <div className={`p-2 rounded-lg mr-3 ${meal.deleted ? 'bg-gray-200' : 'bg-rose-gold-100'}`}>
                        <Utensils size={18} className={meal.deleted ? 'text-gray-500' : 'text-rose-gold-500'} />
                      </div>
                      <div>
                        <p className={`font-medium ${meal.deleted ? 'line-through text-gray-500' : ''}`}>
                          {meal.description}
                        </p>
                        <div className="flex items-center text-sm text-foreground/60 mt-1">
                          <Calendar size={14} className="mr-1" />
                          <span className="mr-3">Today</span>
                          <Clock size={14} className="mr-1" />
                          <span>{formatDistanceToNow(meal.timestamp, { addSuffix: true })}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 mt-4 lg:mt-0">
                    <div className="grid grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className={`font-medium ${meal.deleted ? 'text-gray-500' : 'text-rose-gold-500'}`}>
                          {meal.calories}
                        </div>
                        <div className="text-xs text-foreground/60">cal</div>
                      </div>
                      <div className="text-center">
                        <div className={`font-medium ${meal.deleted ? 'text-gray-500' : 'text-emerald-500'}`}>
                          {meal.protein}g
                        </div>
                        <div className="text-xs text-foreground/60">protein</div>
                      </div>
                      <div className="text-center">
                        <div className={`font-medium ${meal.deleted ? 'text-gray-500' : 'text-rose-gold-300'}`}>
                          {meal.carbs}g
                        </div>
                        <div className="text-xs text-foreground/60">carbs</div>
                      </div>
                      <div className="text-center">
                        <div className={`font-medium ${meal.deleted ? 'text-gray-500' : 'text-rose-gold-600'}`}>
                          {meal.fat}g
                        </div>
                        <div className="text-xs text-foreground/60">fat</div>
                      </div>
                    </div>
                    
                    {meal.deleted ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleUndoDelete(meal.id)}
                        className="ml-4"
                      >
                        <RotateCcw size={14} className="mr-1" />
                        Restore
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteMeal(meal.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 ml-4"
                      >
                        <Trash2 size={14} className="mr-1" />
                        Delete
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Meals;
