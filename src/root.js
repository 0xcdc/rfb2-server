import mysql from 'mysql2';

class Database {
  createConnection() {
    let connection= mysql.createConnection({
      host: 'localhost',
      user: 'sammy',
      password: 'password',
      database: 'foodbank',
    });
    connection.config.namedPlaceholders = true;
    return connection;
  }

  all(sql, params) {
    const p = params || {};
    console.log( sql );
    let connection = this.createConnection();
    return connection.promise()
      .execute(sql, p)
      .then( ([rows, fields]) => {
        return rows;
      })
      .catch(err => console.error(err))
      .finally(connection.end());
  }
}

const database = new Database();

database.run = (sql, params) => {
  throw("run not implemented");
  const p = params || {};

  try {
    const stmt = database.prepare(sql);
    return stmt.run(p);
  } catch (error) {
    console.error({ sql, p, error });
    throw error;
  }
};

database.insert = (tablename, values) => {
  throw("insert not implemented");
  const keys = Object.keys(values);
  const info = database.run(
    `
    insert into ${tablename} (${keys.join(', ')})
      values(${keys.map(k => `$${k}`).join(', ')})`,
    values,
  );
  return info.lastInsertRowid;
};

database.update = (tablename, values) => {
  throw("update not implemented");
  const keys = Object.keys(values);
  const hasVersion = keys.includes('version');
  const versionSql = hasVersion ? 'and version = :version' : '';
  const updateColumns = keys.filter(v => v !== 'id' && v !== 'versoin');
  const sql = `
    update ${tablename}
      set ${updateColumns.map(k => `${k}=$${k}`).join(',\n        ')}
      where id = $id
        ${versionSql}`;
  const info = database.run(sql, values);
  return info;
};

database.delete = (tablename, { id, version }) => {
  throw("delete not implemented");
  const isVersioned = version && true;
  const versionSQL = isVersioned ? 'and version = :version' : '';
  const info = database.run(
    `
    delete from ${tablename}
      where id = :id
        ${versionSQL}`,
    { id, version },
  );

  return info;
};

database.pullNextKey = (tableName) => {
  throw("pullNextKey not implemented");
  database.query(
    `
    update keys
      set next_key = next_key + 1
      where tablename = '${tableName}';

    select next_key
    from keys
    where tablename = '${tableName}';`,
    (error, results, fields) => {
      if(error) {
        console.error({error});
      }
      console.log(results);
      return results[0].next_key;
    }
  );
};

/*database.getMaxVersion = database.transaction((tableName, id) => {
  const rows = database.all(
    `
    select max(version) as version
    from ${tableName}
    where id = :id`,
    { id },
  );

  if (rows.length > 0) {
    const [{ version }] = rows;
    return version;
  } else {
    return 1;
  }
});
*/
/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["obj"] }] */
database.upsert = (tableName, obj, options) => {
  throw("upsert not implemented");
  const isVersioned = options && options.isVersioned && true;

  // first, if it's a new row (id == -1) then we need to pull a new key and do an insert
  if (obj.id === -1) {
    obj.id = pullNextKey(tableName);
    if (isVersioned) {
      obj.version = 1;
    }
    database.insert(tableName, obj);
  } else if (isVersioned) {
    // versioned rows are inserts, but we will need to calculate the next version number for the id
    obj.version = database.getMaxVersion(tableName, obj.id) + 1;
    database.insert(tableName, obj);
  } else {
    // vanilla update
    database.update(tableName, obj);
  }
  return obj.id;
};

export default database;
