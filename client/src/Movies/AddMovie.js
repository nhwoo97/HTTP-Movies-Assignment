import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const initialMovieData = {
    title: "",
    director: "",
    metascore: "",
    stars: [],
}

const AddMovie = props => {
    const [ movieData, setMovieData ] = useState(initialMovieData)
    const history = useHistory()

    const onSubmit = e => {
        e.preventDefault()

        //not ideal but let's give it a go!
        const newMovie = {
            ...movieData,
            id: new Date (),
            stars: [...movieData.stars.split()]
        }

        axios
        .post('http://localhost:5000/api/movies', newMovie)
        .then(res => {
            console.log(res.data)
            props.setMovieList([
                ...props.movieList, newMovie
            ])

            console.log(res.data)
            history.push("/")
        })
    }

    
    const handleChanges = e => {
        setMovieData({
            ...movieData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <section>
            <form onSubmit={onSubmit} className="add-movie-form">
                <label className="form-label">Title:&nbsp;
                    <input 
                    name="title"
                    type="text"
                    value={movieData.title}
                    onChange={handleChanges}                    
                    />
                </label>
                <label className="form-label">Director:&nbsp;
                    <input 
                    name="director"
                    type="text"
                    value={movieData.director}
                    onChange={handleChanges}                      
                    />
                </label>
                <label className="form-label">Metascore:&nbsp;
                    <input 
                    name="metascore"
                    type="text"
                    value={movieData.metascore}
                    onChange={handleChanges}                     
                    />
                </label>
                <label className="form-label">Actors:&nbsp;
                    <input 
                    name="stars"
                    type="text"
                    value={movieData.stars}
                    onChange={handleChanges}                     
                    />
                </label>
                {/* <label className="form-label">Second Actor:&nbsp;
                    <input 
                    name="second-actor"
                    type="text"
                    value={movieData.stars[1]}
                    onChange={handleChanges}                     
                    />
                </label> */}
                <button className="submit">Submit</button>
            </form>
        </section>
    )
}

export default AddMovie