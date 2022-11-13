import Image from 'next/image';
import React, { useState } from 'react';
import { useEffect } from 'react';

const StatisticImg = props => {
  const [wins, setWins] = useState(true);
  const updateWinOrLoss = () => {
    console.log(props.state);
    setWins(props.state);
  };

  useEffect(() => {
    updateWinOrLoss();
  }, []);
  return (
    <div className="w-full h-full m-4 relative bg-gray-600">
      <Image
        src={`/assets/img/${props.props.imgName}`}
        alt="hamster"
        className="opacity-20"
        fill
        priority={true}
      ></Image>
      <div className="relative h-full flex flex-col justify-center items-center">
        <h3 className="text-4xl mb-4 font-bold">{props.props.name}</h3>
        {wins ? (
          <h3 className="text-2xl">Vinster: {props.props.wins}</h3>
        ) : (
          <h3 className="text-2xl">Förluster: {props.props.defeats}</h3>
        )}
      </div>
    </div>
  );
};

export default StatisticImg;
