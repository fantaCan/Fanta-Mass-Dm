const rp = require("request-promise");
const { timeoutPer10Dms } = require("../bot.settings.js")
const baseUrl = "https://discord.com/api";

/* 
        ||  Made by fanta#1337
        ||  discord.gg/violence
*/

module.exports = class {
    constructor (token){
        this.token = token;
        this.friendIds = [];
        this.channelIds = [];
    }

     sleep(ms){
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async getFriends(){
     try {
        const url = baseUrl.concat("/users/@me/relationships")
        const options = {
            url: url,
            headers: {
                authorization: this.token,
            }
        }
        const res = await rp(options);
        const friendsJson = JSON.parse(res);
        for ( var x = 0; x < friendsJson.length; x++ ){
            this.friendIds.push(friendsJson[x].user.id);
        }

        return {
            friendCount: friendsJson.length,
            friends: friendsJson
        }
     } catch (e) {
        return;
     }
    }

    async getDms(){
  try {
    const url = baseUrl.concat("/users/@me/channels");
    const options = {
        url: url,
        headers: {
            authorization: this.token
        }
    }
    const res = await rp(options);
    const dmData = JSON.parse(res);
    for ( var x = 0; x < dmData.length; x++ ){
        this.channelIds.push(dmData[x].id);
    }
    return {
        dmCount: dmData.length,
        dms: dmData
    }
  } catch (e){
    return;
  }
    }

    async openDm(recipientId){
    try {
        const url = baseUrl.concat(`/v9/users/@me/channels`);
        const options = {
            url: url,
            method: "POST",
            headers: {
                authorization: this.token,
                "Content-Type": "application/json"
            },
            json: {
                recipients: [recipientId]
            }
        }
        await rp(options)
    } catch (e){
        return;
    }
    }

    async checkIfPast(channelId){
     try {
        const url = baseUrl.concat(`/v9/channels/${channelId}/messages?limit=1`);
        const options = {
            url: url,
            headers: {
                authorization: this.token
            }
        }
        const res = await rp(options);
        const data = JSON.parse(res);
        if(typeof data[0] == "undefined") {
            await this.closeDm(channelId);
            const index = this.channelIds.indexOf(channelId);
            this.channelIds.splice(index, 1);
        }
     } catch (e){
        return;
     }
    }
    
    async closeDm (channelId){
      try {
        const url = baseUrl.concat(`/v9/channels/${channelId}?silent=false`);
        const options = {
            url: url,
            method: "DELETE",
            headers: {
                authorization: this.token
            }
        }
        await rp(options)
      } catch (e){
        return;
      }
    }
    
    async closeEmptyDms(content){
        content
        await this.getDms();
        let dmCount = this.channelIds.length;
        for (var i = 0; i < dmCount; i++) {   
            process.title = `Filtering Dms || ${i}/${dmCount}`;   
            let dmId = this.channelIds[i];

            // Checks and filters out empty dms
            await this.checkIfPast(dmId);
            await this.sleep(100);
            if(i == dmCount - 1){
                await this.massDm(content)
            }
        }
    }

    async sendContent(channelId, content) {
        try {
            const url = baseUrl.concat(`/v9/channels/${channelId}/messages`);
            const options = {
                url: url,
                method: "POST",
                headers: {
                    authorization: this.token,
                    "Content-Type": "application/json"
                },
                json: {
                    content: content
                }
            }

            await rp(options)
        } catch (e) {
            return;
        }
    }

    async massDm(content){
        const dms = this.channelIds;
        const dmsLength = dms.length;
        for (let i = 0; i < dmsLength; i++) {
            process.title = `Mass Dm || ${i}/${dmsLength}`;
            const randomMessage = content[Math.floor(Math.random() * content.length)];
            await this.sendContent(dms[i], randomMessage);
            await this.sleep(1000);
            if((i + 1) % 10 === 0 ){
                typeof timeoutPer10Dms == "number" ? (async () => {
                    process.title = `Sleeping... ${timeoutPer10Dms}s`; 
                    await this.sleep(timeoutPer10Dms * 1000);
                }) () : (async () => {
                    process.title = `Sleeping... 5s`; 
                    await this.sleep(5000);
                }) ();
            }
            if (i == dmsLength - 1){
                console.log("Mass Dm complete!");
            }
        }
    }
    async start(content){
        await this.getFriends();
        let friendCount = this.friendIds.length;
        // Open Friend Dms
        for ( var x = 0; x < friendCount; x++){
            process.title = `Opening Dms || ${x}/${this.friendIds.length}`;
            let friend = this.friendIds[x];
            await this.openDm(friend);
            await this.sleep(200);
            if( x == friendCount - 1) {
                await this.sleep(1000);
                await this.closeEmptyDms(content)
            }
        }


    }
}
