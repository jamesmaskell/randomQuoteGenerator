'use strict'
$(document).ready(function() {
    
    getQuote();

    function getQuote() {
        let quoteArray = random();
        $("#text").text(quoteArray[0]);
        $("#author").text(quoteArray[1]);
        $("#tweet-quote").attr("href", `http://twitter.com/intent/tweet?text=${encodeURI(quoteArray[0])}`)
    }

    $("#new-quote").click(function() {
        getQuote()
    });

    /* replace this function with an actual call to an API */
    function random() {
        /*const quotes = [
            ["I'm only here so I won't get fined", "Beast Mode"],
            ["If you’re not gonna go ALL the way, why go at ALL?", "Joe Namath"],
            ["GO HAWKS!", "Russell Wilson"]
        ] 
        let i = Math.floor(Math.random() * 3);
        console.log("i",i)
        return quotes[i];*/

        $.get("data.json", function(data, status){
            if (data.hasOwnProperty("quotes")) {
                let i = Math.floor(Math.random() * data.quotes.length);
            }
        })
    }
    
    

});