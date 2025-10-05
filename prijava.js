$(document).ready(function() {

    init();

    function init() {
        $("#errormsg").hide();

        $("form").on("submit", function(e) {
            e.preventDefault();
            let username = $("#username").val();
            let password = $("#password").val();

            let users_json = localStorage.getItem("users");
            if (users_json != null) {
                users = JSON.parse(users_json);
                users.forEach(element => {
                    if (element.username == username && element.password == password) {
                        sessionStorage.setItem("user", JSON.stringify(element));
                        window.location.href = "index.html";
                        return;
                    }
                });
            }
            $("#errormsg").show();
        });
    }
});