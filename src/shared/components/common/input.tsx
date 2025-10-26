import type { LucideIcon } from "lucide-react";
import { forwardRef, type InputHTMLAttributes } from "react";
import type { TextareaHTMLAttributes } from "react";
import type { ElementType, ComponentType } from "react";
import type { FnWithNoArgAndVoidReturnType, IconPositionType } from "../../models";
import { cn } from "../../../lib/utils";
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export interface InputWithIconProps extends InputProps {
    icon: ElementType | ComponentType<LucideIcon>;
    iconPosition: IconPositionType;
    iconClassName?: string;
    onIconClick?: FnWithNoArgAndVoidReturnType;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, ...props }, ref) => {
        return (
            <input
                className={cn(
                    'flex h-14 w-full rounded-xl border border-input bg-secondary-200 px-2.5 py-4 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-secondary-500 focus-visible:border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-secondary-400',
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Input.displayName = 'Input';

const InputWithIcon = forwardRef<HTMLInputElement, InputWithIconProps>(
    (
        {
            className,
            icon: Icon,
            iconPosition = 'right',
            iconClassName,
            onIconClick,
            ...props
        },
        ref
    ) => {
        return (
            <div className="relative flex w-full">
                <input
                    className={cn(
                        'peer flex h-14 w-full rounded-xl border border-input bg-secondary-200 px-2.5 py-4 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-secondary-500 focus-visible:border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-secondary-400',
                        className,
                        {
                            'pl-2.5 pr-12': iconPosition === 'right',
                            'pl-10 md:pl-12': iconPosition === 'left',
                        }
                    )}
                    ref={ref}
                    {...props}
                />
                <Icon
                    onClick={onIconClick}
                    className={cn(
                        'absolute top-1/2 size-4 -translate-y-1/2 text-secondary-600 peer-focus:text-secondary-700 md:size-5',
                        iconClassName,
                        {
                            'right-6': iconPosition === 'right',
                            'left-4': iconPosition === 'left',
                            'cursor-pointer': onIconClick,
                        }
                    )}
                />
            </div>
        );
    }
);
Input.displayName = 'InputWithIcon';

const CheckBox = forwardRef<HTMLInputElement, InputProps>(
    ({ className, ...props }, ref) => {
        return (
            <input
                type="checkbox"
                className={cn(
                    'size-5 cursor-pointer rounded-md border border-secondary-500 p-1 text-primary focus:ring-primary disabled:cursor-not-allowed',
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Input.displayName = 'Checkbox';

export interface TextareaProps
    extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                className={cn(
                    'flex w-full rounded-xl border border-input bg-secondary-200 px-2.5 py-4 text-sm placeholder:text-secondary-500 focus-visible:border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-secondary-400',
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Textarea.displayName = 'Textarea';

export { Input, InputWithIcon, CheckBox, Textarea };
