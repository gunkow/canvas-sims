import { CollisionSimulation, Particle } from './model';
import './style.css';
import { drawParts } from './display';

var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D;
let width = window.innerWidth;
let height = window.innerHeight;

const sim = new CollisionSimulation({ x: width, y: height });
let parts: Particle[] = [];
// [
//     new Particle({x: spawnX, y: spawnY}, {x: 1, y: 1}, 1, 10),
//     new Particle({x: spawnX+15, y: spawnY+15}, {x: -1, y: -1}, 1, 10)
// ].forEach(p => parts.push(p));
for (let i = 0; i < 8000; i++) {
    const pos = { x: Math.random() * 500, y: Math.random() * 500 };
    const vel = { x: Math.random() * 20 - 5, y: Math.random() * 20 - 5 };
    const mass = Math.random() * 1 + 1;
    const radius = mass ;
    parts.push(new Particle(pos, vel, mass, radius));
}


window.onload = () => {
    let container = document.createElement('div');
    container.id = "container";

    canvas = document.createElement('canvas');
    canvas.id = "game";
    canvas.width = width;
    canvas.height = height;
    canvas.classList.add('red_border');
    container.appendChild(canvas);
    document.body.appendChild(container);
    ctx = canvas.getContext("2d");

    
    drawParts( ctx, canvas, sim, parts);

    setInterval(() => {
        console.log(parts);
    }, 2000);
    
    

 
    
    canvas.onclick = (e) => {
        
    }

    canvas.onmousemove = (e) => {
        
    }
}
