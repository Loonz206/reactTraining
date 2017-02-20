var React = require('react');
var ConfirmBattle = require('../components/ConfirmBattle');
var githubHelpers = require('../utils/githubHelpers');

var ConfirmBattleContainer = React.createClass({
    contextTypes: {
        //Router is in context because the view will require routing from the previous view to this one
        router: React.PropTypes.object.isRequired
    },
    //life cycle events in React... questions about getInitialState as one is a little strange
    getInitialState: function () {
        console.log('getInitialState');
        return {
            //Notice that the component must have an initalState loaded to reflect the loading view when its triggered
            isLoading: true,
            playersInfo: []
        }
    },
    componentWillMount: function (){
        console.log('componentWillMount');
    },
    componentDidMount: function () {
        var query = this.props.location.query;
        // https://egghead.io/playlists/the-this-key-word-250c37d9
        githubHelpers.getPlayersInfo([query.playerOne, query.playerTwo])
            .then(function (players){
                this.setState({
                    isLoading: false,
                    playersInfo: [players[0], players[1]]
                })
            }.bind(this))
    },
    componentWillReceiveProps: function (){
        console.log('componentWillReceiveProps');
    },
    componentWillUnmount: function (){
        console.log('componentWillUnmount');
    },
    handleInitiateBattle: function () {
        this.context.router.push({
            pathname: '/results',
            state: {
                playersInfo: this.state.playersInfo
            }
        })
    },
    render: function () {
        return (
            <ConfirmBattle
                isLoading={this.state.isLoading}
                onInitiateBattle={this.handleInitiateBattle}
                playersInfo={this.state.playersInfo} />
        );
    }
});

module.exports = ConfirmBattleContainer;