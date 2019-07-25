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

let regex = /^\s*$/

let testForEmpty = regex.test(secondCommand)

//Accounting for all possible user inputs


// console.log(testForEmpty)


//Bands in town API
let concertThis = (artist) => {
    let queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + bands
  
    axios.get(queryURL).then((response) => {
        for(let i = 0; i < 1; i++) {
            let currentData = response.data[i]
            console.log(secondCommand)
            console.log(`Venue: ${currentData.venue.name}`)
            console.log(`City: ${currentData.venue.city}, Country: ${currentData.venue.country}`)
            console.log(`Date: ${moment(currentData.datetime).format('LL')}`)
            let venue = `\nCommand: ${firstCommand},\n Venue: ${currentData.venue.name}, City:${currentData.venue.city}, 
            Country: ${currentData.venue.country}, Date:${currentData.datetime}`
          fs.appendFile("log.txt", venue, (err) => {
              if(err) {
                  return err
              }
          })
           
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


        const movieData = `\nCommand:${firstCommand},\n Title ${response.data.Title}, Release Date ${response.data.Year}, 
        IMDB ${response.data.Country}`

        fs.appendFileSync('log.txt', `\n ${movieData}\n`, (err) => {
            if(err) {
                return err
            }
        })
    }).catch((error) => {
        console.log(`${error} You have made an error of some kind`)
    })
}


let spotifyThis = (songName) => {
    spotify.search({type: 'track', query: songName, limit: 1}, (err, data)=> {
        if(err) {
            console.log('You have made an error of some kind')
        }
        
        
        console.log(data.tracks.items[0].album.images[0].url)
        for(let i = 0; i < data.tracks.items.length; i++) {
            let getData =  data.tracks.items[i]
            
            console.log(`Artist: ${getData.artists[0].name}`)
            console.log(`Song Name: ${getData.name}`)
            console.log(`Album: ${getData.album.name}`)
            console.log(`Release Date: ${getData.album.release_date}`)
            console.log(`Album Cover: ${getData.album.images[0].url}`)
            console.log(`Preview: ${getData.preview_url}`)

            let logSongInfo = `\nCommand: ${firstCommand},\n Artist: ${getData.artists[0].name}, Song Name: ${getData.name}, 
            Album: ${getData.album.name}, Release Date: ${getData.album.release_date}`

            fs.appendFile('log.txt', `\n ${logSongInfo} \n`, (err) => {
                if(err) {
                    return err
                }
            })
            
        }
        
       
       
        
    })
}

let doWhatItSays = () => {
    fs.readFile('random.txt', 'utf8', (err, data) => {
        if(err) {
            console.log(`You've made an error of some kind`)
        }
        
        if(data) {
            let txtArray = data.split(',')
            // console.log(txtArray)
            firstCommand = txtArray[0];
            secondCommand = txtArray[1]
            let doCommands = `\nDo What It Says: ${firstCommand}\n, ${secondCommand}`
            spotifyThis(secondCommand)
            fs.appendFile('log.txt', doCommands, (err) => {
                if(err){
                    return err
                }
            })
        }
    })
}


//'movie-this' next command
// When bot receives movie-this command, executes api call
// Write the Code You wish You had (WCYWYH)
switch(firstCommand) {
    case 'help':
        console.log(`Commands\nspotify-this-song\nmovie-this \nconcert-this\ndo-what-it-says`)
        break;
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
        //Get RickRolled
        doWhatItSays()
        break;
    default:
       console.log('enter a valid command')
    
}   







