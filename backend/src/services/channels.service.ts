// types
import Channel from "../models/Channel";

const getChannels = (model: typeof Channel) => () => {
  return model.find();
};

export default (model: typeof Channel) => ({
  getChannels: getChannels(model),
});
