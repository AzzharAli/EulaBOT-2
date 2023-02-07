const axios = require ('axios');

const bacotMenu = async() =>{
    try {
        let res = await axios.get('https://apimu.my.id/randomtext/bacot',
        {
            headers: {
                'Accept-Encoding': 'application/json',
            }
        });
        const data = res.data.hasil;
        return(data);
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

const kataBijakMenu = async() =>{
    try {
        let res = await axios.get('https://apimu.my.id/randomtext/katabijak',
        {
            headers: {
                'Accept-Encoding': 'application/json',
            }
        });
        const data = res.data.hasil;
        return(data);
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

const kataIlhamMenu = async() =>{
    try {
        let res = await axios.get('https://apimu.my.id/randomtext/katailham',
        {
            headers: {
                'Accept-Encoding': 'application/json',
            }
        });
        const data = res.data.hasil;
        return(data);
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

const pantunPakBoyMenu = async() =>{
    try {
        let res = await axios.get('https://apimu.my.id/randomtext/pantunpakboy',
        {
            headers: {
                'Accept-Encoding': 'application/json',
            }
        });
        const data = res.data.hasil;
        return(data);
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

const sindiranMenu = async() =>{
    try {
        let res = await axios.get('https://apimu.my.id/randomtext/sindiran',
        {
            headers: {
                'Accept-Encoding': 'application/json',
            }
        });
        const data = res.data.hasil;
        return(data);
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

const quotesAnimeMenu = async() =>{
    try {
        let res = await axios.get('https://apimu.my.id/randomtext/quotesanime',
        {
            headers: {
                'Accept-Encoding': 'application/json',
            }
        });
        const data = res.data.result;
        return(data);
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

module.exports = {bacotMenu, kataBijakMenu, kataIlhamMenu, pantunPakBoyMenu, sindiranMenu, quotesAnimeMenu}