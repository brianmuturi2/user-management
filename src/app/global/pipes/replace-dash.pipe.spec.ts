import {ReplaceDashPipe} from './replace-dash.pipe';

describe('ReplaceDashPipe', () => {
    let pipe: ReplaceDashPipe
    beforeEach(() => {
        pipe = new ReplaceDashPipe();
    })
    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });
    it('should transform string', () => {
        expect(pipe.transform('place-hold')).toBe('place hold');
    })
});
