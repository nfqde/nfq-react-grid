// import original module declarations
import 'styled-components';
import type {Config} from '../src/defaultConfig';

// and extend them!
declare module 'styled-components' {
    export interface DefaultTheme {
        nfqgrid: Config;
    }
}