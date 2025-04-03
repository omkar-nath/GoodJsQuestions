const box = { x: 10, y: 20, z: { name: "Omkar" } };

Object.freeze(box);
Object.freeze(box.z);

const shape = box;
shape.x = 100; // This will not modify
shape.z.name = "Lydia"; // This will work

console.log(shape);
