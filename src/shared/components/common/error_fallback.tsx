import { useRouteError } from 'react-router-dom';

import { NoMatch } from './no_match';

const ErrorFallback = () => {
    const error = useRouteError() as {
        data: unknown;
        status: string | number;
        message: string;
    } | null;

    if (error?.status === 404) return <NoMatch />;
    return <main>{error?.message}</main>;
};

export { ErrorFallback };
