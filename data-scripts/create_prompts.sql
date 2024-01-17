drop table prompt_translation;
drop table prompt;


create table prompt (
  id int not null,
  tag varchar(20) not null unique,
  value varchar(255) CHARACTER SET utf8 not null,
  primary key (id)
);

create table if not exists prompt_translation (
  id int,
  languageId int,
  value varchar(255) CHARACTER SET utf8 not null,
  primary key (id, languageId),
  foreign key (id) references prompt(id),
  foreign key (languageId) references language(id)
);

insert into prompt (id, tag, value) values
 (1,  'address1',       'Address 1'),
 (2,  'address2',       'Address 2'),
 (3,  'city',           'City'),
 (4,  'zip',            'Zip'),
 (5,  'income',         'Income'),
 (6,  'note',           'Note'),
 (7,  'name',           'Name'),
 (8,  'gender',         'Gender'),
 (9,  'birthYear',      'Birth Year'),
 (10, 'disabled',       'Disabled'),
 (11, 'refugee',        'Refugee or Immigrant'),
 (12, 'ethnicity',      'Ethnicity'),
 (13, 'race',           'Race'),
 (14, 'speaksEnglish',  'Speaks English'),
 (15, 'militaryStatus', 'Military Status'),
 (16, 'phoneNumber',    'Phone Number');

