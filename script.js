const G = 6.674e-11; // Gravitational constant

function calculateGravity() {
    let mass1 = parseFloat(document.getElementById("mass1").value);
    let mass2 = parseFloat(document.getElementById("mass2").value);

    let pos1 = {
        x: parseFloat(document.getElementById("pos1x").value),
        y: parseFloat(document.getElementById("pos1y").value),
        z: parseFloat(document.getElementById("pos1z").value),
    };

    let pos2 = {
        x: parseFloat(document.getElementById("pos2x").value),
        y: parseFloat(document.getElementById("pos2y").value),
        z: parseFloat(document.getElementById("pos2z").value),
    };

    let force = computeGravity(mass1, mass2, pos1, pos2);
    
    document.getElementById("result").innerText = 
        `Gravitational Force: (${force.x.toExponential(4)}, ${force.y.toExponential(4)}, ${force.z.toExponential(4)}) N`;
}

function computeGravity(m1, m2, p1, p2) {
    let dx = p2.x - p1.x;
    let dy = p2.y - p1.y;
    let dz = p2.z - p1.z;
    let r = Math.sqrt(dx * dx + dy * dy + dz * dz);

    if (r === 0) return { x: 0, y: 0, z: 0 }; // Prevent division by zero

    let forceMagnitude = (G * m1 * m2) / (r * r);
    return {
        x: forceMagnitude * (dx / r),
        y: forceMagnitude * (dy / r),
        z: forceMagnitude * (dz / r),
    };
}

function startSimulation() {
    let canvas = document.getElementById("simulationCanvas");
    let ctx = canvas.getContext("2d");

    let mass1 = parseFloat(document.getElementById("mass1").value);
    let mass2 = parseFloat(document.getElementById("mass2").value);

    let pos1 = {
        x: parseFloat(document.getElementById("pos1x").value),
        y: parseFloat(document.getElementById("pos1y").value),
        z: parseFloat(document.getElementById("pos1z").value),
    };

    let pos2 = {
        x: parseFloat(document.getElementById("pos2x").value),
        y: parseFloat(document.getElementById("pos2y").value),
        z: parseFloat(document.getElementById("pos2z").value),
    };

    let vel1 = { x: 0, y: 0, z: 0 };
    let vel2 = { x: 0, y: 0, z: 0 };

    function updateSimulation() {
        let force = computeGravity(mass1, mass2, pos1, pos2);

        let acc1 = { x: force.x / mass1, y: force.y / mass1, z: force.z / mass1 };
        let acc2 = { x: -force.x / mass2, y: -force.y / mass2, z: -force.z / mass2 };

        vel1.x += acc1.x;
        vel1.y += acc1.y;
        vel1.z += acc1.z;

        vel2.x += acc2.x;
        vel2.y += acc2.y;
        vel2.z += acc2.z;

        pos1.x += vel1.x;
        pos1.y += vel1.y;
        pos1.z += vel1.z;

        pos2.x += vel2.x;
        pos2.y += vel2.y;
        pos2.z += vel2.z;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.arc(pos1.x % canvas.width, pos1.y % canvas.height, 5, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(pos2.x % canvas.width, pos2.y % canvas.height, 5, 0, 2 * Math.PI);
        ctx.fill();

        requestAnimationFrame(updateSimulation);
    }

    updateSimulation();
}
