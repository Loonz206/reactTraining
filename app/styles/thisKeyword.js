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
//Call envokes the function with the property of this
//Apply runs the array and parses the values as arguements for the params in the function.
//Bind returns a new function instead of envoking the function already defined.