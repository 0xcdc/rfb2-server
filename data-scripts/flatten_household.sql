drop table if exists new_household;

alter table visit change date date date not null;

CREATE TABLE `new_household` (
  `id` int NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `data` json NOT NULL,
  `version` int not null,
  PRIMARY KEY (`id`,`start_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

insert into new_household (id, start_date, end_date, version, data)
  select h.id, min(v.date) as start_date, '9999-12-31', h.version, JSON_OBJECT(
    'address1', address1,
    'address2', address2,
    'cityId',  cityId,
    'zip', zip,
    'note', note,
    'incomeLevelId', incomeLevelId,
    'location',
      if(latlng <> '',
         JSON_OBJECT('lat', JSON_EXTRACT(latlng, '$.lat'), 'lng', JSON_EXTRACT(latlng, '$.lng')),
         null)
  )
  from household h
  join visit v
    on  h.id = v.householdId
    and h.version = v.householdVersion
    group by h.id, h.version;

update new_household nh,
  ( select hcl.householdId, hcl.householdVersion, JSON_ARRAYAGG(JSON_OBJECT(
      'id', id,
      'name', name,
      'disabled', disabled,
      'raceId', raceId,
      'birthYear', birthYear,
      'genderId', genderId,
      'refugeeImmigrantStatus', refugeeImmigrantStatus,
      'speaksEnglish', speaksEnglish,
      'militaryStatusId', militaryStatusId,
      'ethnicityId', ethnicityId,
      'phoneNumber', phoneNumber)) as clients
    from client c
      join household_client_list hcl
        on  c.id = hcl.clientId
        and c.version = hcl.clientVersion
    group by hcl.householdId, hcl.householdVersion) as clients
set nh.data = JSON_SET(nh.data, '$.clients', clients.clients)
where nh.id = clients.householdId
  and nh.version = clients.householdVersion;

-- set the end_date to be the first visit date for the next version if one exists
update new_household nh,
  (select householdId, householdVersion, min(v.date) as date
    from visit v
    group by householdId, householdVersion
  ) as first_visit
  set end_date = least(nh.end_date, first_visit.date)
  where first_visit.householdId = nh.id
    and first_visit.date > nh.start_date;

alter table new_household
  add UNIQUE KEY(`id`, `end_date`);

alter table new_household
  drop column version;

alter table visit
  drop constraint visit_ibfk_1;

drop table household_client_list;
drop view if exists client_visit;
drop table if exists client;
drop table household;

rename table new_household to household;

alter table visit
  drop column householdVersion;

alter table visit
  add constraint visit_ibfk_1 foreign key (householdId) references household(id);
