import { Button as BsButton, ButtonProps } from "react-bootstrap";

interface CustomButtonProps extends ButtonProps {
  customClassName?: string;
}
const Button = ({
  variant = "primary",
  size,
  children,
  customClassName,
  ...props
}: CustomButtonProps) => {
  return (
    <BsButton
      variant={variant}
      size={size}
      className={customClassName}
      {...props}
    >
      {children}
    </BsButton>
  );
};

export default Button;
