interface ChatBubbleProps {
    text: string;
}

const ChatBubble = ({ text }: ChatBubbleProps) => {
    return (
        <div className="mb-8 flex items-end justify-start">
            <div className="relative max-w-xs rounded-xl bg-primary-600 py-2 px-3">
                <div className="text-white">{text}</div>
                <div className="absolute bottom-0 left-1/2 h-0 w-0 -translate-x-1/2 translate-y-4 border-l-10 border-r-10 border-t-18 border-l-transparent border-r-transparent border-t-primary-600"></div>
            </div>
        </div>
    );
};

export { ChatBubble };
