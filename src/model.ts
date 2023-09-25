type Vector2D = {
    x: number;
    y: number;
};

  
export class Particle {
    pos: Vector2D;
    vel: Vector2D;
    mass: number;
    radius: number;

    constructor(pos: Vector2D, vel: Vector2D, mass: number, radius: number = 1) {
      this.pos = pos;
      this.vel = vel;
      this.mass = mass;
      this.radius = radius;
    }
}
  
export interface Simulation {
    dimensions: Vector2D;
    step(particles: Particle[]): Particle[];
}

export class CollisionSimulation implements Simulation {
    dimensions: Vector2D;
    delta_t: number = 1/70;
    energy_loss: number = 0.5;
    constructor(dimensions: Vector2D) {
        this.dimensions = dimensions;
    }

    step(particles: Particle[]): Particle[] {
        for (let i = 0; i < particles.length; i++) {
            // Check collision with walls
            let particle = particles[i];
            let leftBoundaryCollision = particle.pos.x - particle.radius < 0;
            let rightBoundaryCollision = particle.pos.x + particle.radius > this.dimensions.x;
            let topBoundaryCollision = particle.pos.y - particle.radius < 0;
            let bottomBoundaryCollision = particle.pos.y + particle.radius > this.dimensions.y;
            if (leftBoundaryCollision || rightBoundaryCollision) {
                particle.vel.x = -particle.vel.x * this.energy_loss;
                if (leftBoundaryCollision) {
                    particle.pos.x = particle.radius;
                } else if (rightBoundaryCollision) {
                    particle.pos.x = this.dimensions.x - particle.radius;
                }
            }
            if (topBoundaryCollision || bottomBoundaryCollision) {
                particle.vel.y = -particle.vel.y * this.energy_loss;
                if (topBoundaryCollision) {
                    particle.pos.y = particle.radius;
                } else if (bottomBoundaryCollision) {
                    particle.pos.y = this.dimensions.y - particle.radius;
                }
            }


            // Check collision with other particles
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[j].pos.x - particles[i].pos.x;
                const dy = particles[j].pos.y - particles[i].pos.y;
                const distance = Math.sqrt(dx ** 2 + dy ** 2);
                
                if (distance < particles[i].radius + particles[j].radius) {
                    const normal = { x: dx / distance, y: dy / distance };
                    const relativeVelocity = {
                        x: particles[j].vel.x - particles[i].vel.x,
                        y: particles[j].vel.y - particles[i].vel.y
                    };
                
                    const dotProduct = relativeVelocity.x * normal.x + relativeVelocity.y * normal.y;
                    // If the particles are moving away from each other, don't resolve the collision
                    if (dotProduct > 0) continue;
                
                    // Compute impulse scalar
                    let impulse = (2) * dotProduct; 
                    impulse /= 1 / particles[i].mass + 1 / particles[j].mass;
                    // Apply impulse
                    let impulseVector = {
                        x: normal.x * impulse,
                        y: normal.y * impulse
                    };
                    particles[i].vel.x += impulseVector.x / particles[i].mass;
                    particles[i].vel.y += impulseVector.y / particles[i].mass;
                    particles[j].vel.x -= impulseVector.x / particles[j].mass;
                    particles[j].vel.y -= impulseVector.y / particles[j].mass;
                }
            }

            const gravity = 500;            
            particles[i].pos.x += particles[i].vel.x * this.delta_t;
            particles[i].pos.y += particles[i].vel.y * this.delta_t;
            particles[i].vel.y += gravity * this.delta_t;
        }
        return particles;
    }
}
