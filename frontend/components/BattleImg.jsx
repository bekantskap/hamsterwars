import React, { Fragment, useEffect } from 'react';
import Image from 'next/image';
import { FcLike } from 'react-icons/fc';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteId, setIds, setScore } from '../redux/id';
import { setDesc } from '../redux/render';
import { updateHamster } from '../redux/hamster';

const BattleImg = props => {
  const dispatch = useDispatch();
  const ids = useSelector(state => state.id);
  const renderState = useSelector(state => state.render);
  const matchState = useSelector(state => state.match);
  const hamsterState = useSelector(state => state.hamster);
  // console.log(props);
  const voteHandler = async c => {
    const arr = ids.filter(item => item !== c);
    const loser = arr[0];
    const winner = c;
    console.log('winner: ' + winner + 'loser: ' + loser);
    const res = await fetch('http://localhost:4000/api/matches', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ winnerId: winner, loserId: loser }),
    });
    const data = await res.json();
    console.log(data);
    if (data) {
      dispatch(setDesc(true));
    }
  };

  return (
    <Fragment>
      <div className="z-11 w-[400px] h-[700px] border-2 border-black bg-white rounded-2xl overflow-hidden flex flex-col justify-between">
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
          {renderState ? (
            <>
              <div className="h-full w-1/2 bg-green-500 flex flex-col justify-center items-center">
                <h3 className="text-2xl">WINS</h3>
                <h3 className="text-2xl">{props.props.wins}</h3>
              </div>
              <div className="h-full w-1/2 bg-red-500 flex flex-col justify-center items-center">
                <h3 className="text-2xl">LOSSES</h3>
                <h3 className="text-2xl">{props.props.losses}</h3>
              </div>
            </>
          ) : (
            <div
              onClick={() => voteHandler(props.props.id)}
              className="h-full w-full bg-green-700 flex items-center justify-center hover:cursor-pointer hover:bg-green-500 transition-colors duration-300"
            >
              <h3 className="text-5xl">VOTE</h3>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default BattleImg;
