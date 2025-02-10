import { useEffect, useState } from 'react';
import { TranslationItem } from 'src/types/models/TranslationItem';

// FIXME: Not implmented yet
export const useFetchTranslationsFromAPI = () => {
  const [translatedItems, setTranslations] = useState<TranslationItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        setLoading(true);
        // Replace with your API endpoint
        // const response = (await axios.get('/api/translations')).data;
        // if (!response.ok) {
        //   throw new Error('Failed to fetch translations');
        // }
        const data: TranslationItem[] = []//response;
        setTranslations(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTranslations();
  }, []);

  return { translatedItems, loading, error };
};