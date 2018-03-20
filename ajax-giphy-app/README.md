# Ajax- Gify assignment
# This is the ajax homework
# completed base assignment
# addition features
#- if Giphy username exists print and link it
#	else if print and link Source field
#	else if Source field is blank link to YouTube video of Schultz 		from Hogan's heros
#
#- added twitter link if it exists - colored and linked font awesome to twitter page
#	- handled case where twitter field did not have the @ symbol on the twitter feed name - ex. mlb
#
#- auto centers image within bootstrap div
#
#- trimmed off the time of the date/time for display purposes in Giphy query
#
#- clear input box after submit it is clicked
#
#- boxes on top are colorcoded for the DB that they were queried from originally
#
#- hover over the image for alt data - just added the same data to title=""
#- used local storage to remember buttons on page reload
#
#
# TODO
#	- load button with movie title name  - is there a way to get the processing to wait for the ajax
#       response...currently it doesn't get filled in time for use in creating the button
#	- cookies
#		- I can see the cookie written once buttons are populated....but I can't seed the array from the cookie.
#       sort of works in firefox on reload but doesn't exist after browser restart.
#	- favorites
#		- not started
#	- add Library of Congress API	
#		- No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'null' is therefore 
#       not allowed access.
#	- 1 click download
#		- works if I use local file...URL it just links to the image in a new window.
