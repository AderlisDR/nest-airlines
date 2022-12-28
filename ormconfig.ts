import { DataSource, DataSourceOptions } from 'typeorm';
import ormConfig from './ormconfig.json';

const dataSource = new DataSource(ormConfig as DataSourceOptions);

export { dataSource };
