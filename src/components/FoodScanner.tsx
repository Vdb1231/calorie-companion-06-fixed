
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Camera, RefreshCw, AlertTriangle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useTranslation } from '@/contexts/LanguageContext';
import { startCamera, stopCamera, takePhoto } from '@/utils/cameraUtils';
import { supabase } from '@/integrations/supabase/client';

// Define the properties for the FoodScanner component
interface FoodScannerProps {
  onAddMeal: (nutritionData: {
    foodName: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    description: string;
  }) => void;
  onClose: () => void;
}

const FoodScanner: React.FC<FoodScannerProps> = ({ onAddMeal, onClose }) => {
  const { t } = useTranslation();
  const [cameraActive, setCameraActive] = useState(false);
  const [photoTaken, setPhotoTaken] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [supabaseError, setSupabaseError] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const photoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Check if Supabase is properly configured
    if (!supabase || !supabase.functions) {
      setSupabaseError(true);
      return;
    }
    
    // Cleanup camera when component unmounts
    return () => {
      if (cameraActive && videoRef.current) {
        stopCamera(videoRef);
        setCameraActive(false);
      }
    };
  }, [cameraActive]);

  const handleStartCamera = async () => {
    setError(null);
    try {
      await startCamera(videoRef);
      setCameraActive(true);
      setPhotoTaken(false);
    } catch (error) {
      setError(t('camera_access_failed'));
      console.error("Camera access error:", error);
    }
  };

  const handleTakePhoto = () => {
    setError(null);
    try {
      takePhoto(videoRef, canvasRef, photoRef);
      stopCamera(videoRef);
      setCameraActive(false);
      setPhotoTaken(true);
    } catch (error) {
      setError(t('capture_failed'));
      console.error("Photo capture error:", error);
    }
  };

  const handleRetake = async () => {
    setPhotoTaken(false);
    await handleStartCamera();
  };

  const handleAnalyzeFood = async () => {
    if (!photoTaken || !canvasRef.current) {
      return;
    }

    if (supabaseError) {
      toast({
        title: "Error",
        description: "Supabase is not properly configured. Please ensure the Supabase URL and key are set.",
        variant: "destructive",
      });
      return;
    }

    setAnalyzing(true);
    setError(null);

    try {
      // Convert canvas to blob
      const blob = await new Promise<Blob | null>((resolve) => {
        canvasRef.current?.toBlob((blob) => resolve(blob), 'image/jpeg', 0.95);
      });

      if (!blob) {
        throw new Error("Failed to convert image to blob");
      }

      // Create FormData with the image
      const formData = new FormData();
      formData.append('image', blob, 'food.jpg');

      // Call the Supabase Edge Function to analyze the food
      const { data, error } = await supabase.functions.invoke('analyze-food', {
        body: formData,
      });

      if (error) {
        throw error;
      }

      if (!data || !data.success) {
        throw new Error(data?.message || "Unknown analysis error");
      }

      // Show success message
      toast({
        title: t('analysis_complete'),
        description: `${data.foodName} - ${data.description}`,
      });

      // Add the meal with the analysis data
      onAddMeal({
        foodName: data.foodName,
        description: data.description,
        calories: data.calories,
        protein: data.protein,
        carbs: data.carbs,
        fat: data.fat
      });

    } catch (error) {
      console.error("Food analysis error:", error);
      setError(t('analysis_failed'));
      toast({
        title: "Analysis Failed",
        description: "Could not analyze the food image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setAnalyzing(false);
    }
  };

  // If there's a Supabase configuration error, show a message
  if (supabaseError) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{t('food_scanner')}</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <p className="text-lg font-medium mb-2">Supabase Configuration Error</p>
          <p className="text-muted-foreground mb-4">
            The food scanner requires proper Supabase configuration to function.
            Please ensure Supabase URL and API key are correctly set.
          </p>
          <Button variant="outline" onClick={onClose}>
            Close Scanner
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{t('food_scanner')}</CardTitle>
      </CardHeader>
      <CardContent>
        {!cameraActive && !photoTaken ? (
          <div className="text-center py-8">
            <Camera className="h-12 w-12 text-rose-gold-500 mx-auto mb-4" />
            <p className="text-lg font-medium mb-2">{t('scan_food')}</p>
            <p className="text-muted-foreground mb-4">
              {t('scanning_instructions')}
            </p>
            <Button onClick={handleStartCamera} className="bg-rose-gold-500 hover:bg-rose-gold-600 text-white">
              {t('start_camera')}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {cameraActive && (
              <>
                <div className="relative aspect-video mx-auto overflow-hidden rounded-lg border border-rose-gold-200">
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    muted 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <Button 
                    onClick={handleTakePhoto} 
                    className="bg-rose-gold-500 hover:bg-rose-gold-600 text-white"
                  >
                    {t('take_photo')}
                  </Button>
                </div>
              </>
            )}
            
            {photoTaken && (
              <>
                <div className="relative aspect-video mx-auto overflow-hidden rounded-lg border border-rose-gold-200">
                  <canvas 
                    ref={canvasRef} 
                    className="hidden"
                  />
                  <img 
                    ref={photoRef} 
                    alt="Captured food" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex justify-center gap-4">
                  <Button 
                    variant="outline" 
                    onClick={handleRetake}
                    disabled={analyzing}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    {t('retake')}
                  </Button>
                  <Button 
                    onClick={handleAnalyzeFood} 
                    className="bg-rose-gold-500 hover:bg-rose-gold-600 text-white"
                    disabled={analyzing}
                  >
                    {analyzing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t('analyzing')}
                      </>
                    ) : (
                      t('analyze_food')
                    )}
                  </Button>
                </div>
              </>
            )}
            
            {error && (
              <div className="text-red-500 text-center p-2 bg-red-50 rounded-md">
                <AlertTriangle className="h-4 w-4 inline mr-2" />
                {error}
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="outline" onClick={onClose} disabled={analyzing}>
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FoodScanner;
