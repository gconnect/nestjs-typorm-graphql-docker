import { Module } from '@nestjs/common';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { UserSettingsResolver } from './resolvers/UserSettingsResolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { User } from './graphql/models/Users';
import { UserSettings } from './graphql/models/UserSettings';
import { UserModule } from './users/users.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/shema.gql',
    }),
    TypeOrmModule.forRoot(
      {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'mysecretpassword',
        database: 'my_database',
        url: 'postgres://postgres:mysecretpassword@localhost:5432/my_database',
        entities: [User, UserSettings],
        synchronize: true, // should be false on prod
        logging: true,
      },
      // configService.getTypeOrmConfig()
    ),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
