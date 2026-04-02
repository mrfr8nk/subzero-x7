import express from 'express';
import { createServer } from 'http';
import config from '../config.js';

const packageInfo = {
    name: config.botName || 'SubZero MD',
    version: config.version || '7.0.0',
    description: config.description || 'WhatsApp Bot',
    author: config.author || 'Mr Frank OFC'
};

const app = express();
const server = createServer(app);
const PORT = config.port || 5000;

app.get('/', (req, res) => {
    const uptimeSeconds = Math.floor(process.uptime());
    const hours = Math.floor(uptimeSeconds / 3600);
    const minutes = Math.floor((uptimeSeconds % 3600) / 60);
    const seconds = uptimeSeconds % 60;
    const uptimeString = `${hours}h ${minutes}m ${seconds}s`;
    
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${packageInfo.name} • MONOCHROME</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            min-height: 100vh;
            background: #000000;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', monospace;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
            position: relative;
            overflow-x: hidden;
        }

        /* Animated gradient background */
        body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 20% 50%, rgba(30,30,30,0.8) 0%, #000000 100%);
            z-index: -2;
        }

        body::after {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(255,255,255,0.03) 2px,
                rgba(255,255,255,0.03) 4px
            );
            pointer-events: none;
            z-index: -1;
            animation: scan 8s linear infinite;
        }

        @keyframes scan {
            0% { transform: translateY(0); }
            100% { transform: translateY(4px); }
        }

        /* Animated noise texture */
        .noise {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
            pointer-events: none;
            z-index: 999;
            animation: shake 0.2s infinite;
        }

        @keyframes shake {
            0%, 100% { transform: translate(0, 0); }
            25% { transform: translate(0.5px, 0.5px); }
            75% { transform: translate(-0.5px, -0.5px); }
        }

        /* Floating particles */
        .particle {
            position: fixed;
            width: 2px;
            height: 2px;
            background: white;
            border-radius: 50%;
            opacity: 0;
            animation: floatParticle 12s infinite linear;
            z-index: 0;
        }

        @keyframes floatParticle {
            0% {
                transform: translateY(100vh) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 0.5;
            }
            90% {
                opacity: 0.5;
            }
            100% {
                transform: translateY(-20vh) translateX(20px);
                opacity: 0;
            }
        }

        /* Main container */
        .container {
            position: relative;
            z-index: 10;
            max-width: 500px;
            width: 100%;
            background: rgba(0, 0, 0, 0.75);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 32px;
            padding: 40px 30px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.05);
            animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* Glowing border animation */
        .container::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
            border-radius: 34px;
            z-index: -1;
            animation: borderGlow 3s ease-in-out infinite;
        }

        @keyframes borderGlow {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
        }

        /* Status badge */
        .status-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.2);
            padding: 6px 16px;
            border-radius: 100px;
            margin-bottom: 24px;
            font-size: 0.75rem;
            font-weight: 600;
            letter-spacing: 1px;
            color: #ffffff;
            text-transform: uppercase;
            backdrop-filter: blur(4px);
        }

        .dot {
            width: 8px;
            height: 8px;
            background: #ffffff;
            border-radius: 50%;
            animation: pulse 1.5s ease-in-out infinite;
            box-shadow: 0 0 8px #ffffff;
        }

        @keyframes pulse {
            0%, 100% {
                opacity: 1;
                transform: scale(1);
            }
            50% {
                opacity: 0.5;
                transform: scale(1.2);
            }
        }

        /* Title */
        h1 {
            font-size: 2.5rem;
            font-weight: 800;
            letter-spacing: -0.02em;
            background: linear-gradient(135deg, #ffffff 0%, #aaaaaa 100%);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            margin-bottom: 12px;
            animation: titleGlow 2s ease-in-out infinite;
        }

        @keyframes titleGlow {
            0%, 100% {
                filter: brightness(1);
            }
            50% {
                filter: brightness(1.2);
            }
        }

        .desc {
            color: rgba(255, 255, 255, 0.6);
            font-size: 0.9rem;
            margin-bottom: 32px;
            font-weight: 400;
        }

        /* Info grid */
        .grid {
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-bottom: 32px;
        }

        .item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 20px;
            background: rgba(0, 0, 0, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 20px;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .item::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent);
            transition: left 0.5s ease;
        }

        .item:hover::before {
            left: 100%;
        }

        .item:hover {
            border-color: rgba(255, 255, 255, 0.2);
            transform: translateX(4px);
        }

        .label {
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: rgba(255, 255, 255, 0.5);
        }

        .val {
            font-weight: 700;
            font-family: 'SF Mono', 'Fira Code', monospace;
            color: #ffffff;
            font-size: 0.95rem;
        }

        /* Stats section */
        .stats {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            margin-bottom: 32px;
        }

        .stat-card {
            background: rgba(0, 0, 0, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 20px;
            padding: 16px;
            text-align: center;
            transition: all 0.3s ease;
        }

        .stat-card:hover {
            border-color: rgba(255, 255, 255, 0.2);
            transform: translateY(-2px);
        }

        .stat-value {
            font-size: 1.5rem;
            font-weight: 800;
            color: #ffffff;
            font-family: monospace;
            margin-bottom: 4px;
        }

        .stat-label {
            font-size: 0.7rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: rgba(255, 255, 255, 0.5);
        }

        /* Progress bar */
        .memory-bar {
            margin-bottom: 32px;
        }

        .memory-header {
            display: flex;
            justify-content: space-between;
            font-size: 0.7rem;
            margin-bottom: 8px;
            color: rgba(255, 255, 255, 0.6);
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .progress-bg {
            background: rgba(255, 255, 255, 0.1);
            height: 4px;
            border-radius: 4px;
            overflow: hidden;
        }

        .progress-fill {
            width: 0%;
            height: 100%;
            background: linear-gradient(90deg, #ffffff, #888888);
            border-radius: 4px;
            animation: fillProgress 2s ease-out forwards;
            position: relative;
            overflow: hidden;
        }

        .progress-fill::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            animation: shimmer 1.5s infinite;
        }

        @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }

        @keyframes fillProgress {
            from { width: 0%; }
            to { width: v-bind(memPercent); }
        }

        /* Footer */
        footer {
            text-align: center;
            font-size: 0.7rem;
            color: rgba(255, 255, 255, 0.3);
            letter-spacing: 0.5px;
            border-top: 1px solid rgba(255, 255, 255, 0.05);
            padding-top: 20px;
            margin-top: 8px;
        }

        /* Loading animation */
        .loading-line {
            width: 100%;
            height: 1px;
            background: linear-gradient(90deg, transparent, #ffffff, transparent);
            animation: loadingMove 2s ease-in-out infinite;
            margin-bottom: 20px;
        }

        @keyframes loadingMove {
            0% { transform: translateX(-100%); opacity: 0; }
            50% { transform: translateX(0%); opacity: 0.5; }
            100% { transform: translateX(100%); opacity: 0; }
        }

        /* Responsive */
        @media (max-width: 480px) {
            .container {
                padding: 30px 20px;
            }
            
            h1 {
                font-size: 1.8rem;
            }
            
            .stats {
                gap: 8px;
            }
            
            .stat-value {
                font-size: 1.2rem;
            }
        }
    </style>
</head>
<body>
    <div class="noise"></div>
    
    <!-- Generate random particles -->
    <script>
        for(let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 12 + 's';
            particle.style.animationDuration = 8 + Math.random() * 8 + 's';
            particle.style.opacity = 0.2 + Math.random() * 0.5;
            document.body.appendChild(particle);
        }
    </script>

    <div class="container">
        <div class="loading-line"></div>
        
        <div style="text-align: center;">
            <div class="status-badge">
                <span class="dot"></span>
                <span>SYSTEM ONLINE</span>
            </div>
            
            <h1>${packageInfo.name}</h1>
            <p class="desc">${packageInfo.description}</p>
        </div>

        <div class="grid">
            <div class="item">
                <span class="label">VERSION</span>
                <span class="val">${packageInfo.version}</span>
            </div>
            <div class="item">
                <span class="label">AUTHOR</span>
                <span class="val">${packageInfo.author}</span>
            </div>
            <div class="item">
                <span class="label">UPTIME</span>
                <span class="val">${uptimeString}</span>
            </div>
        </div>

        <div class="stats">
            <div class="stat-card">
                <div class="stat-value" id="memoryUsage">0%</div>
                <div class="stat-label">Memory Usage</div>
            </div>
            <div class="stat-card">
                <div class="stat-value" id="cpuLoad">0%</div>
                <div class="stat-label">CPU Load</div>
            </div>
        </div>

        <div class="memory-bar">
            <div class="memory-header">
                <span>System Performance</span>
                <span id="memPercent">0%</span>
            </div>
            <div class="progress-bg">
                <div class="progress-fill" id="progressFill" style="width: 0%;"></div>
            </div>
        </div>

        <footer>
            <span>⚡ MONOCHROME EDITION • POWERED BY ${packageInfo.author}</span>
        </footer>
    </div>

    <script>
        // Simulate real-time stats with smooth animations
        function updateStats() {
            const memoryEl = document.getElementById('memoryUsage');
            const cpuEl = document.getElementById('cpuLoad');
            const memPercentEl = document.getElementById('memPercent');
            const progressFill = document.getElementById('progressFill');
            
            let memValue = 0;
            let cpuValue = 0;
            
            function animate() {
                // Target values between 15-45% for realistic look
                const targetMem = 20 + Math.random() * 25;
                const targetCpu = 10 + Math.random() * 35;
                
                // Smooth interpolation
                const interval = setInterval(() => {
                    memValue += (targetMem - memValue) * 0.1;
                    cpuValue += (targetCpu - cpuValue) * 0.1;
                    
                    const memRounded = Math.floor(memValue);
                    const cpuRounded = Math.floor(cpuValue);
                    
                    memoryEl.textContent = memRounded + '%';
                    cpuEl.textContent = cpuRounded + '%';
                    memPercentEl.textContent = memRounded + '%';
                    progressFill.style.width = memRounded + '%';
                    
                    if (Math.abs(memValue - targetMem) < 0.5 && Math.abs(cpuValue - targetCpu) < 0.5) {
                        clearInterval(interval);
                        setTimeout(animate, 4000);
                    }
                }, 50);
            }
            
            animate();
        }
        
        updateStats();
        
        // Add timestamp update every second for dynamic feel
        setInterval(() => {
            const now = new Date();
            const timeString = now.toLocaleTimeString();
            const footer = document.querySelector('footer span');
            if (footer && !footer.innerHTML.includes(timeString)) {
                footer.innerHTML = \`⚡ MONOCHROME EDITION • \${timeString}\`;
            }
        }, 1000);
    </script>
</body>
</html>
    `);
});

server.listen(PORT, () => {
    console.log(`✓ Server running on http://localhost:${PORT}`);
    console.log(`✓ Bot: ${packageInfo.name} v${packageInfo.version}`);
});
