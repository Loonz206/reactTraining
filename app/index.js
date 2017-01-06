var React = require('react');
var ReactDOM = require('react-dom');

var HelloWorld = React.createClass({
    render: function () {
        return (
            <div className="cool-class-name">
                <h1>Hello World!</h1>
                <img src="http://lorempixel.com/300/200" alt="fake image"/>
                <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Aenean lacinia bibendum nulla sed consectetur.</p>
            </div>
        )
    }
});

var FriendsContainer = React.createClass({
    render: function(){
        var name = 'Lenny';
        var friends = ['Simon Peters', 'James Lakey', 'Merrick Christensen']
        return (
            <div>
                <h3> Name: {name} </h3>
                <ShowList names={friends} />
            </div>
        )
    }
});

var ShowList = React.createClass({
    render: function(){
        var listItems = this.props.names.map(function(friend){
            return <li> {friend} </li>;
        });
        return (
            <div>
                <h3> Friends </h3>
                <ul>
                    {listItems}
                </ul>
            </div>
        )
    }
});

ReactDOM.render(
    <FriendsContainer/>,
    document.getElementById('app')
);