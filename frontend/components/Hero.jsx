import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    <main className="flex items-center justify-evenly mb-12 custom-img bg-fixed bg-cover bg-center h-screen">
      <section className="w-2/4 h-2/5 flex flex-col items-center justify-end">
        <button class=" bg-yellow-500 hover:bg-transparent text-white font-semibold hover:text-yellow-700 py-2 px-4 border border-transparent hover:border-yellow-500 rounded">
          <Link href="/battle">BATTLE</Link>
        </button>
        <button class="mt-10 bg-transparent hover:bg-yellow-500 text-yellow-700 font-semibold hover:text-white py-2 px-4 border border-yellow-500 hover:border-transparent rounded">
          GALLERY
        </button>
      </section>
      <section className=" mt-20 w-96 h-screen bg-black/70 flex flex-col items-center justify-center text-center">
        <div className="">
          <h3 className="text-6xl text-white">WELCOME</h3>
          <h3 className="text-6xl text-white">TO</h3>
          <h3 className="text-6xl text-white">HAMSTER</h3>
          <h3 className="text-6xl pb-14 text-white">WARS</h3>
        </div>
        <p className="text-white text-xl">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima ut
          iste officia quibusdam molestias saepe culpa maxime a dignissimos
          adipisci, veniam vero perspiciatis alias pariatur fugit. Molestiae
          nisi delectus consequuntur?
        </p>
      </section>
    </main>
  );
};

export default Hero;
