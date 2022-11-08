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
    getMatchInfo();
  };

  const getMatchInfo = async () => {
    const res = await fetch('http://localhost:4000/api/matches');
    const data = await res.json();
    dispatch(setMatches(data));
    matchState.map(m => {
      console.log(m);
    });
    updateHamsterInfo();
  };

  // DENNA LIGGER EN FÖRE RENDERINGEN FIXA DETTA

  const updateHamsterInfo = () => {
    hamsters.map(h => {
      const newObj = {
        id: 0,
        wins: 0,
        losses: 0,
        games: 0,
      };
      newObj.id = h.id;
      matchState.map(m => {
        console.log('entering');
        console.log(m.winnerId);
        if (h.id === m.winnerId) {
          console.log('success');
          newObj.wins++;
        }
        if (h.id == m.loserId) {
          console.log('success');
          newObj.losses++;
        }
      });
      newObj.games = newObj.wins + newObj.losses;
      dispatch(updateHamster(newObj));
    });
  };

  return (
    <div className="h-screen z-12 w-screen flex flex-col justify-center items-center">
      <section className="flex">
        {challengers
          ? challengers.map((m, index) => {
              return <BattleImg props={m} key={index} />;
            })
          : ''}
      </section>
      <button
        onClick={() => randomHamsters(hamsters, 2)}
        className=" bg-yellow-500 hover:bg-transparent text-white font-semibold hover:text-yellow-700 py-2 px-4 border border-transparent hover:border-yellow-500 rounded"
      >
        GENERERA
      </button>
    </div>
  );
};

export default battle;
