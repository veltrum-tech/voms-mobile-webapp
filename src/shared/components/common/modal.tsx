import { type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import type { FnWithNoArgAndVoidReturnType } from '../../models';
import { useOutsideClick } from '../../hooks';
import { cn } from '../../../lib/utils';

const Modal = ({
    open,
    close,
    children,
    className,
    iconClassName,
}: {
    open: boolean;
    children: ReactNode;
    className?: string;
    iconClassName?: string;
    close: FnWithNoArgAndVoidReturnType;
}) => {
    const ref = useOutsideClick(close);

    if (!open) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 h-screen min-h-screen w-full bg-black/30 backdrop-blur-sm transition-all duration-500">
            <main
                ref={ref}
                className={cn(
                    'fixed left-1/2 top-1/2 z-50 w-80 max-w-sm -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-2xl bg-secondary-100 [scrollbar-width:none]',
                    className
                )}
            >
                <button
                    onClick={close}
                    className={cn(
                        'absolute right-4 top-4 z-10 text-primary-foreground',
                        iconClassName
                    )}
                >
                    <X className="md:h-5 md:w-5" />
                </button>

                <div>{children}</div>
            </main>
        </div>,
        document.body
    );
};

export { Modal };
