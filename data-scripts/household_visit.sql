CREATE OR REPLACE view household_visit AS
select h.id as householdId, incomeLevelId, v.id as visitId, v.date, h.cityId, h.zip,
  case when address1 = '' then 1
  else 0
  end as homeless
  from visit v
  join household h
    on  h.id = v.householdId
    and h.version = v.householdVersion;
