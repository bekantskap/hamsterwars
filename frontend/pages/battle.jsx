import React, { useEffect, useState } from 'react';
import BattleImg from '../components/BattleImg';
import { useSelector, useDispatch } from 'react-redux';
import store from '../redux/store';
import hamster from '../redux/hamster';
import Link from 'next/link';
import Image from 'next/image';

const battle = () => {
  const [challengers, setChallengers] = useState();
  const [defender, setDefender] = useState();
  const hamsters = useSelector(state => state.hamster);

  const randomHamsters = (arr, num) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    const sliced = shuffled.slice(0, num);
    setChallengers(sliced);
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="absolute w-5/6 h-4/6 flex flex-col">
        <div className=" bg-neutral-200 h-1/6 w-5/6 flex self-end yellow-stripe"></div>
        <div className="bg-neutral-200 h-1/6 w-5/6 yellow-stripe"></div>
        <div className=" bg-neutral-200 h-1/6 w-5/6 flex self-end yellow-stripe"></div>
        <div className="bg-neutral-200 h-1/6 w-5/6 yellow-stripe"></div>
        <div className=" bg-neutral-200 h-1/6 w-5/6 flex self-end yellow-stripe"></div>
        <div className="bg-neutral-200 h-1/6 w-5/6 yellow-stripe"></div>
      </div>
      {challengers ? (
        challengers.map((m, index) => {
          console.log(m);
          return <BattleImg props={m} key={index} />;
        })
      ) : (
        <Image
          src={
            'https://images.unsplash.com/photo-1548767797-d8c844163c4c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80'
          }
          alt="hamster"
          width={500}
          height={500}
          style={{ width: 'auto', zIndex: '10' }}
        />
      )}
      <button
        onClick={() => randomHamsters(hamsters, 2)}
        className="z-10 bg-yellow-500 hover:bg-transparent text-white font-semibold hover:text-yellow-700 py-2 px-4 border border-transparent hover:border-yellow-500 rounded"
      >
        BATTLE
      </button>
    </div>
  );
};

export default battle;
