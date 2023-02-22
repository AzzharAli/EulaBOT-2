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
        if(statusNama == false){
            if(statusAmbilData == false){
                message.reply("Perkenalkan Saya "+namaBot+", Nama kamu siapa? langsung tulis aja yah gausah pake tanda '"+trigger+"'");
                await registerSessionHandle.ambilDataTrue(nomor);
            }else{
                if(lowerIsiPesan.includes("nama") || lowerIsiPesan.includes("name") || lowerIsiPesan.includes("jeneng")){
                    message.reply("Hey tulis nama kamu aja jangan malah nulis yang lain");
                }else if(lowerIsiPesan == "menu"){
                    message.reply("Hey anda register disuruh nulis nama malah nulis menu, bego lu!");
                }else if(lowerIsiPesan.includes("manusia") || lowerIsiPesan == "wong" || lowerIsiPesan.includes("orang")){
                    message.reply("Iya tau kamu emang "+isiPesan+" tapi kamu punya nama kan cepet kasi tau!");
                }else if(lowerIsiPesan.includes("tanya") || lowerIsiPesan.includes("kepo") || lowerIsiPesan.includes("nanya")){
                    message.reply("Iya lah, cepet kasih tau namamu");
                }else if(lowerIsiPesan.includes("kontol") || lowerIsiPesan.includes("memek") || lowerIsiPesan.includes("pepek") || lowerIsiPesan.includes("tempek") || lowerIsiPesan.includes("tempik")){
                    message.reply("yang bener kontol, tinggal jawab nama aja susah");
                }else if(lowerIsiPesan.includes("bot") || lowerIsiPesan == "ai"){
                    message.reply("hey anda itu manusia, siapa namamu woi");
                }else if(lowerIsiPesan.includes("eula ") || lowerIsiPesan == "eula" || lowerIsiPesan.includes("gatau") || lowerIsiPesan.includes("gk tau") || lowerIsiPesan.includes("nggak tau") || lowerIsiPesan.includes("ndak ") || lowerIsiPesan.includes("ndk")){
                    message.reply("hey anda gatau nama sendiri??, goblok banget jadi orang");
                }else if(lowerIsiPesan.includes("register") || lowerIsiPesan.includes("registrasi")){
                    message.reply("Iya tau kamu mau registrasi, kan aku tadi tanya namamu siapa");
                }else if(lowerIsiPesan.includes("panggilan") || lowerIsiPesan.includes("asli") || lowerIsiPesan.includes("nickname")){
                    message.reply("Terserah kamu lahh");
                }else if(lowerIsiPesan.includes("setres") || lowerIsiPesan.includes("stres") || lowerIsiPesan.includes("gila")){
                    message.reply("Kamu tuh yang stressssss");
                }else if(lowerIsiPesan.includes("rahasia") || lowerIsiPesan.includes("rahsia") || lowerIsiPesan.includes("tersembunyi")){
                    message.reply("oke berarti kamu gabisa make botnya!\nkalo udah berubah pikiran bisa register ulang");
                    chat.sendMessage("Deleting userdata "+nomor);
                    await registerSessionHandle.deleteSessionRegister(nomor);
                }else if(lowerIsiPesan.includes("bacot") || lowerIsiPesan.includes("bacod")){
                    message.reply("Lu yang bacot, aku tanya nama malah balas aneh aneh");
                }else if(lowerIsiPesan.includes("karep") || lowerIsiPesan.includes("serah") || lowerIsiPesan.includes("suka") || lowerIsiPesan.includes("ngatur")){
                    message.reply("yaudah aku batalin registrasinya!");
                    chat.sendMessage("Deleting userdata "+nomor);
                    await registerSessionHandle.deleteSessionRegister(nomor);
                }else if(message.hasMedia){
                    message.reply("ditanyain nama malah ngirim gituan, goblok lu");
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
                if(lowerIsiPesan.includes('mencintaimu') || lowerIsiPesan.includes('menyukaimu') || lowerIsiPesan.includes('menyayangimu') || lowerIsiPesan.includes(' kamu')){
                    message.reply("Lah ngarep ngaca dulu lah minimal, apa hobimu woi");
                }else if(lowerIsiPesan.includes("nanya") && lowerIsiPesan.includes("banyak") || lowerIsiPesan.includes("tanya") && lowerIsiPesan.includes("banyak")){
                    message.reply("yaudah kalo gamau ditanyain aku batalin registrasinya!");
                    chat.sendMessage("Deleting userdata "+nomor);
                    await registerSessionHandle.deleteSessionRegister(nomor);
                }else if(lowerIsiPesan.includes("setres") || lowerIsiPesan.includes("stres")){
                    message.reply("lah lu yang setress, udah tau bot malah dikatain")
                }else if(lowerIsiPesan.includes("kepo")){
                    message.reply("iya aku kepo, makanya cepet jawab");
                }else if(lowerIsiPesan.includes("ngamuk") || lowerIsiPesan.includes("ngamok")){
                    message.reply("ini mau register apa nggak, ditanyain hobi aja susah");
                }else if(lowerIsiPesan.includes("cok ") || lowerIsiPesan.includes(" cok") || lowerIsiPesan.includes("kontol") || lowerIsiPesan.includes("bangsat") || lowerIsiPesan.includes("tempek") || lowerIsiPesan.includes("anjing")){
                    message.reply("Gausah Ngegas Cok, aku tanya hobi loh!");
                }else if(lowerIsiPesan.includes("hobi")){
                    message.reply("Iya langsung tulis aja hobinya!");
                }else if(message.hasMedia){
                    message.reply("goblok, ditanya hobi malah kirim ngawur");
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