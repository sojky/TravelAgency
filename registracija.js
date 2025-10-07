$(document).ready(function() {

    init();

    function init() {
        $("#erroruser").hide();
        $("#erroremail").hide();
        $("#errorpass1").hide();
        $("#errorpass2").hide();

        $("form").on("submit", function(e) {
            e.preventDefault();
            let username = $("#username").val();
            let email = $("#email").val();
            let password = $("#password").val();
            let repeat = $("#repeat").val();

            let users_json = localStorage.getItem("users");
            let users = [];
            if (users_json != null) {
                users = JSON.parse(users_json);
                users.forEach(element => {
                    if (element.username == username) {
                        $("#erroruser").show();
                        return;
                    }
                    if (element.email == email) {
                        $("#erroruser").show();
                        return;
                    }
                });
            }
            if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) || 
                !/[@$!%*?&]/.test(password) || password.length < 8 || !/^[A-Za-z0-9@$!%*?&]+$/.test(password)) {
                $("#errorpass1").show();
                return;
            }
            if (password != repeat) {
                $("#errorpass2").show();
                return;
            }
            users.push({
                username: username,
                email: email,
                password: password,
                bookings: [],
                bookingsEN: []
                /*
                elementi niza bookings i bookingsEN su objekati oblika

                {
                    src: <putanja_do_slike>,
                    name: <ime_slike>,
                    date: <datum_pocetka_putovanja>,
                    duration: <trajanje_putovanja>
                }


                date, duration i name samo uzeti iz teksta koji je vezan za sliku bilo da je srpski ili engleski. U metodi rezeracije je potrebno dodati trazenu rezervaciju u oba niza odgovarajucem formatu (prevesti ime)
                */
            });
            localStorage.setItem("users", JSON.stringify(users));
            window.location.href = "prijava.html";
        });
    }
});