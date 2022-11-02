import React, { Fragment } from 'react';
import Image from 'next/image';
import HamsterImg from '../public/assets/img/hamster-1.jpg';

const BattleImg = () => {
  return (
    <Fragment>
      <div className="w-[400px] h-[700px] bg-black rounded-2xl overflow-hidden flex flex-col justify-between">
        <Image
          layout="responsive"
          src={HamsterImg}
          objectFit="contain"
          alt="hamster"
        />
        <div className="flex flex-col items-center">
          <h3 className="text-white text-4xl">NAMN</h3>
          <p className="text-white text-2xl">FOOD</p>
          <p className="text-white text-2xl">LOVES</p>
        </div>
        <div className="w-full h-32 flex ">
          <div className="h-full w-full bg-green-700 flex items-center justify-center">
            <h3 className="text-5xl">VOTE</h3>
          </div>
          {/* <div className="h-full w-1/3 bg-yellow-700 border-r border-black"></div>
          <div className="h-full w-1/3 bg-yellow-700 "></div>
          <div className="h-full w-1/3 bg-yellow-700 border-l border-black"></div> */}
        </div>
      </div>
      <div className="w-[400px] h-[700px] bg-black">
        <Image
          layout="responsive"
          src={HamsterImg}
          objectFit="contain"
          alt="hamster"
        />
      </div>
    </Fragment>
  );
};

export default BattleImg;
