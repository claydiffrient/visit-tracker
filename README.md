visit-tracker
=====================

**WORK IN PROGRESS**

This is an app that allows people to track the last time they saw people as
well as add notes about the visits.  It's current designed use is so that an
Elder's Quorum Presidency can track the visits they go on to members of their
quorum.  If that sounds foreign to you, check out http://mormon.org to learn
more about The Church of Jesus Christ of Latter-day Saints.

## Technical Details

There are 3 pieces to the app:
 - REST API
 - Web App
 - Mobile App

### REST API

The API is the meat of the entire application, it is the way which both the web
app and the mobile app will reach the actual data.

The API is built with the Express framework on Node.  The routes are RESTful in
design.  For example,

```
GET /persons        returns a list of persons in the database
GET /persons/:id    returns the details for the person with the given id.
```

The data itself is being stored in a MongoDB database.  Access to the database
is handled through the Mongoose ORM.  The planned data model for the application
is as follows:

User - Represents a registered user of the application with access to all the data
Person - Represents someone that is being tracked by the application
Visit - Represents a visit given to a Person

### Web App

The Web App will be the ideal experience to use from a desktop or laptop web
browser.  It is being built using React.js and will be hosted on a lightweight
Node server.  It will interface with the REST API to retrieve all data necessary
to show the data as well as take data and generate reports.

### Mobile App

The Mobile App will be the best experience on iOS and Android devices.  It is
being written with React Native so that some code can be shared between the
Web App as well as the iOS/Android Apps.

## Development

In order to make development fairly simple, the app can be developed locally
with Docker.  If you are on a Mac, this is aided extremely by using the Dinghy
application (https://github.com/codekitchen/dinghy).

Once you have your docker environment set up, to get started it should be
as running:

```
$ docker-compose up
```

This will start up all the necessary dependencies for the app to run.  Then
editing code in the `src/api` or src/web` directories will allow changes to
be reflected in your browser.  The API will be running at http://visitapi.docker.
The Web App will be running at http://visit.docker.

## Deployment

This app is being developed with the intention of each piece (other than the Mobile App)
running on Heroku for a quick and easy deployment situation.  Depending on your
needs you'll need to deploy it to the proper size of app servers.  It should run
fairly effortlessly on the Free tier (assuming your okay with 6 hours of downtime each day).

Although specifically this is being targeted towards Heroku, it should work wherever
a Docker container can run.