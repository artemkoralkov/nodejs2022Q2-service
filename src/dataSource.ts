import { DataSource } from 'typeorm';
import 'dotenv/config';
export const dataSource = new DataSource({
  type: 'postgres',
  host: '0.0.0.0',
  port: +process.env.POSTGRES_PORT || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  migrationsTableName: 'migrations',
  entities: ['dist/**/entities/*.entity.js'],
  migrations: ['dist/src/migrations/*.js'],
});
