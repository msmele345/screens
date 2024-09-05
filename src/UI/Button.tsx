

interface ButtonProps {
    type: "submit" | "reset" | "button" | undefined;
    cssClasses?: string;
    textContent: string;
    onClick?: () => void 
}

const Button = ({type, cssClasses, textContent, onClick}: ButtonProps) => {
    return (
        <button type={type} className={cssClasses} onClick={onClick} >
           {textContent}
        </button>
    )
};

export default Button;