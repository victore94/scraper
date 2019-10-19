const displayResults = (res) => {
    // First, empty the table
    $("#anime").empty();

    // Then, for each entry of that json...
    res.forEach(function (anime) {
        // Append each of the anime's properties to the table
        var tr = $("<tr>").append(
            $("<td>").text(anime.name),
            $("<td>").text(anime.story),
            $("<td>").text(anime.img),
            $("<td>").text(anime.link),
        );

        $("#anime").append(tr);
    });
}

$.getJSON("/anime", function (data) {
    // Call our function to generate a table body
    displayResults(data);
});

console.log('testing')
