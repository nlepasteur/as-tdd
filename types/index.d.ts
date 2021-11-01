export type Channel = {
  favorite_position: null | number;
  //
  id: string;
  image_url: string;
  name: string;
  uri: string;
};

// vient de session depuis front
// export type User = {
//   id: string;
//   name: string;
//   email: string;
//   password: string;
//   followed_channels: string[];
// };

export type Medium = {
  id: string;
  name: string;
  uri: string;
};

/**
 * pour lier requêtes envoyées depuis front et données nécessaires
 */
export type GridSize = 'small' | 'default' | 'large';

export type GridSizePreference = {
  id: string;
  user_id: string;
  grid_size: GridSize;
};

export type PreferedGridSizePostBody = { grid_size: GridSize };

export type PreferedGridSizePatchBody = { grid_size: GridSize };
/**
 *
 */

/**
 * projects requests
 */
export type Project = {
  icons: {
    image: boolean;
    video: boolean;
    video_clip: boolean;
    model_3d: boolean;
    marmoset: boolean;
    pano: boolean;
  };
  url: string;
  title: string;
  // vient de session depuis front
  // user: {
  //   medium_avatar_url: string;
  //   is_organization_owner: boolean;
  //   is_plus_member: boolean;
  //   is_staff: boolean;
  //   pro_member: boolean;
  //   full_name: string;
  //   username: string;
  //   id: string;
  // };
  smaller_square_cover_url: string;
  hide_as_adult: boolean;
  id: string;
};

/**
 *
 */
