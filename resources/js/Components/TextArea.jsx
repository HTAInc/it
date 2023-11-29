import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextArea({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <textarea
            {...props}
            className={
                'border-gray-300 focus:border-rose-500 focus:ring-rose-500 rounded-md shadow-sm ' +
                className
            }
            ref={input}
        />
    );
});
