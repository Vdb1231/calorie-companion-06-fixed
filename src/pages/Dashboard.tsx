
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import CircularProgress from '@/components/ui/CircularProgress';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Award, TrendingUp, Utensils, Flame } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';

// Mock data for the charts
const calorieData = [
  { day: 'Mon', calories: 1950 },
  { day: 'Tue', calories: 2100 },
  { day: 'Wed', calories: 1750 },
  { day: 'Thu', calories: 2200 },
  { day: 'Fri', calories: 1850 },
  { day: 'Sat', calories: 2300 },
  { day: 'Sun', calories: 2000 },
];

const macroData = [
  { name: 'Protein', value: 95, color: '#F59E0B' },
  { name: 'Carbs', value: 130, color: '#10B981' },
  { name: 'Fat', value: 65, color: '#6366F1' },
];

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t('dashboard_title')}</h1>
        <p className="text-foreground/70">
          {t('dashboard_subtitle')}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Daily Calories */}
        <Card className="bg-white/80 backdrop-blur-sm border-amber-100 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground/70 flex items-center gap-2">
              <Flame size={16} className="text-amber-500" /> {t('daily_calories')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,950</div>
            <p className="text-foreground/70 text-sm mt-1">
              <span className="text-emerald-500 font-medium">-250</span> {t('from_target')}
            </p>
          </CardContent>
        </Card>

        {/* Weekly Average */}
        <Card className="bg-white/80 backdrop-blur-sm border-amber-100 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground/70 flex items-center gap-2">
              <TrendingUp size={16} className="text-amber-500" /> {t('weekly_average')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2,021</div>
            <p className="text-foreground/70 text-sm mt-1">
              {t('calories_per_day')}
            </p>
          </CardContent>
        </Card>

        {/* Protein Goal */}
        <Card className="bg-white/80 backdrop-blur-sm border-amber-100 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground/70 flex items-center gap-2">
              <Award size={16} className="text-amber-500" /> {t('protein_goal')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">95g</div>
            <p className="text-foreground/70 text-sm mt-1">
              <span className="text-emerald-500 font-medium">112%</span> {t('of_target')}
            </p>
          </CardContent>
        </Card>

        {/* Meals Logged */}
        <Card className="bg-white/80 backdrop-blur-sm border-amber-100 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground/70 flex items-center gap-2">
              <Utensils size={16} className="text-amber-500" /> {t('meals_logged')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">21</div>
            <p className="text-foreground/70 text-sm mt-1">
              {t('this_week')}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="calories" className="mb-8">
        <TabsList className="bg-amber-100 text-amber-900">
          <TabsTrigger value="calories">{t('calories')}</TabsTrigger>
          <TabsTrigger value="macros">Macros</TabsTrigger>
          <TabsTrigger value="nutrients">Nutrients</TabsTrigger>
        </TabsList>
        
        {/* Calories Tab */}
        <TabsContent value="calories" className="mt-6">
          <Card className="bg-white/80 backdrop-blur-sm border-amber-100 shadow-sm">
            <CardHeader>
              <CardTitle>{t('weekly_calorie_intake')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={calorieData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <XAxis dataKey="day" tick={{ fill: '#78716c' }} />
                    <YAxis tick={{ fill: '#78716c' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        borderRadius: '8px', 
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        border: '1px solid #fcd34d'
                      }} 
                    />
                    <Bar 
                      dataKey="calories" 
                      fill="#F59E0B" 
                      radius={[4, 4, 0, 0]}
                      barSize={40}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Macros Tab */}
        <TabsContent value="macros" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm border-amber-100 shadow-sm">
              <CardHeader>
                <CardTitle>{t('macro_distribution')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={macroData}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={120}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${t(name.toLowerCase() as any)} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {macroData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`${value}g`, 'Amount']}
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          borderRadius: '8px', 
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                          border: '1px solid #fcd34d'
                        }} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-sm border-amber-100 shadow-sm">
              <CardHeader>
                <CardTitle>{t('daily_macro_goals')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                  <CircularProgress 
                    value={95} 
                    max={85} 
                    label={t('protein')} 
                    valueLabel="95g / 85g"
                    color="#F59E0B"
                  />
                  <CircularProgress 
                    value={130} 
                    max={150} 
                    label={t('carbs')} 
                    valueLabel="130g / 150g"
                    color="#10B981"
                  />
                  <CircularProgress 
                    value={65} 
                    max={70} 
                    label={t('fat')} 
                    valueLabel="65g / 70g"
                    color="#6366F1"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Nutrients Tab */}
        <TabsContent value="nutrients" className="mt-6">
          <Card className="bg-white/80 backdrop-blur-sm border-amber-100 shadow-sm">
            <CardHeader>
              <CardTitle>{t('weekly_nutrient_averages')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-4">
                <CircularProgress 
                  value={75} 
                  max={100} 
                  label={t('fiber')} 
                  valueLabel="18g / 24g"
                  color="#F97316"
                  size={140}
                />
                <CircularProgress 
                  value={60} 
                  max={100} 
                  label={t('calcium')} 
                  valueLabel="720mg / 1200mg"
                  color="#8B5CF6"
                  size={140}
                />
                <CircularProgress 
                  value={85} 
                  max={100} 
                  label={t('iron')} 
                  valueLabel="17mg / 20mg"
                  color="#EF4444"
                  size={140}
                />
                <CircularProgress 
                  value={90} 
                  max={100} 
                  label={t('vitamin_c')} 
                  valueLabel="81mg / 90mg"
                  color="#10B981"
                  size={140}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Weekly Summary */}
      <Card className="bg-white/80 backdrop-blur-sm border-amber-100 shadow-sm mb-8">
        <CardHeader>
          <CardTitle>{t('weekly_nutrition_summary')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-amber-100">
                  <th className="text-left py-3 px-4 font-medium text-foreground/70">{t('day')}</th>
                  <th className="text-right py-3 px-4 font-medium text-foreground/70">{t('calories')}</th>
                  <th className="text-right py-3 px-4 font-medium text-foreground/70">{t('protein')} (g)</th>
                  <th className="text-right py-3 px-4 font-medium text-foreground/70">{t('carbs')} (g)</th>
                  <th className="text-right py-3 px-4 font-medium text-foreground/70">{t('fat')} (g)</th>
                </tr>
              </thead>
              <tbody>
                {calorieData.map((day) => (
                  <tr key={day.day} className="border-b border-amber-50 hover:bg-amber-50/50 transition-colors">
                    <td className="py-3 px-4">{day.day}</td>
                    <td className="text-right py-3 px-4">{day.calories}</td>
                    <td className="text-right py-3 px-4">{Math.round(day.calories * 0.25 / 4)}</td>
                    <td className="text-right py-3 px-4">{Math.round(day.calories * 0.5 / 4)}</td>
                    <td className="text-right py-3 px-4">{Math.round(day.calories * 0.25 / 9)}</td>
                  </tr>
                ))}
                <tr className="bg-amber-50">
                  <td className="py-3 px-4 font-medium">{t('average')}</td>
                  <td className="text-right py-3 px-4 font-medium">
                    {Math.round(calorieData.reduce((acc, day) => acc + day.calories, 0) / calorieData.length)}
                  </td>
                  <td className="text-right py-3 px-4 font-medium">95</td>
                  <td className="text-right py-3 px-4 font-medium">130</td>
                  <td className="text-right py-3 px-4 font-medium">65</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
