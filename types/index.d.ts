export type Channel = {
  favorite_position: null | number;
  id: string;
  image_url: string;
  name: string;
  uri: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  followed_channels: string[];
};
