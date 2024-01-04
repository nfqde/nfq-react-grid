/* eslint-disable max-lines */
import type {Config} from '../../src/defaultConfig';

interface themesInterface {
    defaultTheme: Required<Config>;
    differentColumns: Required<Config>;
    differentContainers: Required<Config>;
    fullMergedTheme: Required<Config>;
    mergedTheme: Required<Config>;
    onlyContainerSet: Config;
}

export const themeConfigs: themesInterface = {
    defaultTheme: {
        baseSpacing: 0.5,
        breakpoints: {
            lg: 992,
            md: 769,
            sm: 576,
            xl: 1200,
            xs: 0,
            xxl: 1600
        },
        columnGap: {
            lg: 20,
            md: 20,
            sm: 20,
            xl: 20,
            xs: 20,
            xxl: 20
        },
        columns: {
            lg: 12,
            md: 12,
            sm: 12,
            xl: 12,
            xs: 12,
            xxl: 12
        },
        container: {
            lg: 1440,
            md: 'fluid',
            sm: 'fluid',
            xl: 1440,
            xs: 'fluid',
            xxl: 1440
        },
        containerPadding: {
            lg: 10,
            md: 10,
            sm: 10,
            xl: 10,
            xs: 10,
            xxl: 10
        },
        debug: {
            col: {
                background: '#9a67cb',
                outline: '#ffffff',
                padding: '#c2cf8a'
            },
            container: {
                background: '#5901ad40',
                outline: '#ffffff',
                padding: '#c2cf8a'
            },
            row: {
                background: '#5901ad40',
                outline: '#ffffff',
                padding: '#c2cf8a'
            },
            spacer: {
                background: '#f9cc9d',
                outline: '#ffffff',
                padding: '#c2cf8a'
            }
        },
        mediaQuery: 'only screen',
        skeleton: {
            dark: {
                animation: {
                    delay: 0.02,
                    direction: 'ltr',
                    duration: 1.8
                },
                borderRadius: 0.4,
                colors: {
                    base: 'rgba(0, 0, 102, 0.3)',
                    baseHighlight: 'rgba(0, 0, 102, 0)',
                    highlight: 'rgba(0, 0, 102, 0.3)'
                }
            },
            light: {
                animation: {
                    delay: 0.02,
                    direction: 'ltr',
                    duration: 1.8
                },
                borderRadius: 0.4,
                colors: {
                    base: 'rgba(255, 255, 255, 0.3)',
                    baseHighlight: 'rgba(0, 0, 102, 0)',
                    highlight: 'rgba(0, 0, 102, 0.3)'
                }
            }
        },
        skeletonDefault: 'dark'
    },
    differentColumns: {
        baseSpacing: 0.5,
        breakpoints: {
            lg: 992,
            md: 769,
            sm: 576,
            xl: 1200,
            xs: 0,
            xxl: 1600
        },
        columnGap: {
            lg: 20,
            md: 20,
            sm: 20,
            xl: 20,
            xs: 20,
            xxl: 20
        },
        columns: {
            lg: 8,
            md: 8,
            sm: 4,
            xl: 12,
            xs: 4,
            xxl: 12
        },
        container: {
            lg: 1440,
            md: 'fluid',
            sm: 'fluid',
            xl: 1440,
            xs: 'fluid',
            xxl: 1440
        },
        containerPadding: {
            lg: 10,
            md: 10,
            sm: 10,
            xl: 10,
            xs: 10,
            xxl: 10
        },
        debug: {
            col: {
                background: '#9a67cb',
                outline: '#ffffff',
                padding: '#c2cf8a'
            },
            container: {
                background: '#5901ad40',
                outline: '#ffffff',
                padding: '#c2cf8a'
            },
            row: {
                background: '#5901ad40',
                outline: '#ffffff',
                padding: '#c2cf8a'
            },
            spacer: {
                background: '#f9cc9d',
                outline: '#ffffff',
                padding: '#c2cf8a'
            }
        },
        mediaQuery: 'only screen',
        skeleton: {
            dark: {
                animation: {
                    delay: 0.02,
                    direction: 'ltr',
                    duration: 1.8
                },
                borderRadius: 0.4,
                colors: {
                    base: 'rgba(0, 0, 102, 0.3)',
                    baseHighlight: 'rgba(0, 0, 102, 0)',
                    highlight: 'rgba(0, 0, 102, 0.3)'
                }
            },
            light: {
                animation: {
                    delay: 0.02,
                    direction: 'ltr',
                    duration: 1.8
                },
                borderRadius: 0.4,
                colors: {
                    base: 'rgba(255, 255, 255, 0.3)',
                    baseHighlight: 'rgba(0, 0, 102, 0)',
                    highlight: 'rgba(0, 0, 102, 0.3)'
                }
            }
        },
        skeletonDefault: 'dark'
    },
    differentContainers: {
        baseSpacing: 0.5,
        breakpoints: {
            lg: 992,
            md: 769,
            sm: 576,
            xl: 1200,
            xs: 0,
            xxl: 1600
        },
        columnGap: {
            lg: 20,
            md: 20,
            sm: 20,
            xl: 20,
            xs: 20,
            xxl: 20
        },
        columns: {
            lg: 12,
            md: 12,
            sm: 12,
            xl: 12,
            xs: 12,
            xxl: 12
        },
        container: {
            lg: 800,
            md: 720,
            sm: 540,
            xl: 1440,
            xs: 'fluid',
            xxl: 1920
        },
        containerPadding: {
            lg: 10,
            md: 10,
            sm: 10,
            xl: 10,
            xs: 10,
            xxl: 10
        },
        debug: {
            col: {
                background: '#9a67cb',
                outline: '#ffffff',
                padding: '#c2cf8a'
            },
            container: {
                background: '#5901ad40',
                outline: '#ffffff',
                padding: '#c2cf8a'
            },
            row: {
                background: '#5901ad40',
                outline: '#ffffff',
                padding: '#c2cf8a'
            },
            spacer: {
                background: '#f9cc9d',
                outline: '#ffffff',
                padding: '#c2cf8a'
            }
        },
        mediaQuery: 'only screen',
        skeleton: {
            dark: {
                animation: {
                    delay: 0.02,
                    direction: 'ltr',
                    duration: 1.8
                },
                borderRadius: 0.4,
                colors: {
                    base: 'rgba(0, 0, 102, 0.3)',
                    baseHighlight: 'rgba(0, 0, 102, 0)',
                    highlight: 'rgba(0, 0, 102, 0.3)'
                }
            },
            light: {
                animation: {
                    delay: 0.02,
                    direction: 'ltr',
                    duration: 1.8
                },
                borderRadius: 0.4,
                colors: {
                    base: 'rgba(255, 255, 255, 0.3)',
                    baseHighlight: 'rgba(0, 0, 102, 0)',
                    highlight: 'rgba(0, 0, 102, 0.3)'
                }
            }
        },
        skeletonDefault: 'dark'
    },
    fullMergedTheme: {
        baseSpacing: 0.5,
        breakpoints: {
            lg: 992,
            md: 769,
            sm: 576,
            xl: 1200,
            xs: 0,
            xxl: 1600
        },
        columnGap: {
            lg: 20,
            md: 20,
            sm: 20,
            xl: 20,
            xs: 20,
            xxl: 20
        },
        columns: {
            lg: 12,
            md: 12,
            sm: 12,
            xl: 12,
            xs: 12,
            xxl: 12
        },
        container: {
            lg: 800,
            md: 720,
            sm: 540,
            xl: 1440,
            xs: 'fluid',
            xxl: 1920
        },
        containerPadding: {
            lg: 10,
            md: 10,
            sm: 10,
            xl: 10,
            xs: 10,
            xxl: 10
        },
        debug: {
            col: {
                background: '#9a67cb',
                outline: '#ffffff',
                padding: '#c2cf8a'
            },
            container: {
                background: '#5901ad40',
                outline: '#ffffff',
                padding: '#c2cf8a'
            },
            row: {
                background: '#5901ad40',
                outline: '#ffffff',
                padding: '#c2cf8a'
            },
            spacer: {
                background: '#f9cc9d',
                outline: '#ffffff',
                padding: '#c2cf8a'
            }
        },
        mediaQuery: 'only screen',
        skeleton: {
            dark: {
                animation: {
                    delay: 0.02,
                    direction: 'ltr',
                    duration: 1.8
                },
                borderRadius: 0.4,
                colors: {
                    base: 'rgba(0, 0, 102, 0.3)',
                    baseHighlight: 'rgba(0, 0, 102, 0)',
                    highlight: 'rgba(0, 0, 102, 0.3)'
                }
            },
            light: {
                animation: {
                    delay: 0.02,
                    direction: 'ltr',
                    duration: 1.8
                },
                borderRadius: 0.4,
                colors: {
                    base: 'rgba(255, 255, 255, 0.3)',
                    baseHighlight: 'rgba(0, 0, 102, 0)',
                    highlight: 'rgba(0, 0, 102, 0.3)'
                }
            }
        },
        skeletonDefault: 'dark'
    },
    mergedTheme: {
        baseSpacing: 0.5,
        breakpoints: {
            lg: 992,
            md: 769,
            sm: 576,
            xl: 1200,
            xs: 0,
            xxl: 1600
        },
        columnGap: {xs: 20},
        columns: {xs: 12},
        container: {
            lg: 800,
            md: 720,
            sm: 540,
            xl: 1440,
            xs: 'fluid',
            xxl: 1920
        },
        containerPadding: {xs: 10},
        debug: {
            col: {
                background: '#9a67cb',
                outline: '#ffffff',
                padding: '#c2cf8a'
            },
            container: {
                background: '#5901ad40',
                outline: '#ffffff',
                padding: '#c2cf8a'
            },
            row: {
                background: '#5901ad40',
                outline: '#ffffff',
                padding: '#c2cf8a'
            },
            spacer: {
                background: '#f9cc9d',
                outline: '#ffffff',
                padding: '#c2cf8a'
            }
        },
        mediaQuery: 'only screen',
        skeleton: {
            dark: {
                animation: {
                    delay: 0.02,
                    direction: 'ltr',
                    duration: 1.8
                },
                borderRadius: 0.4,
                colors: {
                    base: 'rgba(0, 0, 102, 0.3)',
                    baseHighlight: 'rgba(0, 0, 102, 0)',
                    highlight: 'rgba(0, 0, 102, 0.3)'
                }
            },
            light: {
                animation: {
                    delay: 0.02,
                    direction: 'ltr',
                    duration: 1.8
                },
                borderRadius: 0.4,
                colors: {
                    base: 'rgba(255, 255, 255, 0.3)',
                    baseHighlight: 'rgba(0, 0, 102, 0)',
                    highlight: 'rgba(0, 0, 102, 0.3)'
                }
            }
        },
        skeletonDefault: 'dark'
    },
    onlyContainerSet: {
        container: {
            lg: 800,
            md: 720,
            sm: 540,
            xl: 1440,
            xs: 'fluid',
            xxl: 1920
        }
    }
};