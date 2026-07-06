import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Slider as SliderPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";
function Slider({ className, defaultValue, value, min = 0, max = 100, ...props }) {
    const _values = React.useMemo(() => Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
            ? defaultValue
            : [min, max], [value, defaultValue, min, max]);
    return (_jsxs(SliderPrimitive.Root, { "data-slot": "slider", defaultValue: defaultValue, value: value, min: min, max: max, className: cn("relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col", className), ...props, children: [_jsx(SliderPrimitive.Track, { className: "relative h-1 w-full grow overflow-hidden rounded-full bg-zinc-500", children: _jsx(SliderPrimitive.Range, { className: "absolute h-full bg-green-500" }) }), Array.from({ length: _values.length }, (_, index) => (_jsx(SliderPrimitive.Thumb, { "data-slot": "slider-thumb", className: "relative block size-3 shrink-0 rounded-full border border-ring bg-white ring-ring/50 transition-[color,box-shadow] select-none after:absolute after:-inset-2 hover:ring-3 focus-visible:ring-3 focus-visible:outline-hidden active:ring-3 disabled:pointer-events-none disabled:opacity-50" }, index)))] }));
}
export { Slider };
