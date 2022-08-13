import React from "react";
import {data as moviesList } from '../data';
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import {addMovies, setShowFavourite} from '../actions';
import {connect} from 'react-redux';

class App extends React.Component {
  componentDidMount () {
    this.props.dispatch(addMovies(moviesList));
  }
  isMovieInFavourite = (movie) => {
   const {movies} = this.props;

     const index = movies.favourites.indexOf(movie);
     if(index !== -1)
     {
      return true;
     }
     return false;
  }
  onChangeTab = (val) => {
    this.props.dispatch(setShowFavourite(val))
  }
  render() {
    const {movies,search} = this.props;  // {movies : {} , search : {}}
    console.log('movies', movies);
    const {list,favourites =[],showFavourites =[]} = movies; 
   // console.log('RENDER',this.props);
    const displayMovies = showFavourites ? favourites : list ;

        return (
          <div className="App">  
          <Navbar  search ={search} />
          <div className="main">
            <div className="tabs">
              <div className={`tab ${showFavourites ? '':'active-tabs'}`} 
              onClick={() => this.onChangeTab(false)}
              >
                Movies
             </div>
              <div className={`tab ${showFavourites ? 'active-tabs' : ''}`} onClick={() =>this.onChangeTab(true)}>Favourites</div>
            </div>
            <div className="list">
              {displayMovies.map((movie, index) => (
                <MovieCard 
                 movie={movie} 
                 key={movie.imdbID}
                  dispatch={this.props.dispatch}
                  isFavourite={this.isMovieInFavourite(movie)}
                  />
              ))}
              { displayMovies.length === 0 ? <div className="no-movies"> No movies to display ! </div> : null}
              </div>  
          </div>
        </div>
      );
      }
    }

  // class AppWrapper extends React.Component {
  //   render () {
  //     return (
  //       <storeContext.Consumer>
  //         {(store)=> <App store={store}/>}
  //       </storeContext.Consumer>
  //     );
  //   }
  // }



 function callback(state){
  return {
    movies : state.movies,
    search : state.search
  };
 }
  const connectedAppComponent = connect(callback)(App);
export default connectedAppComponent;
