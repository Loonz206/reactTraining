#These are some notes I am taking from this tutorial so I have this in context.
This is a tutorial found at https://online.reacttraining.com, and the course is Fundamentals of React. Warning that this is written in ES5 syntax with require.
Some structure to keep in mind.

###Separating folders into components, containers, config

Components are the base UI that are called from Containers, Containers can hold the underlying logic of a view and Components render the view.
Config is meant for routing and keeping routing logic intact. 

##Life Cycle of React

###The key of getting the React Lifecycle into perspective.
_some of the things you might have to do_

* Establish some default props in our component
* Set some initial state in our component
* Make an Ajax request to fetch some data needed for this component
* Set up any listeners (ie Websockets or Firebase listeners)
* Remove any listeners you initally set up (when unmounted)

_Think about what is trying to be solved in each of the examples laid out below. Refer to common needs in application building._

###Establish some default props in our component:
   
Use the **getDefaultProps** method

```
var Loading = React.createClass({
  getDefaultProps: function () {
    return {
      text: 'Loading'
    }
  },
  render: function () {
    ...
  }
})
```
So if we had a Loading component that took in a loading text, we could make sure that if a text attribute isn't provided to the component, this.props.text will by default be 'Loading'.

###Set some inital state in our component

you can do this with **getInitialState**

```
var Login = React.createClass({
  getInitialState: function () {
    return {
      email: '',
      password: ''
    }
  },
  render: function () {
    ...
  }
})
```

using this you can see **email** and **password** have been set in the **Login** component. To update the state, you can call **this.setState** passing in the new object which overwrites one or both of the email and password properties.

###Make an Ajax request to fetch some data needed for this component

Component needs some data that it's going to get from an Ajax request. 
You can do this utilizing **componentDidMount**. This will get called right after the component is mounted to the DOM.

```
var FriendsList = React.createClass({
  componentDidMount: function () {
    return Axios.get(this.props.url).then(this.props.callback)
  },
  render: function () {
    ...
  }
})
```
Here we're using Axios to fetch some data then call a callback we received from props once that data is resolved.

###Set up any listeners (ie Websockets or Firebase listeners)

As you might have guessed, this is a perfect opportunity to use **componentDidMount** as well.

```
var FriendsList = React.createClass({
  componentDidMount: function () {
    ref.on('value', function (snapshot) {
      this.setState({
        friends: snapshot.val()
      })
    })
  },
  render: function () {
    ...
  }
})
```

Now that we've set up that listener, we want to be sure to remove it when the component is removed from the DOM so we don't have memory leaks.

###Remove any listeners you initially set up (when unmounted)

That's where **componentUnmount** comes into play

```
var FriendsList = React.createClass({
  componentWillUnmount: function () {
    ref.off()
  },
  render: function () {
    ...
  }
})
```

Now let's look at Life Cycle Events that are going to be called whenever the component receives new data from its parent component.

The first is **componentWillReceiveProps**. There will be times that you'll want to execute some code whenever your component receives new props. That's exactly what **componentWillReceiveProps** does. 

The second is a more advanced case and is **shouldComponentUpdate**. React is very intelligent about not re-rendering unless something changed. You can make it even more intelligent by implementing **shouldComponentUpdate**. **shouldComponentUpdate** returns a boolean, if that boolean is true, that component will re-render. If it's false, that component (and naturally all child components), won't re-render. This can be a huge performance gain if you know exactly when you want to re-render (based on either the state or the props of your components).

###Using .reduce

You might not realize it, but often in programming you'll need to take a list of things and convert that into just one item - whether an integer, an object, or another array.

Let's take a look at some examples to see what I mean by that.

```
  var scores = [89, 76, 47, 95]
  var initialValue = 0
  var reducer = function (accumulator, item) {
    return accumulator + item
  }
  var total = scores.reduce(reducer, initialValue)
  var average = total / scores.length
```

So we have an array of scores and we want to get an average. So we're essentially going to look at every score in our array, total them up, then divide that total by how many scores are in the array. Looks like a perfect opportunity to use .reduce since we're taking a list of values and transforming it into a single number.
You'll notice **.reduce** takes in two values, a callback function and an initial value.
The callback (reducer) function has two parameters. This is where .reduce can get a little weird if you're not used to it.
The very first time the **reducer** function is called, it's going to be passed the **initialValue** you gave it (the 2nd argument to .reduce) and the first item in the actual array. So in our example above the first time that our **reducer** function runs, **accumulator** is going to be 0 and **item** is going to be 89. Remember, the goal is to transform an array into a single value. We currently have two numbers, 0 and 89, and are goal is to get that to one value. Because we're wanting to find the sum of every item in the array, we'll add 89 + 0 to get 89. That brings up a very important step. The thing that gets returned from the **reducer** function will then be passed as the **accumulator** the next time the function runs. So when **reducer** runs again, **accumulator** will be 89 and **item** will now be the second item in the array, 76. This pattern continues until we have no more items in the array and we get the summation of all of our reducer functions, which is 307.
I realize that was super wordy and now would be a good time to go play around with reducing arrays of numbers.

**.reduce** can be used for more than transforming an array of numbers. It's all about that initialValue that you pass to reduce. If you want the end result to be an object (therefore converting an array into an object), have the initialValue be an object and add properties to that object as you go.
Here's an example of how you would do that below. You have an array of foods and you want to transform that to an object whose keys are the food itself and whose values are how many votes that food received.

```
var votes = [
  'tacos',
  'pizza',
  'pizza',
  'tacos',
  'fries',
  'ice cream',
  'ice cream',
  'pizza'
]
var initialValue = {}
var reducer = function(tally, vote) {
  if (!tally[vote]) {
    tally[vote] = 1;
  } else {
    tally[vote] = tally[vote] + 1;
  }
  return tally;
}
var result = votes.reduce(reducer, initialValue) // {tacos: 2, pizza: 3, fries: 1, ice cream: 2}
```
Array.reduce can be tricky at first, but once you learn to harness its power, you'll drastically improve the way you transform lists.

###Private Components in React 

By now you've heard over and over about the benefits of stateless functional components and functions that just return some UI. We can take our enamoration even one step further.
Let's say we have the code below.

```
var React = require('react');
function FriendsList (props) {
  return (
    <h1>Friends:</h1>
    <ul>
      {props.friends.map((friend, index) => {
        return (
          <li key={friend}>{friend}</li>
        )
      })}
    </ul>
  )
}
module.exports = FriendsList
```
So we have a FriendList component which is just returning us a header and an unordered list of friends.

This looks great, but remember, React is all about modularity. As your render method grows, it's a good habit to take pieces and abstract them to new components. 
Why not create another stateless functional component that's in charge of handling each friend?
```
var React = require('react');
function FriendItem (props) {
  return <li>{props.friend}</li>
}
function FriendsList (props) {
  return (
    <h1>Friends:</h1>
    <ul>
      {props.friends.map((friend, index) => <FriendItem friend={friend} key={friend} />)}
    </ul>
  )
}
module.exports = FriendsList
```
Notice that all we've done is essentially create a "private component" just as we would a private function.

One thing I really like about stateless functional components that I haven't mentioned up until this point is that they have no "this" keyword associated with them.
If you're familiar with the "this" keyword you know that it allows you to call a function in a different context.
What that means is that if you're using the "this" keyword, you're not 100% sure what the implementation of said function will look like.
By removing the option to have a "this" keyword, we've removed the one way in which our function can be called in a way we're not expecting.

###getDefaultProps in React

A large benefit of React is creating and consuming highly reusable components.
If you think about strategies for creating reusable components, a very important aspect is through props.
You want a component to be able to work for more than just your very specific use case. 
For example, if we were creating a reusable <Loading /> component, we would want the user to be able to specify certain
properties that are specific to their application. 
For example, you'd want the user to be able to specify their own styles or specify what the actual loading text will be.
But what if some users don't want to specify their own specific style or loading text but instead want to use some
default text? This is where **getDefaultProps** comes into play. **getDefaultProps** allows you to, as you guessed, specify what
the default props will be in a component if those specific props aren't specified when the component is invoked.

```
var Loading = React.createClass({
  getDefaultProps: function () {
    return {
      text: 'loading',
      styles: {color: 'red'}
    }
  },
  render: function () {
    ...
  }
})
```

Now if someone uses our Loading component like this

```
  <Loading />
```
without specifying a text or styles property, **this.props.text** will default to 'loading' and **this.props.styles** will default to {color: 'red'}.

but if our component is used like this
```
<Loading text='One second' styles={color: 'green'} />
```
Then **this.props.text** will be 'One second' and **this.props.color** will be 'green'.


![alt text][image]

[image]:https://d2vvqscadf4c1f.cloudfront.net/RXZidTc7S5WEicK3fiNW_Screen%20Shot%202016-02-25%20at%2012.06.29%20PM.png "Lifecycle React"

