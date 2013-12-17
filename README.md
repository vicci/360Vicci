BYU CS360 Web Application - Vicci Front End
-------------------------------------------

###Idea, Features, and Architecture


**What:** Vicci Mobile Merchandise Client Web-Portal

Who will use this: Clients ranging from One Direction to the Seattle Seahawks

**Background:** Vicci is a mobile based tech start-up founded by BYU students. We empower live events to sell merchandise through their fan’s phones. We are launching our iOS and Android apps this December with the Donny and Marie Osmond tour where our apps will be used by fans to purchase merchandise from their phones rather than dealing with the hassle of buying it from a physical merch booth. 

**Project:** A web based Event and Merchandise management application. Currently, only someone with trained programming experience can input the Event and Merchandise data required for the apps to run. We want to create a web app in order to make it so simple that Taylor Swift herself can do it. This application will allow our clients to login and easily create and manage the merchandise they want Vicci to sell at their events. 

[Framework](http://prezi.com/fmcpz_xb-mhz/?utm_campaign=share&utm_medium=copy)


**Team:**
Mikey Murphy, Joey Cozza, Jin Lee, Adam Christiansen

###Milestone 1

We have invested a significant amount of our time on design, architecture and user experience. We worked closely with Vicci’s CEO and the rest of the non-technical Vicci team to gain an  understanding of the needs to be met.  After presenting our final design and wire frames to the Vicci team and incorporating their positive feedback, we submitted our designs to the professional designer that we have access to. 

While waiting for the designs, we have been individually going through Angular and Node tutorials.

Our final Interface Design can be seen on this [Prezi](http://prezi.com/ht31clpy510w/?utm_campaign=share&utm_medium=copy)

###Milestone 2

At this point in the project, we have made a lot of progress on the front end. The way thay we designed our app allows us to keep the same basic structure for all of our views, which simplified our work. We are succesfully using Angular to read in a JSON object, and populate our page with that data. Also, most of the styling and CSS is also finished for those pages.  

Our biggest hurdle at this point is with our backend.  We have to integrate our Node server with existing an database and things aren't working as easily as we had hoped.  We have made a copy of the database and can host it locally, but we can't get our Node server to query it for data we need.  We will be speaking with Dr. Zappala today to get a little help with this issue.   



###Final Writeup

**Description:** 
We have created a web based Event and Merchandise management application. Before, only someone with trained programming experience and authorized by Vicci could input the Event and Merchandise data required for the app to run. We have created a web app in order to make it so simple that Taylor Swift herself can do it. Our application allows our clients to login and easily create and manage the merchandise they want Vicci to sell at their events.

**Functionality:** 
+ Login
+ View/add/delete artists
+ View/add/delete events for an artist
+ View/add/delete product categories
+ View/add/delete products


**Database Schema:**
We used a MySQL database to store all of our information. We chose this mostly because the backend for our existing code (the web portal for purchasing the merchandise) was already in a MySQL database, and it just made sense to keep it consistent with the existing code.  From what we have read and heard, MongoDB would have been much easier to use with our NodeJS backend, but consistency took precidence. 

Our entity-relationship diagram can be found on lucid chart [here](http://www.lucidchart.com/invitations/accept/52aff6d2-c7b0-467d-ac1a-7e830a004ef4)

**Contributions:**
Describe in detail the contributions made by each member of the project. Each member is responsible for contributing a few paragraphs in this section.

**Future Work:**
Describe a roadmap for future development, with additional features you could add or changes to the interface.
Authentication?
