import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

declare global {
    interface Window {
        dataLayer: Record<string, any>[];
    }
}

export const pushToDataLayer = (event: string, data?: Record<string, any>) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...data });
};
