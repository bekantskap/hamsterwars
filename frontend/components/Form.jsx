import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const Form = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState(null);
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
    if (!isNaN(age)) {
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
      setNewHamster(newObj);

      addHamsterToDB();
    }
    console.log(newHamster);
  };

  const addHamsterToDB = async () => {
    console.log(newHamster);
    const res = await fetch('http://localhost:4000/api/hamsters', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newHamster),
    });
    const data = await res.json();
    console.log(data);
    // if (data) {
    //   router.reload();
    // }
  };

  return (
    <form>
      <h2>Lägg till en ny hamster</h2>
      <div>
        <label htmlFor="name">Namn</label>
        <input
          type="name"
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
        ></input>
      </div>
      <div>
        <label htmlFor="age">Ålder</label>
        <input
          type="number"
          name="age"
          value={age}
          onChange={e => setAge(e.target.value)}
        ></input>
      </div>
      <div>
        <label htmlFor="food">Favoritmat</label>
        <input
          type="text"
          name="food"
          value={food}
          onChange={e => setFood(e.target.value)}
        ></input>
      </div>
      <div>
        <label htmlFor="loves">Älskar</label>
        <input
          type="text"
          name="loves"
          value={loves}
          onChange={e => setLoves(e.target.value)}
        ></input>
      </div>
      <div>
        <label htmlFor="img">Bild</label>
        <input
          type="text"
          name="img"
          value={img}
          onChange={e => setImg(e.target.value)}
        ></input>
      </div>
      <button type="button" onClick={handleSubmit}>
        Skapa
      </button>
    </form>
  );
};

export default Form;
