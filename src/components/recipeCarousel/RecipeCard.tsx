
import React from 'react';
import { useTranslation } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import RecipeMeta from './RecipeMeta';
import RecipeInstructions from './RecipeInstructions';
import { Recipe } from './types';

interface RecipeCardProps {
  recipe: Recipe;
  showInstructions: number | null;
  toggleInstructions: (recipeId: number) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ 
  recipe, 
  showInstructions, 
  toggleInstructions 
}) => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-rose-gold-50/50 border border-rose-gold-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <div className="relative">
        <img 
          src={recipe.image} 
          alt={t(recipe.titleKey)} 
          className="w-full h-60 object-cover"
        />
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2">{t(recipe.titleKey)}</h3>
        <p className="text-foreground/70 mb-4">
          {t(recipe.descKey)}
        </p>
        
        <RecipeMeta 
          prepKey={recipe.prepKey}
          cookKey={recipe.cookKey}
          servingsKey={recipe.servingsKey}
          caloriesKey={recipe.caloriesKey}
          proteinKey={recipe.proteinKey}
        />
        
        <Button 
          onClick={() => toggleInstructions(recipe.id)}
          variant="outline" 
          className="w-full justify-center bg-rose-gold-100 text-rose-gold-700 hover:bg-rose-gold-200 border-rose-gold-200"
        >
          {t('how_to_make_it')}
        </Button>
        
        <RecipeInstructions 
          ingredientsKey={recipe.ingredientsKey}
          instructionsKey={recipe.instructionsKey}
          isVisible={showInstructions === recipe.id}
        />
      </div>
    </div>
  );
};

export default RecipeCard;
