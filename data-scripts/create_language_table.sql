drop table if exists translation_table;
drop table if exists yes_no_translation;
drop table if exists race_translation;
drop table if exists prompt_translation;
drop table if exists militaryStatus_translation;
drop table if exists income_level_translation;
drop table if exists gender_translation;
drop table if exists ethnicity_translation;
drop table if exists prompt;
drop table if exists language;

create table language (
  id int not null,
  name varchar(255) not null unique,
  code char(2) not null unique,
  primary key (id)
);

insert into language (id, name, code) values
  (0, 'English', 'en'),
  (1, 'Chinese', 'zh'),
  (2, 'Korean', 'ko'),
  (3, 'Russian', 'ru'),
  (4, 'Somali', 'so'),
  (5, 'Spanish', 'es'),
  (6, 'Ukrainian', 'uk'),
  (7, 'Vietnamese', 'vi');

create table prompt (
  id int not null,
  value varchar(255) CHARACTER SET utf8 not null,
  primary key (id)
);

create table translation_table (
  tableName varchar(255) not null,
  primary key (tableName)
);

insert into translation_table (tableName) values
  ('ethnicity'),
  ('gender'),
  ('income_level'),
  ('militaryStatus'),
  ('prompt'),
  ('race'),
  ('yes_no');

create table if not exists ethnicity_translation (
  id int,
  languageId int,
  value varchar(255) CHARACTER SET utf8 not null,
  primary key (id, languageId),
  foreign key (id) references  ethnicity(id),
  foreign key (languageId) references language(id)
);

create table if not exists gender_translation (
  id int,
  languageId int,
  value varchar(255) CHARACTER SET utf8 not null,
  primary key (id, languageId),
  foreign key (id) references gender(id),
  foreign key (languageId) references language(id)
);

create table if not exists income_level_translation (
  id int,
  languageId int,
  value varchar(255) CHARACTER SET utf8 not null,
  primary key (id, languageId),
  foreign key (id) references income_level(id),
  foreign key (languageId) references language(id)
);

create table if not exists militaryStatus_translation (
  id int,
  languageId int,
  value varchar(255) CHARACTER SET utf8 not null,
  primary key (id, languageId),
  foreign key (id) references militaryStatus(id),
  foreign key (languageId) references language(id)
);

create table if not exists prompt_translation (
  id int,
  languageId int,
  value varchar(255) CHARACTER SET utf8 not null,
  primary key (id, languageId),
  foreign key (id) references prompt(id),
  foreign key (languageId) references language(id)
);

create table if not exists race_translation (
  id int,
  languageId int,
  value varchar(255) CHARACTER SET utf8 not null,
  primary key (id, languageId),
  foreign key (id) references race(id),
  foreign key (languageId) references language(id)
);

create table if not exists yes_no_translation (
  id int,
  languageId int,
  value varchar(255) CHARACTER SET utf8 not null,
  primary key (id, languageId),
  foreign key (id) references yes_no(id),
  foreign key (languageId) references language(id)
);
