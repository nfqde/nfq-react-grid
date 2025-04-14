/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
import type {Diff, Intersect, TupleToUnion} from './tupleTypes';

/**
 * Interface representing the user's configuration extension point.
 * This interface is intended to be augmented externally by consumers of the library.
 * Users can provide a custom `Breakpoints` type by extending this interface with a `Breakpoints` key.
 *
 * @example
 * ```ts
 * declare module '@nfq/react-grid' {
 *   interface UserConfig {
 *     Breakpoints: 'mobile' | 'tablet' | 'desktop';
 *   }
 * }
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/no-empty-object-type
export interface UserConfig {}

/**
 * The default set of breakpoints used by the grid system if no custom breakpoints are provided.
 */
type DefaultBreakpoints = ['lg' | 'md' | 'sm' | 'xl' | 'xs' | 'xxl'];

/**
 * Extracts the breakpoint union from the `UserConfig` if available, falling back to the default breakpoints.
 * This type allows library consumers to override the available breakpoints through module augmentation.
 */
type ExtractBreakpoints<T> = T extends {UserConfig: {Breakpoints: infer B}} ? B : DefaultBreakpoints;

/**
 * The effective `Breakpoints` type used throughout the grid system.
 * This resolves to the breakpoints defined in the `UserConfig`, or defaults to `DefaultBreakpoints`.
 */
export type Breakpoints = TupleToUnion<ExtractBreakpoints<UserConfig>>;

/**
 * A utility type that generates an object of breakpoint values where:
 * - Custom user-defined breakpoints (not part of the defaults) are required.
 * - Default breakpoints are optional.
 * This smart typing ensures backward compatibility with default breakpoints, while enforcing presence
 * of custom ones when used in responsive layout configurations.
 */
export type SmartBreakpoints<
    Tuple extends readonly string[],
    Value = number
> = {[K in Diff<Intersect<Tuple[number], Breakpoints>, TupleToUnion<DefaultBreakpoints>>]: Value;}
    & {[K in Intersect<Intersect<Tuple[number], Breakpoints>, TupleToUnion<DefaultBreakpoints>>]?: Value;};

/**
 * Represents the internal cache format used by the layout system to store resolved breakpoints.
 * This cache allows fast access to the breakpoint order and the numeric values associated with each.
 * It is populated during configuration resolution (e.g., via `createConfig`) and used for downstream computations.
 */
export interface BreakpointCache {
    /**
     * The ordered list of breakpoints, used for consistent resolution across responsive settings.
     */
    breakpointOrder: Breakpoints[];
    /**
     * A mapping of breakpoint names to their pixel values.
     */
    breakpoints: Record<Breakpoints, number>;
}