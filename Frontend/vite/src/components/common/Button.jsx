function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  loading = false,
  leftIcon,
  rightIcon,
  disabled = false,
  ...props
}) {
  const variants = {
    primary: "btn-primary",
    secondary: "btn-outline",
    ghost: "btn-ghost",
    danger: "btn-error",
    success: "btn-success",
  };

  const sizes = {
    sm: "btn-sm",
    md: "",
    lg: "btn-lg",
  };

  return (
    <button
      className={`
        btn
        ${variants[variant]}
        ${sizes[size]}
        rounded-xl
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:shadow-lg
        active:scale-95
        ${className}
      `}
      disabled={loading || disabled}
      {...props}
    >
      {loading && (
        <span className="loading loading-spinner loading-sm"></span>
      )}

      {!loading && leftIcon}

      {children}

      {!loading && rightIcon}
    </button>
  );
}

export default Button;