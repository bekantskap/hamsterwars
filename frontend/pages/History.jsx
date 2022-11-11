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
    const res = await fetch('http://localhost:4000/api/matches');
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

  return (
    <div className="w-screen h-screen text-center mt-20">
      <button onClick={() => findAndSortDuels(matchState)}>tryck</button>
      {duels.map(d => {
        return (
          <div>
            <div>{d.winnerName}</div>
            <p>vs. </p>
            <div>{d.loserName}</div>
          </div>
        );
      })}
    </div>
  );
};

export default history;
