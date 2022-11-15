import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const Form = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [img, setImg] = useState('');
  const [food, setFood] = useState('');
  const [loves, setLoves] = useState('');
  const [formValid, setFormValid] = useState(false);
  const [newHamster, setNewHamster] = useState({});
  const hamsterState = useSelector(state => state.hamster);
  const router = useRouter();

  const handleSubmit = () => {
    const newId = hamsterState.length + 1;
    const regMatch = /^[a-zA-Z]*$/.test(name);
    const newObj = {
      id: newId,
      name: '',
      age: null,
      favFood: '',
      loves: '',
      imgName: '',
      wins: 0,
      defeats: 0,
      games: 0,
    };
    if (name.length >= 2 && regMatch) {
      newObj.name = name;
    } else {
      alert('Namn ska vara längre än 1 bokstav och bara innehålla bokstäver');
    }
    if (!isNaN(age) && age >= 0) {
      newObj.age = age;
    } else {
      alert('Ålder kan bara vara i nummerform');
    }
    if (food.length >= 2) {
      newObj.favFood = food;
    } else {
      alert('Mat ska vara längre än 1 bokstav');
    }
    if (loves.length >= 2) {
      newObj.loves = loves;
    } else {
      alert('Älskar ska vara längre än 1 bokstav');
    }
    if (img.length >= 2) {
      newObj.imgName = img;
    }
    if (
      newObj.name &&
      newObj.age &&
      newObj.loves &&
      newObj.favFood &&
      newObj.imgName
    ) {
      addHamsterToDB(newObj);
    }
    console.log(newHamster);
  };

  const addHamsterToDB = async obj => {
    const res = await fetch('https://hamsterdb.onrender.com/api/hamsters', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj),
    });
    const data = await res.json();
    console.log(data);
    // if (data) {
    //   router.reload();
    // }
  };

  return (
    <section className="mt-10 mb-10 p-6 w-3/6 min-h-fit flex flex-col m-auto border-2 border-black rounded bg-gray-300">
      <h2 className="text-2xl font-bold text-center">
        Lägg till en ny hamster
      </h2>
      <form className="flex flex-col items-center justify-center flex-wrap ">
        <div className="flex justify-evenly w-full">
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="form-label inline-block mb-2 text-gray-700 text-xl"
            >
              Namn
            </label>
            <input
              type="name"
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
            ></input>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="age"
              className="form-label inline-block mb-2 text-gray-700 text-xl"
            >
              Ålder
            </label>
            <input
              type="number"
              name="age"
              className="w-10 mr-10"
              value={age}
              onChange={e => setAge(e.target.value)}
            ></input>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="food"
              className="form-label inline-block mb-2 text-gray-700 text-xl"
            >
              Favoritmat
            </label>
            <input
              type="text"
              name="food"
              value={food}
              onChange={e => setFood(e.target.value)}
            ></input>
          </div>
        </div>
        <div className="flex justify-evenly w-full">
          <div className="flex flex-col">
            <label
              htmlFor="loves"
              className="form-label inline-block mb-2 text-gray-700 text-xl"
            >
              Älskar
            </label>
            <input
              type="text"
              name="loves"
              value={loves}
              onChange={e => setLoves(e.target.value)}
            ></input>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="img"
              className="form-label inline-block mb-2 text-gray-700 text-xl"
            >
              Bild
            </label>
            <input
              type="text"
              name="img"
              value={img}
              onChange={e => setImg(e.target.value)}
            ></input>
          </div>
          <div className="flex items-end">
            <button
              onClick={handleSubmit}
              className="bg-transparent hover:bg-black text-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded"
            >
              Skapa
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Form;
