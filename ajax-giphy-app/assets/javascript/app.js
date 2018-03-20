//constant  - can't use const because const doesn't work prior to IE 11 ; :-(
var giphyApiKey = "EH8ZXxBQVql80tOi9F65DupbUqoYfjsF";


// listen for click on the Topic Search button
$("#find-topic").on("click", function (event) {
    // Preventing the submit button from trying to submit the form
    // We're optionally using a form so the user may hit Enter to search instead of clicking the button
    // event.preventDefault();

    //get the val inputed into the search box. id set by the line
    // <input type="text" id="topic-input">
    var movie = $("#topic-input").val();
    console.log($("#topic-input").val());

    var topic = $(this).attr("topic-input");
    console.log($(this).attr("topic-input"));



    // Here we grab the text from the input box
    var movie = $("#topic-input").val();

    // proper form from the giphy api generator page - https://developers.giphy.com/explorer
    //  https://api.giphy.com/v1/gifs/search?api_key=EH8ZXxBQVql80tOi9F65DupbUqoYfjsF&q=&limit=25&offset=0&rating=G&lang=en

    // Built by LucyBot. www.lucybot.com at the NYT api help website
    var queryURL = "api.giphy.com/v1/gifs/search";
    url += '?' + $.param({
        'api_key': "401da1dce8334c7e982255ae1c1b3d56",
        'q': topic,
        'limit': "10",

    });

    console.log(queryURL);
    // Write code between the dashes below to hit the queryURL with $ajax, then take the response data
    // and display it in the div with an id of movie-view

    // YOUR CODE GOES IN THESE DASHES. DO NOT MANUALLY EDIT THE HTML ABOVE

    // =================================================================

    // CODE GOES HERE

    // var newButton = $("<button data-topic='topic-btn'" + "'>" + movieName + "</button>")
    // $('#movie-view').append(newButton);
    // var textValue = $('#textbox').val();

});


$("button").on("click", function () {
    var animal = $(this).attr("data-topic");

    // ========================

    var results = response.data;

    for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div>");

        // var gifDiv = $("#gifs-appear-here");
        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var topicImage = $("<img>");
        topicImage.attr("src", results[i].images.fixed_height.url);

        gifDiv.prepend(p);
        gifDiv.prepend(topicImage);

        $("#gif-content").prepend(gifDiv);
    }

});



$("#movie-view").on("click", function (event) {
    console.log("inside btn click handler");
    // Preventing the submit button from trying to submit the form
    // We're optionally using a form so the user may hit Enter to search instead of clicking the button
    event.preventDefault();

    // Here we grab the text from the input box
    var movie = $(this).val();
    console.log(movie);

    var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (getButtonMovie) {
        console.log(getButtonMovie)
        var moviePoster = getButtonMovie.Poster


        var newDiv = $("<div>")
        newDiv.append("<p>" + getButtonMovie.Title + "</p>")
        newDiv.append("<p>" + getButtonMovie.Rated + "</p>")
        newDiv.append("<p>" + getButtonMovie.Released + "</p>")
        newDiv.append("<p>" + getButtonMovie.Runtime + "</p>")
        newDiv.append('<img src="' + moviePoster + ' ">');
        $("#addNewMovie").prepend(newDiv)

    });





})
