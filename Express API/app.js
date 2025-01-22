const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'Hello from the server', app: 'Natours' });
// });

// app.post('/', (req, res) => {
//   res.send('you can post to this endpoint...');
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
);

app.get('/api/v1/tours', (req, res) => {
  res
    .status(200)
    .json({ status: 'success', results: tours.length, data: { tours } });
});

app.get('/api/v1/tours/:id', (req, res) => {
  const id = +req.params.id;

  if (id >= tours.length) {
    return res.status(404).json({ status: 'failed', message: 'invalid ID' });
  }
  const tour = tours.find((tour) => tour.id === id);
  res.status(200).json({ status: 'success', data: { tour } });
});

app.patch('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((tour) => tour.id === id);
  if (!tour) {
    return res
      .status(400)
      .json({ status: 'failed', message: 'failed to update' });
  }

  res.status(200).json({ status: 'success', message: 'updated successfully' });
});

app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = { ...req.body, id: newId };

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}...`);
});
