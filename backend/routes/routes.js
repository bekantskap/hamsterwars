const express = require('express');
const Hamster = require('../models/hamster');
const Match = require('../models/match');
const fs = require('fs');
const router = express.Router();
const jsonData = JSON.parse(fs.readFileSync('./files/hamsters.json', 'utf-8'));

// GET JSON DATA
router.get('/hamstersjson', async (req, res) => {
  try {
    await Hamster.deleteMany();
    await Hamster.create(jsonData);
    console.log('data successfully imported');
  } catch (error) {
    console.log('error', error);
  }
});

// POST
router.post('/hamsters', async (req, res) => {
  const data = new Hamster({
    id: req.body.id,
    name: req.body.name,
    age: req.body.age,
    favFood: req.body.favFood,
    loves: req.body.loves,
    imgName: req.body.imgName,
    wins: req.body.wins,
    defeats: req.body.defeats,
    games: req.body.games,
  });
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET ALL
router.get('/hamsters', async (req, res) => {
  try {
    const data = await Hamster.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET RANDOM
router.get('/hamsters/random', async (req, res) => {
  try {
    const data = await Hamster.find();
    const rng = Math.floor(Math.random() * data.length);
    const randomObj = data[rng];
    res.json(randomObj);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET BY ID
router.get('/hamsters/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Hamster.find({ id: id });
    res.json(data);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

// UPDATE BY ID
router.patch('/hamsters/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const options = { new: true };
    const result = await Hamster.findOneAndUpdate(
      { id: id },
      updateData,
      options
    );
    res.send(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE BY ID
router.delete('/hamsters/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Hamster.findOneAndDelete({ id: id });
    console.log('tryng to delete ' + data.name);
    res.send(`Document with name: ${data.name} has been deleted..`);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// MATCHES

router.get('/matches', async (req, res) => {
  try {
    const data = await Match.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET MATCHES BY ID

router.get('/matches/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Match.find({ id: id });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST MATCH

router.post('/matches', async (req, res) => {
  const data = new Match({
    winnerId: req.body.winnerId,
    loserId: req.body.loserId,
  });
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE MATCH

router.delete('/matches/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Match.findOneAndDelete({ id: id });
    res.send(`Document with ${data.name} has been deleted..`);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/matchwinners/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Match.find({ winnerId: id });
    res.json(data);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.get('/winners', async (req, res) => {
  try {
    const topFive = [];
    const data = await Match.find();
    data.map(d => {
      console.log(d.winnerId);

      const found = topFive.some(el => el.winnerId == d.winnerId);

      let obj = topFive.find(f => f.winnerId == d.winnerId);

      if (obj) {
        obj.wins++;
      } else {
        const newObj = {
          winnerId: d.winnerId,
          wins: 1,
        };
        topFive.push(newObj);
      }
    });
    topFive.sort((a, b) => b.wins - a.wins);
    const slicedArray = topFive.slice(0, 5);
    res.json(slicedArray);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.get('/losers', async (req, res) => {
  try {
    const topFive = [];
    const data = await Match.find();
    data.map(d => {
      let obj = topFive.find(f => f.loserId == d.loserId);

      if (obj) {
        obj.losses++;
      } else {
        const newObj = {
          loserId: d.loserId,
          losses: 1,
        };
        topFive.push(newObj);
      }
    });
    topFive.sort((a, b) => b.losses - a.losses);
    const slicedArray = topFive.slice(0, 5);
    res.json(slicedArray);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.get('/defeated/:hamsterId', async (req, res) => {
  const defeated = [];
  const filteredList = [];
  const id = req.params.hamsterId;
  try {
    const data = await Match.find();
    data.map(d => {
      if (d.winnerId == id) {
        defeated.push(d.loserId);
      }
    });
    res.json(defeated);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.get('/score/:challenger/:defender', async (req, res) => {
  const challengerScores = { challengerWins: 0, defenderWins: 0 };
  const challenger = req.params.challenger;
  const defender = req.params.defender;

  try {
    const data = await Match.find();
    data.map(d => {
      if (d.winnerId == challenger && d.loserId == defender) {
        challengerScores.challengerWins++;
      }
      if (d.winnerId == defender && d.loserId == challenger) {
        challengerScores.defenderWins++;
      }
    });
    res.json(challengerScores);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.get('/fewmatches', async (req, res) => {
  try {
    const data = await Hamster.find();
    data.sort((a, b) => a.games - b.games);
    const slicedArray = data.slice(0, 5);
    res.json(slicedArray);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/manymatches', async (req, res) => {
  try {
    const data = await Hamster.find();
    const sorted = data.sort((a, b) => b.games - a.games);
    console.log(sorted);
    const slicedArray = data.slice(0, 5);
    res.json(slicedArray);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
