//render the registration page on page load
exports.home_page = (req,res)=>{
    res.render("index") 
}

//render login page
exports.login_page = (req, res)=>{
    res.render("login")
}
//render the dashboard temporally
exports.user_page = (req, res)=>{
    res.render('user_dashboard')
}

