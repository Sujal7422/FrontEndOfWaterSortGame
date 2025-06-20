import React from 'react';

function About() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 bg-[rgb(42,30,68)] text-[rgb(240,240,255)]">
      <div className="max-w-4xl w-full bg-[rgb(72,52,155)] border-4 border-[rgb(50,110,180)] rounded-xl shadow-xl p-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[rgb(180,180,210)]">
          About GameZone 🎮
        </h1>
        <p className="text-lg md:text-xl mb-4 leading-relaxed text-[rgb(200,200,230)]">
          Welcome to <strong>GameZone</strong>, the ultimate destination for puzzle lovers! Our mission is to build challenging,
          fun, and beautiful games that ignite your brain and boost your focus.
        </p>
        <p className="text-lg md:text-xl mb-4 leading-relaxed text-[rgb(200,200,230)]">
          Whether you're sorting colored water, solving logic mysteries, or competing with friends,
          GameZone brings you a gaming experience that’s both relaxing and stimulating.
        </p>
        <p className="text-lg md:text-xl mb-4 leading-relaxed text-[rgb(200,200,230)]">
          Built with ❤️ using modern web technologies like <strong>React</strong> and <strong>Tailwind CSS</strong>, this platform
          also supports user login, real-time score tracking, and a fully responsive UI.
        </p>
        <p className="text-lg md:text-xl leading-relaxed text-[rgb(200,200,230)]">
          Stay tuned for upcoming features, levels, and games! Your feedback is always welcome.
        </p>
      </div>
    </div>
  );
}

export default About;
