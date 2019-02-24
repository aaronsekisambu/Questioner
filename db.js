import dotenv from 'dotenv';

import {Pool} from 'pg';

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
    `CREATE TABLE IF NOT EXISTS users
(
    u_id uuid NOT NULL PRIMARY KEY,
    firstname varchar(50) NOT NULL,
    lastname varchar(50) NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    isadmin boolean NOT NULL,
    username text NOT NULL,
    phonenumber integer NOT NULL UNIQUE,
    othername text NOT NULL UNIQUE,
    registered date NOT NULL DEFAULT CURRENT_DATE,
    modified date NOT NULL
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
    `CREATE TABLE IF NOT EXISTS questions
(
    q_id uuid NOT NULL PRIMARY KEY,
    meetup uuid NOT NULL,
    title text NOT NULL,
    body text NOT NULL,
    createdby uuid NOT NULL,
    upvote int NOT NULL,
    downvote int NOT NULL,
	createdon date NOT NULL DEFAULT CURRENT_DATE,
	FOREIGN KEY (createdby) REFERENCES users (u_id) ON DELETE CASCADE,
	FOREIGN KEY (meetup) REFERENCES meetups (m_id) ON DELETE CASCADE
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

// /**
//  * Drop Questions Table
//  */
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

// /**
//  * Create meetups Table
//  */
const createMeetupsTable = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS meetups
  (
	  m_id uuid NOT NULL PRIMARY KEY,
	  topic text NOT NULL,
	  images text NOT NULL,
	  location text NOT NULL,
	  createdon date NOT NULL DEFAULT CURRENT_DATE,
	  happeningon date NOT NULL DEFAULT CURRENT_DATE,
	  createdby uuid NOT NULL,
	  FOREIGN KEY (createdby) REFERENCES users (u_id) ON DELETE CASCADE
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

// /**
//  * Drop Questions Table
//  */
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


// /**
//  * Create Votes Table
//  */
const createVotesTable = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS votes
  (
	  v_id uuid NOT NULL PRIMARY KEY,
	  upvote int NOT NULL,
	  downvote int NOT NULL,
	  users_id uuid NOT NULL,
	  questions_id uuid NOT NULL,
	  FOREIGN KEY (questions_id) REFERENCES questions (q_id) ON DELETE CASCADE,
	  FOREIGN KEY (users_id) REFERENCES users (u_id) ON DELETE CASCADE
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

// /**
//  * Drop Votes Table
//  */
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



// /**
//  * Create Tags Table
//  */
const createTagsTable = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS tags
  (
	  tags_id uuid NOT NULL PRIMARY KEY,
	  user_id uuid NOT NULL,
	  questions_id uuid NOT NULL,
	  tagname text NOT NULL,
	  FOREIGN KEY (questions_id) REFERENCES questions (q_id) ON DELETE CASCADE,
	  FOREIGN KEY (user_id) REFERENCES users (u_id) ON DELETE CASCADE
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

// /**
//  * Drop Tags Table
//  */
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

// /**
//  * Create Comments Table
//  */
const createCommentsTable = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS comments
  	(
	  c_id uuid NOT NULL PRIMARY KEY,
	  user_id uuid NOT NULL,
	  questions_id uuid NOT NULL,
	  body text NOT NULL,
	  FOREIGN KEY (user_id) REFERENCES users (u_id) ON DELETE CASCADE,
	  FOREIGN KEY (questions_id) REFERENCES questions (q_id) ON DELETE CASCADE
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

// /**
//  * Drop Comments Table
//  */
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

// /**
//  * Create Rsvps Table
//  */
const createRsvpsTable = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS rsvps
  (
	rsvp_id uuid NOT NULL PRIMARY KEY,
	users_id uuid NOT NULL,
	status text NOT NULL,
	meetup_id uuid NOT NULL,
	FOREIGN KEY (meetup_id) REFERENCES questions (q_id) ON DELETE CASCADE,
	FOREIGN KEY (users_id) REFERENCES users (u_id) ON DELETE CASCADE
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
createMeetupsTable();
createQuestionsTable();
createVotesTable();

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
