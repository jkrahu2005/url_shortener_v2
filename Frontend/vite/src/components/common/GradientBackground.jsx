function GradientBackground() {
  return (
    <>
      {/* Grid Background */}
      <div
        className="
          absolute inset-0
          -z-20
          bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)]
          bg-[size:48px_48px]
          opacity-40
        "
      />

      {/* Blue Blob */}
      <div
        className="
          absolute
          -top-32
          left-10
          h-80
          w-80
          rounded-full
          bg-blue-500/20
          blur-3xl
          -z-10
        "
      />

      {/* Purple Blob */}
      <div
        className="
          absolute
          top-40
          right-10
          h-96
          w-96
          rounded-full
          bg-violet-500/20
          blur-3xl
          -z-10
        "
      />

      {/* Cyan Blob */}
      <div
        className="
          absolute
          bottom-0
          left-1/3
          h-72
          w-72
          rounded-full
          bg-cyan-400/20
          blur-3xl
          -z-10
        "
      />
    </>
  );
}

export default GradientBackground;