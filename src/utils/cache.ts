import type {BreakpointCache} from '../sharedTypes/breakpointTypes';

const configCache = new Map<'breakpointConfig', BreakpointCache>();

export {configCache};