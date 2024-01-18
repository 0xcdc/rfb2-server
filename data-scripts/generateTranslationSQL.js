import { translations } from './translations.js';

translations.forEach( ([id, set, languageId, value]) => {
  const sql = `
delete
  from ${set}_translation
  where id=${id}
    and languageId = ${languageId};


insert into ${set}_translation (id, languageId, value) values
  (${id}, ${languageId}, '${value.replace(/'/g, '\\’')}');
`;

  console.log(sql);
});
