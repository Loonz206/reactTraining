var React = require('react');
var Prompt = require('../components/Prompt');

// Totally understood to create the logic and UI for the view in the container however after a working view with logic is
// establish further separate the UI from the logic by moving the UI into a component away from the logic and pass the values into it.

var PromptContainer = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function () {
        return {
            username: ''
        }
    },
    handleUpdateUser: function (e) {
        this.setState({
            username: e.target.value
        })
    },
    handleSubmitUser: function (e) {
        e.preventDefault();
        var username = this.state.username;
        this.setState({
            username: ''
        });

        if (this.props.routeParams.playerOne) {
            //go to battle
            console.log(this.context);
            this.context.router.push({
                pathname: '/battle',
                query: {
                    playerOne: this.props.routeParams.playerOne,
                    playerTwo: this.state.username
                }
            })
        } else {
            //go to /playerTwo
            console.log(this.context);
            this.context.router.push('/playerTwo/' + this.state.username)
        }
    },
    render: function () {
        return (
            <Prompt
                onSubmitUser={this.handleSubmitUser}
                onUpdateUser={this.handleUpdateUser}
                header={this.props.route.header}
                username={this.state.username}/>
        )
    }
});

module.exports = PromptContainer;