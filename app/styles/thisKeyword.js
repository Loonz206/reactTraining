/*
 -Implict Binding
 */

var Person = function (name, age){
    return {
        name: name,
        age: age,
        sayName: function (){
            console.log(this.name);
        },
        mother: {
            name:'Stacy',
            sayName: function (){
                console.log(this.name);
            }
        }
    };
};

var jim = Person('Jim', 42);
jim.sayName();
jim.mother.sayName();

/*
 -Explict Binding
 */

var sayName = function(one,two,three){
    console.log('My name is ' + this.name + ' and I love ' + one + ', ' + two + ', and ' + three);
};

var stacey = {
    name: 'Stacey',
    age: 34
};

var fastFood = ['Tacos', 'Burgers', 'Sushi'];

sayName.call(stacey);
sayName.apply(stacey, fastFood);
//Call evokes the function with the property of this
//Apply runs the array and parses the values as arguments for the params in the function.


//Bind returns a new function instead of evoking the function already defined.
var newFn = sayName.bind(stacey, fastFood[0], fastFood[1], fastFood[2]);
//new function created that you can call later
newFn();

//new Binding
var Animal = function(color, name, type){
    //creates this = {} and binds the values to the this keyword
  this.color = color;
  this.name = name;
  this.type = type;
};

var zebra = new Animal('black and white', 'Zorro', 'Zebra');

//window Binding
var sayAge = function (){
    //using strict mode will punish you for trying to use the window Binding keyword for this
    'use strict';
    console.log(this.age);
};

var me = {
  age: 25
};

//will default to the window object so to fix it
window.age = 35;
sayAge();