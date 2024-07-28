require("dotenv").config();

// Database configuration
const user: string = process.env.DB_CMS_USERNAME || "";
const password: string = process.env.DB_CMS_PASSWORD || "";
const host: string = process.env.DB_CMS_HOST || "";
const port: string = process.env.DB_CMS_PORT || "";
const service: string = process.env.DB_CMS_SERVICE_NAME || "";

const connectString: string = `(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=${host})(PORT=${port}))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=${service})))`;

// Connection information for the Oracle database
export const dbConfig = {
    user: user,
    password: password,
    connectString: connectString
};

// Pool Connection information for the Oracle database
export const pooldbConfig = {
    user: user,
    password: password,
    connectString: connectString,
    poolMax: 10, // Maximum number of connections in the pool
    poolMin: 0, // Minimum number of connections in the pool
    poolIncrement: 1, // Number of connections to add when expanding the pool
    poolTimeout: 60 // Number of seconds of inactivity before a connection is closed
};