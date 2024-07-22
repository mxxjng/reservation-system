--
-- Basic data seeding (users, roles, permissions, pricingplan.) for the app to work
-- !!! NOTE: some permissions are missing atm
--

INSERT INTO public.permission VALUES ('cllhsziwb0005dxta2c9wevwb', 'INVITE_USER_TO_PROJECT', 'Can invite a user to a project (with specific permissions)');
INSERT INTO public.permission VALUES ('cllht01ui0006dxtahd3h7lpl', 'REMOVE_USER_FROM_PROJECT', 'Can remove a user from a project');
INSERT INTO public.permission VALUES ('cllht1fxt0008dxta2rrc6n3w', 'READ_PROJECT_INFOS', 'Can read all project information');
INSERT INTO public.permission VALUES ('cllht1z1p0009dxta9z1985hs', 'UPDATE_PROJECT', 'Can update a project');
INSERT INTO public.permission VALUES ('cllht2kkr000adxta2nrofvv2', 'DELETE_PROJECT', 'Can delete a project');
INSERT INTO public.permission VALUES ('cllht3asi000bdxta71le4sz5', 'UPDATE_PROJECT_BILLING_DETAILS', 'Can update the billing details of a project');
INSERT INTO public.permission VALUES ('cllj74le30017k1ta48hl5ipi', 'UPDATE_PROJECT_PLAN', 'Can update the pricing plan of the project');
INSERT INTO public.permission VALUES ('cllj75alf0018k1tagqxl49xd', 'ADD_RESTAURANT_TO_PROJECT', 'Can add a Restaurant to a Project');
INSERT INTO public.permission VALUES ('cllht0p7k0007dxta2u34hp4v', 'READ_USERS_IN_PROJECT', 'Can see all users in a project with given roles and permissions');
INSERT INTO public.permission VALUES ('cllj765z00019k1tag8ddgzm8', 'DELETE_RESTAURANT_FROM_PROJECT', 'Can delete a Restaurant from a Project');
INSERT INTO public.permission VALUES ('cllj76sy2001ak1ta44ue1o7i', 'CHANGE_MEMBER_PROJECT_ROLE', 'Can change the role of a member in a project');
INSERT INTO public.permission VALUES ('cllj77f1i001bk1tafiur0w5x', 'ADD_MEMBER_TO_RESTAURANT', 'Can add a Project Member to a Restaurant');
INSERT INTO public.permission VALUES ('cllj77z37001ck1ta4h4i6jp3', 'REMOVE_MEMBER_FROM_RESTAURANT', 'Can remove a project member from a restaurant');
INSERT INTO public.permission VALUES ('cllj78kqc001dk1ta05n1abo6', 'CREATE_CUSTOM_PROJECT_ROLE', 'Can create a custom role for a project');
INSERT INTO public.permission VALUES ('cllwh4y9s0001gbkq2r6l46dq', 'READ_RESTAURANT_INFOS', 'Can Read Restaurant Infos');
INSERT INTO public.permission VALUES ('cllwh5xkn0002gbkqhhk6hpba', 'READ_RESTAURANT_MEMBERS', 'Can Read Restaurant Members');
INSERT INTO public.permission VALUES ('cllwh6gjh0003gbkqhufb2lk4', 'READ_RESTAURANT_STATS', 'Can Read Restaurant Statistics');
INSERT INTO public.permission VALUES ('clm1y1c5g0000104t0axq3tw6', 'JOIN_RESTAURANT', 'Can Join Every Restaurant in a Project');
INSERT INTO public.permission VALUES ('clm524a3q0000pjks767p6qhx', 'CREATE_RESTAURANT_FOOD', 'Can Create a Food or a Drink in a Restaurant');
INSERT INTO public.permission VALUES ('clm524src0001pjks8opv52dl', 'DELETE_RESTAURANT_FOOD', 'Can delete a Food or Drink in a Restaurant');
INSERT INTO public.permission VALUES ('clm5259v50002pjks00wpao65', 'PUBLISH_RESTAURANT_FOOD', 'Can Publish a Food or Drink in a Restaurant');
INSERT INTO public.permission VALUES ('clm525quw0003pjksb9kze52g', 'UPDATE_RESTAURANT_FOOD', 'Can Update a Food or Drink in a Restaurant');
INSERT INTO public.permission VALUES ('clm6acy3s0000h1ks1hck7ef0', 'DELETE_GLOBAL_FOOD', 'Delete a global food in a Project');
INSERT INTO public.permission VALUES ('clm6adhs10001h1ksebyr7hzu', 'CREATE_GLOBAL_FOOD', 'Create a global food in a project');
INSERT INTO public.permission VALUES ('clm6adwmc0002h1kshnpq00gj', 'UPDATE_GLOBAL_FOOD', 'Update a global food in a project');

INSERT INTO public.pricing_plan VALUES ('cllv87rvl0000ns4t89mibqss', 'Free', 'Free Plan', true, 0, 0, 2, 3, 20, 2, 5, 0, 1, 1);
INSERT INTO public.pricing_plan VALUES ('cllv8ifia0001ns4tfpdk6y7t', 'Pro', 'Pro Plan', false, 15, 160, 3, 15, 100, 20, 20, 3, 3, 5);
INSERT INTO public.pricing_plan VALUES ('cllv8lk5j0002ns4t7bp10026', 'Enterprise', 'Enterprise Plan', false, 40, 450, 10, 70, 100, 100, 50, 7, 7, 10);

INSERT INTO public.role VALUES ('cllj6n2rr000uk1ta11s42efu', 'Project Manager', 'Manager of a Project', 'PROJECT');
INSERT INTO public.role VALUES ('cllj72j240015k1ta3flmgm8a', 'Project Owner', 'Owner of a Project', 'PROJECT');
INSERT INTO public.role VALUES ('cllj732ku0016k1ta18uv7gmv', 'Project Member', 'Member of a Project', 'PROJECT');
INSERT INTO public.role VALUES ('cllj7f1500021k1ta6ma7e6jp', 'Restaurant Owner', 'Owner of the restaurant', 'RESTAURANT');
INSERT INTO public.role VALUES ('cllj7fkdc0022k1tag8ns2z7c', 'Restaurant Manager', 'Manager of the restaurant', 'RESTAURANT');
INSERT INTO public.role VALUES ('cllj7gz130023k1ta5fx75n3c', 'Restaurant Editor', 'Can create, edit and delete content from a restaurant', 'RESTAURANT');
INSERT INTO public.role VALUES ('cllj7hn7e0024k1ta2hkuboyp', 'Restaurant Author', 'Can edit and create content from restaurant', 'RESTAURANT');

INSERT INTO public.role_permissions VALUES ('cllj6nahb000vk1taha4bea4s', 'cllj6n2rr000uk1ta11s42efu', 'cllhsziwb0005dxta2c9wevwb');
INSERT INTO public.role_permissions VALUES ('cllj6nbc6000wk1ta99l81lk0', 'cllj6n2rr000uk1ta11s42efu', 'cllht01ui0006dxtahd3h7lpl');
INSERT INTO public.role_permissions VALUES ('cllj6nc3w000xk1tad4aab9un', 'cllj6n2rr000uk1ta11s42efu', 'cllht0p7k0007dxta2u34hp4v');
INSERT INTO public.role_permissions VALUES ('cllj6nd4n000yk1ta1c132u7c', 'cllj6n2rr000uk1ta11s42efu', 'cllht1fxt0008dxta2rrc6n3w');
INSERT INTO public.role_permissions VALUES ('cllwh6v940004gbkq5z6x5uu9', 'cllj7f1500021k1ta6ma7e6jp', 'cllwh4y9s0001gbkq2r6l46dq');
INSERT INTO public.role_permissions VALUES ('cllwh6yji0005gbkq5fqdfcme', 'cllj7f1500021k1ta6ma7e6jp', 'cllwh5xkn0002gbkqhhk6hpba');
INSERT INTO public.role_permissions VALUES ('cllwh6ztm0006gbkq6c3w9y1n', 'cllj7f1500021k1ta6ma7e6jp', 'cllwh6gjh0003gbkqhufb2lk4');
INSERT INTO public.role_permissions VALUES ('clm1u02dl0000sc4tbn85ecc4', 'cllj6n2rr000uk1ta11s42efu', 'cllj76sy2001ak1ta44ue1o7i');
INSERT INTO public.role_permissions VALUES ('clm50m42f00011gks9vu71f6y', 'cllj7f1500021k1ta6ma7e6jp', 'cllj77z37001ck1ta4h4i6jp3');
INSERT INTO public.role_permissions VALUES ('clm6aee8l0003h1ksaupq4j1a', 'cllj6n2rr000uk1ta11s42efu', 'clm6acy3s0000h1ks1hck7ef0');
INSERT INTO public.role_permissions VALUES ('clm6aefaz0004h1ksaqzo01be', 'cllj6n2rr000uk1ta11s42efu', 'clm6adhs10001h1ksebyr7hzu');
INSERT INTO public.role_permissions VALUES ('clm6aega60005h1ks3jcvdn6t', 'cllj6n2rr000uk1ta11s42efu', 'clm6adwmc0002h1kshnpq00gj');
INSERT INTO public.role_permissions VALUES ('cllwh7e9x0007gbkqen7eh849', 'cllj7fkdc0022k1tag8ns2z7c', 'cllwh4y9s0001gbkq2r6l46dq');
INSERT INTO public.role_permissions VALUES ('cllwh7g2a0008gbkqfnzbgay2', 'cllj7fkdc0022k1tag8ns2z7c', 'cllwh5xkn0002gbkqhhk6hpba');
INSERT INTO public.role_permissions VALUES ('cllwh7h3f0009gbkq1pjqer4g', 'cllj7fkdc0022k1tag8ns2z7c', 'cllwh6gjh0003gbkqhufb2lk4');
INSERT INTO public.role_permissions VALUES ('cllwh7v9t000bgbkq87317wr7', 'cllj7hn7e0024k1ta2hkuboyp', 'cllwh4y9s0001gbkq2r6l46dq');
INSERT INTO public.role_permissions VALUES ('clm1y1nfu0001104t946hbyt1', 'cllj6n2rr000uk1ta11s42efu', 'clm1y1c5g0000104t0axq3tw6');
INSERT INTO public.role_permissions VALUES ('clm50mdd100021gks3lg97gx5', 'cllj7f1500021k1ta6ma7e6jp', 'cllj77f1i001bk1tafiur0w5x');
INSERT INTO public.role_permissions VALUES ('clm6aes030006h1ksg2h8e837', 'cllj72j240015k1ta3flmgm8a', 'clm6acy3s0000h1ks1hck7ef0');
INSERT INTO public.role_permissions VALUES ('clm6aesmw0007h1ks0qnd5c1c', 'cllj72j240015k1ta3flmgm8a', 'clm6adhs10001h1ksebyr7hzu');
INSERT INTO public.role_permissions VALUES ('clm6aet8n0008h1ksbgi0deyc', 'cllj72j240015k1ta3flmgm8a', 'clm6adwmc0002h1kshnpq00gj');
INSERT INTO public.role_permissions VALUES ('cllwh7od4000agbkq6n2ca21n', 'cllj7gz130023k1ta5fx75n3c', 'cllwh4y9s0001gbkq2r6l46dq');
INSERT INTO public.role_permissions VALUES ('clm1y1vx20002104tgqkh43x5', 'cllj72j240015k1ta3flmgm8a', 'clm1y1c5g0000104t0axq3tw6');

INSERT INTO public."user" VALUES ('cllh5mpew0000q7ta3gtze8ds', '2023-08-18 22:20:57.519326', 'admin@admin.com', 'Max', 'Dachs', '$2a$10$h.p/S1qZwmoAP4CkXgQRxuIl8090WRtZC5Y3GCbNN1VSvInqzv.56', 'ADMIN', false, 'LOCAL', NULL, NULL);
INSERT INTO public."user" VALUES ('cllhsp2bq0001dxta4xzm9brw', '2023-08-19 09:06:38.730052', 'user@user.de', 'test', 'tester', '$2a$10$jlLQvxo0Empl7Qlu9IUKHu97Keqkv3BgSj4XgpP4clYEET7fXASIy', 'USER', false, 'LOCAL', NULL, NULL);
INSERT INTO public."user" VALUES ('cllmkgvap0000cqta1c5n0rg2', '2023-08-22 17:15:10.328161', 'matze@web.de', 'matze', 'Katze', '$2a$10$bvFB0ocFtDoktPjJxFzB0.CTb4Wpoq/r4dmApfTKXYLnx/Kc.d3MK', 'USER', false, 'LOCAL', NULL, NULL);
INSERT INTO public."user" VALUES ('clloas8r50000jfta1h8i0hpi', '2023-08-23 22:19:37.173872', 'ratze@web.de', 'ratze', 'rotze', '$2a$10$wLqU7OjYDWu/R3unOYcyA.UTUOilr9KPokRnl8ScgkNB6UaoHoIC2', 'USER', false, 'LOCAL', NULL, NULL);
INSERT INTO public."user" VALUES ('clloyyllk0000hmta23foa7gq', '2023-08-24 09:36:24.542557', 'gaggo@web.de', 'gaggo', 'maggo', '$2a$10$bs.CU/0SX04vhXiIqK2dB.yGjL30Y82wpKhQrMX7Jz1gMfNip7NfG', 'USER', false, 'LOCAL', NULL, NULL);
