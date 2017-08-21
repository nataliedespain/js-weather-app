$(document).ready(function() {

  setTimeout(function () {
    $('#head').css('visibility', 'visible').addClass('animated bounceInDown');}, 100
  );
  setTimeout(function () {
    $('#search').css('visibility', 'visible').addClass('animated bounceInLeft');}, 200
  );

  $('#city').keyup(function() {
    if ($(this).val().length > 0) {
      $('label').addClass('animated fadeOutUp')
    }
  })

  $('#submit').click(function() {
    $('.pg1').addClass('animated slideOutUp').hide();
    $('.container2').show().addClass('animated slideInUp');

    var location = $('#city').val();
    $.get('https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + location + '")&format=json', function (data) {

      console.log(data.query.results.channel)
      var city = data.query.results.channel.location.city;
      var region = data.query.results.channel.location.region;
      var code = data.query.results.channel.item.condition.code;
      var current = data.query.results.channel.item.condition.temp;
      var condition = data.query.results.channel.item.condition.text;
      var high = data.query.results.channel.item.forecast[0].high;
      var low = data.query.results.channel.item.forecast[0].low;

      $('body').css('background', bgColor(code))

      setTimeout(function () {
        var title = $(`<h1>${city}, ${region}</h1>`);
        $('.city').append(title);
        $('#top-bar').css('visibility', 'visible').addClass('animated bounceInUp');
      }, 200);

      setTimeout(function () {
        var img = $(`<img src="./imgs/${code}.png">`);
        var conditions = $(`<h2>${current}&deg;</h2><h6>${condition}</h6><h6>${high}&deg; / ${low}&deg;</h6>`);
        $('.image').append(img);
        $('.current').append(conditions);
        $('#middle-bar').css('visibility', 'visible').addClass('animated bounceInUp');
      }, 275);

      setTimeout(function () {
        for (var i = 0; i < 6; i++) {
          appendBottom(i, data);
        }
      }, 325);

    });

  })

})


function appendBottom(i, data) {
  setTimeout(function () {
    var day = data.query.results.channel.item.forecast[i+1].day;
    var imgcode = data.query.results.channel.item.forecast[i+1].code;
    var deg = data.query.results.channel.item.forecast[i+1].high;
    $('.bottom').append(`
      <div class="forecast animated slideInRight" id="f-${i}">
        <div class="dayimg">
          <h3>${fullDay(day)}</h3>
          <div class="forecast-img">
            <img src="./imgs/${imgcode}.png">
          </div>
        </div>
        <div class="deg">
          <h4>${deg}&deg;</h4>
        </div>
      </div>
    `)
  }, i * 150);
}

function fullDay(day) {
  if (day === "Wed") {
    return day + "nesday"
  } else if (day === "Sat") {
    return day + "urday"
  } else if (day === "Tue") {
    return day + "sday"
  } else if (day === "Thu") {
    return day + "rsday"
  } else {
    return day + "day"
  }
}

function bgColor(code) {
  if (code === '20' || code === '21' || code === '22' || code === '26' || code === '44') {
    return '#a5c9d2';
  } else if (code === '27' || code === '29') {
    return '#526c7c';
  } else if (code === '28' || code === '30') {
    return '#a5c9d2';
  } else if (code === '0' || code === '2') {
    return '#576973'
  } else if (code === '5' || code === '6' || code === '7' || code === '13' || code === '14' || code === '15' || code === '16' || code === '17' || code === '18' || code === '35' || code === '41' || code === '42' || code === '43' || code === '46') {
    return '#bae7ed';
  } else if (code === '1' || code === '3' || code === '4' || code === '20' || code === '8' || code === '9' || code === '10' || code === '11' || code === '12' || code === '40') {
    return '#69baf5';
  } else if (code === '37' || code === '38' || code === '39' || code === '45' || code === '47') {
    return '#3f3cd0';
  } else if (code === '19' || code === '23' || code === '24') {
    return '#b7afe8'
  } else if (code === '32' || code === '34') {
    return '#f0d78d';
  } else if (code === '31' || code === '33') {
    return '#3c45c7';
  } else if (code === '25') {
    return '#cdd1ff';
  } else {
    return '#e67056';
  }
}
