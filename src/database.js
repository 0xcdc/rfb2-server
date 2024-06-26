import credentials from '../credentials.js';
import mysql from 'mysql2';

export function whereClause(whereFilters) {
  if (!whereFilters) return '';

  const cols = Object.keys(whereFilters);
  const whereClause = cols.length == 0 ?
    '' :
    `
WHERE ${cols.map( c => `${c} = :${c}`).join('\n    AND ')}`;
  return whereClause;
}

class LoggingConnection {
  constructor(conn) {
    if (!conn) throw Error('connection needed');
    this.connection = conn;
  }

  all(sql, params) {
    return this.execute(sql, params)
      .then( ([rows]) => rows);
  }

  beginTransaction() {
    console.log('-------BEGIN TRAN--------');
    return this.connection.beginTransaction();
  }

  commit() {
    console.log('--------COMMIT-----------');
    return this.connection.commit();
  }

  execute(sql, params) {
    const p = params || {};
    const logInfo = { sql, parameters: p };
    const start = new Date();
    return this.connection.execute(sql, p)
      .then( value => {
        return value;
      })
      .catch(err => logInfo.error = err)
      .finally( () => {
        const end = new Date();
        const duration = end - start;
        logInfo.executionTimeMilliSecs = duration;
        if (logInfo.error) {
          console.error(logInfo);
        } else {
          console.log(logInfo);
        }
      });
  }

  release() {
    this.connection.release();
    this.connection = null;
  }


  pullNextKey(tableName) {
    return this.execute(
      `
      update \`keys\`
        set next_key = next_key + 1
        where tablename = '${tableName}'`)
      .then( () =>
        this.execute(
          `
          select next_key
            from \`keys\`
            where tablename = '${tableName}';`))
      .then( ([results]) => results[0].next_key);
  }

  rollback() {
    console.log('--------ROLLBACK-------');
    return this.connection.rollback();
  }

  update(tablename, keys, values) {
    const keyColumns = Object.keys(keys);
    if (keyColumns.length == 0) throw Error('keys missing to update');
    const valueColumns = Object.keys(values);
    if (valueColumns.length == 0) throw Error('values missing to update');

    const sql = `
UPDATE ${tablename}
  SET ${valueColumns.map( k => `${k}=:${k}`).join(',\n      ')}
  ${whereClause(keys)}`;
    return this.execute(sql, { ...keys, ...values });
  }

  upsert(tableName, values) {
    console.log('upsert');

    const keys = Object.keys(values);
    const sql = `
INSERT INTO ${tableName} (${keys.join(', ')})
  VALUES(${keys.map(k => `:${k}`).join(', ')})
ON DUPLICATE KEY UPDATE
${keys.map( k=> `  ${k} = :${k}`).join(',\n      ')}`;

    return this.execute(
      sql,
      values
    );
  }
}

class Database {
  constructor() {
    this.pool = mysql.createPool({
      host: credentials.mysqlHost,
      user: credentials.mysqlUsername,
      password: credentials.mysqlPassword,
      database: credentials.mysqlDatabase,
      namedPlaceholders: true,
    });
  }

  all(sql, params) {
    return this.withConnection( conn => conn.all(sql, params));
  }

  execute(sql, params) {
    return this.withConnection( conn => conn.execute(sql, params));
  }

  transaction(fn) {
    return this.pool.promise().getConnection()
      .then( conn => {
        conn = new LoggingConnection(conn);
        return conn.beginTransaction()
          .then( () => fn(conn))
          .then(result => conn.commit().then( () => result))
          .catch( err => {
            console.error(err);
            throw err;
          }).finally( () => {
            conn.release();
          });
      });
  }

  pullNextKey(tableName) {
    return this.transaction( conn => conn.pullNextKey(tableName));
  }

  update(tableName, keys, values) {
    return this.withConnection( conn => conn.update(tableName, keys, values));
  }

  upsert(tableName, values) {
    return this.withConnection( conn => conn.upsert(tableName, values));
  }

  withConnection(fn) {
    return this.pool.promise().getConnection()
      .then( conn => {
        conn = new LoggingConnection(conn);
        return fn(conn)
          .catch( err => {
            console.error(err);
            throw err;
          })
          .finally(() => {
            conn.release();
          });
      })
      .catch( err => {
        console.error(err);
        throw err;
      });
  }
}

const database = new Database();

export default database;
