import { stringIntoArray } from 'utils/stringUtils';

describe('stringIntoArray', () => {
  describe('string’s length to convert equals 0', () => {
    it('returns an empty array', () => {
      const stubString = '';
      const result = stringIntoArray(stubString);
      expect(result).toEqual([]);
    });
  });

  describe('string is made of 1 separate element', () => {
    it('returns an array with 1 element', () => {
      const stubString = 'any string';
      const result = stringIntoArray(stubString);
      expect(result.length).toEqual(1);
    });
  });

  describe('string is made of 2 separates elements', () => {
    it('returns an array with 2 elements', () => {
      const stubString = 'any string, any string';
      const result = stringIntoArray(stubString);
      expect(result.length).toEqual(2);
    });

    it('no element of the array contains a comma', () => {
      const stubString = 'any string, any string';
      const result = stringIntoArray(stubString);
      expect(result.some((el) => /^( .+| .+ |.+ )$/.test(el))).toEqual(false);
    });
  });
});
