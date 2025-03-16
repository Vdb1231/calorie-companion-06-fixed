
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronRight, BarChart3, Utensils, MessageSquare, Zap, Star, Shield, Droplet, Clock, Brain } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';
import RecipeCarousel from '@/components/RecipeCarousel';

const Index = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-rose-gold-50 via-white to-rose-gold-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-8 text-center lg:text-left animate-fade-in">
              <div className="inline-block px-3 py-1 rounded-full bg-rose-gold-100 text-rose-gold-800 text-sm font-medium">
                {t('ai_powered')}
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
                {t('hero_title')}
              </h1>
              
              <p className="text-xl text-foreground/80 max-w-xl mx-auto lg:mx-0">
                {t('hero_subtitle')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/auth?tab=signup">
                  <Button className="btn-gold h-12 px-6 text-base">
                    {t('start_your_journey')}
                    <ChevronRight size={18} className="ml-1" />
                  </Button>
                </Link>
                <Button variant="outline" className="h-12 px-6 text-base border-rose-gold-200 text-rose-gold-700 hover:bg-rose-gold-50">
                  {t('watch_demo')}
                </Button>
              </div>
              
              <div className="pt-4 text-foreground/60 text-sm">
                {t('no_credit_card')}
              </div>
            </div>
            
            <div className="flex-1 max-w-xl glass p-1 rounded-2xl animate-scale-in">
              <div className="bg-white rounded-xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                  alt="BeastCal App Preview" 
                  className="w-full h-auto rounded-t-xl" 
                />
                <div className="p-6">
                  <div className="text-sm text-foreground/70 mb-2">{t('daily_macro_goals')}</div>
                  <div className="grid grid-cols-3 gap-4 text-center mb-6">
                    <div className="bg-rose-gold-50 p-3 rounded-lg">
                      <div className="text-rose-gold-600 font-semibold text-xl">1,850</div>
                      <div className="text-xs text-foreground/70">{t('calories')}</div>
                    </div>
                    <div className="bg-rose-gold-50 p-3 rounded-lg">
                      <div className="text-rose-gold-600 font-semibold text-xl">95g</div>
                      <div className="text-xs text-foreground/70">{t('protein')}</div>
                    </div>
                    <div className="bg-rose-gold-50 p-3 rounded-lg">
                      <div className="text-rose-gold-600 font-semibold text-xl">120g</div>
                      <div className="text-xs text-foreground/70">{t('carbs')}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recipe Carousel Section */}
      <RecipeCarousel />

      {/* Features Section */}
      <section id="features" className="py-20 bg-rose-gold-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('features')}
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              {t('ai_powered')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards */}
            <div className="bg-white border border-rose-gold-100 rounded-xl p-6 transition-all duration-300 hover:shadow-md">
              <div className="w-12 h-12 bg-rose-gold-100 text-rose-gold-700 rounded-lg flex items-center justify-center mb-4">
                <Utensils size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('instant_meal_analysis')}</h3>
              <p className="text-foreground/70">
                {t('instant_meal_analysis_desc')}
              </p>
            </div>
            
            <div className="bg-white border border-rose-gold-100 rounded-xl p-6 transition-all duration-300 hover:shadow-md">
              <div className="w-12 h-12 bg-rose-gold-100 text-rose-gold-700 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('visualized_progress')}</h3>
              <p className="text-foreground/70">
                {t('visualized_progress_desc')}
              </p>
            </div>
            
            <div className="bg-white border border-rose-gold-100 rounded-xl p-6 transition-all duration-300 hover:shadow-md">
              <div className="w-12 h-12 bg-rose-gold-100 text-rose-gold-700 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('nutrition_assistant_title')}</h3>
              <p className="text-foreground/70">
                {t('nutrition_assistant_desc')}
              </p>
            </div>
            
            <div className="bg-white border border-rose-gold-100 rounded-xl p-6 transition-all duration-300 hover:shadow-md">
              <div className="w-12 h-12 bg-rose-gold-100 text-rose-gold-700 rounded-lg flex items-center justify-center mb-4">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('real_time_updates')}</h3>
              <p className="text-foreground/70">
                {t('real_time_updates_desc')}
              </p>
            </div>
            
            <div className="bg-white border border-rose-gold-100 rounded-xl p-6 transition-all duration-300 hover:shadow-md">
              <div className="w-12 h-12 bg-rose-gold-100 text-rose-gold-700 rounded-lg flex items-center justify-center mb-4">
                <Star size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('protein_optimization')}</h3>
              <p className="text-foreground/70">
                {t('protein_optimization_desc')}
              </p>
            </div>
            
            <div className="bg-white border border-rose-gold-100 rounded-xl p-6 transition-all duration-300 hover:shadow-md">
              <div className="w-12 h-12 bg-rose-gold-100 text-rose-gold-700 rounded-lg flex items-center justify-center mb-4">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('nutritional_guidance')}</h3>
              <p className="text-foreground/70">
                {t('nutritional_guidance_desc')}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('how_it_works')}
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              {t('three_steps')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-rose-gold-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('describe_meal')}</h3>
              <p className="text-foreground/70">
                {t('describe_meal_desc')}
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-rose-gold-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('ai_analysis')}</h3>
              <p className="text-foreground/70">
                {t('ai_analysis_desc')}
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-rose-gold-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('track_learn')}</h3>
              <p className="text-foreground/70">
                {t('track_learn_desc')}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-rose-gold-500 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('transform_tracking')}
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
            {t('join_users')}
          </p>
          <Link to="/auth?tab=signup">
            <Button className="bg-white text-rose-gold-600 hover:bg-white/90 h-12 px-8 text-base rounded-lg">
              {t('start_trial')}
            </Button>
          </Link>
          <p className="mt-4 text-white/70 text-sm">
            {t('no_credit_card')} • {t('cancel_anytime')}
          </p>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 bg-white border-t border-rose-gold-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="bg-rose-gold-500 text-white p-2 rounded-lg">
                <Utensils size={20} />
              </div>
              <span className="text-lg font-semibold">BeastCal</span>
            </div>
            
            <div className="flex gap-8 text-sm text-foreground/70">
              <a href="#" className="hover:text-rose-gold-500">Privacy Policy</a>
              <a href="#" className="hover:text-rose-gold-500">Terms of Service</a>
              <a href="#" className="hover:text-rose-gold-500">Contact</a>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-foreground/60">
            © {new Date().getFullYear()} BeastCal. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
