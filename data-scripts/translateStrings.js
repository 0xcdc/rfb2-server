// Imports the Google Cloud client library
import { graphQL } from '../src/fetch.js';
import pkg from '@google-cloud/translate';
const { Translate } = pkg.v2;
// Creates a client
const translate = new Translate();

async function translateText() {
  const { languages } = (await graphQL('{ languages { id name code}}')).data;
  const { translations } = (await graphQL('{translations {id set languageId value}}')).data;
  const englishTranslations = translations
    .filter(t => t.languageId == 0);

  console.log('export const translations = [');
  for (let i = 1; i < languages.length; i++) {
    const l = languages[i];
    // only translate the english strings if there's not already a translation in that language
    const stringsToTranslate = englishTranslations
      .filter(s => !translations.some(t => t.id == s.id && t.languageId == i));
    const englishStrings = stringsToTranslate.map( t => t.value);
    if (englishStrings.length > 0) {
      const [translatedStrings] = await translate.translate(englishStrings, l.code);
      stringsToTranslate.forEach( (t, i) => {
        console.log( [t.id, t.set, l.id, translatedStrings[i]], ',');
      });
    }
  }
  console.log('];');
}

translateText();
