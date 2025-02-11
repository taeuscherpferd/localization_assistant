import { useEffect, useState } from 'react';
import { TranslationItem } from 'src/types/models/TranslationItem';

// FIXME: Not implmented yet
export const useFetchTranslationsFromAPI = () => {
  const [translatedItems, setTranslations] = useState<TranslationItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const updateTranslation = (updatedItem: TranslationItem) => {
    setTranslations((prev) =>
      prev.map((item) =>
        item.languageCode === updatedItem.languageCode ? updatedItem : item
      )
    );
  }

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        setLoading(true);
        // Replace with your API endpoint
        // const response = (await axios.get('/api/translations')).data;
        // if (!response.ok) {
        //   throw new Error('Failed to fetch translations');
        // }
        const data: TranslationItem[] = [{languageCode: "de-DU", translation: "Richi! I ha gseit du sollsch dich halten!!!"}, {languageCode: "en-US", translation: "Richi! Behave yourself!"}]//response;
        setTranslations(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTranslations();
  }, []);

  return { translatedItems, updateTranslation, loading, error };
};