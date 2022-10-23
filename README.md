# PayNearBy

# App Url


# Use this app on server
* Open the App Url
* Screen will show APP IS RUNNING

# Use this app locally
* Download the codebase.
* Rename the .env_example to .env
* Inside .env file, change the PORT to 5000(anything) and CONNECTION_URL to the mongodb connection url.
* Open terminal and move to the files location and type "npm install".
* After installing type "npm start".

# Test the app
* Open any API tester app( like Postman)
* Make a POST request to 'baseURL/transaction/', citing variables as:- 
  * Customer_id
  * transaction_amount
  * Mobile_no
  * Pincode
  (The remaining fields of transaction_datetime, state and totalAmount will be automatically set)
* The Amount Filter can be tested by making a POST request to 'baseURL/transaction/filteramount', citing the variables as:-
  * lowerBound
  * upperBound
* The State Filter can be tested by making a POST request to 'baseURL/transaction/filterstate', citing the variable as:-
  * stateName
  
The Code is well commented for better understanding. Do let me know in case of some improvements or errors.
