# About
Seeing that many people are looking for a solution to display twitter timelines and feeds in Ionic I decided to post mine, it is using twitter Application-only authentication so you don't need user login bulshit.

This Demo contains simple example app, with some design, and few filters for pulling hashTags from text, formating date to 'time ago' etc. 

![Twitter feed screenshot](/www/img/twitter-feed-ionic.jpeg?raw=true "Twitter feed screenshot")

## Installation

To test you need to pull this repository, add desired platform and replace Consumer API Keys you get when you create app on https://apps.twitter.com/

Replace this two lines in services.js
```sh
var consumerKey = "you Consumer Key (API Key) here";
var consumerSecret = "you Consumer Secret (API Secret) here";
```

## NOTE
You wont be able to see the feed with ionic serve command, because of cross-origin resource sharing not being enabled in browser. Build on phone to see results.

## Twitters Application-only authentication?
https://dev.twitter.com/oauth/application-only

With Application-only authentication you don’t have the context of an authenticated user and this means that any request to API for endpoints that require user context, such as posting tweets, will not work. However, the set of endpoints that will still be available can have a higher rate limit.

Your app will be able to, for example:

  - Pull user timelines;
  - Access friends and followers of any account;
  - Access lists resources;
  - Search in tweets;
  - Retrieve any user information;

And it won’t be able to:
  - Post tweets or other resources;
  - Connect in Streaming endpoints;
  - Search for users;
  - Use any geo endpoint;
  - Access DMs or account credentials;

### Demo version
0.0.1

### Tech
* [Ionic] - Advanced HTML5 Hybrid Mobile App Framework

[Ionic]:http://ionicframework.com/
