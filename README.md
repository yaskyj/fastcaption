FastCaption
===============

FastCaption is a project to make editing/creating captions for YouTube videos easier and hopefully, more collaborative.
Here is the live site: [FastCaption.org](http://www.fastcaption.org/)

Prerequisites
-------------

- [MongoDB](http://www.mongodb.org/downloads) - Since the application is running on Heroku, MongoLab was used for MongoDB.
- [Node.js](http://nodejs.org)

Getting Started
---------------
The easiest way to get started is cloning the repository:

```bash
# Get the latest snapshot
git clone --depth=1 https://github.com/yaskyj/fastcaption fastcaption

cd fastcaption

# Install NPM dependencies
npm install

# Create a .env file and populate it with the necessary API keys and secrets:
touch .env

```

Edit your .env file with the following API keys accordingly. Keep in mind if you want to use more services you'll have to get your own API keys for those services.

```
MONGOLAB_URI='mongodb://heroku_appRestOfStuff'

FACEBOOK_ID=stuff
FACEBOOK_SECRET=stuff

GITHUB_ID=stuff
GITHUB_SECRET=stuff

GOOGLE_ID=stuff
GOOGLE_SECRET=stuff

TWITTER_KEY=stuff
TWITTER_SECRET=stuff
```

In the root directory, the captions.json file contains all of the current captions in the live database.
