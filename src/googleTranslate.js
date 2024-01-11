import pkg from '@google-cloud/translate';
const { Translate } = pkg.v2;
const translate = new Translate();

export function googleTranslate({ value, code }) {
  return translate
    .translate(value, code)
    .then( v => v[0] );
}
