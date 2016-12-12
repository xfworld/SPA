'user strict';

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    say() {
        return `我是${this.name},我今年${this.age}岁了。`;
    }
}

Person.prototype.action = function() {
    let content = 'this is a test';
    return content;
};

export default Person;
