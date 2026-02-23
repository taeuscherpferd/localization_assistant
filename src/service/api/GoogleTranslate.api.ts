import axios from "axios";
import { TranslationItem } from "src/types/models/TranslationItem";

const googleTranslateEndpoint = "https://translation.googleapis.com/language/translate/v2?key=";

interface GoogleMappedTranslation {
  googleLanguageCode: string;
  originalLanguageCodes: string[];
}

const htmlDecoder = document.createElement("textarea");

const cleanReturnedTranslation = (text: string): string => {
  // Decode HTML entities like &#39; &quot; &amp; etc.
  htmlDecoder.innerHTML = text;
  return htmlDecoder.value;
}

// Get the Auth Token from somewhere else in the future
export const BatchLocalizeWithGoogleTranslate = async (text: string, sourceLanguage: string, languageCodes: string[], authToken: string): Promise<Array<TranslationItem>> => {
  const results = new Array<TranslationItem>()
  const googleFriendlyLanguageCodes = mapLanguageCodesToGoogleTranslateCodes(languageCodes).filter(code => code.googleLanguageCode !== sourceLanguage);

  for (const languageCode of googleFriendlyLanguageCodes) {
    const requestUrl = new URL(googleTranslateEndpoint);
    requestUrl.searchParams.append("key", authToken);
    requestUrl.searchParams.append("q", text);
    requestUrl.searchParams.append("source", sourceLanguage);
    requestUrl.searchParams.append("target", languageCode.googleLanguageCode);

    try {
      const res = (await axios.get(requestUrl.toString())).data;
      if (res) {
        languageCode.originalLanguageCodes.forEach(code => {
          results.push({ languageCode: code, translation: cleanReturnedTranslation(res.data.translations[0].translatedText) });
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
  const grouped = languageCodes.reduce((acc, code) => {
    const googleCode = code.slice(0, 2);
    const arr = acc.get(googleCode);
    if (arr) arr.push(code);
    else acc.set(googleCode, [code]);
    return acc;
  }, new Map<string, string[]>());

  return Array.from(grouped, ([googleLanguageCode, originalLanguageCodes]) => ({
    googleLanguageCode,
    originalLanguageCodes,
  }));
};
