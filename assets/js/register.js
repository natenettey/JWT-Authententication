//set up event listeners
const form = document.getElementById("sign_up")
const username = document.getElementById("user_name")
const mail = document.getElementById("mail")
const residence = document.getElementById("residence")
const password = document.getElementById("password")
const repeat  = document.getElementById("repeat")

//retrieve form data
form.onsubmit=(event)=>{
    event.preventDefault()
    console.log("the form works!")

    //check if the passwords match
    if (password != repeat){
        alert("passwords do not match")
    }
}
