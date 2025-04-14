/* eslint-disable @typescript-eslint/no-unused-expressions */
import {fillObject, isNotNullOrUndefined, isObject, mergeDeep, remapWithPrefix} from '../../../src/utils/utils';

describe('utils', () => {
    context('isObject', () => {
        it('Is a function', () => {
            expect(isObject, 'isObject').to.be.a('function');
        });

        it('returns true for plain object', () => {
            expect(isObject({a: 1})).to.be.true;
        });

        it('returns false for arrays', () => {
            expect(isObject([1, 2, 3])).to.be.false;
        });

        it('returns false for null', () => {
            expect(isObject(null)).to.be.false;
        });

        it('returns false for primitive types', () => {
            expect(isObject(42)).to.be.false;
            expect(isObject('hello')).to.be.false;
            expect(isObject(false)).to.be.false;
            expect(isObject(undefined)).to.be.false;
        });

        it('returns true for object created with Object.create(null)', () => {
            const obj = Object.create(null);

            expect(isObject(obj)).to.be.true;
        });

        it('returns false for functions (even though typeof === "object" is false)', () => {
            expect(isObject(() => {})).to.be.false;
        });
    });

    context('isNotNullOrUndefined', () => {
        it('Is a function', () => {
            expect(isNotNullOrUndefined, 'isNotNullOrUndefined').to.be.a('function');
        });

        it('returns true for plain object', () => {
            expect(isNotNullOrUndefined({foo: 'bar'})).to.be.true;
        });

        it('returns true for arrays (objects)', () => {
            expect(isNotNullOrUndefined([1, 2, 3])).to.be.true;
        });

        it('returns false for null', () => {
            expect(isNotNullOrUndefined(null)).to.be.false;
        });

        it('returns false for undefined', () => {
            expect(isNotNullOrUndefined(undefined)).to.be.false;
        });

        it('infers type correctly when used in a filter', () => {
            const list: ({name: string} | null | undefined)[] = [
                {name: 'Alice'},
                null,
                undefined,
                {name: 'Bob'}
            ];

            const filtered = list.filter(isNotNullOrUndefined);

            expect(filtered).to.deep.equal([{name: 'Alice'}, {name: 'Bob'}]);
        });
    });

    context('fillObject', () => {
        it('Is a function', () => {
            expect(fillObject, 'fillObject').to.be.a('function');
        });

        it('fills all breakpoints with the given default value', () => {
            const breakpoints = ['xs', 'sm', 'md', 'lg'] as const;
            // @ts-expect-error
            const result = fillObject<Record<typeof breakpoints[number], number>, number>(breakpoints, 10);

            expect(result).to.deep.equal({
                lg: 10,
                md: 10,
                sm: 10,
                xs: 10
            });
        });

        it('works with string default values', () => {
            const breakpoints = ['sm', 'md'] as const;
            // @ts-expect-error
            const result = fillObject<Record<typeof breakpoints[number], string>, string>(breakpoints, 'default');

            expect(result).to.deep.equal({
                md: 'default',
                sm: 'default'
            });
        });

        it('returns an empty object if breakpoints is empty', () => {
            const result = fillObject<Record<never, string>, string>([], 'x');

            expect(result).to.deep.equal({});
        });

        it('preserves complex value types', () => {
            const breakpoints = ['xs', 'md'] as const;
            const value = {
                color: 'red',
                size: 12
            };
            // @ts-expect-error
            const result = fillObject<Record<typeof breakpoints[number], typeof value>, typeof value>(breakpoints, value);

            expect(result).to.deep.equal({
                md: value,
                xs: value
            });

            // ensure references are the same (not copied)
            expect(result.xs).to.equal(value);
            expect(result.md).to.equal(value);
        });
    });

    context('mergeDeep', () => {
        it('Is a function', () => {
            expect(mergeDeep, 'mergeDeep').to.be.a('function');
        });

        it('merges flat objects', () => {
            const target = {a: 1};
            const source = {b: 2};

            const result = mergeDeep(target, source);

            expect(result).to.deep.equal({
                a: 1,
                b: 2
            });
        });

        it('gives target if source is no object', () => {
            const target = {a: 1};
            const source = 2;

            // @ts-expect-error
            const result = mergeDeep(target, source);

            expect(result).to.deep.equal({a: 1});
        });

        it('merges nested objects', () => {
            const target = {a: {b: 1}};
            const source = {a: {c: 2}};

            const result = mergeDeep(target, source);

            expect(result).to.deep.equal({
                a: {
                    b: 1,
                    c: 2
                }
            });
        });

        it('overwrites non-object values', () => {
            const target = {a: 1};
            const source = {a: 5};

            const result = mergeDeep(target, source);

            expect(result).to.deep.equal({a: 5});
        });

        it('adds new nested keys if missing in target', () => {
            const target = {a: {}};
            const source = {a: {foo: 'bar'}};

            const result = mergeDeep(target, source);

            expect(result).to.deep.equal({a: {foo: 'bar'}});
        });

        it('preserves reference of target object', () => {
            const target = {a: {b: 1}};
            const source = {a: {c: 2}};

            const result = mergeDeep(target, source);

            expect(result).to.equal(target);
        });

        it('returns target unchanged if source is undefined', () => {
            const target = {a: 1};
            const result = mergeDeep(target, undefined);

            expect(result).to.deep.equal({a: 1});
        });

        it('merges deeply nested values', () => {
            const target = {config: {grid: {columns: 12}}};
            const source = {config: {grid: {gutter: 24}}};

            const result = mergeDeep(target, source);

            expect(result).to.deep.equal({
                config: {
                    grid: {
                        columns: 12,
                        gutter: 24
                    }
                }
            });
        });
    });

    context('remapWithPrefix', () => {
        it('Is a function', () => {
            expect(remapWithPrefix, 'remapWithPrefix').to.be.a('function');
        });

        it('converts numeric values to strings with the prefix', () => {
            const input = {md: 24, sm: 16, xs: 8};
            // @ts-expect-error
            const result = remapWithPrefix(input, 'px');

            expect(result).to.deep.equal({
                md: '24px',
                sm: '16px',
                xs: '8px'
            });
        });

        it('converts "fluid" strings to 100%', () => {
            const input = {md: 'fluid', sm: 'fluid', xs: 'fluid'};
            // @ts-expect-error
            const result = remapWithPrefix(input, 'px');

            expect(result).to.deep.equal({
                md: '100%',
                sm: '100%',
                xs: '100%'
            });
        });

        it('preserves string values that are not "fluid"', () => {
            const input = {md: 'initial', sm: 'inherit', xs: 'auto'};
            // @ts-expect-error
            const result = remapWithPrefix(input, 'px');

            expect(result).to.deep.equal({
                md: 'initial',
                sm: 'inherit',
                xs: 'auto'
            });
        });

        it('handles mixed input correctly', () => {
            const input = {lg: 32, md: 'auto', sm: 'fluid', xs: 0};
            // @ts-expect-error
            const result = remapWithPrefix(input, 'rem');

            expect(result).to.deep.equal({
                lg: '32rem',
                md: 'auto',
                sm: '100%',
                xs: '0rem'
            });
        });

        it('returns an empty object when input is empty', () => {
            // @ts-expect-error
            const result = remapWithPrefix({}, 'em');

            expect(result).to.deep.equal({});
        });
    });
});