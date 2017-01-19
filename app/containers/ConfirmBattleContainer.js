var React = require('react');
var ConfirmBattle = require('../components/ConfirmBattle');

var ConfirmBattleContainer = React.createClass({
    contextTypes: {
        //Router is in context because the view will require routing from the previous view to this one
        router: React.PropTypes.object.isRequired
    },
    //life cycle events in React... questions about getInitialState as one is a little strange
    getInitialState: function () {
        return {
            //Notice that the component must have an initalState loaded to reflect the loading view when its triggered
            isLoading: true,
            playerInfo: []
        }
    },
    componentWillMount: function (){
        console.log('componentWillMount');
    },
    componentDidMount: function () {
        var query = this.props.location.query;
        console.log('componentDidMount');
        console.log('query:', query);
        // Fetch info from github then update state
    },
    componentWillReceiveProps: function (){
        console.log('componentWillReceiveProps');
    },
    componentWillUnmount: function (){
        console.log('componentWillUnmount');
    },
    render: function () {
        return (
            <ConfirmBattle
                isLoading={this.state.isLoading}
                playerInfo={this.state.playerInfo} />
        );
    }
});

module.exports = ConfirmBattleContainer;