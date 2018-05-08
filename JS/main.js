//search -> baseurl + "search/movie?api_key=<search words>"
//recomended  -> baseURL + "movie/" + <movie_id> + "/recommendations?api_key=" + <KEY> + "&language=en-US"


let app ={
    URL: 'https://api.themoviedb.org/3/',
    imgURL:'',
    movie_id:'',
    
    init: function(){
        //focus on the text field
        let input = document.getElementById("search-input");
            input.focus();
            setTimeout(app.addHandler, 1234);
    },
    addHandler: function(){
        //add the click listener
        let btn = document.getElementById("search-button");
            btn.addEventListener('click', app.runSearch);
        document.get
        //add a listener for <ENTER>
        document.addEventListener('keypress', function(ev){
            let char = ev.char || ev.charCode || ev.which,
            str = String.fromCharCode(char);
            console.log(char, str);
            if(str == 10 || str == 13){
                //we have an enter or return key
                btn.dispatchEvent(new MouseEvent('click'));
            }
    });
    },
    
    runSearch: function(ev){
             document.querySelector("#search-results").classList.add('active');
    //do the fetch to get the list of movies
        console.log(ev.type);
        ev.preventDefault();
        let page = ev.total_pages;
    let input = document.getElementById("search-input");
        if (input.value){
        //code will not run if the value is an empty string
           let url = app.URL + "search/movie?api_key=" + KEY + "&query=" + input.value + "&page=" + page;
            //  url = `${app.URL}search/movie?api_key${KEY}&query=${input.value}`; - another short  way to write the code

            fetch(url)
            .then(response=> response.json())
            .then(data=>{
                console.log(data);
                app.showMovies(data);
            })
            .catch(err=>{
                console.log(err);
            })
        }

},
    
     showMovies: function(movies){
        let title = document.querySelector('#search-results .title'),
		 ps = document.createElement('p'),
		 value = document.querySelector('input').value;
         ps.classList.add('title');
        let pst = document.createTextNode('Results for ' + value);
         ps.appendChild(pst);
         title.appendChild(ps);
        let container = document.querySelector('#search-results .content'),
        df=document.createDocumentFragment();
        container.innerHTML = " ";
        df.appendChild(title);
        movies.results.forEach(function(movie){
        	let div = document.createElement('div'),
			img = document.createElement('img'),
			h2 = document.createElement('h2'),
			h2t = document.createTextNode(movie.title),
			p = document.createElement('p'),
		    pt = document.createTextNode(movie.overview);
		
            	div.classList.add('movie');
            	div.addEventListener("click", ()=>app.getRecommended(movie.id) );
            	img.classList.add('poster');
		
            if (movie.poster_path != null){
                img.src = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
            } else{
                img.src = "IMG/312x276-primary-blue.PNG";
            }
            
        
            	h2.classList.add('movie-title');
		    	h2.appendChild(h2t);
            	p.classList.add('movie-desc');
            	p.appendChild(pt);
            	div.appendChild(img);
            	div.appendChild(h2);
            	div.appendChild(p);
            	df.appendChild(div);
    });
        	container.appendChild(df);
         
         let time = 100;
         	container.querySelectorAll(".movie").forEach(movie =>{
            	setTimeout(()=>movie.classList.add("movie_transition"),time+=100);
         });
    
    let backButton = document.getElementById('back-button');
         backButton.classList.remove('back-button');
         backButton.classList.add('show');
         backButton.style.width = "3rem";
         backButton.style.height = "3rem";
         backButton.addEventListener('click', app.backHome);
         
    let searchBar = document.getElementById('search-input');
         searchBar.classList.add('search-input');
         searchBar.style.paddingLeft = "4rem";
},
    
    getRecommended: function(movie_id){
    console.log(movie_id);
       let movieRecommendations = document.getElementById('recommend-results'),
       movie = document.getElementById('search-results');
           movie.classList.remove('active');
        let input = document.getElementById("search-input");
        if (input.value){
            let Url = app.URL + "movie/" + movie_id + "/recommendations?api_key=" + KEY + "&language=en-US&page=1";
            fetch(Url)
            .then(response=> response.json())
            .then(data=>{
                console.log(data);
                app.showRecommended(data);
            })
            .catch(err=>{
                console.log(err);
            })
        }
    },
     backHome: function(){
     	document.querySelector("#search-results").classList.remove("active");
     	document.querySelector("#recommend-results").classList.remove("active");
     	document.querySelector("#search-results").classList.add("homePage");
     	document.querySelector("#recommend-results").classList.add("homePage");
     	document.getElementById("search-input").value = null;
     	window.location.reload(false);
   },
    
    showRecommended: function(movies){
        let title = document.querySelector('#recommend-results .title'),
        ps = document.createElement('p'),
		pst = document.createTextNode('You may also like:'),
		container = document.querySelector('#recommend-results .content'),
		df=document.createDocumentFragment();
        	ps.classList.add('title');
			ps.appendChild(pst);
         	title.appendChild(ps);
         	container.innerHTML = " ";
        	df.appendChild(title);
        if(movies.results.length != 0){
         	movies.results.forEach(function(movie){
                let div = document.createElement('div'),
				img = document.createElement('img'),
				h2 = document.createElement('h2'),
				h2t = document.createTextNode(movie.title),
				p = document.createElement('p'),
				pt = document.createTextNode(movie.release_date),
				rating = document.createElement('p'),
				rating_t = document.createTextNode("Rating: " + movie.vote_average),
				vote = document.createElement('p'),
				vote_t = document.createTextNode("Vote count: " + movie.vote_count);
                    
					div.classList.add('movie');
                    img.classList.add('poster');
                    img.src = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
                    h2.classList.add('movie-title');
                    h2.appendChild(h2t);
                    p.classList.add('movie-desc');
                    p.appendChild(pt);
                    rating.classList.add('movie-desc');
                    rating.appendChild(rating_t);
                    p.classList.add('movie-desc');
                
                    vote.appendChild(vote_t);
                    div.appendChild(img);
                    div.appendChild(h2);
                    div.appendChild(p);
                    div.appendChild(vote);
                    div.appendChild(rating);
                    df.appendChild(div);
            });
        }else{
            let div = document.createElement('div'),
			p = document.createElement('p'),
			pt = document.createTextNode("This movie has no recommendations!");
            div.classList.add('movie');   
            p.classList.add('movie-desc');
            p.appendChild(pt);
            div.appendChild(p);
            df.appendChild(div);
        }
        
        	container.appendChild(df);
        	document.getElementById('recommend-results').classList.add('active');
        
        let trans = 300;
        container.querySelectorAll(".movie").forEach(movie =>{
            setTimeout( ()=>movie.classList.add("movie_transition") , trans += 300);
        });
    },
};

document.addEventListener('DOMContentLoaded', app.init);
//DOMContentLoaded listener
//get image config info with fetch
//autofocus on text field
//click listener on search button
//keypress listener for enter
//
//both click and enter call search function
//do a fetch call to run the search
//handle the results - build a list of movies

//new movie content has click listeners
//click movie to do a fetch for recommended
//with recomended results back
//navigate to recommended page
//build and display the list of movie recommendations
//IIFE means an immediately invoked function e.g (function x(){})()
//eg let result = (function (num){
//return{
//    f: function(){},
//    n: Number
//})(7),
//    result,f()
//}
//}