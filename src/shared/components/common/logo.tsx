import { type ImgHTMLAttributes } from 'react';
import { cn } from '../../../lib/utils';


const Logo = ({ className }: ImgHTMLAttributes<HTMLImageElement>) => {
    return (
        <img
            srcSet="/logo-1x.png 1x, /logo-2x.png 2x"
            className={cn('h-10', className)}
            alt="Logo"
        />
    );
};

const StateLogo = ({
    src,
    className,
    ...props
}: ImgHTMLAttributes<HTMLImageElement>) => {
    return (
        <img
            className={cn('h-20', className)}
            src={src}
            alt="State Logo"
            {...props}
        />
    );
};

export { Logo, StateLogo };
