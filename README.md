##These are some notes I am taking from this tutorial so I have this in context.

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

![alt text][image]

[image]:https://d2vvqscadf4c1f.cloudfront.net/RXZidTc7S5WEicK3fiNW_Screen%20Shot%202016-02-25%20at%2012.06.29%20PM.png "Lifecycle React"

