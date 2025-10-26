import { cn } from "../../lib/utils";

const EllipseIcon = ({
    size = 10,
    className,
}: {
    size?: number;
    className?: string;
}) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 10 10"
            xmlns="http://www.w3.org/2000/svg"
            className={cn(className)}
        >
            <circle cx="5" cy="5" r="5" />
        </svg>
    );
};

export { EllipseIcon };
