import React, { useState } from 'react';
import hamster from '../redux/hamster';
import store from '../redux/store';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import Gridimg from '../components/Gridimg';
import Form from '../components/Form';

const gallery = () => {
  const State = useSelector(state => state.hamster);
  const hamsterState = useSelector(state => state.hamster);
  const matchState = useSelector(state => state.match);

  const [current, setCurrent] = useState(0);
  const length = hamsterState.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };
  const previousSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(hamsterState) || hamsterState.length <= 0) {
    return null;
  }

  return (
    <div className="w-screen h-fit">
      <h1 className="text-5xl font-bold text-center p-4 ">Gallery</h1>
      <main className="w-5/6 m-auto grid sm:grid-cols-2 lg:grid-cols-4">
        {hamsterState.map((hamster, index) => {
          return <Gridimg props={hamster} key={index} />;
        })}
      </main>
      <Form />

      <div id="gallery" className="max-w-[1240px] mx-auto">
        <div className="relative flex justify-center p-4">
          {hamsterState.map((hamster, index) => {
            return (
              <div
                key={index}
                className={
                  index === current
                    ? 'opacity-[1] ease-in duration-1000'
                    : 'opacity-0'
                }
              >
                <FaArrowCircleLeft
                  onClick={previousSlide}
                  className="absolute top-[50%] left-[30px] text-white/70 cursor-pointer select-none z-[2]"
                  size={50}
                />
                {index === current && (
                  <Image
                    src={`/assets/img/${hamster.imgName}`}
                    alt="/"
                    width="1440"
                    height="600"
                    objectFit="cover"
                  />
                )}
                <FaArrowCircleRight
                  onClick={nextSlide}
                  className="absolute top-[50%] right-[30px] text-white/70 cursor-pointer select-none z-[2]"
                  size={50}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default gallery;
