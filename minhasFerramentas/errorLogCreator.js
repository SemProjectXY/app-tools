const path = require('path');
const fs = require('fs');
class ErroLog {
    constructor(err) {
        this.erro = err;
        this.errorPath = path.resolve(__dirname, 'log.json');
        this.jsonErro = '';
        this.readFileTxt = '';
        this.data = new Array();
    }

    dateLog() {
        const date = new Date();
        let datDay = String(date.getDate());
        let datMonth = String(date.getMonth());
        let datYear = String(date.getFullYear());
        let datHour = String(date.getHours());
        let datMin = String(date.getMinutes());
        let datSec = String(date.getSeconds());
        if(datDay.length == 1) datDay = `0${datDay}`;
        if(datMonth.length === 1) datMonth = `0${datMonth}`;
        if(datHour.length === 1) datHour = `0${datHour}`;
        if(datMin.length === 1) datMin = `0${datMin}`;
        if(datSec.length === 1) datSec = `0${datSec}`;
        return `${datDay}/${datMonth}/${datYear} - ${datHour}:${datMin}:${datSec}`
    }
    async readFile() {
            const jsonFile = fs.readFileSync(this.errorPath, 'utf8');
            return jsonFile;
    }
    async jsonParser() {
        const date = this.dateLog();
        const jsonArray = { [date]: this.erro };
        const jsonFile = await this.readFile();
        const dataArray = JSON.parse(jsonFile);
        this.data = dataArray;
        this.data.push(jsonArray);
        this.jsonErro = JSON.stringify(this.data, null, 2);
    }
    async logError() {
        await this.jsonParser();
            fs.writeFile(this.errorPath, this.jsonErro , { flag: 'w' }, (err) => {
                if(err) {
                    console.log(err);
                    return;
                }
                console.log('salvo')
            });
    }
}

module.exports = ErroLog;