
import React from 'react';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Globe } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';

const LanguageSelector = () => {
  const { language, setLanguage, languageMap } = useLanguage();
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-2">
      <Globe size={16} className="text-foreground/70" />
      <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
        <SelectTrigger className="h-8 w-[120px] border-none bg-transparent hover:bg-background/10">
          <SelectValue placeholder={t('language')} />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(languageMap).map(([code, name]) => (
            <SelectItem key={code} value={code}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
