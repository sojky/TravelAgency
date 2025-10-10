if (localStorage.getItem("trips") == null) {
    let trips = [
        {
            name: 'Будимпешта',
            nameEn: 'Budapest',
            review_sum: 46,
            review_number: 10
        },
        {
            name: 'Праг',
            nameEn: 'Prague',
            review_sum: 45,
            review_number: 10
        },
        {
            name: 'Сицилија',
            nameEn: 'Sicily',
            review_sum: 47,
            review_number: 10
        },
        {
            name: 'Париз',
            nameEn: 'Paris',
            review_sum: 47,
            review_number: 10
        },
        {
            name: 'Тенерифе',
            nameEn: 'Tenerife',
            review_sum: 49,
            review_number: 10
        },
        {
            name: 'Мајорка',
            nameEn: 'Majorca',
            review_sum: 47,
            review_number: 10
        },
        {
            name: 'Беч',
            nameEn: 'Vienna',
            review_sum: 48,
            review_number: 10
        },
        {
            name: 'Букурешт',
            nameEn: 'Bucharest',
            review_sum: 45,
            review_number: 10
        },
        {
            name: 'Лапонија',
            nameEn: 'Lapland',
            review_sum: 48,
            review_number: 10
        }
    ]
    localStorage.setItem("trips", JSON.stringify(trips))
}
