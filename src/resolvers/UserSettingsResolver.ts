import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { UserSettings } from 'src/graphql/models/UserSettings';
import { mockUserSettings } from 'src/__mocks__/MockUsersSettings';
import { CreateUserSettingsInput } from 'src/graphql/utils/CreateUserSettingsInput';
import { UsersSettingsService } from 'src/users/users-settings.service';

@Resolver()
export class UserSettingsResolver {
  constructor(private userSettingsService: UsersSettingsService) {}

  @Mutation((returns) => UserSettings)
  async createUserSetings(
    @Args('createUserSettingsData')
    createUserSettingsData: CreateUserSettingsInput,
  ) {
    const userSetting = await this.userSettingsService.createUserSettings(
      createUserSettingsData,
    );
    return userSetting;
  }
}
