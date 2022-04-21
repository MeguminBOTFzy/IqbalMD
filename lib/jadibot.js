//Percobaan

let { default: makeWASocket, useSingleFileAuthState } = require('@adiwajshing/baileys-md')
let { state, saveState } = useSingleFileAuthState('./sessions.json')
let QR = require('qrcode')
let util = require('util')
let pino = require('pino')

exports.jadibot = async (conn, m) => {
     let iqbl = makeWASocket({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: false,
        auth: state,
		browser: ['jadibot']
})

iqbl.ev.on('connection.update', async (update) => {
		const { connection, qr } = update
		if (qr !== undefined) {
			let res = await QR.toDataURL(qr, { scale: 8 })
			let scan = await conn.sendFile(m.key.remoteJid, res, '', 'Scan bang...', m)
			setTimeout(() => {
				conn.sendMessage(m.key.remoteJid, { delete: { remoteJid: m.key.remoteJid, fromMe: true, id: scan.key.id, participant: conn.user.jid }})
			}, 30000)
			if (connection === 'open') {
				conn.reply(m.key.remoteJid, 'Sukses konek\n' + util.format(iqbl.user), m)
			}
		}
	})
}