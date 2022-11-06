import Image from 'next/image';
import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { deleteHamster } from '../redux/hamster';

const Gridimg = props => {
  const [isHovering, setIsHovering] = useState(false);
  const dispatch = useDispatch();

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const removeHandler = async c => {
    dispatch(deleteHamster(c));
    console.log(c);
    const res = await fetch(`http://localhost:4000/api/hamsters/${c.id}`, {
      method: 'DELETE',
    });
    console.log(res);
  };

  return (
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
        priority
      />
      <div className="absolute top-0 bottom-0 left-0 right-0 bg-black opacity-40"></div>
      <h3 className="absolute bottom-2 left-4 text-2xl font-bold text-white">
        {props.props.name}
      </h3>
      <div className={isHovering ? 'contents ' : 'hidden'}>
        <div className="absolute top-0 bottom-0 left-0 right-0  bg-black opacity-90 flex flex-col items-center justify-center">
          <p className="text-white text-lg">Loves: {props.props.loves}</p>
          <p className="text-white text-lg">Age: {props.props.age}</p>
          <p className="text-white text-lg">Fave food: {props.props.favFood}</p>
          <div className="m-2 text-center flex flex-col items-center justify-center">
            <div className="mb-2 h-8 w-32 bg-green-500 rounded">
              <p className="text-lg">Wins: {props.props.wins}</p>
            </div>
            <div className="mb-2 h-8 w-32 bg-yellow-500 rounded">
              <p className="text-lg">Defeats:{props.props.defeats}</p>
            </div>
          </div>
          <button
            onClick={() => removeHandler(props.props)}
            type="button"
            class="ml-2 absolute bottom-5 left-3/6 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Remove Hamster
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gridimg;
