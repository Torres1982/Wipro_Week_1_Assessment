/*********************************************************************/
/*                  Validation of HTML input fields                  */
/*********************************************************************/
function validateFields() {
	var first_name = document.getElementById("first-name").value;
	var surname = document.getElementById("surname").value;
	var email = document.getElementById("email").value;
    var dob = document.getElementById("date-of-birth").value;
	var gender = $("input[name='gender']:checked");
    var gender_selected = [];
    
	if (first_name.length < 2) {
		alert("Provide your First Name, please!");
	} else if (surname.length < 2) {
		alert("Provide your Surname, please!");
	}  else if (email == "") {
		alert("Provide Email, please!");
	} else if (gender.length === 0) {
		alert("Select Gender, please!");
	} else if (dob == "") {
        alert("Select Date of Birth, please!");
    } else {
		confirm("Are you sure you want to submit your data?");
        
        // Find the value of selected gender check box
        $.each($("input[name='gender']:checked"), function(){            
            gender_selected .push($(this).val());
        });
        
        displayJsonArray(first_name, surname, email, gender_selected, dob);
        saveDataToLocalStorage(first_name, surname, email, gender_selected, dob);
        //console.log("Text from the validation!");
	}
}

/*********************************************************************/
/*          This function returns a String of the user details       */
/*********************************************************************/
function displayJsonArray (first_name, surname, email, gender, dob) {
    var user_details = '{"new_user":[{"first_name": ' + first_name + ', "last_name": ' + surname + ', "email": ' + email + ', "gender": ' + gender +', "date_of_birth": ' + dob + '}]}';
    
    console.log(user_details);
    //console.log("Text from the function!");
}

/*********************************************************************/
/*          Saves the registered user in the local storage           */
/*********************************************************************/
function saveDataToLocalStorage(first_name, last_name, email, gender, dob) {
    localStorage.setItem("first_name", first_name);
    localStorage.setItem("last_name", last_name);
    localStorage.setItem("email", email);
    localStorage.setItem("gender", gender);
    localStorage.setItem("date_of_birth", dob);
}

/*********************************************************************/
/*           Retrieves the registered user in the local storage      */
/*********************************************************************/
$('.nav_users').click(function() {
    retrieveDataFromLocalStorage();
});

function retrieveDataFromLocalStorage() {
    var name = localStorage.getItem("first_name");
    var surname = localStorage.getItem("last_name");
    var email = localStorage.getItem("email");
    var gender = localStorage.getItem("gender");
    var dob = localStorage.getItem("date_of_birth");
    var user_array = [name, surname, email, gender, dob];
  
    populateInputFields(user_array);
}

/*********************************************************************/
/*          Populate the input fields with data from local storage   */
/*********************************************************************/
function populateInputFields(user_array) {
    $("#first-name").val(user_array[0]);
    $("#surname").val(user_array[1]);
    $("#email").val(user_array[2]);
    $("#date-of-birth").val(user_array[4]);
    
    checkGenderCheckBox(user_array);
    //alert("USER DETAILS: " + user_array);
}

/*********************************************************************/
/*   Select the gender checkbox when auto-populating input fields    */
/*********************************************************************/
function checkGenderCheckBox(user_array) {
    if (user_array[3] === "female") {
        $('#female').prop("checked", true);
        //alert("FEMALE");
    } else if (user_array[3] === "male") {
        $('#male').prop("checked", true);
        //alert("MALE");
    }
}

/*********************************************************************/
/*                    Toggle for the mobile menu button              */
/*********************************************************************/
$('.mobile-menu-icon').click(function() {
	var navigation = $('.main-nav');
	
	navigation.slideToggle(250);
});
