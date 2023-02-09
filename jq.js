
var storedata = [];
var object = {};



$("#submitbtn").click(function () {
    let firstname = $('#username').val();
    let fathername = $('#fathername').val();
    let mail = $('#email').val();
    let Dob = $('#dateofbirth').val();
    let Gender = document.querySelector('input[type="radio"]:checked');
    let language = $('input[type="checkbox"]:selected').val();
    let phno = $('#phonenumber').val();
    let add = $('#address').val();
    let phoneNum = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    let id = $('#id').val();
    function isValidEmail(email) {
        return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    }


    if (firstname == "") {
        $('#error1').html('Please enter your name.');
    } else {
        $('#error1').hide();
    }

    if (fathername === "") {
        $('#error2').html('Please enter a name.');
    } else {
        $('#error2').hide();
    }
    if (isValidEmail(mail) == "") {
        $('#error3').html('Please enter a name.');
    } else {
        $('#error3').hide();
    }

    if (Dob === "") {
        $('#error4').html('Please enter your Date of birth.');
    } else {
        $('#error4').hide();
    }

    if (Gender) {
        $('#error5').hide();
    } else {
        $('#error5').html('Please enter your gender.');
    }
    if (typeof language !== '') {
        $('#error6').hide();
    } else {
        $('#error6').html('Please select at least one language.');
    }
    if (typeof language !== '') {
        $('#error6').hide();
    } else {
        $('#error6').html('Please select at least one language.');
    }



    // var language = document.querySelector('input[name="button"]:checked');
    // if (!language) {
    // $("#error6").this('please choose your language.');
    //     }
    //     else {
    //     if (language < 1) {

    //         $("#error6").hide();


    // console.log("Selected language: " + language);
    //submit the form
    // }
    if (phno.match(phoneNum)) {
        $('#error7').hide();
    } else {
        $('#error7').html('Please enter your Phonenumber.');
    }
    if (add === "") {
        $('#error8').html('Please give your address.');
    } else {
        $('#error8').hide();
    }

    let result =
    {
        'name': firstname,
        'Dadname': fathername,
        'email': mail,
        'dateofbirth': Dob,
        'radio': Gender.value,
        'lang': language,
        'phonenumber': phno,
        'address': add
    }
    // console.log(result);


    // if (firstname && fathername && mail && Dob && Gender.value && language && phno && add) {
    // storedData.push(response);
    if (id == "") {
        $.ajax({
            type: "POST",
            url: "https://63cfb761e52f587829a384e5.mockapi.io/user",
            data: result,
            dataType: "JSON",
            success: function (value) {
                buildTable()
                console.log(value);
            }


        });


    }
    else {
        $.ajax({
            type: "PUT",
            url: "https://63cfb761e52f587829a384e5.mockapi.io/user/" + object.id,
            data: result,
            dataType: "JSON",
            success: function (value) {
                buildTable()
                console.log(value);
            }


        });
    }
});

function buildTable() {
    $.ajax({
        type: "GET",
        url: "https://63cfb761e52f587829a384e5.mockapi.io/user",
        dataType: "JSON",
        success: function (response) {

            let row = '';
            for (i = 0; i < response.length; i++) {

                row +=
                    `<tr>
                    
       <td>${response[i].name}</td>
       <td>${response[i].Dadname}</td>
       <td>${response[i].email}</td>    
       <td>${response[i].dateofbirth}</td>
       <td>${response[i].radio}</td>
       <td>${response[i].lang}</td>
       <td>${response[i].phonenumber}</td>
       <td>${response[i].address}</td>
       <td>
       <button type='button' class='getEditWin text-white btn btn-primary' data-id="${response[i].id}">Edit</button>
       <button type='button' class='deleteRow btn btn-danger ms-2' onclick='deleteRow(${response[i].id})'>Delete</button>
     </td>
   </tr>`;

            }


            table = document.getElementById("mytable").innerHTML = row;//console.log(response);
        }

    });

}

$(document).on('click', '.getEditWin', function () {
    var id = $(this).data('id');
    $.ajax({
        url: "https://63cfb761e52f587829a384e5.mockapi.io/user/" + id,
        type: "GET",
        success: function (response) {
            console.log(response);
            $("#id").val(response.id);
            $("#username").val(response.name);
            $("#fathername").val(response.Dadname);
            $("#address").val(response.address);
            $("#dateofbirth").val(response.dateofbirth);
            $("#phonenumber ").val(response.phonenumber);
            $("input[name='gender'][value='" + response.radio + "']").prop("checked", true);
            $("#email").val(response.email);
            $('input[type="checkbox"]:checked').each(function() {    // $(':checkbox:checked')
                document.body.append(this.value + ' ')
            })



            object = response;

        }

    })

})

function deleteRow(id) {
    $.ajax({
        url: "https://63cfb761e52f587829a384e5.mockapi.io/student/" + id,
        type: "DELETE",
        success: function (response) {
            // alert("This a user id delete!")
            location.reload()
        }
    })
}

