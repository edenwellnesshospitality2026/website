import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/** Shorten long strings (e.g. Cloudinary publicIds) for display. */
export function truncateMiddle(text: string, max = 24): string {
    if (text.length <= max) return text;
    const head = Math.ceil((max - 1) / 2);
    const tail = Math.floor((max - 1) / 2);
    return `${text.slice(0, head)}…${text.slice(-tail)}`;
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
