const form = document.getElementById("log_in")


//retrieve form data
form.onsubmit=async (event)=>{
const email = document.getElementById("mail").value
const password = document.getElementById("password").value

    
    event.preventDefault()

        //retrieve the data and submit form
        const result = await fetch('/api/login',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email,
                password
            })
        }).then(res=>{
            res.json()
        })
        if (result.status === 'ok' ){
            
        }else{
            alert(result.error)
        }
    
}