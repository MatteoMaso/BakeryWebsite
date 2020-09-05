// todo admin function which check that the coockie are ok
var productListData = [];

var ingridientList = [];

// DOM Ready =============================================================
$(document).ready(function () {
    populateProductTable();

    populateIngredientListDropdown();

    populateCakeTypeListDropdown();

    // Add cake button click
    $('#btnAddCake').on('click', addProduct);

    // Return to shop button click
    $('#btnClientView').on('click', returnToShop);

    // New cake button click
    $('#btnNewCake').on('click', createNewCake);
    
    // Delete User link click
    $('#productList table tbody').on('click', 'td a.linkremoveproduct', removeProduct);

    // Creation of new cake type
    document.getElementById("createNewCake").style.display = "none";
    $('#btnAddNewIngredient').on('click', addIngridients);
    $('#btnSaveNewCake').on('click', saveNewCakeType);
});

function returnToShop() {
    // Simulate an HTTP redirect:
    window.location.replace("http://localhost:3000/");
};

function createNewCake() {
    // display the menu to add a new cake type
    var x = document.getElementById("createNewCake");
    if (x.style.display == "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    
    initCakeCreation();
};



function getCake() {

    $.getJSON('/getcake', function (data) {
        return data;
    });
};


// Fill table with data
function populateProductTable() {
    
    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON('/productlist', function (data) {
        // Stick our user data array into a userlist variable in the global object
        productListData = data;  // ok just for few data
        
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function () {
            var d = new Date(this.date);
            var year = pad(d.getFullYear());
            var month = pad(d.getMonth() + 1);
            var day = pad(d.getDate());
            var yyyymmdd = day + '-' + month + '-' + year;
            var name = cakeTypeList.find(x => x._id === this.type).name;
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowproduct" rel="' + name + '">' + name + '</a></td>';
            tableContent += '<td>' + this.price + '</td>';
            tableContent += '<td>' + yyyymmdd + '</td>';
            tableContent += '<td>' + this.amount + '</td>';
            tableContent += '<td><a href="#" class="linkremoveproduct" rel="' + this._id + '">remove</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#productList table tbody').html(tableContent);
    });
};

function pad(numb) {
    return (numb < 10 ? '0' : '') + numb;
}

// Put a cake on sale
function addProduct(event) {
        event.preventDefault();

        // Super basic validation - increase errorCount variable if any fields are blank
        var errorCount = 0;
        $('#addCake input').each(function (index, val) {
            if ($(this).val() === '') { errorCount++; }
        });

        var d = new Date();
        // Check and make sure errorCount's still at zero
        if (errorCount === 0) {

            // If it is, compile all user info into one object
            var newProduct = {
                'type': $('#inputCakeType option:selected').val(),
                'price': $('#addCake fieldset input#inputCakePrice').val(),
                'amount': $('#addCake fieldset input#inputCakeAmount').val(),
                'date': d
            }

            // Use AJAX to post the object to our adduser service
            $.ajax({
                type: 'POST',
                data: newProduct,
                url: '/admin/addproduct',
                dataType: 'JSON'
            }).done(function (response) {

                // Check for successful (blank) response
                if (response.msg === '') {

                    // Clear the form inputs
                    $('#addCake fieldset input').val('');

                    // Update the table
                    populateProductTable();

                }
                else {

                    // If something goes wrong, alert the error message that our service returned
                    alert('Error: ' + response.msg);

                }
            });
        }
        else {
            // If errorCount is more than 0, error out
            alert('Please fill in all fields');
            return false;
        }
    };

// Delete User
function removeProduct(event) {

    event.preventDefault();
    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to remove this product?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/admin/deleteproduct/' + $(this).attr('rel')
        }).done(function (response) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateProductTable();

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;
    }
};


function populateCakeTypeListDropdown() {
    let dropdown = $('#inputCakeType');
    dropdown.empty();

    dropdown.append('<option selected="true" disabled>Cake type</option>');
    dropdown.prop('selectedIndex', 0);

    // Populate dropdown with list of provinces
    $.getJSON('/caketypes', function (data) {
        $.each(data, function (key, entry) {
            dropdown.append($('<option></option>').attr('value', entry._id).text(entry.name));
        })
    });
};