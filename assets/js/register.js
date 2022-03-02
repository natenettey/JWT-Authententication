const form = document.getElementById("sign_up")


//retrieve form data
form.onsubmit=async (event)=>{
const username = document.getElementById("user_name").value
const email = document.getElementById("mail").value
const residence = document.getElementById("residence").value
const password = document.getElementById("password").value
const repeat  = document.getElementById("repeat").value
    
    event.preventDefault()
    console.log(username)

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
                email,
                residence,
                password,
                repeat
            })
        }).then(res=>{
            res.json()
        })
        if (result.status === 'ok' ){
            
        }else{
            alert(result.error)
        }
    }
}