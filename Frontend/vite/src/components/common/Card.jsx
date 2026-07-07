function Card({
  children,
  className = "",
}) {
  return (
    <div
      className={`
        rounded-2xl
        border
        border-base-300
        bg-base-100
        shadow-xl
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default Card;