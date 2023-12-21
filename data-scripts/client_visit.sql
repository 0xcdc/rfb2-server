CREATE OR REPLACE view client_visit AS
select cl.id as clientId, disabled, raceId, birthYear, genderId, refugeeImmigrantStatus, speaksEnglish,
       militaryStatusId, ethnicityId, v.id as visitId, v.date, v.householdId, h.cityId, h.zip,
       cast(
         case
           when birthyear = '' then null
           when birthyear < 1900 then null
           when birthyear > year(v.date) then null
           else year(v.date) - birthyear
         end as dec(3)) as age
  from visit v
  join household h
    on  h.id = v.householdId
    and h.version = v.householdVersion
  join household_client_list hcl
    on  h.id = hcl.householdId
    and h.version = hcl.householdVersion
  join client cl
    on  cl.id = hcl.clientId
    and cl.version = hcl.clientVersion;
