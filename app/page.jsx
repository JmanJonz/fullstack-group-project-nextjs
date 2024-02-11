import Nav from "./component/Nav.jsx";
import Footer from "./component/Footer.jsx";
export default function Home() {
  return (
    <>
      <Nav />
      <section className="w-full h-full flex justify-center items-center flex-col bg-gradient-to-r from-blue-400 to-purple-600 py-12">
        <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-8">
          Discover & Share
          <br className="max-md:hidden" />
          <span className="mt-2 block">
            <span className="text-yellow-400">Handcrafted</span> Haven
          </span>
        </h1>
        <p className="text-white text-lg sm:text-xl max-w-lg text-center px-4 mb-10">
          Welcome to Handcrafted Haven, your premier destination for discovering
          and acquiring exquisite artifacts from around the world! Our app is
          designed to be your virtual gateway to a treasure trove of cultural
          and historical wonders, all conveniently at your fingertips.
        </p>
      </section>
      <Footer />
    </>
  );
}
