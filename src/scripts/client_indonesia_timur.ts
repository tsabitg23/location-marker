import { getCoordinate } from "../maps/generate_coordinate";
import clients from "../data/input/customer_indonesia_timur.json";
import bluebird from "bluebird";
import fs from 'fs';
import path from 'path';
import { createJSONFile } from "../data/lib/from_json";

interface ICoordinate {
    lat: number;
    lng: number;
}

(async()=>{
    const indTimurClients = clients['IND TIMUR'];
    let regionName = '';
    const clientList = await bluebird.mapSeries(indTimurClients, async (client: { ALAMAT: string, 'NAMA WILAYAH'?: string})=>{
        const coordinate:ICoordinate = await getCoordinate(client.ALAMAT);
        if(client['NAMA WILAYAH']){
            regionName = client['NAMA WILAYAH'];
        }
        const formattedData = {
            ...client,
            ...coordinate,
            'NAMA WILAYAH': regionName
        };

        return formattedData;
    });

    // write clientList into json file in data/output with name client_indonesia_timur.json with fs module
    createJSONFile(clientList, 'client_indonesia_timur');
    
})()