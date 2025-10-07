$(document).ready(function() {
    let $cards = $('.card-item');
    let $container = $('#cards');

    function filterAndSort() {
        let search = $('#searchInput').val().toLowerCase();
        let sort = $('#sortSelect').val();

        let filtered = $cards.filter(function() {
            const title = $(this).find('.card-title').text().toLowerCase();
            const price = parseFloat($(this).find('.card-text:contains("Цена:")').text().replace('Цена:', '').replace('€','').trim());
            return title.includes(search) || String(price).includes(search);
        });

        if(sort) {
            filtered = filtered.sort(function(a, b) {
                let titleA = $(a).find('.card-title').text().toLowerCase();
                let titleB = $(b).find('.card-title').text().toLowerCase();
                let priceA = parseFloat($(a).find('.card-text:contains("Цена:")').text().replace('Цена:', '').replace('€','').trim());
                let priceB = parseFloat($(b).find('.card-text:contains("Цена:")').text().replace('Цена:', '').replace('€','').trim());

                switch(sort) {
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
});
