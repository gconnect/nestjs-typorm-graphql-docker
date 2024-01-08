import { Module } from '@nestjs/common';
import { UserResolver } from './UserResolver';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../graphql/models/Users';
import { UsersSettingsService } from './users-settings.service';
import { UserSettings } from 'src/graphql/models/UserSettings';
import { UserSettingsResolver } from 'src/resolvers/UserSettingsResolver';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserSettings])],
  providers: [
    UserResolver,
    UsersService,
    UsersSettingsService,
    UserSettingsResolver,
  ],
})
export class UserModule {}
