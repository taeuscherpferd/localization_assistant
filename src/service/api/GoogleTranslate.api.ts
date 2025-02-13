import axios from "axios";
import { TranslationItem } from "src/types/models/TranslationItem";

const googleTranslateEndpoint = "https://translation.googleapis.com/language/translate/v2?key=";

interface GoogleMappedTranslation {
  googleLanguageCode: string;
  originalLanguageCodes: string[];
}

// Get the Auth Token from somewhere else in the future
export const BatchLocalizeWithGoogleTranslate = async (text: string, sourceLanguage: string, languageCodes: string[], authToken: string): Promise<Array<TranslationItem>> => {
  const results = new Array<TranslationItem>()
  const googleFriendlyLanguageCodes = mapLanguageCodesToGoogleTranslateCodes(languageCodes).filter(code => code.googleLanguageCode !== sourceLanguage);

  for (const languageCode of googleFriendlyLanguageCodes) {
    const reqString = `${googleTranslateEndpoint}${authToken}&q=${encodeURI(text)}&source=en&target=${languageCode.googleLanguageCode}`;
    try {
      const res = (await axios.get(reqString)).data;
      if (res) {
        languageCode.originalLanguageCodes.forEach(code => {
          results.push({ languageCode: code, translation: res.data.translations[0].translatedText });
        });
      }
    }
    catch (err) {
      alert(err);
    }
  }

  return results;
}

//FIXME: This is hacky and won't work for every project
const mapLanguageCodesToGoogleTranslateCodes = (languageCodes: string[]): GoogleMappedTranslation[] => {
  const googleMappedTranslations: GoogleMappedTranslation[] = [];

  languageCodes.forEach(code => {
    const googleCode = code.slice(0, 2);
    const existingMapping = googleMappedTranslations.find(mapping => mapping.googleLanguageCode === googleCode);

    if (existingMapping) {
      existingMapping.originalLanguageCodes.push(code);
    } else {
      googleMappedTranslations.push({
        googleLanguageCode: googleCode,
        originalLanguageCodes: [code]
      });
    }
  });

  return googleMappedTranslations;
};
