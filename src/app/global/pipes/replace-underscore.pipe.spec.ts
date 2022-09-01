import { ReplaceUnderscorePipe } from './replace-underscore.pipe';
import {ReplaceDashPipe} from './replace-dash.pipe';

describe('ReplaceUnderscorePipe', () => {
  let pipe: ReplaceDashPipe
  beforeEach(() => {
    pipe = new ReplaceUnderscorePipe();
  })
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  it('should transform string', () => {
    expect(pipe.transform('place_hold')).toBe('place hold');
  })
});
