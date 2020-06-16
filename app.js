'use strict'
import { dataService } from 'dataService.js';

$(document).ready(function() {
    
    let ds = new dataService();
    
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

    function throwErrorToConsole() {
        console.log("errors")
    }

    ds.makeAPICall(getQuotes(), throwErrorToConsole())

    $("#new-quote").click(function() {
        ds.makeAPICall(getQuotes(), throwErrorToConsole())
    });   

});