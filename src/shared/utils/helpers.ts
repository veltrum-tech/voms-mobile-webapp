import type { FnWithNoArgAndVoidReturnType } from "../models";

interface MaskEmail {
    email: string;
    padStart?: boolean;
    padEnd?: boolean;
    visibleStart?: number;
    visibleEnd?: number;
}

const wait = (
    handler: FnWithNoArgAndVoidReturnType,
    duration: number = 1000
) => {
    setTimeout(handler, duration);
};

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
    }).format(value);
};

const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-NG').format(value);
};

const formatToMillions = (value: number | string) => {
    const number = Number(value);
    const oneMillion = 1_000_000;
    const oneBillion = 1_000_000_000;
    const oneTrillion = 1_000_000_000_000;

    if (number >= oneMillion && number < oneBillion) {
        return (
            '₦' +
            (number / oneMillion).toFixed(number % oneMillion === 0 ? 0 : 2) +
            'M'
        );
    }
    if (number >= oneBillion && number < oneTrillion) {
        return (
            '₦' +
            (number / oneBillion).toFixed(number % oneBillion === 0 ? 0 : 2) +
            'B'
        );
    }
    if (number >= oneTrillion) {
        return (
            '₦' +
            (number / oneTrillion).toFixed(number % oneTrillion === 0 ? 0 : 2) +
            'T'
        );
    }
    return value.toString();
};

const pluralize = (count: number, singular: string, plural: string): string => {
    return count === 0 || count === 1 ? singular : plural;
};

const maskEmail = (params: MaskEmail) => {
    const {
        email,
        visibleStart,
        visibleEnd,
        padStart = true,
        padEnd = false,
    } = params;

    const [localPart, domain] = email.toLowerCase().split('@');
    let startPart = '';
    let endPart = '';
    let maskedPart = '';

    if (padStart && visibleStart) {
        startPart = localPart.slice(0, visibleStart);
        maskedPart = '*'.repeat(localPart.length - visibleStart);
        endPart = '';
    }
    if (padEnd && visibleEnd) {
        endPart = localPart.slice(-visibleEnd);
        maskedPart = '*'.repeat(localPart.length - visibleEnd);
        startPart = '';
    }
    if (padStart && padEnd && visibleStart && visibleEnd) {
        maskedPart = '*'.repeat(localPart.length - visibleStart - visibleEnd);
    }

    return `${startPart}${maskedPart}${endPart}@${domain}`;
};

const buildQueryParams = (params: Record<string, any>): string => {
    const queryString = Object.entries(params)
        .filter(([_, value]) => value !== null && value !== undefined)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
    return queryString;
}

export {
    maskEmail,
    wait,
    formatToMillions,
    formatCurrency,
    formatNumber,
    pluralize,
    buildQueryParams
};
