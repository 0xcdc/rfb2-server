/* delete visits for household's with no clients */

delete
  from visit v
  where exists (
    select *
    from household h
    where h.id = v.householdId
      and h.version = v.householdVersion
      and not exists (
        select *
          from client c 
          join household_client_list hcl
            on  c.id = hcl.clientId
            and c.version = hcl.clientVersion
          where hcl.householdId = h.id
            and hcl.householdVersion = h.version
      )
 );


/* delete client's where the household version never visited */
delete
  from household_client_list hcl
  where not exists (
    select *
    from visit v
    where v.householdId = hcl.householdId
      and v.householdVersion = hcl.householdVersion
  );

delete
  from client c
  where not exists (
    select *
    from visit v
      join household_client_list hcl
        on  v.householdId = hcl.householdId
        and v.householdVersion = hcl.householdVersion
    where hcl.clientId = c.id
      and hcl.clientVersion = c.version
  );


/* delete household's with no clients */
delete
 from household h
  where not exists (
    select *
      from client c 
      join household_client_list hcl
        on  c.id = hcl.clientId
        and c.version = hcl.clientVersion
      where hcl.householdId = h.id
        and hcl.householdVersion = h.version
  );


