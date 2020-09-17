import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialMovie = {
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: []
};

const UpdateMovie = props => {
    const { id } = useParams();
    const history = useHistory();
    const [ movie, setMovie ] = useState(initialMovie);

    useEffect(() => {
        axios
          .get(`http://localhost:5000/api/movies/${id}`)
          .then((res) => {
              console.log(res)
              setMovie(res.data)
          })
          .catch((err) => console.error(err));
      }, [id]);
    

    const handleChanges = e => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()
        axios
        .put(`http://localhost:5000/api/movies/${id}`, movie)
        .then((res) => {
          props.setMovieList([
              ...props.movieList.map(anyMovie => {
                  if ( anyMovie.id === movie.id) {
                      return movie
                  } else {
                      return anyMovie
                  }
              })
          ])
          setMovie(initialMovie)
          history.push("/");
          console.log(movie)
        })
        .catch((err) => console.error(err.message));
    };  

    return (
        <section>
            <form onSubmit={onSubmit} className="friend-form">
                <label className="form-label">Title:&nbsp;
                    <input 
                    name="title"
                    type="text"
                    value={movie.title}
                    onChange={handleChanges}                
                    />
                </label>
                <label className="form-label">Director:&nbsp;
                    <input 
                    name="director"
                    type="text"
                    value={movie.director}
                    onChange={handleChanges}                   
                    />
                </label>
                <label className="form-label">Metascore:&nbsp;
                    <input 
                    name="metascore"
                    type="text"
                    value={movie.metascore}
                    onChange={handleChanges}                      
                    />
                </label>
                <button className="submit">Submit</button>
            </form>
        </section>
    )
}

export default UpdateMovie