require("dotenv").config();
//Sets up spotify objects
//Access token?
const Spotify = require('node-spotify-api')
const keys = require("./keys");
const fs = require('fs')

//Keys for api calls
const spotify = new Spotify(keys.Spotify);
//Enclosing CLI commands in functions
let spotifyThis = (songName) => {
    spotify.search({type: 'track', query: songName, limit: 1}, (err, data)=> {
        if(err) {
            console.log('error of some kind')
        }
        for(let i = 0; i < data.tracks.items.length; i++) {
            let getData =  data.tracks.items[i]
            console.log(getData.artists[0].name)
        }
          
        
    })
}
spotifyThis('Satisfaction')
//Setting up user commands
let args = process.argv
// let userCmd = process.argv[2];
// console.log(args)





// let runBot = () => {
//     switch(userCmd) {
//         case 
//         // case "spotify-this-song":
//         //     spotSong(process.argv)
//         //      console.log(spotify.search({type: 'track', query:  , limit: 10}, function(error, data){
//         //         if (error) {
//         //             console.log('Error occurred: ' + error);
//         //           }
                
//         //         console.log(data); 
//         //         }))
//         //         break;
//         default:
//             console.log('enter a valid command')
//     }
// }
// runBot()


