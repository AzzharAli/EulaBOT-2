const { ChatTypes, Buttons } = require("whatsapp-web.js");
const menfessSessionHandle = require("./menfess-session-handle");
const menfessMessageHandle = async(eula, message, status) => {
    const {namaBot, owner, nomorOwner, trigger} = require("../../pengaturan.json");
    const chat = await message.getChat();
    const kontak = await message.getContact();
    const nomor = kontak.number;
    const isiPesan = (message.body);
    const isiPesanLower = isiPesan.toLowerCase();
    if(status == "pengirim"){
        const dataMenfess = await menfessSessionHandle.cekDariPengirim(nomor);
        const cekNomorPenerima = await menfessSessionHandle.cekNomorPenerima(nomor);
        const cekNamaPengirim = await menfessSessionHandle.cekNamaPengirim(nomor);
        const cekAmbilData = await menfessSessionHandle.cekStatusAmbilData(nomor);
        if(cekNomorPenerima == false){
            if(cekAmbilData == false){
                chat.sendMessage("Mau Chat ke Siapa?? tulis nomornya ya!!\n\nSalah : 0895395391276 \nSalah : +62895395391278\nBenar : 62895395391278");
                await menfessSessionHandle.setTrueAmbilData(nomor);
            }else{
                if(parseFloat(isiPesan) == isiPesan){
                    const nomorPenerima = isiPesan.replaceAll("-","").replaceAll(" ","").replaceAll("+","");
                    const cekSesiPengirim = await menfessSessionHandle.cekDariPengirim(nomorPenerima);
                    const cekSesiPenerima = await menfessSessionHandle.cekDariPenerima(nomorPenerima);
                    if(cekSesiPenerima == false && cekSesiPengirim == false){
                        const pushnumber = await menfessSessionHandle.addNomorPenerima(nomor, nomorPenerima);
                        if(pushnumber != false){
                            chat.sendMessage("Oke, nomernya udah masuk");
                            chat.sendMessage("Sekarang Nama Kamu siapa?? nama ini nanti ditampilin di penerima, tapi kamu bebas mau namain apa");
                            chat.sendMessage("langsung ketik aja ya namanya!!")
                        }
                    }else{
                        if(nomorPenerima == nomor){
                            message.reply("*"+namaBot+"*\n\nIni nomor anda woi!");
                        }else if(nomorPenerima == eula.info.wid.user){
                            message.reply("*"+namaBot+"*\n\nIni nomor BOT goblok!");
                        }else{
                            chat.sendMessage("*"+namaBot+"*\nNomor Sedang dalam sesi dengan orang lain! Silahkan coba lagi beberapa saat");
                            await menfessSessionHandle.deleteSession(nomor);
                        }
                    }
                }else{
                    chat.sendMessage("Cara Masukin Nomornya Salah");
                }
            }
        }else{
            if(cekNamaPengirim == false){
                if(cekAmbilData == false){
                    chat.sendMessage("Sekarang Nama Kamu siapa?? nama ini nanti ditampilin di penerima, tapi kamu bebas mau namain apa");
                    chat.sendMessage("langsung ketik aja ya namanya!!");
                    await menfessSessionHandle.setTrueAmbilData(nomor);
                }else{
                    if(isiPesanLower == "ahang" || isiPesanLower == "eula" || isiPesanLower == "azhar" || isiPesanLower == "azar"){
                        chat.sendMessage("Kamu Gaboleh Pake Nama ini, cari nama lain!");
                    }else{
                        const pushname = await menfessSessionHandle.addNamaPengirim(nomor, isiPesan);
                        let button = new Buttons("Sesi Dimulai, Semua Pesan anda akan diteruskan!",[{body:trigger+'stop'}],namaBot,"Tekan "+trigger+"stop untuk mengakhiri sesi");
                        chat.sendMessage(button);
                    }
                }
            }else{
                if(isiPesanLower == trigger+"stop"){
                    const stopMenfess = await menfessSessionHandle.deleteSession(nomor);
                    if(stopMenfess == true){
                        chat.sendMessage("*"+namaBot+"*\nSesi Berakhir!");
                        eula.sendMessage(dataMenfess['nomorPenerima']+"@c.us","*"+namaBot+"*\nSesi Diakhiri!");
                    }
                }else{
                    const sendnum = dataMenfess['nomorPenerima']+"@c.us";
                    const cekFirstMessage = await menfessSessionHandle.cekStatusFirstMessage(nomor);
                    if(cekFirstMessage == true){
                        let button = new Buttons('Hai, Anda mendapatkan pesan dari '+cekNamaPengirim+" : "+isiPesan,[{body:trigger+'balas'},{body:trigger+'stop'}],namaBot,"Tekan "+trigger+"balas untuk membalas dan "+trigger+"stop untuk mengakhiri");
                        eula.sendMessage(sendnum, button);
                        await menfessSessionHandle.setFalseFirstMessage(nomor);
                        await menfessSessionHandle.setFalseAmbilData(nomor);
                    }else{
                        message.forward(sendnum);
                        //eula.sendMessage(sendnum, isiPesan);
                    }
                }
            }
        }
    }else if(status == "penerima"){
        const dataMenfess = await menfessSessionHandle.cekDariPenerima(nomor);
        const statusBalas = await menfessSessionHandle.cekStatusBalas(nomor);
        if(statusBalas == false){
            if(isiPesan == trigger+"balas"){
                const balas = await menfessSessionHandle.setTrueStatusBalas(nomor);
                if(balas == true){
                    let button = new Buttons('Sesi Dimulai!, pesan anda akan langsung diteruskan ke pengirim, Selama Sesi Aktif anda tidak bisa menggunakan fitur BOT',[{body:trigger+'stop'}],namaBot,"Tekan "+trigger+"stop untuk mengakhiri Sesi");
                    chat.sendMessage(button);
                }
            }else if(isiPesan == trigger+"stop"){
                const stop = await menfessSessionHandle.deleteSession(dataMenfess['nomorPengirim']);
                if(stop == true){
                    chat.sendMessage("*"+namaBot+"*\nSesi Berakhir!");
                    eula.sendMessage(dataMenfess['nomorPengirim']+"@c.us","*"+namaBot+"*\nSesi diakhiri oleh penerima!");
                }
            }else{

            }
        }else{
            if(isiPesan == trigger+"stop"){
                const stop = await menfessSessionHandle.deleteSession(dataMenfess['nomorPengirim']);
                if(stop == true){
                    chat.sendMessage("*"+namaBot+"*\nSesi Berakhir!");
                    eula.sendMessage(dataMenfess['nomorPengirim']+"@c.us","*"+namaBot+"*\nSesi diakhiri oleh penerima!");
                }
            }else{
                message.forward(dataMenfess['nomorPengirim']+"@c.us")
                //eula.sendMessage(dataMenfess['nomorPengirim']+"@c.us",isiPesan);
            }
        }
        
    }else{

    }
}

module.exports = {menfessMessageHandle}
