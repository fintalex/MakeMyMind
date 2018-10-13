import { UserSettingModule } from './user-setting.module';

describe('UserSettingModule', () => {
  let userSettingModule: UserSettingModule;

  beforeEach(() => {
    userSettingModule = new UserSettingModule();
  });

  it('should create an instance', () => {
    expect(userSettingModule).toBeTruthy();
  });
});
