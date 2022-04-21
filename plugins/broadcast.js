let { smsg , sleep } = require('../lib/functions')

let bcgc = async(m , q , conn, isOwner) => {
if(!isOwner)return textImg('Only Owner')
let getGroups = await conn.groupFetchAllParticipating()
let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
let anu = groups.map(v => v.id)
cc = await smsg(conn, q ? m : m.quoted ? await m.quoted.fakeObj : false || m)
cck = q ? q : cc.q
m.reply(`Mengirim Broadcast Ke ${anu.length} Chat, Waktu Selesai ${anu.length * 1.5} detik`)
for (let i of anu) {
await sleep(1500)
await conn.copyNForward(i, conn.cMod(m.chat, cc, /|broadcast|bcgc/i.test(cck) ? cck : `*𝘽𝙧𝙤𝙖𝙙𝘾𝙖𝙨𝙩*\n\n ${cck}`), true).catch(_ => _)
}
m.reply(`Sukses Mengirim Broadcast Ke ${anu.length} Group`)
}

module.exports = bcgc
