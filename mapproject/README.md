## Neighbourhood Map project
=========================
Author: Kranthi Kiran
Created on: 26-Jan-16
Description: This map project loads top 25 hotels in bangalore on google map.

#Features:
- Provides a list view of loaded hotels in bangalore for user to easy scroll
- The list view is inside a collapsable component so that user can close it on small devices or mobile screens
- Creates markers for each hotel on google map so that user can click on it to see the corresponding map card loaded
- User can realtime filter by providing fewl letters of hotel name in the search box

#Installing & local setup:
- Download the code from public git through HTTP/SSH links
- please install node module dependencies defined in project.json
	Steps:
	- Open command prompt and browse to the folder where project.json is available
	- run npm install as command to install all the modules defined in project.json
	- Once npm completes, run grunt command to compile and create dist folder
	- Browser inside the dist folder and start any web server of your choice.
	- I have installed npm http-server as web server which you can use and start the server inside the dist folder by typing the command 'http-server' in command prompt
	- open google canary incognito window and type http://localhost:8080 in the address bar
	- Application should run index.html by default

URL: http://kranthige.github.io/mapproject/

References:
https://developer.foursquare.com
https://developer.foursquare.com/docs/venues/venues
https://developers.google.com/maps/documentation/javascript/