import { CapitalizePipe } from './capitalize.pipe';

describe('CapitalizePipe', () => {

    let pipe;
    beforeEach(() => {
        pipe = new CapitalizePipe();
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should capitalize first letter', () => {
        expect(pipe.transform('march')).toBe('March');
    });

    it('should return the same value if nothing', () => {
        const emptyValue = '';
        expect(pipe.transform(emptyValue)).toEqual(emptyValue);
    });

    it('should throw an error', () => {
        expect(()=>{
            pipe.transform({s: 3});
        }).toThrowError('ReversePipe: not a string');
    });
});
