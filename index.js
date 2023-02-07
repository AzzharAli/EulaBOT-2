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
const {eula} = require('./eula');
const {ayaka} = require('./ayaka');
const {messageMain,logchat} = require("./log/log");

const client = new Client({
    puppeteer: {
        executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
        //headless:false
        
    },
    authStrategy: new LocalAuth({ clientId: "EULAWANGI" }),
    ffmpegPath: 'C:/ffmpeg/bin/ffmpeg.exe'
    
});


client.on('qr', qr => {
    console.log('Scan QR Code');
    qrcode.generate(qr, {small: true});
});

client.on('authenticated', () => {
    console.log('log : Autentikasi '+ namaBot+' Berhasil');
});

client.on('ready', () => {
    console.log('log : '+namaBot+' siap Dipakai!');
    messageMain(client,namaBot+" Diaktifkan di "+client.info.wid.user+" dengan nama "+client.info.pushname+", \n\n*Siap Menerima Pesan!*");
});

client.initialize();

client.on('incoming_call', async call => {
    const media = await MessageMedia.fromUrl(botCallImgUrl);
    client.sendMessage(call.from, media, {caption : botCall});
    console.log('log : Ada yang nelpon woi');
    
});

client.on('message', async message => {
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
    let gr=false;if(isGroup == true){gr = chat.name;}await logchat(client, nomor, kontak.pushname, gr, isiPesan);
    if(userRegisteredStatus != false){
        if(menfessPengirim != false){
            if(isGroup == false){menfessMessageHandle(client, message, "pengirim");}
        }else if(menfessPenerima != false){
            if(isGroup == false){menfessMessageHandle(client, message, "penerima");}
        }else{
            if(Array.from(isiPesan)[0] == trigger){
                if(banned == false){
                    eula(client, message);
                }else{
                    chat.sendMessage("*"+namaBot+"*\nMohon Maaf, Nomor anda telah di banned!\nHubungi Admin di 6285608689687 untuk Info lebih lanjut.");
                }
            }else{
                ayaka(client, message);
            }
        }
    }else{
        if(menfessPengirim != false){
            if(isGroup == false){menfessMessageHandle(client, message, "pengirim");}else{message.reply("*"+namaBot+"*\n\nAnda sedang dalam sesi ")}
        }else if(menfessPenerima != false){
            if(isGroup == false){menfessMessageHandle(client, message, "penerima");}
        }else{
            if(Array.from(isiPesan)[0] == trigger){
                if(isiPesanLower == trigger+"register" || isiPesanLower == trigger+"kenalan"){
                    kenalan(client, message);
                }else{
                    let button = new Buttons("Kamu belum melakukan registrasi nomor!, jika merasa sudah registrasi mungkin data yang anda masukkan tidak valid",[{body:trigger+'register'}],namaBot,"Tekan "+trigger+"register untuk memulai registrasi");
                    chat.sendMessage(button);
                }
            }else{
               const cekSessionRegister = await registerSessionHandle.returnDataUser(nomor);
               if(cekSessionRegister != false){
                    kenalan(client, message);
               }else{
                    ayaka(client, message);
               } 
            }
        }
    }
});

