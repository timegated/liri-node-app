require("dotenv").config();
//Sets up spotify objects
//Access token?
//Want information from the omdb API when user puts in "movie-this"
//Grab argument (process.argv)
// console.log(`This is ${axios}`)
const keys = require("./keys");
const fs = require('fs')
const Spotify = require('node-spotify-api')

const axios = require('axios')

const Bands = require('bandsintown')

const omdb = keys.OMDB.api_key

const bands = keys.BANDSINTOWN.id







// console.log(omdb)
//Keys for api calls
const spotify = new Spotify(keys.Spotify);

//Enclosing CLI commands in functions
let userCmd = process.argv[2]
let userMedia = process.argv[3]

let concertThis = (artist) => {
    let queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + bands
    axios.get(queryURL).then((response) => {
        for(let i = 0; i < response.data.length; i++) {
            let currentData = response.data[i]
            console.log(currentData.venue.name)
            console.log(currentData.venue.country)
           
        }
    })
}
concertThis('Hot Chip')
let movieThis = (movieName) => {
    let queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey="+ omdb;
    axios.get(queryURL).then((response)=>{
        console.log(response.data.Title)
        console.log(response.data.Year)
    }).catch((err) => {
        console.log('error')
    })
}


let spotifyThis = (songName) => {
    spotify.search({type: 'track', query: songName, limit: 1}, (err, data)=> {
        if(err) {
            console.log('error of some kind')
        }
        for(let i = 0; i < data.tracks.items.length; i++) {
            let getData =  data.tracks.items[i]
            // console.log(getData)
            console.log(getData.artists[0].name)
            console.log(getData.name)
            console.log(getData.album.name)
            console.log(getData.album.release_date)
            console.log(getData.preview_url)
        }
         
        // fs.appendFile("log.txt", songName, (err) => {
        //     if(err){
        //         console.log(err)
        //     }

        // } )
        
    })
}
//'movie-this' next command
//When bot receives movie-this command, executes api call
//Write the Code You wish You had (WCYWYH)
switch(userCmd) {
    case 'spotify-this-song':
        userMedia === undefined ? spotifyThis('Satisfaction') : spotifyThis(userMedia)
        break;
    case 'movie-this':
        userMedia === undefined ? movieThis('Deadwood') : movieThis(userMedia)
        break;
    case 'concert-this':

        break;
    default:
        // console.log('some kind of error')
    
}   
    








