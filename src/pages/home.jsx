function Home() {
  return (
    <div className="flex items-center flex-col mt-10">
      <img
        className="w-40 h-40"
        src="https://icones.pro/wp-content/uploads/2021/05/icone-de-l-ecole-violet.png"
        alt="Logo"
      />
      <h1 className="text-3xl">Escola Criativa</h1>
      <div className="rating my-3">
        <input
          type="radio"
          name="rating-4"
          className="mask mask-star-2 bg-secondary"
        />
        <input
          type="radio"
          name="rating-4"
          className="mask mask-star-2 bg-secondary"
        />
        <input
          type="radio"
          name="rating-4"
          className="mask mask-star-2 bg-secondary"
        />
        <input
          type="radio"
          name="rating-4"
          className="mask mask-star-2 bg-secondary"
          checked
        />
        <input
          type="radio"
          name="rating-4"
          className="mask mask-star-2 bg-secondary"
        />
      </div>

      <p>05.113.502/0001-10</p>
      <p>Rua Herbert Richers, 82</p>
      <p>Blumenau - SC</p>
    </div>
  );
}

export default Home;
