class Person {
    constructor(firstName, lastName, age, email) {
        this.firstName = firstName
        this.lastName = lastName
        this.age = age
        this.email = email
    }

    toString() {
        return `${this.firstName} ${this.lastName} (age: ${this.age}, email: ${this.email})`
    }
}   

let person = new Person("Peter", "Marinov", 18, "pesho18@abv.bg");
console.log(person.toString());


class Circle {
    constructor(radius) {
        this.radius = radius
    }

    get diameter() {
        return this.radius * 2
    }

    set diameter(diameter) {
        return this.radius = diameter / 2
    }

    get area() {
        return Math.PI*Math.pow(this.radius, 2)
    }
}

// let c = new Circle(5);
// c.diameter = 1.6
// console.log(c.radius)
// console.log(c.area.toFixed(2))


let c = new Circle(2);
console.log(`Radius: ${c.radius}`);
console.log(`Diameter: ${c.diameter}`);
console.log(`Area: ${c.area}`);
c.diameter = 1.6;
console.log(`Radius: ${c.radius}`);
console.log(`Diameter: ${c.diameter}`);
console.log(`Area: ${c.area}`);
