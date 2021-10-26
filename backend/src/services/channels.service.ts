// model
import Channel from '../models/Channel';

const getChannels = (model: typeof Channel) => () => {
  return model.find();
};

const createChannel = (model: typeof Channel) => (payload: any) => {
  const channel = new model(payload);
  return channel.save();
};

export default (model: typeof Channel) => ({
  getChannels: getChannels(model),
  createChannel: createChannel(model),
});
