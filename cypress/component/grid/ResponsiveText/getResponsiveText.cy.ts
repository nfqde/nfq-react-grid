import {createConfig} from '../../../../src/config/config';
import {getResponsiveText} from '../../../../src/grid/ResponsiveText/utils';
import {themeConfigs} from '../../../fixtures/themes';

describe('Test getResponsiveText function', () => {
    it('Is a function', () => {
        expect(getResponsiveText, 'getResponsiveText').to.be.a('function');
    });

    it('Returns text', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        assert.typeOf(getResponsiveText({lg: null, md: null, sm: null, xl: null, xs: 'text', xxl: null}, 'xxl'), 'string');
    });

    it('Returns always the last defined text from mobile first', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const textConfig = {lg: null, md: 'md', sm: null, xl: null, xs: 'xs', xxl: null};

        expect(getResponsiveText(textConfig, 'xxl')).to.be.deep.eq('md');
        expect(getResponsiveText(textConfig, 'sm')).to.be.deep.eq('xs');
    });

    it('Throws if xs is not given', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        expect(() => getResponsiveText({}, 'xxl')).to.throw('The xs breakpoint must be defined.');
    });
});