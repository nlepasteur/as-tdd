export const capitalize = (arg: string) =>
  arg.replace(arg.slice(0, 1), arg.slice(0, 1).toUpperCase());

export const stringIntoArray = (value: string): string[] => {
  return value.length ? value.split(',').map((el) => el.trim()) : [];
};
