import database from './database.js';

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
  const [languageField, tableName, languageFilter, params] = languageId == 0 ?
    [
      '0 as languageId',
      set,
      '',
      { id, set },
    ] :
    [
      'languageId',
      `${set}_translation`,
      'AND languageId = :languageId',
      { id, languageId, set },
    ];

  const sql = `
SELECT :set as \`set\`, id, ${languageField}, value
FROM ${tableName}
WHERE id = :id
${languageFilter}`;

  return database.all(sql, params).then( rows => rows?.[0] );
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

export async function updateTranslation(args) {
  const { id, set, languageId, value } = args;

  // security check
  // - ensure that the specified 'set' (aka tablename) is one of the tables allowed
  // security check
  await validateSet(set);

  const params = { id };
  if (languageId != 0) {
    params.languageId = languageId;
  }

  const tableName = languageId == 0 ? set : `${set}_translation`;
  if (value == '' || value == null) {
    // we're actually deleting the translation
    if (languageId == 0) {
      throw Error('cannot delete an English translation');
    }

    return database.delete(tableName, params).then( () => null);
  } else {
    params.value = value;

    await database.upsert(tableName, params);
    const updatedTranslation = loadTranslation({ set, id, languageId });
    return updatedTranslation;
  }
}
