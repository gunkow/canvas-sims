import { CollisionSimulation, Particle } from './model';
import './style.css';
import { drawParts } from './display';

var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D;
let width = window.innerWidth;
let height = window.innerHeight;
let spawnX = width / 2;
let spawnY = height / 2;

const sim = new CollisionSimulation({ x: width, y: height });
let parts: Particle[] = [];
[
    new Particle({x: spawnX, y: spawnY}, {x: -10, y: -10}, 100, 20),
    new Particle({x: spawnX+50, y: spawnY+50}, {x: -30, y: -20}, 100, 20)
].forEach(p => parts.push(p));

for (let i = 0; i < 5000; i++) {
    const pos = { x: Math.random() * 300, y: Math.random() * 300 };
    const vel = { x: Math.random() * 220 - 5, y: Math.random() * 30 - 55 };
    const mass = Math.random() * 3 + 1;
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

    // setInterval(() => {
    //     console.log(parts);
    // }, 2000);
    
    

 
    
    canvas.onclick = (e) => {
        
    }

    canvas.onmousemove = (e) => {
        
    }
}
