const {igdl} = require("./api/downloader");
const igUrl = require("instagram-url-direct");
const run = async()=> {
    for(let a=0;a<1;a++){
        const res = await igUrl("https://www.instagram.com/p/CoNPMn0osvG/?utm_source=ig_web_copy_link");
        console.log(res);
    }
}

run()