import express from "express";
import cors from "cors";

const server = express();
server.use(cors())
server.use(express.json());

const users = []

const tweets = []

server.post('/sign-up', (req, res) => {
    const { username, avatar } = req.body;
    users.push({ username, avatar });
    res.send("OK");
})

server.post('/tweets', (req, res) => {
    const { username, tweet } = req.body;
    tweets.push({ username, tweet });
    res.send("OK");
})

server.get('/tweets', (req, res) => {
    let tweetWithPicture = [];

    for (let i = 0; i < tweets.length; i++) {
        for (let index = 0; index < users.length; index++) {
            if (tweets[i].username === users[index].username) {
                tweetWithPicture = [
                    ...tweetWithPicture,
                    {
                        username: tweets[i].username,
                        avatar: users[index].avatar,
                        tweet: tweets[i].tweet
                    }
                ];
            };
        };
    };

    tweetWithPicture.reverse();
    const lastTenTweets = tweetWithPicture.slice(0,10);
    console.log(lastTenTweets);
    res.send(lastTenTweets);
})


server.listen(5000, function () {
    console.log("listen on 5000")
})