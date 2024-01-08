import database from './database.js';

export function loadPromptById(id) {
  return database.all(`
SELECT *
FROM prompt
where id = :id`, { id })
    .then( rows => rows[0] );
}

export function loadAllLanguages() {
  return database.all(`
SELECT *
FROM language`
  );
}

export function loadAllPrompts() {
  return database.all(`
SELECT *
FROM prompt`
  );
}

export async function loadAllTranslations() {
  const tables = await loadTranslationTables();

  const tableSqls = tables.map( name => `
SELECT '${name}' as \`set\`, id, 0 as languageId, value
  FROM ${name}
UNION ALL 
SELECT '${name}' as \`set\`, id, languageId, value
  from ${name}_translation
`);

  const sql = tableSqls.join('UNION ALL');
  return database.all(sql);
}

export function loadTranslationTables() {
  return database.all(`
SELECT tableName
FROM translation_table`)
    .then( rows => rows.map( row => row.tableName ));
}

export async function updatePrompt(args) {
  const { id, tag, value } = args;
  const returnedId = await database.upsert('prompt', { id, tag, value });
  return loadPromptById(returnedId);
}
