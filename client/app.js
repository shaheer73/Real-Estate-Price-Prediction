function getBathValue() {
    var uiBathrooms = document.getElementsByName("uiBathrooms");
    for (var i in uiBathrooms) {
        if (uiBathrooms[i].checked) {
            return parseInt(i)+1;
        }
    }
    return -1;
}

function getBedValue() {
    var uiBed = document.getElementsByName("uiBed");
    for (var i in uiBed) {
        if (uiBed[i].checked) {
            return parseInt(i)+1;
        }
    }
    return -1;
}

function onClickedEstimatePrice() {
    console.log("Estimate price button has been clicked");
    var sqft = document.getElementById("uiSqft");
    var bed = getBedValue();
    var bathrooms = getBathValue();
    var location = document.getElementById("uiLocations");
    var estPrice = document.getElementById("uiEstimatedPrice");

    var url = "/api/predict_home_price"

    $.post(url, {
        bed: bed,
        total_sqft: parseFloat(sqft.value),
        bath: bathrooms,
        location: location.value
    },function(data, status){
        console.log(data.estimated_price);
        estPrice.innerHTML = "<h2>$" + data.estimated_price.toString() + "</h2>";
        console.log(status)
    });
}


function onPageLoad() {
    console.log("document loaded");
    var url = "/api/get_location_names"
    $.get(url,function(data, status) {
        console.log("got response for get_location_names request");
        if(data) {
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty();
            for(var i in locations) {
                const capitalized = locations[i].charAt(0).toUpperCase() + locations[i].slice(1)
                var opt = new Option(capitalized);
                $('#uiLocations').append(opt)
            }
        }
    });
}

window.onload = onPageLoad