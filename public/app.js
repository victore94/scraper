function displayResults(scrapeAnime) {
    // First, empty the table
    $("#anime").empty();

    // Then, for each entry of that json...
    scrapeAnime.forEach(function (data) {
        let anime = data.newAnime

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
    $.get("/reset", function (req, res) {
        db.scrapeAnime.drop()
        res.send("reset");
    });
})


$.getJSON("/all", function (data) {
    // Call our function to generate a table body
    displayResults(data);
});

console.log('testing')
