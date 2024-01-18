// Imports the Google Cloud client library
import { graphQL } from './src/fetch.js';
import pkg from '@google-cloud/translate';
const { Translate } = pkg.v2;
// Creates a client
const translate = new Translate();

async function translateText() {
  const languages = await graphQL('{ languages { id name code}}', 'languages');
  const translations = await graphQL('{translations {id set languageId value}}', 'translations');
  const englishTranslations = translations
    .filter(t => t.languageId == 0);

  const englishStrings = englishTranslations.map( t => t.value);

  for (let i = 1; i < languages.length; i++) {
    const l = languages[i];
    const [translations] = await translate.translate(englishStrings, l.code);
    englishTranslations.forEach( (t, i) => {
      console.log( [t.id, t.set, l.id, translations[i]]);
    });
  }
}

translateText();
