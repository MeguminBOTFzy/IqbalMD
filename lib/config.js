const fs = require('fs')
const chalk = require('chalk')

// Website Api
global.APIs = {
IqbalzzX: 'https://iqbal-chan.herokuapp.com',
ameliacanz: 'https://ameliacanz.herokuapp.com',
anto: 'https://hardianto.xyz',
}

// Apikey Website Api
global.APIKeys = {
'https://iqbal-chan.herokuapp.com': 'Iqbalz',
'https://ameliacanz.herokuapp.com': 'Iqbalzz',
'https://hardianto.xyz': 'hardianto',
}

// Other
global.packname = 'Punya'
global.author = 'IqbalzzXπΉ'
global.premium = ['447940423520']
global.sp = 'β­'
global.mess = {
    admin: 'Fitur Khusus Admin Group!',
    botAdmin: 'Bot Harus Menjadi Admin Terlebih Dahulu!',
    owner: 'Fitur Khusus Owner Bot',
    group: 'Fitur Digunakan Hanya Untuk Group!',
    private: 'Fitur Digunakan Hanya Untuk Private Chat!',
	bot: 'Fitur Khusus Pengguna Nomor Bot',
    wait: 'π© π«πππ π°π π·ππππππ, π·πππππ πΎπππ π¨ π΄πππππ',
    endLimit: 'Limit Harian Anda Telah Habis, Limit Akan Direset Setiap Jam 12',
	lockCmd: 'Fitur Tidak Diaktifkan Oleh Owner!',
	example1: 'Selamat Datang @user Di Group @subject Jangan Lupa Baca Rules @desc\n\nNote :\n1. @user (Mention User Join)\n2. @bio (Get Bio User Join)\n3. @tanggal (Date Now)\n4. @desc (Get Description Group)\n5. @subject (Group Name)'
}
global.limitawal = {
    premium: "Infinity",
    free: 100
}