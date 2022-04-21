//Tq DikaArdnt
require('./lib/config')
const { 
default: makeWASocket, 
BufferJSON, 
WA_DEFAULT_EPHEMERAL,
DisconnectReason, 
AnyMessageContent, 
proto, 
conversation, 
generateWAMessageFromContent, 
downloadContentFromMessage,
downloadHistory,
prepareWAMessageMedia,
getMessage,
delay,   
WAMessageContent,		
WATextMessage,	
WAMessage,    
useSingleFileAuthState,
generateWAMessageContent,
relayWAMessage,
initInMemoryKeyStore,
MessageOptions,
MimeType
} = require('@adiwajshing/baileys')
const axios = require('axios')
const speed = require('performance-now');
const { performance } = require('perf_hooks')
const { spawn, exec, execSync } = require("child_process")
const fs = require('fs');
const chalk = require('chalk')
const util = require('util');
const fetch = require('node-fetch');
const yts = require('yt-search');
const mel = require('kitsune-api');
const ffmpeg = require('fluent-ffmpeg')
const os = require('os')
const { fromBuffer } = require('file-type')
const moment = require("moment-timezone");
const { Boom } = require("@hapi/boom")
const { Primbon } = require('scrape-primbon')
const primbon = new Primbon()

//library
const { kyun, parseMention, generateProfilePicture, isUrl, logic, getGroupAdmins, fetchJson, getBuffer, formatp, smsg, sleep } = require('./lib/functions') 
const { color, bgcolor } = require("./lib/color");
const { y2mateA, y2mateV } = require('./lib/y2mate')
const { wikiSearch } = require('./lib/wiki')
const { tiktok, tiktokmusic, pinterest, igstalk, ghstalk } = require('./lib/scrape')
const { yta, ytv, igdl, upload, formatDate } = require('./lib/ytdl')
const { UploadFileUgu, webp2mp4File, TelegraPh } = require('./lib/uploader')


// read database
global.db = JSON.parse(fs.readFileSync('./database/database.json'))
if (global.db) global.db = {
    sticker: {},
    database: {},
    others: {},
    users: {},
    chats: {},
    settings: {},
    ...(global.db || {})
}

//Json
const setting = JSON.parse(fs.readFileSync('./config.json'))

//database
const scommand = JSON.parse(fs.readFileSync('./database/scommand.json'))
const autosticker = JSON.parse(fs.readFileSync('./database/autosticker.json'))

//sticker cmd
const addCmd = (db, command) => {
const obj = { _db: db, chats: command }
scommand.push(obj)
fs.writeFileSync('./database/scommand.json', JSON.stringify(scommand))
}

const getCommandPosition = (db) => {
let position = null
Object.keys(scommand).forEach((i) => {
if (scommand[i]._db === db) {
position = i
}
})
if (position !== null) {
return position
}
}

const getCmd = (db) => {
let position = null
Object.keys(scommand).forEach((i) => {
if (scommand[i]._db === db) {
position = i
}
})
if (position !== null) {
return scommand[position].chats
}
}

const checkSCommand = (db) => {
let status = false
Object.keys(scommand).forEach((i) => {
if (scommand[i]._db === db) {
status = true
}
})
return status
}
// ========= Yain ========
module.exports = async(iqbl, bal, m, setting, store) => {
try {
let { ownerNumber, botName } = setting
const time = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('DD/MM/YY HH:mm:ss z')
const salam = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
const fromMe = bal.key.fromMe
const from = bal.key.remoteJid
const type = Object.keys(bal.message)[0]
const content = JSON.stringify(bal.message)
//const chats = (type === 'conversation' && bal.message.conversation) ? bal.message.conversation : (type == 'imageMessage') && bal.message.imageMessage.caption ? bal.message.imageMessage.caption : (type == 'documentMessage') && bal.message.documentMessage.caption ? bal.message.documentMessage.caption : (type == 'videoMessage') && bal.message.videoMessage.caption ? bal.message.videoMessage.caption : (type == 'extendedTextMessage') && bal.message.extendedTextMessage.text ? bal.message.extendedTextMessage.text : (type == 'buttonsResponseMessage' && bal.message.buttonsResponseMessage.selectedButtonId) ? bal.message.buttonsResponseMessage.selectedButtonId : ''
const cmd = (type === 'conversation' && bal.message.conversation) ? bal.message.conversation : (type == 'imageMessage') && bal.message.imageMessage.caption ? bal.message.imageMessage.caption : (type == 'videoMessage') && bal.message.videoMessage.caption ? bal.message.videoMessage.caption : (type == 'extendedTextMessage') && bal.message.extendedTextMessage.text ? bal.message.extendedTextMessage.text : (type == 'stickerMessage') && (getCmd(bal.message.stickerMessage.fileSha256.toString('hex')) !== null && getCmd(bal.message.stickerMessage.fileSha256.toString('base64')) !== undefined) ? getCmd(bal.message.stickerMessage.fileSha256.toString('base64')) : "".slice(1).trim().split(/ +/).shift().toLowerCase()
if (iqbl.multi){
var prefix = /^[°zZ#$@*+,.?=''():√%!¢£¥€π¤ΠΦ_&><`™©®Δ^βα¦|/\\©^]/.test(cmd) ? cmd.match(/^[°zZ#$@*+,.?=''():√%¢£¥€π¤ΠΦ_&><!`™©®Δ^βα¦|/\\©^]/gi) : '.'
} else {
if (iqbl.nopref){
prefix = ''
} else {
if(iqbl.single){
prefix = iqbl.prefa
}
}
}
body = (type === 'conversation' && bal.message.conversation.startsWith(prefix)) ? bal.message.conversation : (type == 'imageMessage') && bal.message[type].caption.startsWith(prefix) ? bal.message[type].caption : (type == 'videoMessage') && bal.message[type].caption.startsWith(prefix) ? bal.message[type].caption : (type == 'extendedTextMessage') && bal.message[type].text.startsWith(prefix) ? bal.message[type].text : (type == 'listResponseMessage') && bal.message[type].singleSelectReply.selectedRowId ? bal.message[type].singleSelectReply.selectedRowId : (type == 'buttonsResponseMessage') && bal.message[type].selectedButtonId ? bal.message[type].selectedButtonId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? m.message.buttonsResponseMessage.selectedButtonId : (type == 'stickerMessage') && (getCmd(bal.message[type].fileSha256.toString('base64')) !== null && getCmd(bal.message[type].fileSha256.toString('base64')) !== undefined) ? getCmd(bal.message[type].fileSha256.toString('base64')) : ""
//body = (type === 'conversation' && bal.message.conversation.startsWith(prefix)) ? bal.message.conversation : (type == 'imageMessage') && bal.message[type].caption.startsWith(prefix) ? bal.message[type].caption : (type == 'videoMessage') && bal.message[type].caption.startsWith(prefix) ? bal.message[type].caption : (type == 'extendedTextMessage') && bal.message[type].text.startsWith(prefix) ? bal.message[type].text : (type == 'listResponseMessage') && bal.message[type].singleSelectReply.selectedRowId ? bal.message[type].singleSelectReply.selectedRowId : (type == 'buttonsResponseMessage') && bal.message[type].selectedButtonId ? bal.message[type].selectedButtonId : (type == 'stickerMessage') && (getCmd(bal.message[type].fileSha256.toString('base64')) !== null && getCmd(bal.message[type].fileSha256.toString('base64')) !== undefined) ? getCmd(bal.message[type].fileSha256.toString('base64')) : ""
budy = (type === 'conversation') ? bal.message.conversation: (type === 'extendedTextMessage') ? bal.message.extendedTextMessage.text: ''
const args = body.trim().split(/ +/).slice(1)
const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
const isGroup = bal.key.remoteJid.endsWith('@g.us')
const sender = isGroup ? (bal.key.participant ? bal.key.participant : bal.participant) : bal.key.remoteJid
const pushname = bal.pushName
const isCmd = command.startsWith(prefix)
const q = args.join(' ')
const BotNumber = await iqbl.decodeJid(iqbl.user.id)
const botNumber = iqbl.user.id.split(':')[0] + '@s.whatsapp.net'
const groupMetadata = isGroup ? await iqbl.groupMetadata(from) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const groupId = isGroup ? groupMetadata.id : ''
const groupMembers = isGroup ? groupMetadata.participants : ''
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
const isGroupAdmins = groupAdmins.includes(sender) || false
const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
const isAuto = isGroup ? autosticker.includes(from) : false
const isOwner = ownerNumber.includes(sender)
const isPremium = isOwner || global.premium.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender) || false
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.bal || quoted).mimetype || ''
const isMedia = /image|video|sticker|audio/.test(mime)

// ========= Function ========
const isUrl = (url) => {
return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}
const jsonformat = (json) => {
return JSON.stringify(json, null, 2)
}
const reply = (teks, men) => {
return iqbl.sendMessage(from, { text: teks, mentions: men ? men : [] }, { quoted: bal })
}
const textImg = (teks, buffer = fs.readFileSync(setting.pathImg), mess, men) => {
return iqbl.sendMessage(from, { text: teks, jpegThumbnail: buffer, mention: men ? men : [] }, { quoted: mess ? mess : bal })
}
const replyNtag = (teks, buffer = fs.readFileSync(setting.pathImg)) => {
iqbl.sendMessage(from, { text: teks,jpegThumbnail: buffer, mentions: parseMention(teks) }, { quoted: bal })
}
const sendMess = (from, teks) => {
return iqbl.sendMessage(from, { text: teks })
}
const fyt = (teks, men) => {
iqbl.sendMessage(from, {text: teks, mentions: men ? men : [], contextInfo:{"externalAdReply":{"title": create, "body": `Xn-Team`, mediaType: 2, "thumbnail": fs.readFileSync('./media/IqbalzzX.jpg'), "mediaUrl": `https://youtu.be/5odMRQDrhoI`}}}, {quoted:bal})
}
const sendPhoto = (imageDir, caption) => {
iqbl.sendMessage(from, {
image: fs.readFileSync(imageDir),
caption: caption
})
}

const fvimg = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "fileLength": "50000000000", "viewOnce": true } }, "status": "DELIVERY_ACK" }
const fvvid = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "videoMessage": { "title": `Choco Bot`,"h": `Choco Bot`,'duration': '99999','caption': `Choco Bot`,"viewOnce": true }}, "status": "SERVER_ACK"}
        
const intan = iqbl
const conn = iqbl
 
//QuotedMsg
const isImage = (type == 'imageMessage')
const isVideo = (type == 'videoMessage')
const isSticker = (type == 'stickerMessage')
const isQuotedMsg = (type == 'extendedTextMessage')
const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true : false : false
const isQuotedAudio = isQuotedMsg ? content.includes('audioMessage') ? true : false : false
const isQuotedDocument = isQuotedMsg ? content.includes('documentMessage') ? true : false : false
const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true : false : false
const isQuotedSticker = isQuotedMsg ? content.includes('stickerMessage') ? true : false : false

//Butt
const textButtons = (firstId, firstText, secondId, secondText, content) => {
var buttonsContent = [
{ buttonId: firstId, buttonText: { displayText: firstText }, type: 1 },
{ buttonId: secondId, buttonText: { displayText: secondText }, type: 1 }
]
//Button Text
const sendButMessage = (id, text1, desc1, but = [], options = {}) => {
const buttonMessage = {
contentText: text1,
footerText: desc1,
buttons: but,
headerType: 1
}
iqbl.sendMessage(id, buttonMessage, MessageType.buttonsMessage, options)
}
var balContent = {
contentText: content,
footerText: '𝐹𝑒𝑙𝑖𝑥 - 𝑀𝑢𝑙𝑡𝑖 𝐷𝑒𝑣𝑖𝑐𝑒',
buttons: buttonsContent,
headerType: 1
}
return balContent
}
const sendContact = (jid, numbers, name, quoted, men) => {
let number = numbers.replace(/[^0-9]/g, '')
const vcard = 'BEGIN:VCARD\n' 
+ 'VERSION:3.0\n' 
+ 'FN:' + name + '\n'
+ 'ORG:;\n'
+ 'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\nitem1.X-ABLabel:𝑂𝑤𝑛𝑒𝑟 𝐹𝑒𝑙𝑖𝑥\nitem2.EMAIL;type=INTERNET:meguminbot12@gmail.com\nitem2.X-ABLabel:Email\nitem3.ADR:;;🇮🇩Indonesia\nitem3.X-ABLabel:🌍Bojonegoro\nitem4.URL:https://github.com/Tersakiti404-cyber\n'
+ 'END:VCARD'
return iqbl.sendMessage(from, { contacts: { displayName: name, contacts: [{ vcard }] }, mentions : men ? men : []},{ quoted: quoted })
}      
function Json(objectPromise) {
var objectString = JSON.stringify(objectPromise, null, 2)
var parse = util.format(objectString)
if (objectString == undefined) {
parse = util.format(objectPromise)
}
return reply(parse)
}       
const sendFileFromUrl = async (from, url, caption, msg, men) => {
let mime = '';
let res = await axios.head(url)
mime = res.headers['content-type']
if (mime.split("/")[1] === "gif") {
return iqbl.sendMessage(from, { video: await convertGif(url), caption: caption, gifPlayback: true, mentions: men ? men : []}, {quoted: msg})
}
let type = mime.split("/")[0]+"Message"
if(mime.split("/")[0] === "image"){
return iqbl.sendMessage(from, { image: await getBuffer(url), caption: caption, mentions: men ? men : []}, {quoted: msg})
} else if(mime.split("/")[0] === "video"){
return iqbl.sendMessage(from, { video: await getBuffer(url), caption: caption, mentions: men ? men : []}, {quoted: msg})
} else if(mime.split("/")[0] === "audio"){
return iqbl.sendMessage(from, { audio: await getBuffer(url), caption: caption, mentions: men ? men : [], mimetype: 'audio/mpeg'}, {quoted: msg })
} else {
return iqbl.sendMessage(from, { document: await getBuffer(url), mimetype: mime, caption: caption, mentions: men ? men : []}, {quoted: msg })
}
}
//But5Loc
const send5ButLoc = async (jid , text = '' , footer = '', img, but = [], options = {}) =>{
var template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
	templateMessage: {
        hydratedTemplate: {
        	locationMessage: { degreesLatitude: 0, degreesLongtitude: 0, jpegThumbnail: img },
        "hydratedContentText": text,
               "hydratedFooterText": footer,
               "hydratedButtons": but
            }
            }
            }), options)
return iqbl.relayMessage(jid, template.message, { messageId: template.key.id })
}
const sendButton = (type, from, text, buttons, men, quoted, options) => { 
if (type == 'image') {
iqbl.sendMessage(from, { caption: text, image: options ? options : fs.readFileSync(setting.pathImg), buttons: buttons, headerType: 'IMAGE', mentions: men }, {quoted: quoted})
} else if (type == 'video') {
if (options === undefined || options === null) return reply('illegal method, chat owner bot')
iqbl.sendMessage(from, { caption: text, video: options, buttons: buttons, headerType: 'VIDEO', mentions: men }, {quoted: quoted})
} else if (type == 'location') {
iqbl.sendMessage(from, { caption: text, location: { jpegThumbnail: options ? options : fs.readFileSync(setting.pathImg) }, buttons: buttons, headerType: 'LOCATION', mentions: men })
} else if (type == 'document') {
iqbl.sendMessage(from, { caption: text, document: { jpegThumbnail: options ? options : fs.readFileSync(setting.pathImg) }, pageCount: 999, fileLength: 999999999999, buttons: buttons, headerType: 'DOCUMENT', mentions: men })
} else if (type == 'text') {
iqbl.sendMessage(from, { text: text, buttons: buttons, headerType: 'TEXT', mentions: men }, {quoted: quoted})
} else {
reply('invalid type, please contact the owner bot')
}
}
if (body.startsWith("< ")){
if (!isOwner) throw mess.owner
console.log(color('[EVAL]'), color(moment(bal.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkoakwoak`))
try {
let evaled = await eval(body.slice(2))
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
textImg(`${evaled}`)
} catch (err) {
textImg(`${err}`)
}
} else if (body.startsWith("$ ")){
if (!isOwner) throw mess.owner
console.log(color('[EXEC]'), color(moment(bal.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkoakwoak`))
exec(body.slice(2), (err, stdout) => {
if (err) return textImg(`${err}`)
if (stdout) textImg(`${stdout}`)
})
}
if (body.startsWith('>')) {
try {
if (!isOwner) throw mess.owner
if (!q) return reply('Promise { Felixzz }')
reply(util.format(eval(`(async () => { ${q} })()`)))
} catch(e) {
reply(e)
}
}
if (isAuto) {
if (/video/.test(mime)) {
if ((quoted.bal || quoted).seconds > 11) return m.reply('Maksimal 10 detik!')
let media = await quoted.download()	
let encmedia = await iqbl.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
await fs.unlinkSync(encmedia)
}
}

try {
let isNumber = x => typeof x === 'number' && !isNaN(x)
let limitUser = isPremium ? global.limitawal.premium : global.limitawal.free
let user = global.db.users[m.sender]
if (typeof user !== 'object') global.db.users[m.sender] = {}
if (user) {
if (!isNumber(user.afkTime)) user.afkTime = -1
if (!('afkReason' in user)) user.afkReason = ''
if (!isNumber(user.limit)) user.limit = limitUser
} else global.db.users[m.sender] = {
afkTime: -1,
afkReason: '',
limit: limitUser,
}
    
let chats = global.db.chats[m.chat]
if (typeof chats !== 'object') global.db.chats[m.chat] = {}
if (chats) {
if (!('mute' in chats)) chats.mute = false
if (!('antilink' in chats)) chats.antilink = false
} else global.db.chats[m.chat] = {
mute: false,
antilink: false,
}

let Setting = global.db.settings[BotNumber]
if (typeof Setting !== 'object') global.db.settings[BotNumber] = {}
if (Setting) {
if (!isNumber(Setting.status)) Setting.status = 0
if (!('autobio' in Setting)) Setting.autobio = false
} else global.db.settings[botNumber] = {
status: 0,
autobio: false,
}
} catch (err) {
console.error(err)
}

// write database every 1 minute
setInterval(() => {
fs.writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2))
}, 60 * 1000)

// reset limit every 12 hours
let cron = require('node-cron')
cron.schedule('00 12 * * *', () => {
let user = Object.keys(global.db.users)
let limitUser = isPremium ? global.limitawal.premium : global.limitawal.free
for (let jid of user) global.db.users[jid].limit = limitUser
console.log('Reseted Limit')
}, {
scheduled: true,
timezone: "Asia/Jakarta"
})

// auto set bio
if (db.settings[BotNumber].autobio) {
let Setting = global.db.settings[BotNumber]
if (new Date() * 1 - Setting.status > 1000) {
let uptime = await kyun(process.uptime())
await iqbl.setStatus(`${iqbl.user.name} | Runtime : ${kyun(uptime)}`)
Setting.status = new Date() * 1
}
}

// Anti Link
if (db.chats[m.chat].antilink) {
if (budy.match(`chat.whatsapp.com`)) {
m.reply(`Link Group Terdeteksi maaf anda akan di kick dari group`)
if (!isBotAdmins) return m.reply(`Make Bot Admin`)
let gclink = (`https://chat.whatsapp.com/`+await iqbl.groupInviteCode(m.chat))
let isLinkThisGc = new RegExp(gclink, 'i')
let isgclink = isLinkThisGc.test(m.text)
if (isgclink) return m.reply(`Sorry Anda Tidak Bisa Di Kick Karena Link Gc Ini`)
if (isAdmins) return m.reply(`Admin Only`)
if (isOwner) return m.reply(`Owner Only`)
iqbl.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
}
}
        
// Mute Chat
if (db.chats[m.chat].mute && !isAdmins && !isOwner) {
return
}

// Bot Status
const used = process.memoryUsage()
const cpus = os.cpus().map(cpu => {
cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
return cpu
})
const cpu = cpus.reduce((last, cpu, _, { length }) => {
last.total += cpu.total
last.speed += cpu.speed / length
last.times.user += cpu.times.user
last.times.nice += cpu.times.nice
last.times.sys += cpu.times.sys
last.times.idle += cpu.times.idle
last.times.irq += cpu.times.irq
return last
}, {
speed: 0,
total: 0,
times: {
user: 0,
nice: 0,
sys: 0,
idle: 0,
irq: 0
}
})
run = process.uptime() 
const menu = `_*Karina - Bot*_

${ucapanWaktu} ${pushname}

› Creator : Felix
› Library : Baileys-Md
› Language : Javascript
› Version : 1.0.0
› Status : ${iqbl.public ? 'Public' : 'Self'}
› Runtime : ${kyun(run)}

_*𝐹𝑒𝑙𝑖𝑥 - 𝐵𝑜𝑡 𝑀𝑒𝑛𝑢*_

*GROUP*
• ${prefix}kick
• ${prefix}add
• ${prefix}setname
• ${prefix}promote
• ${prefix}demote
• ${prefix}hidetag
• ${prefix}tagall
• ${prefix}totag
• ${prefix}group
• ${prefix}linkgc
• ${prefix}revoke
• ${prefix}delete

*OTHER*
• ${prefix}owner
• ${prefix}runtime
• ${prefix}speed
• ${prefix}ping
• ${prefix}sc
• ${prefix}q
• ${prefix}suit
• ${prefix}gitclone
• ${prefix}infochat
• ${prefix}listpc
• ${prefix}listgc
• ${prefix}listonline

*ISLAMIC*
• ${prefix}iqra
• ${prefix}juzamma
• ${prefix}hadist
• ${prefix}alquran
• ${prefix}tafsirsurah

*SEARCH*
• ${prefix}ytsearch
• ${prefix}githubrepo
• ${prefix}pinterest
• ${prefix}linkwa
• ${prefix}lirik
• ${prefix}wiki
• ${prefix}apk

*CONVERT*
• ${prefix}sticker
• ${prefix}emojimix
• ${prefix}swm
• ${prefix}toimg
• ${prefix}tomp4
• ${prefix}tomp3
• ${prefix}tomp4
• ${prefix}todocument
• ${prefix}togif
• ${prefix}tourl
• ${prefix}toonce
• ${prefix}tovn
• ${prefix}dbinary
• ${prefix}ebinary

*VOICE CHANGER*
• ${prefix}bass
• ${prefix}blown
• ${prefix}deep
• ${prefix}earrape
• ${prefix}fast
• ${prefix}fat
• ${prefix}nightcore
• ${prefix}reverse
• ${prefix}robot
• ${prefix}slow
• ${prefix}smooth
• ${prefix}tupai

*PRIMBON*
• ${prefix}nomerhoki
• ${prefix}artimimpi
• ${prefix}ramaljodoh
• ${prefix}ramaljodohbali
• ${prefix}suamiistri
• ${prefix}ramalcinta
• ${prefix}artinama
• ${prefix}kecocokannama
• ${prefix}kecocokanpasangan
• ${prefix}jadianpernikahan
• ${prefix}sifatusaha
• ${prefix}rezeki
• ${prefix}pekerjaan
• ${prefix}ramalnasib
• ${prefix}potensipenyakit
• ${prefix}artitarot
• ${prefix}fengshui
• ${prefix}haribaik
• ${prefix}harisangar
• ${prefix}harinaas
• ${prefix}nagahari
• ${prefix}arahrezeki
• ${prefix}peruntungan
• ${prefix}wetonjawa
• ${prefix}sifat
• ${prefix}keberuntungan
• ${prefix}memancing
• ${prefix}masasubur
• ${prefix}zodiak
• ${prefix}shio

*DOWNLOAD*
• ${prefix}play
• ${prefix}ytmp3
• ${prefix}ytmp4
• ${prefix}getmusic
• ${prefix}getvideo
• ${prefix}soundcloud
• ${prefix}mediafire
• ${prefix}umma
• ${prefix}ringtone
• ${prefix}ig
• ${prefix}apkdl

*DATABASE*
• ${prefix}addmsg
• ${prefix}listmsg
• ${prefix}getmsg
• ${prefix}delmsg
• ${prefix}addcmd
• ${prefix}delcmd
• ${prefix}listcmd

*STALKER*
• ${prefix}igstalk
• ${prefix}ghstalk

*OWNER*
• ${prefix}public
• ${prefix}self
• ${prefix}setmenu
• ${prefix}setprefix
• ${prefix}setprefix2
• ${prefix}join
• ${prefix}leave
• ${prefix}bc
• ${prefix}bcgc`

if (!iqbl.public) {
if (!bal.key.fromMe) return
}
if (bal.message) {
console.log(chalk.black(chalk.bgWhite('[ PESAN ]')), chalk.black(chalk.bgGreen(new Date)), chalk.black(chalk.bgBlue(body || bal.mtype)) + '\n' + chalk.magenta('=> Dari'), chalk.green(pushname), chalk.yellow(sender) + '\n' + chalk.blueBright('=> Di'), chalk.green(bal.isGroup ? pushname : 'Private Chat', from))
}
iqbl.sendReadReceipt(from, sender, [bal.key.id])       
switch(command) {
case 'menu': 
if(menusimpel == false){
const template = proto.Message.fromObject({
templateMessage: proto.TemplateMessage.fromObject({
hydratedTemplate: {
hydratedContentText: menu,
hydratedFooterText: '𝐶𝑟𝑒𝑎𝑡𝑒𝑑 𝐵𝑦 𝐹𝑒𝑙𝑖𝑥',
hydratedButtons: [{
urlButton: {
displayText: 'YouTube',
url: 'https://youtube.com/channel/UCrIvOGs1TRDcKODSH9BYlcg'
}
}, {
callButton: {
displayText: 'Developer',
phoneNumber: '6281315995628@s.whatsapp.net'
}
}, {
"quickReplyButton": {
"displayText": "OWNER",
"id": `owner`
},
},{
"quickReplyButton": {
"displayText": "SCRIPT",
"id": `sc`
},
},{
"quickReplyButton": {
"displayText": "RUNTIME",
"id": `runtime`
}
}],
"documentMessage": {
"url": "https://mmg.whatsapp.net/d/f/Ano5cGYOFQnC51uJaqGBWiCrSJH1aDCi8-YPQMMb1N1y.enc",
"mimetype": "application/pdf",
"fileSha256": "8Xfe3NQDhjwVjR54tkkShLDGrIFKR9QT5EsthPyxDCI=",
"fileLength": "98999999999",
"pageCount": 999,
"mediaKey": "XWv4hcnpGY51qEVSO9+e+q6LYqPR3DbtT4iqS9yKhkI=",
"fileName": "𝑰𝒒𝒃𝒂𝒍𝒛𝒛 𝑩𝒐𝒕 𝑾𝒉𝒂𝒕𝒔𝒂𝒑𝒑",
"fileEncSha256": "NI9ykWUcXKquea4BmH7GgzhMb3pAeqqwE+MTFbH/Wk8=",
"directPath": "/v/t62.7119-24/35160407_568282564396101_3119299043264875885_n.enc?ccb=11-4&oh=d43befa9a76b69d757877c3d430a0752&oe=61915CEC",
"mediaKeyTimestamp": "1634472176",
"jpegThumbnail": "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAHgAVMDASIAAhEBAxEB/8QAHAAAAQUBAQEAAAAAAAAAAAAAAAIDBAUGAQcI/8QAVBAAAQMCBAIFBgkHCQYGAgMAAQACAwQRBRIhMUFRBhMiYXEUMoGRobEHI0JSwdHh4vAVFhczcqOkJGJkZYKSorLxQ0RFU2ODNDVVhLPCJVRzw9L/xAAZAQADAQEBAAAAAAAAAAAAAAAAAQIDBAX/xAAhEQEBAAICAgMBAQEAAAAAAAAAAQIRITEDEhNBUQQyIv/aAAwDAQACEQMRAD8A9mQhCAEIQgBCEIAQhCAEIQgBCEIAQhCAEIQgBCEIAQhCAEIQgBCEIAQhCAEIQgBCEIAQhCAEIQgBCEIAQhCAEIQgBCEIAQhCAEKloOkXlzpGikyOY3MB1l7+xUDPhKzYnVURwixpyRm8p84Xte2XROTfSblJ23KFjvz/AL/8M/f/AHVTVXwweS1ctOcCuY3Ft/K7X/wJ3Gzsp5Mb9vSkLy/9NA/9A/jPuKxwH4UhjeJiiOD9Rdtw/wApzfKAtbIOak/fFv0LzbFfhdOF4pUULsB6wwuy5vK7ZvRkUf8ATQ4Fufo8I822atsT4Dq7lPQ9o9RQvKXfDgzK17Ojzi0yBhLqu3C9/M7lqXdOsv8Aw2//AH/upa0e9tahZBnTzOCfybax/wCf91dl6d9W5o/Jt8w/5/3UvadG1yFkPz80/wDLf3/3VBxD4T/IJYmHB84kvr5Ta3+BMN6hYhvwjZ+jsmLjCf1ZeDF5R815bvl7r7Jys+EHyWppohhecVDnNzeUWy2Fx8nVPVL2jZoWDd8JuWukpjg/mMDw7yne/wDYRQfCTU4lUvp6bAM0jH5NauwGgNycmm6NWDcbxCpXdImwsb19OGyEAljZM1vYF2LpFDM7K2IX4Av+xZ/JjPtp6ZLlCzuJdJq2hAfDhAqovlFtRZw9GX6VjMU+Gx2GSBjujmc5nNP8tta3/bVSy9Jss7eqoXmGFfDL+U4XyfkDqiw2t5Zf/wCinH4U7Xvguo3/AJV9xaTDKs75MZdWvQULHVnT7ySgmqhhfWdU5oy9fa9wDe+XvVRQ/C6azEnURwLJaPOHeV3vra1simyzinM8cunpCFiX/COyMXfhoaO+pt/9VOo+m9POwST04p4yL5nS+yxAU70pqELITfCFSRghlI6VwPyJOz6yB7kwPhFP/pX8R91HtA2yFiv0if1V/EfdXf0h/wBVfxH3UvaHptELFj4Qr/8AC/4j7q7+kL+q/wCI+6j2g02aFjP0hf1X/EfdR+kL+q/4j7qPaDTZoWM/SF/Vf8R91d/SCP8A0z+I+6j2g02SFjP0g/1X/EfdR+kL+q/4j7qPaDTZoWM/SF/Vf8R91H6Qv6r/AIj7qPaDTZoWM/SF/Vf8R91CPaDRHR9+XEcvBzSFicQh8l6aVce2dvr7Iv7QVrsIkyYjCTpd1lnel8Xk/TaF/CRtvEku+ghaePuOfyEDdZDpCwx4zKde21rvZb6FsJC5rSWRPldbRkYu5x5ALM4tSYnXxz4pHhT2wUzvJ5HvNy14OxYNR53Fb+Xplhio2h775QTbc8B4qz6OVc1JjUElI1lTOSWtYHdi4GbV22lr6KuLX+UwNnL7h1nMeMoBvY9nhoQpGAu6vEaLW38pjZ/eBaVjI1sh7HautqMXqp6kRQzuDnO6luxa/IRc9zTsqmR3VmCYXubhxJ1uHc/SFe9KY8uPzEDSSWcDwc0PH+dZ6Qk0beOWU+1oP0Jh2pbljqWbdXMCO4ZiPpXptNJ11FBL/wAyJrvWAvMqh2d9UNy+EPH+F31r0LAZeu6P0L9/iQ31afQprTFNivdw70qq2hPiE3GbSOTs/apmnk9YX/TT6JVH0mFoqeT5r1eDZVHSRubDc3zXXWiUrBQKnoZidOdckkth4sD/AHldr39Zh2EVfEvhN/2hr70joU7rqbE6Y7ODHW/aaWn/ACpuRxd0Jp5L6wBv+B9voWsRXJqd8mPNy7OpyCeAOYfatR0apIqKKpmYG9a83uRbu949iz1f2cRoSDYZ3g94yn6bLQUkr6ehkjawucQMxA53OnO1x61j5rdL8U3UetxXDKecwVEsr3ud2j1mW596RVF9LSiqoJ3Twkj4t3nM7wVCxPoVS4rUxVNVVSQwBlnMjHbJ0I1Ow3V1RUFJQUbKSFrnRC2krszj4lcdx427drjDa4VeGsknsJAASDpfvWI6XdCm4vibpqIRBsnaJJIDDbXj4LRh0cbmSRssC/I8X20TzpmRucLDTzu7vTxtxvBXGZdsLR9Dq/B4ntcYZonDMDBvpfcHVdZH1jjDJD2mt3It6LrazSOzRvjJDmk2bz7vxxTE0VPVuJazK5u4G5HMLqx/osmq5s/55btU1JZJh0lM8PDpWtubXDSAOPHZU0eE09NMJ2h/XEZS7MQbHhor18Jiccp7N9bX19CjvY14F3WOhufFO+T25RPFMOkZkTGG7Wi547k+lOVh/kEfc/6117HRuyuFkTtzYe8/NIPtU5dKRYzcJ0FMRHdPNUGcBQuA2RdAKBslJACUEB1CEIAQlMikk81ptzTzaR3ynAeGqNUI6FMFPC3cF3iU6MrBZjAPQqmJbQWwSv1DCBzOidbSH5bwO5oUguN0kuKr1JwUsFtS71oXc6EBZUb8k8bvmvBTfTWPCIcVpqvEZapz26shp2gZr285x2HZ4JEZsdEn4RYuuwukqha+Vmvdr9YVS6ZZQ1JjUsALKOmjoots8PaeR3uOvuWCxN0jMUrHNlfmfLmzhxuS5uhv4tun4aqopnZopXAW806t9Sh11Q6Wsc94a0yNaTlFh2T95aXKWF62cpB6S1NRNHVYrBBipDDF/KW9oN0cCHNsQdDrqmoXYS3qiySppqmKoa6V7wHxWD75hbtDhpqqwf8AhrHcOH0hEly+Zo+XGT/hv70bJpOmkbWYtHI0hzc8Lr87syn/AONZRzSKaVvzXNPvH0rWdLPjsLoaq+slGx/pD7//ANoWWlAz1IGxDiPQ4FPkiMpdNCL/AKyAt9jm/Qtr0Nl63ozAP+W97fbf6VimnKaR/FriPQHX+lavoM62FVMH/KqD7gPoU1pi0LP/ABBHMJ6XWkf3EH2pgm07Snyb08rf5t1hnOWsIabgKBjbBJhcw4gXUyNwLQm69nWUMzf5pWiar+g0tsTnZewkpQf7r/vqWyMO6NYjSu7IhmmZ4a5vpVNg1HitJOyopwyAmNzA+XXsmxuG8dhyVzQ4BHU1TpK6pmqAX55ATkYXHjlH1q96ha3wnw0HlcdDWPBIa5rrBtydLkW09quKgQ0rmvecmgvmfu7l4JuqqWHG6TD4AGxQsL3ADQAaW9Zv32UDGqgzzFsbhlcLBr9Bpdc2WXtXRjh6zhZeWNqIx2gCQCW3AsT/AKqBidYcOqGMIJjNixxOjT3+gkKkmqJaZwleZWC1hleC32jXwV7T19NiFIyOrjBzAec3j4LO8NYiw4pAKpzXPBgqLAa+aeHpBBT1XVGn7bwHNBs/hccfp9aiYhghez+T5XM1+SAQPEW9yWyOeemNPU526i0h11HE23U8HE2Orjmu0OvpoSN9fqUSSpdTVccjTbW0lzpY6H2ketM0uFVdKC0OztDrtu4gj1jXfhzUfEPKGFxdE5zHMIc+PcG3AHbW/rTFWHlPaHzHgm19WniEy6NmWznF0ThoW+cNdhzty8FWOmmEXWtOrXZmsdpcG9x6dk+KvqpHAXyFoeAeRO1+drFVE2J8lK4wCVpbLH85uqZLL0szOYTsFXJR1bS0ZopfOHfzU2aGKVjpY9BIPN+afqWnsyuGmbjTwSI4ZMxAjcSOQUplHKR2rM8UtbQbGy7bXVSm0sbfOcXexONbGzzWAd6r1pbRWRvd5rHH0J4Ur+Lmt9qfznmuZgnMS2S2nib5xc72J1rWMN2MDfQkZwuZlWgdLuZXMwTeZczBPQLzrhdqmy8JOdMHCdVzMmy8LmdAOZghNZxyQgLQG2yf6VM8p6GRv4saR6iD/wDVRb62VjVs8p6HzRb5HOHrBH0pfbPLp5YJ2BxaXgEcDoo9W4dZE4G4OZvsv9CeLWOb2hf0KLUxsjYx7OEjb+76U5C9twydGyjgDf2goH6+O/EAe0hFrulb85v0W+hILtY3DkfoKpLT4gRU9CcLcfObFLGfQ1pH/wARWZ0L7389lvWz6wtJTyRy9Deqc9rXRVZa0E62PWAn94FD6LEjEXNjphWGelkp3NBAa3MDYl57ItoqKRQm7qVmnmyHXncD6lpuhbyKzFIuBc149v1q5rOjtJV9UZmUdIY2gFtBGXZyBa7i6wvvs07pii6PyYNXTTmoe5k4ayxbYnTU6cNAlbwvGLKV4Y9ri4C5FrqVHrmbzBCgyNa1pIaL8+KmRO7YKwzbYocTZHMGZ+UcmfWuT1NNRQyGSOWRzxlAZqTx1JS2dkubycQkyRNke0kA2PE9yucwioJ/KGiTq+qDtQy/m9yuY2eS0DZ3b9YD7D9aroYfjGtAvc8FY45O1lHJTs+RHmHo/BUZX6Xhj9qnB68VVfUzEgFkVtOBvx4639ii187esHWHK5hsAHEHcqLQvdT4NW1Eej55rMtpoNvWfeo1NiEsrW5WEHKBd7dR6llptFpTMuC4OlaD/POvpupbWtO+44k3PrUGF3WmxN+ZUrO7ZujeARYqJ0VQRuXA80o1Mgd2ZyD3Cygszv2UgQy8iVFi5FhHiHWCz3HxCJHQvJdpJfcgAKLHRzHcDwUmOkeN2hJWlfUUlNM4gaucTqBsoNXQvppS6M3AZlFxZaRtMAdY/WlPpI5ABkGmguLqpU3FnCSKdrragWty1U2gqHNcGP1BGv49SnVOHZIbW9QUMU7m2LWlzhwvZPaLC6nsPOUkNBsEwXcylziVoHWiwGqh59NytsenNlNVIzDmuZlGMhCOsJVpSC+xXM57kxnJXMxTCRnRnTGYrt0A6X6bpOdI1K6GkoDuYrl0oMJ4JQhKWwb1XLHknxEBvqlBjeSNhHseSFIyDkhLYSgbuVtRESYLWxDgQ70afUqguD3lzRYOOYAC26scOqYoo6uOWQMEsJaL87H60Js3Hl1TDIyoewbNcWn0FRKqOQ07wbcwTptqtfNgfX1csr5srHvLg1o11UqLCaKJo+Ia885O0qRMaw1PSTVc16WGWo4Hq2dn+8dFb0fROqcAaiSKmaBs341/r2C1o0FgLAbAIT2r1iuocDoaIEmPyiU7yTgOPoFrD0Kc1rWNDWNa1o2DRYJR3XElaJcTY2VeKY+Umoe9znaauddWDhom3jsEdyDNyeYQnoXEsYUy/UeKXTu+KHcozOEkWnkHelaaa7Ee9InNqn9oApeRxYeA5k2RLwSzwxoM+cm4YLqDjM466UuflOQt9QH/APpWNC5oZK4ObyNj3ae9ZvFKjrq1rS7z3tA7i5rQfUQoy5rXDpFleIaNlM4WIF3a7Xsfq9SiR5Q8hoGZx1c3S/oUaeqMs8rn7dYdL/J0+pELmQgmF5kcPNaRo0nvKNLi9pgGt148OXcp9PH1jhc3BVLRvfJLaQgm2tvctFRDUG2qlcTaemaPk2U5kA4NRA0EBSQ2yjJcEcTeSlRwt+amWKTEdlOmkd8nvs1cbR2deylNdol3BCNBCmpg8atBVPXU0kBD2aN4my0hso08bXtcCLgoGmRFUJZerfZ3C6r6xnUyZWnsnbuPJSpoXQYhMwjstdoLJrEGfElx3ztt6jf6Ffjt25vLOEPMSi5CQ0JwNuujbmAJS26oa0b2TjUbDjY3HgliK/FKBSkt0OCMBLAXAlDdKABdQhGgEIQgBCEKgOzJq0PawaBub6eK603aPBNxHsuHfdLabNsidB0lcQhOALhRdcAvsLpgLhJunBE865bDvXeqA85/oAS9oDJKLF2gBT+VjdhfxSS480vYIxhflF7N04obH1bbZr6p5yaJUZXcOKjpBJVQNjqKaRzdC1wFtVlZqmoq+1NPI+2pBdf1La4izraUi22qyr6XJMCGAu1Iadie9Zyqja4Y50ODZiACbv3vcF1h7LetUs5c+eKw7UTib25Ov9JV4wkYa6AC7mxgZe78AetUNRHJGZdw0guYfx6VTSMuXPNQ4m419fEKyoYJHEaEl1twmpYr1GcjzhcCyt8LiLn5uAHrT2adR03VMDTz17yrulGRoKhwxHfkpbHBupIAHNJpJpa08o01KnscHDRZx2J0tObvnHgNUsdKqCMgAud3iymntpANU8w2sqWk6Q0FUBllDTyKs2VDCA5rgR3KV7Tmuul3USOoB0TweClT2dukvPZK4Cg6hSqM7iMTTiElm3vYnkqSvlDniJpvlPaPM/i6sekNQYq58Y0u0H2KhBubndbYT7cXly50UltSE41bMSxslNSRslN3QDjSlDdICcakHV0LmyM7eYQCkLl76hpPoSWyteXNY9hc3cBwJCAWhVtZjVJRVDoJXyOlba7WM5i41Oigy9KGCJ0kFG99jYdZJb2BBXKRf3CFkT0srSTalpQORa4/ShNPvi1UehISwdSnWUTmuDnSN8ALqSMjNWsAPOymXUaVFbFI7Zh9OiWKf57gO4ap0v1OpN+ZSC5PZARRtFrXPMruawsOz4JDnpBelsFuceaQSklxSS431SBRckEoJSDdADnJsnVLLSUksIBJCKcNygOjIKoKmn+PBuDYgnwV+dQVWVkelrauCy6XI0cEFHTtDqhzpJ3N1Gawbpt3lUlc4UshEgBgdqHngpNU57sQnHJxcfWosj856uQgtPMbJTJ33wyY8KOoppYqlzHMykEEDuIve/eLFXOFwEBo5DVOSU7aih63QvpTlPewnQ+hxt6QpWGsDWA78yr2wk5TGxlrdAm5ZGsBzWKl2BGigVtM9zSWi6Nq0hTuppDd8bPUoj6ejfe1m+BVVi09dSBxFM4tHyg7ZULMZnD7va5x5ZiAnrYvrO2mloZY3GSmqSO667SY7ieGShr3OdGq2lxVssWZsU0IabPe8h7Abad44qzheJmXIBHrCizRzV6a7BekDq0Mz7kXWmjlu26wuCRsbOMgstpG0sgznYC5SMubEIqZt5Hho7yhmMUrtOuaTyBWNx2SavnLIpcoB0Ci4fgM5kzuriDyGt0tC7i26SzNlxW7DdvVt+lVTTcpysYYql8Tn9YY+zm5ptu66MZw4c7vI4Eq6SEzVOcyK7DldwKpKWHDnfwSg6wvZY+TGq98bfjstwLlrRfZR5Kiedg62aR+vynEo0yvkjZyYhSwgmSoiZbftbJp2M0xpnzRF0zWPDDl01O2/gslEAIZxbdoPtU/D9cJrG8Wuid/iIRovepNX0pljizQ0kY1teRxd9Sqp+lWLSuLRO2IX2jYB9qZrP8Aw58Qqt7T1xCEe1qVNX1dQbz1M0nc6QkLRdBXt8proxxiafUftWU6sjitL0HIbi87b+dTn/M1Axt2V0lIj6QvHz42O9lvoVe3tUkn45Ky6WhrMbhcflU7f8zlUtnMEOZoDtSCHC4QeXZvT8BC7+WHj/ZNHhHohNOnp5nB4pJmVaak96PKf5xWbqWBkukl5UHyg33S2yuKAlXK5c3SGG6daLoBO671bjrZOgAbIQejYi5lK6tqUSuXQYyhuwTc2sLvBLSX6sI7kUIBKiyi7wDvcAetPk6pmQAvBPAgrK9qifWRgVEr2jV49o+xUlW74kgjtA2I5K9ncHzEONmvFweRUKpoWyseJNDwcFFnL0MPJLjoYdI2BoMjc8TowJG/OaRr6eXeAp0cDqV7onEOF7tcNnNOx9IVVRukMTopmgOYAwEbOGwVzCDNQhtvjKcXHey+vqPvKqM7OTrH2spEYDhqFXdYQpEFQQbEp2nIXiGCR10JFhqNlj6voeYZCfJy9t9wNl6DTVAdYFTRG1/AJe1Vp59Q4EWwGlbE+ON+ps3W/fclOx9HHYfCYmSukYdWZm6t7r8VvvJW/N9ibnpmBhJA25I9re06k6Y/C4HQVLQ7iVqukstRTdFpJqSF00oAsxg1Kq54mtmBA1C0bGipwYNIuAgaeQUDsbq8QMM8TA8DNkmYQNDtuLBTsIxyRtTIHQvZlGkYLntvtcE628VqKzo314yXzN2AcToO5RZsMgwSOmY1pyS5xIL7jT26q5ZeE5SzHe1fmLiXONyTckpTeCHxmKR0ZIOU2uNj3obwWkcNODZNVIvF6Up8scTbySMYObnAKBWY3hUUTg6uhLhwac3uVJvTN2Js1oJtpYBONheGdoBuvyjZVs+JxdZJknkLC45Q0WFrqN+UWA6Ruce9yph6Xa8BY1kjRK1znN2apuEuJpa9v/Ra71OCypxSe/YYxunAXSoZ8Vqczad07gWnMIgQLcb24IV8dXFSSYnNt7FVyOAeXdYwH9oKOaGseC54Pi5yR5I65BI7Nr2F90D0n3TxqIxvKT+y0n3qZhOP/ketNVBD1zshbZ5sNfBQRQjiHFWnR/DqWo6QUtNVRCWKQOuwk6kDTZLR4+u+EfFek1Xi1SyeWGFjo25G5AdBe/EqA6vrHi3WEC/AALa9KsJo6FlG6ioo4m3eHmNn7NrlUNfTPjw98t2FrXNcbcNUH7TaofJVvdm7bdtAShaBwhDiPKoxrtlCEy92vJuuLnWRnaRnuQ0tc4NbIwuJsAHDVZNShupDNSEzJG+J2WRpa7exUunYDqg9nWNTrQgCyULW1sgnRsgpL5GMHacG+JsosuK0UQIdUx3HI39yAl6blc0VRL0jo23yCSTwbb3qJL0medIqYAc3OQPZoSbJBcBoqc4rUPpYZAGNMkZJOW+ocQbX7rKlkxOvllkY+qksD8k5fcnpN8kjQu0cQdCCmn80zQvL6OIuN3WsSnyAQsb21xvCQZGyQCQ6kDK4KNS1BnElMTmt+rO+nELkcre0x2jXe9GGxGLFmC1+19Cc5aY5XGu0jXNqmscPkn0q0ikdBK2RvydweI4hOFrfLHAga3SXs1KWm/tu7N1kYil7FzG4ZmHmD+LehMseQ7dS8vX0zoTrJEC9nePlD6fQVA2Kmri0pnkEaq5pZtlnaZ+ytqZ2yUXtddaLKBW1zIzlJ1PBKMhyrP1Ve1lc/Puw2sqKrFzHSdotIurrCWkUj4zssm7pExjura5hd80uF/UrbCekrHODJGAE6Io0uJGNB2WI+EXFnYRQ0UkcTZHPlc2zjpsFtHTdY0uA0Oy886YVlPW9LKHC5WNlbBC97muFxmdt7APWnhN5M/LdYM1iPSHEqjCqOupS1pfmhmDGXIe3b1tI/ulU7KnpBiZc2OWqkymzgwloHivQaOKNsUlPHG1gcMzGtbYZh3eFx6VTYMcmMYvH/wBVr/WCumOGs7H0UxmpN5WtZfjJJf3XXcL6LuxGkfUPqREGPLC0Mubhb0KlwAFtNiUP/Lq5EJrKS4TBT1UkLnuIZpmJAuk0cFL1OaUDNcjW5T2NgMxuTvsfYosbg1hH84pbRdpzX07CCxu3JtlM6KEeXyw2/WCVvoylVIcL6Ky6MPyY5B/OmcD6Wp7KdGnSP1GY6d6aowx2IlsurHOZm8OKJbsme08HEJuJ2WrLv5rT/iTRPtq4KbDYp6hopOsDXNyZhewsOffdNF8cXSvCHxQMiBzss0AX0+1Oss2rnH81p96h1jsmM4TL82pA9dkpWeH+lz0uMn5J7Dst3WNuWh+hYPO40dS3MTdoJvxs4L0HpW2+DvNtnX9hXn8Y7FS0C/xbveE2n2RM3459uJuhdlN3NPNjT/hCELe+Eg96SWtO7R6kXC4SLKgzmMx5KpjvnN9x+1MMkfHSPew9pvd3qd0gackLxwcQfT/ooFMDJTSs5tI9ixs5aQycVnu1oZGLg3JBOt/qt61x9ZUSC3XvaP5lgob9HRuPz3e0Nt7ilOnhj8+VjfEhVIxzt2TjUZOF08hc55bK5pc43OoBCo7aXKt6/E6KXCn04nDpM7XNABOwIP0Kgkq4QLdo+iyNcqm7F/8Amti1tGQkd0v2JJ6MYsDYQxnwkC4zpxXSsbFSYe17mtDSbOeduQTbcZ6W4lLJFSQuY+MgPa2IMLb7XzJ+sTrJLho6huFwh7LGMzA6+H0gpmfABG8zS1LIc2tnOaPpUBvR3pfiFS6nkbUsbYvL3F3V3O9iNLqVH8GGMSzQdbMCyQnrXXF4xbvOqNC4WhmKYfQQiJ9bG/KTq3Xj3XTU3SmgY0CNsspcLiwt71av+CaVzR1VQ3NmGsjtCOOgCtY/gvoxe7mtJBF8rnW9qi4TbfHpiH9J2hjHNpnXeNi7bXjor3oxiMmI1zBLGGlozfZ38FawfBLSMy9biNS8g37LA2/vV5F0VpcJa6ogdKXNFu0Rb1WRrSpVXUPLKrPfY3T77E3GxUart1pulwvuzLyWddMdD3QzNlZ5zDcJusgbHNeMHqpBnj04Hh6NvQnH6JbK54pTC5rJGt8zM2+Q6m4SsabMwR5bGR4jB1F9z6FbU3VG3x7bd4KpS4lxcSSTuSuTVoo4HSlrnBvBo1RIJa1Ba2xyyxn0296zmL4cJqgzsqI2SbEGQC/rVT+eMcbjeOQW+cE5H0lqq6TLTZLE2sCL38FXpVSUx+bkzpc5phJd18zO1rz0Wrw7AGR2mnvmFiG8PSoGH1czA+GU07Zjd7IpbNz/ALJOiuYKpzaZjqiAxuNxtceghRZZ2rr7P1E0dLTvmkfkjiaXOJ4AC5Xi1NiMuJdNnVsuhmldYHgLEAeqy9qjw6bEYC+Vz6anLuLyHOt4HQelJqqbAmgNqKymLmbXe1x9gJV4cOXy5+3DFRucx4c0m41FlXsi6jpbWZW5Y6mBkrOXIj0G49C2VVL0XJyMe58rtAY2OFz7Aoc7MO/KtPPK502QZXNNmjK4i+1uQVXPVRh4rnOFc0FxDQCSdLKwwPoPUMdWz1VU2JtZLnaxrcxaLcdd1e0OJYM1zhHA2K2jRYe9POxqB8raanOdx4DlxPgoy8v41x8Gu2ZxD4IqbEKk1H5cfG+wFvJwR/mVXU/A1XxxPdS4xTzvFy1j4izN3XubL0qliZlzyylxPAaWUnrYI9iAfFKZ0ZeHF82SxS0s8lPOwslicWPYd2kGxCl4C/JjMDif94j9q9e6e9GqPHOjlVUU1LGK+naZo5I2AOfbVzSRvcX9Nl4zhzxHUxPB/wBox3qct8btx+TD0SMQb1WJVLCfNlcPaordZS4fMt7QVO6QMEeO1YuNZCbclXtd2w3mHe5UwbiKniNeXWJDqdp1PefrUHH42QihmY0Asq2a+tS6aQulpXcX0n0t+tROkrrYaHHdkrXJMcb/ANxf9IAH4TUNFvNPuI+lec0us0zPnRvHsJXouLFpwqaQus3q7nlqQvOKM/yofzg4f4Sqrb7SIIhJTxuI1ygerRCcpHjyZtrcfehNenqU/SrCowQySSUj5kZ+mygSdNIw4thonuP894HsAK02D9C8Mo6Nra+kp6ioD33kJc67cxLdDpfLYKxwzo9huFwOhgjzgyOfd1rjMb28BsEaqtR5zXYxiuIw28gMcQcHZhG73nRNUuHdI6s2p4pg08R2R7F622ngZ5sLAedrpzOBubJepzh5MegHSSrljJhjY1p7TpJrAixHjxCtKL4Kapzb1uIRMN9obnT0hehmqgYDmmYPEpmTGMPiHbq4m/2kaDK0nwU4ZFGRVVks7ybh3m5fRsp9L8GvR2kcTkllJN+28/RZWbuk+Dt0OIRX/aSPzpwomwqC79lt0+AeoujmEYaHikpI4s5zOsL5jzKnMoaZg0jA8FVjpPQHzWVDvCFx+hB6T0t9KesPhTv+pLQXAp4RswJXVwj/AGYVGek1NuaesH/tn/UufnPRDzm1TfGnf9SYXuWIfJARaPg0Ki/OnDNM8sjf2oyEsdJ8HP8Av0Tf2jZAXVo/mhQcayDCpiGgHTX0hNxY5hkxtHXQn+2ExjFVDLhUojmY4m2jT3pZdHj2xFW74wnvTcUha7ddqT2yo2Yg7rndcWDjmamwLh3NNxyEt3QZHNdma6xSXC8pKebAHMs5tweaQ2paTeSBpPNhy3UmGopnfJeO7MD9CZqeoooWSHNC0g9ylUsWH0sQlihbHUOJANuH1bqxkpWytzMsD36qN+RzI/M6Qkk8UrnWuOU6qJJguH4xMx80LpJbWBzHsjutsp2X8jU7y0F8dJGI2Ntckm5HvVth1CyBoZEztu4q7pBJhzpGMg65kzs5eDqDYCxHLTTxUS88l5fJuaxjyOWuqauVzppnPJNzcnRJc4xuaBex5L2N8NBWaVGFxyE/PhB94VHjzMAwGnNQ/AZXvAuBFA+x/tDshb7n04eftgaZknlcQLhcEOIv5tuacxGWR4dkFv531Io8X/K9VUyMoIKOBhaGMjb43udyUV0pyWbG4nnbRZZ811+CyQ1Ry1VRLHBEM8shsOFytvhuFQ4Uwve+87xeV30DuXmnlUkVQXMOUtOnctFgnSOo65z5QHCMDvH4+1GuCxz3lZtuI5HyG7w6Ng2B0JU+Ooo3ANfGy/MgLEVfSe4NnG/IKCcRrpagPbIxrbbG+neoaXG16dFJTbRtYL7gBeQdIuhtBhM04gri2odUXbE8CwiN3NsBrodLrWYNiE5qB1kuZp0ACk9OMMhr8GZiBb8dSkdpuhLCbW9dj61eGWq5/LjuPMcdw+prMWmq6ZgljkAIs4X25KpmpZacxOfFKxxzB2ZthstH1BDgWSA9x0Toq/JwGuZNbjd/ZW+3F6Mn5fVWaBPJZoyt7Ww5JyrmnloGmR1xbTXUrQzsw6qF5aCG5+U3sn1iyjT4VRz03UxTPiA2v2gqR6arTVfx/RJ5+dRX9TV53QuvVxftAL0CGSE4B5F1oc9tMY9rXOUhYOno6iCqjM8L4gHjVzbcUxlDMVT1cYZe1ifehRKkAVMobewebetCbR9KGuxKb9ThnVj508oHsFygMxaXz6qnhvwjjL/abe5edu+ELG6jNkbTxNFrZWE8O8qvrOl2Ouic78oSBx0aGgDXgtphaj2509IZQV9RJM+fGZ2w57RCJrWnKBqTcHje3dZddhWGsu6prp5OZkqi33ELysYpiPVMjdXzkMaGjtlVuJ1VZNEQyokJbq7M4m+ug9qVws7Ey29dkf0Sp/10tGSP+ZLn95KZ/OHoXTHsSUIPNkAP0Lx9uEzSAGescTxDQnG4PCN5pT/aVTxZVN8mM+3rp6e9GIdGVH9yI/Um3fCZ0eH+2m/uLyb8kUw3dJ/eR+SaUcHn+2UfDkXy4vVj8J+AfPnP/b+1c/Sd0f8AnVH9wfWvKvyXS381394rhwqlv5rv7xT+LIvlxesfpN6On5c4/wC39qWz4SOjhOtRK3xjK8j/ACVTcA8f2kk4VT23k/vI+LI/lxezx9P+jT/+I5fFjlJZ0u6Oz7YrTn9p1vevDfyVFs2SUelX2D/B7W12WepnkpKY63e3tu8B9JUZY3Gcrxsy6etxy9H8QPY/J9QbX2Y4qvxODDoGF1HSRQuOhcxgbcctFEw3DsOwSDqKCEMHypDq957z+AkYhUZm77Lmyz3w6ccNXannN3E81HsCnXuzC6bA1WTY43shJc/VdJ0TLzqhUOiTVKa43uzfkmG3c4AK0oIA0hx3We1aFNXFujuCnw1IeQGjMeQUqCipZTeSBju+ys6ejpYG3hgYwniBqpqpBRs6luZ47Z9imtlHNR7WSHvybpKTxI1KEhvdj3N7gVV+U8inmTJ7TZL2q+lVLEKSKVscbXmWznNYATod7brKzQAs2Ws6SSZsPiHKYe4qhawSs7JsFQnHTM1fQfF6iL8qYaG1DJSS6ON1nsINrWO+3tUTC4K2inqYq+CSB7WgBssZYTc76+C1zxU00Lo4KiVjCbkNeRcqlrOumcXTSPe7m4kn2rS5f86rOeOTP2QZBmNwbqwp3ZzxsQoLYrPDgNePerKlieXAxAdo7LLTa5J2HwMbOHCR8WvAXBWyjgZW4TNSTPD2TRmNxtzFlR4ZBVRi0tNnYfmkFX1OWMbpo3v0snGeXLyJ7ZaeV8MoyyROLHDkRoUCYt70nF8RbW41W1cX6uWdzmd4vofUowmaRqbLojivaQRE85m3jdzbokmN4ObPnHIdkpvNyKM5B3VkWx7QdXZTyeCCpDK0RHK93i1zVFMrXNLXtDgeaQIWtu6B4YXbtcLgoCU/8kyOL30ERc7UnJuhQyXX1pbnm2TRCAcb2WAHfieZTLj1lSANWxC5/aO3sunXuAaSTYDUlN04tHmcLOecx9P2Lvrlhwm2qjMBlmjZvmd1jvAaD2+5Ozudkys85xyj0ooGZusn4OOVn7LdAo7ykG/XG1IXbJVlCdFWwV5ngIkY7djjpbjot8rphJMksjuScq6yTO2+xvqDwXbpovBBauWVjhmEVeL1HU0kdwPPkdo1nifoW0wzobhtC0Pqv5ZKPn6MH9n61ln5scG/j8GWfTBUWGV2Iuy0dLJNzLW6DxOyv6LoFWS2dX1MdOzi1nbd9Q9ZW7zxwsDGNaxo2a0WAUaSYuBAK5Mv6cr07MP5cZ2raLBcJwWz6eASTD/ay9p3o4D0JypxAuNgm6rObqC4FYXK3t0TGY8Q95TYqNUyl4N13Kbpid1lFMxm4JV0wXapYdokZwnRNHdKvoklKrh6AAOVpTutZVMbrKXBKcw1UVcaKkdsrJr7ABU1HJoLqwbKCpVEu91DrJMqkB1m7qrr5C47pC1xk9ypkcoVKJLPuCpsEt+5BJGKQ+WUL42jttOZveQqKlf8lXuc73VDUDyfEJG7C9x4FXCt0ndSHt1VdV0F7mytYHB7BqlyRty67K9FtmRQEHZWmHYf1ZvbwUoRNL72U+BjQNEglUrS1oHFSjRnEGyU2d0YkY5rns85oItcd6Yi0sVcYY2zXSHc6BVJusvJlqPM8T+CnFKa7sMq4qyMbMk+Lf8AUfWFj8QwjE8JkLMQoJ6b+c5nZPpGi+irgpMkTJWFkjGva7QtcAQfQttOXb5sbI4atKWJx8rQ817Ri3wddHcTzObSGilPy6Y5f8O3sWJxb4J8WpgX4bUxVsY2Y/4t/t0PrTG2PvdGaybr8PxHCJuqr6SelfwEjCAfA7H0JdPFNM3MWZW8HHigys/ehPikFtZXDwCE9FtFm7QbH891j4bn8d6ezBR2kOne7gzsjx3P0J0uXZtz6M1EhBOXdrez+0dB71YwwiGFkY2Y0BV1MzyitiG7cxld4DQe1XOVHj/UeW8SGsq5lT2UpJC1YaR5I3B2ePzuI+cFZ4Dg0mO1WVjiynjF5ZLat7h3qvmlZC273WvsOJXouC0keDYTFARlkd8ZMebzv6tvQsfN5fScOjweL3vPSfTU9Ph1MympIxFEwaNHE8yeJXXSE8U31zX6tcDfUEJD32Xm277erNTiEvkLbm6jOnIOpTkjgQdVCmJtZECZG9kuhTNRTWN2qA2pML+4qayuY8WJ3TCLI3KD3KBPurWoLJG6aFVk0br6oCHIbFEZvdKkjKTE1wvcWU0FXXbosgBI4LlSKdxzpmxT8AN7pKi4p35QNVPgkvx1VTC+ymwyEEd6jStrJ0gDN1AqSCdE71lxZR5De5RobQHizzqn6eW2iakF0lhIKrRLRsmbioWLwZmMnbu3R3glwyHiVLs2WMseLtcLEKoSqpJyLAlTnThwAJuquoidTymM8NjzCGSkDUpiLRjhfVTICbKqp5g52psraAaJGlRXOg4q+hb1cTWcgqmjiAka487qzDytfHPty+Q+H2Ss4TGdGda6ZaSg4LtmlRs6cD0tFoT0sFTEYp4o5Y3bse0OB9BWaxT4PsHrw50AkopDxiN2/wB0/RZacP03Sw66Og8nn+CzHuud1GLURiv2czHg27xqhesaIRum+aISREM257R8TqlSSFsZ8Fy6bleGlpOzbvPgBddFuoy7qfhMXank4C0TfRv7VZLJ4di1TSNIzNfGXXLHb95BWlpayCrja6KQZiLll9QrwymtMfJhd7PpJAtcpRNgSdgqyprzNZkDH3GhFrG/AKrlpEx2fY+CoxigpS0PLqmME92YX9i9LlnDy4HUFeaYHh0sOK0lRVMPWGZhDTbsdoL0F7u2R3ri83N27/55JFayaan+KBaQwnKTuB4qPVYtPGwuD3G244+hWFTTtlFw2530VbUU9QAXBheBzGoWE7elPTLHVM0/SIyOt2iBvfSynR4nHKSLg6b8fSFmpnVDZjek31NmHT1JyGrbA1vWMaJNbBpN/St/SZRw2+l74XdX1kgzQkacFCp8SIf1bxldwTEeJs0s0C/DMkzsbUDPmyP7/pWc8ec7jaZ+P13bpdRVQe0EOung5rxqqCN00JGoJtrY3uFb0shkZfcKOd6XljNbnR4wgpt1MRqBdSWnmno7E6pJ0rHROG4Scmqt5IWuHJQ3RAINGawlSYo7DRcYLOCkgWQcKjbqpUewUZh7k+11kjP5rJp503Xc1wkuKWgZkGyaOieckOGiAQJCCp9NLewVLJUZZMoOqsaJxdYkoB7FYc1OyYfINj4H7feqmy0ksRlpJIwLlzTbx4LINxKHq2uc17SbBzS3Vt+apF4Smuex1wr/AA6Rz2Aut61lfytQl2Xyhl+etvxotLhh7IRYJWkpeClXCg0z9PBTFp4/xj5J9lXCL96ShasjgKUHpsG66DZAOh104HpgFLDkA9mQm83ehLQfOGqh1rj1cgB3swe8+5TSNCVW1Ae/J1bu1cvtxJJsLepa1nO0QPaGNaIxe+9zqpTK6eGLNExkRtbMzQ2Tdmve5swlM97G1rBOthAcYnskuBuSQfABZ8w7pMGJTVFAGveJJCb5SLZbce9MR1JijLXZXNJ0YRqVyazYuqZ2QCM77EjwFgkMnoIrMEDpTfUu0V7t7TqfS2wyLE5KyOpMpjja9rrAgmwN7XXpj/1h8V5fROrHMdJS9mPg0EOI9a9LgmFRSwTg/rYmv9YBWfmnErXwXmw60IMDHG5aL80pm6eaNFzupAmwynm1eCT3Gyhv6PQl14y0a/KbdXTxYXTD3SPiJhLTICC3Nt6VUysT6yXelFUdF3SEOjlAcONrXVfVYJWwXYJQ/KNSAbD0rWU1RK2WSOohcy7hlJdcHgbd2xsn3TQPhMjHCRm5LRc+pa4+XKdufyeGZcvOX0da6QSOBzNPnA7q7w1z2SZZdDbQ2sHfar2ejiqPjY2NffmbKKaKpB/UxW5aozzlmtH4fF5Jf9cH2i6Wy4clMY4sGdtncUrJZYOqFZtEy9qcGy45AMCMZweSdCLC/ilNahUFktpXMuq61pCCLDrLhN13IuEWQog6lJmOSMnklHdQcUqeqpHnuSCsglNViM1vMjsL960NDpoqLCYOpoWE+dL23X5nVXdI6x0SC+p9QFjsYe2kraqmlZZuf4rLuWnUekLW0r721We6U0RlxMStdbNG02txF/qCqdoy6V9PSRSxPD4crZDcsJFge6y0OGtygDks5g8+fNFe4Zq09xWpohZo706mLinKsWC7AVXQcFa0wzRDu0VeO8p8nROVGVSMqMq2YGAF3KnsoXcqAZDSlBtkvKuht0AiyEvIhAfN1S7LTPI3tZLoMLjqqeape0ksdkZY2tYa+1NVJHxbTsXXPgFOpqvqej8TW2a14LpJnWtcm9h3rWMr0o4XRtr3ta4gWIBa0HX3KypWCqqXNiOaQA5Wk31UKihD3OMbS0SGwJ9pVvg1JDSS9a593kkAu0sFM5uhlxE2mwhjaHqZG3LtXXJ39CqMQwSqgaZQ/rW3F22utK6vpGHtVDPRqmn4nRnRpfIe5hK1/wCWMuXbPYLDIK4hwkZE4FpINteS9EwsNZhdPGzzY25Brtbb2LCuiYK11RHFLZzswBGWy1PRzEHVQqIHsDCyz2gOBuDofo9ax8s/4b+K2Zr5h1UuPVQWGxUyE3A1XI7nZm/FmyqaactqZoyfNfb0WCu5BeM6rM4gTSYzG+9o5hlP7W4+lSel9G8PtcA21B5LklBTT3c6PK7fMw5T7FEp5jmCsYzcKk6M08L25w8a5t+ae6rkE6BrsnWsuE9nIhPg0vaxTRiIGys+qTb4OyQkelY5tk048FMmiLeChS9klB6A1KcYmGuN1JjFwgFAXTjYyUpjLnZPtj0QRgs0sm3MKmZLJt7EHtBlu0XWb6QzF1M5gNrhaapFmlY7HXFwkF+BslTXUQAaANgFMp3dsBV9FKJqWKQfKYCpsB7V0D7XtGVC6SMc6opC0gXY8G/EixH0qTRuSMeaHRUb3fJlIv4tP1Ji9Mtg1LNTzSCRpaNtVrqHVoVM3R11b0LtAnbtnjNLqAaXVlRHRw5G6rYHaKdSOtLbYEKcf9DObxT0Lh8Vy3euly6KuhJt3roFkjdXQFwFdugCyEXQgPm2ela993TgNsRYA8UpkNG1ojZEHcha693h6NYDT2MWC0LTzMLSfarCKCCAWhgiiHJkYb7lszrwaDD62cBtLhVVIBt1cLj7grCHoj0kqbZMBnA5yNDf8xXtpc4/KPrSNQUg8lh+DrpRL50FJT/tzNH+UFT4/gsxZ4/lGMU8d9wxrn/UvTLhFwgmBh+CajBBqcYnfzEcQb7yVZwdAcIwiGapo31T6gRkB0kgII3OgA5LWXRYEEHYpXmHLqvP7WNr7KVC4aJusi6iqkjItlcQkxOsd1yV3Y8xNeQWaFUHSWDrqMkaObqCOBV1muFV4wf5I4Hkk0MYJOauiimO7hr3HY+1X8Q0Cy/RP/y919myvA8LrUxDROM72fYLp9rdNkiMKQ1vJPQDY7jZK6oWTzWpwMSVFbUU12HTVUVZGWFa98eYLOY5GI2XHNJSrZupsLbqDSHrTdWULbaqtJqRG3VSGt0SIwpDRokRstTMjdCpRFlHlsAUHFXV+a5Y3GCC9619c8NaVi8UcHvcL6dyNK0m9Gqls2Ghl+1E4sP48CrppsVlOjU4ir5qfYPaHAeC1IKeivFW1HJtun8WIkoGAi9pAfYVW00uUi6m1kgdRtA+ePcVP2L0rQbKyoHKtU+iNrJoi+pz2d1Mifle13IqDTnRSmlRvlXcWXlDDxXPKGqDdczWXTMuHN6rAVDV3r281XZxyRmTlLSxFQ0cV3yhirc6M6ey0svKG/goVbnQjY0sLlGZJIsuK+Wei8yMyQhLYLzIukXQnstHAdV1NbcUF/ejY0zXSSn6uu6wDSVoPp2KqY/OWlx+ITUPWA3MTr+g/gLMsHaC5s5y6/HdxKbdVeMn+TuHcrRp0VPjhPk77clLc50fpwzDIC0ecwOcORPFX8Qs0KppGGGCJsZsY2Buh5BWUNQ0gCRpb3t+paaRcbbuJ0Y2UpgUSOSMjSRvp0UqN7dg4etKwap9u6eCZaRbcJfWMHyh61CpCnDRZ3HReF3cFfumYBq5VOIU3lbS0PDQdrhCpGWwWTracPvxI9RV5GQQPBMYZ0dZh8BifVGUlxdcNy7m9tyrJsEER0aT4lOFcLXY9E/mAbckDxTBefki3oTRY557RKejmH6elqYmjzr+CrpqmR98jbBSjG1uml7Xso8rmjWwbdulzqD4IkVqKerjkeDmJuszXw5Sba6kWBWtqXh7CbO1todLehZ7EmE2LdfDmnobZ6kl8lxmnlJ0LrG3I6LcN2vzWGq4xnDhob6LZUUvX0kcgPnNBSZ3lKa/IVI64yRBt+N1Dcl05JcdeCVhXg7xU6jOoUFTKTzglpMXlOdApjTooFMb2U1ugUVcLukkoJSbrbHmMcpqlXK7dIugG6vSC7oukE2XLpkcQm7lCAtiRZJuOaQXJBKpno6XWSXP5JtCWxorOVwvPNcuuI2NOlyTdcK4kNEzMEsL4zs4WWSLSyQtO4Nlr1m8UjEVdJYaHUelRm28d+jTToqvF7OZbmQPap+ewVPjU4a1oNruka0DvLgs432v4YruOWwO1ypQhDgAWljrej1qKZC0mwsL21G4UqmqOzcm176t7Q14rc5ShAQRaxCcbGeISj1cg4H5Oht4+5LcBwBte99NEqrYaCBqT60vNZMgOaS6zjdwdYkHlt3ae1dY4WA+SbgWU6OZHDIBufakGVp2PgmnvAa25Zo/ib8fsSBIxpfa18xsMv41RpWz+dtwDrfQcU0ZLk2YbJAeS42D9DYcL/YkvcMp0GhsL6+zglotuumNtA3keNimzK8k3aSTfQ2F7ezguZnXs3Ne9m249/emSRYktbYHjqbeHoVJ24aguDRcaDQMGml7Ag8NvWmHvJadbag6anxKdJu1wDSRe+UDTl4jgmpCY3+cNdspv6bhIkWoa5zTqL6Hta/jS3rVVWsc5rhra2YAu+j8bq2lkvqR2ncdz61XVd3dogDU673G6D7ZqqjGoI48rq+wR5NC1riCW72VTVsAcQCTccRbVWWC3bG6+xOhukVWknmrtLqXHgNEiQ9lPUjcsAJ3cbpIpxSqY9oFRVIpzqNUqUXdMdApgOir6ZxsFOa7RTVwu5XEX0XBuq8d+mec+3UE2QTqkrZkVe6ElCAVfuQkZkIG1jdCT1g5IzhDMpcuuZguEoDp2XLriEAIQuEoAJVNjsYzRy23BBVwSoOKx9ZRE8WG6nLpWPbBY47EKciop6l7afZ4AByd/gs7VSCSvoyaqWd/XNcc50ABW4mDTG7NbLbW+1l55UuEbn1ULGZA85G31Db3FkYctrXqh86wNjubG5/0XWsIbna3xI4nhf1exMCYPAIJAeBx1sf9E7FLna0O1tqTs7Tv29SpcPiV+rSRc6Bzha3fppZLbUMaXZsrcpsbHYcfR9Sjm4DSXPsDfzQfVz24pGY7NG5GzQddPX4fWhaYZGgAXb2NbD3j8cVyN18oL2ntGxsRy25H7VE64sB0ceyBsLE6e1OCrZmeLv8AOAF+O26mhJEYsLu2dfRoRYdkFupfprbT6eHuUdlU15udh2u0/XSw9Phy8Ek1Ia0HMwWFzYE6m/tQezxIAvZu+bX0bpLjZpAvmG1hrcqOawNc4NLiQQ0ANF/Rz9Kakqz1bhY6G9idLWPD0JDaQ8Gxu24825+r0FMufYWJFxbRouDyUd1QXOINgOHavbnY+B9iT10jnXym7htbLflt4XQk64m4FyDYkF5sSNyfTwTJlFxrvpZuno71xr2Ax2EeW9jmJIIvxA1G/sTMhtmAOYA3uBp3m++psmZMr/C/K1lCqH5QRY33udNPtuE+918w0GYcde/f8cVDmc4tJOulrnX/AEU0IEzc3asN7alWOHtayFhOjiojY8zzpYe/VWtJTyPa4sackTLmw/HekVLlHYUoDKxo2sFGdrlG9ypJJshDlxdPQGxCik6p+E2KVEXFM7ZT2HshVlK5WEb9Apq4euutKQHBKbxRh2nPoo7riELf6YhCDsuA2RA7YIXLoTCZcLmZJzd6EMil2/JIzd6M3egFXXbpGbvRdAKJSblCEAJuZokiew7OaQlkpJQGProOugkhLizM0tLhuLrNP6NUcRAe6WUDYOdp7Fsq6PLPIAPlKoqW2useY6pJSqeVraKMDTq2ZLeA09llJjmJcLk3OtiNvV61VxTCN5a4nK7fu70vO6N+Une/HdVMlaXQmikFtw5x3da++v2eK46YG7u8G1/V4E6epVjans2cDobb8LpZnHbBdaxvp+OGqe1JrpWXddgB3Om/IfjkkOlZcZSBppa+/H2HjyUJ0xDrXAJ0H45n3JrrXZW5jpa3Hbl+N0bCeKloANxqLatG3u112TZq3C5zea7TXjy9pUMyaHTRpvpr6bLmZ93AHTe44H8fSlsJL5L9YNrtsT67m3ikGY52m17i/wBQTfUucT2gALADXU8B7kCEho0Og0025+GiQ26JgGt7RtbLcnfn47JRl3JcCdbNOtj9mqaOo1ZbK4W21HD8dyHgAuab3t/r7foTgLdI0OuCTflx4D6011twHA39O9vtSHusb2sct7W9Sa1AIve1rW101RsHnSFoblIDh80kH0/Yo7jcWTjw5xHEOJsCbWCVFA+R7WNBdfkkHKSkfPK1jG3dZbCjoI205p2DsFtnv4kkWKgYfSCmaBlBeTrayuw5lLBc2u4gC3E8lIk2yZaWPLXaOabHxCVmUjFIH09e4vAaZRnA8d/aobnJ7TZy7msnIndoKOXXO6XE7tBIlzTO2U9jtFV0ztQVZR6hRTiQw3KfjGl0xGLaqS0WaFWHac+nDuuLp3XFsyBSV0riCoQuXQguT90ZiuIVIdui64hAdzIzFJuEXCAVmKMxSbhFwgFZlwm65cLl0BUYi3496papu6vsRbebxCqKiAuusL26sLwo5tHIjqGtbklBLdmkbt+tPVMBBKhmMoWnAZ2XY7My2hau59QNbnQAnRVpY6O7mOLHAbtNlvThFFK1pkpxmsLkEgpxOWXqyebQC405n8dy4fNeNRx22K0VbgcTIjJStOYbsJvcdyopCGmwaNOB4KhjlMnARmGpFx6vBOh7D5rXAO0A3t7O8qMZCCCGi24NkjrTbUDw1SWmdYxoBDACBYa+tNZ2ta1t22Bt4DXT1KKZj80WXOuu+xAtbfmgJD5czXEvB1+Tb0eKQ547TbE8/tTJkzajLchcDm2IABHqI9qAcO2rS06abexdDRcnXUWsdymi9rWkk6bk8LcU4w3OpJHEnigHo2MzHQXIte6taOLKAW7/AEKDSREm4G/LRXdNGGMbqSeKmhLhYGNzEAA+lOttm6yTUgWDSfN+36k051rt2De/8dy6x/aIPDhm15IVEbF4DVU4lAu+K+ndx+tZ9y1IIefO7Lhob9yo8VovJZs7G2ikPZ7jyQnKK4mycjPaCbIXWHtIQtqV2g1VvDYgFUlKdlcQOAYFFUmRgl7QpRCj0nacXclKIurwZ5mikpZ0SFozcKQT3pRPckHdMO370JKEA9qu3KRdBKpmVqi6RdFwgirrt0i4QgF68Fy/NJui6AUSuEpOayAUBExBvmO8QoLm5grGuGamJ+aQVBjIcscu2/j6QZ6UHWyrpaUN4LQuZcKJNADwSaqB8IAW/wCKxlVCADotex/WQsf85oPrCrHtl5Tl1mMZo3NqpJIzlublttNftWkVPizbzuJHyeXBaWI8fbNvZ/N9v1pLoxqSBy3T8ri03ykpvrYuNws3SbEY4C2u913qXZL5SQRe9jte3JOdbH89vpK7ZvBw9aDNRxFzwGsLiToBxJXC1xtw+pOh0Ys3OzwzBJfJFtn9QKAQGXBAAta1u5SIoHEC5seNkmOWN5sC5x8D+OKmQvaGjMx3aHZPI945WulaEmmaWDKOPd+OansOltR3G4Khxus3ObdnexGnfr3a+hSQOxlaGi2oNtCkfR+OV4ae0cp3zcT/AKrjZHO1sOVifb6tU0H6Ak5Q8aXNjdOMOYaEDSxGm6DSYyRe98uoufBcqaZlTS9S8EXNmnLcg89OCQwXbYWPfobfj6FJZ4b+v2IF5ZWqpZaWUxytseB4HwUfZy2FTBDVxlkrA5p211B7lSVmBVEF3wnro+4doeI+pCbCKMFx0VzHFI7LGwXeeAVPQiQOyMjeX31GU6LS4SC18rXC7w1pJ8SdPYo0aXBB1EIZoTxPMpRCc2SSLLWML2ZcEghOuFwmnKomkEapDt04Qm3bpk4hCEAXKLriLjZUz06hc0XUDQRcoQgaFygm6EIIAI2KEIBEjc8bm7XFlVROLSRxVsSqqqb1VS7k7ULPONfHUpuoSJIr8V2E3CfyXChsqKuHQ8Va4a/Ph0N92jL6tExUQ3F7JeFm0D2fNefcFWPaM5wnKsxdrPi3PHZN2kqwuomIduCw87W2vctKyw/0y9ax0czhsb+sb6fUoZLc2rLknbirqe08eoB3H4+1VstMM5LdQNbLN1IpA5j08UCMcu8C24TuW3DZdA+SfAoMhsZGgAsTxTsVO3QkZiTa5NtUpjNri997J+ONtzqGi3EaX9CAaDHh5BA8QpMUZc+41B11G34+hORsFg7KCT2dTt3p5sYAAIIe06hASoy0a3JzN2HA+CU3LdriQOBc4bfjQpqNrrWIPPe9k40Bx1FtD3BLQKYHEWaXDmTqNfwdPBPN7GYAEu33Iv6UhulnAEk6Hbhx9vtSgQDttwuRojQ2dab9prgRoRqD6k6zcgAjjqLFMtsG5r3ynW5G34ulZgBfKDls7a4/GvtRpSQyWzhbjwIOnrSw7stc63frsojH37Lr2O2+n1JecyOIZcAcEaNIYXSyBrSbDc96fYW0jzJ8h5DZObTwPhwTULerYbb95XZR10DmMN79/G/1pGsiuHVNxSdZGx9rZgnE4wzmqbOiZcE85NHdVGVITTt08RZNuF1REIXbBCARdcXLd6DoqQ6Dqu3SFzMUA6CglNZzddzX7kAq6C5IJXL9yCpeYrocmyUXQRZKiV8eeMPA1afYpF9UlwD2Fp2OinKbisbqolM/hdT2ahVMZ6uXKdwbK1gN1g6oJI8zdVHpm9XJIOdirHqy4bKHLGYpL8wrxvKc5w6XjmoVdK4NY4AGzvYk1dfDR5WvLnyyfq4Yxme89w+nZRyyrfA+Ws6uMvt1cLDm6sd7uJPdoLcVsyw7MzsySEN812o7j4KHK25vfXY34qZI4PZ1drkba/bZRXkAHPudvFRXRER5s6wJsuCxPEX5J2S1zsE3ltsCRfVSZwXJF9zy4JfLkRsSkM1FidttEob+KAlQPuMpG5+VbVTIw5xLnA6G2a+hKr4TZwtsdDw1U9sgaCbAX86/D8fSgHrFtjbbhzBTli12XcDtNvy93f6Ew6SwBeDlbYHU6/ge5EczgdBYN4tNib7oCS21rOscw20Ou31rrbkA8DoSAd/xr6U00aEa7BwOv1fiy682BbocwzaWP27X9SAfe/KWE+d5jml1jodzf0epNtecwzi5FwW2AuPR+NAmi8vvcWDhtcgX24+n1p0CwaADcDW410/0ugFZmgZQQP5w9qkRjILNFraEkKKwgEAG9xfXQX9PpTzHuIDg3W+XbfT/AEQpKBc64bq4d/BSWsy6Am543UWEWdfc21UomwI2trdKqhbHhgDToCbg/QpKgvkbGNQSPG6lxG8LDzaiM/I47dNlLdumym56SUkpRSTsqIhC6hMG1wtTllwhUg0WpBaniFwhAMWtqi+icLbpBFkBy5XCUJLigFITdyjMgHLoSQ7RF0FpDqxllD7aOU2ieHAbqPUtzxHmNUmjkyu5rDKcujC8NBEzM1RcWp5jRv8AJ3MZLbsue3MB324qZSPzNCXVMzQPHMKJeWlnDL0lBDRF72F0s0n6yeXV7/qHcNAlVIvTusbEHTxTx3skSlhiLTbNfS+x7iuqOfHtTvLmnMBZ17EcikSdsA6XOpF12YSU79t+J8dAe7vST8Y5zg6zh5wO4KVjoMusAbG/49ibtw5J4i41bY7bJD2Ed6iqjjOy65F76lLBBtz3GqbaACL3t3J1ovq3mkNHI/OOnpUxpFg8mw2N+aissCLaElPscWjuPFBHMxFwdDteychaLBxFwDYgafj7FHL25gbEAmx4FOtk1Liedw0fj8FAP5xFqbusRodre9JZd4Lr5hG/e2h9G/BMucZXgjNe1jc3uVJhj6tjSWg5hYH07+xOA7la0FoJIvcOB+g+hNyvy2BFnNdY3+r1pYaHAsGZxsbAa37lEne642Oa17fb4e1IH2FzSWaksN234+gqYx4iBLxlc7ha1r/YocRygPkdcnQEi/44J2Jht1rxZlsrtD+OSDidFJma3gRa17bJwztjGpu62wKhdeXWbFcNHyhy7vb609DGA2+rjxJ4ckGdcx73Xe4X5HkrCMkRtHIWUJxGQhp7ZG54KVGeyDzCEZ9FuOqQTddJF0lDncKZe83yMAL+/YDmUt7iXZWWvxJ2b+OS4xjWNs2+9yTuVUBvyWM6vYHu4uO5Qn0Jhcfm5/S/3f2o/Nz+l/u/tV4hUz2oj0av/vf7v7Ufmz/TP3X2q9QgbUH5sf0z919q4ei1/wDfP3X2rQIQNs7+an9N/dfauHolf/fv3X2rRoQNs1+aH9P/AHP3kfmf/T/3P3lpUIG2bPRHlXW/7P2rg6IW/wB//c/eWlQgbZr80L7137n7yZj6E9W/MMRv/wBj7y1aErjL2cys6U0HR8wgDyrNb/p2+lPnBwRYz/4PtVkhT6Yq+TL9Zt3RDM5xFda5vbqftSPzMa5r2vrg4Otb4mxH+Lw9S06FaPasg/oE2VhZJiOdh4GD7yiD4NbNt+WDmbpG/wAn1aOR7Wq3SEK+TL9YkfB2cvaxUE2Oopuf9pcPwcX3xb+H+8tuhLUP5Mv1hv0ba64tf/233l0fBxYj/wDLbf0b7y3CEag+XP8AWLb8HmUADFdv6P8AeSx0At/xTS9/1H3lsUI1C+TL9Y0/B+Sf/NBbh/J/vJX5hHS+KaD/AKH3lsEI0fyZfrIs6CFliMS7QvY9R95PfmX/AE/9z95ahCNQvky/WXd0LzNt+UTvcfFaD/F4JA6EW1biAa64IcIdf8y1aEah/Jl+so7oRmLicRNzseo29qc/M45rflABnFoh3PD5XitOhGoPlz/Wdb0Uyiza2w4Wi2/xLv5q2Fm1lufxX2rQoRqD5c/1RN6NBrbeV68T1e/jqlt6P5WhvlWwt+r+1XSEahXyZX7U35v/ANK/d/auO6PEts2rynn1f2q6QjUT7VSDo21rcraqw/8A4/tQOjtv97/d/artCNQe1Un5un/9v939qFdoRoboQhCZBCEIAQhCAEIQgBCEIAQhCAEIQgBCEIAQhCAEIQgBCEIAQhCAEIQgBCEIAQhCAEIQgBCEIAQhCAEIQgBCEIAQhCAEIQgP/9k="
}
}
})
})
var p = generateWAMessageFromContent(from, template, {})
await iqbl.relayMessage(bal.key.remoteJid, p.message, { messageId: p.key.id });
}
else if(menusimpel = true){
run = process.uptime() 
const template = proto.Message.fromObject({
templateMessage: proto.TemplateMessage.fromObject({
hydratedTemplate: {
locationMessage: { degreesLatitude: 0, degreesLongtitude: 0, jpegThumbnail: fs.readFileSync('./media/IqbalzzX.jpg') },
hydratedContentText: menu,
hydratedFooterText: '𝐶𝑟𝑒𝑎𝑡𝑒𝑑 𝐵𝑦 𝐹𝑒𝑙𝑖𝑥',
hydratedButtons: [{
urlButton: {
displayText: 'YouTube',
url: 'https://youtube.com/channel/UCrIvOGs1TRDcKODSH9BYlcg'
}
}, {
callButton: {
displayText: 'Developer',
phoneNumber: '6281315995628@s.whatsapp.net'
}
}, {
"quickReplyButton": {
"displayText": "OWNER",
"id": `owner`
},
},{
"quickReplyButton": {
"displayText": "SCRIPT",
"id": `sc`
},
},{
"quickReplyButton": {
"displayText": "RUNTIME",
"id": `runtime`
}
}],
}
})
})
var p = generateWAMessageFromContent(from, template, {})
await iqbl.relayMessage(bal.key.remoteJid, p.message, { messageId: p.key.id });
}
break
case 'sc':
iqbl.sendMessage(from, { text: `Free Script : https://github.com/Hexagonz/SELF-HX\nhttps://github.com/DikaArdnt/Hisoka-Morou`},{quoted:bal})
break                 
case 'runtime':
run = process.uptime() 
rteks = `${kyun(run)}`
textImg(rteks)
break
case 'speed':
const timestampp = speed();
const latensiii = speed() - timestampp
exec(`neofetch --stdout`, (error, stdout, stderr) => {
const child = stdout.toString('utf-8')
const steks = child.replace(/Memory:/, "Ram:")
const pingnya = `*${steks}Speed: ${latensiii.toFixed(4)} Second*`
textImg(pingnya)
})
break  
case 'hidetag':
if (!isGroup) return reply('Only Group')
iqbl.sendMessage(from, { text : q ? q : '' , mentions: groupMembers.map(a => a.id)})
break
case 'group': case 'grup': case 'gc':
if (args[0] === 'buka') {
textImg('Sukses Membuka Group')
await iqbl.groupSettingUpdate(from, 'not_announcement')
} else if (args[0] === 'tutup') {
await iqbl.groupSettingUpdate(from, 'announcement')
textImg('Sukses Menutup Group')
}
break    
case 'editinfo': 
if (args[0] === 'buka') {
textImg('Sukses Membuka Edit Info Group')
await iqbl.groupSettingUpdate(from, 'unlocked')
} else if (args[0] === 'tutup') {
await iqbl.groupSettingUpdate(from, 'locked')
textImg('Sukses Menutup Edit Info Group')
}
break    
case 'linkgc':
if (!isGroup) return reply("Khusus di grup");
let linkgc = await iqbl.groupInviteCode(from)
reply(`https://chat.whatsapp.com/${linkgc}`)
break       
case 'revoke':
case 'resetlinkgc':
case 'resetlink':
if (!isGroup) return reply("Khusus di grup");
let link = await iqbl.groupRevokeInvite(from)
textImg(`https://chat.whatsapp.com/${link}`)
break
case 'owner':
for (let x of ownerNumber) {
sendContact(from, x.split('@s.whatsapp.net')[0], '𝐹𝑒𝑙𝑖𝑥', bal)
}
break
case 'setmenu':
if (!isOwner) throw mess.owner
if (args.length < 1) return reply('Pilih Gif Atau Location')
if (args[0] === "gif") {
if (menusimpel === false) return
menusimpel = false
textImg(`Succes Mengganti Menu Gif`)
} else if (args[0] === "location") {
if (menusimpel === true) return
menusimpel = true
textImg(`Succes Mengganti Menu Location`)
} else {
textImg(`Pilih Gif Atau Location`)
}
break
case 'ping': case 'botstatus': case 'statusbot': {
let timestamp = speed()
let latensi = speed() - timestamp
neww = performance.now()
oldd = performance.now()
respon = `
Kecepatan Respon ${latensi.toFixed(4)} _Second_ \n ${oldd - neww} _miliseconds_\n\nRuntime : ${kyun(process.uptime())}

💻 Info Server
RAM: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}

_NodeJS Memory Usaage_
${Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v=>v.length)),' ')}: ${formatp(used[key])}`).join('\n')}

${cpus[0] ? `_Total CPU Usage_
${cpus[0].model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}
_CPU Core(s) Usage (${cpus.length} Core CPU)_
${cpus.map((cpu, i) => `${i + 1}. ${cpu.model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}`).join('\n\n')}` : ''}
`.trim()
textImg(respon)
}
break
case 'suit':
if (args.length < 1) return reply('Pilih gunting/batu/kertas')
if (args[0] === 'gunting' ) {
gunting = [
"Kamu *Gunting*\nCrew *Kertas*\nKamu Menang 😔",
"Kamu *Gunting*\nCrew *Batu*\nKamu Kalah 🙂",
"Kamu *Gunting*\nCrew *Gunting*\nKita Seri 😏"
]
gun = gunting[Math.floor(Math.random() * gunting.length)]
textImg(gun)
} else if (args[0] === 'kertas') {
ker = [
"Kamu *Kertas*\nCrew *Batu*\nKamu Menang 😔",
"Kamu *Kertas*\nCrew *Gunting*\nKamu Kalah 🙂",
"Kamu *Kertas*\nCrew *Kertas*\nKita Seri 😏"
]
kertas = ker[Math.floor(Math.random() * ker.length)]
textImg(kertas)
} else if (args[0] === 'batu') {
bat = [
"Kamu *Batu*\nCrew *Gunting*\nKamu Menang ??",
"Kamu *Batu*\nCrew *Kertas*\nKamu Kalah 🙂",
"Kamu *Batu*\nCrew *Batu*\nKita Seri 😏"
]
batu = bat[Math.floor(Math.random() * bat.length)]
textImg(batu)
} else {
textImg('Pilih gunting/batu/kertas')
}
break
case 'yts': case 'ytsearch': {
if (!q) throw `Example : ${prefix + command} story wa anime`
let search = await yts(q)
let yteks = `Y T  S E A R C H\nTotal : ${search.all.length}\n\n`
let no = 1
for (let i of search.all) {
yteks += `🌹No : ${no++}\n🔖Type : ${i.type}\n🔖Video ID : ${i.videoId}\n🔖Title : ${i.title}\n🔖Views : ${i.views}\n🔖Duration : ${i.timestamp}\n🔖Upload : ${i.ago}\n🔖Author : ${i.author.name}\nUrl : ${i.url}\n\n-----------------------------\n\n`
}
iqbl.sendMessage(m.chat, { image: { url: search.all[0].thumbnail },  caption: yteks }, { quoted: m })
}
break
case 'join': {
if (!isOwner) throw mess.owner
if (!q) throw 'Masukkan Link Group!'
if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) throw 'Link Invalid!'
m.reply(mess.wait)
let result = args[0].split('https://chat.whatsapp.com/')[1]
await iqbl.groupAcceptInvite(result).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
}
break
case 'tagall': case 'infoall':
if (!isGroup) return reply('Only Group')
let tteks = `🌹Mention - All\n\n🌹Message : ${q ? q : 'Nothing'}\n\n`
for (let mem of groupMembers) {
tteks += `🌹@${mem.id.split('@')[0]}\n`
}
tteks += `\n𝐶𝑟𝑒𝑎𝑡𝑒𝑑 𝐵𝑦 𝐹𝑒𝑙𝑖𝑥`
iqbl.sendMessage(from, { text: tteks, mentions: groupMembers.map(a => a.id) }, { quoted: bal })
break
case 'pinterest': {
if (!q) return textImg(`Example : ${prefix}pinterest <query>`)
reply('📩 𝑫𝒂𝒕𝒂 𝑰𝒏 𝑷𝒓𝒐𝒄𝒆𝒔𝒔, 𝑷𝒍𝒆𝒂𝒔𝒆 𝑾𝒂𝒊𝒕 𝑨 𝑴𝒊𝒏𝒖𝒕𝒆')
anu = await pinterest(q)
result = anu[Math.floor(Math.random(), anu.length)]
iqbl.sendMessage(from, { image: { url: result }, caption: '⭔Url : '+result }, { quoted: bal })
}
break
case 'ghstalk': case 'githubstalk': case 'gitstalk': 
Json(await ghstalk(q))
break
case 'igstalk':
Json(await igstalk(q))
break
case 'public': {
if (!isOwner) throw mess.owner
iqbl.public = true
reply('Succes Change To Public')
}
break
case 'self': {
if (!isOwner) throw mess.owner
iqbl.public = false
reply('Succes Change To Self')
}
break
case 'setprefix':
if (!isOwner) throw mess.owner
if (args.length < 1) return reply(`Masukkan prefix\nOptions :\n=> multi\n=> nopref`)
if (q === 'multi'){
iqbl.multi = true
reply(`Berhasil mengubah prefix ke ${q}`)
} else if (q === 'nopref'){
iqbl.multi = false
iqbl.nopref = true
reply(`Berhasil mengubah prefix ke ${q}`)
} else {
iqbl.multi = false
iqbl.nopref = false
reply(`Berhasil mengubah prefix ke ${q}`)
}
break
case 'setprefix2':
if (!isOwner) throw mess.owner
if(!q)return
iqbl.multi = false
iqbl.single = true
iqbl.nopref = false
iqbl.prefa = `${q}`
reply(`Berhasil mengubah prefix ke ${q}`)
break
case 'getmusic': {
if (!q) throw `Example : ${prefix + command} 1`
if (!m.quoted) return m.reply('Reply Pesan')
if (!m.quoted.isBaileys) throw `Hanya Bisa Membalas Pesan Dari Bot`
let urlm = quoted.text.match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'))
if (!urlm) throw `Mungkin pesan yang anda reply tidak mengandung result ytsearch`
let { aiovideodl } = require('./lib/aiovideodl')
let result = await aiovideodl(urlm[q - 1])
let { url, title, thumbnail, duration, medias } = result
let quality = args[1] ? args[1] : '128kbps'                
let media = medias.filter(v => v.videoAvailable == false && v.audioAvailable == true && v.quality == quality).map(v => v)
if (media[0].formattedSize.split('MB')[0] >= 100.00) return m.reply('File Melebihi Batas'+util.format(media))
iqbl.sendImage(m.chat, thumbnail, `*YOUTUBE MP3*\n\n*•Title : ${title}*\n*•File Size : ${media[0].formattedSize}*\n*•Url : ${url}*\n*•Ext : MP3*\n*•Resolusi : ${args[1] || '128kbps'}*\n\n*_Wait Minute Audio Is Sending_*`, m)
iqbl.sendMessage(m.chat, { audio: { url: media[0].url }, mimetype: 'audio/mp4', fileName: `${title}.mp3` }, { quoted: m })
}
break
case 'getvideo': {
if (!q) throw `Example : ${prefix + command} 1`
if (!m.quoted) return m.reply('Reply Pesan')
if (!m.quoted.isBaileys) throw `Hanya Bisa Membalas Pesan Dari Bot`
let urlv = quoted.text.match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'))
if (!urlv) throw `Mungkin pesan yang anda reply tidak mengandung result ytsearch`
let { aiovideodl } = require('./lib/aiovideodl')
let result = await aiovideodl(urlv[q - 1])
let { url, title, thumbnail, duration, medias } = result
let quality = args[1] ? args[1] : '360p'                
let media = medias.filter(v => v.videoAvailable == true && v.audioAvailable == false && v.quality == quality).map(v => v)
if (media[0].formattedSize.split('MB')[0] >= 100.00) return m.reply('File Melebihi Batas'+util.format(media))
iqbl.sendImage(m.chat, thumbnail, `*YOUTUBE MP4*\n\n*•Title : ${title}*\n*•File Size : ${media[0].formattedSize}*\n*•Url : ${url}*\n*•Ext : MP4*\n*•Resolusi : ${args[1] || '360p'}*\n\n*_Wait Minute Video Is Sending_*`, m)
iqbl.sendMessage(m.chat, { video: { url: media[0].url }, fileName: `${title}.mp4`, mimetype: 'video/mp4' }, { quoted: m })
}
break
case 'kick': {
if (!m.isGroup) throw mess.group
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : q.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await iqbl.groupParticipantsUpdate(m.chat, [users], 'remove').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
}
break
case 'add': {
if (!m.isGroup) throw mess.group
let users = m.quoted ? m.quoted.sender : q.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await iqbl.groupParticipantsUpdate(m.chat, [users], 'add').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
}
break
case 'promote': {
if (!m.isGroup) throw mess.group
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : q.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await iqbl.groupParticipantsUpdate(m.chat, [users], 'promote').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
}
break
case 'demote': {
if (!m.isGroup) throw mess.group
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : q.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await iqbl.groupParticipantsUpdate(m.chat, [users], 'demote').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
}
break
case 'setname': case 'setsubject': {
if (!m.isGroup) throw mess.group
if (!isGroupAdmins) throw mess.admin
if (!q) throw 'Text ?'
await iqbl.groupUpdateSubject(m.chat, q).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
}
break
case 'sticker': case 's': case 'stickergif': case 'sgif': {
if (!quoted) throw `Balas Video/Image Dengan Caption ${prefix + command}`
m.reply('📩 𝑫𝒂𝒕𝒂 𝑰𝒏 𝑷𝒓𝒐𝒄𝒆𝒔𝒔, 𝑷𝒍𝒆𝒂𝒔𝒆 𝑾𝒂𝒊𝒕 𝑨 𝑴𝒊𝒏𝒖𝒕𝒆')
if (/image/.test(mime)) {
let media = await quoted.download()
let encmedia = await iqbl.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
await fs.unlinkSync(encmedia)
} else if (/video/.test(mime)) {
if ((quoted.bal || quoted).seconds > 11) return m.reply('Maksimal 10 detik!')
let media = await quoted.download()
let encmedia = await iqbl.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
await fs.unlinkSync(encmedia)
} else {
throw `Kirim Gambar/Video Dengan Caption ${prefix + command}\nDurasi Video 1-9 Detik`
}
}
break
case 'stickerurl':
let encmedia = await iqbl.sendImageAsSticker(m.chat, isUrl(q)[0], m, { packname: global.packname, author: global.author })
await fs.unlinkSync(encmedia)
break
case 'bot': {
m.reply(mess.wait)
let buttons = [
{buttonId: 'ping', buttonText: {displayText: 'Status Bot'}, type: 1}
]
let buttonMessage = {
location: {degreesLatitude: 0, degreesLongtitude: 0, jpegThumbnail: fs.readFileSync('./media/IqbalzzX.jpg') },
caption: `Hello @${sender.split("@")[0]}`,
footerText: '𝐶𝑟𝑒𝑎𝑡𝑒𝑑 𝐵𝑦 𝐹𝑒𝑙𝑖𝑥',
buttons: buttons,
headerType: 4
}
iqbl.sendMessage(m.chat, buttonMessage, { quoted: m })
}
break
case 'delete': case 'del': {
if (!m.quoted) throw false
let { chat, fromMe, id, isBaileys } = m.quoted
if (!isBaileys) throw 'Pesan tersebut bukan dikirim oleh bot!'
iqbl.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: true, id: m.quoted.id, participant: m.quoted.sender } })
}
break
case 'leave': {
if (!isOwner) throw mess.owner
await iqbl.groupLeave(m.chat).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
}
break
case 'toimage': case 'toimg': {
if (!quoted) throw 'Reply Image'
if (!/webp/.test(mime)) throw `balas stiker dengan caption *${prefix + command}*`
m.reply(mess.wait)
let media = await iqbl.downloadAndSaveMediaMessage(quoted)
let ran = await getRandom('.png')
exec(`ffmpeg -i ${media} ${ran}`, (err) => {
fs.unlinkSync(media)
if (err) throw err
let buffer = fs.readFileSync(ran)
iqbl.sendMessage(m.chat, { image: buffer }, { quoted: m })
fs.unlinkSync(ran)
})
}
break
case 'tomp4': case 'tovideo': {
if (!quoted) throw 'Reply Sticker'
if (!/webp/.test(mime)) throw `balas stiker dengan caption *${prefix + command}*`
m.reply(mess.wait)
let media = await iqbl.downloadAndSaveMediaMessage(quoted)
let webpToMp4 = await webp2mp4File(media)
await iqbl.sendMessage(m.chat, { video: { url: webpToMp4.result, caption: 'Convert Webp To Video' } }, { quoted: m })
await fs.unlinkSync(media)
}
break
case 'togif': {
if (!quoted) throw 'Reply Sticker'
if (!/webp/.test(mime)) throw `balas sticker dengan caption *${prefix + command}*`
m.reply(mess.wait)
let media = await iqbl.downloadAndSaveMediaMessage(quoted)
let webpToMp4 = await webp2mp4File(media)
await iqbl.sendMessage(m.chat, { video: { url: webpToMp4.result, caption: 'Convert Webp To Video' }, gifPlayback: true }, { quoted: m })
await fs.unlinkSync(media)
}
break
case 'tourl': {
m.reply(mess.wait)
let media = await iqbl.downloadAndSaveMediaMessage(quoted)
if (/image/.test(mime)) {
let anu = await TelegraPh(media)
m.reply(util.format(anu))
} else if (!/image/.test(mime)) {
let anu = await UploadFileUgu(media)
m.reply(util.format(anu))
}
await fs.unlinkSync(media)
}
break
case 'once': case 'toonce': { //by Iqbalzz
if (!quoted) throw 'Reply Image'
if (/image/.test(mime)) {
anu = await iqbl.downloadAndSaveMediaMessage(quoted)
iqbl.sendMessage(from, {image: {url: anu},viewOnce : true},{quoted:bal})
} else if (/video/.test(mime)) {
anu = await iqbl.downloadAndSaveMediaMessage(quoted)
iqbl.sendMessage(from, {video: {url: anu},viewOnce : true},{quoted:bal})
}
}
break
case 'setcmd':
if (!q) return reply(`Penggunaan : ${command} cmdnya dan tag stickernya`)
var kodenya = bal.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.fileSha256.toString('base64')
addCmd(kodenya, q)
reply("Done")
break
case 'delcmd':
var kodenya = bal.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.fileSha256.toString('base64')
scommand.splice(getCommandPosition(kodenya), 1)
fs.writeFileSync('./database/scommand.json', JSON.stringify(scommand))
reply("Done")
break
case 'listcmd':
let teksnyee = `\`\`\`「 LIST STICKER CMD 」\`\`\``
let cemde = [];
for (let i of scommand) {
cemde.push(i._db)
teksnyee += `\n\n*•> ID :* ${i._db}\n*•> Cmd :* ${i.chats}`
}
reply(teksnyee)
break
case 'tomp3': case 'toaudio': {
if (!/video/.test(mime) && !/audio/.test(mime)) throw `Kirim/Reply Video/Audio Yang Ingin Dijadikan Audio Dengan Caption ${prefix + command}`
if (!quoted) throw `Kirim/Reply Video/Audio Yang Ingin Dijadikan Audio Dengan Caption ${prefix + command}`
m.reply(mess.wait)
let media = await quoted.download()
let { toAudio } = require('./lib/converter')
let audio = await toAudio(media, 'mp4')
iqbl.sendMessage(m.chat, {audio: audio, mimetype: 'audio/mpeg'}, { quoted : m })
}
break
case 'todocument': {
if (/document/.test(mime)) throw `Kirim/Reply Video/Audio Yang Ingin Dijadikan MP3 Dengan Caption ${prefix + command}`
if (!/video/.test(mime) && !/audio/.test(mime)) throw `Kirim/Reply Video/Audio Yang Ingin Dijadikan MP3 Dengan Caption ${prefix + command}`
if (!quoted) throw `Kirim/Reply Video/Audio Yang Ingin Dijadikan MP3 Dengan Caption ${prefix + command}`
m.reply(mess.wait)
let media = await quoted.download()
let { toAudio } = require('./lib/converter')
let audio = await toAudio(media, 'mp4')
iqbl.sendMessage(m.chat, {document: audio, mimetype: 'audio/mpeg', fileName: `Convert By ${iqbl.user.name}.mp3`}, { quoted : m })
}
break
case 'tovn': case 'toptt': {
if (!/video/.test(mime) && !/audio/.test(mime)) throw `Reply Video/Audio Yang Ingin Dijadikan VN Dengan Caption ${prefix + command}`
if (!quoted) throw `Reply Video/Audio Yang Ingin Dijadikan VN Dengan Caption ${prefix + command}`
m.reply(mess.wait)
let media = await quoted.download()
let { toPTT } = require('./lib/converter')
let audio = await toPTT(media, 'mp4')
iqbl.sendMessage(m.chat, {audio: audio, mimetype:'audio/mpeg', ptt:true }, {quoted:m})
}
break
case 'linkwa':
if (!q) return reply(`Example: ${prefix}linkwa hacker`)
mel.linkwa(q)
.then(result => {
let res = '*「 _LINK WA_ 」*\n\n'
for (let i of result) {
res += `*Nama*: *${i.nama}\n*Link*: ${i.link}\n\n`
}
reply(res)
});
break
case 'lirik': {
if(!q) return reply('lagu apa?')
let song = await mel.lirik(q)
sendFileFromUrl(from,song.thumb,song.lirik, bal)
}
break
case 'autosticker':
if (args.length < 1) return reply('Hmmmm')
if (Number(args[0]) === 1) {
if (isAuto) return reply('Udah aktif um')
autosticker.push(from)
fs.writeFileSync('./database/autosticker.json', JSON.stringify(autosticker))
reply('Sukses mengaktifkan fitur autosticker di group ini ✔️')
} else if (Number(args[0]) === 0) {
autosticker.splice(from, 1)
fs.writeFileSync('./database/autosticker.json', JSON.stringify(autosticker))
reply('Sukses menonaktifkan fitur autosticker di group ini ✔️')
} else {
reply('1 untuk mengaktifkan, 0 untuk menonaktifkan')
}
break
case 'gitclone': {
let regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i

if (!args[0]) return m.reply(`Link Nya Mana?\nExample: ${prefix}gitclone https://github.com/Hexagonz/SELF-HX`)
if (!regex.test(args[0])) return m.reply('link salah!')
let [, user, repo] = args[0].match(regex) || []
repo = repo.replace(/.git$/, '')
let url = `https://api.github.com/repos/${user}/${repo}/zipball`
let filename = (await fetch(url, {method: 'HEAD'})).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
m.reply(`Sukses Clone\nTunggu Sebentar, Mengkompres File Ke Zip...`)
iqbl.sendFile(m.chat, url, filename, null, m)
}
break
case 'githubrepo': case 'githubsearch': {
function formatDate(n, locale = 'id') {
let d = new Date(n)
return d.toLocaleDateString(locale, {
weekday: 'long',
day: 'numeric',
month: 'long',
year: 'numeric',
hour: 'numeric',
minute: 'numeric',
second: 'numeric'
})
}
if (!q) return m.reply(`Example: ${prefix + command} Bot Md`)
let res = await fetch(global.API('https://api.github.com', '/search/repositories', {
q: q
}))
if (!res.ok) throw await `${res.status} ${res.statusText}`
let json = await res.json()
if (res.status !== 200) throw json
let str = json.items.map((repo, index) => {
return `
📌 *No* : ${1 + index}. 
👤 *Name* : ${repo.full_name} ${repo.fork ? ' (fork)' : ''}
🖇️ *Link* : ${repo.html_url}
✍️ *Dibuat* : ${formatDate(repo.created_at)}
📒 *Terakhir Update* : ${formatDate(repo.updated_at)}
📝 *Deskripsi* : ${repo.description ? `${repo.description}` : ''}
📥 *Clone* : \`\`\`$ git clone ${repo.clone_url}\`\`\`
👁 *Watch* : ${repo.watchers}   
🍴 *Fork* : ${repo.forks}
⭐ *Star* : ${repo.stargazers_count}
📍 *Issues* : ${repo.open_issues}
`.trim()
}).join('\n\n')
m.reply(str)
}
break
case 'ytmp3': case 'ytaudio': {
if (!q) throw `Example : ${prefix + command} https://youtube.com/watch?v=PtFMh6Tccag%27 128kbps`
let { aiovideodl } = require('./lib/aiovideodl')
let result = await aiovideodl(isUrl(q)[0])
let { url, title, thumbnail, duration, medias } = result
let quality = args[1] ? args[1] : '128kbps'                
let media = medias.filter(v => v.videoAvailable == false && v.audioAvailable == true && v.quality == quality).map(v => v)
if (media[0].formattedSize.split('MB')[0] >= 100.00) return m.reply('File Melebihi Batas'+util.format(media))
iqbl.sendImage(m.chat, thumbnail, `*YOUTUBE MP3*\n\n*•Title : ${title}*\n*•File Size : ${media[0].formattedSize}*\n*•Url : ${url}*\n*•Ext : MP3*\n*•Resolusi : ${args[1] || '128kbps'}*\n\n*_Wait Minute Audio Is Sending_*`, m)
iqbl.sendMessage(m.chat, { audio: { url: media[0].url }, mimetype: 'audio/mp4', fileName: `${title}.mp3` }, { quoted: m })
}
break
case 'ytmp4': case 'ytvideo': {
if (!q) throw `Example : ${prefix + command} https://youtube.com/watch?v=PtFMh6Tccag%27 360p`
let { aiovideodl } = require('./lib/aiovideodl')
let result = await aiovideodl(isUrl(q)[0])
let { url, title, thumbnail, duration, medias } = result
let quality = args[1] ? args[1] : '360p'                
let media = medias.filter(v => v.videoAvailable == true && v.audioAvailable == false && v.quality == quality).map(v => v)
if (media[0].formattedSize.split('MB')[0] >= 100.00) return m.reply('File Melebihi Batas'+util.format(media))
iqbl.sendImage(m.chat, thumbnail, `*YOUTUBE MP4*\n\n*•Title : ${title}*\n*•File Size : ${media[0].formattedSize}*\n*•Url : ${url}*\n*•Ext : MP4*\n*•Resolusi : ${args[1] || '360p'}*\n\n*_Wait Minute Video Is Sending_*`, m)
iqbl.sendMessage(m.chat, { video: { url: media[0].url }, fileName: `${title}.mp4`, mimetype: 'video/mp4' }, { quoted: m })
}
break
case "colongsw": //arif
if (!quoted) throw 'Reply Image'
if (/image/.test(mime)) {
anu = await iqbl.downloadAndSaveMediaMessage(quoted)
iqbl.sendMessage(sender, {image: {url: fs.readFileSync(anu)}}, {caption: q})
reply("Sukses")
fs.unlinkSync(anu)
} else if (/video/.test(mime)) {
anu = await iqbl.downloadAndSaveMediaMessage(quoted)
iqbl.sendMessage(sender, {video: {url: fs.readFileSync(anu)}}, {caption: q})
reply("Sukses")
fs.unlinkSync(anu)
} else {
reply("Reply sw foto / video yg mau dicolong")
}
break
case 'play': {
s = await yts(q)
img = await getBuffer(s.all[0].image)
cpt = `*YOUTUBE PLAY*

📝 Judul : ${s.all[0].title}
🌍 Publikasi : ${s.all[0].ago}
👤 Views : ${s.all[0].views}
📍 Durasi : ${s.all[0].timestamp}
📌 Chanel : ${s.all[0].author.name}
🖇️ Link : ${s.all[0].url}`
const template = proto.Message.fromObject({
templateMessage: proto.TemplateMessage.fromObject({
hydratedTemplate: {
locationMessage: { degreesLatitude: 0, degreesLongtitude: 0, jpegThumbnail: img },
hydratedContentText: cpt,
hydratedFooterText: '𝐶𝑟𝑒𝑎𝑡𝑒𝑑 𝐵𝑦 𝐹𝑒𝑙𝑖𝑥',
hydratedButtons: [{
urlButton: {
displayText: 'View On YouTube',
url: `${s.all[0].url}`
}
}, {
callButton: {
displayText: 'Developer',
phoneNumber: '6281315995628@s.whatsapp.net'
}
}, {
"quickReplyButton": {
"displayText": "🎵 Audio",
"id": `ytmp3 ${s.all[0].url} 128kbps`
},
},{
"quickReplyButton": {
"displayText": "🎥 Video",
"id": `ytmp4 ${s.all[0].url} 360p`
}
}],
}
})
})
var p = generateWAMessageFromContent(from, template, {})
await iqbl.relayMessage(bal.key.remoteJid, p.message, { messageId: p.key.id });
}
break
case 'wikipedia': case 'wiki':
if (!q) return m.reply(' Yang Mau Di Cari Apa? ')
res = await wikiSearch(q).catch(e => {
return m.reply('_[ ! ] Error Hasil Tidak Ditemukan_') 
}) 
result = `*Judul :* ${res[0].judul}
*Wiki :* ${res[0].wiki}`,
sendFileFromUrl(m.chat,res[0].thumb,result,m).catch(e => {
})
break
case 'ig': case 'instagram':
let instagram = require('./plugins/instagram')
instagram(m, q, sendFileFromUrl, prefix, iqbl)
break
case 'take': case 'colong': case 'swm': case 'stickerwm': case 'wm': case 'exif': {
if (!quoted)return textImg(`Example : ${prefix + command} Punya|Felix`)
let { writeExif } = require('./lib/exif')
let media = {}
media.mimetype = mime
media.data = await m.getMsgBuffer(quoted)
let encmedia = await writeExif(media, {packname: q.split("|")[0] ? q.split("|")[0] : global.packname,author: q.split("|")[1] ? q.split("|")[1] : global.author })
iqbl.sendMessage(m.chat, { sticker: { url: encmedia } }, { quoted: bal})
await fs.unlinkSync(encmedia)
}
break
case 'sendbuffer':
try{
await textImg('Tunggu sebentar...')
iqbl.sendFile(m.chat, isUrl(q)[0], '', m)
} catch (err){
await textImg(err)
console.log(err)
}
break
case 'emojimix':
if(!q)return reply(`Example : ${prefix + command} 😎+😙`)
let emo1 = q.split("+")[0]
let emo2 = q.split("+")[1]
fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emo1 ? emo1 : '😎')}_${encodeURIComponent(emo2 ? emo2 : '😙')}`).then(async i =>{
let emojimix = `*Result Of Emojimix*

🌹Locale : ${i.locale}
🌹Title : ${i.results[0].h1_title}
🌹Create : ${i.results[0].created}
🌹Url : ${i.results[0].url}

_Wait Minute Sticker Is Sending_
`.trim()
reply(emojimix)
await iqbl.sendImageAsSticker(m.chat, i.results[0].url, m, { packname: global.packname, author: global.author })
})
break
case 'smeme':
let smeme = require('../plugins/smeme')
smeme(m, iqbl, q)
break
case 'ebinary': {
if (!m.quoted.text && !q) throw `Kirim/reply text dengan caption ${prefix + command}`
let { eBinary } = require('./lib/binary')
let eteks = q ? q : m.quoted && m.quoted.text ? m.quoted.text : m.text
let eb = await eBinary(eteks)
m.reply(eb)
}
break
case 'dbinary': {
if (!m.quoted.text && !q) throw `Kirim/reply text dengan caption ${prefix + command}`
let { dBinary } = require('./lib/binary')
let dteks = q ? q : m.quoted && m.quoted.text ? m.quoted.text : m.text
let db = await dBinary(dteks)
m.reply(db)
}
break
case 'addmsg': {
if (!m.quoted) throw 'Reply Message Yang Ingin Disave Di Database'
if (!q) throw `Example : ${prefix + command} nama file`
let msgs = JSON.parse(fs.readFileSync('./database/database.json'))
if (q.toLowerCase() in msgs) throw `'${q}' telah terdaftar di list pesan`
msgs[q.toLowerCase()] = quoted.fakeObj
fs.writeFileSync('./database/database.json', JSON.stringify(msgs))
m.reply(`Berhasil menambahkan pesan di list pesan sebagai '${q}'

Lihat list Pesan Dengan ${prefix}listmsg`)
}
break
case 'getmsg': {
if (!q) throw `Example : ${prefix + command} file name\n\nLihat list pesan dengan ${prefix}listmsg`
let msgs = JSON.parse(fs.readFileSync('./database/database.json'))
if (!(q.toLowerCase() in msgs)) throw `'${q}' tidak terdaftar di list pesan`
iqbl.copyNForward(m.chat, msgs[q.toLowerCase()], true)
}
break
case 'listmsg': {
let msgs = JSON.parse(fs.readFileSync('./database/database.json'))
let seplit = Object.entries(msgs).map(([nama, isi]) => { return { nama, ...isi } })
let tekse = '「 LIST DATABASE 」\n\n'
for (let i of seplit) {
tekse += `🌹*Name :* ${i.nama}\n🌹*Type :* ${Object.keys(i.message)[0]}\n────────────────────────\n\n`
}
m.reply(tekse)
}
break
case 'delmsg': case 'deletemsg': {
let msgs = JSON.parse(fs.readFileSync('./database/database.json'))
if (!(q.toLowerCase() in msgs)) return m.reply(`'${q}' tidak terdaftar didalam list pesan`)
delete msgs[q.toLowerCase()]
fs.writeFileSync('./database/database.json', JSON.stringify(msgs))
m.reply(`Berhasil menghapus '${q}' dari list pesan`)
}
break
case 'q': case 'quoted': {
if (!m.quoted) return m.reply('Reply Pesannya!!')
let wokwol = await iqbl.serializeM(await m.getQuotedObj())
if (!wokwol.quoted) return m.reply('Pesan Yang anda reply tidak mengandung reply')
await wokwol.quoted.copyNForward(m.chat, true)
}
break
case 'listpc': {
let anu = await store.chats.all().filter(v => v.id.endsWith('.net')).map(v => v.id)
let teksp = `🌹 *LIST PERSONAL CHAT*\n\nTotal Chat : ${anu.length} Chat\n\n`
for (let i of anu) {
let nama = store.messages[i].array[0].pushName
teksp += `⬡ *Nama :* ${nama}\n⬡ *User :* @${i.split('@')[0]}\n⬡ *Chat :* https://wa.me/${i.split('@')[0]}\n\n────────────────────────\n\n`
}
iqbl.sendTextWithMentions(m.chat, teksp, m)
}
break
case 'listgc': {
let anu = await store.chats.all().filter(v => v.id.endsWith('@g.us')).map(v => v.id)
let teksg = `🌹 *LIST GROUP CHAT*\n\nTotal Group : ${anu.length} Group\n\n`
for (let i of anu) {
let metadata = await iqbl.groupMetadata(i)
teksg += `⬡ *Nama :* ${metadata.subject}\n⬡ *Owner :* @${metadata.owner.split('@')[0]}\n⬡ *ID :* ${metadata.id}\n⬡ *Dibuat :* ${moment(metadata.creation * 1000).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss')}\n⬡ *Member :* ${metadata.participants.length}\n\n────────────────────────\n\n`
}
iqbl.sendTextWithMentions(m.chat, teksg, m)
}
break
case 'listonline': case 'liston': {
let id = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : m.chat
let online = [...Object.keys(store.presences[id]), iqbl.user.id]
iqbl.sendText(m.chat, 'List Online:\n\n' + online.map(v => 'â­” @' + v.replace(/@.+/, '')).join`\n`, m, { mentions: online })
}
break
case 'infochat': {
if (!m.quoted) m.reply('Reply Pesan')
let msg = await m.getQuotedObj()
if (!m.quoted.isBaileys) throw 'Pesan tersebut bukan dikirim oleh bot!'
let teksc = ''
for (let i of msg.userReceipt) {
let read = i.readTimestamp
let unread = i.receiptTimestamp
let waktu = read ? read : unread
teksc += `⭔ @${i.userJid.split('@')[0]}\n`
teksc += ` ┗━⭔ *Waktu :* ${moment(waktu * 1000).format('DD/MM/YY HH:mm:ss')} ⭔ *Status :* ${read ? 'Dibaca' : 'Terkirim'}\n\n`
}
iqbl.sendTextWithMentions(m.chat, teksc, m)
}
break
case 'bc': case 'broadcast': case 'bcall': {
if (!isOwner) throw mess.owner
if (!q) throw `Example : ${prefix + command} Felix`
let anu = await store.chats.all().map(v => v.id)
m.reply(`Mengirim Broadcast Ke ${anu.length} Chat, Waktu Selesai ${anu.length * 1.5} detik`)
for (let i of anu) {
await sleep(1500)
let BcBut5Loc = [{
urlButton: {
displayText: 'YouTube',
url: 'https://youtube.com/channel/UCrIvOGs1TRDcKODSH9BYlcg'
}
}, {
callButton: {
displayText: 'Number Owner',
phoneNumber: '+62 813-3378-2061'
}
}, {
quickReplyButton: {
displayText: 'OWNER',
id: 'owner'
}
}, {
quickReplyButton: {
displayText: 'SCRIPT',
id: 'sc'
}  
}, {
quickReplyButton: {
displayText: 'RUNTIME',
id: 'sc'
}
}]
img = fs.readFileSync('./media/IqbalzzX.jpg')
let txt = `「 Broadcast 」\n\n${q}`
send5ButLoc(i, txt, iqbl.user.name, img, BcBut5Loc)
}
m.reply('Sukses Broadcast')
}
break
case 'bcgc': {
if (!isOwner) throw mess.owner
let getGroups = await iqbl.groupFetchAllParticipating()
let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
let anu = groups.map(v => v.id)
cc = await smsg(iqbl, q ? m : m.quoted ? await m.quoted.fakeObj : false || m)
cck = q ? q : cc.q
m.reply(`Mengirim Broadcast Ke ${anu.length} Chat, Waktu Selesai ${anu.length * 1.5} detik`)
for (let i of anu) {
await sleep(1500)
let BcGcBut5Loc = [{
urlButton: {
displayText: 'YouTube',
url: 'https://youtube.com/channel/UCrIvOGs1TRDcKODSH9BYlcg'
}
}, {
callButton: {
displayText: 'Number Owner',
phoneNumber: '+62 813-3378-2061'
}
}, {
quickReplyButton: {
displayText: 'OWNER',
id: 'owner'
}
}, {
quickReplyButton: {
displayText: 'SCRIPT',
id: 'sc'
}  
}, {
quickReplyButton: {
displayText: 'RUNTIME',
id: 'sc'
}
}]
BcGcimg = fs.readFileSync('./media/IqbalzzX.jpg')
let BcGctxt = `*𝘽𝙧𝙤𝙖𝙙𝘾𝙖𝙨𝙩*\n\n ${cck}`
send5ButLoc(i, BcGctxt, iqbl.user.name, BcGcimg, BcGcBut5Loc)
}
m.reply(`Sukses Mengirim Broadcast Ke ${anu.length} Group`)
}
break
case 'umma': case 'ummadl': {
if (!q) throw `Example : ${prefix + command} https://umma.id/channel/video/post/gus-arafat-sumber-kecewa-84464612933698`
let { umma } = require('./lib/scrape2')
let anu = await umma(isUrl(q)[0])
if (anu.type == 'video') {
let buttons = [
{buttonId: `ytmp3 ${anu.media[0]} 128kbps`, buttonText: {displayText: '🎵Audio'}, type: 1},
{buttonId: `ytmp4 ${anu.media[0]} 360p`, buttonText: {displayText: '🎥Video'}, type: 1}
]
let buttonMessage = {
image: { url: anu.author.profilePic },
caption: `
⭔ Title : ${anu.title}
⭔ Author : ${anu.author.name}
⭔ Like : ${anu.like}
⭔ Caption : ${anu.caption}
⭔ Url : ${anu.media[0]}
Untuk Download Media Silahkan Klik salah satu Button dibawah ini atau masukkan command ytmp3/ytmp4 dengan url diatas
`,
footer: iqbl.user.name,
buttons,
headerType: 4
}
iqbl.sendMessage(m.chat, buttonMessage, { quoted: m })
} else if (anu.type == 'image') {
anu.media.map(async (url) => {
iqbl.sendMessage(m.chat, { image: { url }, caption: `⭔ Title : ${anu.title}\n⭔ Author : ${anu.author.name}\n⭔ Like : ${anu.like}\n⭔ Caption : ${anu.caption}` }, { quoted: m })
})
}
}
break
case 'ringtone': {
if (!q) throw `Example : ${prefix + command} black rover`
let { ringtone } = require('./lib/scrape2')
let anu = await ringtone(q)
let result = anu[Math.floor(Math.random() * anu.length)]
iqbl.sendMessage(m.chat, { audio: { url: result.audio }, fileName: result.title+'.mp3', mimetype: 'audio/mpeg' }, { quoted: m })
}
break
case 'bass': case 'blown': case 'deep': case 'earrape': case 'fast': case 'fat': case 'nightcore': case 'reverse': case 'robot': case 'slow': case 'smooth': case 'tupai':
try {
let set
if (/bass/.test(command)) set = '-af equalizer=f=54:width_type=o:width=2:g=20'
if (/blown/.test(command)) set = '-af acrusher=.1:1:64:0:log'
if (/deep/.test(command)) set = '-af atempo=4/4,asetrate=44500*2/3'
if (/earrape/.test(command)) set = '-af volume=12'
if (/fast/.test(command)) set = '-filter:a "atempo=1.63,asetrate=44100"'
if (/fat/.test(command)) set = '-filter:a "atempo=1.6,asetrate=22100"'
if (/nightcore/.test(command)) set = '-filter:a atempo=1.06,asetrate=44100*1.25'
if (/reverse/.test(command)) set = '-filter_complex "areverse"'
if (/robot/.test(command)) set = '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75"'
if (/slow/.test(command)) set = '-filter:a "atempo=0.7,asetrate=44100"'
if (/smooth/.test(command)) set = '-filter:v "minterpolate=\'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120\'"'
if (/tupai/.test(command)) set = '-filter:a "atempo=0.5,asetrate=65100"'
if (/audio/.test(mime)) {
m.reply(mess.wait)
let media = await iqbl.downloadAndSaveMediaMessage(quoted)
let ran = getRandom('.mp3')
exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
fs.unlinkSync(media)
if (err) return m.reply(err)
let buff = fs.readFileSync(ran)
iqbl.sendMessage(m.chat, { audio: buff, mimetype: 'audio/mpeg' }, { quoted : m })
fs.unlinkSync(ran)
})
} else m.reply(`Reply Audio`)
} catch (e) {
m.reply(e)
}
break
case 'iqra': {
oh = `Example : ${prefix + command} 3\n\nIQRA Yang tersedia : 1,2,3,4,5,6`
if (!q) throw oh
yy = await getBuffer(`https://islamic-api-indonesia.herokuapp.com/api/data/pdf/iqra${q}`)
iqbl.sendMessage(m.chat, {document: yy, mimetype: 'application/pdf', fileName: `iqra${q}.pdf`}, {quoted:m}).catch ((err) => m.reply(oh))
}
break
case 'juzamma': {
if (args[0] === 'pdf') {
m.reply(mess.wait)
iqbl.sendMessage(m.chat, {document: {url: 'https://fatiharridho.my.id/database/islam/juz-amma-arab-latin-indonesia.pdf'}, mimetype: 'application/pdf', fileName: 'juz-amma-arab-latin-indonesia.pdf'}, {quoted:m})
} else if (args[0] === 'docx') {
m.reply(mess.wait)
iqbl.sendMessage(m.chat, {document: {url: 'https://fatiharridho.my.id/database/islam/juz-amma-arab-latin-indonesia.docx'}, mimetype: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', fileName: 'juz-amma-arab-latin-indonesia.docx'}, {quoted:m})
} else if (args[0] === 'pptx') {
m.reply(mess.wait)
iqbl.sendMessage(m.chat, {document: {url: 'https://fatiharridho.my.id/database/islam/juz-amma-arab-latin-indonesia.pptx'}, mimetype: 'application/vnd.openxmlformats-officedocument.presentationml.presentation', fileName: 'juz-amma-arab-latin-indonesia.pptx'}, {quoted:m})
} else if (args[0] === 'xlsx') {
m.reply(mess.wait)
iqbl.sendMessage(m.chat, {document: {url: 'https://fatiharridho.my.id/database/islam/juz-amma-arab-latin-indonesia.xlsx'}, mimetype: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', fileName: 'juz-amma-arab-latin-indonesia.xlsx'}, {quoted:m})
} else {
m.reply(`Example : ${prefix + command} pdf & docx & pptx & xlsx`)
}
}
break
case 'hadis': case 'hadist': {
if (!args[0]) throw `Contoh:
${prefix + command} bukhari 1
${prefix + command} abu-daud 1
Pilihan tersedia:
abu-daud
1 - 4590
ahmad
1 - 26363
bukhari
1 - 7008
darimi
1 - 3367
ibu-majah
1 - 4331
nasai
1 - 5662
malik
1 - 1594
muslim
1 - 5362`

if (!args[1]) throw `Hadis yang ke berapa?\n\ncontoh:\n${prefix + command} muslim 1`
try {
let res = await fetchJson(`https://islamic-api-indonesia.herokuapp.com/api/data/json/hadith/${args[0]}`)
let { number, arab, id } = res.find(v => v.number == args[1])
m.reply(`No. ${number}

${arab}

${id}`)
} catch (e) {
m.reply(`Hadis tidak ditemukan !`)
}
}
break
case 'alquran': {
if (!args[0]) throw `Contoh penggunaan:\n${prefix + command} 1 2\n\nmaka hasilnya adalah surah Al-Fatihah ayat 2 beserta audionya, dan ayatnya 1 aja`
if (!args[1]) throw `Contoh penggunaan:\n${prefix + command} 1 2\n\nmaka hasilnya adalah surah Al-Fatihah ayat 2 beserta audionya, dan ayatnya 1 aja`
let res = await fetchJson(`https://islamic-api-indonesia.herokuapp.com/api/data/quran?surah=${args[0]}&ayat=${args[1]}`)
let txt = `*Arab* : ${res.result.data.text.arab}

*English* : ${res.result.data.translation.en}

*Indonesia* : ${res.result.data.translation.id}

( Q.S ${res.result.data.surah.name.transliteration.id} : ${res.result.data.number.inSurah} )`
m.reply(txt)
iqbl.sendMessage(m.chat, {audio: { url: res.result.data.audio.primary }, mimetype: 'audio/mpeg'}, { quoted : m })
}
break
case 'tafsirsurah': {
if (!args[0]) throw `Contoh penggunaan:\n${prefix + command} 1 2\n\nmaka hasilnya adalah tafsir surah Al-Fatihah ayat 2`
if (!args[1]) throw `Contoh penggunaan:\n${prefix + command} 1 2\n\nmaka hasilnya adalah tafsir surah Al-Fatihah ayat 2`
let res = await fetchJson(`https://islamic-api-indonesia.herokuapp.com/api/data/quran?surah=${args[0]}&ayat=${args[1]}`)
let txt = `「 *Tafsir Surah*  」

*Pendek* : ${res.result.data.tafsir.id.short}

*Panjang* : ${res.result.data.tafsir.id.long}

( Q.S ${res.result.data.surah.name.transliteration.id} : ${res.result.data.number.inSurah} )`
m.reply(txt)
}
break
case 'ppcouple': case 'couple': {
m.reply(mess.wait)
let anu = await fetchJson('https://raw.githubusercontent.com/iamriz7/kopel_/main/kopel.json')
let random = anu[Math.floor(Math.random() * anu.length)]
iqbl.sendMessage(m.chat, { image: { url: random.male }, caption: `Nih Kak Yang Cowok` }, { quoted: m })
iqbl.sendMessage(m.chat, { image: { url: random.female }, caption: `Nih Kak Yang Cewek` }, { quoted: m })
}
break
case 'mediafire':
if (args.length < 1) return reply('Link Nya Mana? ')
if(!isUrl(args[0]) && !args[0].includes('mediafire')) return reply(mess.error.api)
let { mediafireDl } = require('./lib/mediafire.js')
let res = await mediafireDl(q)
let result = `*MediaFire Download*

*Nama :* ${res[0].nama}
*Ukuran :* ${res[0].size}

*_Wait Minute File Is Sending_*`
reply(result)
iqbl.sendMessage(from, {document: {url: res[0].link}, mimetype: res[0].mime, fileName: res[0].nama}, {quoted:bal})
break
case 'nomerhoki': case 'nomorhoki': {
if (!Number(q)) throw `Example : ${prefix + command} 6281333782061`
let anu = await primbon.nomer_hoki(Number(q))
if (anu.status == false) return m.reply(anu.message)
iqbl.sendText(m.chat, `🌹 *Nomor HP :* ${anu.message.nomer_hp}\n🌹 *Angka Shuzi :* ${anu.message.angka_shuzi}\n🌹 *Energi Positif :*\n- Kekayaan : ${anu.message.energi_positif.kekayaan}\n- Kesehatan : ${anu.message.energi_positif.kesehatan}\n- Cinta : ${anu.message.energi_positif.cinta}\n- Kestabilan : ${anu.message.energi_positif.kestabilan}\n- Persentase : ${anu.message.energi_positif.persentase}\n🌹 *Energi Negatif :*\n- Perselisihan : ${anu.message.energi_negatif.perselisihan}\n- Kehilangan : ${anu.message.energi_negatif.kehilangan}\n- Malapetaka : ${anu.message.energi_negatif.malapetaka}\n- Kehancuran : ${anu.message.energi_negatif.kehancuran}\n- Persentase : ${anu.message.energi_negatif.persentase}`, m)
}
break
case 'artimimpi': case 'tafsirmimpi': {
if (!q) throw `Example : ${prefix + command} belanja`
let anu = await primbon.tafsir_mimpi(q)
if (anu.status == false) return m.reply(anu.message)
iqbl.sendText(m.chat, `🌹 *Mimpi :* ${anu.message.mimpi}\n🌹 *Arti :* ${anu.message.arti}\n🌹 *Solusi :* ${anu.message.solusi}`, m)
}
break
case 'ramalanjodoh': case 'ramaljodoh': {
if (!q) throw `Example : ${prefix + command} Felix, 7, 7, 2005, Ara, 16, 11, 2004`
let [nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2] = q.split`,`
let anu = await primbon.ramalan_jodoh(nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2)
if (anu.status == false) return m.reply(anu.message)
iqbl.sendText(m.chat, `🌹 *Nama Anda :* ${anu.message.nama_anda.nama}\n🌹 *Lahir Anda :* ${anu.message.nama_anda.tgl_lahir}\n🌹 *Nama Pasangan :* ${anu.message.nama_pasangan.nama}\n🌹 *Lahir Pasangan :* ${anu.message.nama_pasangan.tgl_lahir}\n🌹 *Hasil :* ${anu.message.result}\n🌹 *Catatan :* ${anu.message.catatan}`, m)
}
break
case 'ramalanjodohbali': case 'ramaljodohbali': {
if (!q) throw `Example : ${prefix + command} Felix, 7, 7, 2005, Ara, 16, 11, 2004`
let [nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2] = q.split`,`
let anu = await primbon.ramalan_jodoh_bali(nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2)
if (anu.status == false) return m.reply(anu.message)
iqbl.sendText(m.chat, `🌹 *Nama Anda :* ${anu.message.nama_anda.nama}\n🌹 *Lahir Anda :* ${anu.message.nama_anda.tgl_lahir}\n🌹 *Nama Pasangan :* ${anu.message.nama_pasangan.nama}\n🌹 *Lahir Pasangan :* ${anu.message.nama_pasangan.tgl_lahir}\n🌹 *Hasil :* ${anu.message.result}\n🌹 *Catatan :* ${anu.message.catatan}`, m)
}
break
case 'suamiistri': {
if (!q) throw `Example : ${prefix + command} Felix, 7, 7, 2005, Ara, 16, 11, 2004`
let [nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2] = q.split`,`
let anu = await primbon.suami_istri(nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2)
if (anu.status == false) return m.reply(anu.message)
iqbl.sendText(m.chat, `🌹 *Nama Suami :* ${anu.message.suami.nama}\n🌹 *Lahir Suami :* ${anu.message.suami.tgl_lahir}\n🌹 *Nama Istri :* ${anu.message.istri.nama}\n🌹 *Lahir Istri :* ${anu.message.istri.tgl_lahir}\n🌹 *Hasil :* ${anu.message.result}\n🌹 *Catatan :* ${anu.message.catatan}`, m)
}
break
case 'ramalancinta': case 'ramalcinta': {
if (!q) throw `Example : ${prefix + command} Felix, 7, 7, 2005, Ara, 16, 11, 2004`
let [nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2] = q.split`,`
let anu = await primbon.ramalan_cinta(nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2)
if (anu.status == false) return m.reply(anu.message)
iqbl.sendText(m.chat, `🌹 *Nama Anda :* ${anu.message.nama_anda.nama}\n🌹 *Lahir Anda :* ${anu.message.nama_anda.tgl_lahir}\n🌹 *Nama Pasangan :* ${anu.message.nama_pasangan.nama}\n🌹 *Lahir Pasangan :* ${anu.message.nama_pasangan.tgl_lahir}\n🌹 *Sisi Positif :* ${anu.message.sisi_positif}\n🌹 *Sisi Negatif :* ${anu.message.sisi_negatif}\n🌹 *Catatan :* ${anu.message.catatan}`, m)
}
break
case 'artinama': {
if (!q) throw `Example : ${prefix + command} Felix`
let anu = await primbon.arti_nama(q)
if (anu.status == false) return m.reply(anu.message)
iqbl.sendText(m.chat, `🌹 *Nama :* ${anu.message.nama}\n🌹 *Arti :* ${anu.message.arti}\n🌹 *Catatan :* ${anu.message.catatan}`, m)
}
break
case 'kecocokannama': case 'cocoknama': {
if (!q) throw `Example : ${prefix + command} Felix, 7, 7, 2005`
let [nama, tgl, bln, thn] = q.split`,`
let anu = await primbon.kecocokan_nama(nama, tgl, bln, thn)
if (anu.status == false) return m.reply(anu.message)
iqbl.sendText(m.chat, `🌹 *Nama :* ${anu.message.nama}\n🌹 *Lahir :* ${anu.message.tgl_lahir}\n🌹 *Life Path :* ${anu.message.life_path}\n🌹 *Destiny :* ${anu.message.destiny}\n🌹 *Destiny Desire :* ${anu.message.destiny_desire}\n🌹 *Personality :* ${anu.message.personality}\n🌹 *Persentase :* ${anu.message.persentase_kecocokan}`, m)
}
break
case 'kecocokanpasangan': case 'cocokpasangan': case 'pasangan': {
if (!q) throw `Example : ${prefix + command} Felix|Ara`
let [nama1, nama2] = q.split`|`
let anu = await primbon.kecocokan_nama_pasangan(nama1, nama2)
if (anu.status == false) return m.reply(anu.message)
iqbl.sendImage(m.chat,  anu.message.gambar, `🌹 *Nama Anda :* ${anu.message.nama_anda}\n🌹 *Nama Pasangan :* ${anu.message.nama_pasangan}\n🌹 *Sisi Positif :* ${anu.message.sisi_positif}\n🌹 *Sisi Negatif :* ${anu.message.sisi_negatif}`, m)
}
break
case 'jadianpernikahan': case 'jadiannikah': {
if (!q) throw `Example : ${prefix + command} 6, 12, 2020`
let [tgl, bln, thn] = q.split`,`
let anu = await primbon.tanggal_jadian_pernikahan(tgl, bln, thn)
if (anu.status == false) return m.reply(anu.message)
iqbl.sendText(m.chat, `🌹 *Tanggal Pernikahan :* ${anu.message.tanggal}\n🌹 *karakteristik :* ${anu.message.karakteristik}`, m)
}
break
case 'sifatusaha': {
if (!q)throw `Example : ${prefix+ command} 28, 12, 2021`
let [tgl, bln, thn] = q.split`,`
let anu = await primbon.sifat_usaha_bisnis(tgl, bln, thn)
if (anu.status == false) return m.reply(anu.message)
iqbl.sendText(m.chat, `🌹 *Lahir :* ${anu.message.hari_lahir}\n🌹 *Usaha :* ${anu.message.usaha}`, m)
}
break
case 'rejeki': case 'rezeki': {
if (!q) throw `Example : ${prefix + command} 7, 7, 2005`
let [tgl, bln, thn] = q.split`,`
let anu = await primbon.rejeki_hoki_weton(tgl, bln, thn)
if (anu.status == false) return m.reply(anu.message)
iqbl.sendText(m.chat, `🌹 *Lahir :* ${anu.message.hari_lahir}\n🌹 *Rezeki :* ${anu.message.rejeki}\n🌹 *Catatan :* ${anu.message.catatan}`, m)
}
break
case 'pekerjaan': case 'kerja': {
if (!q) throw `Example : ${prefix + command} 7, 7, 2005`
let [tgl, bln, thn] = q.split`,`
let anu = await primbon.pekerjaan_weton_lahir(tgl, bln, thn)
if (anu.status == false) return m.reply(anu.message)
iqbl.sendText(m.chat, `🌹 *Lahir :* ${anu.message.hari_lahir}\n🌹 *Pekerjaan :* ${anu.message.pekerjaan}\n🌹 *Catatan :* ${anu.message.catatan}`, m)
}
break
case 'ramalannasib': case 'ramalnasib': case 'nasib': {
if (!q) throw `Example : 7, 7, 2005`
let [tgl, bln, thn] = q.split`,`
let anu = await primbon.ramalan_nasib(tgl, bln, thn)
if (anu.status == false) return m.reply(anu.message)
iqbl.sendText(m.chat, `🌹 *Analisa :* ${anu.message.analisa}\n🌹 *Angka Akar :* ${anu.message.angka_akar}\n🌹 *Sifat :* ${anu.message.sifat}\n🌹 *Elemen :* ${anu.message.elemen}\n🌹 *Angka Keberuntungan :* ${anu.message.angka_keberuntungan}`, m)
}
break
case 'potensipenyakit': case 'penyakit': {
if (!q) throw `Example : ${prefix + command} 7, 7, 2005`
let [tgl, bln, thn] = q.split`,`
let anu = await primbon.cek_potensi_penyakit(tgl, bln, thn)
if (anu.status == false) return m.reply(anu.message)
iqbl.sendText(m.chat, `🌹 *Analisa :* ${anu.message.analisa}\n🌹 *Sektor :* ${anu.message.sektor}\n🌹 *Elemen :* ${anu.message.elemen}\n🌹 *Catatan :* ${anu.message.catatan}`, m)
}
break
case 'artitarot': case 'tarot': {
if (!q) throw `Example : ${prefix + command} 7, 7, 2005`
let [tgl, bln, thn] = q.split`,`
let anu = await primbon.arti_kartu_tarot(tgl, bln, thn)
if (anu.status == false) return m.reply(anu.message)
iqbl.sendImage(m.chat, anu.message.image, `🌹 *Lahir :* ${anu.message.tgl_lahir}\n🌹 *Simbol Tarot :* ${anu.message.simbol_tarot}\n🌹 *Arti :* ${anu.message.arti}\n🌹 *Catatan :* ${anu.message.catatan}`, m)
}
break
case 'fengshui': {
if (!q) throw `Example : ${prefix + command} Felix, 1, 2005\n\nNote : ${prefix + command} Nama, gender, tahun lahir\nGender : 1 untuk laki-laki & 2 untuk perempuan`
let [nama, gender, tahun] = q.split`,`
let anu = await primbon.perhitungan_feng_shui(nama, gender, tahun)
if (anu.status == false) return m.reply(anu.message)
iqbl.sendText(m.chat, `🌹 *Nama :* ${anu.message.nama}\n🌹 *Lahir :* ${anu.message.tahun_lahir}\n🌹 *Gender :* ${anu.message.jenis_kelamin}\n🌹 *Angka Kua :* ${anu.message.angka_kua}\n🌹 *Kelompok :* ${anu.message.kelompok}\n🌹 *Karakter :* ${anu.message.karakter}\n🌹 *Sektor Baik :* ${anu.message.sektor_baik}\n🌹 *Sektor Buruk :* ${anu.message.sektor_buruk}`, m)
}
break
case 'haribaik': {
if (!q) throw `Example : ${prefix + command} 7, 7, 2005`
let [tgl, bln, thn] = q.split`,`
let anu = await primbon.petung_hari_baik(tgl, bln, thn)
if (anu.status == false) return m.reply(anu.message)
iqbl.sendText(m.chat, `🌹 *Lahir :* ${anu.message.tgl_lahir}\n🌹 *Kala Tinantang :* ${anu.message.kala_tinantang}\n🌹 *Info :* ${anu.message.info}\n🌹 *Catatan :* ${anu.message.catatan}`, m)
}
break
case 'harisangar': case 'taliwangke': {
if (!q) throw `Example : ${prefix + command} 7, 7, 2005`
let [tgl, bln, thn] = q.split`,`
let anu = await primbon.hari_sangar_taliwangke(tgl, bln, thn)
if (anu.status == false) return m.reply(anu.message)
iqbl.sendText(m.chat, `🌹 *Lahir :* ${anu.message.tgl_lahir}\n🌹 *Hasil :* ${anu.message.result}\n🌹 *Info :* ${anu.message.info}\n🌹 *Catatan :* ${anu.message.catatan}`, m)
}
break
case 'harinaas': case 'harisial': {
if (!q) throw `Example : ${prefix + command} 7, 7, 2005`
let [tgl, bln, thn] = q.split`,`
let anu = await primbon.primbon_hari_naas(tgl, bln, thn)
if (anu.status == false) return m.reply(anu.message)
iqbl.sendText(m.chat, `🌹 *Hari Lahir :* ${anu.message.hari_lahir}\n🌹 *Tanggal Lahir :* ${anu.message.tgl_lahir}\n🌹 *Hari Naas :* ${anu.message.hari_naas}\n🌹 *Info :* ${anu.message.catatan}\n🌹 *Catatan :* ${anu.message.info}`, m)
}
break
case 'nagahari': case 'harinaga': {
if (!q) throw `Example : ${prefix + command} 7, 7, 2005`
let [tgl, bln, thn] = q.split`,`
let anu = await primbon.rahasia_naga_hari(tgl, bln, thn)
if (anu.status == false) return m.reply(anu.message)
iqbl.sendText(m.chat, `🌹 *Hari Lahir :* ${anu.message.hari_lahir}\n🌹 *Tanggal Lahir :* ${anu.message.tgl_lahir}\n🌹 *Arah Naga Hari :* ${anu.message.arah_naga_hari}\n🌹 *Catatan :* ${anu.message.catatan}`, m)
}
break
case 'arahrejeki': case 'arahrezeki': {
if (!q) throw `Example : ${prefix + command} 7, 7, 2005`
let [tgl, bln, thn] = q.split`,`
let anu = await primbon.primbon_arah_rejeki(tgl, bln, thn)
if (anu.status == false) return m.reply(anu.message)
iqbl.sendText(m.chat, `🌹 *Hari Lahir :* ${anu.message.hari_lahir}\n🌹 *tanggal Lahir :* ${anu.message.tgl_lahir}\n🌹 *Arah Rezeki :* ${anu.message.arah_rejeki}\n🌹 *Catatan :* ${anu.message.catatan}`, m)
}
break
case 'peruntungan': {
if (!q) throw `Example : ${prefix + command} Felix, 7, 7, 2005, 2022\n\nNote : ${prefix + command} Nama, tanggal lahir, bulan lahir, tahun lahir, untuk tahun`
let [nama, tgl, bln, thn, untuk] = q.split`,`
let anu = await primbon.ramalan_peruntungan(nama, tgl, bln, thn, untuk)
if (anu.status == false) return m.reply(anu.message)
iqbl.sendText(m.chat, `🌹 *Nama :* ${anu.message.nama}\n🌹 *Lahir :* ${anu.message.tgl_lahir}\n🌹 *Peruntungan Tahun :* ${anu.message.peruntungan_tahun}\n🌹 *Hasil :* ${anu.message.result}\n🌹 *Catatan :* ${anu.message.catatan}`, m)
}
break
case 'weton': case 'wetonjawa': {
if (!q) throw `Example : ${prefix + command} 7, 7, 2005`
let [tgl, bln, thn] = q.split`,`
let anu = await primbon.weton_jawa(tgl, bln, thn)
if (anu.status == false) return m.reply(anu.message)
iqbl.sendText(m.chat, `🌹 *Tanggal :* ${anu.message.tanggal}\n🌹 *Jumlah Neptu :* ${anu.message.jumlah_neptu}\n🌹 *Watak Hari :* ${anu.message.watak_hari}\n🌹 *Naga Hari :* ${anu.message.naga_hari}\n🌹 *Jam Baik :* ${anu.message.jam_baik}\n🌹 *Watak Kelahiran :* ${anu.message.watak_kelahiran}`, m)
}
break
case 'sifat': case 'karakter': {
if (!q) throw `Example : ${prefix + command} Felix, 7, 7, 2005`
let [nama, tgl, bln, thn] = q.split`,`
let anu = await primbon.sifat_karakter_tanggal_lahir(nama, tgl, bln, thn)
if (anu.status == false) return m.reply(anu.message)
iqbl.sendText(m.chat, `🌹 *Nama :* ${anu.message.nama}\n🌹 *Lahir :* ${anu.message.tgl_lahir}\n🌹 *Garis Hidup :* ${anu.message.garis_hidup}`, m)
}
break
case 'keberuntungan': {
if (!q) throw `Example : ${prefix + command} Felix, 7, 7, 2005`
let [nama, tgl, bln, thn] = q.split`,`
let anu = await primbon.potensi_keberuntungan(nama, tgl, bln, thn)
if (anu.status == false) return m.reply(anu.message)
iqbl.sendText(m.chat, `🌹 *Nama :* ${anu.message.nama}\n🌹 *Lahir :* ${anu.message.tgl_lahir}\n🌹 *Hasil :* ${anu.message.result}`, m)
}
break
case 'memancing': {
if (!q) throw `Example : ${prefix + command} 12, 1, 2022`
let [tgl, bln, thn] = q.split`,`
let anu = await primbon.primbon_memancing_ikan(tgl, bln, thn)
if (anu.status == false) return m.reply(anu.message)
iqbl.sendText(m.chat, `🌹 *Tanggal :* ${anu.message.tgl_memancing}\n🌹 *Hasil :* ${anu.message.result}\n🌹 *Catatan :* ${anu.message.catatan}`, m)
}
break
case 'masasubur': {
if (!q) throw `Example : ${prefix + command} 12, 1, 2022, 28\n\nNote : ${prefix + command} hari pertama menstruasi, siklus`
let [tgl, bln, thn, siklus] = q.split`,`
let anu = await primbon.masa_subur(tgl, bln, thn, siklus)
if (anu.status == false) return m.reply(anu.message)
iqbl.sendText(m.chat, `🌹 *Hasil :* ${anu.message.result}\n🌹 *Catatan :* ${anu.message.catatan}`, m)
}
break
case 'zodiak': case 'zodiac': {
if (!q) throw `Example : ${prefix+ command} 7 7 2005`
let zodiak = [
["capricorn", new Date(1970, 0, 1)],
["aquarius", new Date(1970, 0, 20)],
["pisces", new Date(1970, 1, 19)],
["aries", new Date(1970, 2, 21)],
["taurus", new Date(1970, 3, 21)],
["gemini", new Date(1970, 4, 21)],
["cancer", new Date(1970, 5, 22)],
["leo", new Date(1970, 6, 23)],
["virgo", new Date(1970, 7, 23)],
["libra", new Date(1970, 8, 23)],
["scorpio", new Date(1970, 9, 23)],
["sagittarius", new Date(1970, 10, 22)],
["capricorn", new Date(1970, 11, 22)]
].reverse()

function getZodiac(month, day) {
let d = new Date(1970, month - 1, day)
return zodiak.find(([_,_d]) => d >= _d)[0]
}
let date = new Date(q)
if (date == 'Invalid Date') throw date
let d = new Date()
let [tahun, bulan, tanggal] = [d.getFullYear(), d.getMonth() + 1, d.getDate()]
let birth = [date.getFullYear(), date.getMonth() + 1, date.getDate()]

let zodiac = await getZodiac(birth[1], birth[2])
                
let anu = await primbon.zodiak(zodiac)
if (anu.status == false) return m.reply(anu.message)
iqbl.sendText(m.chat, `🌹 *Zodiak :* ${anu.message.zodiak}\n🌹 *Nomor :* ${anu.message.nomor_keberuntungan}\n🌹 *Aroma :* ${anu.message.aroma_keberuntungan}\n🌹 *Planet :* ${anu.message.planet_yang_mengitari}\n🌹 *Bunga :* ${anu.message.bunga_keberuntungan}\n🌹 *Warna :* ${anu.message.warna_keberuntungan}\n🌹 *Batu :* ${anu.message.batu_keberuntungan}\n🌹 *Elemen :* ${anu.message.elemen_keberuntungan}\n🌹 *Pasangan Zodiak :* ${anu.message.pasangan_zodiak}\n🌹 *Catatan :* ${anu.message.catatan}`, m)
}
break
case 'shio': {
if (!q) throw `Example : ${prefix + command} tikus\n\nNote : For Detail https://primbon.com/shio.htm`
let anu = await primbon.shio(q)
if (anu.status == false) return m.reply(anu.message)
iqbl.sendText(m.chat, `🌹 *Hasil :* ${anu.message}`, m)
}
break
case 'soundcloud': case 'scdl': {
if (!q) throw `Example : ${prefix + command} https://m.soundcloud.com/dek-bebeh/bagus-wirata-cinta-segitiga`
let { soundcloud } = require('./lib/index.js')
let anu = await soundcloud(q)
let msg = await iqbl.sendImage(m.chat, anu.thumb, `🌹 Title : ${anu.judul}\n🌹 Url : ${isUrl(q)[0]}`)
iqbl.sendMessage(from, {audio: {url: anu.link}, mimetype: 'audio/mp4', fileName: anu.title+'.mp3'}, {quoted: msg})
}
break
case 'apk': {
if (!q) throw `Example : ${prefix + command} WhatsApp`
let { rexdl } = require('./lib/index')
let anu = await rexdl(q)
let apk = '*Aplikasi Search*\n\n'
for (let i of anu) {
apk += `🌹 Title : ${i.judul}\n🌹 Kategori : ${i.kategori}\n🌹 Upload : ${i.upload_date}\n🌹 Description : ${i.deskripsi}\n🌹 Thumbnail : ${i.thumb}\n🌹 Link : ${i.link}\n\n`
}
sendFileFromUrl(from, anu[0].thumb, apk, m)
}
break
case 'apkdl': {
if (!q) throw `Example : ${prefix + command} https://rexdl.com/android/gbwhatsapp-plus-apk-mod.html/`
if (!isUrl(args[0]) && !args[0].includes('rexdl.com')) throw 'Link Invalid!'
let { rexdldown } = require('./lib/index')
let anu = await rexdldown(q)
m.reply(`*Aplikasi Download*\n\n*🌹 Title : ${anu.judul}*\n*🌹 Update : ${anu.update_date}*\n*🌹 Version : ${anu.version}*\n*🌹 Size : ${anu.size}*\n\n*_Wait Minute Aplikasi Is Sending_*`)
await sleep(3000)
iqbl.sendMessage(from, {document: {url: anu.download[0].url}, mimetype: 'application/vnd.android.package-archive', fileName: anu.judul + '.apk'}, {quoted: bal})
}
break
case 'afk': {
let user = global.db.users[m.sender]
user.afkTime = + new Date
user.afkReason = q
m.reply(`${m.pushName} Telah Afk${q ? ': ' + q : ''}`)
}
break
case 'antilink': {
if (!m.isGroup) throw mess.group
if (!isBotAdmins) throw mess.botAdmin
if (!isAdmins) throw mess.admin
if (args[0] === "on") {
if (db.chats[m.chat].antilink) return m.reply(`Sudah Aktif Kak!`)
db.chats[m.chat].antilink = true
m.reply(`Succes On Antilink`)
} else if (args[0] === "off") {
if (!db.chats[m.chat].antilink) return m.reply(`Sudah Off Kak!`)
db.chats[m.chat].antilink = false
m.reply(`Succes Off Antilink`)
} else {
let buttons = [{ buttonId: 'antilink on', buttonText: { displayText: 'On' }, type: 1 },{ buttonId: 'antilink off', buttonText: { displayText: 'Off' }, type: 1 }]
await iqbl.sendButtonText(m.chat, buttons, `Mode Antilink`, iqbl.user.name, m)
}
}
break
case 'mute': {
if (!m.isGroup) throw mess.group
if (!isBotAdmins) throw mess.botAdmin
if (!isAdmins) throw mess.admin
if (args[0] === "on") {
if (db.chats[m.chat].mute) return m.reply(`Sudah On Kak!`)
db.chats[m.chat].mute = true
m.reply(`${iqbl.user.name} telah di mute di group ini !`)
} else if (args[0] === "off") {
if (!db.chats[m.chat].mute) return m.reply(`Sudah Off Kak!`)
db.chats[m.chat].mute = false
m.reply(`${iqbl.user.name} telah di unmute di group ini !`)
} else {
let buttons = [{ buttonId: 'mute on', buttonText: { displayText: 'On' }, type: 1 },{ buttonId: 'mute off', buttonText: { displayText: 'Off' }, type: 1 }]
await iqbl.sendButtonText(m.chat, buttons, `Mute Bot`, iqbl.user.name, m)
}
}
break
case 'setexif': {
if (!isOwner) throw mess.owner
if (!q) throw `Example : ${prefix + command} packname|author`
global.packname = q.split("|")[0]
global.author = q.split("|")[1]
m.reply(`Succes Mengubah Exif\n\n🌹 Packname : ${global.packname}\n🌹 Author : ${global.author}`)
}
break
case 'react': case 'reaction':
try {
if (!m.quoted) return reply(`Reply Message!`)
if (!args[0]) return reply(`Emote nya kak!!`)
iqbl.relayMessage(m.chat, { reactionMessage: { key: { id: m.quoted.id, remoteJid: m.chat, fromMe: true }, text: `${args[0]}`}}, { messageId: m.id })      
} catch(err) {
reply(err)
}
break
// ========= END ========
default:
if (isCmd && budy.toLowerCase() != undefined) {
if (m.chat.endsWith('broadcast')) return
if (m.isBaileys) return
let msgs = JSON.parse(fs.readFileSync('./database/database.json'))
if (!(budy.toLowerCase() in msgs)) return
iqbl.copyNForward(m.chat, msgs[budy.toLowerCase()], true)
}

}
} catch (e) {
console.log(e)
}
}