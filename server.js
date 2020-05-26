const express = require('express');
const Twitter = require('twitter');
const config = require('./config.js');

const T = new Twitter(config);

const searchTweetsParams = {
    q: '@ovagocom', //query param to search for
    count: 3,
    result_type: 'mixed',
    lang: 'en',
    include_entities: true
}
const searchUserStatusParams = {
    // user_id: '983734227148603393',
    screen_name: 'kellyy0ung',//'OvagoCom',
    count: 3
}
// const params = searchTweetsParams;
const params = searchUserStatusParams;

// const url = 'search/tweets.json'; 
const url = 'statuses/user_timeline.json';

function getData(url, params) {
    T.get(url, params, (err, data, response) => {
        if(!err) {
            // console.log(data);
            for(let i=0; i < data.length; i++) {
                // console.log(data[i].id_str);
                // console.log('Id string of tweet', data[i].id_str, data[i]);
                console.log('User id', data[i].user.id_str, data[i].user.screen_name);
                let tweetId = data[i].id_str;
                let userScreenName = data[i].user.screen_name;
                tweet(tweetId, userScreenName);
            }
            
    
        } else {
            console.log("Error with get search, ", err);
        }
    })
}

getData(url, params);

function searchTweetsWork(){
    for(let i=0; i< data.statuses.length; i++) {
        //get tweet id from returned data
        let id = { id: data.statuses[i].id_str }
        console.log(data.statuses[i].entities.user_mentions);

    }
}

function tweet(id, userScreenName) {
    let params = {
        in_reply_to_status_id: id,
        status: `@${userScreenName} Hi, I'm testing a twitterbot. Sorry for the spam, its in the name of science.`
    };
    
    T.post('statuses/update', params, (err, response)=> {
        if(err) {
            console.log(err[0].message);
        } else {
            let username = response.user.screen_name; 
            let tweetId = response.id_str;
            console.log('Commented ', `https://twitter.com/${username}/status/${tweetId}`)
            console.log(username, tweetId);
        }
        
    });
    
}
       