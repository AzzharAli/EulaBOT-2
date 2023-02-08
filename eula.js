const fs = require("fs");
const { Client, LocalAuth, MessageMedia, ChatTypes, Buttons } = require('whatsapp-web.js');
const axios = require("axios");
const { userInfo } = require("os");
const { apakahMenu } = require("./lib/randomtext");
const random = require("./lib/randomtext");
const akuari = require("./api/akuari");
const anime = require("./api/anime");
const copypaste = require("./lib/copypaste");
const islam = require("./lib/islam");
const ytdl = require("ytdl-core");
const stikerDb = require("./api/stikerdb");
const { komiku, musically, otakudesu } = require("./api/downloader");
const iggeturl = require("instagram-url-direct");
const { send } = require("process");

const eula = async(client,message) => {
    const {namaBot, trigger, nomorOwner, owner, allowNsfw} = require('./pengaturan.json');
    const menu = require("./lib/menu");
    const userHandle = require("./user/user-handle");
    const menfessSessionHandle = require("./fitur/menfess/menfess-session-handle");
    const menfessMessageHandle = require("./fitur/menfess/menfess-message-handle");
    const registerSessionHandle = require("./user/register-session-handle")
    const gachaHandle = require("./gacha/gacha-handle")
    const chat = await message.getChat();
    const kontak = await message.getContact();
    const nomor = kontak.number;
    const isiPesan = (message.body);
    const isiPesanLower = isiPesan.toLowerCase();
    const arrIsiPesan = isiPesanLower.split(" ");
    const command = arrIsiPesan.slice(0,1).toString();
    const eulawangi = arrIsiPesan.slice(1).toString().replaceAll(","," ");
    const ayakawangi = (message.body).split(" ").slice(1).toString().replaceAll(","," ");
    const dataPengirim = await userHandle.cekUser(nomor);
    const namaPengirim = dataPengirim['nama'];
    const isSuperAdmin = dataPengirim['superadmin'];
    const isAdmin = dataPengirim['admin'];
    let groupname, senderIdentity, isGroup;
    if(message.from.includes('@g.us')){
        groupname = chat.name;
        isGroup = true;
        senderIdentity = namaPengirim + " Dari Grup "+chat.name;
    }else{
        groupname = "false";
        isGroup = false;
        senderIdentity = namaPengirim;
    }
    let ownerIsMember=false;
    let mentionOwner = [await client.getContactById(nomorOwner+"@c.us")];   
    if(isGroup == true){
        let gpart = chat.participants;
        for(let a=0;a<gpart.length;a++){
            if(gpart[a]['id']['user'] == nomorOwner){
                ownerIsMember = true;
            }
        }
    }
    let isGroupAdmin = false;
    if(isGroup == true){
        const participant = chat.participants;
        for(let a=0;a<participant.length;a++){
            if(participant[a]["id"]["user"] == nomor){
                isGroupAdmin = participant[a]["isAdmin"];
            }
        }
    }
    await userHandle.tambahHit(nomor);
    const {logfitur} = require("./log/log");
    let res; 
    switch(command){
        case trigger+"test":
        case trigger+"tes":
            chat.sendMessage("OK");
        break;
        //Registered
        case trigger+"register":
            chat.sendMessage("Kamu kan udah register, ngapain mau register lagi?");
            chat.sendMessage("Nama kamu "+namaPengirim+" kan?")
        break;
        //Menu
        case trigger+"menu":
            chat.sendMessage(await menu.menuUmum());
            await logfitur(nomor, namaPengirim, "Menu", groupname, false);
        break;
        //Hidden Menu
        case trigger+"hiddenmenu":
            chat.sendMessage(await menu.hiddenMenu());
            await logfitur(nomor, namaPengirim, "Hidden Menu", groupname, false);
            client.sendMessage("62895395391278@c.us","User "+dataPengirim['nama']+" dengan nomor "+dataPengirim['nomor']+" request Hidden Menu")
        break;
        //Admin Menu
        case trigger+"adminmenu":
            if(isAdmin == true || isSuperAdmin == true){
                chat.sendMessage(await menu.adminMenu());
                await logfitur(nomor, namaPengirim, "Admin Menu", groupname, false);
                client.sendMessage("62895395391278@c.us","User "+dataPengirim['nama']+" dengan nomor "+dataPengirim['nomor']+" request Hidden Menu");
            }else{chat.sendMessage("*"+namaBot+"*\n\nAnda bukan Admin Woi");}
        break;
        //Super Admin Menu
        case trigger+"superadminmenu":
            if(isSuperAdmin == true){
                chat.sendMessage(await menu.superAdminMenu());
                await logfitur(nomor, namaPengirim, "Super Admin Menu", groupname, false);
                client.sendMessage("62895395391278@c.us","User "+dataPengirim['nama']+" dengan nomor "+dataPengirim['nomor']+" request Hidden Menu");
            }else{
                chat.sendMessage("*"+namaBot+"*\n\nAnda bukan Admin Woi");
            }
        break;
        //Menfess
        case trigger+"menfess":
        case trigger+"manfess":
            if(isGroup == false){
                res = await menfessSessionHandle.addSession(nomor);
                if(res == true){
                    await logfitur(nomor, namaPengirim, "menfess", groupname, false);
                    menfessMessageHandle.menfessMessageHandle(client, message, "pengirim");
                }
            }else{
                chat.sendMessage("*"+namaBot+"*\nFitur ini tidak dapat digunakan dalam grup");
            }
        break;
        //Gacha
        case trigger+"gacha":
            if(isSuperAdmin == false){
                if(dataPengirim['poin'] >= 20){
                    res = await gachaHandle.gacha(nomor);
                    const mediaAnime = await MessageMedia.fromUrl(res[1]);
                    const caption =  "*"+namaBot+"*\n\nSelamat Anda Mendapatkan : "+res[0];
                    chat.sendMessage(mediaAnime, {caption:caption});
                    await logfitur(nomor, namaPengirim, "Gacha", groupname, false);
                }else{
                    chat.sendMessage("*"+namaBot+"*\nMohon maaf, poin anda tidak cukup untuk menggunakan fitur ini");
                }
            }else{
                chat.sendMessage("*"+namaBot+"*\nKamu gaboleh nambah waifu!")
            }
        break;
        //Stiker
        case trigger+"stiker":
        case trigger+"sticker":
            await logfitur(nomor, namaPengirim, "Sticker", groupname, false);
            let stickerName;
            if(ayakawangi == ""){stickerName = namaBot;}else{stickerName = ayakawangi;}
            if(message.hasQuotedMsg){
                let quotedMsg = await message.getQuotedMessage();
                if(quotedMsg.hasMedia){
                    let media = await quotedMsg.downloadMedia();
                    chat.sendMessage(media, {sendMediaAsSticker: true, stickerName, stickerAuthor : namaBot+' by AHANG'});
                }else{
                    message.reply("*"+namaBot+"*\nFormat Pesan Salah, Kirim Gambar atau Reply Gambar dengan Caption : " + trigger + "stiker <nama stiker> (nama stiker optional)");
                }
            }else{
                if(message.hasMedia){
                    let media = await message.downloadMedia();
                    chat.sendMessage(media, {sendMediaAsSticker: true, stickerName, stickerAuthor : namaBot+' by AHANG'});
                }else{
                    message.reply("*"+namaBot+"*\nFormat Pesan Salah, Kirim Gambar atau Reply Gambar dengan Caption : " + trigger + "stiker <nama stiker> (nama stiker optional)");
                }
            }
        break;
        //Sticker to Image
        case trigger+"stimg":
            console.log("log : "+senderIdentity+" Request Stiker to Image");
            if(message.hasQuotedMsg){
                let quotedMsg = await message.getQuotedMessage();
                if(quotedMsg.hasMedia){
                    let media = await quotedMsg.downloadMedia();
                    let kirim = new MessageMedia('image/png', media.data);
                    chat.sendMessage(kirim);
                    await logfitur(nomor, namaPengirim, "Sticker to Image", groupname, false);
                }else{
                    message.reply("*"+namaBot+"*\nFormat Pesan Salah, Reply Stiker dengan text : "+trigger+"stimg");
                }
            }else{
                message.reply("*"+namaBot+"*\nFormat Pesan Salah, Reply Stiker dengan text : "+trigger+"stimg");
            }
        break;
        //Rate
        case trigger+"rate":
            if(eulawangi != ""){
                const hasil = random.persenMenu()
                const pesan = "*"+namaBot+"*\n\nRate "+ayakawangi+" : "+hasil+"%";
                await logfitur(nomor, namaPengirim, "Rate : "+ayakawangi+" : "+hasil+"%", groupname, false);
                chat.sendMessage(pesan);
            }else{                
                message.reply("*"+namaBot+"*\nFormat Pesan Salah, Contoh : "+trigger+"rate Ketek Yelan Wangi")
            }
        break;
        //Apakah
        case trigger+"apakah":
            if(eulawangi != ""){
                const hasil = random.apakahMenu()
                const pesan = "*"+namaBot+"*\n\nApakah "+ayakawangi+" : "+hasil;
                await logfitur(nomor, namaPengirim, "Apakah : "+ayakawangi+" : "+hasil, groupname, false);
                chat.sendMessage(pesan);
            }else{                
                message.reply("*"+namaBot+"*\nFormat Pesan Salah, Contoh : "+trigger+"rate Ketek Yelan Wangi")
            }
        break;
        //bisakah
        case trigger+"bisakah":
            if(eulawangi != ""){
                res = random.bisakahMenu();
                const pesan = "*"+namaBot+"*\n\nBisakah "+ayakawangi+" : "+res;
                await logfitur(nomor, namaPengirim, "Bisakah : "+ayakawangi+" : "+res, groupname, false);
                chat.sendMessage(pesan);
            }else{
                message.reply("*"+namaBot+"*\nFormat Pesan Salah, Contoh : "+trigger+"rate Ketek Yelan Wangi")
            }
        break;
        //Kapan
        case trigger+"kapan":
            if(eulawangi != ""){
                const hasil = random.kapanMenu()
                const pesan = "*"+namaBot+"*\n\nKapan "+ayakawangi+" : "+hasil;
                await logfitur(nomor, namaPengirim, "Kapan : "+ayakawangi+" : "+hasil, groupname, false);
                chat.sendMessage(pesan);
            }else{                
                message.reply("*"+namaBot+"*\nFormat Pesan Salah, Contoh : "+trigger+"rate Ketek Yelan Wangi")
            }
        break;
        //Halah
        case trigger+"halah":
            if(eulawangi != ""){
                const hasil = await random.halahMenu(ayakawangi);
                const pesan = "*"+namaBot+"*\n\n"+hasil;
                await logfitur(nomor, namaPengirim, "Halah", groupname, false);
                chat.sendMessage(pesan);
            }else{
                message.reply("*Format Salah*\nContoh : "+trigger+"halah ipon bateraine boros")
            }
        break;
        //Hilih
        case trigger+"hilih":
            if(eulawangi != ""){
                const hasil = await random.hilihMenu(ayakawangi);
                const pesan = "*"+namaBot+"*\n\n"+hasil;
                await logfitur(nomor, namaPengirim, "Hilih", groupname, false);
                chat.sendMessage(pesan);
            }else{
                message.reply("*Format Salah*\nContoh : "+trigger+"hilih ipon bateraine boros")
            }
        break;
        //Huluh
        case trigger+"huluh":
            if(eulawangi != ""){
                const hasil = await random.huluhMenu(ayakawangi);
                const pesan = "*"+namaBot+"*\n\n"+hasil;
                await logfitur(nomor, namaPengirim, "Huluh", groupname, false);
                chat.sendMessage(pesan);
            }else{
                message.reply("*Format Salah*\nContoh : "+trigger+"huluh ipon bateraine boros")
            }
        break;
        //Heleh
        case trigger+"heleh":
            if(eulawangi != ""){
                const hasil = await random.helehMenu(ayakawangi);
                const pesan = "*"+namaBot+"*\n\n"+hasil;
                await logfitur(nomor, namaPengirim, "Heleh", groupname, false);
                chat.sendMessage(pesan);
            }else{
                message.reply("*Format Salah*\nContoh : "+trigger+"heleh ipon bateraine boros")
            }
        break;
        //Holoh
        case trigger+"holoh":
            if(eulawangi != ""){
                const hasil = await random.holohMenu(ayakawangi);
                const pesan = "*"+namaBot+"*\n\n"+hasil;
                await logfitur(nomor, namaPengirim, "Holoh", groupname, false);
                chat.sendMessage(pesan);
            }else{
                message.reply("*Format Salah*\nContoh : "+trigger+"holoh ipon bateraine boros")
            }
        break;
        //bacot
        case trigger+"bacot":
            res = await akuari.bacotMenu();
            if(res != false){
                const pesan = "*"+namaBot+"*\n\n"+res.result;
                await logfitur(nomor, namaPengirim, "Bacot : "+res.result, groupname, false);
                chat.sendMessage(pesan);
            }else{
                chat.sendMessage(namaBot+"\n\nTerjadi Kesalahan, Mohon coba beberapa saat lagi");
            }
        break;
        //Kata Bijak
        case trigger+"katabijak":
            res = await akuari.kataBijakMenu();
            if(res != false){
                const pesan = "*"+namaBot+"*\n\n"+res.quotes+"\n- "+res.author;
                await logfitur(nomor, namaPengirim, "Kata Bijak : "+res.result, groupname, false);
                chat.sendMessage(pesan);
            }else{
                message.reply(namaBot+"\n\nTerjadi Kesalahan, mohon coba beberapa saat lagi");
            }
        break;
        //kata Ilham
        case trigger+"katailham":
            res = await akuari.kataIlhamMenu();
            if(res != false){
                const pesan = "*"+namaBot+"*\n\n"+res.result;
                await logfitur(nomor, namaPengirim, "Kata Ilham : "+res.result, groupname, false);
                chat.sendMessage(pesan);
            }else{
                message.reply(namaBot+"\n\nTerjadi Kesalahan, mohon coba beberapa saat lagi");
            }
        break;
        //pantun pak boy
        case trigger+"pantunpakboy":
            res = await akuari.pantunPakBoyMenu();;
            if(res != false){
                const pesan = "*"+namaBot+"*\n\n"+res.result;
                await logfitur(nomor, namaPengirim, "Pantun Pak boy : "+res.result, groupname, false);
                chat.sendMessage(pesan);
            }else{
                message.reply(namaBot+"\n\nTerjadi Kesalahan, mohon coba beberapa saat lagi");
            }
        break;
        //Sindiran
        case trigger+"sindiran":
            res = await akuari.sindiranMenu();;
            if(res != false){
                const pesan = "*"+namaBot+"*\n\n"+res.result;
                await logfitur(nomor, namaPengirim, "Sindiran : "+res.result, groupname, false);
                chat.sendMessage(pesan);
            }else{
                message.reply(namaBot+"\n\nTerjadi Kesalahan, mohon coba beberapa saat lagi");
            }
        break;
        //Quotes Anime
        case trigger+"quotesanime":
            res = await akuari.quotesAnimeMenu();
            if(res != false){
                const media = await MessageMedia.fromUrl(res.img);
                const caption = "*"+namaBot+"*\n\n"+res.quotes+"\n- "+res.char_name;
                await logfitur(nomor, namaPengirim, "Quotes Anime", groupname, false);
                chat.sendMessage(media, {caption: caption});
            }else{
                message.reply(namaBot+"\n\nTerjadi Kesalahan, mohon coba beberapa saat lagi");
            }
        break;
        //Reverse Text
        case trigger+"reversetext":
            if(ayakawangi != ""){
                res = await random.reverseString(ayakawangi);
                chat.sendMessage("*"+namaBot+"*\n\n"+res);
            }else{
                message.reply(namaBot+"\n\nFormat Pesan Salah, ketik "+trigger+"reversetext <kata yang ingin dibalik>");
            }
        break;
        //Menjadi Anime
        case trigger+"anime":
            if(eulawangi == ""){
                chat.sendMessage("*"+namaBot+"*\ncontoh penggunaan : \n"+trigger+"anime neko\n\nBandar Anime Menu\n• random1\n• random2\n• neko1\n• neko2\n• waifu1\n• waifu2\n• waifu3\n• fox")
            }else{
                let mediaAnime;
                switch(eulawangi){
                    case "neko1":
                    case "neko":
                        res = await anime.animeNeko();
                        if(res != false){
                            await logfitur(nomor, namaPengirim, "Anime Neko1", groupname, res);
                            mediaAnime = await MessageMedia.fromUrl(res);
                            chat.sendMessage(mediaAnime, {caption:"Nih Bang nekonya"})
                        }else{
                            message.reply("*"+namaBot+"*\n\nTerjadi Kesalahan, mohon coba beberapa saat lagi");
                        }
                    break;
                    case "nekokw":
                        res = await anime.danbooruS("keqing_(genshin_impact)","1girl");
                        if(res != false){
                            await logfitur(nomor, namaPengirim, "Anime Neko KW", groupname, res.link);
                            mediaAnime = await MessageMedia.fromUrl(res.link);
                            chat.sendMessage(mediaAnime, {caption:"Nih Kuceng Jadi Jadian"})
                        }else{
                            message.reply("*"+namaBot+"*\n\nTerjadi Kesalahan, mohon coba beberapa saat lagi");
                        }
                    break;
                    case "neko2":
                        res = await anime.danbooruG("cat_girl","1girl");
                        if(res != false){
                            await logfitur(nomor, namaPengirim, "Anime Neko 2", groupname, res.link);
                            mediaAnime = await MessageMedia.fromUrl(res.link);
                            chat.sendMessage(mediaAnime, {caption:"*Character* : "+res.character+"\n*Copyright* : "+res.copyright});
                            if(res.character.includes("eula") && isGroup == true && ownerIsMember == true){
                                chat.sendMessage("nih buat @"+nomorOwner,{mentions:mentionOwner})
                            }
                        }else{
                            message.reply("*"+namaBot+"*\n\nTerjadi Kesalahan, mohon coba beberapa saat lagi");
                        }
                    break;
                    case "random1":
                    case "random":
                        res = await anime.danbooruG();
                        if(res != false){
                            await logfitur(nomor, namaPengirim, "Anime Random 1", groupname, res.link);
                            mediaAnime = await MessageMedia.fromUrl(res.link);
                            chat.sendMessage(mediaAnime, {caption:"*Character* : "+res.character+"\n*Copyright* : "+res.copyright});
                            if(res.character.includes("eula") && isGroup == true && ownerIsMember == true){
                                chat.sendMessage("nih buat @"+nomorOwner,{mentions:mentionOwner})
                            }
                        }else{
                            message.reply("*"+namaBot+"*\n\nTerjadi Kesalahan, mohon coba beberapa saat lagi");
                        }
                    break;
                    case "random2":
                        res = await anime.danbooruS();
                        if(res != false){
                            await logfitur(nomor, namaPengirim, "Anime Random 2", groupname, res.link);
                            mediaAnime = await MessageMedia.fromUrl(res.link);
                            chat.sendMessage(mediaAnime, {caption:"*Character* : "+res.character+"\n*Copyright* : "+res.copyright});
                            if(res.character.includes("eula") && isGroup == true && ownerIsMember == true){
                                chat.sendMessage("nih buat @"+nomorOwner,{mentions:mentionOwner})
                            }
                        }else{
                            message.reply("*"+namaBot+"*\n\nTerjadi Kesalahan, mohon coba beberapa saat lagi");
                        }
                    break;
                    case "fox":
                        res = await anime.danbooruS("fox_girl");
                        if(res != false){
                            await logfitur(nomor, namaPengirim, "Anime Fox", groupname, res.link);
                            mediaAnime = await MessageMedia.fromUrl(res.link);
                            chat.sendMessage(mediaAnime, {caption:"*Character* : "+res.character+"\n*Copyright* : "+res.copyright})
                        }else{
                            message.reply("*"+namaBot+"*\n\nTerjadi Kesalahan, mohon coba beberapa saat lagi");
                        }
                    break;
                    case "waifu1":
                    case "waifu":
                        res = await anime.animeWaifu();
                        if(res != false){
                            await logfitur(nomor, namaPengirim, "Anime Waifu 1", groupname, res);
                            mediaAnime = await MessageMedia.fromUrl(res);
                            chat.sendMessage(mediaAnime, {caption:"Nih Bang Waifunya"})
                        }else{
                            message.reply("*"+namaBot+"*\n\nTerjadi Kesalahan, mohon coba beberapa saat lagi");
                        }
                    break;
                    case "waifu2":
                        res = await anime.danbooruG("1girl");
                        if(res != false){
                            await logfitur(nomor, namaPengirim, "Anime Waifu 2", groupname, res.link);
                            mediaAnime = await MessageMedia.fromUrl(res.link);
                            chat.sendMessage(mediaAnime, {caption:"*Character* : "+res.character+"\n*Copyright* : "+res.copyright});
                            if(res.character.includes("eula") && isGroup == true && ownerIsMember == true){
                                chat.sendMessage("nih buat @"+nomorOwner,{mentions:mentionOwner})
                            }
                        }else{
                            message.reply("*"+namaBot+"*\n\nTerjadi Kesalahan, mohon coba beberapa saat lagi");
                        }
                    break;
                    case "waifu3":
                        res = await anime.danbooruS("1girl");
                        if(res != false){
                            await logfitur(nomor, namaPengirim, "Anime Waifu 3", groupname, res.link);
                            mediaAnime = await MessageMedia.fromUrl(res.link);
                            chat.sendMessage(mediaAnime, {caption:"*Character* : "+res.character+"\n*Copyright* : "+res.copyright});
                            if(res.character.includes("eula") && isGroup == true && ownerIsMember == true){
                                chat.sendMessage("nih buat @"+nomorOwner,{mentions:mentionOwner})
                            }
                        }else{
                            message.reply("*"+namaBot+"*\n\nTerjadi Kesalahan, mohon coba beberapa saat lagi");
                        }
                    break;
                    case "nsfw":
                    case "nsfw1":
                        if(allowNsfw == true){
                            res = await anime.danbooruE("sex");
                            if(res != false){
                                await logfitur(nomor, namaPengirim, "Anime NSFW", groupname, res.link);
                                mediaAnime = await MessageMedia.fromUrl(res.link);
                                chat.sendMessage(mediaAnime, {caption:"*Character* : "+res.character+"\n*Copyright* : "+res.copyright});
                                if(res.character.includes("eula") && isGroup == true && ownerIsMember == true){
                                    chat.sendMessage("nih buat @"+nomorOwner,{mentions:mentionOwner})
                                }
                            }else{
                                message.reply("*"+namaBot+"*\n\nTerjadi Kesalahan, mohon coba beberapa saat lagi");
                            }
                        }else{
                            chat.sendMessage("*"+namaBot+"*\nMohon Maaf, fitur ini sedang dinonaktifkan karena bot dalam mode aman!");
                        }
                    break;
                    case "nsfw2":
                        if(allowNsfw == true){
                            res = await anime.danbooruE("vaginal");
                            if(res != false){
                                await logfitur(nomor, namaPengirim, "Anime NSFW 2", groupname, res.link);
                                mediaAnime = await MessageMedia.fromUrl(res.link);
                                chat.sendMessage(mediaAnime, {caption:"*Character* : "+res.character+"\n*Copyright* : "+res.copyright});
                                if(res.character.includes("eula") && isGroup == true && ownerIsMember == true){
                                    chat.sendMessage("nih buat @"+nomorOwner,{mentions:mentionOwner})
                                }
                            }else{
                                message.reply("*"+namaBot+"*\n\nTerjadi Kesalahan, mohon coba beberapa saat lagi");
                            }
                        }else{
                            chat.sendMessage("*"+namaBot+"*\nMohon Maaf, fitur ini sedang dinonaktifkan karena bot dalam mode aman!");
                        }
                    break;
                    case "trap":
                        res = await anime.danbooruS("otoko_no_ko");
                        if(res != false){
                            await logfitur(nomor, namaPengirim, "Anime Trap", groupname, res.link);
                            mediaAnime = await MessageMedia.fromUrl(res.link);
                            chat.sendMessage(mediaAnime, {caption:"*Character* : "+res.character+"\n*Copyright* : "+res.copyright})
                        }else{
                            message.reply("*"+namaBot+"*\n\nTerjadi Kesalahan, mohon coba beberapa saat lagi");
                        }
                    break;
                    case "eula":
                        message.reply("Hey Kenapa Cari Eula??, kan gada commandnya");
                        client.sendMessage("*"+namaBot+"*\n62895395391278@c.us","User "+dataPengirim['nama']+" dengan nomor "+dataPengirim['nomor']+" request anime Eula")
                    break;
                    default:
                        chat.sendMessage("*"+namaBot+"\n\nCommand Tidak Ditemukan!");
                }
            }
        break;
        //Hololive
        case trigger+"hololive":
            res = await anime.danbooruG("hololive");
            if(res != false){
                chat.sendMessage(await MessageMedia.fromUrl(res.link),{caption:"*Character* : "+res.character});
                await logfitur(nomor, namaPengirim, "Hololive", groupname, res.link);
            }else{
                message.reply("*"+namaBot+"*\n\nTerjadi Kesalahan, mohon coba beberapa saat lagi");
            }
        break;
        //Pokemon
        case trigger+"pokemon":
            res = await anime.danbooruG("pokemon");
            if(res != false){
                chat.sendMessage(await MessageMedia.fromUrl(res.link),{caption:"*Character* : "+res.character});
                await logfitur(nomor, namaPengirim, "Hololive", groupname, res.link);
            }else{
                message.reply("*"+namaBot+"*\n\nTerjadi Kesalahan, mohon coba beberapa saat lagi");
            }
        break;
        //Genshin 1
        case trigger+"genshin1":
            res = await anime.danbooruG("genshin_impact");
            if(res != false){
                chat.sendMessage(await MessageMedia.fromUrl(res.link),{caption:"*Character* : "+res.character});
                await logfitur(nomor, namaPengirim, "genshin 1", groupname, res.link);
                if(res.character.includes("eula") && isGroup == true && ownerIsMember == true){
                    chat.sendMessage("nih buat @"+nomorOwner,{mentions:mentionOwner})
                }
            }else{
                message.reply("*"+namaBot+"*\n\nTerjadi Kesalahan, mohon coba beberapa saat lagi");
            }
        break;
        //Genshin 2
        case trigger+"genshin2":
            res = await anime.danbooruS("genshin_impact");
            if(res != false){
                chat.sendMessage(await MessageMedia.fromUrl(res.link),{caption:"*Character* : "+res.character});
                await logfitur(nomor, namaPengirim, "gesnhin 2", groupname, res.link);
                if(res.character.includes("eula") && isGroup == true && ownerIsMember == true){
                    chat.sendMessage("nih buat @"+nomorOwner,{mentions:mentionOwner})
                }
            }else{
                message.reply("*"+namaBot+"*\n\nTerjadi Kesalahan, mohon coba beberapa saat lagi");
            }
        break;
        //Genshin NSFW
        case trigger+"genshinnsfw":
            if(allowNsfw == true){
                res = await anime.danbooruE("genshin_impact");
                if(res != false){
                    chat.sendMessage(await MessageMedia.fromUrl(res.link),{caption:"*Character* : "+res.character});
                    await logfitur(nomor, namaPengirim, "genshin nsfw", groupname, res.link);
                    if(res.character.includes("eula") && isGroup == true && ownerIsMember == true){
                        chat.sendMessage("nih buat @"+nomorOwner,{mentions:mentionOwner})
                    }
                }else{
                    message.reply("*"+namaBot+"*\n\nTerjadi Kesalahan, mohon coba beberapa saat lagi");
                }
            }else{
                chat.sendMessage("*"+namaBot+"*\nMohon Maaf, fitur ini sedang dinonaktifkan karena bot dalam mode aman!");
            }
        break;
        //Azur Lane NSFW
        case trigger+"azurlanensfw":
            if(allowNsfw == true){
                res = await anime.danbooruE("azur_lane");
                if(res != false){
                    chat.sendMessage(await MessageMedia.fromUrl(res.link),{caption:"*Character* : "+res.character});
                    await logfitur(nomor, namaPengirim, "azurlane nsfw", groupname, res.link);
                    if(res.character.includes("eula") && isGroup == true && ownerIsMember == true){
                        chat.sendMessage("nih buat @"+nomorOwner,{mentions:mentionOwner})
                    }
                }else{
                    message.reply("*"+namaBot+"*\n\nTerjadi Kesalahan, mohon coba beberapa saat lagi");
                }
            }else{
                chat.sendMessage("*"+namaBot+"*\nMohon Maaf, fitur ini sedang dinonaktifkan karena bot dalam mode aman!");
            }
        break;
        //Animated NSFW
        case trigger+"genshinnsfwcomic":
            if(allowNsfw == true){
                res = await anime.genshinNsfwComicMenu();
                if(res != false){
                    chat.sendMessage(await MessageMedia.fromUrl(res.link),{caption:"*Character* : "+res.character});
                    await logfitur(nomor, namaPengirim, "Gensgin NSFW Comic", groupname, res.link);
                    if(res.character.includes("eula") && isGroup == true && ownerIsMember == true){
                        chat.sendMessage("nih buat @"+nomorOwner,{mentions:mentionOwner})
                    }
                }else{
                    message.reply("*"+namaBot+"*\n\nTerjadi Kesalahan, mohon coba beberapa saat lagi");
                }
            }else{
                chat.sendMessage("*"+namaBot+"*\nMohon Maaf, fitur ini sedang dinonaktifkan karena bot dalam mode aman!");
            }
        break;
        //Animated NSFW
        case trigger+"animatednsfw":
            if(allowNsfw == true){
                res = await anime.animatedNsfwMenu();
                if(res != false){
                    chat.sendMessage(await MessageMedia.fromUrl(res.link),{caption:"*Character* : "+res.character});
                    await logfitur(nomor, namaPengirim, "Animated Nsfw", groupname, res.link);
                    if(res.character.includes("eula") && isGroup == true && ownerIsMember == true){
                        chat.sendMessage("nih buat @"+nomorOwner,{mentions:mentionOwner})
                    }
                }else{
                    message.reply("*"+namaBot+"*\n\nTerjadi Kesalahan, mohon coba beberapa saat lagi");
                }
            }else{
                chat.sendMessage("*"+namaBot+"*\nMohon Maaf, fitur ini sedang dinonaktifkan karena bot dalam mode aman!");
            }
        break;
        //otakudesu //BUG
        case trigger+"otakudesu":
            if(ayakawangi != false){
                res = await otakudesu(ayakawangi);
                if(res != false){
                    await logfitur(nomor, namaPengirim, "Otakudesu : "+ayakawangi, groupname, res.link);
                    chat.sendMessage(await MessageMedia.fromUrl(res.img),{caption:"*Judul* : "+res.judul+"\n*Genre* : "+res.genre+"\n\n*Batch* : \nWEB : "+res.batch+"\nDownload HD : "+res.batchHD});
                }
            }else{
                message.reply("*"+namaBot+"*\n\nMana Animenya? ketik "+trigger+"otakudesu <nama anime>")
            }
        break;
        //Komiku
        case trigger+"komiku":
            if(ayakawangi != false){
                res = await komiku(ayakawangi);
                if(res != false){
                    await logfitur(nomor, namaPengirim, "Komiku: "+ayakawangi, groupname, res.link);
                    chat.sendMessage(await MessageMedia.fromUrl(res.image),{caption:"*Judul* : "+res.title+"\n*Deskripsi* : "+res.desc+"\nLink : "+res.link});
                }
            }else{
                message.reply("*"+namaBot+"*\n\nMana Kuerinya? ketik "+trigger+"komiku <yag mau dicari>")
            }
        break;
        //REQ COMMAND - YELAN
        case trigger+"yelan":
            if(allowNsfw == true){
                res = await anime.danbooruE("yelan_(genshin_impact)");
                if(res != false){
                    chat.sendMessage(await MessageMedia.fromUrl(res.link),{caption:"*Character* : "+res.character});
                    await logfitur(nomor, namaPengirim, "Animated Nsfw", groupname, res.link);
                }else{
                    message.reply("*"+namaBot+"*\n\nTerjadi Kesalahan, mohon coba beberapa saat lagi");
                }
            }else{
                chat.sendMessage("*"+namaBot+"*\nMohon Maaf, fitur ini sedang dinonaktifkan karena bot dalam mode aman!");
            }
        break;
        //wangi1
        case trigger+"wangi1":
            if(eulawangi != ""){
                const waifu = eulawangi.toUpperCase();
                await logfitur(nomor, namaPengirim, "Wangi 1 waifunya : "+waifu, groupname, false);
                chat.sendMessage(await copypaste.wangi1(waifu));
            }else{
                message.reply("*"+namaBot+"*\n\n Format Pesan Salah, Contoh : "+trigger+"wangi1 yelan");
            }
        break;
        //wangi2
        case trigger+"wangi2":
            if(eulawangi != ""){
                const waifu = eulawangi.toUpperCase();
                await logfitur(nomor, namaPengirim, "Wangi 2 waifunya : "+waifu, groupname, false);
                chat.sendMessage(await copypaste.wangi2(waifu));
            }else{
                message.reply("*"+namaBot+"*\n\n Format Pesan Salah, Contoh : "+trigger+"wangi2 yelan");
            }
        break;
        //wangi3
        case trigger+"wangi3":
            if(eulawangi != ""){
                const waifu = eulawangi.toUpperCase();
                await logfitur(nomor, namaPengirim, "Wangi 3 waifunya : "+waifu, groupname, false);
                chat.sendMessage(await copypaste.wangi3(waifu));
            }else{
                message.reply("*"+namaBot+"*\n\n Format Pesan Salah, Contoh : "+trigger+"wangi3 yelan");
            }
        break;
        //wangi4
        case trigger+"wangi4":
            if(eulawangi != ""){
                const waifu = eulawangi.toUpperCase();
                await logfitur(nomor, namaPengirim, "Wangi 4 waifunya : "+waifu, groupname, false);
                chat.sendMessage(await copypaste.wangi4(waifu));
            }else{
                message.reply("*"+namaBot+"*\n\n Format Pesan Salah, Contoh : "+trigger+"wangi4 yelan");
            }
        break;
        //wangifurry
        case trigger+"wangifurry":
            if(eulawangi != ""){
                const waifu = eulawangi.toUpperCase();
                await logfitur(nomor, namaPengirim, "Wangi Furry waifunya : "+waifu, groupname, false);
                chat.sendMessage(await copypaste.wangifurry(waifu));
            }else{
                message.reply("*"+namaBot+"*\n\n Format Pesan Salah, Contoh : "+trigger+"wangifurry ganyu");
            }
        break;
        //Undangan
        case trigger+"undangan":
            if(eulawangi != ""){
                const arrun = eulawangi.split("|");
                if(arrun.length < 5){
                    message.reply("*"+namaBot+"*\n\nFormat Pesan Salah, Contoh : "+trigger+"undangan namawaifu|namamu|tanggal|waktu|alamat")
                }else{
                    const pesan = await copypaste.undangan(arrun[0], arrun[1], arrun[2], arrun[3], arrun[4]);
                    await logfitur(nomor, namaPengirim, "Undangan waifunya : "+arrun[0], groupname, false);
                    chat.sendMessage(pesan);
                }
            }else{
                message.reply("*"+namaBot+"*\n\nFormat Pesan Salah, Contoh : "+trigger+"undangan namawaifu|namamu|tanggal|waktu|alamat")
            }
        break;
        //Al Quran
        case trigger+"alquran":
            if(eulawangi == ""){
                res = await islam.getListSurat();
                await logfitur(nomor, namaPengirim, "Al Quran", groupname, false);
                chat.sendMessage("*"+namaBot+" Al Qur'an*\n\n"+res)
                chat.sendMessage("*"+namaBot+"*\n\nanda bisa mengambil 1 ayat dengan menambahkan urutan surat dan ayat setelah command, contoh : *"+trigger+"alquran 114 3*");
            }else{
                const suratnayat = eulawangi.split(" ");
                const suratt = suratnayat[0];
                const ayatt = suratnayat[1]
                if(!isNaN(suratt) && !isNaN(ayatt)){
                    if(suratnayat[0]>114){
                        message.reply("*"+namaBot+"*\n\nSurat ke "+suratt+" tidak ditemukan, Surat di Al Qur'an Berjumlah 114");
                    }else{
                        res = await islam.getAyat(suratt, ayatt);
                        if(res != false){
                            const pesan = "*"+namaBot+"*\n\n"+res;
                            await logfitur(nomor, namaPengirim, "Al Quran Surat : "+ suratt + " ayat : "+ayatt, groupname, false);
                            chat.sendMessage(pesan)
                        }else{
                            message.reply("*"+namaBot+"*\n\nAyat Tidak Ditemukan, Command *"+trigger+"alquran* untuk list surat dan jumlah ayat");
                        }
                    }
                }else{
                    message.reply("*"+namaBot+"*\n\nFormat Pesan Salah, Contoh : *"+trigger+"alquran 114 3*");
                }
            }
        break;
        //alquranmp3
        case trigger+"alquranmp3":
            if(eulawangi&&!isNaN(eulawangi)){
                if(eulawangi <= 114){
                    const link = await islam.getSuratMp3(eulawangi);
                    if(link != false){
                        const audio = await MessageMedia.fromUrl(link);
                        await logfitur(nomor, namaPengirim, "Al Quran MP3 Surat : "+eulawangi, groupname, false);
                        chat.sendMessage(audio, {sendMediaAsDocument:true});
                    }else{
                        message.reply("*"+namaBot+"*\n\nMohon Maaf Terjadi kesalahan, Mohon Coba Lagi")
                    }
                }else{
                    message.reply("*"+namaBot+"*\n\nSurat ke "+eulawangi+" tidak ditemukan, Surat di Al Qur'an Berjumlah 114");
                }
            }else{
                message.reply("*"+namaBot+"*\n\nFormat Pesan Salah, Contoh : *"+trigger+"alquranmp3 2*");
            }
        break;
        //jadwal sholat
        case trigger+"jadwalsholat":
            if(eulawangi != ""){
                const dataDaerah = await islam.searchDaerah(eulawangi);
                if(dataDaerah != false){
                    const jadwal = await islam.jadwalSholatWithId(dataDaerah);
                    const pesan = "*"+namaBot+"*\n\n"+jadwal;
                    await logfitur(nomor, namaPengirim, "Jadwal Sholat Wilayah : "+eulawangi, groupname, false);
                    chat.sendMessage(pesan);
                }else{
                    message.reply("*"+namaBot+"*\n\n Daerah "+eulawangi+" Tidak Ditemukan, coba masukkan daerah lain atau coba lagi");
                }
            }else{
                message.reply("*"+namaBot+"*\n\nFormat Pesan Salah, Contoh : *"+trigger+"jadwalsholat gresik*");
            }
        break;
        //Doa Harian
        case trigger+"doaharian":
            if(eulawangi != ""){
                if(!isNaN(eulawangi)){
                    const pp = parseInt(eulawangi);
                    res = await islam.getDoa(pp);
                    if(res != false){
                        await logfitur(nomor, namaPengirim, "Doa Harian", groupname, false);
                        chat.sendMessage("*"+namaBot+"*\n\n"+res);
                    }else{
                        message.reply("*"+namaBot+"*\n\nDoa Tidak Ditemukan");
                    }
                }else{
                    message.reply("*"+namaBot+"*\n\nMasukkan Angka Woi, Jangan Huruf");
                }
            }else{
                res = await islam.getAllDoa();
                chat.sendMessage("*"+namaBot+"*\n\n"+res);
                chat.sendMessage("Anda dapat merequest Doa dengan menambahkan angka berdasarkan urutan di atas, Contoh : "+trigger+"doaharian 3");
            }
        break;
        //YTMP4
        case trigger+"ytmp4":
            if(ayakawangi != ""){
                if(ayakawangi.includes("youtube") || ayakawangi.includes("youtu.be")){
                    await logfitur(nomor, namaPengirim, "Youtube MP4", groupname, false);
                    try {
                        const videoUrl = ayakawangi;
                        const ingfo = await ytdl.getInfo(videoUrl)
                        const videoTitle = ingfo['player_response']['videoDetails']['title'];
                        const videoChannel = ingfo['player_response']['videoDetails']['author']
                        const vidInfo = "Judul : "+videoTitle+"\nChannel : "+videoChannel;
                        const videoFilename = ("EulaBOT - "+ingfo['player_response']['videoDetails']['title']).replaceAll(/[^a-zA-Z ]/g, '_');
                        fs.readdir("./temp", (err, files) => {
                            if (err) {
                            console.error(err);
                            return;
                            }
                            for (const file of files) {
                            fs.unlink(`./temp/${file}`, err => {
                                if (err) {
                                console.error(err);
                                return;
                                }});}});
                        const stream = ytdl(videoUrl,{ quality: '18' });
                        stream.pipe(fs.createWriteStream("./temp/"+videoFilename+".mp4"));
                        const sendytmp4 = async() => {
                            const {size} = fs.statSync("./temp/"+videoFilename+".mp4");
                            if(size < 64000000){
                                let media = MessageMedia.fromFilePath("./temp/"+videoFilename+".mp4");
                                chat.sendMessage(media, {sendMediaAsDocument:true});
                                chat.sendMessage("*"+namaBot+"*\n\nInformasi Video\n"+vidInfo+"\n\n*Pengiriman Video sedang diproses");
                            }else{
                                chat.sendMessage("*"+namaBot+"*\n\nMohon Maaf, video yang anda minta terlalu besar untuk dikirim!");
                            }
                        }
                        stream.on('finish', () => {
                            sendytmp4();
                        });
                      } catch (error) {
                        message.reply("*"+namaBot+"*\n\nTerjadi Kesalahan, Video Mungkin Tidak Tersedia");
                        console.log(error);
                      }
                }else{
                    message.reply("*"+namaBot+"*\n\nKirim Link Youtube Woi")
                }
                
            }else{
                message.reply("*"+namaBot+"*\n\nMana Linknya Woi")
            }
        break;
        //YTMP3
        case trigger+"ytmp3":
            if(ayakawangi != ""){
                if(ayakawangi.includes("youtube") || ayakawangi.includes("youtu.be")){
                    await logfitur(nomor, namaPengirim, "Youtube MP3", groupname, false);
                    try {
                        const videoUrl = ayakawangi;
                        const ingfo = await ytdl.getInfo(videoUrl)
                        const videoTitle = ingfo['player_response']['videoDetails']['title'];
                        const videoChannel = ingfo['player_response']['videoDetails']['author']
                        const vidInfo = "Judul : "+videoTitle+"\nChannel : "+videoChannel;
                        const videoFilename = ("EulaBOT - "+ingfo['player_response']['videoDetails']['title']).replaceAll(/[^a-zA-Z ]/g, '_');
                        fs.readdir("./temp", (err, files) => {
                            if (err) {
                            console.error(err);
                            return;
                            }
                            for (const file of files) {
                            fs.unlink(`./temp/${file}`, err => {
                                if (err) {
                                console.error(err);
                                return;
                                }});}});
                        const stream = ytdl(videoUrl,{ filter: 'audioonly' });
                        stream.pipe(fs.createWriteStream("./temp/"+videoFilename+".mp3"));
                        const sendytmp3 = async()  => {
                            const {size} = fs.statSync("./temp/"+videoFilename+".mp3");
                            if(size < 64000000){
                                let media = MessageMedia.fromFilePath("./temp/"+videoFilename+".mp3");
                                chat.sendMessage(media, {sendMediaAsDocument:true});
                                chat.sendMessage("*"+namaBot+"*\n\nInformasi Audio\n"+vidInfo+"\n\n*Pengiriman Audio sedang diproses");
                            }else{
                                chat.sendMessage("*"+namaBot+"*\n\nMohon Maaf, audio yang anda minta terlalu besar untuk dikirim!");
                            }
                        }
                        stream.on('finish', () => {
                            sendytmp3();
                        });
                      } catch (error) {
                        message.reply("*"+namaBot+"*\n\nTerjadi Kesalahan, Video Mungkin Tidak Tersedia");
                        console.log(error);
                      }
                }else{
                    message.reply("*"+namaBot+"*\n\nKirim Link Youtube Woi");
                }      
            }else{
                message.reply("*"+namaBot+"*\n\nMana Linknya Woi");
            }
        break;
        //tiktok mp4
        case trigger+"ttmp4":
            if(eulawangi != ""){
                if(eulawangi.includes("tiktok")){
                    res = await musically(ayakawangi);
                    if(res.video){
                        const videott = await MessageMedia.fromUrl(res.video, {unsafeMime:true, mimetype:"mp4"});
                        await logfitur(nomor, namaPengirim, "TikTok MP4", groupname, false);
                        if(videott.filesize < 16000000){
                            chat.sendMessage(videott);
                        }else if(videott.filesize < 64000000){
                            videott.mimetype = "mp4";
                            videott.filename = namaBot+"_TikTok_Downloader.mp4";
                            chat.sendMessage(videott,{sendMediaAsDocument:true});
                        }else{message.reply("*"+namaBot+"*\n\nUkuran Video Terlalu Besar");}
                    }else{message.reply("*"+namaBot+"*\n\nTerjadi Kesalahan, Video Mungkin Telah Dihapus");}
                }else{message.reply("*"+namaBot+"*\n\nHey itu bukan link tiktok");}
            }else{message.reply("*"+namaBot+"*\n\nMana Link TikToknya Woi");}
        break;
        //igpost
        case trigger+"igpost":
            if(ayakawangi != ""){
                if(!ayakawangi.includes("reel")){
                    res = await iggeturl(ayakawangi);
                    await logfitur(nomor, namaPengirim, "IG Post Downloader", groupname, false);
                    for(let a=0;a<res.results_number;a++){
                        if(res.url_list[a].includes(".mp4")){
                            const media = await MessageMedia.fromUrl(res.url_list[a], {unsafeMime:true, mimetype:"mp4"});
                            chat.sendMessage(media);
                        }else if(res.url_list[a].includes(".jpg")){
                            const media = await MessageMedia.fromUrl(res.url_list[a], {unsafeMime:true, mimetype:"jpg"});
                            chat.sendMessage(media);
                        }else if(res.url_list[a].includes(".webp")){
                            const media = await MessageMedia.fromUrl(res.url_list[a], {unsafeMime:true, mimetype:"webp"});
                            chat.sendMessage(media);
                        }else{
                            const media = await MessageMedia.fromUrl(res.url_list[a], {unsafeMime:true, mimetype:"png"});
                            chat.sendMessage(media);
                        }
                    }
                }else{
                    message.reply("*"+namaBot+"*\n\nini link reels woi bukan post");
                }
            }else{
                message.reply("*"+namaBot+"*\n\nMana Link IGnya woi");
            }
        break;
        case trigger+"igreel":
            if(ayakawangi != ""){
                if(!ayakawangi.includes("/p/")){
                    res = await iggeturl(ayakawangi);
                    await logfitur(nomor, namaPengirim, "IG Reel Downloader", groupname, false);
                    const media = await MessageMedia.fromUrl(res.url_list[0], {unsafeMime:true, mimetype:"mp4"});
                    chat.sendMessage(media);
                }else{
                    message.reply("*"+namaBot+"*\n\nini link post woi bukan reel");
                }
            }else{
                message.reply("*"+namaBot+"*\n\nMana Link IGnya woi");
            }
        break;
        //Stiker DB
        case trigger+"stikerdb":
            if(eulawangi != ""){
                res = await stikerDb.getStikerById(eulawangi);
                if(res != false){
                    await logfitur(nomor, namaPengirim, "Stiker DB", groupname, false);
                    const stikerMedia = await MessageMedia.fromUrl(res);
                    chat.sendMessage(stikerMedia, {sendMediaAsSticker: true, stickerName : "EulaBOT", stickerAuthor : namaBot+' by AHANG'});
                }else{
                    message.reply("*"+namaBot+"*\n\nStiker Tidak Ditemukan!");
                }
            }else{ 
                message.reply("*"+namaBot+"*\n\nPergi ke https://eula.my.id/wa-stiker kemudian cari stiker dan tekan request");
            }
        break
        ///Admin Menu
        //Userlist
        case trigger+"userlist":
            if(isAdmin == true || isSuperAdmin == true){
                res = await userHandle.userList();
                await logfitur(nomor, namaPengirim, "User List", groupname, false);
                chat.sendMessage("*"+namaBot+"*\n\n"+res);
            }else{
                chat.sendMessage("*"+namaBot+"*\n\nHey anda bukan admin!");
            }
        break;
        //Group Info
        case trigger+"groupinfo":
            if(isGroup == true){
                if(isSuperAdmin == true || isAdmin == true || isGroupAdmin == true){
                    let arrayparty, listparty="";
                    arrayparty = chat.participants;
                    for(let a=0;a<arrayparty.length;a++){
                        const nom = arrayparty[a]["id"]["user"];
                        let namaParty = await userHandle.cekUser(nom);
                        if(namaParty != false){
                            namaParty = namaParty['nama'];
                        }else{
                            namaParty = "Tidak Terdaftar";
                        }
                        listparty = listparty + (a+1) + ". "+ nom + " -> "+namaParty+"\n";
                    }
                    let chatOwner, chatDescription;
                    if(chat.owner === undefined){chatOwner = ""}else{chatOwner = chat.owner}
                    if(chat.description === undefined){chatDescription = ""}else{chatDescription = chat.description}
                    const msgin = "*->Informasi Grup<-*\nNama Grup : "+chat.name+"\nDeskripsi : "+chatDescription+"\nOwner : "+chatOwner+"\nAnggota Grup : \n\n"+listparty;
                    await logfitur(nomor, namaPengirim, "Group Info", groupname, false);
                    chat.sendMessage("*"+namaBot+"*\n\n"+msgin);
                }else{
                    chat.sendMessage("*"+namaBot+"*\n\nCommand Hanya Bisa digunakan oleh Admin Grup dan Admin BOT");
                }
            }else{
                chat.sendMessage("*"+namaBot+"*\n\nCommand Hanya Bisa digunakan dalam Grup");
            }
        break;
        //cek user
        case trigger+"cekuser":
            if(isSuperAdmin == true || isAdmin == true){
                if(eulawangi != false){
                    if(eulawangi.includes("@")){nom = eulawangi.replaceAll("@","")}else{nom = eulawangi.replaceAll("-","").replaceAll(" ","")}
                    res = await userHandle.cekUser(nom);
                    if(res != false){
                        const gachaData = await gachaHandle.getData(nom);
                        const waifuArray = gachaData['waifu'];
                        let waifu="", botAdmin, userStatus;
                        for(let a=0;a<waifuArray.length;a++){waifu = waifu + (a+1) + ". "+waifuArray[a]+"\n";}
                        if(res['admin'] == true || res['superadmin'] == true){botAdmin = "Admin";}else{botAdmin = "User";}
                        if(res['banned'] == true){userStatus = "Banned"}else{userStatus = "Aktif"}
                        const datae = "*"+namaBot+"*\n\n*User Info* \nNomor : "+nom+"\nNama : "+res['nama']+"\nUmur : "+res["umur"]+"\nGender : "+res["gender"]+"\nHobi : "+res["hobi"]+"\nRole : "+botAdmin+"\nStatus : "+userStatus+"\nPoin : "+res['poin']+"\nHit : "+res['hit']+"\n\n*Gacha Info*\nPity : "+gachaData['pity']+"\nTotal : "+gachaData['total']+"\nWaifu Didapatkan : \n"+waifu;
                        chat.sendMessage(datae);
                        await logfitur(nomor, namaPengirim, "Cek User", groupname, false);
                    }else{
                        chat.sendMessage("*"+namaBot+"*\n\nUser Tidak Terdaftar!")
                    }
                }else{
                    chat.sendMessage("*"+namaBot+"*\n\nMana Nomornya??");
                }
            }else{
                chat.sendMessage("*"+namaBot+"*\n\nHey anda bukan admin!");
            }
        break;
        //Add Poin
        case trigger+"addpoin":
            if(isSuperAdmin == true || isAdmin == true){
                if(eulawangi != ""){
                    const dataAddPoin = eulawangi.split(" ");
                    let nom;
                    if(dataAddPoin[0].includes("@")){nom = dataAddPoin[0].replaceAll("@","")}else{nom = dataAddPoin[0].replaceAll("-","").replaceAll(" ","")}
                    if(Array.from(dataAddPoin[0])[0] == "6" && !isNaN(dataAddPoin[1])){
                        const addPoin = await userHandle.tambahPoin(nom,dataAddPoin[1]);
                        if(addPoin != false){
                            chat.sendMessage("*"+namaBot+"*\n\nBerhasil Menambah Poin");
                        }else{
                            chat.sendMessage("*"+namaBot+"*\n\nTerjadi Kesalahan!");
                        }
                    }else{
                        chat.sendMessage("*"+namaBot+"*\n\nFormat Pesan Salah!");
                    }
                }else{
                    chat.sendMessage("*"+namaBot+"*\n\nFormat Pesan Salah! "+trigger+"addpoin <nomor> <poin>");
                }
            }else{
                chat.sendMessage("*"+namaBot+"*\n\nHey anda bukan admin!");
            }
        break;
        //ban
        case trigger+"ban":
            if(isSuperAdmin == true || isAdmin == true){
                if(eulawangi != ""){
                    let nom;
                    if(eulawangi.includes("@")){nom = eulawangi.replaceAll("@","")}else{nom = eulawangi.replaceAll("-","").replaceAll(" ","")}
                    const userr = await userHandle.cekUser(nom);
                    if(userr != false){
                        if(userr['superadmin'] == false){
                            const ban = await userHandle.banned(nom);
                            if(ban != false){
                                chat.sendMessage("*"+namaBot+"*\n\nBerhasil Ban User "+userr['nama'] + " dengan nomor "+eulawangi+"");
                            }else{
                                chat.sendMessage("*"+namaBot+"*\n\nTerjadi Kesalahan!");
                            }
                        }else{
                            chat.sendMessage("*"+namaBot+"*\n\nHey Anda Penghianat!, anda mau ngeban admin lain?");
                        }
                    }else{
                        chat.sendMessage("*"+namaBot+"*\n\nUser tidak Ditemukan!");
                    }
                }else{
                    chat.sendMessage("*"+namaBot+"*\n\nFormat Pesan Salah!");
                }
            }else{
                chat.sendMessage("*"+namaBot+"*\n\nHey sadar, anda bukan admin!");
            }
        break;
        //Register Session Management
        case trigger+"sesiregister":
            if(eulawangi != ""){
                const kolorayaka = eulawangi.split(" ").slice(1).toString().replaceAll(","," ");
                if(eulawangi.includes("reset")){
                    if(kolorayaka != ""){
                        res = await registerSessionHandle.deleteSessionRegister(kolorayaka);
                        if(res == true){
                            message.reply("*"+namaBot+"*\n\nBerhasil Reset Session");
                        }else{
                            message.reply("*"+namaBot+"*\n\nUser tidak ditemukan");
                        }   
                    }else{
                        message.reply("*"+namaBot+"*\n\nMana Nomornya?");
                    }
                }else if(eulawangi.includes("list")){
                    res = await registerSessionHandle.sessionList();
                    if(res != false){
                        chat.sendMessage("*"+namaBot+"*\n\n"+res);
                    }else{
                        message.reply("*"+namaBot+"*\n\nTidak ada user dalam sesi register");
                    }
                }else{
                    message.reply("PUJA PAHA EULA");
                }
            }else{
                chat.sendMessage("*"+namaBot+"*\n\nRegister Session Management\n- list\n- reset");
            }
        break;
        //unban
        case trigger+"unban":
            if(isSuperAdmin == true || isAdmin == true){
                if(eulawangi != ""){
                    let nom;
                    if(eulawangi.includes("@")){nom = eulawangi.replaceAll("@","")}else{nom = eulawangi.replaceAll("-","").replaceAll(" ","")}
                    const userr = await userHandle.cekUser(nom);
                    if(userr != false){
                        const ban = await userHandle.unBanned(nom);
                        if(ban != false){
                            chat.sendMessage("*"+namaBot+"*\n\nBerhasil Unban User "+userr['nama'] + " dengan nomor "+eulawangi+"");
                        }else{
                            chat.sendMessage("*"+namaBot+"*\n\nTerjadi Kesalahan!");
                        }
                    }else{
                        chat.sendMessage("*"+namaBot+"*\n\nUser tidak Ditemukan!");
                    }
                }else{
                    chat.sendMessage("*"+namaBot+"*\n\nFormat Pesan Salah!");
                }
            }else{
                chat.sendMessage("*"+namaBot+"*\n\nHey sadar, anda bukan admin!");
            }
        break;
        //Super Admin Menu
        //setadmin
        case trigger+"setadmin":
            if(isSuperAdmin == true){
                if(eulawangi != ""){
                    let nom;
                    if(eulawangi.includes("@")){nom = eulawangi.replaceAll("@","")}else{nom = eulawangi.replaceAll("-","").replaceAll(" ","")}
                    res = await userHandle.setAdmin(nom);
                    if(res != false){
                        message.reply("*"+namaBot+"*\n\nBerhasil Menambah Admin!");
                    }else{
                        message.reply("*"+namaBot+"*\n\nUser Tidak Ditemukan!");
                    }
                }else{
                    message.reply("*"+namaBot+"*\n\nFormat Pesan Salah!");
                }
            }else{
                message.reply("*"+namaBot+"*\n\nHey sadar, anda bukan admin!");
            }
        break;
        //deadmin
        case trigger+"deadmin":
            if(isSuperAdmin == true){
                if(eulawangi != ""){
                    let nom;
                    if(eulawangi.includes("@")){nom = eulawangi.replaceAll("@","")}else{nom = eulawangi.replaceAll("-","").replaceAll(" ","")}
                    res = await userHandle.unAdmin(nom);
                    if(res != false){
                        message.reply("*"+namaBot+"*\n\nBerhasil Menghapus Admin!");
                    }else{
                        message.reply("*"+namaBot+"*\n\nUser Tidak Ditemukan!");
                    }
                }else{
                    message.reply("*"+namaBot+"*\n\nFormat Pesan Salah!");
                }
            }else{
                message.reply("*"+namaBot+"*\n\nHey sadar, anda bukan admin!");
            }
        break;
        //reguser
        case trigger+"reguser":
            if(isSuperAdmin == true){
                if(ayakawangi != ""){
                    const arrayRegist = ayakawangi.split(" ");
                    if(arrayRegist.length == 5){
                        let nom;if(arrayRegist[0].includes("@")){nom = arrayRegist[0].replaceAll("@","")}else{nom = arrayRegist[0].replaceAll("-","").replaceAll(" ","")}
                        const pushtodb = await userHandle.tambahUser(arrayRegist[0],arrayRegist[1],arrayRegist[2],arrayRegist[3],arrayRegist[4]);
                        if(pushtodb != false){
                            message.reply("*"+namaBot+"*\n\nBerhasil Registrasi User");
                        }else{
                            message.reply("*"+namaBot+"*\n\nGagal Registrasi, Terjadi Kesalahan");
                        }
                    }else{
                        message.reply("*"+namaBot+"*\n\nData tidak lengkap, "+trigger+"reguser nomor,nama,gender,umur,hobi");
                        //console.log("length : "+ayakawangi);
                    }
                }else{
                    message.reply("*"+namaBot+"*\n\n"+trigger+"reguser nomor,nama,gender,umur,hobi");
                }
            }else{
                message.reply("*"+namaBot+"*\n\nHey sadar, anda bukan admin!");
            }
        break;
        //unreg
        case trigger+"unreg":
            if(isSuperAdmin == true){
                if(eulawangi != ""){
                    let nom;if(eulawangi.includes("@")){nom = eulawangi.replaceAll("@","")}else{nom = eulawangi.replaceAll("-","").replaceAll(" ","");}
                    const hapusUser = await userHandle.hapusUser(nom);
                    if(hapusUser != false){
                        message.reply("*"+namaBot+"*\n\nBerhasil Menghapus User");
                    }else{
                        message.reply("*"+namaBot+"*\n\nMUser Tidak Ditemukan");
                    }
                }else{
                    message.reply("*"+namaBot+"*\n\nMana Nomornya?");
                }
            }else{
                message.reply("*"+namaBot+"*\n\nHey sadar, anda bukan admin!");
            }
        break;
        //Migrasi
        case trigger+"migrasi":
            if(isSuperAdmin == true){
                if(eulawangi != ""){
                    res = eulawangi.split(" ");
                    const nomorLama = res[0];
                    const nomorBaru = res[1];
                    const push = await userHandle.migrasiNomor(nomorLama, nomorBaru);
                    if(push != false){
                        message.reply("*"+namaBot+"*\n\nMigrasi Nomor Berhasil");
                    }else{
                        message.reply("*"+namaBot+"*\n\nMigrasi Nomor Gagals");
                    }
                }else{
                    message.reply("*"+namaBot+"*\n\nMana Nomornya? "+trigger+"migrasi <nomor lama> <nomor baru>");
                }
            }else{
                message.reply("*"+namaBot+"*\n\nHey sadar, anda bukan admin!");
            }
        break;
        //User Menu
        //myuser
        case trigger+"myuser":
            res = await userHandle.cekUser(nomor)
            const gachaData = await gachaHandle.getData(nomor);
            const waifuArray = gachaData['waifu'];
            let waifu="", botAdmin, userStatus;
            for(let a=0;a<waifuArray.length;a++){waifu = waifu + (a+1) + ". "+waifuArray[a]+"\n";}
            if(res['admin'] == true || res['superadmin'] == true){botAdmin = "Admin";}else{botAdmin = "User";}
            if(res['banned'] == true){userStatus = "Banned"}else{userStatus = "Aktif"}
            const datae = "*"+namaBot+"*\n\n*User Info* \nNomor : "+nomor+"\nNama : "+res['nama']+"\nUmur : "+res["umur"]+"\nGender : "+res["gender"]+"\nHobi : "+res["hobi"]+"\nRole : "+botAdmin+"\nStatus : "+userStatus+"\nPoin : "+res['poin']+"\nHit : "+res['hit']+"\n\n*Gacha Info*\nPity : "+gachaData['pity']+"\nTotal : "+gachaData['total']+"\nWaifu Didapatkan : \n"+waifu;
            await logfitur(nomor, namaPengirim, "My User", groupname, false);
            chat.sendMessage(datae);
        break;
        case trigger+"user":
            
        break;
        case trigger+"broadcast":
            res = await client.getChats();
            const jumlahSemuaChat = res.length;
            for(let a=0;a<jumlahSemuaChat;a++){
                const chatt = res[a]["id"]["_serialized"];
                client.sendMessage(chatt, eulawangi);
            }
            // const pesan = res[1]["_serialized"];
            // chat.sendMessage(pesan);
            // console.log(res[0]);
        break;
        case trigger+"info":
            //console.log("admin? : "+isGroupAdmin);
            message.reply("Harpess");
        break;
        default:
            await userHandle.kurangi
            chat.sendMessage("*"+namaBot+"*\nCommand Tidak Ditemukan, "+trigger+"menu untuk menampilkan menu");
    }
}

module.exports = {eula};