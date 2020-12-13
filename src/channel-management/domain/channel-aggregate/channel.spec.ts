import { ObjectId } from 'mongodb';
import Channel from './channel';
import ChannelIcon from './channel-icon';
import ChannelName from './channel-name';
import ChannelStatus from './channel-status';

describe('Channel', () => {
  describe('publish', () => {
    it('should return a published channel', () => {
      const nameResult = ChannelName.create('A channel');
      const iconResult = ChannelIcon.create('5a7a0f99-d110-4e47-8deb-9d020d4c1468');

      const channel = new Channel(nameResult.getValue(), new ObjectId(), new ObjectId())
      channel.icon = iconResult.getValue();

      channel.publish()

      expect(channel.status).toBe(ChannelStatus.PUBLISHED);
    });

    it('should return a successful result', () => {
      const nameResult = ChannelName.create('A channel');
      const iconResult = ChannelIcon.create('5a7a0f99-d110-4e47-8deb-9d020d4c1468');

      const channel = new Channel(nameResult.getValue(), new ObjectId(), new ObjectId())
      channel.icon = iconResult.getValue();

      const result = channel.publish()

      expect(result.isSuccess).toBeTruthy();
    });

    it('should fail when publishing twice', () => {
      const nameResult = ChannelName.create('A channel');
      const iconResult = ChannelIcon.create('5a7a0f99-d110-4e47-8deb-9d020d4c1468');

      const channel = new Channel(nameResult.getValue(), new ObjectId(), new ObjectId())
      channel.icon = iconResult.getValue();

      channel.publish()

      const result = channel.publish()

      expect(result.isFailure).toBeTruthy();
    });

    it('should fail when missing icon', () => {
      const nameResult = ChannelName.create('A channel');

      const channel = new Channel(nameResult.getValue(), new ObjectId(), new ObjectId())

      const result = channel.publish()

      expect(result.isFailure).toBeTruthy();
    });
  });
});