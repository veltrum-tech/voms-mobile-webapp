import { type ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { TypographyH4, TypographyP } from './typography';
import { Button } from './button';
import successSrc from '@/assets/images/success-confetti.png';
import warningSrc from '@/assets/images/warning-confetti.png';
import type { FnWithNoArgAndVoidReturnType } from '../../models';
import { cn } from '../../../lib/utils';

interface ContentProps {
    cta?: string;
    icon?: ReactNode;
    heading: string;
    message: string;
    onCtaClick?: FnWithNoArgAndVoidReturnType;
    onConfirm?: FnWithNoArgAndVoidReturnType;
    onClose?: FnWithNoArgAndVoidReturnType;
}

const ModalContent = ({ contentProps }: { contentProps: ContentProps }) => {
    const { icon, heading, message, cta, onCtaClick } = contentProps;

    return (
        <div className="mt-2 flex w-full flex-col items-center gap-2 text-center md:gap-4">
            {icon && <span>{icon}</span>}
            <TypographyH4 className="text-lg">{heading}</TypographyH4>
            <TypographyP className="text-sm">{message}</TypographyP>
            <Button onClick={onCtaClick}>{cta}</Button>
        </div>
    );
};

const SuccessModalContent = ({
    contentProps,
}: {
    contentProps: ContentProps;
}) => {
    const { heading, message, cta, onCtaClick } = contentProps;

    return (
        <>
            <section
                className={cn('flex w-full justify-center bg-primary-600')}
            >
                <img src={successSrc} className="p-4" />
                {/* <Lottie
                        animationData={celebrationAnimation}
                        loop={true}
                        className="z-1 absolute top-0"
                    /> */}
            </section>
            <section className="flex flex-col items-center gap-10 p-4">
                <div className="text-center">
                    <TypographyH4 className="mb-2.5 text-lg text-primary-500">
                        {heading}
                    </TypographyH4>
                    <TypographyP className="text-sm leading-5">
                        {message}
                    </TypographyP>
                </div>
                <Button onClick={onCtaClick} size="lg" className="w-full">
                    {cta}
                    <ArrowRight className="size-5" />
                </Button>
            </section>
        </>
    );
};

const WarningModalContent = ({
    contentProps,
}: {
    contentProps: ContentProps;
}) => {
    const { heading, message, onConfirm, onClose } = contentProps;

    return (
        <>
            <section
                className={cn('flex w-full justify-center bg-primary-600')}
            >
                <img src={warningSrc} className="p-4" />
            </section>
            <section className="flex flex-col items-center gap-10 p-4">
                <div className="text-center">
                    <TypographyH4 className="mb-2.5 text-lg text-accent-7">
                        {heading}
                    </TypographyH4>
                    <TypographyP className="text-sm leading-5">
                        {message}
                    </TypographyP>
                </div>
                <div className="flex items-center gap-5">
                    <Button
                        size="lg"
                        type="button"
                        onClick={onClose}
                        className="border border-accent-3 bg-accent-2 px-4 text-accent-6 hover:bg-accent-7/10"
                    >
                        No, Cancel
                    </Button>
                    <Button
                        size="lg"
                        type="submit"
                        onClick={onConfirm}
                        className="px-5"
                    >
                        Yes, I Accept
                    </Button>
                </div>
            </section>
        </>
    );
};

export { ModalContent, SuccessModalContent, WarningModalContent };
