const PRESETS = {
    light: 10,
    medium: 20,
    heavy: 40,
    success: [10, 50, 10],
    warning: [30, 30, 30],
    error: [50, 30, 50, 30, 50],
};
const hasVibrationAPI = () => typeof navigator !== "undefined" && typeof navigator.vibrate === "function";
const hasDOM = () => typeof document !== "undefined" && !!document.body;
const fireIOSSwitch = () => {
    if (!hasDOM())
        return;
    try {
        const label = document.createElement("label");
        label.setAttribute("aria-hidden", "true");
        label.style.cssText =
            "position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0;";
        const input = document.createElement("input");
        input.type = "checkbox";
        input.setAttribute("switch", "");
        label.appendChild(input);
        document.body.appendChild(label);
        label.click();
        document.body.removeChild(label);
    }
    catch {
    }
};
const toPatternArray = (pattern) => Array.isArray(pattern) ? [...pattern] : [pattern];
const trigger = (pattern) => {
    if (hasVibrationAPI()) {
        try {
            const p = Array.isArray(pattern) ? [...pattern] : pattern;
            navigator.vibrate(p);
        }
        catch {
        }
        return;
    }
    const arr = toPatternArray(pattern);
    let delay = 0;
    for (let i = 0; i < arr.length; i += 2) {
        const vibrateMs = arr[i] ?? 0;
        const pauseMs = arr[i + 1] ?? 0;
        if (vibrateMs > 0)
            setTimeout(fireIOSSwitch, delay);
        delay += vibrateMs + pauseMs;
    }
};
export const hasVibration = () => hasVibrationAPI();
export const isSupported = () => {
    if (typeof navigator === "undefined" || typeof document === "undefined")
        return false;
    return hasVibrationAPI() || hasDOM();
};
export const vibrate = (pattern) => trigger(pattern);
export const light = () => trigger(PRESETS.light);
export const medium = () => trigger(PRESETS.medium);
export const heavy = () => trigger(PRESETS.heavy);
export const success = () => trigger([...PRESETS.success]);
export const warning = () => trigger([...PRESETS.warning]);
export const error = () => trigger([...PRESETS.error]);
const Haptic = {
    hasVibration,
    isSupported,
    vibrate,
    light,
    medium,
    heavy,
    success,
    warning,
    error,
};
export default Haptic;
