import ChannelName from './channel-name';

describe('ChannelName', () => {
  describe('create', () => {
    it('should fail when passing more than 30 characters string', () => {
      const nameResult = ChannelName.create('A too large string to be used a channel name');

      expect(nameResult.isFailure).toBeTruthy();
    });
  });
});