angular.module('twitterFeed.filters', [])

.filter('formatTwitterDate', function() {
    /*
        Calculates time ago
    */
    return function(input) {
            var rightNow = new Date();
            var then = new Date(input);

            var diff = rightNow - then;
            var second = 1000,
                minute = second * 60,
                hour = minute * 60,
                day = hour * 24,
                week = day * 7;
            if (isNaN(diff) || diff < 0) {
                return ""; // return blank string if unknown
            }
            if (diff < second * 2) {
                // within 2 seconds
                return "right now";
            }
            if (diff < minute) {
                return Math.floor(diff / second) + " seconds ago";
            }
            if (diff < minute * 2) {
                return "about 1 minute ago";
            }
            if (diff < hour) {
                return Math.floor(diff / minute) + " minutes ago";
            }
            if (diff < hour * 2) {
                return "about 1 hour ago";
            }
            if (diff < day) {
                return  Math.floor(diff / hour) + " hours ago";
            }
            if (diff > day && diff < day * 2) {
                return "yesterday";
            }
            if (diff < day * 365) {
                return Math.floor(diff / day) + " days ago";
            }
            else {
                return "over a year ago";
            }
    };
})

.filter('formatTwitterText', function() {
    /*
        Parses tweet text for links, hashes etc.
    */
    return function(tweet) {
        TweetFunc = {
            link: function (tweet) {
                return tweet.replace(/\b(((https*\:\/\/)|www\.)[^\"\']+?)(([!?,.\)]+)?(\s|$))/g, function (link, m1, m2, m3, m4) {
                    var http = m2.match(/w/) ? 'http://' : '';
                    return '<a class="twtr-hyperlink" ng-click="innapBrowser(\'' + http + m1 + '\')">' + ((m1.length > 25) ? m1.substr(0, 24) + '...' : m1) + '</a>' + m4;
                });
            },
            at: function (tweet) {
                return tweet.replace(/\B[@＠]([a-zA-Z0-9_]{1,20})/g, function (m, username) {
                    return '<a class="twtr-atreply" ng-click="innapBrowser(\'http://twitter.com/intent/user?screen_name=' + username + '\')">@' + username + '</a>';
                });
            },
            list: function (tweet) {
                return tweet.replace(/\B[@＠]([a-zA-Z0-9_]{1,20}\/\w+)/g, function (m, userlist) {
                    return '<a class="twtr-atreply" ng-click="innapBrowser(\'http://twitter.com/' + userlist + '\')">@' + userlist + '</a>';
                });
            },
            hash: function (tweet) {
                return tweet.replace(/(^|\s+)#(\w+)/gi, function (m, before, hash) {
                    return before + '<a target="_blank" class="twtr-hashtag" ng-click="innapBrowser(\'http://twitter.com/search?q=%23' + hash + '\')">#' + hash + '</a>';
                });
            }
        }

        return TweetFunc.hash(TweetFunc.at(TweetFunc.list(TweetFunc.link(tweet))));
    }
});