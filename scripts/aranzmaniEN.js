$(document).ready(function() {
    let $cards = $('#cards .col-12, #cards .col-lg-6, #cards .col-xxl-4');
    let $container = $('#cards');

    function filterAndSort() {
        let search = $('#searchInput').val().toLowerCase();
        let sort = $('#sortSelect').val();

        let filtered = $cards.filter(function() {
            const title = $(this).find('.card-title').text().toLowerCase();
            const priceText = $(this).find('.card-text').text().replace('€', '').trim();
            const price = parseFloat(priceText);
            return title.includes(search) || priceText.includes(search);
        });

        if (sort) {
            filtered = filtered.sort(function(a, b) {
                const titleA = $(a).find('.card-title').text().toLowerCase();
                const titleB = $(b).find('.card-title').text().toLowerCase();
                const priceA = parseFloat($(a).find('.card-text').text().replace('€', '').trim());
                const priceB = parseFloat($(b).find('.card-text').text().replace('€', '').trim());

                switch (sort) {
                    case 'nameAsc': return titleA.localeCompare(titleB);
                    case 'nameDesc': return titleB.localeCompare(titleA);
                    case 'priceAsc': return priceA - priceB;
                    case 'priceDesc': return priceB - priceA;
                }
            });
        }

        $container.empty().append(filtered);
    }

    $('#searchInput').on('input', filterAndSort);
    $('#sortSelect').on('change', filterAndSort);

    const translations = [
        {sr: "Тенерифе", en: "Tenerife"},
        {sr: "Праг", en: "Prague"},
        {sr: "Париз", en: "Paris"},
        {sr: "Будимпешта", en: "Budapest"},
        {sr: "Сицилија", en: "Sicily"},
        {sr: "Мајорка", en: "Majorca"},
        {sr: "Беч", en: "Vienna"},
        {sr: "Букурешт", en: "Bucharest"},
        {sr: "Лапонија", en: "Lapland"}
    ];

    function translateToSR(enName) {
        const item = translations.find(t => t.en === enName);
        return item ? item.sr : enName;
    }

    function addBooking(card) {
        let user_json = sessionStorage.getItem("user");
        if (!user_json) {
            window.location.href = "../en/prijavaEN.html";
            return;
        }
        let user = JSON.parse(user_json);

        const $card = $(card);
        const imgSrc = $card.find('img').attr('src');
        const nameEN = $card.find('.card-title').text().trim();
        const nameSR = translateToSR(nameEN);
        const date = $card.find('table tr:nth-child(1) td').text().trim();
        const duration = parseInt($card.find('table tr:nth-child(2) td').text().trim());

        const booking = {
            src: imgSrc,
            name: nameSR;
            nameEN: nameEN,
            date: date,
            duration: duration,
            review: null
        };

        if (!user.bookings) user.bookings = [];
        user.bookings.push(booking);
        sessionStorage.setItem('user', JSON.stringify(user));

        let users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(u => u.username === user.username);
        if (userIndex !== -1) {
            users[userIndex] = user;
        } else {
            users.push(user);
        }
        localStorage.setItem('users', JSON.stringify(users));

    }

    $('#cards').on('click', '.btn-primary', function(e) {
        e.preventDefault();
        const card = $(this).closest('.col-12, .col-lg-6, .col-xxl-4');
        addBooking(card);
    });
});
