const ayaka = async(client,message) => {
    const chat = await message.getChat();
    const isiPesan = (message.body);
    const isiPesanLower = isiPesan.toLowerCase();
    if(isiPesanLower.includes("geprek")){
        message.reply("Geprak Geprek gelem tak geprek ta?");
    }
}

module.exports = {ayaka}