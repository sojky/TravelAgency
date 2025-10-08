if (localStorage.getItem("trips") == null) {
    let trips = [
        {
            name: 'Будимпешта',
            review_sum: 46,
            review_number: 10
        },
        {
            name: 'Праг',
            review_sum: 45,
            review_number: 10
        },
        {
            name: 'Сицилија',
            review_sum: 47,
            review_number: 10
        },
        {
            name: 'Париз',
            review_sum: 47,
            review_number: 10
        },
        {
            name: 'Тенерифе',
            review_sum: 49,
            review_number: 10
        },
        {
            name: 'Мајорка',
            review_sum: 47,
            review_number: 10
        },
        {
            name: 'Беч',
            review_sum: 48,
            review_number: 10
        },
        {
            name: 'Букурешт',
            review_sum: 45,
            review_number: 10
        },
        {
            name: 'Лапонија',
            review_sum: 48,
            review_number: 10
        }
    ]
    let tripsEN = [
        {
            name: 'Budapest',
            review_sum: 46,
            review_number: 10
        },
        {
            name: 'Prague',
            review_sum: 45,
            review_number: 10
        },
        {
            name: 'Sicily',
            review_sum: 47,
            review_number: 10
        },
        {
            name: 'Paris',
            review_sum: 47,
            review_number: 10
        },
        {
            name: 'Tenerife',
            review_sum: 49,
            review_number: 10
        },
        {
            name: 'Majorca',
            review_sum: 47,
            review_number: 10
        },
        {
            name: 'Vienna',
            review_sum: 48,
            review_number: 10
        },
        {
            name: 'Bucharest',
            review_sum: 45,
            review_number: 10
        },
        {
            name: 'Lapland',
            review_sum: 48,
            review_number: 10
        }
    ]
    localStorage.setItem("trips", JSON.stringify(trips))
    localStorage.setItem("tipsEN", JSON.stringify(tripsEN))
}
