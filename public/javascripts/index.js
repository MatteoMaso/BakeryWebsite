var productListData = [];
var cakeTypeList = [];

// DOM Ready =============================================================
$(document).ready(function () {

    populateProductTable();

    // New cake button click
    $('#productList table tbody').on('click', 'td a.linkshowproduct', showIngridient);

    document.getElementById("productInfo").style.display = "none";

});

// Functions =============================================================

function showIngridient(event) {
    document.getElementById("productInfo").style.display = "block";
    
    // Empty content string
    var tableContent = '';
    var id = $(this).attr('rel');
    
    var cakeInfo = cakeTypeList.find(x => x._id === id);

    var obj = JSON.parse(cakeInfo.ingridients); 

    $('#productInfoName').text(cakeInfo.name);

    $.each(obj, function () {
        tableContent += '<tr>';
        tableContent += '<td>' + this.name + '</td>';
        tableContent += '<td>' + this.amount + '</td>';
        tableContent += '</tr>';
    });

    $('#productIngredientList table tbody').html(tableContent);

};

function clenProductInfo() {
    document.getElementById("productInfo").style.display = "none";
};

// Fill table with data
function populateProductTable() {
    
    var tableContent = '';

    $.getJSON('/productlist', function (data) {
        productListData = data;  
        $.each(data, function () {
            if (this.amount > 0) {
                var d = new Date(this.data);
                var name = cakeTypeList.find(x => x._id === this.type).name;
                tableContent += '<tr>';
                tableContent += '<td><a onmouseout="clenProductInfo()"  class="linkshowproduct" rel="' + this.type + '">' + name + '</a></td>';
                tableContent += '<td>' + checkPrice(this.price) + '</td>';
                tableContent += '<td>' + this.amount + '</td>';
                tableContent += '</tr>';
            }
        });

        // Inject the whole content string into our existing HTML table
        $('#productList table tbody').html(tableContent);
    });
};

function checkPrice(currentprice) {
    // todo check the time passed and return the discount
    return currentprice;
};
