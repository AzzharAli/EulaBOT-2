const axios = require ('axios');

const getStikerById = async(idStiker) => {
    let loop = true;
    while(loop == true){
        try {
            let res = await axios.get('https://eula.my.id/wa-stiker/api.php?kode='+idStiker,
            {
                headers: {
                    'Accept-Encoding': 'application/json',
                }
            });
            if(res.status == 200 && res.data.status == true){
                const linkGambar = res.data.link;
                return(linkGambar);
            }else{
                return(false);
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

module.exports = {getStikerById}