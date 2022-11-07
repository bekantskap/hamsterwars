import React, { useEffect, useState } from 'react';
import BattleImg from '../components/BattleImg';
import { useSelector, useDispatch } from 'react-redux';
import hamster, { updateHamster } from '../redux/hamster';
import { setIds, resetIds } from '../redux/id';
import { setDesc } from '../redux/render';
import { setMatches } from '../redux/match';

const battle = () => {
  const [challengers, setChallengers] = useState();
  const hamsters = useSelector(state => state.hamster);
  const matchState = useSelector(state => state.match);
  const dispatch = useDispatch();

  const randomHamsters = (arr, num) => {
    dispatch(resetIds());
    dispatch(setDesc(false));
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    const sliced = shuffled.slice(0, num);
    setChallengers(sliced);
    dispatch(setIds(sliced[0].id));
    dispatch(setIds(sliced[1].id));
    // getMatchInfo();
  };

  // const getMatchInfo = async () => {
  //   const res = await fetch('http://localhost:4000/api/matches');
  //   const data = await res.json();
  //   dispatch(setMatches(data));
  //   matchState.map(m => {
  //     console.log(m);
  //   });
  //   updateHamsterInfo();
  // };

  // // DENNA LIGGER EN FÖRE RENDERINGEN FIXA DETTA

  // const updateHamsterInfo = () => {
  //   hamsters.map(h => {
  //     const newObj = {
  //       id: 0,
  //       wins: 0,
  //       losses: 0,
  //       games: 0,
  //     };
  //     newObj.id = h.id;
  //     matchState.map(m => {
  //       console.log('entering');
  //       console.log(m.winnerId);
  //       if (h.id === m.winnerId) {
  //         console.log('success');
  //         newObj.wins++;
  //       }
  //       if (h.id == m.loserId) {
  //         console.log('success');
  //         newObj.losses++;
  //       }
  //     });
  //     newObj.games = newObj.wins + newObj.losses;
  //     dispatch(updateHamster(newObj));
  //   });
  // };

  return (
    <div className="h-screen z-12 w-screen flex justify-center items-center">
      <div className="absolute w-5/6 h-4/6 flex flex-col ">
        <div className=" bg-neutral-200 h-1/6 w-5/6 flex self-end yellow-stripe"></div>
        <div className="bg-neutral-200 h-1/6 w-5/6 yellow-stripe"></div>
        <div className=" bg-neutral-200 h-1/6 w-5/6 flex self-end yellow-stripe"></div>
        <div className="bg-neutral-200 h-1/6 w-5/6 yellow-stripe"></div>
        <div className=" bg-neutral-200 h-1/6 w-5/6 flex self-end yellow-stripe"></div>
        <div className="bg-neutral-200 h-1/6 w-5/6 yellow-stripe"></div>
      </div>
      {
        challengers
          ? challengers.map((m, index) => {
              return <BattleImg props={m} key={index} />;
            })
          : ''
        // <Image
        //   src={
        //     'https://images.unsplash.com/photo-1548767797-d8c844163c4c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80'
        //   }
        //   alt="hamster"
        //   width={500}
        //   height={500}
        //   style={{ width: 'auto', zIndex: '10' }}
        // />
      }
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
