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

  const getHighScores = async () => {
    const res = await fetch('https://hamsterdb.onrender.com/api/winners');
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
    const res = await fetch('https://hamsterdb.onrender.com/api/losers');
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
