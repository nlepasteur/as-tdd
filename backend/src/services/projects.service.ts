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
    per_page: string;
    medium_ids?: string[];
    dimension?: string;
    page: string;
    asset_types?: string[];
  }) => {
    const skip = Number(per_page) * (Number(page) - 1);

    function createMatchStage(
      medium_ids: string | string[] | undefined,
      asset_types: string | string[] | undefined
    ) {
      const firstStage = Object.assign(
        { $match: {} },
        (medium_ids || asset_types) && {
          $match: Object.assign(
            {},
            medium_ids && !asset_types
              ? { mediums: { $all: [medium_ids].flat(2) } }
              : !medium_ids && asset_types
              ? {
                  ...[asset_types]
                    .flat(2)
                    .reduce(
                      (acc, cur) => Object.assign(acc, { [cur]: true }),
                      {}
                    ),
                }
              : asset_types && {
                  mediums: { $all: [medium_ids].flat(2) },
                  ...[asset_types]
                    .flat(2)
                    .reduce(
                      (acc, cur) => Object.assign(acc, { [cur]: true }),
                      {}
                    ),
                }
          ),
        }
      );
      return firstStage;
    }

    const mediums =
      dimension && medium_ids
        ? medium_ids.concat(dimension)
        : dimension
        ? [dimension]
        : medium_ids && medium_ids;

    console.log('match stage:', createMatchStage(mediums, asset_types));

    const projects = model.aggregate([
      createMatchStage(mediums, asset_types),
      {
        $skip: skip,
      },
      {
        $limit: Number(per_page),
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

    return projects;
  };

export default (model: typeof Project) => ({
  createProject: createProject(model),
  getProjectsForMosaic: getProjectsForMosaic(model),
});
