with data as (
select city.*,`Speaks English Yes`,`Speaks English No`,`Unknown`
  from city
  left join (
    select cityId,
      sum(case when speaksEnglish = 1 then 1 else 0 end) as `Speaks English Yes`,
      sum(case when speaksEnglish = 0 then 1 else 0 end) as `Speaks English No`,
      sum(case when speaksEnglish = -1 then 1 else 0 end) as `Unknown`
    from households_visited_last_year
    join household
      on household.id = households_visited_last_year.id and
         household.version = households_visited_last_year.version
    join household_client_list hcl
      on household.id = hcl.householdId and
         household.version = hcl.householdVersion
    join client
      on client.id= hcl.clientId and
         client.version = hcl.clientVersion
    group by cityId
  ) d
  on city.id = d.cityId
)
select id,
  name,
  coalesce(data.`Speaks English Yes`, 0) as `Speaks English Yes`,
  coalesce(data.`Speaks English No`, 0) as `Speaks English No`,
  coalesce(data.`Unknown`, 0) as `Unknown`
from data
where break_out = 1 and id <> 0
union all
select 100, 'Other KC',
  sum(data.`Speaks English Yes`),
  sum(data.`Speaks English No`),
  sum(data.`Unknown`) as `Unknown`
from data
where break_out = 0 and in_king_county = 1 and id <> 0
union all
select 101, 'Outside KC',
  sum(data.`Speaks English Yes`),
  sum(data.`Speaks English No`),
  sum(data.`Unknown`) as `Unknown`
from data
where break_out = 0 and in_king_county = 0 and id <> 0
union all
select 102, 'Unknown',
  sum(data.`Speaks English Yes`),
  sum(data.`Speaks English No`),
  sum(data.`Unknown`) as `Unknown`
from data
where id = 0
order by id;

