const axios = require ('axios');
const fs = require ('fs');
const getListSurat = async() => {
    let alquran="",data;
        let res = await axios.get('https://equran.id/api/surat',
        {
            headers: {
                'Accept-Encoding': 'application/json',
            }
        });
        if(res.status == 200){
            data = res.data
            for(a=0;a<114;a++){
                data = res.data[a]
                alquran = alquran + ((a+1)+". "+data['nama_latin']+" - "+data['jumlah_ayat']+" Ayat\n");
            }
            return alquran ;
        }
}


const getAyat = async(surat,ayat) => {
    let res = await axios.get('https://equran.id/api/surat/'+surat,
        {
            headers: {
                'Accept-Encoding': 'application/json',
            }
        });
        if(res.status == 200){
            const data = res.data;
            const ayatreal = data['jumlah_ayat'];
            const namaSurat = data['nama_latin'];
            if(ayat <= ayatreal){
                const ar = data.ayat[(ayat-1)]['ar'];
                const tr = data.ayat[(ayat-1)]['tr'];
                const id = data.ayat[(ayat-1)]['idn'];
                const ret = namaSurat+" Ayat "+ayat+"\n\n"+ar+"\n\n"+tr+"\n\nArtinya:\n"+id;
                return(ret)
            }else{
                return(false);
            }
            //console.log(arabic) 
        }
}


const getSuratMp3 = async(surat) => {
    let res = await axios.get('https://equran.id/api/surat/'+surat,
    {
        headers: {
            'Accept-Encoding': 'application/json',
        }
    });
    if(res.status == 200){
        const audio = res.data['audio'];
        return(audio);
    }else
    return(false);
}

const searchDaerah = async(daerah) => {
    let res = await axios.get('https://api.myquran.com/v1/sholat/kota/cari/'+daerah,
    {
        headers: {
            'Accept-Encoding': 'application/json',
        }
    });
    if(res.status == 200 && res.data.status == true){
        const kodewilayah = res.data.data[0]['id'];
        return(kodewilayah)
    }else{
        return(false)
    }
}

const jadwalSholatWithId = async(idkota) => {
    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let res = await axios.get('https://api.myquran.com/v1/sholat/jadwal/'+idkota+"/"+year+"/"+month+"/"+date,
    {
        headers: {
            'Accept-Encoding': 'application/json',
        }
    });
    if(res.status == 200 && res.data.status == true){
        const data = res.data;
        //const ret = data.data.jadwal
        const ret = "Jadwal Sholat Hari "+data.data.jadwal.tanggal+"\nWilayah "+data.data.lokasi+", "+data.data.daerah+"\n\nImsak : "+data.data.jadwal.imsak+"\nShubuh : "+data.data.jadwal.subuh+"\nTerbit : "+data.data.jadwal.terbit+"\nDhuha : "+data.data.jadwal.dhuha+"\nDzuhur : "+data.data.jadwal.dzuhur+"\nAshar : "+data.data.jadwal.ashar+"\nMaghrib : "+data.data.jadwal.maghrib+"\nIsya : "+data.data.jadwal.isya
        return(ret)
    }else{
        return(false);
    }
}

const getAllDoa = async() => {
    let doaJson = await fs.readFileSync("./lib/doa.json","utf-8");
    let doa = JSON.parse(doaJson);
    let listDoa="";
    for(let a=0;a<doa.length;a++){
        listDoa = listDoa + (a+1) + ". "+doa[a]['doa']+"\n";
    }
    return(listDoa)
}

const getDoa = async(nomorDoa) => {
    let doaJson = await fs.readFileSync("./lib/doa.json","utf-8");
    let doa = JSON.parse(doaJson);
    if((nomorDoa)>doa.length){
        return(false);
    }else{
        let doain = doa[(nomorDoa-1)];
        let ret = doain['doa']+"\n\n"+doain['ayat']+"\n\n"+doain['latin']+"\n\nArtinya : \n"+doain['artinya'];
        return(ret);
    }
}

module.exports = {getListSurat, getAyat, getSuratMp3, jadwalSholatWithId, searchDaerah, getAllDoa, getDoa};