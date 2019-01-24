const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
	console.log('connected to the db');
});

/**
 * Create users Table
 */
const createUsersTable = () => {
	const queryText =      
      `CREATE TABLE IF NOT EXISTS public.users
(
    u_id uuid NOT NULL,
    firstname character varying(50) COLLATE pg_catalog."default" NOT NULL,
    lastname character varying(50) COLLATE pg_catalog."default" NOT NULL,
    email text COLLATE pg_catalog."default" NOT NULL,
    password text COLLATE pg_catalog."default" NOT NULL,
    isadmin boolean NOT NULL,
    username text COLLATE pg_catalog."default" NOT NULL,
    phonenumber integer NOT NULL,
    othername text COLLATE pg_catalog."default" NOT NULL,
    registered date NOT NULL DEFAULT CURRENT_DATE,
    modified date NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (u_id),
    CONSTRAINT users_email_username_key UNIQUE (email)no
        INCLUDE(username),
    CONSTRAINT users_username_isadmin_key UNIQUE (username)
        INCLUDE(isadmin)
)`;

	pool.query(queryText)
		.then((res) => {
			console.log(res);
			pool.end();
		})
		.catch((err) => {
			console.log(err);
			pool.end();
		});
};

/**
 * Drop users Table
 */
const dropUsersTable = () => {
	const queryText = 'DROP TABLE IF EXISTS users returning *';
	pool.query(queryText)
		.then((res) => {
			console.log(res);
			pool.end();
		})
		.catch((err) => {
			console.log(err);
			pool.end();
		});
};


/**
 * Create questions Table
 */
const createQuestionsTable = () => {
	const queryText =
  `CREATE TABLE IF NOT EXISTS public.questions
(
    q_id uuid NOT NULL,
    meetup uuid NOT NULL,
    title text COLLATE pg_catalog."default" NOT NULL,
    body text COLLATE pg_catalog."default" NOT NULL,
    createdby uuid NOT NULL,
    upvote numeric NOT NULL,
    downvote numeric NOT NULL,
    createdon date NOT NULL,
    CONSTRAINT questions_pkey PRIMARY KEY (q_id),
    CONSTRAINT questions_createdby_fkey FOREIGN KEY (createdby)
        REFERENCES public.users (u_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT questions_meetup_fkey FOREIGN KEY (meetup)
        REFERENCES public.meetups (m_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)`;

	pool.query(queryText)
		.then((res) => {
			console.log(res);
			pool.end();
		})
		.catch((err) => {
			console.log(err);
			pool.end();
		});
};

/**
 * Drop Questions Table
 */
const dropQuestionsTable = () => {
	const queryText = 'DROP TABLE IF EXISTS questions returning *';
	pool.query(queryText)
		.then((res) => {
			console.log(res);
			pool.end();
		})
		.catch((err) => {
			console.log(err);
			pool.end();
		});
};

/**
 * Create meetups Table
 */
const createMeetupsTable = () => {
	const queryText =
  `CREATE TABLE IF NOT EXITS public.meetups
  (
	  m_id uuid NOT NULL,
	  topic text COLLATE pg_catalog."default" NOT NULL,
	  images text COLLATE pg_catalog."default" NOT NULL,
	  location text COLLATE pg_catalog."default" NOT NULL,
	  createdon date NOT NULL,
	  happeningon date NOT NULL,
	  createdby uuid NOT NULL,
	  CONSTRAINT meetup_key PRIMARY KEY (m_id),
	  CONSTRAINT meetups_createdby_fkey FOREIGN KEY (createdby)
		  REFERENCES public.users (u_id) MATCH SIMPLE
		  ON UPDATE NO ACTION
		  ON DELETE NO ACTION
  )`;

	pool.query(queryText)
		.then((res) => {
			console.log(res);
			pool.end();
		})
		.catch((err) => {
			console.log(err);
			pool.end();
		});
};

/**
 * Drop Questions Table
 */
const dropMeetupsTable = () => {
	const queryText = 'DROP TABLE IF EXISTS meetups returning *';
	pool.query(queryText)
		.then((res) => {
			console.log(res);
			pool.end();
		})
		.catch((err) => {
			console.log(err);
			pool.end();
		});
};


/**
 * Create Votes Table
 */
const createVotesTable = () => {
	const queryText =
  `CREATE TABLE IF NOT EXISTS public.votes
  (
	  v_id uuid NOT NULL,
	  upvote numeric NOT NULL,
	  downvote numeric NOT NULL,
	  users_id uuid NOT NULL,
	  questions_id uuid NOT NULL,
	  CONSTRAINT votes_pkey PRIMARY KEY (v_id),
	  CONSTRAINT votes_questions_id_fkey FOREIGN KEY (questions_id)
		  REFERENCES public.questions (q_id) MATCH SIMPLE
		  ON UPDATE NO ACTION
		  ON DELETE NO ACTION,
	  CONSTRAINT votes_users_id_fkey FOREIGN KEY (users_id)
		  REFERENCES public.users (u_id) MATCH SIMPLE
		  ON UPDATE NO ACTION
		  ON DELETE NO ACTION
  )`;

	pool.query(queryText)
		.then((res) => {
			console.log(res);
			pool.end();
		})
		.catch((err) => {
			console.log(err);
			pool.end();
		});
};

/**
 * Drop Votes Table
 */
const dropVotesTable = () => {
	const queryText = 'DROP TABLE IF EXISTS votes returning *';
	pool.query(queryText)
		.then((res) => {
			console.log(res);
			pool.end();
		})
		.catch((err) => {
			console.log(err);
			pool.end();
		});
};



/**
 * Create Tags Table
 */
const createTagsTable = () => {
	const queryText =
  `CREATE TABLE IF NOT EXITS public.tags
  (
	  tags_id uuid NOT NULL,
	  user_id uuid NOT NULL,
	  questions_id uuid NOT NULL,
	  tagname text COLLATE pg_catalog."default" NOT NULL,
	  CONSTRAINT tags_pkey PRIMARY KEY (tags_id),
	  CONSTRAINT tags_questions_id_fkey FOREIGN KEY (questions_id)
		  REFERENCES public.questions (q_id) MATCH SIMPLE
		  ON UPDATE NO ACTION
		  ON DELETE NO ACTION,
	  CONSTRAINT tags_user_id_fkey FOREIGN KEY (user_id)
		  REFERENCES public.users (u_id) MATCH SIMPLE
		  ON UPDATE NO ACTION
		  ON DELETE NO ACTION
  )`;

	pool.query(queryText)
		.then((res) => {
			console.log(res);
			pool.end();
		})
		.catch((err) => {
			console.log(err);
			pool.end();
		});
};

/**
 * Drop Tags Table
 */
const dropTagsTable = () => {
	const queryText = 'DROP TABLE IF EXISTS tags returning *';
	pool.query(queryText)
		.then((res) => {
			console.log(res);
			pool.end();
		})
		.catch((err) => {
			console.log(err);
			pool.end();
		});
};

/**
 * Create Comments Table
 */
const createCommentsTable = () => {
	const queryText =
  `CREATE TABLE  IF NOT EXISTS public.comments
  (
	  c_id uuid NOT NULL,
	  user_id uuid NOT NULL,
	  questions_id uuid NOT NULL,
	  body text COLLATE pg_catalog."default" NOT NULL,
	  CONSTRAINT comments_pkey PRIMARY KEY (c_id),
	  CONSTRAINT comments_questions_id_fkey FOREIGN KEY (questions_id)
		  REFERENCES public.questions (q_id) MATCH SIMPLE
		  ON UPDATE NO ACTION
		  ON DELETE NO ACTION,
	  CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id)
		  REFERENCES public.users (u_id) MATCH SIMPLE
		  ON UPDATE NO ACTION
		  ON DELETE NO ACTION
  ))`;

	pool.query(queryText)
		.then((res) => {
			console.log(res);
			pool.end();
		})
		.catch((err) => {
			console.log(err);
			pool.end();
		});
};

/**
 * Drop Comments Table
 */
const dropCommentsTable = () => {
	const queryText = 'DROP TABLE IF EXISTS comments returning *';
	pool.query(queryText)
		.then((res) => {
			console.log(res);
			pool.end();
		})
		.catch((err) => {
			console.log(err);
			pool.end();
		});
};

/**
 * Create Rsvps Table
 */
const createRsvpsTable = () => {
	const queryText =
  `CREATE TABLE IF NOT EXISTS public.rsvps
  (
	  rsvp_id uuid NOT NULL,
	  users_id uuid NOT NULL,
	  status text COLLATE pg_catalog."default" NOT NULL,
	  meetup_id uuid NOT NULL,
	  CONSTRAINT rsvps_pkey PRIMARY KEY (rsvp_id),
	  CONSTRAINT rsvps_meetup_id_fkey FOREIGN KEY (meetup_id)
		  REFERENCES public.meetups (m_id) MATCH SIMPLE
		  ON UPDATE NO ACTION
		  ON DELETE NO ACTION,
	  CONSTRAINT rsvps_users_id_fkey FOREIGN KEY (users_id)
		  REFERENCES public.users (u_id) MATCH SIMPLE
		  ON UPDATE NO ACTION
		  ON DELETE NO ACTION
  )`;

	pool.query(queryText)
		.then((res) => {
			console.log(res);
			pool.end();
		})
		.catch((err) => {
			console.log(err);
			pool.end();
		});
};

/**
 * Drop Tags Table
 */
const dropRsvpsTable = () => {
	const queryText = 'DROP TABLE IF EXISTS tags returning *';
	pool.query(queryText)
		.then((res) => {
			console.log(res);
			pool.end();
		})
		.catch((err) => {
			console.log(err);
			pool.end();
		});
};


pool.on('remove', () => {
	console.log('client removed');
	process.exit(0);
});
createUsersTable();
createQuestionsTable();
createVotesTable();
createTagsTable();
createCommentsTable();
createRsvpsTable();
module.exports = {
	createUsersTable,
	createQuestionsTable,
	createMeetupsTable,
	createVotesTable,
	createTagsTable,
	createCommentsTable,
	createRsvpsTable,
	dropUsersTable,
	dropQuestionsTable,
	dropMeetupsTable,
	dropVotesTable,
	dropTagsTable,
	dropCommentsTable,
	dropRsvpsTable
};

require('make-runnable');