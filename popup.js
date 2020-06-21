function fetchStarImage(rating) {
    let review = rating.toString()
    if (review == '0') {
        return 'small_0.png'
    } else if (review == '1') {
        return 'small_1.png'
    } else if (review == '1.5') {
        return 'small_1_half.png'
    } else if (review == '2') {
        return 'small_2.png'
    } else if (review == '2.5') {
        return 'small_2_half.png'
    } else if (review == '3') {
        return 'small_3.png'
    } else if (review == '3.5') {
        return 'small_3_half.png'
    } else if (review == '4') {
        return 'small_4.png'
    } else if (review == '4.5') {
        return 'small_4_half.png'
    } else if (review == '5') {
        return 'small_5.png'
    }
}


(async () => {
    const tabs = await browser.tabs.query({active: true, currentWindow: true});
    const property = await browser.tabs.sendMessage(tabs[0].id, {type: 'getRes'});
    console.log(JSON.stringify(property))
    $.ajax({
        //http://localhost:5000/
        //http://jiajianwu.pythonanywhere.com/
        url: "http://jiajianwu.pythonanywhere.com/",
        type: "POST",
        data: JSON.stringify(property),
        contentType: 'application/json',
        dataType: 'json'
    }).done(function (response) {
        console.log(property)
        console.log(response)
        //response is an json "object"

        writeHeader(response)

        let el = document.createElement("div")
        el.setAttribute('id', 'div1')
        for (let i = 0; i < response["reviews"].length; i++) {

            let link = response["reviews"][i].url
            let l = document.createElement("a")
            l.setAttribute('href', link)
            l.setAttribute('target', "_blank")
            l.textContent = "Go to Yelp for detailed review"

            el.innerHTML += "User Name: " + response["reviews"][i].user.name + "<br />" + "Review Rating: "

            let image_name = fetchStarImage(response["reviews"][i].rating)
            let image_el = document.createElement("img")
            image_el.setAttribute('src', 'stars/' + image_name)
            el.appendChild(image_el)

            el.innerHTML += '<br />' + '<em>' + response["reviews"][i].text + '</em>' + '<br />'
            el.appendChild(l)

            el.innerHTML += '<hr />'
        } //end of for loop


        let reference = document.getElementById('p2')
        reference.appendChild(el)
    });


})();


function writeHeader(response) {
    // final['photos'], final['name'], final['rating'], final['review_count'], final['price'], final['categories']
    let el = document.createElement("div")
    el.innerHTML = "<h1>" + response['name'] + "</h1>"

    let url = document.createElement("a")
    url.setAttribute("href", response['url'])
    url.setAttribute('target', "_blank")
    url.textContent = "Go to the Yelp page here"
    el.appendChild(url)
    el.innerHTML += "<hr />"

    let image_name = fetchStarImage(response["rating"])
    let image_el = document.createElement("img")
    image_el.setAttribute('src', 'stars/' + image_name)
    image_el.setAttribute('width', "110")
    image_el.setAttribute('height', "20")
    el.appendChild(image_el)

    if ('review_count' in response) {
        el.innerHTML += "<span> " + response['review_count'] + " reviews <br/>" + "</span>"
    }

    if ('price' in response) {
        el.innerHTML += "<span>" + response['price'] + " </span>"
    }

    if ('categories' in response) {
        let categories = document.createElement("span")
        categories.setAttribute("id", "categories")
        for (let i = 0; i < response['categories'].length; i++) {
            let comma = ", "
            if (i === response['categories'].length - 1) {
                comma = ""
            }
            categories.textContent += response['categories'][i]['title'] + comma
        }
        el.appendChild(categories)
    }

    el.innerHTML += "<hr />"

    if ('photos' in response) {
        for (let i = 0; i < response['photos'].length; i++) {
            let photo = document.createElement("img")
            photo.setAttribute('src', response['photos'][i])
            photo.setAttribute('alt', "Sorry, the image failed to load")
            photo.width = 250
            photo.height = 250
            el.appendChild(photo)
        }
    }

    let reference = document.getElementById("p1")
    reference.appendChild(el)
}


// $.ajax({
//     //http://localhost:5000/
//     //http://jiajianwu.pythonanywhere.com/
//     url: "http://localhost:5000/",
//     type: "POST",
//     contentType: 'application/json',
//     data: JSON.stringify(r),
//     dataType: 'json'
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

