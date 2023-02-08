    const registerSessionHandle = require("./register-session-handle");
    const {tambahUser} = require('./user-handle.js');
    const {Buttons} = require("whatsapp-web.js");
    const kenalan = async(client, message) =>{
        const {namaBot, owner, nomorOwner, trigger} = require("../pengaturan.json");
        const isiPesan = (message.body);
        const arrIsiPesan = isiPesan.toLowerCase().split(" ");
        const command = arrIsiPesan.slice(0,1).toString();
        const eulawangi = arrIsiPesan.slice(1).toString().replaceAll(","," ");
        const ayakawangi = (message.body).split(" ").slice(1).toString().replaceAll(","," ");
        const chat = await message.getChat();
        const kontak = await message.getContact();
        const nomor = kontak.number;
        const lowerIsiPesan = isiPesan.toLowerCase();
        let loop = true;
        let nama, gender, umur, hobi;
        let statusAmbilData = await registerSessionHandle.cekAmbilData(nomor);
        let statusJawabSalah = await registerSessionHandle.cekWrongAnswer(nomor);
        let dataAvailable = await registerSessionHandle.returnDataUser(nomor);
        if(dataAvailable == false){
            await registerSessionHandle.addSessionRegister(nomor);
        }

        let statusNama = await registerSessionHandle.cekCompleteNama(nomor);
        let statusGender = await registerSessionHandle.cekCompleteGender(nomor);
        let statusUmur = await registerSessionHandle.cekCompleteUmur(nomor);
        let statusHobi = await registerSessionHandle.cekCompleteHobi(nomor);
        //console.log("status nama : "+statusNama);
        //console.log("Pesan : "+isiPesan)

        if(statusNama == false){
            if(statusAmbilData == false){
                message.reply("Perkenalkan Saya "+namaBot+", Nama kamu siapa? langsung tulis aja yah gausah pake tanda '"+trigger+"'");
                await registerSessionHandle.ambilDataTrue(nomor);
            }else{
                if(lowerIsiPesan == "nama" || lowerIsiPesan == "name" || lowerIsiPesan == "jeneng" || lowerIsiPesan == "manusia" || lowerIsiPesan.includes('wong') || lowerIsiPesan.includes("orang") || lowerIsiPesan.includes("kontol") || lowerIsiPesan.includes("memek") || lowerIsiPesan.includes("saya") || lowerIsiPesan.includes("namaku") || lowerIsiPesan.includes("makhluk") || lowerIsiPesan.includes("kenal") || lowerIsiPesan.includes("nama aku") || lowerIsiPesan.includes("register") || lowerIsiPesan.includes("registrasi") || lowerIsiPesan.includes(".") || lowerIsiPesan.includes("beban") || lowerIsiPesan.includes("stres") || lowerIsiPesan.includes("setres")){
                    if(statusJawabSalah == false){
                        message.reply("Ihhhhh isinya jangan ngawur kayak gitu dong, namamu siapa?");
                        await registerSessionHandle.wrongAnswerTrue(nomor);
                    }else{
                        const pilihJawab = ["Bodoh kamu, disuruh nulis nama yang bener aja gabisa!😡😡","bukan seperti itu, kamu nulis apaan sih gangerti aku tuh","bodoh, apa ibumu tidak megajarimu menulis nama😡😡😡","Kamu tuh nulisnya salah!"];
                        const rand = Math.floor(Math.random() * pilihJawab.length);
                        message.reply(pilihJawab[rand]);
                    }
                }else{
                    if(isiPesan.includes(trigger)){
                        nama = isiPesan.replaceAll(trigger,"")
                    }else{
                        nama = isiPesan
                    }
                    const setNama = await registerSessionHandle.completingNama(nomor, nama);
                    await registerSessionHandle.wrongAnswerFalse(nomor);
                    if(setNama != false){
                        message.reply("Oooh, nama kamu "+isiPesan+"\n\nOh iya, Kamu ini punya gender kan, Gendermu apa?, jawab L atau P aja..");
                    }else{
                        message.reply("*"+namaBot+"*\n\nSistemnya lagi error, Kamu bilang langsung aja ke adminnya.");
                        message.reply("Bukannya gak mau ya, tapi emang gabisa nih sistemnya😒");
                    }
                }
            }
        }else if(statusGender == false){
            if(statusAmbilData == false){
                message.reply("Oh iya, Kamu ini punya gender kan, Gendermu apa?, jawab L atau P aja..");
                await registerSessionHandle.ambilDataTrue(nomor);
            }else{
                if(lowerIsiPesan == "l"){
                    message.reply("Oooh kamu Laki-Laki, oiya umur kamu berapa ya? langsung tulis aja ya!");
                    const setGender = await registerSessionHandle.completingGender(nomor, "L");
                    await registerSessionHandle.wrongAnswerFalse(nomor);
                }else if(lowerIsiPesan == "p"){
                    message.reply("Ooooh kamu perempuan, oiya kamu umur berapa ya? langsung tulis aja ya!");
                    await registerSessionHandle.completingGender(nomor, "P");
                    await registerSessionHandle.wrongAnswerFalse(nomor);
                }else{
                    if(statusJawabSalah == false){
                        message.reply("tulis L atau P gausah tulis yang lain");
                        await registerSessionHandle.wrongAnswerTrue(nomor);
                    }else{
                        const salahJawab = ["Bego , disuruh jawab L atau P aja gafaham 😠","Bodoh, perintah biasa aja gabisa 😡","bukan gitu cara nulisnyaa!","kamu ngerti gender gk sih goblok amat jadi orang"];
                        const rand = Math.floor(Math.random() * salahJawab.length);
                        message.reply(salahJawab[rand]);
                    }
                }
            }
        }else if(statusUmur == false){
            if(statusAmbilData == false){
                message.reply("Kamu umur berapa? langsung angka jawabnya!");
                await registerSessionHandle.ambilDataTrue(nomor);
            }else{
                if(isiPesan.includes(1) || isiPesan.includes(2) || isiPesan.includes(3) || isiPesan.includes(4) || isiPesan.includes(5) || isiPesan.includes(6) || isiPesan.includes(7) || isiPesan.includes(8) || isiPesan.includes(9)){
                    if(parseInt(isiPesan) < 14){
                        message.reply("Oooh ternyata kamu masih "+isiPesan+" Tahun 😊\noiya hobi kamu apa ya? langsung tulis aja");
                        await registerSessionHandle.completingUmur(nomor, isiPesan);
                        await registerSessionHandle.wrongAnswerFalse(nomor);
                    }else if(parseInt(isiPesan) >= 14 && parseInt(isiPesan) < 35){
                        message.reply("Oooh ternyata masih "+isiPesan+" Tahun, Masih muda ternyata\nemm hobi kamu apa ya? langsung tulis aja");
                        await registerSessionHandle.completingUmur(nomor, isiPesan);
                        await registerSessionHandle.wrongAnswerFalse(nomor);
                    }else if(parseInt(isiPesan) >= 35 && parseInt(isiPesan) < 90){
                        message.reply("Oooh ternyata umurmu sudah "+isiPesan+" Tahun 😊\nHobine nopo nggeh mbah");
                        await registerSessionHandle.completingUmur(nomor, isiPesan);
                        await registerSessionHandle.wrongAnswerFalse(nomor);
                    }else{
                        message.reply("kamuuu, ngisi umur yang bener dongg!");
                    } 
                }else{
                    if(statusJawabSalah == false){
                        message.reply("Bego kamu, disuruh nulis umur malah nulis gajelas, udah dibilang langsung tulis umurnya aja");
                        await registerSessionHandle.wrongAnswerTrue(nomor);
                    }else{
                        const salahJawaban = ["apa kamu udah tua banget sampai nulis umur aja gabisa","Bodoh, nulis umur aja gabisa","kayaknya kamu harus masuk TK lagi, nulis umur aja masih gabisa"];
                        const rand = Math.floor(Math.random() * salahJawaban.length);
                        message.reply(salahJawaban[rand]);
                    }
                }
            }
        }else if(statusHobi == false){
            if(statusAmbilData == false){
                message.reply("hobimu apa yaa? langsung tulis aja ya!");
                await registerSessionHandle.ambilDataTrue(nomor);
            }else{
                if(lowerIsiPesan.includes('kamu') || lowerIsiPesan.includes('eula') || lowerIsiPesan.includes('mencintaimu') || lowerIsiPesan.includes('menyukaimu') || lowerIsiPesan.includes('menyayangimu') || lowerIsiPesan.includes('nanya') || lowerIsiPesan.includes('kepo') || lowerIsiPesan.includes('bacot') || lowerIsiPesan.includes('kamu') || lowerIsiPesan.includes('beban') || lowerIsiPesan.includes('stres') || lowerIsiPesan.includes('setres') || lowerIsiPesan.includes('ngamuk')  || lowerIsiPesan.includes('ngamok')){
                    if(statusJawabSalah == false){
                        message.reply("kamuuu, ngisi hobi yang bener dongg!, jangan ngisi kayak gitu aku gasuka");
                        await registerSessionHandle.wrongAnswerTrue(nomor);
                    }else{
                        const salahJawab = ["bodoh,gak gitu caranya nulis hobi","bego, nulisnya jangan ngawur dong","gak usah malu-malu nulis hobi doang kok tapi jangan jawab yang itu aku gamau"];
                        const rand = Math.floor(Math.random() * salahJawab.length);
                        message.reply(salahJawab[rand]);
                    }
                }else{
                    message.reply("Jadi hobimu "+isiPesan);
                    await registerSessionHandle.completingHobi(nomor, isiPesan);
                    await registerSessionHandle.wrongAnswerFalse(nomor);
                    const userData = await registerSessionHandle.returnDataUser(nomor);
                    const MoveUserData = await tambahUser(nomor, userData.completeNama, userData.completeGender, userData.completeUmur, userData.completeHobi);
                    if(MoveUserData != false){
                        const deleteTempData = await registerSessionHandle.deleteSessionRegister(nomor);
                        if(deleteTempData != false){
                            //const dataUser = "Nomor"+nomor+"\nNama : "+userData.completeNama+"\nGender"+userData.cekCompleteGender+"\nUmur : "+userData.completeUmur+"\n Hobi : "+userData.completeHobi+"\n\n"
                            let button = new Buttons("Registrasimu Selesai!",[{body:trigger+'menu'},{body:trigger+'myuser'}],namaBot,"ketik atau tekan tombol "+trigger+"menu untuk memulai menggunakan, dan "+trigger+"myuser untuk melihat status user anda");
                            message.reply(button);
                            client.sendMessage("62895395391278@c.us","*"+namaBot+"*\n\nNomor "+nomor+" dengan nama "+userData.completeNama+" berhasil melakukan registrasi");
                        }
                    }else{

                    }
                }
            }
        }else{
            
        }
        
    }

    module.exports = {kenalan}