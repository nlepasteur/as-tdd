import createClasses from 'utils/createClasses';

describe('createClasses', () => {
  describe('given an object "{ someClassName: true }"', () => {
    it('returns "some-class-name"', () => {
      const stubClassnames = { someClassName: true };
      const expected = 'some-class-name';
      const result = createClasses(stubClassnames);
      expect(result).toEqual(expected);
    });
  });

  describe('given an object "{ anotherClassName: true }', () => {
    it('returns "another-class-name', () => {
      const stubClassnames = { anotherClassName: true };
      const expected = 'another-class-name';
      const result = createClasses(stubClassnames);
      expect(result).toEqual(expected);
    });
  });

  describe('given an object "{ someClassName: false }"', () => {
    it('returns ""', () => {
      const stubClassnames = { someClassName: false };
      const expected = '';
      const result = createClasses(stubClassnames);
      expect(result).toEqual(expected);
    });
  });

  describe('given an object "{ className1: true, className2: true }"', () => {
    it('returns "class-name1 class-name2"', () => {
      const stubClassnames = { className1: true, className2: true };
      const expected = 'class-name1 class-name2';
      const result = createClasses(stubClassnames);
      expect(result).toEqual(expected);
    });
  });

  describe('given an object "{ className1: false, className2: true }"', () => {
    it('returns "class-name2"', () => {
      const stubClassnames = { className1: false, className2: true };
      const expected = 'class-name2';
      const result = createClasses(stubClassnames);
      expect(result).toEqual(expected);
    });
  });

  describe('given a prefix "prefix--" and an object "{ className1: true }"', () => {
    it('returns "prefix--class-name1"', () => {
      const stubClassnames = { className1: true };
      const stubPrefix = 'prefix--';
      const expected = 'prefix--class-name1';
      const result = createClasses(stubClassnames, stubPrefix);
      expect(result).toEqual(expected);
    });
  });
});
