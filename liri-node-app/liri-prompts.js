
//dotenv npm package
var dotEnv = require("dotenv").config();

//twitter npm package API
var Twitter = require("twitter");

//spotify npm package API
var Spotify = require("node-spotify-api");

//Use this for writing/appending to files
var fs = require("fs");

//load this for OMDb API
var request = require("request");

// Load the NPM Package inquirer
var inquirer = require("inquirer");

var keys = require("./keys.js");

var spotifyClient = new Spotify(keys.spotify);
var twitterClient = new Twitter(keys.twitter);

// // Set up your search parameters
// var params = {
//     q: '#nodejs',
//     count: 10,
//     result_type: 'recent',
//     lang: 'en'
//   }

// var params = { screen_name: 'nodejs' };
// twitterClient.get('statuses/user_timeline', params, function (error, tweets, response) {
//     if (!error) {
//         console.log(tweets);
//     }
// });

//default movie name to Mr. Nobody
var movieName = "Mr. Nobody";

//default song name to The Sign
// var songName = "Cliffs of Dover";
var songName = "The Sign Ace of Base"



// Remember to be creative!
// ========================================================================


// Create a "Prompt" with a series of questions.
inquirer
    .prompt([
        // Here we give the user a list to choose from.
        {
            type: "list",
            message: "Which season do you like most?",
            choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"],
            name: "liri_assignment_arg"
        },

        // Here we ask the user to confirm.
        {
            type: "confirm",
            message: "Are you sure:",
            name: "confirm",
            //   default: false
        }
    ])
    .then(function (userInput) {
        // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
        if (userInput.liri_assignment_arg) {
            liriOperation = userInput.liri_assignment_arg;
            console.log("user input: " + userInput.liri_assignment_arg);
        }
        else {
            console.log("\nThat's okay " + userInput.username + ", come again when you are more sure.\n");
        }

        //swith on what type of search to do
        switch (liriOperation) {
            case "my-tweets":
                twitterSearch();
                break;

            //spotify search
            case "spotify-this-song":
                inquirer
                    .prompt([
                        // Here we give the user a list to choose from.
                        {
                            type: "input",
                            message: "What song do you want to search for?",
                            name: "songName"
                        },
                    ])
                    .then(function (userInput) {
                        // If the song name is present
                        if (userInput.songName) {
                            process.argv[3] = userInput.songName;
                            console.log("inquirer user input: " + userInput.songName);
                        }
                        else {
                            console.log("\nPlease try again.\n");
                        }
                        spotifySearch();
                    })
                break;

            //omdb search
            case "movie-this":
                inquirer
                    .prompt([
                        // Here we give the user a list to choose from.
                        {
                            type: "input",
                            message: "What movie do you want to search for?",
                            name: "movieName"
                        },
                    ])
                    .then(function (userInput) {
                        // If the movie name is present
                        if (userInput.movieName) {
                            process.argv[3] = userInput.movieName;
                            console.log("inquirer user input: " + userInput.movieName);
                        }
                        else {
                            console.log("\nPlease try again.\n");
                        }
                        omdbSearch();
                    })
                break;

            case "do-what-it-says":
                doWhatItSaysSearch();
                break;

            default:
                console.log("Error in format of random.txt file.  (command[, string1 [string2 ...]])");

        }

    });


//twitter Search function
function twitterSearch() {
    console.log("in twitter search");


    // Set up your search parameters
    var params = {
        // screen_name: 'GopherFootball',
        // q: 'mg_bootcamp',
        screen_name: 'mg_bootcamp',
        count: 20,
        result_type: 'recent',
        lang: 'en'
    }

    console.log(" this is a shortcut");
    // twitterClient.get('statuses/user_timeline', params, function (error, tweets, response) {

    twitterClient.get('statuses/user_timeline', params, function (error, tweets, response) {

        //if no error returned from Twitter get
        if (!error) {
            console.log("in the get from twitter");

            var twitterOutput = "#########################################\n";
            twitterOutput += "###### This is a my-tweets request ######\n";
            twitterOutput += "#########################################\n";

            for (i = 0; i < tweets.length; i++) {

                console.log("---------------- Tweet #" + i + " ------------------------");
                twitterOutput += ("---------------- Tweet #" + i + " ------------------------\n");
                //* Username 
                console.log("Twitter username: @" + tweets[i].user.screen_name);
                twitterOutput += ("Twitter username: @" + tweets[i].user.screen_name + "\n");

                //handle undefined URL possiblility
                if (tweets[i].entities.urls.length != 0) {
                    // Tweet URL
                    console.log("Tweet URL: " + tweets[i].entities.urls[0].url);
                    twitterOutput += ("Tweet URL: " + tweets[i].entities.urls[0].url + "\n");
                }
                else if (tweets[i].retweeted == true) {
                    if (tweets[i].retweeted_status.entities.urls.length != 0) {
                        // Tweet URL
                        console.log("Tweet URL: " + tweets[i].retweeted_status.entities.urls[0].url);
                        twitterOutput += ("Tweet URL: " + tweets[i].retweeted_status.entities.urls[0].url + "\n");
                    }
                }

                // tweets[i].retweeted_status.entities.urls[0].length != 0 &&
                // ["0"].entities.urls["0"].url
                // [1].retweeted_status.entities.urls["0"].url
                // [1].retweeted_status.user.entities.url.urls["0"].url

                // [1].retweeted_status.entities.urls["0"].url
                // ["0"].retweeted_status.entities.urls["0"].url
                // ["0"].entities.urls["0"].url

                //* Tweet Content
                console.log("Tweet Content>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
                twitterOutput += ("Tweet Content>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n");
                console.log(tweets[i].text);
                twitterOutput += (tweets[i].text + "\n");
                console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
                twitterOutput += ("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\n");
                console.log("--------------------------------------------------");
                twitterOutput += ("--------------------------------------------------\n");
            }

            console.log(tweets);

            debugger;

            //append all console.log output not used for debugging to the output file
            fs.appendFile("log-command-line-menu.txt", twitterOutput, function (err) {

                // If an error was experienced we say it.
                if (err) {
                    console.log(err);
                }
                // If no error is experienced, we'll log the phrase "Content Added" to our node console.
                else {
                    console.log("Content Added!");
                }

            });

            // these didn't work------
            // console.log(response);
            // console.log(JSON.parse(response));
            // console.log(tweets.screen_name)
            // console.log(tweets));
            // -----------------

            // Dump raw formatted twitter API response to file
            fs.writeFile("twitter_output.json", JSON.stringify(tweets, null, 4), function (err) {

                // If the code experiences any errors it will log the error to the console.
                if (err) {
                    return console.log(err);
                }

                // Otherwise, it will print: "movies.txt was updated!"
                console.log("twitter_output.json was updated!");

            });

        }
    });

}

//spotify search function
function spotifySearch() {

    console.log(process.argv[3]);

    //checks if there is a song title given by the user
    if (process.argv[3] != undefined) {

        console.log("inside if spotify statement");

        //init songName to over write 'The Sign' because their is a user passed argument
        songName = "";

        //loop through the arg array until there aren't any more arguments
        for (i = 3; process.argv[i] != undefined; i++) {
            console.log("inside for loop in spotify");

            //add each arg to the movieName var to use in the QueryURL
            songName = songName + "+" + process.argv[i];

            console.log(songName);
        }
    }

    var spotifySearchParms = {
        type: "track",
        query: songName,
        limit: "1"
    };

    spotifyClient.search(spotifySearchParms, function (err, returnedSpotifyApiQueryData) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(returnedSpotifyApiQueryData);

        // console.log(JSON.parse(returnedSpotifyApiQueryData));
        console.log("in the get from spotify");
        var spotifyOutput = "#########################################\n";
        spotifyOutput += "## This is a spotify-this-song request ##\n";
        spotifyOutput += "#### spotify-this-song " + songName + " ###\n";
        spotifyOutput += "#########################################\n";

        // Output content 
        // Artist(s)
        // The song's name
        // A preview link of the song from Spotify
        // The album that the song is from
        console.log(returnedSpotifyApiQueryData.tracks.items.length);
        for (i = 0; i < returnedSpotifyApiQueryData.tracks.items.length; i++) {

            console.log("---------------- Spotify Result #" + i + " ------------------------------");
            spotifyOutput += ("---------------- Spotify Result #" + i + " ------------------------------\n");
            //* Artist Name 
            console.log("Artist Name: " + returnedSpotifyApiQueryData.tracks.items[i].album.artists[0].name);
            spotifyOutput += ("Artist Name: " + returnedSpotifyApiQueryData.tracks.items[i].album.artists[0].name + "\n");
            // Song Name 
            console.log("Song Name: " + returnedSpotifyApiQueryData.tracks.items[i].name);
            spotifyOutput += ("Song Name: " + returnedSpotifyApiQueryData.tracks.items[i].name + "\n");
            // Song URL
            console.log("Song Link: " + returnedSpotifyApiQueryData.tracks.items[i].external_urls.spotify);
            spotifyOutput += ("Song Link: " + returnedSpotifyApiQueryData.tracks.items[i].external_urls.spotify + "\n");

            //check to see if the song preview link exists
            if (returnedSpotifyApiQueryData.tracks.items[i].preview_url != null) {
                // Song Preview URL
                console.log("Song Preview Link: " + returnedSpotifyApiQueryData.tracks.items[i].preview_url);
                spotifyOutput += ("Song Preview Link: " + returnedSpotifyApiQueryData.tracks.items[i].preview_url + "\n");
            }

            // Album Name 
            console.log("Album Name: " + returnedSpotifyApiQueryData.tracks.items[i].album.name);
            spotifyOutput += ("Album Name: " + returnedSpotifyApiQueryData.tracks.items[i].album.name + "\n");
            // Album URL
            console.log("Album Link: " + returnedSpotifyApiQueryData.tracks.items[i].album.external_urls.spotify);
            spotifyOutput += ("Album Link: " + returnedSpotifyApiQueryData.tracks.items[i].album.external_urls.spotify + "\n");

            console.log("-----------------------------------------------------------------");
            spotifyOutput += ("-------------------------------------------------------------------\n");
        }

        //append all console.log output not used for debugging to the output file
        fs.appendFile("log-command-line-menu.txt", spotifyOutput, function (err) {

            // If an error was experienced we say it.
            if (err) {
                console.log(err);
            }
            // If no error is experienced, we'll log the phrase "Content Added" to our node console.
            else {
                console.log("Content Added!");
            }

        });

        //output full spotify output to file
        fs.writeFile("spotify_output.json", JSON.stringify(returnedSpotifyApiQueryData, null, 4), function (err) {

            // If the code experiences any errors it will log the error to the console.
            if (err) {
                return console.log(err);
            }

            // Otherwise, it will print: "movies.txt was updated!"
            console.log("spotify_output.json was updated!");

        });

    });

    console.log("in spotify search");

}

//omdb search function
function omdbSearch() {

    console.log(process.argv[3]);

    //checks if there is a movie title given by the user
    if (process.argv[3] != undefined) {

        console.log("inside if statement");

        //init movieName to over write Mr. Nobody because their is a user passed argument
        movieName = "";

        //loop through the arg array until there aren't any more arguments
        for (i = 3; process.argv[i] != undefined; i++) {
            console.log("inside for loop");

            //add each arg to the movieName var to use in the QueryURL
            movieName = movieName + "+" + process.argv[i];

            console.log(movieName);
        }
    }

    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    //this line is just to help us debug against the actual URL
    console.log(queryUrl);

    // Then create a request to the queryUrl
    // ...
    request(queryUrl, function (error, response, body) {

        console.log(response.statusCode);

        // If the request was successful...
        if (!error && response.statusCode === 200) {

            // Then log the body from the site!
            console.log(body);

            // * Title of the movie.
            // * Year the movie came out.
            // * IMDB Rating of the movie.
            // * Rotten Tomatoes Rating of the movie.
            // * Country where the movie was produced.
            // * Language of the movie.
            // * Plot of the movie.
            // * Actors in the movie.

            var omdbOutput = "#########################################\n";
            omdbOutput += "###### This is a movie-this request #####\n";
            omdbOutput += "####### movie-this " + movieName + " #######\n";
            omdbOutput += "#########################################\n";

            console.log("* Title of the movie");
            omdbOutput += ("* Title of the movie\n");
            console.log(JSON.parse(body).Title);
            omdbOutput += (JSON.parse(body).Title + "\n");
            console.log("* Year the movie was filmed");
            omdbOutput += ("* Year the movie was filmed\n");
            console.log(JSON.parse(body).Year);
            omdbOutput += (JSON.parse(body).Year + "\n");

            if (JSON.parse(body).Ratings[0].Value != undefined) {
                console.log("* IMDB Rating of the movie.");
                omdbOutput += ("* IMDB Rating of the movie.\n");
                console.log(JSON.parse(body).Ratings[0].Source + " - " + JSON.parse(body).Ratings[0].Value);
                omdbOutput += (JSON.parse(body).Ratings[0].Source + " - " + JSON.parse(body).Ratings[0].Value + "\n");

            }

            if (JSON.parse(body).Ratings[1] != undefined) {
                console.log("* Rotten Tomatoes Rating of the movie.");
                omdbOutput += ("* Rotten Tomatoes Rating of the movie.\n");
                console.log(JSON.parse(body).Ratings[1].Source + " - " + JSON.parse(body).Ratings[1].Value);
                omdbOutput += (JSON.parse(body).Ratings[1].Source + " - " + JSON.parse(body).Ratings[1].Value + "\n");

            }

            console.log("* Country where the movie was produced.");
            omdbOutput += ("* Country where the movie was produced.\n");

            console.log(JSON.parse(body).Country);
            omdbOutput += (JSON.parse(body).Country + "\n");

            console.log("* Language of the movie.");
            omdbOutput += ("* Language of the movie\n");

            console.log(JSON.parse(body).Language);
            omdbOutput += (JSON.parse(body).Language + "\n");

            console.log("* Plot of the movie.");
            omdbOutput += ("* Plot of the movie.\n");

            console.log(JSON.parse(body).Plot);
            omdbOutput += (JSON.parse(body).Plot + "\n");

            console.log("* Actors in the movie.");
            omdbOutput += ("* Actors in the movie.\n");
            console.log(JSON.parse(body).Actors);
            omdbOutput += (JSON.parse(body).Actors + "\n");

            console.log("--------------------------------------------------");
            omdbOutput += ("--------------------------------------------------\n");

            // if (JSON.parse(body).Ratings[2].Value != undefined) {
            //     console.log(JSON.parse(body).Ratings[2].Source);
            //     console.log(JSON.parse(body).Ratings[2].Value);
            // }

            fs.appendFile("log-command-line-menu.txt", omdbOutput, function (err) {

                // If an error was experienced we say it.
                if (err) {
                    console.log(err);
                }
                // If no error is experienced, we'll log the phrase "Content Added" to our node console.
                else {
                    console.log("Content Added!");
                }

            });

            //output full omdb output to file - have to JSON parse the object then JSON Stringify to make it readable
            fs.writeFile("omdb_output.json", JSON.stringify(JSON.parse(body), null, 4), function (err) {

                // If the code experiences any errors it will log the error to the console.
                if (err) {
                    return console.log(err);
                }

                // Otherwise, it will print: "movies.txt was updated!"
                console.log("omdb_output.json was updated!");

            });


        }
        else {
            console.log("There was an error on OMDB lookup. Error response: " + error);
        };

    });

};

//do what it says search function
function doWhatItSaysSearch() {

    var dwitsOutput = "*****************************************\n";
    dwitsOutput += "* The following API query was started by*\n";
    dwitsOutput += "****** is a do-what-it-says request *****\n";
    dwitsOutput += "*****************************************\n";

    fs.appendFile("log.txt", dwitsOutput, function (err) {

        // If an error was experienced we say it.
        if (err) {
            console.log(err);
        }
        // If no error is experienced, we'll log the phrase "Content Added" to our node console.
        else {
            console.log("Content Added!");
        }

    });

    console.log("in dwis search");
    //read command from random.txt
    //format is the type of search to run , "string"
    fs.readFile("random.txt", "utf8", function (thisIsAnErrorVar, fileData) {

        // If the code experiences any errors it will log the error to the console.
        if (thisIsAnErrorVar) {
            return console.log(thisIsAnErrorVar);
        }

        // We will then print the contents of data
        console.log(fileData);

        // Then split it by commas (to make it more readable)
        var fileDataArr = fileData.split(",");

        // We will then re-display the content as an array for later use.
        console.log(fileDataArr);

        // Store the operation from the parsed file in liri Operation var
        var liriOperation = fileDataArr[0];

        //seed argv with value like user passed it in 
        process.argv[3] = fileDataArr[1];

        //swith on what type of search to do
        switch (liriOperation) {
            //twitter search
            case "my-tweets":
                twitterSearch();
                break;

            //spotify search
            case "spotify-this-song":
                spotifySearch();
                break;

            //omdb search
            case "movie-this":
                omdbSearch();
                break;

            //default case
            default:
                console.log("Error in format of random.txt file.  (command[, string1 [string2 ...]])");

        }
        // var bankAccountTotal = 0;
        // for (i = 0; i < fileDataArr.length; i++) {
        //     bankAccountTotal += parseFloat(dataArr[i]);

        // }

        // console.log(bankAccountTotal.toFixed(2));
    })
}
