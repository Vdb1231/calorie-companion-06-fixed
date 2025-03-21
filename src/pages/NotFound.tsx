
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">{t('page_not_found')}</p>
        <Link to="/">
          <Button className="bg-rose-gold-500 hover:bg-rose-gold-600 text-white">
            {t('back_to_home')}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
