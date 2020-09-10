import express from 'express';
import { Genre } from './model/genre.model';
import { genreSchema } from './model/schema/genre.schema';

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

let arrayOfGenres : Genre[] = [
    { id: 1, name: "Horror" },
    { id: 2, name: "Drama" },
    { id: 3, name: "Comedy" }
]
let idCounter = 4

app.get('/api/genres', (req, res) => {
    res.send(arrayOfGenres)
});

app.get('/api/genres/:id', (req, res) => {
    let id : number = parseInt(req.params.id)
    const filteredGenres = arrayOfGenres
            .filter(genre => genre.id === id)
    
    if (filteredGenres.length === 0) {
        res.status(404).send(`Cannot find genre with id ${id}`)
    }

    return res.send(filteredGenres[0]);
});

app.post('/api/genres/', (req, res) => {
    let body = req.body

    let { error } = genreSchema.validate(body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    arrayOfGenres.push({
        id: idCounter++,
        ... body
    })

    res.send(arrayOfGenres[arrayOfGenres.length-1])
});

app.put('/api/genres/:id', (req, res) => {
    let genre = arrayOfGenres.find(genre => genre.id === parseInt(req.params.id))
    if(!genre) {
        res.status(404).send(`Cannot find genre with id ${id}`)
    }

    let { error } = genreSchema.validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    genre.name = req.body.name!

    res.send(genre)
})


app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});