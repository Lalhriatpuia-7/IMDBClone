//Elements and variables
const favBody = document.querySelector('#fav-body');
let favMovies;

//get All Favourite movies
function getFavMovies(){
     favMovies = JSON.parse(localStorage.getItem('favourites'));
    
     displayFavMovies();
}

//display all the favourite movies
function displayFavMovies(){    
    favBody.innerHTML = '';
    favMovies.forEach((movie, i) => {
        if(!movie){
            return;
        }
    const card = document.createElement('div');
    card.setAttribute('class', 'card m-2');
    const aTag = document.createElement('a')
    aTag.setAttribute('id', 'aTag');
    
    const image = document.createElement('img');
    image.setAttribute('class', 'card-img-top')
    image.src = movie.Poster;
    const cardBody = document.createElement('div');
    cardBody.setAttribute('class', 'card-body');
    const cardTitle = document.createElement('h5');
    cardTitle.setAttribute('class', 'card-title');
    cardTitle.textContent = movie.Title;
    const favDelBtn = document.createElement('button');
    favDelBtn.setAttribute('class','button');
    favDelBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    //Delete button to remove the movie from favourite list
    favDelBtn.addEventListener('click',()=> {
       const filtered =  favMovies.filter(
            mov => mov.imdbID != movie.imdbID
        );
        console.log(filtered);
        localStorage.setItem('favourites', JSON.stringify(filtered));
        getFavMovies();
    })
    //EventListener to show movie details
    aTag.addEventListener('click', ()=>{
        window.location.href = `movie.html?imdbID=${movie.imdbID}` 
    })
    //append all created elements
    cardBody.appendChild(cardTitle);    
    aTag.appendChild(image);
    aTag.appendChild(cardBody);
    card.appendChild(aTag);
    card.appendChild(favDelBtn);
    favBody.appendChild(card);
})
}
getFavMovies();