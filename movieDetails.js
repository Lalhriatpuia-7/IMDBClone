//elements and variables
const movieBody = document.querySelector('#movieBody');
const urlParams = new URLSearchParams(window.location.search);
const imdbID = urlParams.get('imdbID');

    // console.log(imdbID);
    if (!imdbID) {
        console.error('Invalid movie ID');
        // return;
    }
    //fetch movie and details
try{
    const movieRequest = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=a61be408`);
    const movieRequestJSON = await movieRequest.json();
    // console.log(movieRequestJSON);
    showMovieDetails(movieRequestJSON);
    }
    catch(error){
        console.log(error);
    }
//show details
async function showMovieDetails(movie) {
    
    const movieLocal = localStorage.getItem('selectedMovie');
    // console.log(movie);
    const ratings = movie.Ratings;
    
    console.log(movie);
    //create elements for all the movie details required
    const container = document.createElement('div');
    container.setAttribute('class', 'd-flex flex-row m-2 p-2');
    const image = document.createElement('img');
    image.src = movie.Poster;
    const detailBox = document.createElement('div');
    detailBox.setAttribute('class', 'container-fluid p-2 m-2');
    const title = document.createElement('h5');
    title.setAttribute('class', 'title');
    title.textContent = movie.Title;
    const year = document.createElement('div');
    year.setAttribute('class', 'text-sm-end');
    year.textContent = `Released Year: ${movie.Year}`;
    const rated = document.createElement('div');
    rated.setAttribute('class', 'text-sm');
    rated.textContent = `Rated: ${movie.Rated}`;
    const releasedDate = document.createElement('div');
    releasedDate.setAttribute('class','text-sm-end');
    releasedDate.textContent = `Released: ${movie.Released}`;
    const runTime = document.createElement('div');
    runTime.setAttribute('class','text-sm');
    runTime.textContent = `Runtime: ${movie.Runtime}`;
    const genre = document.createElement('div');
    genre.setAttribute('class','text-sm');
    genre.textContent = `Genre: ${movie.Genre}`;
    const director = document.createElement('div');
    director.setAttribute('class','text-sm');
    director.textContent = `Director: ${movie.Director}`;
    const writer = document.createElement('div');
    writer.setAttribute('class','text-sm');
    writer.textContent = `Writer: ${movie.Writer}`;
    const actors = document.createElement('div');
    actors.setAttribute('class','text-sm');
    actors.textContent = `Actors: ${movie.Actors}`;
    const plot = document.createElement('div');
    plot.setAttribute('class','text-sm');
    plot.textContent = `Plot: ${movie.Plot}`;
    console.log(ratings);
    const ratingsBox = document.createElement('div');
    ratingsBox.setAttribute('class', 'd-flex flex-row justify-content-between p-4');
    ratings.forEach(({Source , Value }) => {
        const rating = document.createElement('div');
        rating.setAttribute('class','text-sm');
        rating.textContent = `${Source} : ${Value}`;
        ratingsBox.appendChild(rating);
    })
    //append all created elements
    detailBox.appendChild(title);
    detailBox.appendChild(year);
    detailBox.appendChild(ratingsBox);
    detailBox.appendChild(rated);
    detailBox.appendChild(releasedDate);
    detailBox.appendChild(runTime);
    detailBox.appendChild(genre);
    detailBox.appendChild(director);
    detailBox.appendChild(writer);
    detailBox.appendChild(actors);
    detailBox.appendChild(plot);
    
    container.appendChild(image);
    container.appendChild(detailBox);
    movieBody.appendChild(container);

}


