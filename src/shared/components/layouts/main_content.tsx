import { type ReactNode } from 'react';

const Main = ({ children }: { children: ReactNode }) => {
    return (
        <main className="mt-4 w-full px-4">
            {children}
        </main>
    );
};

export { Main };
