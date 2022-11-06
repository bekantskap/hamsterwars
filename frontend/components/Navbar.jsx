import React, { useEffect, useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import store from '../redux/store';
import hamster, { setHamster } from '../redux/hamster';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const dispatch = useDispatch();
  const state = store.getState();

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    fetchHamsters();
  }, []);

  const fetchHamsters = async () => {
    const res = await fetch('http://localhost:4000/api/hamsters');
    const data = await res.json();
    dispatch(setHamster(data));
  };

  return (
    <nav className="bg-white sticky left-0 top-0 w-full z-10 ease-in duration-300">
      <div className="max-w-[1240px] m-auto flex justify-between items-center p-4 text-black">
        <h2 className="text-4xl">
          <Link href="/">HAMSTER WARS</Link>
        </h2>

        <div onClick={handleNav} className="block z-10">
          {nav ? (
            <AiOutlineClose
              size={30}
              style={{ color: `white` }}
              className="hover:cursor-pointer"
            />
          ) : (
            <AiOutlineMenu
              size={30}
              style={{ color: 'black' }}
              className="hover:cursor-pointer"
            />
          )}
        </div>
        <div
          className={`absolute top-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-in duration-300
          ${nav ? 'left-0' : 'left-[-100%]'}
        `}
        >
          <ul>
            <li
              onClick={handleNav}
              className="p-4 text-4xl text-white hover:text-gray-500 cursor-pointer"
            >
              <Link href="/">HOME</Link>
            </li>
            <li
              onClick={handleNav}
              className="p-4 text-4xl text-white hover:text-gray-500 cursor-pointer"
            >
              <Link href="/battle">BATTLE</Link>
            </li>
            <li
              onClick={handleNav}
              className="p-4 text-4xl text-white hover:text-gray-500 cursor-pointer"
            >
              <Link href="/gallery">GALLERY</Link>
            </li>
            <li
              onClick={handleNav}
              className="p-4 text-4xl text-white hover:text-gray-500 cursor-pointer"
            >
              <Link href="/history">HISTORY</Link>
            </li>
            <li
              onClick={handleNav}
              className="p-4 text-4xl text-white hover:text-gray-500 cursor-pointer"
            >
              <Link href="/statistics">STATISTICS</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
