let { fetchJson } = require("../lib/functions");
let instagram = async(m, q, sendFileFromUrl, prefix, conn) =>{
try {
if(!q)return m.reply(`Example : ${prefix}ig <link>`)
if (!q.includes('instagram.com')) return m.reply('Bukan link Ig kak:(')
fetchJson(api('anto','/api/instagram', {url:q})).then(async i =>{
let txt = '*Instagram Downloader*\n\n'
txt += 'Username : ' + i.username + '\n'
txt += 'Fullnane : ' + i.fullname + '\n'
txt += 'Duration : ' + i.duration + '\n'
txt += 'Like : ' + i.like + '\n'
txt += 'Comment : ' + i.comment + '\n'
txt += 'Views : ' + i.view + '\n'
txt += 'Caption : ' + i.caption
sendFileFromUrl(m.chat, i.url, txt, m)
})
}catch (err){
console.log(err)
m.reply('Error')
}
}

module.exports = instagram