const request = require('request');

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiY2hhbmR1MzI0NSIsImEiOiJjanp3aXFpNmIwMHdqM3Buc2Y4ZDRxem9pIn0._ILQminXZMdimbOgTwOgag&limit=1";
    request({ url, json: true }, (error, {body} = {} ) => {
        if (error) {
            callback("Unable to connect to location services", undefined);
        } else if (!body.features || body.features.length === 0) {
            callback("Cannot find location, try another search", undefined);
        } else {
            const longitude = body.features[0].center[0];
            const latitude = body.features[0].center[1];
            const location = body.features[0].place_name;
            callback(undefined, {latitude, longitude, location});
        }
    })
}

module.exports = geocode;