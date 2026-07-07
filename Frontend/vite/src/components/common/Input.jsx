function Input({
  className = "",
  icon,
  ...props
}) {
  return (
    <label
      className={`
        input
        input-bordered
        flex
        h-14
        w-full
        items-center
        gap-3
        rounded-xl
        transition-all
        duration-300
        focus-within:scale-[1.01]
        focus-within:ring-2
        focus-within:ring-primary
        ${className}
      `}
    >
      {icon}

      <input
        className="grow"
        {...props}
      />
    </label>
  );
}

export default Input;