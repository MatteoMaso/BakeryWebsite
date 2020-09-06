var productListData = [];
var cakeTypeList = [];

// DOM Ready =============================================================
$(document).ready(function () {

    populateProductTable();

    // New cake button click
    $('#productList table tbody').on('click', 'td a.linkshowproduct', showIngridient);

    $('#btnAdminView').on('click', goToAdminArea);

    document.getElementById("productInfo").style.display = "none";
});

// Functions =============================================================

function goToAdminArea() {
    // Simulate an HTTP redirect:
    window.location.replace("http://localhost:3000/admin");
};

function showIngridient(event) {
    document.getElementById("productInfo").style.display = "block";
    
    // Empty content string
    var tableContentInfo = '';
    var id = $(this).attr('rel');
    
    var cakeInfo = cakeTypeList.find(x => x._id === id);
    
    var obj = JSON.parse(cakeInfo.ingridients); 
    
    $('#productInfoName').text(cakeInfo.name);

    $.each(obj, function () {
        tableContentInfo += '<tr>';
        tableContentInfo += '<td>' + this.name + '</td>';
        tableContentInfo += '<td>' + this.amount + '</td>';
        tableContentInfo += '</tr>';
    });

    $('#productInfoIngredientList table tbody').html(tableContentInfo);
    
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
            var old = checkPrice(this.price, this.date) > -1 ? false : true;

            if (this.amount > 0 && !old) {
                var d = new Date(this.data);
                var name = cakeTypeList.find(x => x._id === this.type).name;
                tableContent += '<tr>';
                tableContent += '<td><a onmouseout="clenProductInfo()"  class="linkshowproduct" rel="' + this.type + '">' + name + '</a></td>';
                tableContent += '<td>' + checkPrice(this.price, this.date) + '</td>';
                tableContent += '<td>' + this.amount + '</td>';
                tableContent += '</tr>';
            }
        });

        // Inject the whole content string into our existing HTML table
        $('#productList table tbody').html(tableContent);
    });
};


