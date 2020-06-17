chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {type: "getRes"}, function (response) {
        console.log(response)
    });
});


// function fetchStarImage(rating) {
//     let review = rating.toString()
//     if (review == '0') {
//         return 'small_0.png'
//     } else if (review == '1') {
//         return 'small_1.png'
//     } else if (review == '1.5') {
//         return 'small_1_half.png'
//     } else if (review == '2') {
//         return 'small_2.png'
//     } else if (review == '2.5') {
//         return 'small_2_half.png'
//     } else if (review == '3') {
//         return 'small_3.png'
//     } else if (review == '3.5') {
//         return 'small_3_half.png'
//     } else if (review == '4') {
//         return 'small_4.png'
//     } else if (review == '4.5') {
//         return 'small_4_half.png'
//     } else if (review == '5') {
//         return 'small_5.png'
//     }
// }
//
// $.ajax({
//     //http://localhost:5000/
//     //http://jiajianwu.pythonanywhere.com/
//     url: "http://jiajianwu.pythonanywhere.com/",
//     type: "POST"
// }).done(function (response) {
//     console.log(response)
//     //response is an json "object"
//     let el = document.createElement("div")
//     for (let i = 0; i < response.length; i++) {
//
//         let link = response[i].url
//         let l = document.createElement("a")
//         l.setAttribute('href', link)
//         l.setAttribute('target', "_blank")
//         l.textContent = "Go to Yelp for detailed review"
//
//         el.innerHTML += "User Name: " + response[i].user.name + "<br />" + "Review Rating: "
//
//         let image_name = fetchStarImage(response[i].rating)
//         let image_el = document.createElement("img")
//         image_el.setAttribute('src', 'stars/' + image_name)
//         el.appendChild(image_el)
//
//         el.innerHTML += '<br />' + '<em>' + response[i].text + '</em>' + '<br />'
//         el.appendChild(l)
//
//         el.innerHTML += '<hr />'
//     } //end of for loop
//
//
//     let reference = document.getElementById('p1')
//     reference.appendChild(el)
// });
