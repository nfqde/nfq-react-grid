/* eslint-disable max-lines, max-len, max-lines-per-function */
import {createConfig} from '../../../../src/config/config';
import {calcAlignment} from '../../../../src/grid/util/calcAlignment';
import {themeConfigs} from '../../../fixtures/themes';

describe('Test calcAlignment function', () => {
    it('Is a function', () => {
        expect(calcAlignment, 'calcAlignment').to.be.a('function');
    });

    context('calc $align prop', () => {
        it('should return an array of media queries for each breakpoint when given an object of alignment values', () => {
            createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
            const expectedDirectionCss = [
                'align-items: center;',
                'align-items: flex-start;',
                'align-items: flex-end;',
                'align-items: baseline;',
                null,
                null
            ];
            const actualDirectionCss = calcAlignment('$align')({
                $align: {
                    lg: 'baseline',
                    md: 'flex-end',
                    sm: 'flex-start',
                    xs: 'center'
                }
            });

            expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
        });

        it('should return an array of media queries with null values when given an object with missing alignment values', () => {
            createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
            const expectedDirectionCss = [
                'align-items: center;',
                null,
                null,
                'align-items: baseline;',
                null,
                null
            ];
            const actualDirectionCss = calcAlignment('$align')({
                $align: {
                    lg: 'baseline',
                    xs: 'center'
                }
            });

            expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
        });

        it('should return an array of media queries with null values when given an empty object', () => {
            createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
            const expectedDirectionCss = [
                null,
                null,
                null,
                null,
                null,
                null
            ];
            const actualDirectionCss = calcAlignment('$align')({$align: {}});

            expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
        });

        it('should return the right media queries if direction is only an string', () => {
            createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
            const expectedDirectionCss = [
                'align-items: center;',
                null,
                null,
                null,
                null,
                null
            ];
            const actualDirectionCss = calcAlignment('$align')({$align: 'center'});

            expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
        });
    });

    context('calc $justify prop', () => {
        it('should return an array of media queries for each breakpoint when given an object of alignment values', () => {
            createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
            const expectedDirectionCss = [
                'justify-content: center;',
                'justify-content: flex-start;',
                'justify-content: flex-end;',
                'justify-content: space-between;',
                null,
                null
            ];
            const actualDirectionCss = calcAlignment('$justify')({
                $justify: {
                    lg: 'space-between',
                    md: 'flex-end',
                    sm: 'flex-start',
                    xs: 'center'
                }
            });

            expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
        });

        it('should return an array of media queries with null values when given an object with missing alignment values', () => {
            createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
            const expectedDirectionCss = [
                'justify-content: center;',
                null,
                null,
                'justify-content: space-between;',
                null,
                null
            ];
            const actualDirectionCss = calcAlignment('$justify')({
                $justify: {
                    lg: 'space-between',
                    xs: 'center'
                }
            });

            expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
        });

        it('should return an array of media queries with null values when given an empty object', () => {
            createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
            const expectedDirectionCss = [
                null,
                null,
                null,
                null,
                null,
                null
            ];
            const actualDirectionCss = calcAlignment('$justify')({$justify: {}});

            expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
        });

        it('should return the right media queries if direction is only an string', () => {
            createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
            const expectedDirectionCss = [
                'justify-content: center;',
                null,
                null,
                null,
                null,
                null
            ];
            const actualDirectionCss = calcAlignment('$justify')({$justify: 'center'});

            expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
        });
    });

    context('calc $order prop', () => {
        it('should return an empty array if the order object is empty', () => {
            createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
            const expectedOffsetCss = [
                null,
                null,
                null,
                null,
                null,
                null
            ];
            // eslint-disable-next-line @nfq/no-magic-numbers
            const actualOffsetCss = calcAlignment('$order')({});

            expect(actualOffsetCss).to.deep.equal(expectedOffsetCss);
        });

        it('should return an array with media queries for each dimension', () => {
            createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
            const expectedOffsetCss = [
                'order: 1;',
                'order: 2;',
                'order: 3;',
                'order: 4;',
                'order: 5;',
                'order: 6;'
            ];
            const actualOffsetCss = calcAlignment('$order')({
                $order: {
                    lg: 4,
                    md: 3,
                    sm: 2,
                    xl: 5,
                    xs: 1,
                    xxl: 6
                }
            });

            expect(actualOffsetCss).to.deep.equal(expectedOffsetCss);
        });

        it('should return an array with media queries for only the specified dimensions', () => {
            createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
            const expectedOffsetCss = [
                'order: 1;',
                null,
                null,
                'order: 4;',
                null,
                null
            ];
            const actualOffsetCss = calcAlignment('$order')({
                $order: {
                    lg: 4,
                    xs: 1
                }
            });

            expect(actualOffsetCss).to.deep.equal(expectedOffsetCss);
        });

        it('should work with an single number', () => {
            createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
            const expectedOffsetCss = [
                'order: 1;',
                null,
                null,
                null,
                null,
                null
            ];
            const actualOffsetCss = calcAlignment('$order')({$order: 1});

            expect(actualOffsetCss).to.deep.equal(expectedOffsetCss);
        });

        it('should not break with wrong keys', () => {
            createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
            const expectedOffsetCss = [
                'order: 1;',
                null,
                null,
                null,
                null,
                null
            ];
            const actualOffsetCss = calcAlignment('$order')({
                $order: {
                    xs: 1,
                    // @ts-expect-error
                    xss: 21,
                    xxxs: 124
                }
            });

            expect(actualOffsetCss).to.deep.equal(expectedOffsetCss);
        });
    });
});