from flask import Flask, request, jsonify
import requests
from difflib import SequenceMatcher

app = Flask(__name__)

YELP_API = 'JzSySFAoBGFSUnr6_-79wCKi8qWay7807d0E5n12a7Y-qeo0gBf8153QKjbs7OnOQ-TTgX65kPLUCqEOQpJOsHLVQNL9m8fszqcyGFSqbBnOj_CHyHLJnMJ_b2ndXnYx'


@app.route('/', methods=['POST'])
def get_review():
    # example: '40.7529000', '-73.9835000', 'Koi - New York Restaurant - New York, NY | OpenTable', '(212) 921-3330'
    r = request.get_json()
    latitude = r[0]
    longitude = r[1]
    name = r[2]
    phone = r[3]

    final = {}  # dict to hold all the info we need
    # get the matching business by "get_business" function
    unique_id = get_business(latitude, longitude, name, phone)
    if unique_id is None:
        return -1

    # get reviews
    url = 'https://api.yelp.com/v3/businesses/' + unique_id + '/reviews'
    headers = {'Authorization': f"Bearer {YELP_API}"}
    review_response = requests.get(url, headers=headers)
    review_response = review_response.json()
    final['reviews'] = review_response['reviews']
    print("the reviews are", final)

    # get business details
    url = 'https://api.yelp.com/v3/businesses/' + unique_id
    headers = {'Authorization': f"Bearer {YELP_API}"}
    detailed_info = requests.get(url, headers=headers)
    detailed_info = detailed_info.json()
    try:
        final['photos'] = detailed_info['photos']
        final['name'] = detailed_info['name']
        final['rating'] = detailed_info['rating']
        final['review_count'] = detailed_info['review_count']
        final['price'] = detailed_info['price']
        final['categories'] = detailed_info['categories']
        final['url'] = detailed_info['url']
    except:
        pass
    print(final.keys())
    # print(final['photos'], final['name'], final['rating'], final['review_count'], final['price'], final['categories'])
    return jsonify(final)


def get_business(latitude, longitude, name, phone):
    url = "https://api.yelp.com/v3/businesses/search?sort_by=distance&radius=300" + "&latitude=" + latitude + "&longitude=" + longitude
    headers = {'Authorization': f"Bearer {YELP_API}"}
    response = requests.get(url, headers=headers)
    response = response.json()['businesses']  # a list of dicts

    # for item in response:   # return all restaurants within the coordinates print(item['id'], item['name'],
    # ' Distance:', item['distance'], 'Address:', item['location']['address1'], item['phone'])

    similarity = 0
    target_id = None  # what we need to fetch the reviews
    target_name = None
    target_phone = None
    for item in response:
        score = similar(name, item['name']) + similar(phone, item['phone'])
        # print(item['name'], item['phone'], item['distance'], "   Score is ", score)
        if score > similarity:
            similarity = score
            target_id = item['id']
            target_name = item['name']
            target_phone = item['phone']
    # print('\nResult is: ', target_id, target_name, target_phone)

    return target_id


# function to evaluate the similarity of two strings. The higher the more similar.
def similar(a, b):
    return SequenceMatcher(None, a, b).ratio()


@app.after_request
def add_headers(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    return response


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
