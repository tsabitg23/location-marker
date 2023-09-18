require('dotenv').config()

const googleMapsClient = require('@google/maps').createClient({
    key: process.env.GOOGLE_MAPS_API_KEY,
});


const defaultEmptyLocation = {lat: null, lng: null};

export async function getCoordinate(address: string):Promise<{ lat: number; lng: number; }>{
    return new Promise((resolve,reject)=> {
        googleMapsClient.geocode({
            address:  address
        }, (err: any, response: { json: { results: any; }; })=>{
            if (!err) {
                const result = response.json.results;
                const location = ((result && result.length > 0) ? result[0]?.geometry?.location : defaultEmptyLocation) || defaultEmptyLocation;
                resolve(location)
            } else {
                console.log(err);
                return null;
            }
        });
    })
} 