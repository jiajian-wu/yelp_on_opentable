# Yelp on Uber Eats/OpenTable
This is an chrome extension to pull out **Yelp reviews** for the restaurant currently being viewed on **Uber Eats/OpenTable**

To download:  
Yelp on OpenTable: https://chrome.google.com/webstore/detail/yelp-on-opentable/folanbjakkilmeophjlnhgckfdeaocmf   
Yelp on Uber Eats: https://chrome.google.com/webstore/detail/yelp-on-uber-eats/nmcejkcdnjfmahaldafoeeamjfckneed   

## Python Flask Backend 
**app.py**: A Flask script to find the reviews of the restaurant whose properties are passed from AJAX in *popup.js*. Hosted in *pythonanywhere.com*

1. The Flask script receives four properties of the restaurant from AJAX JavaScript *popup.js*: 
**latitude, longitude, name of the restaurant, and phone number**.
2. The script then calls the Yelp API with latitude and longitude to receive a list of restaurants which are potential matches.
Note: With latitude and longitude, Yelp API would return a list of restaurants at that proximity.
3. Then the python built-in *SequenceMatcher* function from *difflib* module is utilize to score each restaurant based on a linear function: 
score = restaurant name *similarity* + phone number *similarity*.



