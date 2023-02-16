const qrcode = require('qrcode-terminal');
const { Client, LocalAuth, MessageMedia, ChatTypes, Buttons, ClientInfo } = require('whatsapp-web.js');
const axios = require ('axios');
const fs = require('fs');
const {namaBot, trigger, callImg, callMsg, nomorOwner} = require('./pengaturan.json');
const {kenalan} = require("./user/register-message-handle.js");
const userHandle = require("./user/user-handle.js");
const registerSessionHandle = require("./user/register-session-handle.js");
const menfessSessionHandle = require("./fitur/menfess/menfess-session-handle.js");
const {menfessMessageHandle} = require("./fitur/menfess/menfess-message-handle");
const {eulaLawrence} = require('./eula');
const {ayaka} = require('./ayaka');
const {messageMain,logchat} = require("./log/log");

const eula = new Client({
    puppeteer: {
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
          ],
          executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',//Windows
          //executablePath: '/usr/bin/google-chrome',//Linux
          headless:false
        
    },  
    authStrategy: new LocalAuth({ clientId: "EulaBOT",dataPath:"./.EULAWANGI" }),
    ffmpegPath: 'C:/ffmpeg/bin/ffmpeg.exe',//Windows
    //ffmpegPath: '/usr/bin/ffmpeg',//Linux

    
});


eula.on('qr', qr => {
    console.log('Scan QR Code');
    qrcode.generate(qr, {small: true});
});

eula.on('authenticated', () => {
    console.log('log : Autentikasi '+ namaBot+' Berhasil');
});

eula.on('ready', () => {
    console.log('log : '+namaBot+' siap Dipakai!');
    messageMain(eula,namaBot+" Diaktifkan di "+eula.info.wid.user+" dengan nama "+eula.info.pushname+", \n\n*Siap Menerima Pesan!*");
});

eula.initialize();

eula.on('incoming_call', async call => {
    const media = await MessageMedia.fromUrl(botCallImgUrl);
    eula.sendMessage(call.from, media, {caption : botCall});
    console.log('log : Ada yang nelpon woi');
    
});

eula.on('message', async message => {
    const kontak = await message.getContact();
    const nomor = kontak.number;
    const userRegisteredStatus = await userHandle.cekUser(nomor);
    const menfessPengirim = await menfessSessionHandle.cekDariPengirim(nomor);
    const menfessPenerima = await menfessSessionHandle.cekDariPenerima(nomor);
    const banned = await userHandle.cekBanned(nomor);
    const chat = await message.getChat();
    const isiPesan = message.body;
    const isiPesanLower = isiPesan.toLowerCase();
    const arrIsiPesan = isiPesanLower.split(" ");
    const command = arrIsiPesan.slice(0,1).toString();
    const eulawangi = arrIsiPesan.slice(1).toString().replaceAll(","," ");
    const ayakawangi = isiPesan.split(" ").slice(1).toString().replaceAll(","," ");
    let isGroup;
    if(message.from.includes('@g.us')){isGroup = true;}else{isGroup = false;}
    let gr=false;if(isGroup == true){gr = chat.name;}await logchat(eula, nomor, kontak.pushname, gr, isiPesan);
    if(userRegisteredStatus != false){
        if(menfessPengirim != false){
            if(isGroup == false){menfessMessageHandle(eula, message, "pengirim");}
        }else if(menfessPenerima != false){
            if(isGroup == false){menfessMessageHandle(eula, message, "penerima");}
        }else{
            if(Array.from(isiPesan)[0] == trigger){
                if(banned == false){
                    eulaLawrence(eula, message);
                }else{
                    if(isiPesan == trigger+"admin" || isiPesan == trigger+"adminlist"){
                        const dataAdmin = await userHandle.adminList();
                        chat.sendMessage("*"+namaBot+"*\n\n"+dataAdmin+"\n\n\n*Dilarang Telepon!");
                    }else{
                        let button = new Buttons("*"+namaBot+"*\nMohon Maaf, Nomor anda telah di banned!\nHubungi Admin untuk Info lebih lanjut.",[{body:trigger+'admin'}],namaBot,"Tekan "+trigger+"admin untuk menampilkan nomor admin");
                        chat.sendMessage(button);
                    }
                }
            }else{
                ayaka(eula, message);
            }
        }
    }else{
        if(menfessPengirim != false){
            if(isGroup == false){menfessMessageHandle(eula, message, "pengirim");}else{message.reply("*"+namaBot+"*\n\nAnda sedang dalam sesi ")}
        }else if(menfessPenerima != false){
            if(isGroup == false){menfessMessageHandle(eula, message, "penerima");}
        }else{
            if(Array.from(isiPesan)[0] == trigger){
                if(isiPesanLower == trigger+"register" || isiPesanLower == trigger+"kenalan"){
                    kenalan(eula, message);
                }else{
                    let button = new Buttons("Kamu belum melakukan registrasi nomor!, jika merasa sudah registrasi mungkin data yang anda masukkan tidak valid",[{body:trigger+'register'}],namaBot,"Tekan "+trigger+"register untuk memulai registrasi");
                    chat.sendMessage(button);
                }
            }else{
               const cekSessionRegister = await registerSessionHandle.returnDataUser(nomor);
               if(cekSessionRegister != false){
                    kenalan(eula, message);
               }else{
                    ayaka(eula, message);
               } 
            }
        }
    }
});

