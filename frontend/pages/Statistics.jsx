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
  console.log(matchState);

  // const getMatchInfo = async () => {
  //   const res = await fetch('http://localhost:4000/api/matches');
  //   const data = await res.json();
  //   dispatch(setMatches(data));
  //   updateHamsterInfo();
  // };

  const getHighScores = async () => {
    const res = await fetch('http://localhost:4000/api/winners');
    const data = await res.json();
    const arr = [];
    data.map(m => {
      hamsterState.map(h => {
        if (m.winnerId == h.id) {
          arr.push(h);
        }
        setTopFive(arr);
      });
    });
    getLowScores();
  };

  const getLowScores = async () => {
    const res = await fetch('http://localhost:4000/api/losers');
    const data = await res.json();
    const arr = [];
    console.log(data);
    data.map(m => {
      hamsterState.map(h => {
        if (m.loserId == h.id) {
          arr.push(h);
        }
        setBottomFive(arr);
      });
    });
  };

  // const updateHamsterInfo = () => {
  //   matchState.map(m => {
  //     console.log('hej');
  //   });
  //   hamsterState.map(h => {
  //     const newObj = {
  //       id: 0,
  //       wins: 0,
  //       losses: 0,
  //       games: 0,
  //     };
  //     newObj.id = h.id;
  //     matchState.map(m => {
  //       console.log('entering MATCHSTATE');
  //       if (h.id === m.winnerId) {
  //         newObj.wins++;
  //       }
  //       if (h.id == m.loserId) {
  //         newObj.losses++;
  //       }
  //     });
  //     newObj.games = newObj.wins + newObj.losses;
  //     dispatch(updateHamster(newObj));
  //   });
  //   getHighScores();
  // };

  useEffect(() => {
    getHighScores();
  }, [hamsterState]);

  return (
    <main className="h-screen w-screen mt-20">
      <div className="flex m-auto w-3/6 justify-evenly">
        <h2 className="text-4xl font-bold">Bästa 5</h2>
        <h2 className="text-4xl font-bold">Sämsta 5</h2>
      </div>

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
