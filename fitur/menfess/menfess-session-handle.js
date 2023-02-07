const fs = require("fs");

const addSession = async(nomorPengirim) => {
    let json = await fs.readFileSync("./fitur/menfess/menfess-session.json","utf-8");
    let array = JSON.parse(json);
    const defaultSession = {"nomorPengirim":nomorPengirim,"nomorPenerima":false,"namaPengirim":false,"statusBalas":false,"ambilData":false,"firstMessage":true};
    array.push(defaultSession);
    json = JSON.stringify(array);
    await fs.writeFileSync("./fitur/menfess/menfess-session.json",json,"utf-8");
    return(true)
}

const deleteSession = async(nomorPengirim) => {
    let json = await fs.readFileSync("./fitur/menfess/menfess-session.json","utf-8");
    let array = JSON.parse(json);
    for(let a=0;a<array.length;a++){
        if(array[a]["nomorPengirim"] == nomorPengirim){
            array.splice(a, 1);
            json = JSON.stringify(array);
            await fs.writeFileSync("./fitur/menfess/menfess-session.json",json,"utf-8");
            return(true);
        }
    }
    return(false);
}

const addNomorPenerima = async(nomorPengirim, nomorPenerima) => {
    let json = await fs.readFileSync("./fitur/menfess/menfess-session.json","utf-8");
    let array = JSON.parse(json);
    for(let a=0;a<array.length;a++){
        if(array[a]["nomorPengirim"] == nomorPengirim){
            array[a]["nomorPenerima"] = nomorPenerima;
            json = JSON.stringify(array);
            await fs.writeFileSync("./fitur/menfess/menfess-session.json",json,"utf-8");
            return(true);
        }
    }
}

const addNamaPengirim = async(nomorPengirim, namaPengirim) => {
    let json = await fs.readFileSync("./fitur/menfess/menfess-session.json","utf-8");
    let array = JSON.parse(json);
    for(let a=0;a<array.length;a++){
        if(array[a]["nomorPengirim"] == nomorPengirim){
            array[a]["namaPengirim"] = namaPengirim;
            json = JSON.stringify(array);
            await fs.writeFileSync("./fitur/menfess/menfess-session.json",json,"utf-8");
            return(true);
        }
    }
}

const cekDariPengirim = async(nomorPengirim) => {
    let json = await fs.readFileSync("./fitur/menfess/menfess-session.json","utf-8");
    let array = JSON.parse(json);
    for(let a=0;a<array.length;a++){
        if(array[a]["nomorPengirim"] == nomorPengirim){
            return(array[a]);
        }
    }
    return(false);
}

const cekDariPenerima = async(nomorPenerima) => {
    let json = await fs.readFileSync("./fitur/menfess/menfess-session.json","utf-8");
    let array = JSON.parse(json);
    for(let a=0;a<array.length;a++){
        if(array[a]["nomorPenerima"] == nomorPenerima){
            return(array[a]);
        }
    }
    return(false);
}

const cekNamaPengirim = async(nomorPengirim) => {
    let json = await fs.readFileSync("./fitur/menfess/menfess-session.json","utf-8");
    let array = JSON.parse(json);
    for(let a=0;a<array.length;a++){
        if(array[a]["nomorPengirim"] == nomorPengirim){
            return(array[a]['namaPengirim']);
        }
    }
    return(false);
}

const cekNomorPenerima = async(nomorPengirim) => {
    let json = await fs.readFileSync("./fitur/menfess/menfess-session.json","utf-8");
    let array = JSON.parse(json);
    for(let a=0;a<array.length;a++){
        if(array[a]["nomorPengirim"] == nomorPengirim){
            return(array[a]['nomorPenerima']);
        }
    }
    return(false);
}

const cekStatusBalas = async(nomorPenerima) => {
    let json = await fs.readFileSync("./fitur/menfess/menfess-session.json","utf-8");
    let array = JSON.parse(json);
    for(let a=0;a<array.length;a++){
        if(array[a]["nomorPenerima"] == nomorPenerima){
            return(array[a]["statusBalas"]);
        }
    }
    return(false);
}

const setTrueStatusBalas = async(nomorPenerima) => {
    let json = await fs.readFileSync("./fitur/menfess/menfess-session.json","utf-8");
    let array = JSON.parse(json);
    for(let a=0;a<array.length;a++){
        if(array[a]["nomorPenerima"] == nomorPenerima){
            array[a]["statusBalas"] = true;
            json = JSON.stringify(array);
            await fs.writeFileSync("./fitur/menfess/menfess-session.json",json,"utf-8");
            return(true);
        }
    }
}

const cekStatusAmbilData = async(nomorPengirim) => {
    let json = await fs.readFileSync("./fitur/menfess/menfess-session.json","utf-8");
    let array = JSON.parse(json);
    for(let a=0;a<array.length;a++){
        if(array[a]["nomorPengirim"] == nomorPengirim){
            return(array[a]["ambilData"]);
        }
    }
    return(false);
}

const setTrueAmbilData = async(nomorPengirim) => {
    let json = await fs.readFileSync("./fitur/menfess/menfess-session.json","utf-8");
    let array = JSON.parse(json);
    for(let a=0;a<array.length;a++){
        if(array[a]["nomorPengirim"] == nomorPengirim){
            array[a]["ambilData"] = true;
            json = JSON.stringify(array);
            await fs.writeFileSync("./fitur/menfess/menfess-session.json",json,"utf-8");
            return(true);
        }
    }
}

const setFalseAmbilData = async(nomorPengirim) => {
    let json = await fs.readFileSync("./fitur/menfess/menfess-session.json","utf-8");
    let array = JSON.parse(json);
    for(let a=0;a<array.length;a++){
        if(array[a]["nomorPengirim"] == nomorPengirim){
            array[a]["ambilData"] = false;
            json = JSON.stringify(array);
            await fs.writeFileSync("./fitur/menfess/menfess-session.json",json,"utf-8");
            return(true);
        }
    }
}

const cekStatusFirstMessage = async(nomorPengirim) => {
    let json = await fs.readFileSync("./fitur/menfess/menfess-session.json","utf-8");
    let array = JSON.parse(json);
    for(let a=0;a<array.length;a++){
        if(array[a]["nomorPengirim"] == nomorPengirim){
            return(array[a]["firstMessage"]);
        }
    }
    return(false);
}

const setFalseFirstMessage = async(nomorPengirim) => {
    let json = await fs.readFileSync("./fitur/menfess/menfess-session.json","utf-8");
    let array = JSON.parse(json);
    for(let a=0;a<array.length;a++){
        if(array[a]["nomorPengirim"] == nomorPengirim){
            array[a]["firstMessage"] = false;
            json = JSON.stringify(array);
            await fs.writeFileSync("./fitur/menfess/menfess-session.json",json,"utf-8");
            return(true);
        }
    }
}


module.exports = {addSession, deleteSession, cekDariPengirim, cekDariPenerima, cekNamaPengirim, cekNomorPenerima, cekStatusBalas, setTrueStatusBalas, cekStatusAmbilData, setTrueAmbilData, setFalseAmbilData, addNamaPengirim, addNomorPenerima, cekStatusFirstMessage, setFalseFirstMessage}