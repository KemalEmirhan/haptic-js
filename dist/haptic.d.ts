export type VibrationPattern = number | number[];
export interface Haptic {
    hasVibration(): boolean;
    isSupported(): boolean;
    vibrate(pattern: VibrationPattern): void;
    light(): void;
    medium(): void;
    heavy(): void;
    success(): void;
    warning(): void;
    error(): void;
}
export declare const hasVibration: () => boolean;
export declare const isSupported: () => boolean;
export declare const vibrate: (pattern: VibrationPattern) => void;
export declare const light: () => void;
export declare const medium: () => void;
export declare const heavy: () => void;
export declare const success: () => void;
export declare const warning: () => void;
export declare const error: () => void;
declare const Haptic: Haptic;
export default Haptic;
//# sourceMappingURL=haptic.d.ts.map