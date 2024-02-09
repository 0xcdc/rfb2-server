CREATE OR REPLACE view household_visit AS
select h.id as householdId, h.data, v.id as visitId, cast(v.date as char) as date
  from visit v
  join household h
    on  h.id = v.householdId
    and v.date >= h.start_date
    and v.date < h.end_date;
