drop table if exists city_new;

create table city_new (
  id int primary key,
  name varchar(255) unique not null,
  break_out tinyint not null,
  in_king_county tinyint not null,
  location json null
);

insert into city_new (id, name, break_out, in_king_county, location)
  select id, name, break_out, in_king_county, json_unquote(latlng)
  from city;

drop table city;

rename table city_new to city;
