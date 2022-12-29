import { configService } from './src/config/config.service';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

const options: DataSourceOptions & SeederOptions = Object.assign(
  configService.getTypeOrmConfig() as DataSourceOptions,
  configService.getSeederOptions(),
);

export const dataSource = new DataSource(options);
