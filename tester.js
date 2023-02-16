const {waifupictsfw} = require("./api/anime");
const run = async()=> {
    for(let a=0;a<1;a++){
        const res = await waifupictsfw();
        console.log(res);
    }
}

run()