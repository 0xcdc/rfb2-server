-- create a temp table of visits where there were no clients
create temporary table bad_visits
  select v.*
    from visit v
    where not exists (
      select *
      from household_client_list hcl
      where hcl.householdId = v.householdId
        and hcl.householdVersion = v.householdVersion
      )
    order by date desc;

-- update a bad visit to be the latest version of a client
update bad_visits bv
  set householdVersion = (
    select max(householdVersion)
      from household_client_list hcl
        where hcl.householdId = bv.householdId
    );

-- update a bad visit to have the version of the next visit if there was one
update bad_visits bv
  set householdVersion = coalesce(
    (select min(v.householdVersion)
      from visit v
      where v.householdVersion > 1
        and v.householdId = bv.householdId),
    bv.householdVersion
  );

-- fix the actual visits
update visit v, (select id, householdVersion from bad_visits) as bv
  set v.householdVersion = bv.householdVersion
  where bv.id = v.id;

drop temporary table bad_visits;
