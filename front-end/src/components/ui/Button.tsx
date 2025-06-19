import type { ReactElement } from "react";


export interface ButtonProps {
    variant: "Primary" | "Secondary";
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick: () => void;
}
// Mapping button variants to their respective CSS classes
const variantClasses = {
    "primary": "bg-purple-600 text-white", // Styles for primary variant
    "secondary": "bg-purple-200 text-purple-600", // Styles for secondary variant
};

export const Button = ({variant,onClick}: ButtonProps) => {
    return <button onClick={onClick} className={variantClasses[variant] + " " + defaultStyles + `${fullWidth ? " w-full flex justify-center items-center" : ""} ${loading ? "opacity-45" : ""}` } disabled={loading} >
            {/* Container for optional start icon */}
            <div className="pr-2">
                {startIcon}
            </div>
            {/* Button text */}
            {text}
        </button>
}


// //you can also do like this no need to separately write interface
// export const Button = (props: {
//     variant: "Primary" | "Secondary";
//     size: "sm" | "md" | "lg";
//     text: string;
//     //startIcon:ReactElement;
//     startIcon: any;
//     endIcon: any;
//     onClick: () => void;
// }) => {
//     return <button></button>
// }

