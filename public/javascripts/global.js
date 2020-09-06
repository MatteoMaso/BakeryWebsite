var cakeTypeList = [];

// DOM Ready =============================================================
$(document).ready(function () {

    updateCakeTypeList();
});

function updateCakeTypeList() {
    cakeTypeList = [];

    // jQuery AJAX call for JSON
    $.getJSON('/caketypes', function (data) {
        // Stick our user data array into a userlist variable in the global object
        cakeTypeList = data;  // ok just for few data
    });
};

function checkPrice(currentprice, date) {

    var today = new Date();
    var prevDay = new Date(date);

    var Difference_In_Time = today.getTime() - prevDay.getTime();
    // To calculate the no. of days between two dates 
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    var newPrice;


    if (Difference_In_Days < 1) {
        newPrice = currentprice;
    } else if (Difference_In_Days < 2) {
        newPrice = currentprice * 0.8;
    } else if (Difference_In_Days < 3) {
        newPrice = currentprice * 0.2;
    } else {
        newPrice = -1;
    }

    return newPrice;
};
