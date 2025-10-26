import type { HTMLAttributes } from 'react';
import { cn } from '../../../lib/utils';

export interface TypographyHeadingProps
    extends HTMLAttributes<HTMLHeadingElement> {}

const TypographyH1 = ({
    children,
    className,
    ...props
}: TypographyHeadingProps) => {
    return (
        <h1
            className={cn(
                'scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl',
                className
            )}
            {...props}
        >
            {children}
        </h1>
    );
};

const TypographyH2 = ({
    children,
    className,
    ...props
}: TypographyHeadingProps) => {
    return (
        <h2
            className={cn(
                'scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0',
                className
            )}
            {...props}
        >
            {children}
        </h2>
    );
};

const TypographyH3 = ({
    children,
    className,
    ...props
}: TypographyHeadingProps) => {
    return (
        <h3
            className={cn(
                'scroll-m-20 text-2xl font-bold tracking-tight',
                className
            )}
            {...props}
        >
            {children}
        </h3>
    );
};

const TypographyH4 = ({
    children,
    className,
    ...props
}: TypographyHeadingProps) => {
    return (
        <h4
            className={cn(
                'scroll-m-20 text-xl text-gray-900 font-bold tracking-tight',
                className
            )}
            {...props}
        >
            {children}
        </h4>
    );
};

const TypographyH5 = ({
    children,
    className,
    ...props
}: TypographyHeadingProps) => {
    return (
        <h5
            className={cn('scroll-m-20 text-lg font-medium', className)}
            {...props}
        >
            {children}
        </h5>
    );
};

const TypographyH6 = ({
    children,
    className,
    ...props
}: TypographyHeadingProps) => {
    return (
        <h5
            className={cn('text-base font-normal', className)}
            {...props}
        >
            {children}
        </h5>
    );
};

const TypographyP = ({
    children,
    className,
    ...props
}: HTMLAttributes<HTMLParagraphElement>) => {
    return (
        <p className={cn('leading-7 text-[#4D524E]', className)} {...props}>
            {children}
        </p>
    );
};

const TypographySmall = ({
    children,
    className,
    ...props
}: HTMLAttributes<HTMLElement>) => {
    return (
        <small
            {...props}
            className={cn(
                'inline-block text-sm font-medium text-[#4D524E] leading-none',
                className
            )}
        >
            {children}
        </small>
    );
};

export {
    TypographyH1,
    TypographyH2,
    TypographyH3,
    TypographyH4,
    TypographyH5,
    TypographyH6,
    TypographyP,
    TypographySmall,
};
