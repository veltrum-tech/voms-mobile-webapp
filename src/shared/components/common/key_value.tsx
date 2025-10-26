import { type HtmlHTMLAttributes } from 'react';
import clsx from 'clsx';
import { TypographyP } from './typography';
import { cn } from '../../../lib/utils';
import type { KeyValueType } from '../../models';

interface KeyValueProps extends HtmlHTMLAttributes<HTMLDivElement> {
    data: KeyValueType;
}

const KeyValue = ({ data, className, ...props }: KeyValueProps) => {
    const hasEmailOrWebsite =
        data.label.toLowerCase().includes('email') ||
        data.label.toLowerCase().includes('website');

    return (
        <div className={cn('grid grid-cols-2 text-sm', className)} {...props}>
            <TypographyP className="text-secondary-600">
                {data.label}
            </TypographyP>
            <TypographyP
                className={clsx({
                    lowercase: hasEmailOrWebsite,
                    capitalize: !hasEmailOrWebsite,
                })}
            >
                {data.value}
            </TypographyP>
        </div>
    );
};

export { KeyValue };
