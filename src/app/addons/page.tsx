function Page() {
  return (
    <div className="relative h-full w-full">
      <h1>Addons</h1>
      <button className="bg-solid-green-1 hover:bg-solid-green-2 absolute bottom-2 right-4 rounded-full p-3 py-1  text-text-gray-2 transition-all md:bottom-2 md:right-6">
        + Addon
      </button>
    </div>
  );
}

export default Page;
