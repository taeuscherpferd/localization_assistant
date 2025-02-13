import axios from "axios";
import { TranslationItem } from "src/types/models/TranslationItem";

const googleTranslateEndpoint = "https://translation.googleapis.com/language/translate/v2?key=";

// Get the Auth Token from somewhere else in the future
export const BatchLocalizeWithGoogleTranslate = async (text: string, languageCodes: string[], authToken: string): Promise<Array<TranslationItem>> => {
  const results = new Array<TranslationItem>()
  for (const languageCode of languageCodes) {
    const reqString = `${googleTranslateEndpoint}${authToken}&q=${encodeURI(text)}&source=en&target=${languageCode}`;
    try {
      const res = (await axios.get(reqString)).data ;
      if (res)
      results.push({ languageCode: languageCode, translation: res.data.translations[0].translatedText });
    }
    catch (err) {
      alert(err);
    }
  }

  return results;
}