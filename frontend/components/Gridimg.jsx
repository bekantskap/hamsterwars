import Image from 'next/image';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { deleteHamster } from '../redux/hamster';

const Gridimg = props => {
  const [isHovering, setIsHovering] = useState(false);
  const [modal, setModal] = useState(false);
  const [defeated, setDefeated] = useState([]);
  const dispatch = useDispatch();
  const hamsterState = useSelector(state => state.hamster);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const removeHandler = async c => {
    dispatch(deleteHamster(c));
    console.log(c);
    const res = await fetch(`https://hamsterdb.onrender.com/api/hamsters/${c.id}`, {
      method: 'DELETE',
    });
    console.log(res);
  };

  const getWonMatches = async id => {
    const res = await fetch(`https://hamsterdb.onrender.com/api/defeated/${id}`);
    const data = await res.json();
    setWonMatches(data);
  };

  const setWonMatches = data => {
    const newArr = [];
    data.map(d => {
      hamsterState.map(h => {
        if (d === h.id) {
          return newArr.push(h);
        }
      });
      setDefeated(newArr);
    });
    modalHandler();
  };

  const modalHandler = () => {
    setModal(!modal);
  };

  return (
    <>
      <div
        className="h-[300px] m-1 relative"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <Image
          src={`/assets/img/${props.props.imgName}`}
          alt="hamster"
          width={500}
          height={500}
          style={{ width: '100%', height: '100%' }}
          priority={true}
        />
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-black opacity-40"></div>
        <h3 className="absolute bottom-2 left-4 text-2xl font-bold text-white">
          {props.props.name}
        </h3>
        <div className={isHovering ? 'contents ' : 'hidden'}>
          <div className="absolute top-0 bottom-0 left-0 right-0  bg-black opacity-90 flex flex-col items-center justify-center">
            <p className="text-white text-lg">Älskar att {props.props.loves}</p>
            <p className="text-white text-lg">Ålder: {props.props.age}</p>
            <p className="text-white text-lg">
              Favoritmat: {props.props.favFood}
            </p>
            <div className="m-2 text-center flex flex-col items-center justify-center">
              <div className="mb-2 h-8 w-32 bg-green-500 rounded">
                <p className="text-lg">Wins: {props.props.wins}</p>
              </div>
              <div className="mb-2 h-8 w-32 bg-yellow-500 rounded">
                <p className="text-lg">Defeats:{props.props.defeats}</p>
              </div>
            </div>
            <AiOutlineClose
              size={30}
              style={{ color: `white` }}
              className="hover:cursor-pointer absolute top-2 left-2"
              onClick={() => removeHandler(props.props)}
            />
            <button
              type="button"
              onClick={() => getWonMatches(props.props.id)}
              className="ml-2 absolute bottom-5 left-3/6 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Vunna matcher
            </button>
          </div>
        </div>
      </div>
      <section
        className={`absolute z-10 top-0 right-0 bottom-0 flex flex-col items-center w-full h-fit bg-black ease-in duration-300
          ${modal ? 'left-0' : 'left-[-100%]'}
        `}
      >
        <AiOutlineClose
          onClick={modalHandler}
          size={30}
          style={{ color: `white` }}
          className="hover:cursor-pointer absolute top-6 right-6"
        />
        {defeated.map(d => {
          return (
            <div className="w-4/5 h-[400px] flex items-center justify-center m-10">
              <Image
                src={`/assets/img/${props.props.imgName}`}
                alt="hamster"
                width={500}
                height={500}
                style={{ width: '40%', height: '80%' }}
                priority={true}
              />
              <p className="text-white text-2xl">Versus</p>
              <Image
                src={`/assets/img/${d.imgName}`}
                alt="hamster"
                width={500}
                height={500}
                style={{ width: '40%', height: '80%' }}
                className="grayscale "
                priority={true}
              />
            </div>
          );
        })}
      </section>
    </>
  );
};

export default Gridimg;
