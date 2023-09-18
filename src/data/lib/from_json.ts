import fs from 'fs';
import path from 'path';

export const createJSONFile = (data: any, filename: string) => {
    const filePath = path.join(__dirname, '../output', `${filename}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data));
    console.log('done writing file')
}