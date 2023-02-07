const axios = require ('axios');


const danbooruG = async(tags1, tags2) => {
    if(!tags1){tags1 = ""}
    if(!tags2){tags2 = ""}
    let loop = true;
    while(loop == true){
        try {
            let res = await axios.get('https://danbooru.donmai.us/posts/random.json?tags='+tags1+" "+tags2,
            {
                headers: {
                    'Accept-Encoding': 'application/json',
                }
            });
            if(res.status == 200 && res.data.rating == "g" && res.data.file_url && res.data.file_ext != "zip" && res.data.file_size <= 15000000){
                const dataBandar = {"link":res.data.file_url,"character":res.data.tag_string_character,"tags":res.data.tag_string,"copyright":res.data.tag_string_copyright,"rating":res.data.rating}
                return(dataBandar)
                
            }
        } catch (err) {
            if (err.response) {
                return(false);
            } else if (err.request) {
                return(false);
            } else {
                return(false);
            }
        }
    }

}

const danbooruS = async(tags1, tags2) => {
    if(!tags1){tags1 = ""}
    if(!tags2){tags2 = ""}
    let loop = true;
    while(loop == true){
        try {
            let res = await axios.get('https://danbooru.donmai.us/posts/random.json?tags='+tags1+" "+tags2,
            {
                headers: {
                    'Accept-Encoding': 'application/json',
                }
            });
            if(res.status == 200 && res.data.rating == "s" && res.data.file_url && res.data.file_ext != "zip" && res.data.file_size <= 15000000){
                const dataBandar = {"link":res.data.file_url,"character":res.data.tag_string_character,"tags":res.data.tag_string,"copyright":res.data.tag_string_copyright,"rating":res.data.rating}
                return(dataBandar)
                
            }
        } catch (err) {
            if (err.response) {
                return(false);
            } else if (err.request) {
                return(false);
            } else {
                return(false);
            }
        }
    }

}

const danbooruQ = async(tags1, tags2) => {
    if(!tags1){tags1 = ""}
    if(!tags2){tags2 = ""}
    let loop = true;
    while(loop == true){
        try {
            let res = await axios.get('https://danbooru.donmai.us/posts/random.json?tags='+tags1+" "+tags2,
            {
                headers: {
                    'Accept-Encoding': 'application/json',
                }
            });
            if(res.status == 200 && res.data.rating == "q" && res.data.file_url && res.data.file_ext != "zip" && res.data.file_size <= 15000000){
                const dataBandar = {"link":res.data.file_url,"character":res.data.tag_string_character,"tags":res.data.tag_string,"copyright":res.data.tag_string_copyright,"rating":res.data.rating}
                return(dataBandar)
                
            }
        } catch (err) {
            if (err.response) {
                return(false);
            } else if (err.request) {
                return(false);
            } else {
                return(false);
            }
        }
    }

}

const danbooruE = async(tags1, tags2) => {
    if(!tags1){tags1 = ""}
    if(!tags2){tags2 = ""}
    let loop = true;
    while(loop == true){
        try {
            let res = await axios.get('https://danbooru.donmai.us/posts/random.json?tags='+tags1+" "+tags2,
            {
                headers: {
                    'Accept-Encoding': 'application/json',
                }
            });
            if(res.status == 200 && res.data.rating == "e" && res.data.file_url && res.data.file_ext != "zip" && res.data.file_size <= 15000000){
                const dataBandar = {"link":res.data.file_url,"character":res.data.tag_string_character,"tags":res.data.tag_string,"copyright":res.data.tag_string_copyright,"rating":res.data.rating}
                return(dataBandar)
                
            }
        } catch (err) {
            if (err.response) {
                return(false);
            } else if (err.request) {
                return(false);
            } else {
                return(false);
            }
        }
    }

}

const danbooru = async(tags1, tags2) => {
    if(!tags1){tags1 = ""}
    if(!tags2){tags2 = ""}
    let loop = true;
    while(loop == true){
        try {
            let res = await axios.get('https://danbooru.donmai.us/posts/random.json?tags='+tags1+" "+tags2,
            {
                headers: {
                    'Accept-Encoding': 'application/json',
                }
            });
            if(res.status == 200 && res.data.file_url && res.data.file_size <= 15000000){
                const dataBandar = {"link":res.data.file_url,"character":res.data.tag_string_character,"tags":res.data.tag_string,"copyright":res.data.tag_string_copyright,"rating":res.data.rating}
                return(dataBandar)
                
            }
        } catch (err) {
            if (err.response) {
                return(false);
            } else if (err.request) {
                return(false);
            } else {
                return(false);
            }
        }
    }

}

const animeNeko = async() => {
    try {
        let res = await axios.get('https://nekos.best/api/v2/neko',
        {
            headers: {
                'Accept-Encoding': 'application/json',
            }
        });
        if(res.status == 200){
            return(res.data.results[0].url)
        }else{
            return(false)
        }
    } catch (err) {
        if (err.response) {
            return(false);
        } else if (err.request) {
            return(false);
        } else {
            return(false);
        }
    }
}

const animeWaifu = async() => {
    try {
        let res = await axios.get('https://api.waifu.im/search/?included_tags=waifu',
        {
            headers: {
                'Accept-Encoding': 'application/json',
            }
        });
        if(res.status == 200){
            return(res.data.images[0].url)
        }else{
            return(false)
        }
    } catch (err) {
        if (err.response) {
            return(false);
        } else if (err.request) {
            return(false);
        } else {
            return(false);
        }
    }
}

const genshinNsfwComicMenu = async() => {
    //let loop = true;
    //if(loop == true){
        const res = await danbooruE('genshin_impact','comic');
        //if(res.data.tag_string.includes('comic')&&res.data.file_url){
            //loop = false;
            return(res);
        //}
    //}
}

const animatedNsfwMenu = async()=>{
    let loop=true;
    while(loop=true){
    try {
        let res = await axios.get('https://danbooru.donmai.us/posts/random.json?tags=sex animated',
        {
            headers: {
                'Accept-Encoding': 'application/json',
            }
        });
            if(res.status == 200 && res.data.rating == "e" && res.data.file_url && res.data.file_ext == "mp4" && res.data.file_size <= 15000000){
                const dataBandar = {"link":res.data.file_url,"character":res.data.tag_string_character,"tags":res.data.tag_string,"copyright":res.data.tag_string_copyright,"rating":res.data.rating}
                loop = false;
                return(dataBandar)
            }
        
    } catch (err) {
        if (err.response) {
            return(false);
        } else if (err.request) {
            return(false);
        } else {
            return(false);
        }
    }
}

}

const animeHusbu = async() => {

}


module.exports = {danbooru, danbooruG, danbooruS, danbooruQ, danbooruE, animeNeko, animeWaifu, animeHusbu, genshinNsfwComicMenu, animatedNsfwMenu}