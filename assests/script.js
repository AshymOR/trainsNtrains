var config = {
    apiKey: "AIzaSyDAB5YExKtKVEFLpzsl9Trhv45J8SKKaGE",
    authDomain: "inclassfirebases.firebaseapp.com",
    databaseURL: "https://inclassfirebases.firebaseio.com",
    projectId: "inclassfirebases",
    storageBucket: "inclassfirebases.appspot.com",
    messagingSenderId: "1070120574266"
  };


  firebase.initializeApp(config);

  var database = firebase.database();
  
  
  $("#submitButton").on("click", function(event) {
      event.preventDefault();
  
      var trainName = $("#nameInput").val().trim();
      var destination = $("#destinationInput").val().trim();
      var time = moment($("#timeInput").val().trim(), "HHmm").format("HHmm");
      var frequency = moment($("#frequencyInput").val().trim(), "mm").format("mm");
  
      var newTrain = {
          name: trainName,
          destination: destination,
          time: time,
          frequency: frequency,
        };
  
  database.ref().set(newTrain);
  
 
    console.log("Train Name: " +newTrain.name);
    console.log("Train Destination: " +newTrain.destination);
    console.log("Train Start Time: " +newTrain.time);
    console.log("Train Frequency: " +newTrain.frequency);
  

  $("#nameInput").val("");
  $("#destinationInput").val("");
  $("#timeInput").val("");
  $("#frequencyInput").val("");
  
  })
  
  
  database.ref().on("child_added", function(childSnapshot) {
      console.log(childSnapshot.val());
    
  
      var trainName = childSnapshot.val().name;
      var destination = childSnapshot.val().destination;
      var time = childSnapshot.val().time;
      var frequency = childSnapshot.val().frequency;
  
      var firstTimeConverted = moment(time, "HHmm").subtract(1, "years");
      console.log(firstTimeConverted);
  
      var currentTime = moment();
      console.log("CURRENT TIME: " + moment(currentTime).format("hhmm"));
  
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      console.log("DIFFERENCE IN TIME: " + diffTime);
  
      var tRemainder = diffTime % frequency;
      console.log(tRemainder);
  
 
      var tMinutesTillTrain = frequency - tRemainder;
      console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
  
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(nextTrain),
      $("<td>").text(tMinutesTillTrain),
   
    );
  
    $("#trainTable > tbody").append(newRow);
  
  })
  