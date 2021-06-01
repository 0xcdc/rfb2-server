import database from './root';
import { incrementHouseholdVersion } from './increment';

function addHouseholdInfo(clientList) {
  clientList.forEach(client => {
    const c = client;
    c.householdSize = clientList.length;

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

    c.cardColor = cardColor(c.householdSize);
  });
}

export function loadAllClients() {
  const clients = database.all(
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
        AND lv.householdVersion = h.version`,
  );

  // group the clients by householdId
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
}

export function loadClientById(id) {
  const clients = loadAllClients();
  return clients.find(v => v.id === id);
}

export function loadClientsForHouseholdId(householdId, householdVersion) {
  const clients = database.all(
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
    { householdId, householdVersion },
  );
  addHouseholdInfo(clients);

  return clients;
}

const saveClientTransaction = database.transaction(client => {
  const isNewClient = client.id === -1;
  const householdVersion = incrementHouseholdVersion(client.householdId);

  database.upsert('client', client, { isVersioned: true });

  if (isNewClient) {
    database.run(
      `
      insert into household_client_list (householdId, householdVersion, clientId, clientVersion)
        values( :householdId, :householdVersion, :id, :version)`,
      { ...client, householdVersion },
    );
  } else {
    database.run(
      `
      update household_client_list
        set clientVersion = :version
        where householdId = :householdId
          and householdVersion = :householdVersion
          and clientId = :id`,
      { ...client, householdVersion },
    );
  }
  return client.id;
});

const deleteClientTransaction = database.transaction(client => {
  const householdVersion = incrementHouseholdVersion(client.householdId);
  database.run(
    `
    delete from household_client_list
      where householdId = :householdId
        and householdVersion = :householdVersion
        and clientId = :id
        and clientVersion = :version`,
    { ...client, householdVersion },
  );
});


export function updateClient(client) {
  saveClientTransaction(client);
  return loadClientById(client.id);
};

export function deleteClient(id) {
  const client = loadClientById(id);
  deleteClientTransaction(client);
  return client;
};
