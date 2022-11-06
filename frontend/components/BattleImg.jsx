import React, { Fragment, useEffect } from 'react';
import Image from 'next/image';
import { FcLike } from 'react-icons/fc';

const BattleImg = props => {
  return (
    <Fragment>
      <div className="z-10 w-[400px] h-[700px] border-2 border-black bg-white rounded-2xl overflow-hidden flex flex-col justify-between">
        <div
          style={{
            width: '100%',
            height: '50%',
            position: 'relative',
          }}
        >
          <Image
            fill
            src={`/assets/img/${props.props.imgName}`}
            alt="hamster"
          />
        </div>
        <div className="flex flex-col items-center ">
          <h3 className="text-4xl mb-8 font-bold uppercase">
            {props.props.name}
          </h3>
          <div className="text-center">
            <FcLike size={22} />
            <p className=" text-2xl uppercase">{props.props.favFood}</p>
            <p className=" text-2xl uppercase">{props.props.loves}</p>
          </div>
        </div>
        <div className="w-full h-28 flex ">
          <div className="h-full w-full bg-green-700 flex items-center justify-center hover:cursor-pointer hover:bg-green-500 transition-colors duration-300">
            <h3 className="text-5xl">VOTE</h3>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BattleImg;
