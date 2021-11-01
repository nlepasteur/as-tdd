import categoryModel from '../models/category-model';

const createCategory =
  (model: typeof categoryModel) =>
  (query: {
    description: string;
    example_images: [string];
    name: string;
    state: string;
    uri: string;
  }) => {
    const categorie = new model(query);
    return categorie.save();
  };

const getCategories = (model: typeof categoryModel) => () => {
  return model.find();
};

export default (model: typeof categoryModel) => ({
  createCategory: createCategory(model),
  getCategories: getCategories(model),
});
