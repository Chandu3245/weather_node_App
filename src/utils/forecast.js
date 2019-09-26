const request = require('request');


const forecast = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/46595c80d3836fce5ae7d022b3bb6ff4/" + latitude + "," + longitude + "?units=si&lang=en";
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Cannot reach forecast services.", undefined);
        } else if (body.error) {
            callback("Unable to find location", undefined);
        } else {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                precipProbability: body.currently.precipProbability,
                highTemp: body.daily.data[0].temperatureHigh,
                lowTemp: body.daily.data[0].temperatureLow
            });
        }
    });
}

module.exports = forecast;