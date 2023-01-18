with data as (
select city.*,`American Indian or Alaska Native`, `Asian or Asian-American`, `Black or African-American`, `Hispanic or LatinX`, `Native Hawaiian or Pacific Islander`, `White / Caucasian`, `Other Race`, `Multi-Racial (2+ identified)`, `Unknown`
  from city
  left join (
    select cityId,
      sum(case when raceId = 5 then 1 else 0 end) as `American Indian or Alaska Native`,
      sum(case when raceId = 1 then 1 else 0 end) as `Asian or Asian-American`,
      sum(case when raceId = 2 then 1 else 0 end) as `Black or African-American`,
      sum(case when raceId = 3 then 1 else 0 end) as `Hispanic or LatinX`,
      sum(case when raceId = 4 then 1 else 0 end) as `Native Hawaiian or Pacific Islander`,
      sum(case when raceId = 6 then 1 else 0 end) as `White / Caucasian`,
      sum(case when raceId = 7 then 1 else 0 end) as `Other Race`,
      sum(case when raceId = 8 then 1 else 0 end) as `Multi-Racial (2+ identified)`,
      sum(case when raceId = 0 then 1 else 0 end) as `Unknown`
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
  coalesce(data.`American Indian or Alaska Native`, 0) as `American Indian or Alaska Native`,
  coalesce(data.`Asian or Asian-American`, 0) as `Asian or Asian-American`,
  coalesce(data.`Black or African-American`, 0) as `Black or African-American`,
  coalesce(data.`Hispanic or LatinX`, 0) as `Hispanic or LatinX`,
  coalesce(data.`Native Hawaiian or Pacific Islander`, 0) as `Native Hawaiian or Pacific Islander`,
  coalesce(data.`White / Caucasian`, 0) as `White / Caucasian`,
  coalesce(data.`Other Race`, 0) as `Other Race`,
  coalesce(data.`Multi-Racial (2+ identified)`, 0) as `Multi-Racial (2+ identified)`,
  coalesce(data.`Unknown`, 0) as `Unknown`
from data
where break_out = 1 and id <> 0
union all
select 100, 'Other KC',
  sum(data.`American Indian or Alaska Native`),
  sum(data.`Asian or Asian-American`),
  sum(data.`Black or African-American`),
  sum(data.`Hispanic or LatinX`),
  sum(data.`Native Hawaiian or Pacific Islander`),
  sum(data.`White / Caucasian`),
  sum(data.`Other Race`),
  sum(data.`Multi-Racial (2+ identified)`),
  sum(data.`Unknown`) as `Unknown`
from data
where break_out = 0 and in_king_county = 1 and id <> 0
union all
select 101, 'Outside KC',
  sum(data.`American Indian or Alaska Native`),
  sum(data.`Asian or Asian-American`),
  sum(data.`Black or African-American`),
  sum(data.`Hispanic or LatinX`),
  sum(data.`Native Hawaiian or Pacific Islander`),
  sum(data.`White / Caucasian`),
  sum(data.`Other Race`),
  sum(data.`Multi-Racial (2+ identified)`),
  sum(data.`Unknown`) as `Unknown`
from data
where break_out = 0 and in_king_county = 0 and id <> 0
union all
select 102, 'Unknown',
  sum(data.`American Indian or Alaska Native`),
  sum(data.`Asian or Asian-American`),
  sum(data.`Black or African-American`),
  sum(data.`Hispanic or LatinX`),
  sum(data.`Native Hawaiian or Pacific Islander`),
  sum(data.`White / Caucasian`),
  sum(data.`Other Race`),
  sum(data.`Multi-Racial (2+ identified)`),
  sum(data.`Unknown`) as `Unknown`
from data
where id = 0
order by id;

