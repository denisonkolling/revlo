import { Options, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
import * as dotenv from 'dotenv';
import { Review } from '../app/review/entities/review.entity';
import { User } from '../app/user/entities/user.entity';

dotenv.config();

const mikroOrmConfig: Options = {
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    driver: PostgreSqlDriver,
    dbName: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    entities: [User, Review],
    entitiesTs: [User, Review],

    /** TODO
    * - Check and adjust the relative path for entities, according to the environment:
    * - Use 'entities' with the.js file path for the production environment(after transpilation).
    * -  Use 'entitiesTs' with the.ts file path for the development environment(before transpilation).
    */

    // entities: ['./dist/app/**/*.entity.js']
    // entitiesTs: ['./src/app/**/*.entity.ts']

    extensions: [
        Migrator,
    ],
    migrations: {
        path: './dist/migrations',
        pathTs: './src/migrations',
    },

};



export default mikroOrmConfig;