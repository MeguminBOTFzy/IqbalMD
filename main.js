//Tq DikaArdnt
const { default: makeWASocket, useSingleFileAuthState, generateThumbnail, getDevice, delay, DisconnectReason, fetchLatestBaileysVersion, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, proto } = require("@adiwajshing/baileys")
const { state, saveState } = useSingleFileAuthState('./sessions.json')
const pino = require('pino')
const fs = require('fs')
const chalk = require('chalk')
const fetch = require('node-fetch')
const FileType = require('file-type')
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif')
const setting = JSON.parse(fs.readFileSync('./config.json'))
const { smsg, generateMessageTag, isUrl, getGroupAdmins, getSizeMedia } = require('./lib/functions')

global.api = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '')
global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '')

const store = makeInMemoryStore({ logger: pino().child({ level: 'fatal', stream: 'store' }) })

async function start() {
	let { version, isLatest } = await fetchLatestBaileysVersion()
    const iqbl = makeWASocket({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: true,
        browser: ['Felix Multi Device','Safari','1.0.0'],
        auth: state,
        version
    })
    
store.bind(iqbl.ev)

iqbl.public = false
menusimpel = false
create = 'Created By Felix'
shp = 'ðŸŒ¹'
u = ['', '','',''];

iqbl.multi = true
iqbl.nopref = false
iqbl.single  = false
iqbl.prefa  = '#'

iqbl.ev.on('messages.upsert', async m => {
try {
const bal = m.messages[0]
if (!bal.message) return
bal.message = (Object.keys(bal.message)[0] === 'ephemeralMessage') ? bal.message.ephemeralMessage.message : bal.message
if (bal.key && bal.key.remoteJid === 'status@broadcast') return
m = smsg(iqbl, bal, store)
require('./Iqbal')(iqbl, bal, m, setting, store)
} catch (err) {
console.log(err)
}
})

iqbl.ev.on('group-participants.update', async (anu) => {
        console.log(anu)
        try {
            let metadata = await iqbl.groupMetadata(anu.id)
            let participants = anu.participants
            for (let num of participants) {
                // Get Profile Picture User
                try {
                    ppuser = await iqbl.profilePictureUrl(num, 'image')
                } catch {
                    ppuser = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
                }

                // Get Profile Picture Group
                try {
                    ppgroup = await iqbl.profilePictureUrl(anu.id, 'image')
                } catch {
                    ppgroup = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
                }

                if (anu.action == 'add') {
                    iqbl.sendMessage(anu.id, { image: { url: ppuser }, contextInfo: { mentionedJid: [num] }, caption: `Hi @${num.split('@')[0]}\n\nNama : \nUmur :\nGender : \nAsal :\n\nSemoga Betah` })
                } else if (anu.action == 'remove') {
                    iqbl.sendMessage(anu.id, { image: { url: ppuser }, contextInfo: { mentionedJid: [num] }, caption: `@${num.split("@")[0]} Leaving To ${metadata.subject}` })
                }
            }
        } catch (err) {
            console.log(err)
        }
    })
   
   // Setting
    iqbl.decodeJid = (jid) => {
        if (!jid) return jid
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {}
            return decode.user && decode.server && decode.user + '@' + decode.server || jid
        } else return jid
    }
    
    iqbl.ev.on('contacts.update', update => {
        for (let contact of update) {
            let id = iqbl.decodeJid(contact.id)
            if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
        }
    })

    iqbl.getName = (jid, withoutContact  = false) => {
        id = iqbl.decodeJid(jid)
        withoutContact = iqbl.withoutContact || withoutContact 
        let v
        if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
            v = store.contacts[id] || {}
            if (!(v.name || v.subject)) v = iqbl.groupMetadata(id) || {}
            resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
        })
        else v = id === '0@s.whatsapp.net' ? {
            id,
            name: 'WhatsApp'
        } : id === iqbl.decodeJid(iqbl.user.id) ?
            iqbl.user :
            (store.contacts[id] || {})
            return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
    }
   
   iqbl.setStatus = (status) => {
        iqbl.query({
            tag: 'iq',
            attrs: {
                to: '@s.whatsapp.net',
                type: 'set',
                xmlns: 'status',
            },
            content: [{
                tag: 'status',
                attrs: {},
                content: Buffer.from(status, 'utf-8')
            }]
        })
        return status
    }
   
iqbl.serializeM = (m) => smsg(iqbl, m, store)

iqbl.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update	    
        if (connection === 'close') {
        let reason = lastDisconnect.error ? lastDisconnect?.error?.output.statusCode : 0;
            if (reason === DisconnectReason.badSession) { console.log(`Bad Session File, Please Delete Session and Scan Again`); process.exit(); }
            else if (reason === DisconnectReason.connectionClosed) { console.log("Connection closed, reconnecting...."); start(); }
            else if (reason === DisconnectReason.connectionLost) { console.log("Connection Lost from Server, reconnecting..."); start(); }
            else if (reason === DisconnectReason.connectionReplaced) { console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First"); process.exit(); }
            else if (reason === DisconnectReason.loggedOut) { console.log(`Device Logged Out, Please Delete Session and Scan Again.`); process.exit(); }
            else if (reason === DisconnectReason.restartRequired) { console.log("Restart Required, Restarting..."); start(); }
            else if (reason === DisconnectReason.timedOut) { console.log("Connection TimedOut, Reconnecting..."); start(); }
            else { console.log(`Unknown DisconnectReason: ${reason}|${connection}`) }
        }
        console.log('Connected...', update)
    })

    iqbl.ev.on('creds.update', saveState)

/**
* 
* @param {*} jid 
* @param {*} text 
* @param {*} quoted 
* @param {*} options 
* @returns 
*/
iqbl.sendMessageFromContent = async(mess, obj, opt = {}) => {
let prepare = await generateWAMessageFromContent(typeof mess == 'object'?mess.key.remoteJid: mess, obj, opt)
await iqbl.relayMessage(prepare.key.remoteJid, prepare.message, {
messageId: prepare.key.id
})
return prepare
}

iqbl.sendButtonText = (jid, buttons = [], text, footer, quoted = '', options = {}) => {
let buttonMessage = {
text,
footer,
buttons,
headerType: 2,
...options
}
iqbl.sendMessage(jid, buttonMessage, { quoted, ...options })
}

iqbl.sendText = (jid, text, quoted = '', options) => iqbl.sendMessage(jid, { text: text, ...options }, { quoted })

/**
* 
* @param {*} jid 
* @param {*} path 
* @param {*} caption 
* @param {*} quoted 
* @param {*} options 
* @returns 
*/

iqbl.sendImage = async (jid, path, caption = '', quoted = '', options) => {
let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await fetch(path)).buffer() : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
return await iqbl.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted })
}

/**
* 
* @param {*} jid 
* @param {*} path 
* @param {*} caption 
* @param {*} quoted 
* @param {*} options 
* @returns 
*/

iqbl.sendVideo = async (jid, path, caption = '', quoted = '', gif = false, options) => {
let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await fetch(path)).buffer() : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
return await iqbl.sendMessage(jid, { video: buffer, caption: caption, gifPlayback: gif, ...options }, { quoted })
}

/**
* 
* @param {*} jid 
* @param {*} path 
* @param {*} quoted 
* @param {*} mime 
* @param {*} options 
* @returns 
*/
     
iqbl.sendAudio = async (jid, path, quoted = '', ptt = false, options) => {
let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await fetch(path)).buffer() : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
return await iqbl.sendMessage(jid, { audio: buffer, ptt: ptt, ...options }, { quoted })
}

/**
* 
* @param {*} jid 
* @param {*} text 
* @param {*} quoted 
* @param {*} options 
* @returns 
*/

iqbl.sendTextWithMentions = async (jid, text, quoted, options = {}) => iqbl.sendMessage(jid, { text: text, contextInfo: { mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net') }, ...options }, { quoted })

    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
     
    iqbl.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await fetch(path)).buffer() : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifImg(buff, options)
        } else {
            buffer = await imageToWebp(buff)
        }

        await iqbl.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
        return buffer
    }

    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
     
iqbl.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await getBuffer(path) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifVid(buff, options)
} else {
buffer = await videoToWebp(buff)
}
await iqbl.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
}
	
/**
* 
* @param {*} message 
* @param {*} filename 
* @param {*} attachExtension 
* @returns 
*/
     
iqbl.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
let quoted = message.bal ? message.bal : message
let mime = (message.bal || message).mimetype || ''
let messageType = mime.split('/')[0].replace('application', 'document') ? mime.split('/')[0].replace('application', 'document') : mime.split('/')[0]
const stream = await downloadContentFromMessage(quoted, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
let type = await FileType.fromBuffer(buffer)
trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
// save to file
await fs.writeFileSync(trueFileName, buffer)
return trueFileName
}
    
/**
* 
* @param {*} jid 
* @param {*} path 
* @param {*} quoted 
* @param {*} options 
* @returns 
*/
     
iqbl.sendMedia = async (jid, path, quoted, options = {}) => {
let { ext, mime, data } = await iqbl.getFile(path)
messageType = mime.split("/")[0]
pase = messageType.replace('application', 'document') || messageType
return await iqbl.sendMessage(m.chat, { [`${pase}`]: data, mimetype: mime, ...options }, { quoted })
}

/**
* 
* @param {*} jid 
* @param {*} message 
* @param {*} forceForward 
* @param {*} options 
* @returns 
*/
     
iqbl.copyNForward = async (jid, message, forceForward = false, options = {}) => {
let vtype
if (options.readViewOnce) {
message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
vtype = Object.keys(message.message.viewOnceMessage.message)[0]
delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
delete message.message.viewOnceMessage.message[vtype].viewOnce
message.message = {
...message.message.viewOnceMessage.message
}
}

/**
* 
* @param {*} path 
* @returns 
*/
     
let mtype = Object.keys(message.message)[0]
let content = await generateForwardMessageContent(message, forceForward)
let ctype = Object.keys(content)[0]
let context = {}
if (mtype != "conversation") context = message.message[mtype].contextInfo
content[ctype].contextInfo = {
...context,
...content[ctype].contextInfo
}
const waMessage = await generateWAMessageFromContent(jid, content, options ? {
...content[ctype],
...options,
...(options.contextInfo ? {
contextInfo: {
...content[ctype].contextInfo,
...options.contextInfo
}
} : {})
} : {})
await iqbl.relayMessage(jid, waMessage.message, { messageId:  waMessage.key.id })
return waMessage
}

iqbl.cMod = (jid, copy, text = '', sender = iqbl.user.id, options = {}) => {
        //let copy = message.toJSON()
		let mtype = Object.keys(copy.message)[0]
		let isEphemeral = mtype === 'ephemeralMessage'
        if (isEphemeral) {
            mtype = Object.keys(copy.message.ephemeralMessage.message)[0]
        }
        let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message
		let content = msg[mtype]
        if (typeof content === 'string') msg[mtype] = text || content
		else if (content.caption) content.caption = text || content.caption
		else if (content.text) content.text = text || content.text
		if (typeof content !== 'string') msg[mtype] = {
			...content,
			...options
        }
        if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
		else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
		if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
		else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid
		copy.key.remoteJid = jid
		copy.key.fromMe = sender === iqbl.user.id

        return proto.WebMessageInfo.fromObject(copy)
    }

/**
* 
* @param {*} path 
* @returns 
*/

iqbl.getFile = async (path) => {
let res
let data = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (res = await fetch(path)).buffer() : fs.existsSync(path) ? fs.readFileSync(path) : typeof path === 'string' ? path : Buffer.alloc(0)
if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
let type = await FileType.fromBuffer(data) || {
mime: 'application/octet-stream',
ext: '.bin'
}
return {
res,
...type,
data
}
}

iqbl.sendFile = async (jid, path, fileName = '', caption = '', quoted, options = {}) => {
let type = await iqbl.getFile(path)
let { res, data } = type
if (res && res.status !== 200 || data.length <= 65536) {
try { throw { json: JSON.parse(data.toString()) } }
catch (e) { if (e.json) throw e.json }
}
let opt = { fileName }
if (quoted) opt.quoted = quoted
let mtype = '', mimetype = options.mimetype || type.mime
if (!type || options.asDocument) mtype = 'document'
else if (/webp/.test(type.mime)) mtype = 'sticker'
else if (/image/.test(type.mime)) mtype = 'image'
else if (/video/.test(type.mime)) mtype = 'video'
else if (/audio/.test(type.mime)) mtype = 'audio'
else mtype = 'document'
return await iqbl.sendMessage(jid, { ...opt, ...options, [mtype]: data, mimetype, caption }, { ...opt, ...options })
}

return iqbl
}
    
start()

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})