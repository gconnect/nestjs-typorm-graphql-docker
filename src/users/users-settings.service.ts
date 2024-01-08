import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSettings } from 'src/graphql/models/UserSettings';
import { User } from 'src/graphql/models/Users';
import { CreateUserSettingsInput } from 'src/graphql/utils/CreateUserSettingsInput';
import { Repository } from 'typeorm';

@Injectable()
export class UsersSettingsService {
  constructor(
    @InjectRepository(UserSettings)
    private userSettingsRepository: Repository<UserSettings>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  getUserSettingsById(userId: number) {
    return this.userSettingsRepository.findOneBy({ userId });
  }

  async createUserSettings(userSettingsData: CreateUserSettingsInput) {
    const findUser = await this.userRepository.findOneBy({
      id: userSettingsData.userId,
    });
    if (!findUser) throw new Error('User not found');
    const newuserSettings =
      this.userSettingsRepository.create(userSettingsData);
    const savedSettings = await this.userSettingsRepository.save(
      newuserSettings,
    );
    findUser.settings = savedSettings;
    await this.userRepository.save(findUser);
    return savedSettings;
  }
}
