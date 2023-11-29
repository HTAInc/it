import { Link as LinkReact } from "@inertiajs/react";

export default function Link({ className = '', disabled, children, ...props }) {
    return (
        <LinkReact
            {...props}
            className={  
                `${className} inline-flex items-center w-fit h-fit px-4 py-2 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 ${
                    disabled && 'opacity-25'
                }`
            }
            disabled={disabled}
        >
            {children}
        </LinkReact>
    );
}
