const fs = require('fs');

class Database {
    constructor(filepath){
        let data;
        try {
            data = fs.readFileSync(filepath, 'utf-8');
        }catch(err){
            console.log(err.message);
            throw new Error(err);
        }

        try {
            this.data = JSON.parse(data);
        }catch(err){
            console.log(err.message);
            throw new Error(err);
        }
    }  
}