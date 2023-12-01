interface ButtonProps {
    text: string;
  }
  
const Button = ({ text }: ButtonProps) => {
return (
    <button className="h-12 rounded-lg bg-white font-bold px-5">{text}</button>
);
};

export default Button;