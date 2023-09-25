import logo from "../assets/logo.svg";

function Hero() {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <img src={logo} alt="logo" className="w-20 object-contain" />

        <button
          type="button"
          onClick={() => {
            window.open("https://github.com/Sadeeq499");
          }}
          className="black_btn"
        >
          GitHub
        </button>
      </nav>

      <h1 className="head_text">
        Summarize Article with <br className="max-md:hidden" />
        <span className="orange_gradient">OpenAI GPT-4</span>
      </h1>

      <h2 className="desc">
        Simplify your reading experience with our AI-powered tool that
        summarizes long articles into short summaries.
      </h2>
    </header>
  );
}

export default Hero;
