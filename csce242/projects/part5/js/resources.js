// hamburger menu toggle
const hamburgerBtn = document.getElementById('hamburgerBtn');
const sidePanel = document.getElementById('sidePanel');
const sidePanelOverlay = document.getElementById('sidePanelOverlay');
const sidePanelClose = document.getElementById('sidePanelClose');

function openMenu() {
    sidePanel.classList.add('open');
    sidePanelOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    sidePanel.classList.remove('open');
    sidePanelOverlay.classList.remove('open');
    document.body.style.overflow = '';
}

hamburgerBtn.addEventListener('click', openMenu);
sidePanelOverlay.addEventListener('click', closeMenu);
sidePanelClose.addEventListener('click', closeMenu);

document.querySelectorAll('.side-panel-link').forEach(link => {
    link.addEventListener('click', closeMenu);
});

// ⬜ CANVAS CHART HELPERS 
function initCanvas(id) {
    const canvas = document.getElementById(id);
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    return { ctx, w: rect.width, h: rect.height };
}

function drawGrid(ctx, pad, w, h, yTicks, minV, maxV, formatLabel) {
    ctx.strokeStyle = '#d4d4d4';
    ctx.lineWidth = 1;
    for (let i = 0; i <= yTicks; i++) {
        const val = minV + (maxV - minV) * (i / yTicks);
        const yy = pad.top + (h - pad.top - pad.bottom) * (1 - (val - minV) / (maxV - minV));
        ctx.beginPath();
        ctx.setLineDash([3, 3]);
        ctx.moveTo(pad.left, yy);
        ctx.lineTo(w - pad.right, yy);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#737373';
        ctx.font = '11px system-ui, sans-serif';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.fillText(formatLabel ? formatLabel(val) : Math.round(val), pad.left - 6, yy);
    }
}

function drawXLabels(ctx, labels, positions, h, pad) {
    ctx.fillStyle = '#737373';
    ctx.font = '11px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    labels.forEach((label, i) => {
        ctx.fillText(label, positions[i], h - pad.bottom + 8);
    });
}

function roundedBar(ctx, x, y, w, h, r) {
    if (h < r * 2) r = h / 2;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h);
    ctx.lineTo(x, y + h);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
}

// 📊📈 M&A ACTIVITY CHART (bars + line) 
(function() {
    const { ctx, w, h } = initCanvas('maChart');
    const pad = { top: 20, right: 50, bottom: 40, left: 45 };
    const data = [
        { month: "Aug", deals: 45, value: 125 },
        { month: "Sep", deals: 52, value: 142 },
        { month: "Oct", deals: 48, value: 138 },
        { month: "Nov", deals: 61, value: 168 },
        { month: "Dec", deals: 58, value: 175 },
        { month: "Jan", deals: 67, value: 195 },
    ];

    const maxVal = 200;
    const maxDeals = 70;
    const chartW = w - pad.left - pad.right;
    const chartH = h - pad.top - pad.bottom;
    const gap = chartW / data.length;
    const barW = gap * 0.5;

    drawGrid(ctx, pad, w, h, 4, 0, maxVal);

    // right axis labels (deals)
    for (let i = 0; i <= 4; i++) {
        const val = (maxDeals / 4) * i;
        const yy = pad.top + chartH - (val / maxDeals) * chartH;
        ctx.fillStyle = '#737373';
        ctx.font = '11px system-ui, sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(Math.round(val), w - pad.right + 6, yy);
    }

    // bars
    data.forEach((d, i) => {
        const bx = pad.left + i * gap + (gap - barW) / 2;
        const bh = (d.value / maxVal) * chartH;
        const by = pad.top + chartH - bh;
        roundedBar(ctx, bx, by, barW, bh, 4);
        ctx.fillStyle = '#525252';
        ctx.fill();
    });

    // line (deals)
    ctx.beginPath();
    data.forEach((d, i) => {
        const lx = pad.left + i * gap + gap / 2;
        const ly = pad.top + chartH - (d.deals / maxDeals) * chartH;
        if (i === 0) ctx.moveTo(lx, ly);
        else ctx.lineTo(lx, ly);
    });
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.stroke();

    // dots on line
    data.forEach((d, i) => {
        const lx = pad.left + i * gap + gap / 2;
        const ly = pad.top + chartH - (d.deals / maxDeals) * chartH;
        ctx.beginPath();
        ctx.arc(lx, ly, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#10b981';
        ctx.fill();
    });

    // x labels
    const positions = data.map((_, i) => pad.left + i * gap + gap / 2);
    drawXLabels(ctx, data.map(d => d.month), positions, h, pad);
})();

// 📊 PE DEPLOYMENT (horizontal bars) 
(function() {
    const { ctx, w, h } = initCanvas('peChart');
    const pad = { top: 15, right: 20, bottom: 20, left: 80 };
    const data = [
        { sector: "Tech", amount: 28.5 },
        { sector: "Healthcare", amount: 22.3 },
        { sector: "Financials", amount: 18.7 },
        { sector: "Industrials", amount: 15.2 },
        { sector: "Consumer", amount: 12.8 },
        { sector: "Energy", amount: 9.4 },
    ];

    const maxVal = 30;
    const chartW = w - pad.left - pad.right;
    const chartH = h - pad.top - pad.bottom;
    const barH = chartH / data.length * 0.6;
    const gap = chartH / data.length;

    // grid
    ctx.strokeStyle = '#d4d4d4';
    for (let i = 0; i <= 5; i++) {
        const val = (maxVal / 5) * i;
        const xx = pad.left + (val / maxVal) * chartW;
        ctx.beginPath();
        ctx.setLineDash([3, 3]);
        ctx.moveTo(xx, pad.top);
        ctx.lineTo(xx, h - pad.bottom);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#737373';
        ctx.font = '11px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(Math.round(val), xx, h - pad.bottom + 4);
    }

    // bars + labels
    data.forEach((d, i) => {
        const by = pad.top + i * gap + (gap - barH) / 2;
        const bw = (d.amount / maxVal) * chartW;

        // rounded right end
        const r = 4;
        ctx.beginPath();
        ctx.moveTo(pad.left, by);
        ctx.lineTo(pad.left + bw - r, by);
        ctx.quadraticCurveTo(pad.left + bw, by, pad.left + bw, by + r);
        ctx.lineTo(pad.left + bw, by + barH - r);
        ctx.quadraticCurveTo(pad.left + bw, by + barH, pad.left + bw - r, by + barH);
        ctx.lineTo(pad.left, by + barH);
        ctx.closePath();
        ctx.fillStyle = '#525252';
        ctx.fill();

        // label
        ctx.fillStyle = '#737373';
        ctx.font = '11px system-ui, sans-serif';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.fillText(d.sector, pad.left - 8, by + barH / 2);
    });
})();

// 📈 HEDGE FUND SCATTER CHART 
(function() {
    const { ctx, w, h } = initCanvas('hedgeChart');
    const pad = { top: 20, right: 20, bottom: 40, left: 45 };
    const data = [
        { strategy: "L/S Equity", ytd: 8.5, aum: 245 },
        { strategy: "Event Driven", ytd: 6.2, aum: 178 },
        { strategy: "Macro", ytd: 12.3, aum: 156 },
        { strategy: "Relative Value", ytd: 4.8, aum: 134 },
        { strategy: "Multi-Strategy", ytd: 9.7, aum: 289 },
    ];

    const minAum = 100, maxAum = 320;
    const minYtd = 2, maxYtd = 14;
    const chartW = w - pad.left - pad.right;
    const chartH = h - pad.top - pad.bottom;

    function xPos(v) { return pad.left + ((v - minAum) / (maxAum - minAum)) * chartW; }
    function yPos(v) { return pad.top + (1 - (v - minYtd) / (maxYtd - minYtd)) * chartH; }

    drawGrid(ctx, pad, w, h, 4, minYtd, maxYtd, v => v.toFixed(0));

    // x-axis labels
    for (let i = 0; i <= 4; i++) {
        const val = minAum + (maxAum - minAum) * (i / 4);
        ctx.fillStyle = '#737373';
        ctx.font = '11px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(Math.round(val), xPos(val), h - pad.bottom + 8);
    }

    // axis labels
    ctx.fillStyle = '#a3a3a3';
    ctx.font = '10px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('AUM ($B)', w / 2, h - 4);

    // dots
    data.forEach(d => {
        const cx = xPos(d.aum);
        const cy = yPos(d.ytd);
        ctx.beginPath();
        ctx.arc(cx, cy, 8, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(82, 82, 82, 0.7)';
        ctx.fill();
        ctx.strokeStyle = '#525252';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // label
        ctx.fillStyle = '#525252';
        ctx.font = '10px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText(d.strategy, cx, cy - 12);
    });
})();

// 📊 BOND ISSUANCE (grouped bars) 
(function() {
    const { ctx, w, h } = initCanvas('bondChart');
    const pad = { top: 20, right: 20, bottom: 55, left: 45 };
    const data = [
        { type: "IG Corp", q1: 245, q2: 268, q3: 285, q4: 312 },
        { type: "HY Corp", q1: 82, q2: 95, q3: 88, q4: 102 },
        { type: "Muni", q1: 115, q2: 128, q3: 135, q4: 142 },
        { type: "Sov", q1: 156, q2: 178, q3: 192, q4: 205 },
    ];

    const maxVal = 350;
    const chartW = w - pad.left - pad.right;
    const chartH = h - pad.top - pad.bottom;
    const groupGap = chartW / data.length;
    const barCount = 4;
    const barW = groupGap * 0.7 / barCount;
    const colors = ['#525252', '#737373', '#a3a3a3', '#d4d4d4'];
    const qLabels = ['Q1', 'Q2', 'Q3', 'Q4'];

    drawGrid(ctx, pad, w, h, 5, 0, maxVal);

    data.forEach((d, i) => {
        const groupX = pad.left + i * groupGap;
        const startX = groupX + (groupGap - barCount * barW) / 2;
        const quarters = [d.q1, d.q2, d.q3, d.q4];

        quarters.forEach((val, q) => {
            const bx = startX + q * barW;
            const bh = (val / maxVal) * chartH;
            const by = pad.top + chartH - bh;
            roundedBar(ctx, bx, by, barW - 2, bh, 3);
            ctx.fillStyle = colors[q];
            ctx.fill();
        });

        // label
        ctx.fillStyle = '#737373';
        ctx.font = '11px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(d.type, groupX + groupGap / 2, h - pad.bottom + 8);
    });

    // legend
    const legendY = h - 12;
    const legendStartX = w / 2 - 100;
    qLabels.forEach((label, i) => {
        const lx = legendStartX + i * 55;
        ctx.fillStyle = colors[i];
        ctx.fillRect(lx, legendY - 6, 12, 12);
        ctx.fillStyle = '#737373';
        ctx.font = '11px system-ui, sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, lx + 16, legendY);
    });
})();

// 🥧 ASSET ALLOCATION PIE CHART
(function() {
    const { ctx, w, h } = initCanvas('allocChart');
    const data = [
        { asset: "Equities", allocation: 42 },
        { asset: "Fixed Income", allocation: 28 },
        { asset: "Alternatives", allocation: 15 },
        { asset: "Real Estate", allocation: 10 },
        { asset: "Cash", allocation: 5 },
    ];
    const colors = ['#525252', '#737373', '#a3a3a3', '#d4d4d4', '#e5e5e5'];
    const total = data.reduce((s, d) => s + d.allocation, 0);
    const cx = w * 0.4;
    const cy = h * 0.45;
    const radius = Math.min(cx - 20, cy - 20, 80);

    let startAngle = -Math.PI / 2;
    data.forEach((d, i) => {
        const sweep = (d.allocation / total) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, radius, startAngle, startAngle + sweep);
        ctx.closePath();
        ctx.fillStyle = colors[i];
        ctx.fill();

        // label on slice
        const mid = startAngle + sweep / 2;
        const lx = cx + Math.cos(mid) * (radius * 0.65);
        const ly = cy + Math.sin(mid) * (radius * 0.65);
        if (d.allocation >= 10) {
            ctx.fillStyle = i < 2 ? '#fff' : '#525252';
            ctx.font = 'bold 11px system-ui, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(d.allocation + '%', lx, ly);
        }

        startAngle += sweep;
    });

    // legend
    const legX = w * 0.7;
    data.forEach((d, i) => {
        const ly = 30 + i * 22;
        ctx.fillStyle = colors[i];
        ctx.fillRect(legX, ly - 5, 12, 12);
        ctx.fillStyle = '#737373';
        ctx.font = '11px system-ui, sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(d.asset + ' ' + d.allocation + '%', legX + 18, ly + 1);
    });
})();

// 🏡 REAL ESTATE TRANSACTIONS (bars + line) 
(function() {
    const { ctx, w, h } = initCanvas('reChart');
    const pad = { top: 20, right: 50, bottom: 40, left: 45 };
    const data = [
        { type: "Office", volume: 45.2, avgCap: 6.8 },
        { type: "Retail", volume: 32.8, avgCap: 7.2 },
        { type: "Industrial", volume: 68.5, avgCap: 5.4 },
        { type: "Multifamily", volume: 52.3, avgCap: 5.9 },
        { type: "Hotel", volume: 18.7, avgCap: 8.1 },
    ];

    const maxVol = 75;
    const minCap = 4, maxCap = 9;
    const chartW = w - pad.left - pad.right;
    const chartH = h - pad.top - pad.bottom;
    const gap = chartW / data.length;
    const barW = gap * 0.5;

    drawGrid(ctx, pad, w, h, 4, 0, maxVol);

    // right-axis (cap rate)
    for (let i = 0; i <= 4; i++) {
        const val = minCap + (maxCap - minCap) * (i / 4);
        const yy = pad.top + chartH - ((val - minCap) / (maxCap - minCap)) * chartH;
        ctx.fillStyle = '#737373';
        ctx.font = '11px system-ui, sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(val.toFixed(1), w - pad.right + 6, yy);
    }

    // bars
    data.forEach((d, i) => {
        const bx = pad.left + i * gap + (gap - barW) / 2;
        const bh = (d.volume / maxVol) * chartH;
        const by = pad.top + chartH - bh;
        roundedBar(ctx, bx, by, barW, bh, 4);
        ctx.fillStyle = '#737373';
        ctx.fill();
    });

    // line (cap rate)
    ctx.beginPath();
    data.forEach((d, i) => {
        const lx = pad.left + i * gap + gap / 2;
        const ly = pad.top + chartH - ((d.avgCap - minCap) / (maxCap - minCap)) * chartH;
        if (i === 0) ctx.moveTo(lx, ly);
        else ctx.lineTo(lx, ly);
    });
    ctx.strokeStyle = '#525252';
    ctx.lineWidth = 2;
    ctx.stroke();

    data.forEach((d, i) => {
        const lx = pad.left + i * gap + gap / 2;
        const ly = pad.top + chartH - ((d.avgCap - minCap) / (maxCap - minCap)) * chartH;
        ctx.beginPath();
        ctx.arc(lx, ly, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#525252';
        ctx.fill();
    });

    const positions = data.map((_, i) => pad.left + i * gap + gap / 2);
    drawXLabels(ctx, data.map(d => d.type), positions, h, pad);
})();

// CREDIT SPREADS (dual area) 
(function() {
    const { ctx, w, h } = initCanvas('creditChart');
    const pad = { top: 20, right: 20, bottom: 55, left: 45 };
    const data = [
        { date: "Jan 15", ig: 95, hy: 345 },
        { date: "Jan 18", ig: 92, hy: 338 },
        { date: "Jan 22", ig: 88, hy: 325 },
        { date: "Jan 25", ig: 85, hy: 318 },
        { date: "Jan 29", ig: 82, hy: 308 },
    ];

    const maxVal = 380;
    const chartH = h - pad.top - pad.bottom;

    drawGrid(ctx, pad, w, h, 5, 0, maxVal);

    function xPos(i) { return pad.left + (i / (data.length - 1)) * (w - pad.left - pad.right); }
    function yPos(v) { return pad.top + (1 - v / maxVal) * chartH; }

    // HY area (red)
    const gradHY = ctx.createLinearGradient(0, pad.top, 0, h - pad.bottom);
    gradHY.addColorStop(0, 'rgba(239, 68, 68, 0.4)');
    gradHY.addColorStop(1, 'rgba(239, 68, 68, 0)');
    ctx.beginPath();
    data.forEach((d, i) => { i === 0 ? ctx.moveTo(xPos(i), yPos(d.hy)) : ctx.lineTo(xPos(i), yPos(d.hy)); });
    ctx.lineTo(xPos(data.length - 1), h - pad.bottom);
    ctx.lineTo(xPos(0), h - pad.bottom);
    ctx.closePath();
    ctx.fillStyle = gradHY;
    ctx.fill();
    ctx.beginPath();
    data.forEach((d, i) => { i === 0 ? ctx.moveTo(xPos(i), yPos(d.hy)) : ctx.lineTo(xPos(i), yPos(d.hy)); });
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.stroke();

    // IG area (green)
    const gradIG = ctx.createLinearGradient(0, pad.top, 0, h - pad.bottom);
    gradIG.addColorStop(0, 'rgba(16, 185, 129, 0.4)');
    gradIG.addColorStop(1, 'rgba(16, 185, 129, 0)');
    ctx.beginPath();
    data.forEach((d, i) => { i === 0 ? ctx.moveTo(xPos(i), yPos(d.ig)) : ctx.lineTo(xPos(i), yPos(d.ig)); });
    ctx.lineTo(xPos(data.length - 1), h - pad.bottom);
    ctx.lineTo(xPos(0), h - pad.bottom);
    ctx.closePath();
    ctx.fillStyle = gradIG;
    ctx.fill();
    ctx.beginPath();
    data.forEach((d, i) => { i === 0 ? ctx.moveTo(xPos(i), yPos(d.ig)) : ctx.lineTo(xPos(i), yPos(d.ig)); });
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.stroke();

    // x labels
    const positions = data.map((_, i) => xPos(i));
    drawXLabels(ctx, data.map(d => d.date), positions, h, pad);

    // legend
    const legendY = h - 12;
    [{label:'IG Corp', color:'#10b981'}, {label:'HY Corp', color:'#ef4444'}].forEach((item, i) => {
        const lx = w / 2 - 60 + i * 100;
        ctx.fillStyle = item.color;
        ctx.fillRect(lx, legendY - 6, 12, 12);
        ctx.fillStyle = '#737373';
        ctx.font = '11px system-ui, sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(item.label, lx + 16, legendY);
    });
})();