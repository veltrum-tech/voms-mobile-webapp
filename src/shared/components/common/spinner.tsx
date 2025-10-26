import { LoaderCircle } from 'lucide-react';

const MiniSpinner = () => {
    return <LoaderCircle className="animate-spin size-5" />;
};

const Spinner = () => {
    return (
        <div
            className="mx-auto my-10 aspect-square w-12 animate-spin rounded-full"
            style={{
                background:
                    'radial-gradient(farthest-side, #009641 94%, #0000) top/10px 10px no-repeat, conic-gradient(#0000 30%, #009641)',
                mask: 'radial-gradient(farthest-side, #0000 calc(100% - 10px), #000 0)',
            }}
        ></div>
    );
};

export { Spinner, MiniSpinner };
