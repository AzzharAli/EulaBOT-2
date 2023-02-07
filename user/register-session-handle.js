const { assert } = require("console");
const fs = require("fs");

const addSessionRegister = async(nomor) => {
    let json = await fs.readFileSync("./user/register-session.json","utf-8");
    let array = JSON.parse(json);
    const defaultSession = {"nomor":nomor,"completeNama":false,"completeGender":false,"completeUmur":false,"completeHobi":false,"ambilData":false,"wrongAnswer":false};
    array.push(defaultSession);
    json = JSON.stringify(array);
    await fs.writeFileSync("./user/register-session.json",json,"utf-8");
    return(true)
}

const deleteSessionRegister = async(nomor) => {
    let json = await fs.readFileSync("./user/register-session.json","utf-8");
    let array = JSON.parse(json);
    let jumlahArray = array.length;
    for(let a=0;a<jumlahArray;a++){
        if(array[a]["nomor"] == nomor){
            array.splice(a,1);
            json = JSON.stringify(array);
            await fs.writeFileSync("./user/register-session.json",json,"utf-8");
            return(true)
        }
    }
    return(false)
}

const cekCompleteNama = async(nomor) => {
    let json = await fs.readFileSync("./user/register-session.json","utf-8");
    let array = JSON.parse(json);
    let jumlahUser = array.length;
    for(let a=0;a<jumlahUser;a++){
        if(array[a]["nomor"] == nomor){
            return(array[a]['completeNama']);
        }
    }
    return(false);
}

const completingNama = async(nomor, nama) => {
    let json = await fs.readFileSync("./user/register-session.json","utf-8");
    let array = JSON.parse(json);
    let jumlahUser = array.length;
    for(let a=0;a<jumlahUser;a++){
        if(array[a]["nomor"] == nomor){
            array[a]['completeNama'] = nama;
            json = JSON.stringify(array);
            await fs.writeFileSync("./user/register-session.json",json,"utf-8");
            return(true)
        }
    }
    return(false)
}

const cekCompleteGender = async(nomor) => {
    let json = await fs.readFileSync("./user/register-session.json","utf-8");
    let array = JSON.parse(json);
    let jumlahUser = array.length;
    for(let a=0;a<jumlahUser;a++){
        if(array[a]["nomor"] == nomor){
            return(array[a]['completeGender']);
        }
    }
    return(false);
}

const completingGender = async(nomor, gender) => {
    let json = await fs.readFileSync("./user/register-session.json","utf-8");
    let array = JSON.parse(json);
    let jumlahUser = array.length;
    for(let a=0;a<jumlahUser;a++){
        if(array[a]["nomor"] == nomor){
            array[a]['completeGender'] = gender;
            json = JSON.stringify(array);
            await fs.writeFileSync("./user/register-session.json",json,"utf-8");
            return(true);
        }
    }
    return(false)
}

const cekCompleteUmur = async(nomor) => {
    let json = await fs.readFileSync("./user/register-session.json","utf-8");
    let array = JSON.parse(json);
    let jumlahUser = array.length;
    for(let a=0;a<jumlahUser;a++){
        if(array[a]["nomor"] == nomor){
            return(array[a]['completeUmur']);
        }
    }
    return(false);
}

const completingUmur = async(nomor, umur) => {
    let json = await fs.readFileSync("./user/register-session.json","utf-8");
    let array = JSON.parse(json);
    let jumlahUser = array.length;
    for(let a=0;a<jumlahUser;a++){
        if(array[a]["nomor"] == nomor){
            array[a]['completeUmur'] = umur;
            json = JSON.stringify(array);
            await fs.writeFileSync("./user/register-session.json",json,"utf-8");
            return(true)
        }
    }
    return(false)
}

const cekCompleteHobi = async(nomor) => {
    let json = await fs.readFileSync("./user/register-session.json","utf-8");
    let array = JSON.parse(json);
    let jumlahUser = array.length;
    for(let a=0;a<jumlahUser;a++){
        if(array[a]["nomor"] == nomor){
            return(array[a]['completeHobi']);
        }
    }
    return(false);
}

const completingHobi = async(nomor, hobi) => {
    let json = await fs.readFileSync("./user/register-session.json","utf-8");
    let array = JSON.parse(json);
    let jumlahUser = array.length;
    for(let a=0;a<jumlahUser;a++){
        if(array[a]["nomor"] == nomor){
            array[a]['completeHobi'] = hobi;
            json = JSON.stringify(array);
            await fs.writeFileSync("./user/register-session.json",json,"utf-8");
            return(true)
        }
    }
    return(false)
}

const cekWrongAnswer = async(nomor) => {
    let json = await fs.readFileSync("./user/register-session.json","utf-8");
    let array = JSON.parse(json);
    let jumlahUser = array.length;
    for(let a=0;a<jumlahUser;a++){
        if(array[a]["nomor"] == nomor){
            return(array[a]['wrongAnswer']);
        }
    }
    return(false);
}

const wrongAnswerTrue = async(nomor) => {
    let json = await fs.readFileSync("./user/register-session.json","utf-8");
    let array = JSON.parse(json);
    let jumlahUser = array.length;
    for(let a=0;a<jumlahUser;a++){
        if(array[a]["nomor"] == nomor){
            array[a]['wrongAnswer'] = true;
            json = JSON.stringify(array);
            await fs.writeFileSync("./user/register-session.json",json,"utf-8");
            return(true);
        }
    }
    return(false)
}

const wrongAnswerFalse = async(nomor) => {
    let json = await fs.readFileSync("./user/register-session.json","utf-8");
    let array = JSON.parse(json);
    let jumlahUser = array.length;
    for(let a=0;a<jumlahUser;a++){
        if(array[a]["nomor"] == nomor){
            array[a]['wrongAnswer'] = false;
            json = JSON.stringify(array);
            await fs.writeFileSync("./user/register-session.json",json,"utf-8");
            return(true);
        }
    }
    return(false)
}

const cekAmbilData = async(nomor) => {
    let json = await fs.readFileSync("./user/register-session.json","utf-8");
    let array = JSON.parse(json);
    let jumlahUser = array.length;
    for(let a=0;a<jumlahUser;a++){
        if(array[a]["nomor"] == nomor){
            return(array[a]['ambilData']);
        }
    }
    return(false);
}

const ambilDataTrue = async(nomor) => {
    let json = await fs.readFileSync("./user/register-session.json","utf-8");
    let array = JSON.parse(json);
    let jumlahUser = array.length;
    for(let a=0;a<jumlahUser;a++){
        if(array[a]["nomor"] == nomor){
            array[a]['ambilData'] = true;
            json = JSON.stringify(array);
            await fs.writeFileSync("./user/register-session.json",json,"utf-8");
            return(true);
        }
    }
    return(false)
}

const ambilDataFalse = async(nomor) => {
    let json = await fs.readFileSync("./user/register-session.json","utf-8");
    let array = JSON.parse(json);
    let jumlahUser = array.length;
    for(let a=0;a<jumlahUser;a++){
        if(array[a]["nomor"] == nomor){
            array[a]['ambilData'] = false;
            json = JSON.stringify(array);
            await fs.writeFileSync("./user/register-session.json",json,"utf-8");
            return(true);
        }
    }
    return(false)
}

const returnDataUser = async(nomor) => {
    let json = await fs.readFileSync("./user/register-session.json","utf-8");
    let array = JSON.parse(json);
    let jumlahUser = array.length;
    for(let a=0;a<jumlahUser;a++){
        if(array[a]["nomor"] == nomor){
            return(array[a]);
        }
    }
    return(false);
}

const sessionList = async() => {
    let json = await fs.readFileSync("./user/register-session.json","utf-8");
    let array = JSON.parse(json);
    let jumlahUser = array.length;
    let data = "";
    for(let a=0;a<jumlahUser;a++){
        data = data+(a+1)+". "+array[a]["nomor"]+"\nNama : "+array[a]['completeNama']+"\nGender : "+array[a]['completeGender']+"\nUmur : "+array[a]['completeUmur']+"\nHobi : "+array[a]['completeHobi']+"\n\n\n";
    }
    if(data != ""){
        return(data);
    }else{
        return(false);
    }
}

module.exports = {addSessionRegister, deleteSessionRegister, cekCompleteNama, completingNama, cekCompleteGender, completingGender, cekCompleteUmur,completingUmur, cekCompleteHobi, completingHobi, cekAmbilData, ambilDataTrue, ambilDataFalse, returnDataUser, cekWrongAnswer, wrongAnswerTrue, wrongAnswerFalse, sessionList};
