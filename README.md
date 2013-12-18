BYU CS360 Web Application - Vicci Front End
-------------------------------------------

##Instructions
**Website:** www.getvicci.com/alphaManager

##Idea, Features, and Architecture


####What: 
Vicci Mobile Merchandise Client Web-Portal

####Who will use this: 
Clients ranging from One Direction to the Seattle Seahawks

####Background:
 Vicci is a mobile based tech start-up founded by BYU students. We empower live events to sell merchandise through their fan’s phones. We are launching our iOS and Android apps this December with the Donny and Marie Osmond tour where our apps will be used by fans to purchase merchandise from their phones rather than dealing with the hassle of buying it from a physical merch booth. 

####Project: 
A web based Event and Merchandise management application. Currently, only someone with trained programming experience can input the Event and Merchandise data required for the apps to run. We want to create a web app in order to make it so simple that Taylor Swift herself can do it. This application will allow our clients to login and easily create and manage the merchandise they want Vicci to sell at their events. 

[Framework](http://prezi.com/fmcpz_xb-mhz/?utm_campaign=share&utm_medium=copy)


####Team:
Mikey Murphy, Joey Cozza, Jin Lee, Adam Christiansen

##Milestone 1

We have invested a significant amount of our time on design, architecture and user experience. We worked closely with Vicci’s CEO and the rest of the non-technical Vicci team to gain an understanding of the needs to be met.  After presenting our final design and wire frames to the Vicci team and incorporating their positive feedback, we submitted our designs to the professional designer that we have access to. 

While waiting for the designs, we have been individually going through Angular and Node tutorials.

Our final Interface Design can be seen on this [Prezi](http://prezi.com/ht31clpy510w/?utm_campaign=share&utm_medium=copy)

##Milestone 2

At this point in the project, we have made a lot of progress on the front end. The way thay we designed our app allows us to keep the same basic structure for all of our views, which simplified our work. We are successfully using Angular to read in a JSON object, and populate our page with that data. Also, most of the styling and CSS is also finished for those pages.  

Our biggest hurdle at this point is with our backend.  We have to integrate our Node server with existing an database and things aren't working as easily as we had hoped.  We have made a copy of the database and can host it locally, but we can't get our Node server to query it for data we need.  We will be speaking with Dr. Zappala today to get a little help with this issue.   



##Final Writeup

####Description: 
We have created a web based Event and Merchandise management application. Before, only someone with trained programming experience and authorized by Vicci could input the Event and Merchandise data required for the app to run. We have created a web app in order to make it so simple that Taylor Swift herself can do it. Our application allows our clients to login and easily create and manage the merchandise they want Vicci to sell at their events.

####Functionality: 
+ Login
+ View/add/delete artists
+ View/add/delete events for an artist
+ View/add/delete product categories
+ View/add/delete products


####Database Schema:
We used a MySQL database to store all of our information. We chose this mostly because the backend for our existing code (the web portal for purchasing the merchandise) was already in a MySQL database, and it just made sense to keep it consistent with the existing code.  From what we have read and heard, MongoDB would have been much easier to use with our NodeJS backend, but consistency took precedence. 

Our entity-relationship diagram can be found on lucid chart [here](http://www.lucidchart.com/invitations/accept/52aff6d2-c7b0-467d-ac1a-7e830a004ef4)

####Contributions:

**Adam: The all around handy man** - Made a login page. Assisted with routing and html partials. Extensive research into authentication with node.js and passport.  After going through many Angular tutorials, I aided Jin, the Angular Archangel, with creating the front end of our web app.  This included creating partials, routing those partials, creating controllers for the partials, and debugging. Authentication proved to be pretty tricky and is something we are looking to improve upon in the upcoming weeks (outside the scope of class).  Ulitimately, our app will use OAuth and allow users to login/signin with LinkedIn and potentially other social media portals.

**Joey: Node Ninja** - I started by learning NodeJS.  After playing with Node and Express for a while, I started making our node server that initially just served up pages.  After taking FOREVER to get a local MySQL database running on my machine, I was able to start testing the Sequelize module within Node. It turns out that Sequelize has very poor documentation.  I was only able to use a very basic functionality of it to communicate with our database.  I ended up building query statements with escaped user input. If I had more time, I would have figured out the more "correct" way of using Table representation objects in Sequelize and using parameterized queries with all of that. The next large hurdle was getting our Node server to talk to the AWS, and linking with that.  It was annoying work to do because someone else had all of the passwords and information for that stuff.  After our front-end angular code was up and running, Jin and I got Node and Angular talking to each other and sending appropriate data back and forth.  This took a lot of work and a lot of man hours.  We spent a combined 26 hours of work on it that Saturday. We implemented GET, PUT, POST, and DELETE functionality within our app.  It was a great day.     

**Jin: Angular Archangel** - My main focus in the beginning was to really understand AngularJS. This required a little bit of playing around in NodeJS but not to the extent Joey was researching. I followed the AngularJS tutorial and worked on understanding how everything worked together and what everything meant. While following the tutorial, I worked on some basic pages for our app. After finishing the tutorial, I worked on creating all the pages for our web application. This required doing some basic HTML markup (leaving the styling to Mikey) with AngularJS directives embedded within the files. These files were all placed in the app/partials directory. Then I worked heavily on creating the angular controllers that would be associated with each page. All these controllers are in the app/js/controllers.js file. After each page was rendering properly, I worked on connecting each page to each other or in other words, the routing. All the routing code is placed in the app/js/app.js code. The route provider tells javascript which template and controller to use.
Once all of these pages were connecting to each other and rendering properly, Joey and I had to connect the NodeJS server with our Angular/app code. The tricky part here was that the database had some access restrictions and I had to create dummy data and dummy json files that were somehow modeled after what the database would return. As a result, I spent a lot of time rewriting our HTTP function calls to match with Joey's NodeJS server. The rewrite required me to do the proper HTTP method call with the appropriate data. One Saturday, we worked on getting all the Methods working properly. In the end of that wonderful day, we were able to query the database and dynamically create the pages. We were even able to add objects and remove objects from the database.
After connecting the NodeJS server and the AngularJS code, I worked with Mikey and Adam to work on Authentication. Authentication proved to be extremely tough and tricky. Since Authentication required a good amount of angularJS changes, I needed to help on the functionality.

**Mikey: Styling Wizard** - As the team leader for this app, I was in charge of deciding on the important functionality for this iteration, as well as the overall design of the app.  I already had a knowledge of the existing framework and server that Vicci was using, so a lot of my time was spent bringing the rest of the team up to speed on what was already in place.  I spent my time researching both Angular and Node and was able to help out with any piece of the app, front or backend.  After the front end was developed I added all the css styling to the pages.


####Future Work:
One of the major pieces that needs to be implemented next is the Artist Approval functionality. When a user makes the artist and all of their data beneath it, they will then have to get it approved by an admin before that data will show up on the mobile app for fans to purchase those products.  When a user submits an artist for approval, they will provide enough information for us to validate that they have permissions to "manage" that artist. This can include name, phone number, email address, linked-in, etc. This is the key reason we made this front-end portal.  The managers (users) will provide us with all the images and information, and all we have to do it approve or deny them. 

On the next iteration, we want to make the app more user friendly.  There will be less inputs for the user to fill out in order to submit an event and product.  An example of this would be latitudes and longitudes. They will be queried from the address that the user already provided us for that event. There will also be functionality to either duplicate a product/category/event or make a global flag for them, so that product will show up in every category, or more likely to be used is that every event has a particular category.  This would lessen the amount of duplicated work that a user would have to input. We will also have the user upload an image instead of giving us a url for it.  This will allow them to crop the pictures immedietely before submitting, and then we will host the image resources locally.    

We also feel that adding the option for OAuth (especially social media logins) would make logging in more user friendly, and will look more into this option when we nail down some of the other functionality. 



