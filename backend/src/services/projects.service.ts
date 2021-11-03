import Project from '../models/project-model';

const createProject = (model: typeof Project) => (required: any) => {
  const project = new model(required);
  return project.save();
};

const getProjectsForMosaic =
  (model: typeof Project) =>
  ({
    per_page,
    medium_ids,
    dimension,
    page,
    asset_types,
  }: {
    per_page: number;
    medium_ids: string;
    dimension: string;
    page: number;
    asset_types: string;
  }) => {
    const skip = per_page * page - 1;
    // const assetTypesConstraint = asset_types ? à voir selon comment sont reçus
    // créer stages selon comment sont envoyé query string

    const firstStage = Object.assign(
      {},
      (medium_ids || asset_types) && {
        $match: Object.assign(
          {},
          medium_ids.length && !asset_types.length
            ? { mediums: { $all: ['1', '2', '3'] } }
            : !medium_ids.length && asset_types.length
            ? {
                ...['asset_type1', 'asset_type2'].reduce(
                  (acc, cur) => Object.assign(acc, { [cur]: true }),
                  {}
                ),
              }
            : {
                mediums: { $all: ['1', '2', '3'] },
                ...['asset_type1', 'asset_type2'].reduce(
                  (acc, cur) => Object.assign(acc, { [cur]: true }),
                  {}
                ),
              }
        ),
      }
    );

    const projects = model.aggregate([
      firstStage,
      // {
      //   $match: {
      //     mediums: {
      //       $all: ['1', '2'],
      //     },
      //     marmoset: true,
      //   },
      // },
      {
        $skip: 2,
      },
      {
        $limit: 100,
      },
      {
        $lookup: {
          from: 'users',
          let: {
            user_id: '$user_id',
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$_id', '$$user_id'],
                },
              },
            },
            {
              $project: {
                medium_avatar_url: 1,
                is_organization_owner: 1,
                is_plus_member: 1,
                is_staff: 1,
                pro_member: 1,
                full_name: 1,
                username: 1,
              },
            },
            {
              $set: {
                id: '$_id',
              },
            },
            {
              $unset: '_id',
            },
          ],
          as: 'user',
        },
      },
      {
        $unwind: {
          path: '$user',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $set: {
          icons: {
            image: '$image',
            video: '$video',
            video_clip: '$video_clip',
            model3d: '$model3d',
            marmoset: '$marmoset',
            pano: '$pano',
          },
          id: '$_id',
        },
      },
      {
        $unset: '_id',
      },
      {
        $project: {
          id: 1,
          icons: 1,
          user: 1,
          url: 1,
          title: 1,
          smaller_square_url: 1,
          hide_as_adult: 1,
        },
      },
    ]);
  };

export default (model: typeof Project) => ({
  createProject: createProject(model),
});
