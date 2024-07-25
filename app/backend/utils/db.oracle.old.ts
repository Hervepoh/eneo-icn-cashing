require("dotenv").config();
let connectOracleDB;
var oracledb = require('oracledb');

(async function() {
try{
    const user:string = process.env.DB_CMS_USERNAME || "";
    const password:string = process.env.DB_CMS_PASSWORD || "";
    const host:string = process.env.DB_CMS_HOST || "";
    const port:string = process.env.DB_CMS_PORT || "";
    const service:string = process.env.DB_CMS_SERVICE_NAME || "";
    
    const connectString:string = `(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=${host})(PORT=${port}))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=${service})))`;
    
    connectOracleDB = await oracledb.getConnection({
        user : user ,
        password : password ,
        connectString : connectString
   });

   console.log("Successfully connected to Oracle!")
} catch(err) {
    console.log("Error: ", err);
  } finally {
    if (connectOracleDB) {
      try {
        await connectOracleDB.close();
      } catch(err) {
        console.log("Error when closing the database connection: ", err);
      }
    }
  }
})()

export default connectOracleDB;