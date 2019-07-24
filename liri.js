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

const moment = require('moment')

const omdb = keys.OMDB.api_key

const bands = keys.BANDSINTOWN.id







// console.log(omdb)
//Keys for api calls
const spotify = new Spotify(keys.Spotify);

//Enclosing CLI commands in functions

let firstCommand = process.argv[2]
let secondCommand = process.argv.slice(3).join(' ')

//Accounting for all possible user inputs

let regex = /^\s*$/

let testForEmpty = regex.test(secondCommand)




//Bands in town API
let concertThis = (artist) => {
    let queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + bands
    axios.get(queryURL).then((response) => {
        for(let i = 0; i < response.data.length; i++) {
            let currentData = response.data[i]
            console.log(JSON.stringify(currentData.venue, null, 2))
            // console.log(`Venue: ${currentData.venue.name}`)
            // console.log(`City: ${currentData.venue.city}, Country: ${currentData.venue.country}`)
            // console.log(`Date: ${moment(currentData.datetime).format('LL')}`)
            
           
        }
    }).catch((error) => {
        console.log(`${error} You have made an error of some kind`)
    })
}

let movieThis = (movieName) => {
    let queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey="+ omdb;
    axios.get(queryURL).then((response)=>{
        // console.log(response)
        console.log(`Title: ${response.data.Title}`)
        console.log(`Release Date: ${response.data.Year}`)
        console.log(`IMDB Rating: ${response.data.imdbRating}`)
        console.log(`Country: ${response.data.Country}`)
        console.log(`Actors: ${response.data.Actors}`)
        console.log(`Plot: ${response.data.Plot}`)
        const rottenTomatoeObj = response.data.Ratings[1]
        const value = Object.values(rottenTomatoeObj)
        console.log(`The score on ${value[0]} is ${value[1]}`)
    }).catch((error) => {
        console.log(`${error} You have made an error of some kind`)
    })
}


let spotifyThis = (songName) => {
    spotify.search({type: 'track', query: songName, limit: 1}, (err, data)=> {
        if(err) {
            console.log('You have made an error of some kind')
        }
        for(let i = 0; i < data.tracks.items.length; i++) {
            let getData =  data.tracks.items[i]
            // console.log(getData)
            console.log(`Artist: ${getData.artists[0].name}`)
            console.log(`Song Name: ${getData.name}`)
            console.log(`Album: ${getData.album.name}`)
            console.log(`Release Date: ${getData.album.release_date}`)
            console.log(`Preview: ${getData.preview_url}`)
        }
         
        
    })
}

let doWhatItSays = () => {
    
}
//'movie-this' next command
// When bot receives movie-this command, executes api call
// Write the Code You wish You had (WCYWYH)
switch(firstCommand) {
    case 'spotify-this-song':
       testForEmpty === true ? spotifyThis('Satisfaction') : spotifyThis(secondCommand)
        break;
    case 'movie-this':
       testForEmpty === true ? movieThis('Mr. Nobody') : movieThis(secondCommand)
        break;
    case 'concert-this':
       testForEmpty === true ? concertThis('Hot Chip') : concertThis(secondCommand)
        break;
    case 'do-what-it-says':
        break;
    default:
       console.log('enter a valid command')
    
}   
    








