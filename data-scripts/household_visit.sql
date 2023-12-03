CREATE OR REPLACE view household_visit AS
select h.*, v.date, c.name
  from visit v
  join household h
    on  h.id = v.householdId
    and h.version = v.householdVersion
  join city c
    on h.cityId = c.id;
