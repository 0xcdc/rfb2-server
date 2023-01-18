with data as (
  select city.id, city.name, city.break_out, city.in_king_county, `Unduplicated_Households`,  `Unduplicated_Individuals`
    from city
    left join (
      select cityId,
        count(household.id) `Unduplicated_Households`
      from households_visited_last_year
      join household
        on household.id = households_visited_last_year.id and
           household.version = households_visited_last_year.version
      group by cityId
    ) d
    on city.id = d.cityId
    left join (
      select cityId,
         count(client.id) as `Unduplicated_Individuals`
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
    ) d2
    on city.id = d2.cityId
)
select id,
  name,
  coalesce(Unduplicated_Households, 0) as `Unduplicated_Households`,
  coalesce(Unduplicated_Individuals, 0) as `Unduplicated_Individuals`
from data
where break_out = 1 and id <> 0
union all
select 100, 'Other KC', sum(data.Unduplicated_Households), sum(data.Unduplicated_Individuals)
from data
where break_out = 0 and in_king_county = 1 and id <> 0
union all
select 101, 'Outside KC', sum(data.Unduplicated_Households), sum(data.Unduplicated_Individuals)
from data
where break_out = 0 and in_king_county = 0 and id <> 0
union all
select 102, 'Unknown', sum(data.Unduplicated_Households), sum(data.Unduplicated_Individuals)
from data
where id = 0
order by id;

