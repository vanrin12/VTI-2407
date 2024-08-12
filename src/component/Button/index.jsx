import { Button as BsButton } from 'react-bootstrap';
function Button({ variant, onClick, customClass,children, ...props }) {
    return (
        <BsButton variant={variant} onClick={onClick} className={customClass} {...props}>
            {children}
        </BsButton>
    );
}

export default Button;
