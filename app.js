//get elements from home page
const inputText = document.querySelector('#inputText')
const body = document.querySelector('#body')

//variables
let selectedMovie = null
let searchKey = ''
// localStorage.clear();

//get local variable
const favourites = JSON.parse(localStorage.getItem('favourites')) ?? [];

//EventListener for the searchInput 
try {
  inputText.addEventListener('keyup', () => {
    if (!inputText.value) {
      body.textContent = 'Enter values'
    } else {
      searchKey = inputText.value;
      
      getAPIRequest(searchKey);
    }
  })
} catch (error) {
  console.log(error);
}

//fetch the input values from the OMDB Api
async function getAPIRequest(searchKey) {
  try {
    
    const response = await fetch(
      `https://www.omdbapi.com/?s=${searchKey}&apikey=a61be408`
    )
    const requstJson = await response.json();
    const searchedmovies = requstJson.Search;

    showMovies(searchedmovies);
  } catch (error) {
    console.log(error)
  }
}

//show all movies
function showMovies(movies) {
    
  body.innerHTML = ''
  if (movies) {
    movies.forEach((movie) => {
      
      // Render card content for each movie
      const card = document.createElement('div')
      card.setAttribute('class', 'card m-2')
      const aTag = document.createElement('a')
      aTag.setAttribute('id', 'aTag')
  
      const image = document.createElement('img')
      image.setAttribute('class', 'card-img-top')
      image.src = movie.Poster
      const cardBody = document.createElement('div')
      cardBody.setAttribute('class', 'card-body')
      const cardTitle = document.createElement('h5')
      cardTitle.setAttribute('class', 'card-title')
      cardTitle.textContent = movie.Title
  
      const favBtn = document.createElement('button')
      favBtn.setAttribute('class', 'button')  
      
      // Resolve state of favourite button by checking if it exists already in favourites
  
      // Attach event listener to favourite button
      favBtn.addEventListener('click', () => {
        // localStorage.clear();
        
        const isFilteredMovie = favourites.filter(
         
          mov => mov.imdbID === movie.imdbID
        );
        console.log({ isFilteredMovie })
        if (isFilteredMovie.length === 0) {
          favourites.push(movie)
          console.log({ favourites })
          localStorage.setItem('favourites', JSON.stringify(favourites))
          favBtn.innerHTML = `<i class="fa-solid fa-heart"></i>`
        } else{
          const filteredList = favourites.filter(mov => mov.imdbID != movie.imdbID)
          localStorage.setItem('favourites', JSON.stringify(filteredList));
          favBtn.innerHTML = `<i class="fa-regular fa-heart"></i>`;
        }
  
      })
  
      getAllFavMovies();
      //get all movies and display fav or not
      function getAllFavMovies() {
        
       console.log(favourites)
        const isFilteredMovie = favourites?.filter(
          mov => mov.imdbID === movie.imdbID

        );
      let isFav = isFilteredMovie.length > 0
      console.log({isFav})

      if (isFav === true) {
        favBtn.innerHTML = `<i class="fa-solid fa-heart"></i>`
      } else if (isFav === false) {
        favBtn.innerHTML = `<i class="fa-regular fa-heart"></i>`
      }
      // isFav = false
      }
      
      // favourites.forEach((val, i) => {
      //   if (favourites[i].imdbID === movie.imdbID) {
      //     isFav = true
      //   }
      // })
      
      //EventListener to the card to movieDetails page
      aTag.addEventListener('click', () => {
        window.location.href = `movie.html?imdbID=${movie.imdbID}`     
      })

      //Append all created elements
      cardBody.appendChild(cardTitle)
      aTag.appendChild(image)
      aTag.appendChild(cardBody)
      card.appendChild(aTag)
      card.appendChild(favBtn)
      body.appendChild(card)
    })

  }
}

getAPIRequest(searchKey)
