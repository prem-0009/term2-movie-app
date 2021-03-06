import React from "react";
import { useState, useContext } from "react";
import { makeStyles, responsiveFontSizes } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import "./Add.css";

// import Paper from '@material-ui/core/Paper';
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";

import { MoviesContext } from "../context/MoviesContext";

const useStyles = makeStyles((theme) => ({
  root: {
    // display: "flex",
    // margin: "auto",
    // flexWrap: "wrap",
    // justifyContent: "space-around",
  },
  gridList: {
    // width: 500,
    // height:450,
  },
  icon: {
    // color: "white",
    // font: 12px,
  },
}));

export default function BasicTextFields() {
  // console.clear();

  const { addMovies, watched, watchList } = useContext(MoviesContext);

  console.log("watchlist", watchList);

  const classes = useStyles(); //for the grid

  const [foundMovies, setFoundMovies] = useState([]); //to store movies

  let movieInWatchList = watchList.find(
    (item) => item.imdbID === foundMovies.imdbID
  );

  const disableWatchList = movieInWatchList ? true : false;

  console.log(disableWatchList);

  console.log(movieInWatchList);
  // console.log(foundMovies)

  const handleOnChange = (e) => {
    e.preventDefault();
    console.clear();

    const MOVIE_API_KEY = process.env.REACT_APP_MOVIE_API;

    fetch(`http://omdbapi.com/?apikey=${MOVIE_API_KEY}&s=${e.target.value}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.Error) {
          setFoundMovies(data.Search);
        } else {
          setFoundMovies([]);
        }
        console.log(data);
      });
  };

  return (
    <div>
      <form
        // className={classes.root}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="standard-basic"
          label="search here.."
          onChange={handleOnChange}
        />
      </form>

      <div className="display">
        {foundMovies.map((item) => (
          // < key={item.img}>
          <div>
            <img
              src={item.Poster}
              // alt={item.title}
              // style={{ width: "30vw" }}
            />
            <br />
            <button disabled={disableWatchList} onClick={() => addMovies(item)}>
              add to watchlist
            </button>
            {/* <div>{item.Year}</div> */}
          </div>
          // <InfoIcon />
          // </IconButton>

          // />
        ))}
      </div>
    </div>
  );
}
