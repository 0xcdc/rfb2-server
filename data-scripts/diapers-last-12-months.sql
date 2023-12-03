select city_name, zip, count(*)
  from client_visit c
  join latest_visit v
    on v.id = c.visitId
  where c.date > '2022-12-02' 
    and c.age >=0 
    and c.age <=2
  group by city_name, zip;
