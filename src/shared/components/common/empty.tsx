import { TypographyH4 } from './typography';

const EmptyResource = ({ resourceName }: { resourceName: string }) => {
    return (
        <TypographyH4 className="my-2 text-center text-sm">
            No {resourceName} to display
        </TypographyH4>
    );
};

const Empty = ({ message }: { message: string }) => {
    return (
        <TypographyH4 className="my-2 text-center text-sm">
            {message}
        </TypographyH4>
    );
};

export { Empty, EmptyResource };
