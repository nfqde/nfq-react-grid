// import original module declarations
import 'styled-components';
import type {Config} from '../src/defaultConfig';

enum Colors {
    testColor = '#000000'
}
// and extend them!
declare module 'styled-components' {
    export interface DefaultTheme {
        colors: Colors;
        nfqgrid: Config;
    }
}