import preferedChannelModel from '../models/prefered-channel-model';

const createPreferedChannel =
  (model: typeof preferedChannelModel) =>
  (required: { channel_id: string; follower_id: string; position: number }) => {
    const preferedChannel = new model(required);
    return preferedChannel.save();
  };

const deletePreferedChannel =
  (model: typeof preferedChannelModel) =>
  (required: { channel_id: string }) => {
    return model.deleteOne(required);
  };

export default (model: typeof preferedChannelModel) => ({
  createPreferedChannel: createPreferedChannel(model),
  deletePreferedChannel: deletePreferedChannel(model),
});
