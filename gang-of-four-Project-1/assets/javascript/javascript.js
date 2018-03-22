var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://api.wunderground.com/api/33c0d83ac9bce956/forecast/conditions/q/MN\\/St_Paul.json",
    "method": "GET",
    "headers": {
    //     "Cache-Control": "no-cache",
    //     "Postman-Token": "c43e28f9-121e-44a3-8a1d-bb8833978e73"
     }
}

$.ajax(settings).done(function (response) {
    console.log(response);
});