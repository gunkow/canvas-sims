import { Simulation, Particle} from './model';

export function drawParts(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, sim: Simulation, parts: Particle[]) {
    function draw(t: number) {
        requestAnimationFrame(draw);
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawGrid(ctx, canvas, 50)
        ctx.fillStyle = "black";

        parts = sim.step(parts);

        parts.forEach(p => {
            ctx.save();
            ctx.beginPath();
            ctx.arc(p.pos.x, p.pos.y, p.radius, 0, 2 * Math.PI);
            ctx.fill();
            ctx.restore();
        });
        console.log(`t: ${t}`);
    }
    draw(0);   
}

export function drawGrid(ctx: CanvasRenderingContext2D, c: HTMLCanvasElement, gridSpacing: number) {
    ctx.strokeStyle = "lightgray";
    ctx.lineWidth = 1;

    // Vertical lines
    for (let i = gridSpacing; i < c.width; i += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, c.height);
        ctx.stroke();
    }

    // Horizontal lines
    for (let i = gridSpacing; i < c.height; i += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(c.width, i);
        ctx.stroke();
    }
}