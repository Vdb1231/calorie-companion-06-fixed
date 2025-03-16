
import React from 'react';
import { Clock, Users } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';
import { RecipeMetaProps } from './types';

const RecipeMeta: React.FC<RecipeMetaProps> = ({ 
  prepKey, 
  cookKey, 
  servingsKey, 
  caloriesKey, 
  proteinKey 
}) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center text-sm text-foreground/70">
          <Clock size={16} className="mr-1" />
          <span>{t('preparation_time')}: {t(prepKey)} {t('min')}</span>
        </div>
        <div className="flex items-center text-sm text-foreground/70">
          <Users size={16} className="mr-1" />
          <span>{t('servings')}: {t(servingsKey)}</span>
        </div>
      </div>
      
      <div className="flex justify-between text-sm mb-4">
        <span className="text-rose-gold-600">{t(caloriesKey)} {t('calories')}</span>
        <span className="font-medium">{t(proteinKey)} {t('protein')}</span>
      </div>
    </>
  );
};

export default RecipeMeta;
