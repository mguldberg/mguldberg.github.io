$(document).ready(function () {

    /* global moment firebase */

    // Initialize Firebase
    // Make sure to match the configuration to the script version number in the HTML
    // (Ex. 3.0 != 3.7.0)         

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAZ6e2wE87AVoEI_P9cDXUio2ey3iDyw-A",
        authDomain: "fir-week4-homework.firebaseapp.com",
        databaseURL: "https://fir-week4-homework.firebaseio.com",
        projectId: "fir-week4-homework",
        storageBucket: "",
        messagingSenderId: "95169724424"
    };
    firebase.initializeApp(config);

    // Create a variable to reference the database.
    var database = firebase.database();
    
    // Initial Values for DB records
    var trainName = "";
    var trainDestination = "";
    var firstTrainTime = "0";
    var trainFrequency = "30";

    //init variables for countdown timer
    var countDownToNextTrain = 60;
    var percentComplete = 0;

    //Vars used to trigger a DB update so the minutes until the next train will update
    var dummyParmUsedForScreenRefresh = 0;
    var keyForDummyUpdate = "";
    
    //let up references to where the DB records will be set
    var trainScheduleRef = database.ref("/dbTrainRecord");
    var newTrainRef = trainScheduleRef.push();

    //set countdown timer function to run every second
    var countDownTimerId = setInterval(countDownTimerHandler, 1000);

    // ----------------------------------------------------------------
    // At the page load and subsequent value changes, get a snapshot of the local data.
    // This function allows you to update your page in real-time when the values within the firebase node bidderData changes
    // ----------------------------------------------------------------
    database.ref().on("value", function (snapshot) {

        // console.log(childSnapshot.val())
        console.log(snapshot.val())

        //var to point inside the snapshot to our train information
        var trainRecords = snapshot.val().dbTrainRecord;
        console.log(snapshot.val().dbTrainRecord);

        //used for console logging to make sure the loop is incrementing
        var loop = 0;

        //empty the table so we can rerender it with current information
        var tableVar = $("#train-table-body");
        tableVar.empty();

        //loop through all objects in the nsap
        for (key in trainRecords) {
            console.log("in for loop");

            //validate # of records in the DB
            loop++;
            // console.log(loop);
            keyForDummyUpdate = key;
            // console.log(key);
            // console.log(trainRecords[key]);
            console.log(trainRecords[key].trainname);
            console.log(trainRecords[key].traindestination);
            console.log(trainRecords[key].trainfrequency);
            console.log(trainRecords[key].firsttraintime);

            var timeRightNow = moment();
            var trainTimeConv = moment(trainRecords[key].firsttraintime, "HH:mm").subtract(1, "years");

            console.log(trainTimeConv);

            // Difference between the times
            var diffTime = timeRightNow.diff(moment(trainTimeConv), "minutes");
            console.log("DIFFERENCE IN TIME: " + diffTime);

            //find the minutes ago the last train left
            var remainder = diffTime % trainRecords[key].trainfrequency;
            console.log(remainder);

            //find minutes until the next train
            var minUntilNextTrain = trainRecords[key].trainfrequency - remainder;
            console.log("mins until next train: " + minUntilNextTrain);

            //find 
            var nextTrain = timeRightNow.add(minUntilNextTrain, "minutes")
            console.log("new arrival time: " + moment(nextTrain).format("hh:mm"));

            //----------------------------------------------------------------------
            // trainname  /  traindestination  /  trainfrequency  / firsttraintime /
            //----------------------------------------------------------------------
            //

            var tableRow = $("<tr>");
            tableRow.append('<td>' + trainRecords[key].trainname + '</td>');
            tableRow.append("<td>" + trainRecords[key].traindestination + "</td>");
            tableRow.append("<td>" + trainRecords[key].trainfrequency + "</td>");
            tableRow.append("<td>" + moment(nextTrain).format("HH:mm") + "</td>");
            tableRow.append("<td>" + minUntilNextTrain + "</td>");

            tableVar.append(tableRow);

        }
        // console.log(childSnapshot.val().employeeName)

        // If any errors are experienced, log them to console.
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    // --------------------------------------------------------------
    // Whenever a user clicks the submit-bid button
    $("#add-train").on("click", function () {

        // Prevent default behavior
        event.preventDefault();

        // Get the input values
        trainName = $("#choo-choo-name").val().trim();
        trainDestination = $("#where-are-we-going").val().trim();
        firstTrainTime = $("#start-input").val().trim()
        trainFrequency = $("#frequency-input").val().trim();

        var newTrainRef = trainScheduleRef.push();

        // Log to console the Bidder and Price (Even if not the highest)
        newTrainRef.set({
            trainname: trainName,
            traindestination: trainDestination,
            firsttraintime: firstTrainTime,
            trainfrequency: trainFrequency,
            zdummyParmUsedForScreenRefresh: dummyParmUsedForScreenRefresh
        })

    });

    //check if time has expired to answer a question
    function countDownTimerHandler() {
        // write timer change to the screen - added so 25 will display on the countdown
        $("#countdown-time").text(countDownToNextTrain);
        $("#percent-progress-until-next-train").attr("style", "width:" + percentComplete + "%");

        countDownToNextTrain--; // deduct 1 second
        // console.log(countDownToNextTrain);

        //Leverage countdown to set the % complete progress bar (Bootstrap)
        //percent is counting up vs countDownToNextTrain is counting down
        // the 100/60 is the % to increment each second of the countdown then write it to the HTML progress bar
        percentComplete = (100 / 60) * (60 - countDownToNextTrain);
        // console.log("increment: " + (100 / 60) * (60 - countDownToNextTrain));
        // console.log("%:" + percentComplete);
        // console.log("should count from 0 to 100: " + (100 / 60) * (60 - countDownToNextTrain));
        $("#percent-progress-until-next-train").attr("style", "width:" + percentComplete + "%");

        // write timer change to the screen
        $("#countdown-time").text(countDownToNextTrain);

        //is timer at 0?
        //  if yes - reset the timer
        if (countDownToNextTrain == 0) {
            console.log("inside timer = 0");

            //reset timer to 60 seconds
            countDownToNextTrain = 60;
            percentComplete = 0;


            //Write a dummy update to the DB to trigger a value event to redraw the table and thereby update the 
            //the arrival times of the next train
            //https://firebase.google.com/docs/database/web/read-and-write

            // var newTrainRef = trainScheduleRef;

            //key is set up above from last loop through the DB on a redraw
            console.log(keyForDummyUpdate);

            //force a delta in the DB
            dummyParmUsedForScreenRefresh++;

            var updates = {};
            updates['/dbTrainRecord/' + keyForDummyUpdate + '/dummyParmUsedForScreenRefresh'] = dummyParmUsedForScreenRefresh;
            database.ref().update(updates);


        };
    };

})