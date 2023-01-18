with data as (
select city.*,`Male`,`Female`,`Non-Binary`,`Unknown`
  from city
  left join (
    select cityId,
      sum(case when genderId = 2 then 1 else 0 end) as `Male`,
      sum(case when genderId = 1 then 1 else 0 end) as `Female`,
      sum(case when genderId = 3 then 1 else 0 end) as `Non-Binary`,
      sum(case when genderId = 0 then 1 else 0 end) as `Unknown`
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
  coalesce(data.`Male`, 0) as `Male`,
  coalesce(data.`Female`, 0) as `Female`,
  coalesce(data.`Non-Binary`, 0) as `Non-Binary`,
  coalesce(data.`Unknown`, 0) as `Unknown`
from data
where break_out = 1 and id <> 0
union all
select 100, 'Other KC',
  sum(data.`Male`),
  sum(data.`Female`),
  sum(data.`Non-Binary`),
  sum(data.`Unknown`) as `Unknown`
from data
where break_out = 0 and in_king_county = 1 and id <> 0
union all
select 101, 'Outside KC',
  sum(data.`Male`),
  sum(data.`Female`),
  sum(data.`Non-Binary`),
  sum(data.`Unknown`) as `Unknown`
from data
where break_out = 0 and in_king_county = 0 and id <> 0
union all
select 102, 'Unknown',
  sum(data.`Male`),
  sum(data.`Female`),
  sum(data.`Non-Binary`),
  sum(data.`Unknown`) as `Unknown`
from data
where id = 0
order by id;

