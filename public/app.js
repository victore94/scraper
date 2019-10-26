function displayResults(scrapeAnime) {
    // First, empty the table
    $("#anime").empty();

    // Then, for each entry of that json...
    scrapeAnime.forEach(function (data) {
        let anime = data
        // Append each of the anime's properties to the table
        var tr = $("<tr>").append(
            $("<td>").text(anime.title),
            $("<td>").append(`<img src="${anime.poster}"/>`),
            $("<td>").prepend(`<div><a href="${anime.link}">Link</a></div>`),
            $("<td>").text(anime.story)
        );

        $("#anime").append(tr);
    });
}



$('#reset').on('click', () => {
    console.log('clicked', 'reset')
    $.ajax({
        method: "GET",
        url: "/reset"
    })

    // $("#anime").empty();
})

$('#scrape').on('click', () => {
    console.log('scrape')
    $.ajax({
        method: "GET",
        url: "/scrape"
    })

})


$.getJSON("/all", function (data) {
    // Call our function to generate a table body
    displayResults(data);
});

console.log('testing')
