import Image from 'next/image';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMatches } from '../redux/match';

const history = () => {
  const [winners, setWinners] = useState([]);
  const [losers, setLosers] = useState([]);
  const [duels, setDuels] = useState([]);
  const matchState = useSelector(state => state.match);
  const hamsterState = useSelector(state => state.hamster);
  const dispatch = useDispatch();

  const getMatchInfo = async () => {
    const res = await fetch('https://hamsterdb.onrender.com/api/matches');
    const data = await res.json();
    dispatch(setMatches(data));
  };

  const findAndSortDuels = match => {
    const winArr = [];
    const loseArr = [];
    match.map(m => {
      const winObj = {
        matchId: '',
        name: '',
        img: '',
      };
      const loseObj = {
        matchId: '',
        name: '',
        img: '',
      };
      hamsterState.map(h => {
        if (m.winnerId == h.id) {
          winObj.matchId = m.id;
          winObj.name = h.name;
          winObj.img = h.imgName;
          winArr.push(winObj);
        }
        if (m.loserId == h.id) {
          loseObj.matchId = m.id;
          loseObj.name = h.name;
          loseObj.img = h.imgName;
          loseArr.push(loseObj);
        }
      });
      setWinners(winArr);
      setLosers(loseArr);
    });
    updateDuels(winners, losers);
  };

  const updateDuels = (win, lose) => {
    const newArr = [];

    win.map(w => {
      console.log('hej');
      const newObj = {
        matchId: '',
        winnerName: '',
        winnerImg: '',
        loserName: '',
        loserImg: '',
      };
      lose.map(l => {
        if (l.matchId == w.matchId) {
          newObj.winnerName = w.name;
          newObj.winnerImg = w.img;
          newObj.loserName = l.name;
          newObj.loserImg = l.img;
          newArr.push(newObj);
        }
      });
      setDuels(newArr);
    });
  };

  useEffect(() => {
    getMatchInfo();
  }, []);

  useEffect(() => {
    findAndSortDuels(matchState);
  }, [matchState]);

  return (
    <div className="w-screen h-screen text-center mt-20">
      <main className="grid grid-cols-4 w-5/6 m-auto">
        {duels.map(d => {
          return (
            <div className="flex items-center border-2 m-2 border-black">
              <div className="h-[150px] w-[150px] m-1 relative ">
                <Image
                  src={`/assets/img/${d.winnerImg}`}
                  alt="hamster"
                  width={500}
                  height={500}
                  style={{ width: '100%', height: '100%' }}
                  priority={true}
                />
                <div className="absolute top-0 bottom-0 left-0 right-0 bg-green-600 opacity-40"></div>
                <h3 className="absolute bottom-2 left-4 text-2xl font-bold text-white">
                  {d.winnerName}
                </h3>
              </div>
              <div className="h-[150px] w-[150px] m-1 relative">
                <Image
                  src={`/assets/img/${d.loserImg}`}
                  alt="hamster"
                  width={500}
                  height={500}
                  style={{ width: '100%', height: '100%' }}
                  priority={true}
                />
                <div className="absolute top-0 bottom-0 left-0 right-0 bg-red-600 opacity-40"></div>
                <h3 className="absolute bottom-2 left-4 text-2xl font-bold text-white">
                  {d.loserName}
                </h3>
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
};

export default history;
