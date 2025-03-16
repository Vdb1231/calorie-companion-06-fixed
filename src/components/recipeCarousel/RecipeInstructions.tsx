
import React from 'react';
import { useTranslation } from '@/contexts/LanguageContext';
import { TranslationKey } from '@/translations/types';

interface RecipeInstructionsProps {
  ingredientsKey: TranslationKey;
  instructionsKey: TranslationKey;
  isVisible: boolean;
}

const RecipeInstructions: React.FC<RecipeInstructionsProps> = ({ 
  ingredientsKey, 
  instructionsKey, 
  isVisible 
}) => {
  const { t } = useTranslation();

  if (!isVisible) {
    return null;
  }

  return (
    <div className="mt-4 p-4 bg-white rounded-lg border border-rose-gold-100 animate-fade-in">
      <div className="mb-3">
        <h4 className="font-semibold mb-2">{t('ingredients')}</h4>
        <div className="text-sm whitespace-pre-line">
          {t(ingredientsKey)}
        </div>
      </div>
      
      <div>
        <h4 className="font-semibold mb-2">{t('instructions')}</h4>
        <div className="text-sm whitespace-pre-line">
          {t(instructionsKey)}
        </div>
      </div>
    </div>
  );
};

export default RecipeInstructions;
