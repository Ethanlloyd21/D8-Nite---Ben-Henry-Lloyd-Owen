$(document).ready(function() {
  var cityInput;
  var eventDate;

  function events() {
    cityInput = $("#event-city-location")
      .val()
      .trim();
    eventDate = $("#event-date")
      .val()
      .trim();
    var apiFormat = moment(eventDate).add(1, 'days').format("YYYY-MM-DD")

    var queryURL =
      "https://app.ticketmaster.com/discovery/v2/events?apikey=CmSrewheOQ1GgmtfsovcAYtrADjZxAoI&locale=*&startDateTime=" +
      apiFormat +
      "T00:00:00Z&endDateTime=" +
      apiFormat +
      "T23:59:59Z&city=" +
      cityInput;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(queryURL);
      console.log(response);
      console.log(response._embedded.events.length);

      var eventData = $(".eventsInfo");
      eventData.empty();

      for (var x = 0; x < response._embedded.events.length; ++x) {
        var eventListcard = $("<div>");
        var eventListcardbox = $("<div>");
        var eventName = $("<h4>");
        var eventImg = $("<img>");
        var eventTime = $("<h5>");
        var eventInfo = $("<h6>");
        var eventPicker = $("<button>");
        var spacing = $("<hr>");
        var eventlocalTime = moment(response._embedded.events[x].dates.start.localTime, 'HH:mm').format('hh:mm a');;

        eventName.text(response._embedded.events[x].name);
        eventImg.attr("src", response._embedded.events[x].images[0].url);
        eventImg.attr("style", "height: 140px; width: 140px;");
        eventTime.text(eventlocalTime);
        // eventInfo.text(response._embedded.events[x].info);
        eventPicker.text("Pick Event");

        eventListcardbox.append(
          eventName,
          eventImg,
          eventTime,
          eventInfo,
          eventPicker,
          spacing
        );
        eventListcard.append(eventListcardbox);
        eventData.append(eventListcard);
      }
    });
  }

  $("#event-search").on("click", function() {
    events();
  });

  // cityInputEnterBtn.addEventListener("keyup", function(event) {
  //   if (event.keyCode === 13) {
  //     event.preventDefault();
  //     events();
  //   }
  // });
});
