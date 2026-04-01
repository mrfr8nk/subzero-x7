import settings from './settings.js';
import 'dotenv/config';
const _prefixes = process.env.PREFIXES
    ? process.env.PREFIXES.split(',')
    : ['.', '!', '/', '#'];
const config = {
    /* ================= BOT IDENTITY ================= */
    botName: settings.botName || process.env.BOT_NAME || 'SUBZERO-MD',
    botOwner: settings.botOwner || process.env.BOT_OWNER || 'Darrell M',
    ownerNumber: settings.ownerNumber || process.env.OWNER_NUMBER || '263719647303',
    author: settings.author || process.env.AUTHOR || 'Mr Frank OFC',
    packname: settings.packname || process.env.PACKNAME || 'SUBZERO-MD',
    description: settings.description || process.env.DESCRIPTION || 'Multi-device WhatsApp bot',
    version: '7.0.0',
    /* ================= BOT CONFIG ================= */
    prefixes: _prefixes,
    prefix: _prefixes[0],
    commandMode: process.env.COMMAND_MODE || 'public',
    timeZone: process.env.TIMEZONE || 'Africa/Harare',
    /* ================= LINKS ================= */
    channelLink: process.env.CHANNEL_LINK ||
        'https://whatsapp.com/channel/0029Vb7D70MI7BeC0xUnKb05',
    channelInviteKey: process.env.CHANNEL_INVITE_KEY || '0029Vb7D70MI7BeC0xUnKb05',
    repoLink: process.env.REPO_LINK ||
        'https://github.com/mrfr8nk/SUBZERO-MD',
    updateZipUrl: process.env.UPDATE_URL ||
        'https://github.com/mrfr8nk/SUBZERO-V7/archive/refs/heads/main.zip',
    ytChannel: process.env.YT_CHANNEL || 'mrfr4nk',
    /* ================= STATUS SETTINGS ================= */
    autoStatusReact: process.env.AUTO_STATUS_REACT || 'false',
    autoStatusReply: process.env.AUTO_STATUS_REPLY || 'false',
    autoStatusMsg: process.env.AUTO_STATUS_MSG || '❄️ Seen your status!',
    /* ================= SESSION ================= */
    sessionId: settings.sessionId || process.env.SESSION_ID || '',
    pairingNumber: settings.pairingNumber || process.env.PAIRING_NUMBER || '',
    /* ================= PERFORMANCE ================= */
    port: Number(process.env.PORT) || 5000,
    maxStoreMessages: Number(process.env.MAX_STORE_MESSAGES) || 20,
    tempCleanupInterval: Number(process.env.CLEANUP_INTERVAL) || 1 * 60 * 60 * 1000,
    storeWriteInterval: Number(process.env.STORE_WRITE_INTERVAL) || 10000,
    /* ================= API KEYS ================= */
    giphyApiKey: process.env.GIPHY_API_KEY || 'qnl7ssQChTdPjsKta2Ax2LMaGXz303tq',
    removeBgKey: process.env.REMOVEBG_KEY || '',
    /* ================= FOOTER ================= */
    footer: process.env.BOT_FOOTER ||
        '𝙂𝙚𝙣𝙚𝙧𝙖𝙩𝙚𝙙 𝘽𝙮 𝙎𝙪𝙗𝙕𝙚𝙧𝙤',
    /* ================= WARN SYSTEM ================= */
    warnCount: 3,
    /* ================= EXTERNAL APIS ================= */
    APIs: {
        xteam: 'https://api.xteam.xyz',
        dzx: 'https://api.dhamzxploit.my.id',
        lol: 'https://api.lolhuman.xyz',
        violetics: 'https://violetics.pw',
        neoxr: 'https://api.neoxr.my.id',
        zenzapis: 'https://zenzapis.xyz',
        akuari: 'https://api.akuari.my.id',
        akuari2: 'https://apimu.my.id',
        nrtm: 'https://fg-nrtm.ddns.net',
        fgmods: 'https://api-fgmods.ddns.net'
    },
    APIKeys: {
        'https://api.xteam.xyz': 'd90a9e986e18778b',
        'https://api.lolhuman.xyz': '85faf717d0545d14074659ad',
        'https://api.neoxr.my.id': process.env.NEOXR_KEY || 'yourkey',
        'https://violetics.pw': 'beta',
        'https://zenzapis.xyz': process.env.ZENZAPIS_KEY || 'yourkey',
        'https://api-fgmods.ddns.net': 'fg-dylux'
    }
};
export default config;
