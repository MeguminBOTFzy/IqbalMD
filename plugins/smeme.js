const fs = require('fs')
const setting = JSON.parse(fs.readFileSync('./config.json'))
const uploadImage = require('../lib/uploadImage')

let smeme = async(m, conn, q) =>{
let [text1, text2] = q.split`|`
let q1 = m.quoted ? m.quoted : m
let mime = (q1.msg || q1).mimetype || '' 
if (!mime)return m.reply(`balas gambar dengan perintah\n\n!smeme <${text1 ? text1 : 'teks text1'}>|<${text2 ? text2 : 'teks text2'}>`)
if (!/image\/(jpe?g|png)/.test(mime))return m.reply(`_*Mime ${mime} tidak didukung!*_`)
let img = await q1.download() 
let url = await uploadImage(img) 
let meme = `https://api.memegen.link/images/custom/${encodeURIComponent(text1 ? text1 : '')}/${encodeURIComponent(text2 ? text2 : '')}.png?background=${url}`
try { 
await conn.sendImageAsSticker(m.chat, meme, m, { packname: setting.packname, author: setting.author })
} catch (e) { 
m.reply('gagal membuat stiker, Mencoba Mengirim gambar') 
await conn.sendFile(m.chat, meme, 'Nih Kak!!', m)
}
}

module.exports = smeme