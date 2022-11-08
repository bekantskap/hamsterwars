import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StatisticImg from '../components/StatisticImg';
import hamster, { updateHamster } from '../redux/hamster';
import { setMatches } from '../redux/match';

const statistics = () => {
  const [topFive, setTopFive] = useState([]);
  const [bottomFive, setBottomFive] = useState([]);
  const hamsterState = useSelector(state => state.hamster);
  const matchState = useSelector(state => state.match);
  const dispatch = useDispatch();

  const getMatchInfo = async () => {
    const res = await fetch('http://localhost:4000/api/matches');
    const data = await res.json();
    dispatch(setMatches(data));
    matchState.map(m => {
      console.log(m);
    });
    updateHamsterInfo();
  };

  const getHighScores = async () => {
    const res = await fetch('http://localhost:4000/api/winners');
    const data = await res.json();
    const arr = [];
    data.map(m => {
      hamsterState.map(h => {
        if (m.winnerId == h.id) {
          arr.push(h);
          setTopFive(arr);
        }
      });
    });
    getLowScores();
  };

  const getLowScores = async () => {
    const res = await fetch('http://localhost:4000/api/losers');
    const data = await res.json();
    const arr = [];
    data.map(m => {
      hamsterState.map(h => {
        if (m.loserId == h.id) {
          arr.push(h);
          setBottomFive(arr);
        }
      });
    });
  };

  const updateHamsterInfo = () => {
    hamsterState.map(h => {
      const newObj = {
        id: 0,
        wins: 0,
        losses: 0,
        games: 0,
      };
      newObj.id = h.id;
      console.log('entered');
      matchState.map(m => {
        console.log('entering');
        console.log(m.winnerId);
        if (h.id === m.winnerId) {
          console.log('logging win');
          newObj.wins++;
        }
        if (h.id == m.loserId) {
          newObj.losses++;
        }
      });
      newObj.games = newObj.wins + newObj.losses;
      dispatch(updateHamster(newObj));
    });
    getHighScores();
  };

  useEffect(() => {
    getMatchInfo();
  }, [hamsterState]);

  return (
    <main className="h-screen w-screen ">
      <h2 className="text-center text-4xl font-bold">Highscore</h2>
      <div className="h-4/5 flex justify-center items-center ">
        <section className="w-1/6 h-full  flex flex-col items-center">
          {topFive.map((t, index) => {
            return <StatisticImg props={t} key={index} state={true} />;
          })}
        </section>
        <section className="w-1/6 h-full m-10 flex flex-col items-center">
          {bottomFive.map((t, index) => {
            return <StatisticImg props={t} key={index} state={false} />;
          })}
        </section>
      </div>
    </main>
  );
};

export default statistics;
