import { useCallback, useState } from 'react';
import { BatchLocalizeWithGoogleTranslate } from 'src/service/api/GoogleTranslate.api';
import { TranslationItem } from 'src/types/models/TranslationItem';

export const useFetchTranslationsFromAPI = (languageCodes: string[], authToken: string) => {
  const [translatedItems, setTranslatedItems] = useState<TranslationItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const updateTranslation = (updatedItem: TranslationItem) => {
    setTranslatedItems((prev) =>
      prev.map((item) =>
        item.languageCode === updatedItem.languageCode ? updatedItem : item
      )
    );
  }

  const localizeString = useCallback(async (text: string) => {
    const fetchTranslations = async () => {
      try {
        setLoading(true);
        const data: TranslationItem[] = await BatchLocalizeWithGoogleTranslate(text, "en", languageCodes, authToken);
        setTranslatedItems(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTranslations();
  }, [languageCodes, authToken]);

  return { translatedItems, updateTranslation, localizeString, loading, error };
};