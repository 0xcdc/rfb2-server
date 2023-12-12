create temporary table visit_temp as (
  select *
  from visit
);

alter table visit_temp
  add index (date, householdId);

create temporary table duplicate_visits as (
  select date, householdId, min(id) as m
  from visit_temp
  group by date, householdId
  having count(*) > 1
);

create temporary table visits_to_delete as (
  select *
  from visit v
  where exists (
    select *
    from duplicate_visits dv
    where dv.date = v.date
      and dv.householdId = v.householdId
      and dv.m <> v.id
    )
);

select * from visits_to_delete;

delete from visit where id in (select id from visits_to_delete);

