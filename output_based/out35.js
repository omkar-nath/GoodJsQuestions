class Dog {
  constructor(name) {
    this.name = name;
  }
}

Dog.prototype.bark = function () {
  console.log(`Woof I am a ${this.name}`);
};

const pet = new Dog("Mara");
pet.bark();

delete Dog.prototype.bark;

pet.bark();
