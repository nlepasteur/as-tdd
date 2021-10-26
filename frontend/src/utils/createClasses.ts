function createClasses(objs: { [key: string]: boolean }, prefix = '') {
  let classes = '';
  for (const [key, value] of Object.entries(objs)) {
    value
      ? /[A-Z]/.test(key)
        ? (classes += `${prefix}${key
            .split('')
            .reduce(
              (acc, cur) =>
                /[A-Z]/.test(cur) ? `${acc}-${cur.toLowerCase()}` : acc + cur,
              ''
            )} `)
        : (classes += `${prefix}${key} `)
      : (classes += '');
  }
  return classes.trim();
}

export default createClasses;
