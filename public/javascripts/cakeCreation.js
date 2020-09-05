var tempIngridients = [];

function initCakeCreation() {
    tempIngridients = [];        
    populateTempIngridientList();
};

function addIngridients() {
    event.preventDefault();

    // todo check no empty field
    var errorCount = 0;

    if (errorCount === 0) {

        var newIngridient = {
            'id': $('#ingridientName option:selected').val(),
            'name': $('#ingridientName option:selected').text(),
            'amount': $('#ingridientAmount').val()
        }

        tempIngridients.push(newIngridient);

        $('#ingridientName').val('');
        $('#ingridientAmount').val('');

        populateTempIngridientList();
    }
    else {
        alert('Please fill in all fields');
        return false;
    }
};

function populateTempIngridientList() {

    var tableContent = '';

    $.each(tempIngridients, function () {
        tableContent += '<tr>';
        tableContent += '<td>' + this.name + '</td>';
        tableContent += '<td>' + this.amount + '</td>';
        tableContent += '</tr>';
    });

    $('#tempIngredientList table tbody').html(tableContent);
};

function saveNewCakeType() {
    event.preventDefault();

    var jsonIngridients = JSON.stringify(tempIngridients);

    var newcaketype = {
        'name': $('#newCakeName').val(),
        'ingridients': jsonIngridients
    }

    $.ajax({
        type: 'POST',
        data: newcaketype,
        url: '/admin/addcaketype',
        dataType: 'JSON'
    }).done(function (response) {

        if (response.msg === '') {

            // clear field input value
            alert("Cake   " + $('#newCakeName').val() + "  added!");
            $('#newCakeName').val('');
            var x = document.getElementById("createNewCake");
            x.style.display = "none";
            updateCakeTypeList();
        }
        else {

            // If something goes wrong, alert the error message that our service returned
            alert('Error: ' + response.msg);

        }
    });
};

function populateIngredientListDropdown() {
    let dropdown = $('#ingridientName');

    dropdown.empty();
    dropdown.append('<option selected="true" disabled>Choose Ingridients</option>');
    dropdown.prop('selectedIndex', 0);

    $.getJSON('/ingridients', function (data) {

        ingridientList = data;
        $.each(data, function (key, entry) {
            dropdown.append($('<option></option>').attr('value', entry._id).text(entry.name + ' ' + entry.unit));
        })
    });
};