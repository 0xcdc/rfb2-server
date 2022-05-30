import database from './root';
import { incrementHouseholdVersion } from './increment';

function addHouseholdInfo(clientList) {
  clientList.forEach(client => {
    client.householdSize = clientList.length;

    function cardColor(count) {
      switch (count) {
        case 0:
        case 1:
        case 2:
          return 'red';
        case 3:
        case 4:
          return 'blue';
        case 5:
        case 6:
        case 7:
          return 'yellow';
        default:
          return 'purple';
      }
    }

    client.cardColor = cardColor(client.householdSize);
  });
  return clientList;
}

export function loadAllClients() {
  const query = database.all(
    `
    SELECT c.*, h.note, lv.lastVisit
    FROM client c
    INNER JOIN household_client_list hcl
      on c.id = hcl.clientId
        and  c.version = hcl.clientVersion
    INNER JOIN household h
      ON hcl.householdId = h.id
      and hcl.householdVersion = h.version
        and not exists (
          select 1
          from household h2
          where h2.id = h.id
            and h2.version > h.version
        )
    LEFT JOIN (
      SELECT householdId, householdVersion, MAX(date) as lastVisit
      from visit
      group by householdId, householdVersion
    ) lv
      ON lv.householdId = h.id
        AND lv.householdVersion = h.version`
  );

  // group the clients by householdId
  return query.then( clients => {
    const households = new Map();
    clients.forEach(client => {
      const list = households.get(client.householdId) || [];
      list.push(client);
      households.set(client.householdId, list);
    });

    households.forEach(group => {
      addHouseholdInfo(group);
    });

    return clients;
  });
}

export function loadClientById(id) {
  return loadAllClients()
    .then( clients => clients.find(v => v.id === id));
}

export function loadClientsForHouseholdId(householdId, householdVersion) {
  return database.all(
    `
    select *
    from client c
    where exists (
      select 1
      from household_client_list hcl
      where c.id = hcl.clientId
        and c.version = hcl.clientVersion
        and c.householdId = hcl.householdId
        and hcl.householdVersion = :householdVersion
    )
    and householdId = :householdId
    order by name`,
    { householdId, householdVersion }
  )
    .then( clients => addHouseholdInfo(clients));
}

export function updateClient(client) {
  const isNewClient = client.id === -1;
  return database.transaction( conn =>
    incrementHouseholdVersion(conn, client.householdId)
      .then( householdVersion =>
        conn.upsert('client', client, { isVersioned: true })
          .then( () =>
            (isNewClient) ?
              conn.execute(
                `
                insert into household_client_list (householdId, householdVersion, clientId, clientVersion)
                  values( :householdId, :householdVersion, :id, :version)`,
                { ...client, householdVersion }
              ) : conn.execute(
                `
                update household_client_list
                  set clientVersion = :version
                  where householdId = :householdId
                    and householdVersion = :householdVersion
                    and clientId = :id`,
                { ...client, householdVersion }
              )
          )
      )
  ).then( () => loadClientById(client.id));
}

export function deleteClient(id) {
  return loadClientById(id).then( client =>
    database.transaction( conn => {
      if (!client) {
        throw new Error(`bad client id: ${id}`);
      }
      return incrementHouseholdVersion(conn, client.householdId)
        .then( householdVersion =>
          conn.execute(
            `
            delete from household_client_list
              where householdId = :householdId
                and householdVersion = :householdVersion
                and clientId = :id
                and clientVersion = :version`,
            { ...client, householdVersion }))
        .then( () => client );
    })
  );
}
