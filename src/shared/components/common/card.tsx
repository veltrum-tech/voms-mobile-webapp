import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { cn } from '../../../lib/utils';

const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                'rounded-xl bg-card text-card-foreground',
                className
            )}
            {...props}
        />
    )
);
Card.displayName = 'Card';

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn('flex flex-col space-y-1 px-4 py-5', className)}
            {...props}
        />
    )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = forwardRef<
    HTMLParagraphElement,
    HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn(
            'text-lg font-medium leading-none tracking-tight',
            className
        )}
        {...props}
    />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = forwardRef<
    HTMLParagraphElement,
    HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn('text-sm text-muted-foreground', className)}
        {...props}
    />
));
CardDescription.displayName = 'CardDescription';

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn('px-4 pb-5', className)} {...props} />
    )
);
CardContent.displayName = 'CardContent';

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn('flex items-center px-4 pb-5', className)}
            {...props}
        />
    )
);
CardFooter.displayName = 'CardFooter';

export {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent,
};
