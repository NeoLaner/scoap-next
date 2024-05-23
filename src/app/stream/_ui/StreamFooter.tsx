function StreamFooter({ director }: { director: string[] }) {
  return (
    <div
      className="text-gray-3 absolute bottom-0 w-full p-4 pb-8 pt-6 md:p-8"
      style={{
        backgroundImage: `linear-gradient(to top, #000000a9 0%, rgba(0, 0, 0, 0) 100%)`,
      }}
    >
      <div className="flex justify-between">
        <div className="flex flex-col">
          <div className="text-xs uppercase tracking-[0.15em]">Directed by</div>{" "}
          <div className="text-sm font-semibold uppercase tracking-[0.25em]">
            {director.join(", ")}
          </div>
        </div>

        <button>Play</button>
      </div>
    </div>
  );
}

export default StreamFooter;
