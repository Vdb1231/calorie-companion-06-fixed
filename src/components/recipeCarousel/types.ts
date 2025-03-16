
import { TranslationKey } from '@/translations/types';

// Define recipe type
export interface Recipe {
  id: number;
  image: string;
  titleKey: TranslationKey;
  descKey: TranslationKey;
  ingredientsKey: TranslationKey;
  instructionsKey: TranslationKey;
  prepKey: TranslationKey;
  cookKey: TranslationKey;
  servingsKey: TranslationKey;
  caloriesKey: TranslationKey;
  proteinKey: TranslationKey;
}

export interface RecipeMetaProps {
  prepKey: TranslationKey;
  cookKey: TranslationKey;
  servingsKey: TranslationKey;
  caloriesKey: TranslationKey;
  proteinKey: TranslationKey;
}
