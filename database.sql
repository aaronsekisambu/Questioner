--
-- PostgreSQL database dump
--

-- Dumped from database version 11.0
-- Dumped by pg_dump version 11.1

-- create database "questioner-db";

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: aaron
--

CREATE TABLE public.comments (
    c_id uuid NOT NULL,
    user_id uuid NOT NULL,
    questions_id uuid NOT NULL,
    body text NOT NULL
);


ALTER TABLE public.comments OWNER TO aaron;

--
-- Name: meetups; Type: TABLE; Schema: public; Owner: aaron
--

CREATE TABLE public.meetups (
    m_id uuid NOT NULL,
    topic text NOT NULL,
    images text NOT NULL,
    location text NOT NULL,
    createdon date NOT NULL,
    happeningon date NOT NULL,
    createdby uuid NOT NULL
);


ALTER TABLE public.meetups OWNER TO aaron;

--
-- Name: questions; Type: TABLE; Schema: public; Owner: aaron
--

CREATE TABLE public.questions (
    q_id uuid NOT NULL,
    meetup uuid NOT NULL,
    title text NOT NULL,
    body text NOT NULL,
    createdby uuid NOT NULL,
    upvote numeric NOT NULL,
    downvote numeric NOT NULL,
    createdon date NOT NULL
);


ALTER TABLE public.questions OWNER TO aaron;

--
-- Name: rsvps; Type: TABLE; Schema: public; Owner: aaron
--

CREATE TABLE public.rsvps (
    rsvp_id uuid NOT NULL,
    users_id uuid NOT NULL,
    status text NOT NULL,
    meetup_id uuid NOT NULL
);


ALTER TABLE public.rsvps OWNER TO aaron;

--
-- Name: tags; Type: TABLE; Schema: public; Owner: aaron
--

CREATE TABLE public.tags (
    tags_id uuid NOT NULL,
    user_id uuid NOT NULL,
    questions_id uuid NOT NULL,
    tagname text NOT NULL
);


ALTER TABLE public.tags OWNER TO aaron;

--
-- Name: users; Type: TABLE; Schema: public; Owner: aaron
--

CREATE TABLE public.users (
    u_id uuid NOT NULL,
    firstname character varying(50) NOT NULL,
    lastname character varying(50) NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    isadmin boolean NOT NULL,
    username text NOT NULL,
    phonenumber integer NOT NULL,
    othername text NOT NULL,
    registered date DEFAULT CURRENT_DATE NOT NULL,
    modified date NOT NULL
);


ALTER TABLE public.users OWNER TO aaron;

--
-- Name: votes; Type: TABLE; Schema: public; Owner: aaron
--

CREATE TABLE public.votes (
    v_id uuid NOT NULL,
    upvote numeric NOT NULL,
    downvote numeric NOT NULL,
    users_id uuid NOT NULL,
    questions_id uuid NOT NULL
);


ALTER TABLE public.votes OWNER TO aaron;

--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: aaron
--
--
-- COPY public.comments (c_id, user_id, questions_id, body) FROM stdin;
-- \.
--
--
-- --
-- -- Data for Name: meetups; Type: TABLE DATA; Schema: public; Owner: aaron
-- --
--
-- COPY public.meetups (m_id, topic, images, location, createdon, happeningon, createdby) FROM stdin;
-- bf8f29c8-e60c-4601-92ea-b36dce98069a	Javascript	nhsyhsns	NewYork	2019-01-23	2019-01-24	33444605-e7fe-4c63-a316-5cc454bb51f5
-- 1de02ad1-2271-4e36-8ef1-276a5268a0ae	Javascript	nhsyhsns	NewYork	2019-01-24	2019-01-24	0101d3c3-96d7-4322-ae4e-fbb16764b2da
-- a5076841-66ed-44d3-91ef-56468b806d38	Javascript	nhsyhsns	NewYork	2019-01-24	2019-01-24	33444605-e7fe-4c63-a316-5cc454bb51f5
-- 339ebf0b-f914-48fa-ac1f-1e615db26d8f	Javascript	nhsyhsns	NewYork	2019-01-25	2019-01-25	33444605-e7fe-4c63-a316-5cc454bb51f5
-- \.
--
--
-- --
-- -- Data for Name: questions; Type: TABLE DATA; Schema: public; Owner: aaron
-- --
--
-- COPY public.questions (q_id, meetup, title, body, createdby, upvote, downvote, createdon) FROM stdin;
-- 4f70228a-5b3e-429c-8e9b-69b675f073e5	1de02ad1-2271-4e36-8ef1-276a5268a0ae	cats	no_image4545	33444605-e7fe-4c63-a316-5cc454bb51f5	0	0	2019-01-24
-- 15c63702-f484-4f68-8ab0-73746eba7bf9	a5076841-66ed-44d3-91ef-56468b806d38	my-dog	no_image	33444605-e7fe-4c63-a316-5cc454bb51f5	0	0	2019-01-24
-- 15927ad5-90ff-49ca-bf2a-04da33a23e54	a5076841-66ed-44d3-91ef-56468b806d38	my-dog	no_image	33444605-e7fe-4c63-a316-5cc454bb51f5	0	0	2019-01-24
-- 32db98fe-c5e2-4e56-b31a-cc85271e4ba4	a5076841-66ed-44d3-91ef-56468b806d38	my-dog	no_image	33444605-e7fe-4c63-a316-5cc454bb51f5	0	0	2019-01-24
-- e06687f1-356d-4be4-9102-b0ea7a8ca7d7	bf8f29c8-e60c-4601-92ea-b36dce98069a	my-dog	no_image	33444605-e7fe-4c63-a316-5cc454bb51f5	2	0	2019-01-23
-- \.
--
--
-- --
-- -- Data for Name: rsvps; Type: TABLE DATA; Schema: public; Owner: aaron
-- --
--
-- COPY public.rsvps (rsvp_id, users_id, status, meetup_id) FROM stdin;
-- \.
--
--
-- --
-- -- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: aaron
-- --
--
-- COPY public.tags (tags_id, user_id, questions_id, tagname) FROM stdin;
-- \.
--
--
-- --
-- -- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: aaron
-- --
--
-- COPY public.users (u_id, firstname, lastname, email, password, isadmin, username, phonenumber, othername, registered, modified) FROM stdin;
-- 056790b3-ca88-488f-922d-47a049a4f4a7	Aaron	Sekisambu	aaeon.sekisambu@gmail.com	$2b$08$.DcRFmNv/Ei2VhNsoUq4uO9yCkIfFScCvVzrV2ecmmN2QBYCp5Uui	t	snowman	256	senior	2019-01-25	2019-01-25
-- 12b49787-9391-40a6-9c16-258f3536aba9	Aaronhhg	Sekisambuhhh	aaron.sekisambu3ryytytyt@gmail.com	$2b$08$vW5B4rkkQpGrsf8LcE1eCe9UWXqTWRCcM4.wrfHP17skY2xFLWFPi	t	Snow3ghhh	256	Jamesghh	2019-01-25	2019-01-25
-- 24f66f3c-984d-4102-aca4-afaf85f477ae	Peter	Sekisambu	peter.sekisambu@gmail.com	$2b$08$8rdDdxS9XBds09SWhH70A.UHCOg6lJRddr9la5QRzLTgNDuXqN8GS	t	peterman	256		2019-01-23	2019-01-23
-- 0101d3c3-96d7-4322-ae4e-fbb16764b2da	Daizy	Sekisambu	daizy.sekisambu@gmail.com	$2b$08$e/QLPO8HhHXrR3q0tB901.hJqx1J20F.Gp02k4jwt3QJgqJ/4IGTe	t	daizy	256	ari	2019-01-23	2019-01-23
-- 7b0c5f48-5258-427c-bc5c-0c42a59b88b3	Daizy	Sekisambu	aariana.sekisambu@gmail.com	$2b$08$jykMu75wYUsp.twxkZ6j6ukIVmy0HLNpUfuUAzNM.JnL1o6ze3aHe	t	nana	256	aArriana	2019-01-23	2019-01-23
-- 3610b741-3e00-49f3-8e84-996d33f0fc26	Aaron	Sekisambu	aaeon.sekisambu344@gmail.com	$2b$08$wSH9bznRJ/jTDTPMQkrd9O9bF9YwioLvV.il3Xf965rxVLxlrOhta	t	snowmaneer	256	senior	2019-01-25	2019-01-25
-- 33444605-e7fe-4c63-a316-5cc454bb51f5	kisambu	ron	some@email.site	$2b$08$zfSyoK1vma7lJnIvk9zos.05lZjshh6zb.MUXelL.gGW6aBwUpDFS	t	santos	1234567	aha	2019-01-23	2019-01-23
-- 0de7b3ef-e7f7-45b2-86cd-48bc0c6a4ff1	Aaron	Sehhhgkisambu	aaeon.sekisahhhgmbu344@gmail.com	$2b$08$sQHq0jUbvE7EGkPnDxfL.OUNXZO1rfaUCW6ArGjNTRl3TIcuM7eXy	t	snowhhmaneer	256	senior	2019-01-25	2019-01-25
-- 5afd0c8d-1856-49d5-9300-120cc666feaf	Aaron	Sehhhgkis6555ambu	aaeon.sekisahhhgmbu6655344@gmail.com	$2b$08$EnOQb6LguiupK4ZWLZu4MuOjqlxgypHx6uz8/UiFeb8HRqPYfD4Lq	t	sn6555owhhmaneer	256	senior	2019-01-25	2019-01-25
-- 8ad23c1d-7fbb-4351-b52b-d96c0d66c0a0	Aaron	Sehhhsssgkis6555ambu	aaeon.sekisahssshhgmbu6655344@gmail.com	$2b$08$R89MxmeGu6xAFXKARGzhsOsvpnuHnzwhvSQNej2zH8UqDBXcVUoJO	t	sn6ssss555owhhmaneer	256	senior	2019-01-25	2019-01-25
-- 4c95c2b0-c751-4d98-87cf-6a4f37271131	A	B	a@b.com	$2b$08$6UGKjX4IztZeCC4f/4KYP.64.UbuCIgfi3wMViLWLC0VRqHexRt7e	t	me	1234	k	2019-01-25	2019-01-25
-- c8b500ac-7da0-45bf-a191-0e22562cdb64	A	B	a@b.com23	$2b$08$z7L6Dj6bcGgusPJZeOory.txKloTSg5baGfG9RTl5b.LsapaGM/yK	t	me43	1234	k43	2019-01-25	2019-01-25
-- 79bb506b-3616-4f5c-8d87-f36da066edab	Aere3e	Beerew	a@b.erecom23	$2b$08$.0ky4A15zm3SoqwlxYTmyuUauFr0udUTQ.ns6r/pngG92IUHPjTP.	t	meeeer43	1234	k43	2019-01-25	2019-01-25
-- 7d1cfc3d-b7cc-4c67-ab51-bee09d85fdc8	Aererer3e	Beerreeew	a@b.erecomder23	$2b$08$YHpNu0iIKPc1xB8sHU4t9uzUJRxTHzzhJo5AYCFWU2lbBvkxh8vmm	t	meeeerer43	1234	k4e3	2019-01-25	2019-01-25
-- c252073f-83c8-478d-8290-7a98b40da4d1	Aaron	Kay1anja	kaya55n@gmail.com	$2b$08$NTLTdotadTCcA98Mc.dPdutHuG5pgpgdSFeBIJygpUv./ECZht6e2	t	James12	12345	Aaron	2019-01-28	2019-01-28
-- \.
--
--
-- --
-- -- Data for Name: votes; Type: TABLE DATA; Schema: public; Owner: aaron
-- --
--
-- COPY public.votes (v_id, upvote, downvote, users_id, questions_id) FROM stdin;
-- 89f08389-f593-4b7d-b0c4-0ceddc27bf70	1	0	24f66f3c-984d-4102-aca4-afaf85f477ae	e06687f1-356d-4be4-9102-b0ea7a8ca7d7
-- c2a2a923-f08d-4e2b-bb96-c0006df32d65	1	0	33444605-e7fe-4c63-a316-5cc454bb51f5	e06687f1-356d-4be4-9102-b0ea7a8ca7d7
-- \.
--

--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: aaron
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (c_id);


--
-- Name: meetups meetup_key; Type: CONSTRAINT; Schema: public; Owner: aaron
--

ALTER TABLE ONLY public.meetups
    ADD CONSTRAINT meetup_key PRIMARY KEY (m_id);


--
-- Name: questions questions_pkey; Type: CONSTRAINT; Schema: public; Owner: aaron
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (q_id);


--
-- Name: rsvps rsvps_pkey; Type: CONSTRAINT; Schema: public; Owner: aaron
--

ALTER TABLE ONLY public.rsvps
    ADD CONSTRAINT rsvps_pkey PRIMARY KEY (rsvp_id);


--
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: public; Owner: aaron
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (tags_id);


--
-- Name: users users_email_username_key; Type: CONSTRAINT; Schema: public; Owner: aaron
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_username_key UNIQUE (email) INCLUDE (username);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: aaron
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (u_id);


--
-- Name: users users_username_isadmin_key; Type: CONSTRAINT; Schema: public; Owner: aaron
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_isadmin_key UNIQUE (username) INCLUDE (isadmin);


--
-- Name: votes votes_pkey; Type: CONSTRAINT; Schema: public; Owner: aaron
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT votes_pkey PRIMARY KEY (v_id);


--
-- Name: comments comments_questions_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aaron
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_questions_id_fkey FOREIGN KEY (questions_id) REFERENCES public.questions(q_id);


--
-- Name: comments comments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aaron
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(u_id);


--
-- Name: meetups meetups_createdby_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aaron
--

ALTER TABLE ONLY public.meetups
    ADD CONSTRAINT meetups_createdby_fkey FOREIGN KEY (createdby) REFERENCES public.users(u_id);


--
-- Name: questions questions_createdby_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aaron
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_createdby_fkey FOREIGN KEY (createdby) REFERENCES public.users(u_id);


--
-- Name: questions questions_meetup_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aaron
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_meetup_fkey FOREIGN KEY (meetup) REFERENCES public.meetups(m_id);


--
-- Name: rsvps rsvps_meetup_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aaron
--

ALTER TABLE ONLY public.rsvps
    ADD CONSTRAINT rsvps_meetup_id_fkey FOREIGN KEY (meetup_id) REFERENCES public.meetups(m_id);


--
-- Name: rsvps rsvps_users_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aaron
--

ALTER TABLE ONLY public.rsvps
    ADD CONSTRAINT rsvps_users_id_fkey FOREIGN KEY (users_id) REFERENCES public.users(u_id);


--
-- Name: tags tags_questions_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aaron
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_questions_id_fkey FOREIGN KEY (questions_id) REFERENCES public.questions(q_id);


--
-- Name: tags tags_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aaron
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(u_id);


--
-- Name: votes votes_questions_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aaron
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT votes_questions_id_fkey FOREIGN KEY (questions_id) REFERENCES public.questions(q_id);


--
-- Name: votes votes_users_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aaron
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT votes_users_id_fkey FOREIGN KEY (users_id) REFERENCES public.users(u_id);


--
-- PostgreSQL database dump complete
--

