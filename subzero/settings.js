import isOwnerOrSudo from '../lib/isOwner.js';
import { getChatbot, getWelcome, getGoodbye, getAntitag } from '../lib/index.js';
import store from '../lib/lightweight_store.js';
import { cleanJid } from '../lib/isOwner.js';

export default {
    command: 'settings',
    aliases: ['config', 'setting'],
    category: 'owner',
    description: 'Show all bot settings with toggle status and usage guide',
    usage: '.settings | .settings group | .settings global',
    async handler(sock, message, args, context) {
        const chatId = context.chatId || message.key.remoteJid;
        const senderId = message.key.participant || message.key.remoteJid;
        try {
            const isOwner = await isOwnerOrSudo(senderId, sock, chatId);
            const isMe = message.key.fromMe;
            if (!isMe && !isOwner) {
                return await sock.sendMessage(chatId, {
                    text: '❌ *Access Denied:* Only Owner/Sudo can view settings.'
                }, { quoted: message });
            }

            const isGroup = chatId.endsWith('@g.us');
            const filter = (args[0] || '').toLowerCase();

            // ── Load global settings ─────────────────────────────────────────
            const [
                botMode,
                autoStatus,
                autoread,
                autotyping,
                pmblocker,
                anticall,
                autoReactionData,
                mentionData,
                stealthMode,
                autoBio,
                antidelete,
                antiedit,
                antiviewonce,
                autodl,
                autoReplyData,
                buttonModeData
            ] = await Promise.all([
                store.getBotMode(),
                store.getSetting('global', 'autoStatus'),
                store.getSetting('global', 'autoread'),
                store.getSetting('global', 'autotyping'),
                store.getSetting('global', 'pmblocker'),
                store.getSetting('global', 'anticall'),
                store.getSetting('global', 'autoReaction'),
                store.getSetting('global', 'mention'),
                store.getSetting('global', 'stealthMode'),
                store.getSetting('global', 'autoBio'),
                store.getSetting('global', 'antidelete'),
                store.getSetting('global', 'antiedit'),
                store.getSetting('global', 'antiviewonce'),
                store.getSetting('global', 'autodownload'),
                store.getSetting('global', 'autoreplies'),
                store.getSetting('global', 'buttonmode')
            ]);

            // cmdreact stored in userGroupData.json
            const fs = (await import('fs')).default;
            let cmdReactEnabled = true;
            try {
                const ugd = JSON.parse(fs.readFileSync('./data/userGroupData.json', 'utf-8'));
                cmdReactEnabled = ugd.autoReaction ?? true;
            } catch { cmdReactEnabled = true; }

            const st = (val) => val ? '✅' : '❌';

            // ── Helper: build a setting row ──────────────────────────────────
            const row = (emoji, name, enabled, cmd, usage) =>
                `┃ ${st(enabled)} ${emoji} *${name}*\n┃    ╰ \`${cmd}\` — ${usage}\n`;

            // ── GLOBAL SETTINGS SECTION ──────────────────────────────────────
            let text = `╭━〔 \`\`\`SUBZERO MD — SETTINGS\`\`\` 〕━┈\n`;
            text += `┃\n`;
            text += `┃ 👤 *User:* @${cleanJid(senderId)}\n`;
            text += `┃ 🤖 *Bot Mode:* ${botMode.toUpperCase()}\n`;
            text += `┃    ╰ \`.mode public|private|inbox\` — change mode\n`;
            text += `┃\n`;

            if (!filter || filter === 'global') {
                text += `┣━〔 *🌐 GLOBAL TOGGLES* 〕━┈\n`;
                text += `┃\n`;
                text += row('📊', 'Auto Status View', autoStatus?.enabled, '.autostatus on|off', 'view & react to statuses');
                text += row('👁️', 'Auto Read', autoread?.enabled, '.autoread on|off', 'auto-read all messages');
                text += row('⌨️', 'Auto Typing', autotyping?.enabled, '.autotyping on|off', 'show typing indicator');
                text += row('🚫', 'PM Blocker', pmblocker?.enabled, '.pmblocker on|off', 'block private messages');
                text += row('📵', 'Anti Call', anticall?.enabled, '.anticall on|off', 'reject incoming calls');
                text += row('⚡', 'Auto React', autoReactionData?.enabled, '.autoreact on|off', 'react to every message');
                text += row('💬', 'Cmd Reactions', cmdReactEnabled, '.creact on|off', 'react on command usage');
                text += row('🕵️', 'Stealth Mode', stealthMode?.enabled, '.stealthmode on|off', 'hide online/read status');
                text += row('📝', 'Auto Bio', autoBio?.enabled, '.autobio on|off', 'auto-rotate profile bio');
                text += row('🔔', 'Mention Alert', mentionData?.enabled, '.mention on|off', 'alert when mentioned');
                text += row('🗑️', 'Anti Delete', antidelete?.enabled, '.antidelete on|off', 'recover deleted messages');
                text += row('✏️', 'Anti Edit', !!(antiedit?.mode && antiedit.mode !== 'off'), '.antiedit on|chat|private|off', 'detect edited messages');
                text += row('👁️', 'Anti View-Once', antiviewonce?.enabled, '.antiviewonce on|off', 'save view-once media');
                text += row('⬇️', 'Auto Download', !!(autodl?.groups || autodl?.private), '.autodl on|off|groups|private', 'auto-save media links');
                text += row('↩️', 'Auto Reply', !!(autoReplyData && Object.keys(autoReplyData || {}).length), '.autoreply on|off', 'keyword auto-responses');
                text += row('🔘', 'Button Mode', buttonModeData?.enabled, '.buttonmode on|off', 'interactive buttons on replies');
                text += `┃\n`;
            }

            // ── GROUP SETTINGS SECTION ───────────────────────────────────────
            if ((!filter || filter === 'group') && isGroup) {
                const groupSettings = await store.getAllSettings(chatId);
                const groupAntilink  = groupSettings.antilink   || { enabled: false };
                const groupBadword   = groupSettings.antibadword || { enabled: false };
                const groupAntispam  = groupSettings.antispam   || { enabled: false };
                const antitag        = await getAntitag(chatId, 'on');
                const chatbotData    = await getChatbot(chatId);
                const welcomeData    = await getWelcome(chatId);
                const goodbyeData    = await getGoodbye(chatId);

                const groupChatbot  = chatbotData === true || chatbotData?.enabled || false;
                const groupWelcome  = !!(welcomeData !== null && welcomeData !== undefined && welcomeData !== false);
                const groupGoodbye  = !!(goodbyeData !== null && goodbyeData !== undefined && goodbyeData !== false);

                text += `┣━〔 *👥 GROUP TOGGLES* 〕━┈\n`;
                text += `┃\n`;
                text += row('🔗', 'Anti Link', groupAntilink.enabled, '.antilink on|off|set', 'block links in group');
                text += row('🤬', 'Anti Bad Word', groupBadword.enabled, '.antibadword on|off', 'filter bad words');
                text += row('🏷️', 'Anti Tag', !!antitag, '.antitag on|off|set', 'block mass tagging');
                text += row('🛡️', 'Anti Spam', groupAntispam.enabled, '.antispam on|off', 'flood/spam protection');
                text += row('🤖', 'Chatbot', groupChatbot, '.chatbot on|off', 'AI chat in group');
                text += row('👋', 'Welcome', groupWelcome, '.welcome on|off|message', 'greet new members');
                text += row('👋', 'Goodbye', groupGoodbye, '.goodbye on|off|message', 'farewell leaving members');
                text += `┃\n`;
            } else if ((!filter || filter === 'group') && !isGroup) {
                text += `┃ 💡 _Run in a group to see group toggles._\n┃\n`;
            }

            text += `╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━┈`;

            await sock.sendMessage(chatId, {
                text,
                mentions: [senderId],
                contextInfo: {
                    externalAdReply: {
                        title: 'SUBZERO MD — SETTINGS',
                        body: 'All toggles & usage guide',
                        thumbnailUrl: 'https://mrfrankk-cdn.hf.space/v6/m1.png',
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            }, { quoted: message });

        } catch (error) {
            console.error('Settings Command Error:', error);
            await sock.sendMessage(chatId, {
                text: '❌ Error: Failed to load settings.'
            }, { quoted: message });
        }
    }
};
