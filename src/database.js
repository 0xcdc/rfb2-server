import credentials from '../credentials.js';
import mysql from 'mysql2';

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
    console.log(sql);
    console.log(`parameters: `, p);
    const start = new Date();
    return this.connection.execute(sql, p)
      .then( value => {
        const end = new Date();
        const duration = end - start;
        console.log(`execution time (ms): ${duration}`);
        return value;
      })
      .catch(err => console.error(err));
  }

  getMaxVersion(tableName, id) {
    return this.all(
      `
      select max(version) as version
      from ${tableName}
      where id = :id`,
      { id }
    ).then( rows =>
      (rows.length > 0) ?
        rows[0].version : 1
    );
  }

  insert(tablename, values) {
    const keys = Object.keys(values);
    return this.execute(
      `
      insert into ${tablename} (${keys.join(', ')})
        values(${keys.map(k => `:${k}`).join(', ')})`,
      values
    );
  }

  delete(tablename, { id, version }) {
    const isVersioned = version && true;
    const versionSQL = isVersioned ? 'and version = :version' : '';
    return this.execute(
      `
      delete from ${tablename}
        where id = :id
          ${versionSQL}`,
      { id, version }
    );
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

  update(tablename, values) {
    const keys = Object.keys(values);
    const hasVersion = keys.includes('version');
    const versionSql = hasVersion ? 'and version = :version' : '';
    const updateColumns = keys.filter(v => v !== 'id' && v !== 'versoin');
    const sql = `
      update ${tablename}
        set ${updateColumns.map(k => `${k}=:${k}`).join(',\n        ')}
        where id = :id
          ${versionSql}`;
    return this.execute(sql, values);
  }


  upsert(tableName, obj, options) {
    console.log('upsert');
    const isVersioned = options && options.isVersioned && true;

    // first, if it's a new row (id == -1) then we need to pull a new key and do an insert
    let dbOps = null;
    if (obj.id === -1) {
      dbOps = this.pullNextKey(tableName)
        .then( nextKey => {
          obj.id = nextKey;
          if (isVersioned) {
            obj.version = 1;
          }
          return this.insert(tableName, obj);
        });
    } else if (isVersioned) {
      // versioned rows are inserts, but we will need to calculate the next version number for the id
      dbOps = this.getMaxVersion(tableName, obj.id)
        .then( maxVersion => {
          obj.version = maxVersion + 1;
          return this.insert(tableName, obj);
        });
    } else {
      // vanilla update
      dbOps = this.update(tableName, obj);
    }
    return dbOps.then( () => obj.id);
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

  delete(tablename, { id, version }) {
    return this.withConnection( conn => conn.delete(tablename, { id, version }));
  }

  getMaxVersion(tableName, id) {
    return this.withConnection( conn => conn.getMaxVersion(tableName, id));
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

  upsert(tableName, obj, options) {
    return this.withConnection( conn => conn.upsert(tableName, obj, options));
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
