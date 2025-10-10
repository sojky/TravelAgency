$(document).ready(function() {

    init();

    function init() {
        let user_json = sessionStorage.getItem("user")
        if (!user_json) {
            window.location.href = "../en/prijavaEN.html"
            return;
        }
        let user = JSON.parse(user_json);
        test(user)
        
        $("#hello").text("Hello, " + user.username);

        $("#logout").click(function() {
            sessionStorage.removeItem("user");
            window.location.href = "../en/indexEN.html";
        });

        let future_panel = $("#future");
        let future = getUpcomingBookings(user.bookings)
        future.forEach(element => {
            let col = createFutureCard(element);
            future_panel.append(col);
        });
        
        let past_panel = $("#past");
        let past = getPastBookings(user.bookings)
        past.forEach(element => {
            let col = createPastCard(element);
            past_panel.append(col);
        });
    }

    function parseDate(dateStr) {
        const [day, month, year] = dateStr.split('/').map(Number);
        return new Date(year, month - 1, day);
    }

    function getPastBookings(bookings) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return bookings.filter(b => {
            const start = parseDate(b.date);
            return start <= today;
        });
    }

    function getUpcomingBookings(bookings) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return bookings.filter(b => {
            const start = parseDate(b.date);
            return start > today;
        });
    }

    function createFutureCard(trip) {
        const $col = $('<div>', { class: 'col-12 col-lg-6 col-xxl-4 mb-3' });
        const $card = $('<div>', { class: 'card border rounded-4 shadow-sm h-100 text-center' });
        const $img = $('<img>', {
            src: trip.src,
            alt: trip.nameEN,
            class: 'card-img-top',
            css: {
                height: '250px',
                width: '100%',
                objectFit: 'cover'
            }
        });
        const $cardBody = $('<div>', { class: 'card-body d-flex flex-column' });
        const $title = $('<h1>', { class: 'card-title mb-4', text: trip.nameEN });
        const $table = $('<table>').append(
            $('<tr>').append(
                $('<th>', { text: 'Start date' }),
                $('<td>', { text: trip.date })
            ),
            $('<tr>').append(
                $('<th>', { text: 'Duration in days' }),
                $('<td>', { text: trip.duration })
            )
        );
        const $hr = $('<hr>');
        const $button = $('<button>', {
            class: 'color3 cancel',
            text: 'Cancel reservation',
            click: function() {
                const [day, month, year] = trip.date.split('/').map(Number);
                const tripDate = new Date(year, month - 1, day);
                const today = new Date();
                const diffDays = Math.floor((tripDate - today) / (1000 * 60 * 60 * 24));
                if (diffDays > 5) {
                    $col.remove();
                    const tripName = trip.name || $img.attr('alt');
                    const user = JSON.parse(sessionStorage.getItem('user'));
                    user.bookings = user.bookings.filter(b => b.nameEN !== tripName);
                    const users = JSON.parse(localStorage.getItem('users'));
                    const userIndex = users.findIndex(u => u.username === user.username);
                    users[userIndex] = user;
                    sessionStorage.setItem('user', JSON.stringify(user));
                    localStorage.setItem('users', JSON.stringify(users));

                } else {
                    alert('Cancellation is possible only more than 5 days before departure.');
                }
            }
        });
        $cardBody.append($title, $table, $hr, $button);
        $card.append($img, $cardBody);
        $col.append($card);
        return $col;
    }

    function createPastCard(trip) {
        const $col = $('<div>', { class: 'col-12 col-lg-6 col-xxl-4 mb-3' });
        const $card = $('<div>', { class: 'card border rounded-4 shadow-sm h-100 text-center' });
        const $img = $('<img>', {
            src: trip.src,
            alt: trip.nameEN,
            class: 'card-img-top',
            css: {
                height: '250px',
                width: '100%',
                objectFit: 'cover'
            }
        });
        const $cardBody = $('<div>', { class: 'card-body d-flex flex-column' });
        const $title = $('<h1>', { class: 'card-title mb-4', text: trip.nameEN });
        const $table = $('<table>').append(
            $('<tr>').append(
                $('<th>', { text: 'Start date' }),
                $('<td>', { text: trip.date })
            ),
            $('<tr>').append(
                $('<th>', { text: 'Duration in days' }),
                $('<td>', { text: trip.duration })
            )
        );
        const $hr = $('<hr>');
        const $ratingContainer = $('<div>', { class: 'd-flex justify-content-between align-items-center px-1' });
        const $ratingGroup = $('<div>');
        for (let i = 1; i <= 5; i++) {
            const id = `${trip.name}${i}`;
            const $label = $('<label>', { 
                for: id, 
                text: i,
                css: { marginRight: '5px' }
            });
            const $input = $('<input>', {
                type: 'radio',
                name: 'grade',
                id: id,
                value: i,
                css: { marginRight: '10px' }
            });
            $ratingGroup.append($label, $input);
        }
        const $button = $('<button>', {
            class: 'color4 color3',
            text: 'Rate the offer',
            click: function () {
                const selectedValue = $ratingGroup.find('input[name="grade"]:checked').val();
                if (!selectedValue) return;
                const tripName = trip.name || $img.attr('alt');
                const user = JSON.parse(sessionStorage.getItem('user'));
                const booking = user.bookings.find(b => b.nameEN === tripName);
                const oldReview = booking.review;
                booking.review = Number(selectedValue);
                const users = JSON.parse(localStorage.getItem('users'));
                const userIndex = users.findIndex(u => u.username === user.username);
                users[userIndex] = user;
                const trips = JSON.parse(localStorage.getItem('trips'));
                const tripData = trips.find(t => t.nameEN === tripName);
                if (oldReview === null) {
                    tripData.review_sum += Number(selectedValue);
                    tripData.review_number += 1;
                } else {
                    tripData.review_sum = tripData.review_sum - oldReview + Number(selectedValue);
                }
                sessionStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('users', JSON.stringify(users));
                localStorage.setItem('trips', JSON.stringify(trips));
            }

        });
        $ratingContainer.append($ratingGroup, $button);
        $cardBody.append($title, $table, $hr, $ratingContainer);
        $card.append($img, $cardBody);
        $col.append($card);
        return $col;
    }

    function test(user) {
        let array = [
            {
                src: '../images/tenerife.webp',
                name: 'Тенерифе',
                nameEN: 'Tenerife',
                date: '4/11/2025',
                duration: 7,
                review: null
            },
            {
                src: '../images/prague.jpg',
                name: 'Праг',
                nameEN: 'Prague',
                date: '4/5/2025',
                duration: 3,
                review: null
            },
            {
                src: '../images/paris.webp',
                name: 'Париз',
                nameEN: 'Paris',
                date: '3/9/2024',
                duration: 6,
                review: null
            },
            {
                src: '../images/budapest.avif',
                name: 'Будимпешта',
                nameEN: 'Budapest',
                date: '21/5/2023',
                duration: 2,
                review: null
            },
            {
                src: '../images/sicily.jpg',
                name: 'Сицилија',
                nameEN: 'Sicily',
                date: '20/3/2023',
                duration: 3,
                review: null
            }
        ]
        user.bookings = array
        const users = JSON.parse(localStorage.getItem('users'));
        const userIndex = users.findIndex(u => u.username === user.username);
        users[userIndex] = user;
        sessionStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('users', JSON.stringify(users));
    }
    
});
