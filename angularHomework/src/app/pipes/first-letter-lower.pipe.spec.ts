import { FirstLetterLowerPipe } from './first-letter-lower.pipe';

describe('FirstLetterLowerPipe', () => {
  it('create an instance', () => {
    const pipe = new FirstLetterLowerPipe();
    expect(pipe).toBeTruthy();
  });
});
