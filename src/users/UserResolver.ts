import {
  Resolver,
  Query,
  Args,
  Int,
  ResolveField,
  Parent,
  Mutation,
} from '@nestjs/graphql';
import { User } from '../graphql/models/Users';
import { mockusers } from 'src/__mocks__/MockUsers';
import { UserSettings } from 'src/graphql/models/UserSettings';
import { mockUserSettings } from 'src/__mocks__/MockUsersSettings';
import { CreateUserInput } from 'src/graphql/utils/CreateUserInput';
import { UsersService } from './users.service';
import { UsersSettingsService } from './users-settings.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(
    private userService: UsersService,
    private userSettingsService: UsersSettingsService,
  ) {}

  @Query((returns) => User, { nullable: true })
  getUserById(@Args('id', { type: () => Int }) id: number) {
    return this.userService.getUserById(id);
  }

  @Query(() => [User])
  getUsers() {
    return this.userService.getUsers();
  }

  @ResolveField((returns) => UserSettings, { name: 'settings', nullable: true })
  getUserSettings(@Parent() user: User) {
    return this.userSettingsService.getUserSettingsById(user.id);
  }

  @Mutation((returns) => User)
  createUser(@Args('createUserData') createUserData: CreateUserInput) {
    this.userService.createUser(createUserData);
  }
}
