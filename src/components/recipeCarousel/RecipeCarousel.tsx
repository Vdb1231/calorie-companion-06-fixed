
import React, { useState } from 'react';
import { useTranslation } from '@/contexts/LanguageContext';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext 
} from '@/components/ui/carousel';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import RecipeCard from './RecipeCard';
import { recipes } from './recipeData';
import { useCarouselTimer } from './useCarouselTimer';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

const RecipeCarousel: React.FC = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [showInstructions, setShowInstructions] = useState<number | null>(null);
  const isMobile = useIsMobile();

  const goToPrevSlide = () => {
    const newIndex = activeIndex === 0 ? recipes.length - 1 : activeIndex - 1;
    setActiveIndex(newIndex);
  };

  const goToNextSlide = () => {
    const newIndex = activeIndex === recipes.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(newIndex);
  };

  const { resetTimer, pauseTimer, resumeTimer } = useCarouselTimer({
    onSlideChange: goToNextSlide
  });

  const toggleInstructions = (recipeId: number) => {
    if (showInstructions === recipeId) {
      setShowInstructions(null);
    } else {
      setShowInstructions(recipeId);
    }
    resetTimer();
  };

  return (
    <section className="py-8 md:py-16 bg-white">
      <div className="container mx-auto px-3 md:px-6">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">
            {t('recipe_ideas')}
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto px-2">
            {t('boost_protein')}
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <Carousel 
            className="w-full"
            onMouseEnter={pauseTimer}
            onMouseLeave={resumeTimer}
          >
            <CarouselContent>
              {recipes.map((recipe, index) => (
                <CarouselItem key={recipe.id} className={index === activeIndex ? "block" : "hidden"}>
                  <RecipeCard 
                    recipe={recipe} 
                    showInstructions={showInstructions} 
                    toggleInstructions={toggleInstructions} 
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Custom navigation buttons styled for mobile and desktop */}
            <button 
              onClick={() => {
                goToPrevSlide();
                resetTimer();
              }}
              className={cn(
                "absolute top-1/2 -translate-y-1/2 bg-rose-gold-50 hover:bg-rose-gold-100 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-sm transition-all duration-200 z-10",
                isMobile ? "-left-2 sm:-left-4" : "-left-6 md:-left-12 lg:-left-16"
              )}
              aria-label={t('previous_recipe')}
            >
              <ArrowLeft className="h-5 w-5 text-rose-gold-700" />
            </button>
            
            <button 
              onClick={() => {
                goToNextSlide();
                resetTimer();
              }}
              className={cn(
                "absolute top-1/2 -translate-y-1/2 bg-rose-gold-50 hover:bg-rose-gold-100 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-sm transition-all duration-200 z-10",
                isMobile ? "-right-2 sm:-right-4" : "-right-6 md:-right-12 lg:-right-16"
              )}
              aria-label={t('next_recipe')}
            >
              <ArrowRight className="h-5 w-5 text-rose-gold-700" />
            </button>
          </Carousel>
        </div>
        
        {/* Recipe navigation indicator buttons */}
        <div className="mt-6 md:mt-8 flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
          {recipes.map((recipe, index) => (
            <button
              key={recipe.id}
              onClick={() => {
                setActiveIndex(index);
                setShowInstructions(null);
                resetTimer();
              }}
              className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-200 ${
                activeIndex === index 
                ? 'bg-rose-gold-500 scale-125' 
                : 'bg-rose-gold-200 hover:bg-rose-gold-300'
              }`}
              aria-label={`Go to recipe ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecipeCarousel;
