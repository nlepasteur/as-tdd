// types
import type { Project as ProjectType } from '../../../types';
// model
import Project from '../models/project-model';

const create = (model: typeof Project) => (required: ProjectType) => {
  const project = new model(required);
  return project.save();
};

// const getProjectsForMosaic = (model: typeof Project) => () => {
//   const projects = model.aggregate();
// };
export default (model: typeof Project) => ({
  create: create(model),
});
