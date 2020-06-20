var name = document.getElementById('overview-section').getElementsByClassName('a6481dc2 _4a4e7a6a')[0].textContent
var latitude = document.querySelector("meta[property='place:location:latitude']").getAttribute("content");
var longitude = document.querySelector("meta[property='place:location:longitude']").getAttribute("content");
var phone = document.querySelector("meta[property='business:contact_data:phone_number']").getAttribute("content");

var send = [latitude, longitude, name, phone]

chrome.runtime.onMessage.addListener(
    function (message, sender, sendResponse) {
        switch (message.type) {
            case "getRes":
                sendResponse(send);
                break;
            default:
                console.error("Unrecognised message: ", message);
        }
    }
);