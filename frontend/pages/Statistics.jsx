import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import StatisticImg from '../components/StatisticImg';
import hamster, { updateHamster } from '../redux/hamster';

const statistics = () => {
  const [topFive, setTopFive] = useState([]);
  const [bottomFive, setBottomFive] = useState([]);
  const hamsterState = useSelector(state => state.hamster);

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

  useEffect(() => {
    getHighScores();
  }, [hamsterState]);

  return (
    <main>
      <section>
        {topFive.map((t, index) => {
          return <p key={index}>{t.name}</p>;
        })}
      </section>
      <section>
        {bottomFive.map((t, index) => {
          return <StatisticImg props={t} key={index} />;
        })}
      </section>
    </main>
  );
};

export default statistics;
