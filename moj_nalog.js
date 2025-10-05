$(document).ready(function() {

    init();


    function init() {
        let user_json = sessionStorage.getItem("user")
        if (!user_json) {
            window.location.href = "prijava.html"
            return;
        }
        let user = JSON.parse(user_json);
        
        $("#hello").text("Поздрав, " + user.username);

        $("#logout").click(function() {
            sessionStorage.removeItem("user");
            window.location.href = "index.html";
        });

        let future_panel = $("#future");
        user.future.forEach(element => {
            let col = $('<div>', { class: 'col-12 col-md-4 mb-3' });
            let card = $('<div>', { class: 'card border border-warning rounded-4 shadow-sm h-100 text-center' });
            let img = $('<img>', {
                src: element.src,
                alt: element.name,
                class: 'card-img-top',
                css: {
                    height: '250px',
                    width: '100%',
                    objectFit: 'cover'
                }
            });
            let cardBody = $('<div>', { class: 'card-body d-flex flex-column' });
            let title = $('<h3>', { class: 'card-title mb-2', text: element.name });
            let section = $('<section>', { text: element.date });
            cardBody.append(title, section);
            card.append(img, cardBody);
            col.append(card);
            future_panel.append(col);
        });

        let past_panel = $("#past");
        user.past.forEach(element => {
            let col = $('<div>', { class: 'col-12 col-md-4 mb-3' });
            let card = $('<div>', { class: 'card border border-warning rounded-4 shadow-sm h-100 text-center' });
            let img = $('<img>', {
                src: element.src,
                alt: element.name,
                class: 'card-img-top',
                css: {
                    height: '250px',
                    width: '100%',
                    objectFit: 'cover'
                }
            });
            let cardBody = $('<div>', { class: 'card-body d-flex flex-column' });
            let title = $('<h3>', { class: 'card-title mb-2', text: element.name });
            let section = $('<section>', { text: element.date });
            let button = $('<button>', { class: 'color4 color3', text: 'Оцени аранжман' });
            cardBody.append(title, section, button);
            card.append(img, cardBody);
            col.append(card);
            past_panel.append(col);
        });
    }
    
});
