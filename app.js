'use strict'
$(document).ready(function() {

    makeAPICall(getQuotes);

    function makeAPICall(successCallBack) {
        $.ajax({
            url: "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json",
            success: function(data) {
                successCallBack(data)
            },
            error: function (jqXHR, textStatus, errorThrown) {
                catchError(jqXHR, textStatus, errorThrown) 
            }
        })
    }

    $("#new-quote").click(function() {
        makeAPICall(getQuotes)
    });
    
    function getQuotes(data) {
        let obj;
        if (typeof(data) === "string") obj = JSON.parse(data)
        if (obj.hasOwnProperty("quotes")) {
            let quoteObj = obj.quotes[Math.floor(Math.random() * obj.quotes.length)] 

            $("#text").text(quoteObj.quote);
            $("#author").text(quoteObj.author);
            $("#tweet-quote").attr("href", `http://twitter.com/intent/tweet?text=${encodeURI(quoteObj.quote)}`)
        }
    }

    function catchError(jqXHR, textStatus, errorThrown ) {
        console.log(`Status: ${textStatus}`)
        console.log(`Errors: ${errorThrown}`)
    }

});