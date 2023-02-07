const kapanMenu = () =>{
    const arrayKapan = ['Sekarang',"Hari Ini","Besok","Tidak Akan Pernah","2 Hari Lagi","Sebulan Lagi","Seminggu Lagi","Setahun Lagi","Kemarin","Seminggu Yang Lalu"];
    let random = Math.floor(Math.random() * arrayKapan.length);
    return( arrayKapan[random]);
}

const errorMenu = () =>{
    const arrayKapan = ["log : Earth Not Found","log : Directory Not Found","log : Code Error","log : Failed to Access cbt-smandu.solusiterbaik.my.id","log : Success Drop Database cbt-smandu.solusiterbaik.my.id","log : Command not Found","Failed Parsing Data","Failed GET Genshin-Hentai-Images","Failed GET Genshin-Hentai-Video","Failed GET Random-Hentai-Images","Failed GET-Pixiv-Search"];
    let random = Math.floor(Math.random() * arrayKapan.length);
    return( arrayKapan[random]);
}

const persenMenu = () =>{
    let random = Math.floor(Math.random() * 100)
    return(random)
}

const apakahMenu = () =>{
    const arrayApakah = ['Iya','Pasti','Tidak','Tidak Akan','Tidak Mungkin'];
    let random = Math.floor(Math.random() * arrayApakah.length);
    return(arrayApakah[random])
}

const bisakahMenu = () =>{
    const arrayApakah = ['Bisa','Pasti Bisa','Tidak Bisa','Tidak Akan Bisa','Tidak Mungkin Bisa'];
    let random = Math.floor(Math.random() * arrayApakah.length);
    return(arrayApakah[random])
}

const reverseString = async(str) => {
    var splitString = str.split("");
    var reverseArray = splitString.reverse();
    var joinArray = reverseArray.join("");
    return(joinArray);
}

const halahMenu = (kata) =>{
    let halah = kata.replaceAll("i","a");
    halah = halah.replaceAll("u","a");
    halah = halah.replaceAll("e","a");
    halah = halah.replaceAll("o","a");
    halah = halah.replaceAll("I","A");
    halah = halah.replaceAll("U","A");
    halah = halah.replaceAll("E","A");
    halah = halah.replaceAll("O","A");
    return(halah);
}

const hilihMenu = (kata) =>{
    let hilih = kata.replaceAll("a","i");
    hilih = hilih.replaceAll("u","i");
    hilih = hilih.replaceAll("e","i");
    hilih = hilih.replaceAll("o","i");
    hilih = hilih.replaceAll("A","I");
    hilih = hilih.replaceAll("U","I");
    hilih = hilih.replaceAll("E","I");
    hilih = hilih.replaceAll("O","I");
    return(hilih);
}

const huluhMenu = (kata) =>{
    let huluh = kata.replaceAll("a","u");
    huluh = huluh.replaceAll("i","u");
    huluh = huluh.replaceAll("e","u");
    huluh = huluh.replaceAll("o","u");
    huluh = huluh.replaceAll("A","U");
    huluh = huluh.replaceAll("I","U");
    huluh = huluh.replaceAll("E","U");
    huluh = huluh.replaceAll("O","U");
    return(huluh);
}

const helehMenu = (kata) =>{
    let heleh = kata.replaceAll("a","e");
    heleh = heleh.replaceAll("i","e");
    heleh = heleh.replaceAll("u","e");
    heleh = heleh.replaceAll("o","e");
    heleh = heleh.replaceAll("A","E");
    heleh = heleh.replaceAll("I","E");
    heleh = heleh.replaceAll("U","E");
    heleh = heleh.replaceAll("O","E");
    return(heleh);
}

const holohMenu = (kata) =>{
    let holoh = kata.replaceAll("a","o");
    holoh = holoh.replaceAll("i","o");
    holoh = holoh.replaceAll("u","o");
    holoh = holoh.replaceAll("e","o");
    holoh = holoh.replaceAll("A","O");
    holoh = holoh.replaceAll("I","O");
    holoh = holoh.replaceAll("U","O");
    holoh = holoh.replaceAll("E","O");
    return(holoh);
}

module.exports = { kapanMenu, persenMenu,apakahMenu,halahMenu,hilihMenu,huluhMenu,helehMenu,holohMenu,errorMenu, bisakahMenu, reverseString};
