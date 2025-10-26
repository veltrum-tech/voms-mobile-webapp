import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export interface FetchBaseQueryErrors {
    message?: string;
    errors?: { [key: string]: string[] };
    data?: [];
}

// A function that checks if an error is a FetchBaseQueryError
export const isFetchBaseQueryError = (
    error: unknown
): error is FetchBaseQueryError => {
    return typeof error === 'object' && error !== null && 'status' in error;
};

// A function that returns error data. This can be used anywhere.
export const fetchBaseQueryError = (error: unknown) => {
    if (isFetchBaseQueryError(error)) {
        if ('data' in error) return error.data as FetchBaseQueryErrors;
    }

    return null;
};

export const fetchBaseQueryErrorMessage = (
    error: unknown,
    statusCode: number
) => {
    if (isFetchBaseQueryError(error)) {
        const { status } = error;
        if (status === statusCode) return fetchBaseQueryError(error)?.message;
    }
    return null;
};

// A reusable hook to be declared at the top of a component.
export const useFetchBaseQueryError = (error: unknown) => {
    if (isFetchBaseQueryError(error)) {
        if ('data' in error) return error.data as FetchBaseQueryErrors;
    }

    return null;
};
