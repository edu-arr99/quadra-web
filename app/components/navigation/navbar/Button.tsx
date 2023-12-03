interface ButtonProps {
    text: string;
    onClick?: () => void;
  }
  
const Button = ({ text, onClick }: ButtonProps) => {
return (
    <button className="h-12 rounded-lg bg-white font-bold px-5" onClick={onClick}>{text}</button>
);
};

export default Button;