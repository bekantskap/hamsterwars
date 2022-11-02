import React from 'react';
import BattleImg from '../components/BattleImg';

const battle = () => {
  const rng = () => {
    const random = Math.floor(Math.random() * 10);
    const imgUrl = `/hamster-${random}.jpg`;
    return imgUrl;
  };

  const fetchData = () => {};

  return (
    <div className="h-screen w-screen flex justify-evenly items-center">
      <BattleImg />
    </div>
  );
};

export default battle;
