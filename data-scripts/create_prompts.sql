insert ignore into prompt (id, tag, value) values
 (1,  'address1',         'Address 1'),
 (2,  'address2',         'Address 2'),
 (3,  'city',             'City'),
 (4,  'zip',              'Zip'),
 (5,  'income',           'Income'),
 (6,  'note',             'Note'),
 (7,  'name',             'Name'),
 (8,  'gender',           'Gender'),
 (9,  'birthYear',        'Birth Year'),
 (10, 'disabled',         'Disabled'),
 (11, 'refugee',          'Refugee or Immigrant'),
 (12, 'ethnicity',        'Ethnicity'),
 (13, 'race',             'Race'),
 (14, 'speaksEnglish',    'Speaks English'),
 (15, 'militaryStatus',   'Military Status'),
 (16, 'phoneNumber',      'Phone Number'),
 (17, 'welcomePage',      'Welcome to Renewal Food Bank.'),
 (18, 'language',         'English is my preferred language'),
 (19, 'homelessPage',     'Does your household have a permenant address?'),
 (20, 'addressPage',      'Enter your household address'),
 (21, 'cityOnlyPage',     'Choose the city you spend the most time in'),
 (22, 'incomePage',       'Please select your household income'),
 (23, 'yourNamePage',     'What is your full name?'),
 (24, 'genderPage',       'What is ___''s gender?'),
 (25, 'disabledPage',     'Is ___ disabled?'),
 (26, 'refugeePage',      'Is ___ a refugee or immigrant?'),
 (27, 'ethnicityPage',    'What is ___''s ethnicity?'),
 (28, 'racePage',         'What is ___''s race?'),
 (29, 'englishPage',      'Does ___ speak English?'),
 (30, 'militaryPage',     'What is ___''s military status?'),
 (31, 'phonePage',        'What is ___''s phone Number?'),
 (32, 'birthPage',        'What is ___''s birth year?'),
 (33, 'moreClientsPage',  'Are there more members of the household?'),
 (34, 'nextNamePage',     'What is the next person''s name?'),
 (35, 'finishedPage',     'Please return the tablet to the volunteer'),
 (36, 'currentClients',   'Current household members:');


 insert ignore into prompt_translation (id, languageId, value) values 
  (18, 1, '中文是我的首选语言'),
  (18, 2, '한국어는 내가 선호하는 언어입니다'),
  (18, 3, 'Русский — мой любимый язык'),
  (18, 4, 'Af-soomaaligu waa luuqadda aan doorbido'),
  (18, 5, 'El español es mi idioma preferido'),
  (18, 6, 'Українська – моя улюблена мова'),
  (18, 7, 'Tiếng Việt là ngôn ngữ ưa thích của tôi');


