$(document).ready(function() {
    let user = null

    check_user();
    



    function check_user() {
        user = sessionStorage.getItem("user")
        if (!user) {
            window.location.href = "prijava.html"
        }
    }
    
});
