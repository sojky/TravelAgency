$(document).ready(function() {
    let $cards = $('#cards .col-12');  // svaka kolona je jedna kartica
    let $container = $('#cards');      // div koji sadrži sve kartice

    function filterAndSort() {
        let search = $('#searchInput').val().toLowerCase();
        let sort = $('#sortSelect').val();

        // filtriranje po nazivu ili ceni
        let filtered = $cards.filter(function() {
            const title = $(this).find('.card-title').text().toLowerCase();
            const priceText = $(this).find('.card-text').text().replace('€', '').trim();
            const price = parseFloat(priceText);
            return title.includes(search) || priceText.includes(search);
        });

        // sortiranje
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

        // ažuriranje prikaza
        $container.empty().append(filtered);
    }

    // događaji
    $('#searchInput').on('input', filterAndSort);
    $('#sortSelect').on('change', filterAndSort);
});
