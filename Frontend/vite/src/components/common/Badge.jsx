function Badge({
  children,
  variant = "primary",
  className = "",
}) {
  const variants = {
    primary: "badge-primary",
    success: "badge-success",
    warning: "badge-warning",
    danger: "badge-error",
    neutral: "badge-neutral",
  };

  return (
    <div
      className={`
        badge
        ${variants[variant]}
        rounded-full
        px-4
        py-3
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default Badge;