import { JwtauthguardGuard } from './jwtauthguard.guard';

describe('JwtauthguardGuard', () => {
  it('should be defined', () => {
    expect(new JwtauthguardGuard()).toBeDefined();
  });
});
