//set up event listeners
const form = document.getElementById("sign_up")
const username = document.getElementById("user_name").value
const mail = document.getElementById("mail").value
const residence = document.getElementById("residence").value
const password = document.getElementById("password").value
const repeat  = document.getElementById("repeat").value

//retrieve form data
form.onsubmit=async (event)=>{
    event.preventDefault()
    console.log("the form works!")

    //check if the passwords match
    if (password !== repeat){
        alert("passwords do not match")
    }else{
        //retrieve the data and submit form
        const result = await fetch('/api/register',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                username,
                mail,
                residence,
                password,
                repeat
            })
        }).then(res=>{
            res.json
        })
    }
}
