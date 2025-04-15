import '@emotion/react';
import type {Config} from '../src/defaultConfig';

enum Colors {
    testColor = '#000000'
}
// and extend them!
declare module '@emotion/react' {
    export interface Theme {
        colors: Colors;
        nfqgrid: Config;
    }

    export interface NFQGrid {
        gridColors: Colors;
    }
}