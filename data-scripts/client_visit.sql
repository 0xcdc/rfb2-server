CREATE OR REPLACE view client_visit AS
select cl.*, v.id as visitId, v.date, h.zip, ci.name as city_name, cast(case when birthyear != '' then year(curdate()) - birthyear else null end as dec(3)) as age

  from visit v
  join household h
    on  h.id = v.householdId
    and h.version = v.householdVersion
  join city ci
    on h.cityId = ci.id
  join household_client_list hcl
    on  h.id = hcl.householdId
    and h.version = hcl.householdVersion
  join client cl
    on  cl.id = hcl.clientId
    and cl.version = hcl.clientVersion;
