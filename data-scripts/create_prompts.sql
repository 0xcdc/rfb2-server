insert ignore into prompt (id, tag, value) values
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
 (16, 'phoneNumber',    'Phone Number'),
 (17, 'welcome',        'Welcome to Renewal Food Bank.'),
 (18, 'language',       'English is my preferred language');


 insert ignore into prompt_translation (id, languageId, value) values 
  (18, 1, '中文是我的首选语言'),
  (18, 2, '한국어는 내가 선호하는 언어입니다'),
  (18, 3, 'Русский — мой любимый язык'),
  (18, 4, 'Af-soomaaligu waa luuqadda aan doorbido'),
  (18, 5, 'El español es mi idioma preferido'),
  (18, 6, 'Українська – моя улюблена мова'),
  (18, 7, 'Tiếng Việt là ngôn ngữ ưa thích của tôi');


