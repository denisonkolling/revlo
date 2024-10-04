import { Options, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';

const mikroOrmConfig: Options = {
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    user: process.env.DB_USERNAME || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    driver: PostgreSqlDriver,
    dbName: process.env.DB_NAM || 'revlo_v2',
    password: process.env.DB_PASSWORD || '102030',
    entities: ['./dist/app/**/*.entity.js'],
    entitiesTs: ['./src/app/**/*.entity.ts'],
    extensions: [
        Migrator,
    ],
    migrations: {
        path: './dist/migrations',
        pathTs: './src/migrations',
    },

};

export default mikroOrmConfig;