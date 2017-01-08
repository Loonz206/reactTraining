var USER_DATA = {
    name:'Lenny Peters',
    username:'loonz206',
    imageUrl:'https://avatars2.githubusercontent.com/u/2746541?v=3&s=460'
};

var React = require('react');
var ReactDOM = require('react-dom');

/*
* Focused
* Independent
* Reusable
* Small
* Testable
*/

var ProfilePic = React.createClass({
   render: function (){
       return <img src={this.props.imageUrl} alt={this.props.name} style={{height:100, width:100}}/>
   }
});

var ProfileLink = React.createClass({
   render: function () {
       return <div>
           <a href={'https://www.github.com/' + this.props.username}>
               {this.props.username}
           </a>
       </div>
   }
});

var ProfileName = React.createClass({
   render: function (){
       return <h2>{this.props.name}</h2>
   }
});

var Avatar = React.createClass({
   render: function (){
       return <div>
           <ProfilePic imageUrl={this.props.user.imageUrl}/>
           <ProfileName name={this.props.user.name}/>
           <ProfileLink username={this.props.user.username}/>
       </div>
   }
});

ReactDOM.render(
   <Avatar user={USER_DATA}/>,
   document.getElementById('app')
);



