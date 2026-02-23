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

// set update time
document.getElementById('marketTime').textContent = new Date().toLocaleTimeString();

// ---------- CANVAS CHARTS ----------

// S&P 500 area chart
(function() {
    const canvas = document.getElementById('spxChart');
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const pad = { top: 20, right: 15, bottom: 35, left: 55 };

    const data = [
        { time: "9:30", price: 4725.77 },
        { time: "10:00", price: 4730.45 },
        { time: "11:00", price: 4735.23 },
        { time: "12:00", price: 4745.67 },
        { time: "13:00", price: 4750.88 },
        { time: "14:00", price: 4760.12 },
        { time: "15:00", price: 4758.34 },
        { time: "16:00", price: 4760.12 },
    ];

    const prices = data.map(d => d.price);
    const minP = Math.min(...prices) - 10;
    const maxP = Math.max(...prices) + 10;

    function x(i) { return pad.left + (i / (data.length - 1)) * (w - pad.left - pad.right); }
    function y(v) { return pad.top + (1 - (v - minP) / (maxP - minP)) * (h - pad.top - pad.bottom); }

    // grid lines
    ctx.strokeStyle = '#e5e5e5';
    ctx.lineWidth = 1;
    const yTicks = 5;
    for (let i = 0; i <= yTicks; i++) {
        const val = minP + (maxP - minP) * (i / yTicks);
        const yy = y(val);
        ctx.beginPath();
        ctx.setLineDash([3, 3]);
        ctx.moveTo(pad.left, yy);
        ctx.lineTo(w - pad.right, yy);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = '#a3a3a3';
        ctx.font = '11px system-ui, sans-serif';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.fillText(val.toFixed(2), pad.left - 6, yy);
    }

    // x labels
    ctx.fillStyle = '#a3a3a3';
    ctx.font = '11px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    data.forEach((d, i) => {
        ctx.fillText(d.time, x(i), h - pad.bottom + 8);
    });

    // area gradient
    const grad = ctx.createLinearGradient(0, pad.top, 0, h - pad.bottom);
    grad.addColorStop(0, 'rgba(16, 185, 129, 0.30)');
    grad.addColorStop(1, 'rgba(16, 185, 129, 0)');

    ctx.beginPath();
    ctx.moveTo(x(0), y(data[0].price));
    for (let i = 1; i < data.length; i++) {
        const cx1 = (x(i - 1) + x(i)) / 2;
        const cx2 = (x(i - 1) + x(i)) / 2;
        ctx.bezierCurveTo(cx1, y(data[i - 1].price), cx2, y(data[i].price), x(i), y(data[i].price));
    }
    ctx.lineTo(x(data.length - 1), h - pad.bottom);
    ctx.lineTo(x(0), h - pad.bottom);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // line
    ctx.beginPath();
    ctx.moveTo(x(0), y(data[0].price));
    for (let i = 1; i < data.length; i++) {
        const cx1 = (x(i - 1) + x(i)) / 2;
        const cx2 = (x(i - 1) + x(i)) / 2;
        ctx.bezierCurveTo(cx1, y(data[i - 1].price), cx2, y(data[i].price), x(i), y(data[i].price));
    }
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.stroke();
})();

// Volume bar chart
(function() {
    const canvas = document.getElementById('volumeChart');
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const pad = { top: 20, right: 15, bottom: 35, left: 40 };

    const data = [
        { time: "9:30", volume: 45 },
        { time: "10:00", volume: 62 },
        { time: "11:00", volume: 48 },
        { time: "12:00", volume: 38 },
        { time: "13:00", volume: 52 },
        { time: "14:00", volume: 71 },
        { time: "15:00", volume: 85 },
        { time: "16:00", volume: 93 },
    ];

    const maxV = Math.max(...data.map(d => d.volume)) * 1.1;
    const chartW = w - pad.left - pad.right;
    const chartH = h - pad.top - pad.bottom;
    const barW = chartW / data.length * 0.6;
    const gap = chartW / data.length;

    // grid lines
    ctx.strokeStyle = '#e5e5e5';
    ctx.lineWidth = 1;
    const yTicks = 5;
    for (let i = 0; i <= yTicks; i++) {
        const val = (maxV / yTicks) * i;
        const yy = pad.top + chartH - (val / maxV) * chartH;
        ctx.beginPath();
        ctx.setLineDash([3, 3]);
        ctx.moveTo(pad.left, yy);
        ctx.lineTo(w - pad.right, yy);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = '#a3a3a3';
        ctx.font = '11px system-ui, sans-serif';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.fillText(Math.round(val), pad.left - 6, yy);
    }

    // bars
    data.forEach((d, i) => {
        const bx = pad.left + i * gap + (gap - barW) / 2;
        const bh = (d.volume / maxV) * chartH;
        const by = pad.top + chartH - bh;
        const radius = 4;

        ctx.beginPath();
        ctx.moveTo(bx + radius, by);
        ctx.lineTo(bx + barW - radius, by);
        ctx.quadraticCurveTo(bx + barW, by, bx + barW, by + radius);
        ctx.lineTo(bx + barW, pad.top + chartH);
        ctx.lineTo(bx, pad.top + chartH);
        ctx.lineTo(bx, by + radius);
        ctx.quadraticCurveTo(bx, by, bx + radius, by);
        ctx.closePath();
        ctx.fillStyle = '#737373';
        ctx.fill();

        // x labels
        ctx.fillStyle = '#a3a3a3';
        ctx.font = '11px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(d.time, bx + barW / 2, h - pad.bottom + 8);
    });
})();