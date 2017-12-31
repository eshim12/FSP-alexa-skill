/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = undefined;

const SKILL_NAME = 'Insult Generator';
const WELCOME = "Welcome to flatiron insults. You can say insult persons name, or, you can say exit... ";
const INSULT_REPROMPT = "Insult again";
const INPUT_ERR = "I did not understand. Say insult or make fun of person's name.";
const HELP_MESSAGE = 'You can say insult persons name, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/lambda/data
//=========================================================================================================================================
const insults = [
    'Yo mamma so ugly even Bob the Builder said, "We cant fix it."',
    'Yo momma so ugly she threw a boomerang and it refused to come back.',
    'Yo momma so stupid, when I told her that she lost her mind, she went looking for it.',
    'Yo Mamas so stupid she was yelling into the mailbox. We ask her whats she doing and she said, she was sending a voice-mail.',
    'Yo Momma So Fat The Only Letters She Knows In The Alphabet Are K.F.C!',
    'Yo momma’s so ugly, the army doesn’t use guns any more – they use her picture.',
    "Yo Mama's cooking is so bad, the homeless give it back.",
    "yo momas so stupid when theives broke into her house and stole the TV she chased after them shouting ''wait you forgot the remote''.",
    'Yo mamma so fat I took a picture of her last Christmas and its still printing.',
    'Yo mama so ugly when Santa came down the chimney he said ho! ho! hoooollly shit!',
    'Yo Mama is so stupid, when they said, "Order in the court," she asked for fries and a shake.',
    'Yo momma so fat when she goes camping the bears hide their food.',
    'Yo momma so stupid that she brought a ruler to bed to see how long she could sleep.',
    'Yo momma is so poor the ducks throw bread at her.',
    'Yo mama so fat it took nationwide 3 years to get on her side.',
    'Yo mama so ugly when she went to the bathroom, she scared the shit out of the toilet.',
    'Your mamma is so fat when she steps on the scales it says one at a time please.',
    'Your mama is so ugly, that she made a blind kid cry.',
    'Yo mamas so fat that when she stepped on a scale, buzz lightyear came out and said "to infinity and beyond!"',
    "Yo mama's so fat, she's the reason why the universe is expanding.",
    'Yo Momma is so fat…That she broke a branch in her family tree!',
    'Yo momma so fat when she went to the circus the little girl asked if she could ride the elephant.',
    'Yo mama is so fat every time she sits down they add another country to the map.',
    'Yo Mama is so ugly, her imaginary friend played with other kids.',
    'Yo momma so fat when she steps on a scale it says TO BE CONTINUED...',
    'Yo momma so fat, she fell into a black hole and it clogged!',
    'Your mama so ugly, when she went to a stripping club, they paid her to keep her clothes on.',
    'Yo Mama is so fat, if she buys a fur coat, a whole species will become extinct.',
    'Yo Momma so stupid, she thought seaweed is something fish smoke.',
    'Yo momma is so stupid she stared at an orange juice container for 2 hours because it said concentrate.',
    "Yo momma so ugly that when she smiles in the mirror the reflection doesn't smile back.",
    'Yo Mama is so poor, she chases the garbage truck with a grocery list.',
    'Yo mamma is so fat, she got hit by a car and said: Who threw that rock???',
    "Yo mama's so fat, when she leaves the beach everybody shouts 'The coast is clear.'",
    "Yo mama so old her birth certificate says 'expired.'",
    'Your momma so fat...She put on her lipstick with a paint-roller.',
    'Yo mama so ugly people dress up as her for Halloween!',
    'Yo mama so fat Mount Everest tried to climb her.',
    "Yo Mommas so fat it took me a bus and two trains just to get on her good side.",
    "Yo mama so fat even dora cant explore her."
];

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    'LaunchRequest': function () {
        this.response.speak(WELCOME)
                    .listen(INSULT_REPROMPT);
        this.emit(':responseReady');
    },
    'InsultIntent': function () {
        const insultArr = insults;
        const insultIndex = Math.floor(Math.random() * insultArr.length);
        const randomInsult = insultArr[insultIndex];
        var c = this.event.request.intent.slots.name.value;
        const speechOutput = c + ", " + randomInsult;
        this.response.cardRenderer(SKILL_NAME, randomInsult);
        this.response.speak(speechOutput).listen(INSULT_REPROMPT);
        this.emit(':responseReady');

        // const https = require('https');
        // const myThis = this;
        // const options = {
        //     hostname: 'api.yomomma.info',
        //     port: '443',
        //     path: '/',
        //     method: 'GET'
        // };
        // const req = https.request(options, (res) => {
        //     console.log('statusCode:', res.statusCode);
        //     console.log('headers:', res.headers);

        //     res.on('data', (d) => {
        //         process.stdout.write(d);
        //     });
        // });

        // req.on('error', (e) => {
        //     console.error(e);
        // });
        // req.end();


    //     var responseString = '';
    //     var mythis = this;
    //     https.get('api.yomomma.info', (res) => {
    //   console.log('statusCode:', res.statusCode);
    //   console.log('headers:', res.headers);

    //   res.on('data', (d) => {
    //     responseString += d["joke"];
    //   });

    //   res.on('end', function(res) {
    //     const speechOutput = responseString;
    //     console.log('==> Answering: ', speechOutput);
    //     mythis.emit(':tell', 'The answer is'+speechOutput);
    //   });
    // }).on('error', (e) => {
    //   console.error(e);
    // });

        // const options = {
        //     hostname: 'api.yomomma.info',
        //     path: '/',
        //     method: 'GET'
        // };
        // var speechOutput = ''
        // var text = ''
        // var myThis = this
        // getInsult(options, function(insult) {
        //     if(insult === '') {
        //         speechOutput = "please try again later"
        //     } else {
        //         speechOutput = insult["joke"]
        //     }
        //     myThis.response.speak(speechOutput).listen(INSULT_REPROMPT)
        //     myThis.emit(':responseReady')
        // })

    },

    'UnhandledIntent': function() {
        this.response.speak(INPUT_ERR).listen(INSULT_REPROMPT);
        this.emit(':responseReady');
    },

    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

// function getInsult(options, callback) {
//     http.get(options, function(res) {
//         res.on("data", function(data) {
//             text = '' + data;
//             return callback(text)
//         })
//     }).on('error', function(e) {
//         text = 'error' + e.message;
//     })
// }
