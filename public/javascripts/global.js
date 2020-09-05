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


