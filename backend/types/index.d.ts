export {};

declare module 'express-session' {
  interface SessionData {
    user: {
      _id: string;
      username: string;
      email: string;
      followed_channels: string[];
    };
  }
}
