CREATE OR REPLACE view latest_visit AS
select *
  from visit v
  where not exists (
    select *
    from visit v2
    where v2.householdId = v.householdId
      and v2.date >= v.date
      and v2.id > v.id
  );
