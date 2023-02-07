const fs = require("fs");;

const tambahUser = async(nomor) => {
    const bawaan = {"nomor":nomor,"total":0,"waifu":[],"item":[],"pity":0,"kebegal":false};
    let json = await fs.readFileSync("./gacha/gacha-data.json","utf-8");
    let array = JSON.parse(json);
    array.push(bawaan);
    json = JSON.stringify(array);
    await fs.writeFileSync("./gacha/gacha-data.json",json,"utf-8");
    return(true);
}

const hapusUser = async(nomor) => {
    let json = await fs.readFileSync("./gacha/gacha-data.json","utf-8");
    let array = JSON.parse(json);
    let jumlah = array.length;
    for(let a=0;a<jumlah;a++){
        if(array[a]['nomor'] == nomor){
            array.splice(a, 1);
            json = JSON.stringify(array);
            await fs.writeFileSync("./gacha/gacha-data.json",json,"utf-8");
            return(true);
        }
    }
    return(false);
}

const tambahTotal = async(nomor, jumlahTambah) => {
    let json = await fs.readFileSync("./gacha/gacha-data.json","utf-8");
    let array = JSON.parse(json);
    let jumlah = array.length;
    for(let a=0;a<jumlah;a++){
        if(array[a]['nomor'] == nomor){
            const tambah = parseInt(jumlahTambah);
            array[a]["total"] = parseInt(array[a]['total']) + tambah;
            json = JSON.stringify(array);
            await fs.writeFileSync("./gacha/gacha-data.json",json,"utf-8");
            return(true);
        }
    }
    return(false);
}

const tambahWaifu = async(nomor, waifu) => {
    let json = await fs.readFileSync("./gacha/gacha-data.json","utf-8");
    let array = JSON.parse(json);
    let jumlah = array.length,waifuStatus;
    for(let a=0;a<jumlah;a++){
        if(array[a]['nomor'] == nomor){
            let waifuArray = array[a]['waifu'];
            for(let b=0;b<waifuArray.length;b++){
                if(waifuArray[b] != waifu){
                    waifuStatus = true;
                }else{
                    return(true);
                }
            }
            if(waifuStatus == true || waifuArray.length == 0){
                waifuArray.push(waifu);
                array[a]['waifu'] = waifuArray;
                json = JSON.stringify(array);
                await fs.writeFileSync("./gacha/gacha-data.json",json,"utf-8");
                return(true);
            }
        }
    }
    return(false);
}

const tambahItem = async(nomor, item) => {
    let json = await fs.readFileSync("./gacha/gacha-data.json","utf-8");
    let array = JSON.parse(json);
    let jumlah = array.length, itemStatus;
    for(let a=0;a<jumlah;a++){
        if(array[a]['nomor'] == nomor){
            let itemArray = array[a]['item'];
            for(let b=0;b<itemArray.length;b++){
                if(itemArray[b] != item){
                    itemStatus = true;
                }else{
                    return(true);
                }
            }
            if(itemStatus == true || itemArray.length == 0){
                itemArray.push(item);
                array[a]['item'] = itemArray;
                json = JSON.stringify(array);
                await fs.writeFileSync("./gacha/gacha-data.json",json,"utf-8");
                return(true);
            }
        }
    }
    return(false);
}

const tambahPity = async(nomor, jumlahTambah) => {
    let json = await fs.readFileSync("./gacha/gacha-data.json","utf-8");
    let array = JSON.parse(json);
    let jumlah = array.length;
    for(let a=0;a<jumlah;a++){
        if(array[a]['nomor'] == nomor){
            const tambah = parseInt(jumlahTambah);
            array[a]["pity"] = parseInt(array[a]['pity']) + tambah;
            json = JSON.stringify(array);
            await fs.writeFileSync("./gacha/gacha-data.json",json,"utf-8");
            return(true);
        }
    }
    return(false);
}

const resetPity = async(nomor) => {
    let json = await fs.readFileSync("./gacha/gacha-data.json","utf-8");
    let array = JSON.parse(json);
    let jumlah = array.length;
    for(let a=0;a<jumlah;a++){
        if(array[a]['nomor'] == nomor){
            array[a]["pity"] = 0;
            json = JSON.stringify(array);
            await fs.writeFileSync("./gacha/gacha-data.json",json,"utf-8");
            return(true);
        }
    }
    return(false);
}

const setTrueKebegal = async(nomor) => {
    let json = await fs.readFileSync("./gacha/gacha-data.json","utf-8");
    let array = JSON.parse(json);
    let jumlah = array.length;
    for(let a=0;a<jumlah;a++){
        if(array[a]['nomor'] == nomor){
            array[a]["kebegal"] = true;
            json = JSON.stringify(array);
            await fs.writeFileSync("./gacha/gacha-data.json",json,"utf-8");
            return(true);
        }
    }
    return(false);
}

const setFalseKebegal = async(nomor) => {
    let json = await fs.readFileSync("./gacha/gacha-data.json","utf-8");
    let array = JSON.parse(json);
    let jumlah = array.length;
    for(let a=0;a<jumlah;a++){
        if(array[a]['nomor'] == nomor){
            array[a]["kebegal"] = false;
            json = JSON.stringify(array);
            await fs.writeFileSync("./gacha/gacha-data.json",json,"utf-8");
            return(true);
        }
    }
    return(false);
}

const getData = async(nomor) => {
    let json = await fs.readFileSync("./gacha/gacha-data.json","utf-8");
    let array = JSON.parse(json);
    let jumlah = array.length;
    for(let a=0;a<jumlah;a++){
        if(array[a]['nomor'] == nomor){
            return(array[a]);
        }
    }
    return(false);
}

const migrasiNomor = async(nomorLama, nomorBaru) => {
    let json = await fs.readFileSync("./gacha/gacha-data.json","utf-8");
    let array = JSON.parse(json);
    let jumlah = array.length;
    for(let a=0;a<jumlah;a++){
        if(array[a]['nomor'] == nomorLama){
            array[a]["nomor"] = nomorBaru;
            json = JSON.stringify(array);
            await fs.writeFileSync("./gacha/gacha-data.json",json,"utf-8");
            return(true);
        }
    }
    return(false);
}

const randomAmpas = async() => {
    let json = await fs.readFileSync("./gacha/ampas.json","utf-8");
    let array = JSON.parse(json);
    let random = Math.floor(Math.random() * array.length);
    return(array[random]);
}

const randomKebegal = async() => {
    let json = await fs.readFileSync("./gacha/kebegal.json","utf-8");
    let array = JSON.parse(json);
    let random = Math.floor(Math.random() * array.length);
    return(array[random]);
}

const randomRare = async() => {
    let json = await fs.readFileSync("./gacha/rare.json","utf-8");
    let array = JSON.parse(json);
    let random = Math.floor(Math.random() * array.length);
    return(array[random]);
}

const gacha = async(nomor) => {
    if(!nomor){return(false)}
    const { kurangiPoin, cekUser } = require("../user/user-handle")
    let res;
    const dataGacha = await getData(nomor);
    const pity = dataGacha['pity'];
    const kebegal = dataGacha['kebegal'];
    await tambahPity(nomor, 1);
    await kurangiPoin(nomor, 20);
    if(pity >= 60){
        if(kebegal == true){
            res = await randomKebegal();
            await tambahWaifu(nomor, res[0]);
            await tambahItem(nomor,  res[0]);
            await setFalseKebegal(nomor);
            await resetPity(nomor);
            return(res);
        }else{
            res = await randomRare();
            await tambahWaifu(nomor, res[0]);
            await tambahItem(nomor, res[0]);
            await resetPity(nomor);
            const angka = [0,0,1,1,1,1,1];
            if(angka[Math.floor(Math.random() * angka.length)] == 1){
                setTrueKebegal(nomor);
            }
            return(res);
        }
    }else{
        const angka = [0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
        if(angka[Math.floor(Math.random() * angka.length)] == 1){
            const angka2 = [0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
            if(angka2[Math.floor(Math.random() * angka2.length)] == 1){
                res = await randomAmpas();
                await tambahItem(nomor, res[0]);
                return(res);
            }else{
                res = await randomKebegal();
                await tambahWaifu(nomor, res[0])
                await tambahItem(nomor,  res[0]);
                await setFalseKebegal(nomor);
                await resetPity(nomor);
                return(res);
            }
        }else{
            if(kebegal == true){
                res = await randomKebegal();
                await tambahWaifu(nomor, res[0])
                await tambahItem(nomor,  res[0]);
                await setFalseKebegal(nomor);
                await resetPity(nomor);
                return(res);
            }else{
                res = await randomRare();
                await tambahWaifu(nomor, res[0]);
                await tambahItem(nomor, res[0]);
                await resetPity(nomor);
                const angka = [0,0,1,1,1,1,1];
                if(angka[Math.floor(Math.random() * angka.length)] == 1){
                    setTrueKebegal(nomor);
                }
                return(res);
            }
        }
    }
}


module.exports = {tambahUser, hapusUser, tambahTotal, tambahWaifu, tambahItem, tambahPity, resetPity, setTrueKebegal, setFalseKebegal, getData, gacha, migrasiNomor}