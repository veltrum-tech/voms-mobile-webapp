const MainBackground = () => {
  return (
    <section className="relative h-screen w-screen bg-primary-600">
      {/* Background overlay */}
      <div className="absolute inset-0 h-screen -z-10">
        <img
          src="/background.png"
          alt="Skyscraper background"
          loading="lazy"
          className="w-screen h-screen object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
    </section>
  );
};

export { MainBackground };
