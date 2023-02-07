const fs = require("fs");
const gachaHandle = require("../gacha/gacha-handle");

const tambahUser = async(nomor, nama, gender, umur, hobi) => {
    const userAvailable = await cekUser(nomor);
    if(userAvailable == false){
        const defaultUser = {"nomor":nomor,"nama":nama,"gender":gender,"umur":umur,"hobi":hobi,"admin":false,"superadmin":false,"banned":false,"hit":0,"poin":200};
        let userJson = await fs.readFileSync("./user/user-account.json","utf-8");
        let userArray = JSON.parse(userJson);
        userArray.push(defaultUser);
        userJson = JSON.stringify(userArray);
        fs.writeFileSync("./user/user-account.json",userJson,"utf-8");
        await gachaHandle.tambahUser(nomor);
        return(true);
    }else{
        return(false);
    }
}

const hapusUser = async(nomor) => {
    let json = await fs.readFileSync("./user/user-account.json","utf-8");
    let array = JSON.parse(json);
    let jumlah = array.length;
    for(let a=0;a<jumlah;a++){
        if(array[a]['nomor'] == nomor){
            array.splice(a, 1);
            json = JSON.stringify(array);
            fs.writeFileSync("./user/user-account.json",json,"utf-8");
            await gachaHandle.hapusUser(nomor);
            return(true);
        }
    }
    return(false);
}

const cekUser = async(nomor) => {
    let userJson = await fs.readFileSync("./user/user-account.json","utf-8");
    let userArray = JSON.parse(userJson);
    let jumlahUser = userArray.length;
    let found=false;
    for(let a=0;a<jumlahUser;a++){
        if(userArray[a]["nomor"] == nomor){
            found = userArray[a];
        }
    }
    if(found){
        return(found);
    }else{
        return(false);
    }
}

const gantiNama = async(nomor, namaBaru) => {
    let userJson = await fs.readFileSync("./user/user-account.json","utf-8");
    let userArray = JSON.parse(userJson);
    let jumlahUser = userArray.length,found=false;
    for(let a=0;a<jumlahUser;a++){
        if(userArray[a]["nomor"] == nomor){
            userArray[a]['nama'] = namaBaru
            found=true
        }
    }
    if(found == true){
        userJson = JSON.stringify(userArray);
        fs.writeFileSync("./user/user-account.json",userJson,"utf-8");
        return(true)
    }else{
        return(false);
    }

}

const setAdmin = async(nomor) => {
    let json = await fs.readFileSync("./user/user-account.json","utf-8");
    let array = JSON.parse(json);
    let jumlah = array.length;
    for(let a=0;a<jumlah;a++){
        if(array[a]['nomor'] == nomor){
            array[a]['admin'] = true;
            json = JSON.stringify(array);
            fs.writeFileSync("./user/user-account.json",json,"utf-8");
            return(true)
        }
    }
    return(false);
}

const unAdmin = async(nomor) => {
    let json = await fs.readFileSync("./user/user-account.json","utf-8");
    let array = JSON.parse(json);
    let jumlah = array.length;
    for(let a=0;a<jumlah;a++){
        if(array[a]['nomor'] == nomor){
            array[a]['admin'] = false;
            json = JSON.stringify(array);
            fs.writeFileSync("./user/user-account.json",json,"utf-8");
            return(true)
        }
    }
    return(false);
}

const banned = async(nomor) => {
    let json = await fs.readFileSync("./user/user-account.json","utf-8");
    let array = JSON.parse(json);
    let jumlah = array.length;
    for(let a=0;a<jumlah;a++){
        if(array[a]['nomor'] == nomor){
            array[a]['banned'] = true;
            json = JSON.stringify(array);
            fs.writeFileSync("./user/user-account.json",json,"utf-8");
            return(true)
        }
    }
    return(false);
} 

const unBanned = async(nomor) => {
    let json = await fs.readFileSync("./user/user-account.json","utf-8");
    let array = JSON.parse(json);
    let jumlah = array.length;
    for(let a=0;a<jumlah;a++){
        if(array[a]['nomor'] == nomor){
            array[a]['banned'] = false;
            json = JSON.stringify(array);
            fs.writeFileSync("./user/user-account.json",json,"utf-8");
            return(true)
        }
    }
    return(false);
}

const gantiGender = async(nomor, gender) => {
    let json = await fs.readFileSync("./user/user-account.json","utf-8");
    let array = JSON.parse(json);
    let jumlah = array.length;
    for(let a=0;a<jumlah;a++){
        if(array[a]['nomor'] == nomor){
            array[a]['gender'] = gender;
            json = JSON.stringify(array);
            fs.writeFileSync("./user/user-account.json",json,"utf-8");
            return(true)
        }
    }
    return(false);
}

const gantiUmur = async(nomor, umur) => {
    let json = await fs.readFileSync("./user/user-account.json","utf-8");
    let array = JSON.parse(json);
    let jumlah = array.length;
    for(let a=0;a<jumlah;a++){
        if(array[a]['nomor'] == nomor){
            array[a]['umur'] = umur;
            json = JSON.stringify(array);
            fs.writeFileSync("./user/user-account.json",json,"utf-8");
            return(true)
        }
    }
    return(false);
}

const gantiHobi = async(nomor, hobi) => {
    let json = await fs.readFileSync("./user/user-account.json","utf-8");
    let array = JSON.parse(json);
    let jumlah = array.length;
    for(let a=0;a<jumlah;a++){
        if(array[a]['nomor'] == nomor){
            array[a]['hobi'] = hobi;
            json = JSON.stringify(array);
            fs.writeFileSync("./user/user-account.json",json,"utf-8");
            return(true)
        }
    }
    return(false);
}

const tambahPoin = async(nomor, poin) => {
    let json = await fs.readFileSync("./user/user-account.json","utf-8");
    let array = JSON.parse(json);
    let jumlah = array.length;
    for(let a=0;a<jumlah;a++){
        if(array[a]['nomor'] == nomor){
            const n = parseInt(array[a]['poin']);
            array[a]['poin'] = n+parseInt(poin);
            json = JSON.stringify(array);
            fs.writeFileSync("./user/user-account.json",json,"utf-8");
            return(true)
        }
    }
    return(false);
}

const kurangiPoin = async(nomor, poin) => {
    let json = await fs.readFileSync("./user/user-account.json","utf-8");
    let array = JSON.parse(json);
    let jumlah = array.length;
    for(let a=0;a<jumlah;a++){
        if(array[a]['nomor'] == nomor){
            const n = parseInt(array[a]['poin']);
            array[a]['poin'] = n-parseInt(poin);
            json = JSON.stringify(array);
            fs.writeFileSync("./user/user-account.json",json,"utf-8");
            return(true)
        }
    }
    return(false);
}

const tambahHit = async(nomor) => {
    let json = await fs.readFileSync("./user/user-account.json","utf-8");
    let array = JSON.parse(json);
    let jumlah = array.length;
    for(let a=0;a<jumlah;a++){
        if(array[a]['nomor'] == nomor){
            const n = parseInt(array[a]['hit']);
            array[a]['hit'] = n+1;
            json = JSON.stringify(array);
            fs.writeFileSync("./user/user-account.json",json,"utf-8");
            return(true)
        }
    }
    return(false);
}

const kurangHit = async(nomor) => {
    let json = await fs.readFileSync("./user/user-account.json","utf-8");
    let array = JSON.parse(json);
    let jumlah = array.length;
    for(let a=0;a<jumlah;a++){
        if(array[a]['nomor'] == nomor){
            const n = parseInt(array[a]['hit']);
            array[a]['hit'] = n-1;
            json = JSON.stringify(array);
            fs.writeFileSync("./user/user-account.json",json,"utf-8");
            return(true)
        }
    }
    return(false);
}

const cekBanned = async(nomor) => {
    let json = await fs.readFileSync("./user/user-account.json","utf-8");
    let array = JSON.parse(json);
    let jumlah = array.length;
    for(let a=0;a<jumlah;a++){
        if(array[a]['nomor'] == nomor){
            return(array[a]['banned']);
        }
    }
    return(false);
}

const userList = async() => {
    let json = await fs.readFileSync("./user/user-account.json","utf-8");
    let array = JSON.parse(json);
    let listUser="",a;
    for(a=0;a<array.length;a++){
        listUser = listUser + (a+1) + ". " +array[a]['nomor'] + " - "+array[a]['nama']+"\n";
    }
    return(listUser);
}

const migrasiNomor = async(nomorLama, nomorBaru) => {
    let json = await fs.readFileSync("./user/user-account.json","utf-8");
    let array = JSON.parse(json);
    for(let a=0;a<array.length;a++){
        if(array[a]['nomor'] == nomorLama){
            array[a]['nomor'] = nomorBaru;
            json = JSON.stringify(array);
            fs.writeFileSync("./user/user-account.json",json,"utf-8");
            const gg = await gachaHandle.migrasiNomor(nomorLama, nomorBaru);
            if(gg != false){
                return(true);
            }else{
                return(false);
            }
        }
    }
}



module.exports = {cekUser,gantiNama, tambahUser, setAdmin, unAdmin, banned, unBanned, gantiGender, gantiUmur, gantiHobi, tambahPoin, kurangiPoin, tambahHit, kurangHit, cekBanned, hapusUser, userList, migrasiNomor}