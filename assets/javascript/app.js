$(document).ready(function() {

    var config = {
        apiKey: "AIzaSyANKt-dWhLKKKY1M7t2SLY_hrTJYjLAozw",
        authDomain: "train-scheduler-22129.firebaseapp.com",
        databaseURL: "https://train-scheduler-22129.firebaseio.com",
        projectId: "train-scheduler-22129",
        storageBucket: "train-scheduler-22129.appspot.com",
        messagingSenderId: "122416697228"
    };

    firebase.initializeApp(config);
  
    var database = firebase.database();

    var name = "";
    var destination = "";
    var timeInput = "";
    var frequency = "";

    $("#addTrainBtn").on("click", function() {
        event.preventDefault();

        name = $("#trainNameInput").val().trim();
        destination = $("#destinationInput").val().trim();
        timeInput = moment($("#trainTimeInput").val().trim(), "HH:mm").subtract(10, "years").format("X");;
        frequency = $("#frequencyInput").val().trim();

        console.log(name);
        console.log(destination);
        console.log(timeInput);
        console.log(frequency);
    });

    database.ref().on("child_added", function(snapshot) {

        console.log(snapshot.val());

        var trainName = snapshot.val().name;
        var trainDestination = snapshot.val().destination;
        var trainTime = snapshot.val().trainTime;
        var trainFrequency = snapshot.val().frequency;
        var difference = moment().diff(moment.unix(trainTime), "minutes");
        var remaining = moment().diff(moment.unix(firstTrain), "minutes") % trainFrequency;
        var minutes = trainFrequency - remaining;

        var arrival = moment().add(minutes, "m").format("hh:mm A");

        console.log(minutes);
        console.log(arrival);
        console.log(moment().format("hh:mm A"));
        console.log(arrival);
        console.log(moment().format("X"));

        var userInput = $('<tr>');
       
        userInput.append('<td>' + trainName + '</td>');
        userInput.append('<td>' + trainDestination + '</td>');
        userInput.append('<td>' + trainFrequency + " minutes" + '</td>');
        userInput.append('<td>' + arrival + '</td>');
        userInput.append('<td>' + minutes + '</td>');

        $(".table").append(userInput);
    });
});

