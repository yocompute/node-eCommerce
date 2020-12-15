import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_AUTH_SOURCE = process.env.DB_AUTH_SOURCE;

const CONNECTION_STR = DB_USERNAME ? `mongodb://${DB_USERNAME}:${DB_PASSWORD}@127.0.0.1:27017/${DB_NAME}?authSource=${DB_AUTH_SOURCE}`
    : `mongodb://127.0.0.1:27017/${DB_NAME}`;

mongoose.connect(CONNECTION_STR, {useNewUrlParser: true, useUnifiedTopology: true});

export default mongoose;


// const db_connection = () => {
//   if (DB_AUTH) {
//     createConnection({
//       type: "mongodb",
//       username: DB_USERNAME,
//       password: DB_PASSWORD,
//       database: DB_NAME,
//       authSource: DB_AUTH_SOURCE,
//       useUnifiedTopology: true,
//       poolSize: 5,
//       entities: [__dirname + "/*/*.entity.js"],
//     })
//       .then((connection: Connection) => {
//         app.use(SVC_PATH + "/auth", AuthRoute(connection));
//         app.use(SVC_PATH + "/users", UserRoute(connection));
//         app.use(SVC_PATH + "/products", ProductRoute(connection));
//         // console.log("Inserting a new user into the database...");
//       })
//       .catch((error) => console.log(error));
//   } else {
//     //Todo: No Auth needed mongoDB connection
//     createConnection({
//       type: "mongodb",
//       database: DB_NAME,
//       useUnifiedTopology: true,
//       poolSize: 5,
//       entities: [__dirname + "/*/*.entity.js"],
//     })
//       .then((connection: Connection) => {
//         app.use(SVC_PATH + "/auth", AuthRoute(connection));
//         app.use(SVC_PATH + "/users", UserRoute(connection));
//         app.use(SVC_PATH + "/products", ProductRoute(connection));
//       })
//       .catch((error) => console.log(error));
//   }
// };

// export default db_connection;