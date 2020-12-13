import ChannelIcon from './channel-icon';

describe('ChannelIcon', () => {
  describe('create', () => {
    it('should fail when passing invalid UUID string', () => {
      const iconResult = ChannelIcon.create('5a7a0f99-d110-9d020d4c1468');

      expect(iconResult.isFailure).toBeTruthy();
    });
  });
});