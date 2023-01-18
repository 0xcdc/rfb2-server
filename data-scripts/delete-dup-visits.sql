create temporary table ids_to_delete as (
  select id
  from visit
  where exists (
    select *
    from visit v2
    where v2.date = visit.date
      and v2.householdId = visit.householdId
      and v2.id < visit.id)
);

delete from visit where id in (select id from ids_to_delete);
