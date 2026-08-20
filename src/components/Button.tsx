interface ButtonProps {
  children: React.ReactNode;
  isLoading?: boolean;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

function Button({ children, isLoading = false, onClick, disabled = false, className = 'btn btn-primary' }: ButtonProps) {
  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      disabled={isLoading || disabled}
    >
      {isLoading ? 'Cargando...' : children}
    </button>
  );
}

export default Button;
