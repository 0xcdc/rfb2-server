import database, { whereClause } from './database.js';

const English = 0;

export function loadAllLanguages() {
  return database.all(`
SELECT *
FROM language`
  );
}

async function validateSet(set) {
  const validSets = await loadTranslationTables();
  if (!validSets.some( s => s == set)) {
    throw Error(`invalid set: ${set}`);
  }
}

async function loadTranslation({ set, id, languageId }) {
  // security check
  // - ensure that the specified 'set' (aka tablename) is one of the tables allowed
  // security check
  await validateSet(set);
  const [languageField, tableName, filters] = languageId == English ?
    [
      `${English} as languageId`,
      set,
      { id },
    ] :
    [
      'languageId',
      `${set}_translation`,
      { id, languageId },
    ];

  const sql = `
SELECT :set as \`set\`, id, ${languageField}, value
FROM ${tableName}
${whereClause(filters)}`;

  return database.all(sql, { ...filters, set }).then( rows => rows?.[0] );
}

export async function loadAllTranslations() {
  const tables = await loadTranslationTables();

  const tableSqls = tables
    .filter( t => t != 'prompt')
    .map( name => `
SELECT '${name}' as \`set\`, '' as tag, id, ${English} as languageId, value
  FROM ${name}
UNION ALL
SELECT '${name}' as \`set\`, '' as tag, id, languageId, value
  from ${name}_translation
`);

  const promptSql = `
SELECT 'prompt' as \`set\`, tag, id, ${English} as languageId, value
  FROM prompt
UNION ALL
SELECT 'prompt' as \`set\`, tag, pt.id, pt.languageId, pt.value
  from prompt_translation pt
  join prompt p
    on p.id = pt.id
`;

  tableSqls.push(promptSql);

  const sql = tableSqls.join('UNION ALL') + `
order by \`set\`, languageId, id`;
  return database.all(sql);
}

export function loadTranslationTables() {
  return database.all(`
SELECT tableName
FROM translation_table`)
    .then( rows => rows.map( row => row.tableName ));
}

export async function updateTranslation({ translation }) {
  const { id, set, languageId, value } = translation;

  // security check
  // - ensure that the specified 'set' (aka tablename) is one of the tables allowed
  // security check
  await validateSet(set);

  const keys = { id };
  if (languageId != English) {
    keys.languageId = languageId;
  }

  const tableName = languageId == English ? set : `${set}_translation`;
  if (value == '' || value == null) {
    // we're actually deleting the translation
    if (languageId == English) {
      throw Error('cannot delete an English translation');
    }

    return database.execute(`
delete
  from translation
  where id = {id}
    and languageId = {languageId}`, keys).then( () => null);
  } else {
    const values = { value };

    // we can't upsert english b/c we don't have the tag,
    // OTOH, we don't need to upsert english b/c we know it always exists
    // so we can just update it
    await languageId == English ?
      database.update(tableName, keys, values) :
      database.upsert(tableName, { ...keys, ...values });
    const updatedTranslation = loadTranslation({ set, id, languageId });
    return updatedTranslation;
  }
}
