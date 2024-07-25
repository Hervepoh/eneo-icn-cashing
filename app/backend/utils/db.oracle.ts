require("dotenv").config();
var oracledb = require('oracledb');

// Database configuration
const user:string = process.env.DB_CMS_USERNAME || "";
const password:string = process.env.DB_CMS_PASSWORD || "";
const host:string = process.env.DB_CMS_HOST || "";
const port:string = process.env.DB_CMS_PORT || "";
const service:string = process.env.DB_CMS_SERVICE_NAME || "";

const connectString:string = `(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=${host})(PORT=${port}))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=${service})))`;

// Configure connection information for the Oracle database
const dbConfig = {
  user : user ,
    password : password ,
    connectString : connectString
};

// Function to establish a connection to the database
async function getConnection() {
  try {
    const connection = await oracledb.getConnection(dbConfig);
    return connection;
  } catch (err) {
    console.error('Erreur lors de la connexion à la base de données:', err);
    throw err;
  }
}

// Function to close the database connection
async function releaseConnection(connection: any) {
  try {
    await connection.close();
  } catch (err) {
    console.error('Erreur lors de la fermeture de la connexion:', err);
    throw err;
  }
}

export { getConnection, releaseConnection };