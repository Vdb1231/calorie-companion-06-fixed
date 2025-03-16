
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Send, 
  Bot, 
  User2,
  Sparkles,
  RefreshCw,
  Lightbulb,
  BookOpen,
  CornerDownLeft,
  Loader2
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTranslation } from '@/contexts/LanguageContext';
import { useLanguage } from '@/contexts/LanguageContext';

// Define message type
interface Message {
  id: number;
  role: string;
  content: Record<string, string>;
  timestamp: Date;
}

// Mock chat messages data
const initialMessages: Message[] = [
  {
    id: 1,
    role: 'assistant',
    content: {
      en: "Hi there! I'm your nutrition assistant. I can help with meal planning, nutrition advice, and analyzing your eating habits. How can I help you today?",
      bg: "Здравей! Аз съм твоят хранителен асистент. Мога да помогна с планиране на храненето, съвети за хранене и анализ на хранителните ти навици. Как мога да ти помогна днес?",
      de: "Hallo! Ich bin dein Ernährungsassistent. Ich kann bei der Mahlzeitenplanung, Ernährungsberatung und Analyse deiner Essgewohnheiten helfen. Wie kann ich dir heute helfen?",
      es: "¡Hola! Soy tu asistente de nutrición. Puedo ayudarte con la planificación de comidas, consejos nutricionales y análisis de tus hábitos alimenticios. ¿Cómo puedo ayudarte hoy?",
      fr: "Bonjour ! Je suis votre assistant nutritionnel. Je peux vous aider à planifier vos repas, vous donner des conseils nutritionnels et analyser vos habitudes alimentaires. Comment puis-je vous aider aujourd'hui ?",
      it: "Ciao! Sono il tuo assistente nutrizionale. Posso aiutarti con la pianificazione dei pasti, consigli nutrizionali e l'analisi delle tue abitudini alimentari. Come posso aiutarti oggi?"
    },
    timestamp: new Date(new Date().setMinutes(new Date().getMinutes() - 1))
  }
];

// Mock suggestions by language
const getSuggestionsByLanguage = (language: string) => {
  const suggestions = {
    en: [
      "How can I improve my protein intake?",
      "Can you suggest a balanced meal plan for tomorrow?",
      "What nutrients am I missing based on my meal history?",
      "How can I reduce my carb intake without feeling hungry?"
    ],
    bg: [
      "Как мога да подобря приема си на протеини?",
      "Можеш ли да предложиш балансиран хранителен план за утре?",
      "Какви хранителни вещества ми липсват според историята на храненето ми?",
      "Как мога да намаля приема на въглехидрати без да се чувствам гладен?"
    ],
    de: [
      "Wie kann ich meine Proteinaufnahme verbessern?",
      "Kannst du einen ausgewogenen Mahlzeitenplan für morgen vorschlagen?",
      "Welche Nährstoffe fehlen mir basierend auf meinem Mahlzeitenverlauf?",
      "Wie kann ich meine Kohlenhydrataufnahme reduzieren, ohne hungrig zu sein?"
    ],
    es: [
      "¿Cómo puedo mejorar mi ingesta de proteínas?",
      "¿Puedes sugerir un plan de comidas equilibrado para mañana?",
      "¿Qué nutrientes me faltan según mi historial de comidas?",
      "¿Cómo puedo reducir mi ingesta de carbohidratos sin sentir hambre?"
    ],
    fr: [
      "Comment puis-je améliorer mon apport en protéines ?",
      "Pouvez-vous suggérer un plan de repas équilibré pour demain ?",
      "Quels nutriments me manquent-ils selon mon historique de repas ?",
      "Comment puis-je réduire mon apport en glucides sans avoir faim ?"
    ],
    it: [
      "Come posso migliorare l'assunzione di proteine?",
      "Puoi suggerire un piano alimentare equilibrato per domani?",
      "Quali nutrienti mi mancano in base alla mia cronologia dei pasti?",
      "Come posso ridurre l'assunzione di carboidrati senza sentirmi affamato?"
    ]
  };
  
  return suggestions[language as keyof typeof suggestions] || suggestions.en;
};

const Chat = () => {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState(getSuggestionsByLanguage(language));
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const { toast } = useToast();

  // Update suggestions when language changes
  useEffect(() => {
    setSuggestions(getSuggestionsByLanguage(language));
  }, [language]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: {
        en: input,
        bg: input,
        de: input,
        es: input,
        fr: input,
        it: input
      },
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      // Create mock response based on user input
      let responseContent: Record<string, string> = {};
      
      if (input.toLowerCase().includes('protein')) {
        responseContent = {
          en: "Based on your meal history, you're currently averaging about 95g of protein daily, which is good but slightly below your target of 120g. To increase your protein intake, consider adding more lean meats, Greek yogurt, cottage cheese, or a protein shake after workouts. Eggs, lentils, and quinoa are also excellent sources that can be incorporated into various meals.",
          bg: "Според историята на храненията ви, в момента приемате средно около 95 г протеин дневно, което е добре, но малко под целта ви от 120 г. За да увеличите приема на протеини, обмислете добавянето на повече нетлъсти меса, гръцко кисело мляко, извара или протеинов шейк след тренировки. Яйцата, лещата и киноата също са отлични източници, които могат да бъдат включени в различни ястия.",
          de: "Basierend auf deinem Mahlzeitenverlauf nimmst du derzeit durchschnittlich etwa 95 g Protein täglich zu dir, was gut ist, aber etwas unter deinem Ziel von 120 g liegt. Um deine Proteinaufnahme zu erhöhen, erwäge, mehr mageres Fleisch, griechischen Joghurt, Hüttenkäse oder einen Protein-Shake nach dem Training hinzuzufügen. Eier, Linsen und Quinoa sind auch ausgezeichnete Quellen, die in verschiedene Mahlzeiten integriert werden können.",
          es: "Según tu historial de comidas, actualmente estás consumiendo un promedio de aproximadamente 95 g de proteína al día, lo cual es bueno pero ligeramente por debajo de tu objetivo de 120 g. Para aumentar tu ingesta de proteínas, considera agregar más carnes magras, yogur griego, requesón o un batido de proteínas después de los entrenamientos. Los huevos, las lentejas y la quinoa también son excelentes fuentes que se pueden incorporar a varias comidas.",
          fr: "Selon votre historique de repas, vous consommez actuellement environ 95 g de protéines par jour en moyenne, ce qui est bien mais légèrement en dessous de votre objectif de 120 g. Pour augmenter votre apport en protéines, envisagez d'ajouter plus de viandes maigres, du yaourt grec, du fromage cottage ou un shake protéiné après l'entraînement. Les œufs, les lentilles et le quinoa sont également d'excellentes sources qui peuvent être incorporées dans divers repas.",
          it: "In base alla tua cronologia dei pasti, attualmente stai assumendo in media circa 95 g di proteine al giorno, il che è buono ma leggermente al di sotto del tuo obiettivo di 120 g. Per aumentare l'assunzione di proteine, considera di aggiungere più carni magre, yogurt greco, fiocchi di latte o un frullato proteico dopo gli allenamenti. Uova, lenticchie e quinoa sono anche ottime fonti che possono essere incorporate in vari pasti."
        };
      } else if (input.toLowerCase().includes('meal plan') || input.toLowerCase().includes('recipe')) {
        responseContent = {
          en: "Here's a balanced meal plan for tomorrow:\n\n• Breakfast: Spinach and feta omelet with whole grain toast\n• Snack: Greek yogurt with berries and a tablespoon of chia seeds\n• Lunch: Quinoa bowl with grilled chicken, roasted vegetables, and avocado\n• Snack: Apple with 1-2 tablespoons of almond butter\n• Dinner: Baked salmon with sweet potato and steamed broccoli\n\nThis provides approximately 1,900 calories with balanced macros: 120g protein, 180g carbs, and 65g healthy fats.",
          bg: "Ето балансиран хранителен план за утре:\n\n• Закуска: Омлет със спанак и фета със пълнозърнест хляб\n• Закуска: Гръцко кисело мляко с горски плодове и супена лъжица чия\n• Обяд: Купа с киноа с печено пиле, печени зеленчуци и авокадо\n• Закуска: Ябълка с 1-2 супени лъжици бадемово масло\n• Вечеря: Печена сьомга със сладък картоф и задушени броколи\n\nТова осигурява приблизително 1900 калории с балансирани макроси: 120г протеин, 180г въглехидрати и 65г здравословни мазнини.",
          de: "Hier ist ein ausgewogener Mahlzeitenplan für morgen:\n\n• Frühstück: Spinat-Feta-Omelett mit Vollkorntoast\n• Snack: Griechischer Joghurt mit Beeren und einem Esslöffel Chiasamen\n• Mittagessen: Quinoa-Schüssel mit gegrilltem Hähnchen, geröstetem Gemüse und Avocado\n• Snack: Apfel mit 1-2 Esslöffeln Mandelbutter\n• Abendessen: Gebackener Lachs mit Süßkartoffel und gedünstetem Brokkoli\n\nDies liefert ungefähr 1.900 Kalorien mit ausgewogenen Makros: 120g Protein, 180g Kohlenhydrate und 65g gesunde Fette.",
          es: "Aquí tienes un plan de comidas equilibrado para mañana:\n\n• Desayuno: Tortilla de espinacas y feta con tostada integral\n• Merienda: Yogur griego con bayas y una cucharada de semillas de chía\n• Almuerzo: Bol de quinoa con pollo a la parrilla, verduras asadas y aguacate\n• Merienda: Manzana con 1-2 cucharadas de mantequilla de almendras\n• Cena: Salmón al horno con batata y brócoli al vapor\n\nEsto proporciona aproximadamente 1,900 calorías con macros equilibrados: 120g de proteína, 180g de carbohidratos y 65g de grasas saludables.",
          fr: "Voici un plan de repas équilibré pour demain :\n\n• Petit-déjeuner : Omelette aux épinards et à la feta avec du pain grillé complet\n• Collation : Yaourt grec avec des baies et une cuillère à soupe de graines de chia\n• Déjeuner : Bol de quinoa avec du poulet grillé, des légumes rôtis et de l'avocat\n• Collation : Pomme avec 1-2 cuillères à soupe de beurre d'amande\n• Dîner : Saumon cuit au four avec patate douce et brocoli à la vapeur\n\nCela fournit environ 1 900 calories avec des macros équilibrés : 120g de protéines, 180g de glucides et 65g de graisses saines.",
          it: "Ecco un piano alimentare equilibrato per domani:\n\n• Colazione: Omelette con spinaci e feta con pane integrale tostato\n• Spuntino: Yogurt greco con bacche e un cucchiaio di semi di chia\n• Pranzo: Ciotola di quinoa con pollo alla griglia, verdure arrostite e avocado\n• Spuntino: Mela con 1-2 cucchiai di burro di mandorle\n• Cena: Salmone al forno con patata dolce e broccoli al vapore\n\nQuesto fornisce circa 1.900 calorie con macronutrienti bilanciati: 120g di proteine, 180g di carboidrati e 65g di grassi sani."
        };
      } else if (input.toLowerCase().includes('carb') || input.toLowerCase().includes('sugar')) {
        responseContent = {
          en: "To reduce carbs without feeling hungry, focus on replacing refined carbs with high-fiber vegetables and moderate amounts of protein and healthy fats. Try cauliflower rice instead of regular rice, zucchini noodles instead of pasta, and include healthy fats like avocados and nuts which help you feel full longer. Also, ensure you're drinking enough water as thirst is often mistaken for hunger.",
          bg: "За да намалите въглехидратите, без да се чувствате гладни, съсредоточете се върху заместването на рафинираните въглехидрати с високо съдържание на фибри зеленчуци и умерени количества протеини и здравословни мазнини. Опитайте ориз от карфиол вместо обикновен ориз, спагети от тиквички вместо паста и включете здравословни мазнини като авокадо и ядки, които помагат да се чувствате сити по-дълго време. Също така, уверете се, че пиете достатъчно вода, тъй като жаждата често се бърка с глад.",
          de: "Um Kohlenhydrate zu reduzieren, ohne Hunger zu verspüren, konzentriere dich darauf, raffinierte Kohlenhydrate durch ballaststoffreiche Gemüsesorten und moderate Mengen an Protein und gesunden Fetten zu ersetzen. Versuche Blumenkohlreis statt normalem Reis, Zucchininudeln statt Pasta und füge gesunde Fette wie Avocados und Nüsse hinzu, die dir helfen, länger satt zu bleiben. Stelle außerdem sicher, dass du genug Wasser trinkst, da Durst oft mit Hunger verwechselt wird.",
          es: "Para reducir los carbohidratos sin sentir hambre, concéntrate en reemplazar los carbohidratos refinados con verduras ricas en fibra y cantidades moderadas de proteínas y grasas saludables. Prueba el arroz de coliflor en lugar del arroz normal, los fideos de calabacín en lugar de la pasta, e incluye grasas saludables como aguacates y nueces que te ayudan a sentirte lleno por más tiempo. Además, asegúrate de beber suficiente agua, ya que la sed a menudo se confunde con el hambre.",
          fr: "Pour réduire les glucides sans avoir faim, concentrez-vous sur le remplacement des glucides raffinés par des légumes riches en fibres et des quantités modérées de protéines et de graisses saines. Essayez le riz de chou-fleur au lieu du riz ordinaire, les nouilles de courgettes au lieu des pâtes, et incluez des graisses saines comme les avocats et les noix qui vous aident à vous sentir rassasié plus longtemps. Assurez-vous également de boire suffisamment d'eau car la soif est souvent confondue avec la faim.",
          it: "Per ridurre i carboidrati senza sentire fame, concentrati sulla sostituzione dei carboidrati raffinati con verdure ricche di fibre e quantità moderate di proteine e grassi sani. Prova il riso di cavolfiore invece del riso normale, gli spaghetti di zucchine invece della pasta, e includi grassi sani come avocado e noci che ti aiutano a sentirti sazio più a lungo. Inoltre, assicurati di bere abbastanza acqua poiché la sete viene spesso scambiata per fame."
        };
      } else {
        responseContent = {
          en: "Thank you for your question. Based on your recent meal logs, I can see you've been consistent with your eating patterns. Your protein intake has been good, averaging around 95g daily. You could benefit from increasing your vegetable intake for more fiber and micronutrients. Would you like me to suggest some nutrient-dense vegetables that would complement your current diet?",
          bg: "Благодаря за въпроса ти. Според последните ти дневници на хранене, виждам, че си бил последователен в моделите си на хранене. Приемът ти на протеини е бил добър, средно около 95 г дневно. Би могъл да се възползваш от увеличаване на приема на зеленчуци за повече фибри и микроелементи. Искаш ли да ти предложа някои богати на хранителни вещества зеленчуци, които биха допълнили сегашната ти диета?",
          de: "Vielen Dank für deine Frage. Basierend auf deinen kürzlichen Mahlzeitenprotokollen kann ich sehen, dass du konsequent in deinen Essgewohnheiten bist. Deine Proteinaufnahme war gut, durchschnittlich etwa 95 g täglich. Du könntest davon profitieren, deinen Gemüsekonsum zu erhöhen, um mehr Ballaststoffe und Mikronährstoffe zu erhalten. Möchtest du, dass ich dir einige nährstoffreiche Gemüsesorten vorschlage, die deine aktuelle Ernährung ergänzen würden?",
          es: "Gracias por tu pregunta. Según tus registros recientes de comidas, puedo ver que has sido constante con tus patrones alimenticios. Tu ingesta de proteínas ha sido buena, con un promedio de alrededor de 95 g diarios. Podrías beneficiarte de aumentar tu consumo de verduras para obtener más fibra y micronutrientes. ¿Te gustaría que te sugiriera algunas verduras ricas en nutrientes que complementarían tu dieta actual?",
          fr: "Merci pour votre question. D'après vos journaux de repas récents, je peux voir que vous avez été cohérent dans vos habitudes alimentaires. Votre apport en protéines a été bon, avec une moyenne d'environ 95 g par jour. Vous pourriez bénéficier d'une augmentation de votre consommation de légumes pour plus de fibres et de micronutriments. Souhaitez-vous que je vous suggère des légumes riches en nutriments qui compléteraient votre régime alimentaire actuel ?",
          it: "Grazie per la tua domanda. In base ai tuoi recenti registri dei pasti, posso vedere che sei stato costante con i tuoi schemi alimentari. La tua assunzione di proteine è stata buona, con una media di circa 95 g al giorno. Potresti trarre beneficio dall'aumento dell'assunzione di verdure per più fibre e micronutrienti. Vorresti che ti suggerissi alcune verdure ricche di nutrienti che completerebbero la tua dieta attuale?"
        };
      }
      
      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: responseContent,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
      
      // Update suggestions based on the conversation
      setSuggestions(getSuggestionsByLanguage(language));
    }, 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const useSuggestion = (suggestion: string) => {
    setInput(suggestion);
  };

  // Helper to get the content based on current language
  const getLocalizedContent = (content: Record<string, string>) => {
    return content[language] || content.en;
  };

  return (
    <div className="container mx-auto h-[calc(100vh-180px)] flex flex-col animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{t('nutrition_assistant')}</h1>
        <p className="text-foreground/70">
          {t('get_personalized_advice')}
        </p>
      </div>
      
      <Card className="flex-1 flex flex-col shadow-sm border-amber-100 overflow-hidden">
        <CardHeader className="py-3 px-4 bg-amber-50 border-b border-amber-100">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 bg-amber-100">
              <AvatarFallback className="bg-amber-500 text-white">AI</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base">{t('nutrition_assistant')}</CardTitle>
              <p className="text-xs text-foreground/60">{t('powered_by')}</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`
                    max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 
                    ${message.role === 'user' 
                      ? 'bg-amber-500 text-white rounded-tr-none' 
                      : 'bg-gray-100 text-foreground rounded-tl-none'
                    }
                  `}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {message.role === 'assistant' ? (
                      <>
                        <Bot size={16} className="text-amber-500" />
                        <span className="font-medium text-sm">{t('nutrition_assistant')}</span>
                      </>
                    ) : (
                      <>
                        <User2 size={16} />
                        <span className="font-medium text-sm">You</span>
                      </>
                    )}
                  </div>
                  
                  <div className="whitespace-pre-line">
                    {getLocalizedContent(message.content)}
                  </div>
                  
                  <div className="mt-2 text-xs opacity-70 text-right">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 bg-gray-100 text-foreground rounded-tl-none">
                  <div className="flex items-center gap-2 mb-2">
                    <Bot size={16} className="text-amber-500" />
                    <span className="font-medium text-sm">{t('nutrition_assistant')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin" />
                    <span>{t('thinking')}</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        
        <div className="p-4 bg-gray-50 border-t border-amber-100">
          <div className="mb-3">
            <p className="text-xs text-foreground/60 mb-2">{t('suggested_questions')}:</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <Button 
                  key={index} 
                  variant="outline" 
                  size="sm" 
                  className="bg-white text-xs hover:bg-amber-50 border-amber-200"
                  onClick={() => useSuggestion(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t('ask_about_nutrition')}
              className="input-amber min-h-12 resize-none"
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={!input.trim() || isLoading}
              className="btn-amber h-12 px-4"
            >
              <Send size={18} />
            </Button>
          </div>
          
          <div className="mt-3 flex items-center justify-between">
            <div className="text-xs text-foreground/60 flex items-center gap-1">
              <Sparkles size={12} className="text-amber-500" />
              <span>{t('using_meal_history')}</span>
            </div>
            <Button 
              size="sm" 
              variant="ghost" 
              className="text-xs text-foreground/60 hover:text-foreground"
            >
              <RefreshCw size={12} className="mr-1" />
              {t('reset_conversation')}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Chat;
