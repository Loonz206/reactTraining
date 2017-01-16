var React = require('react');
var ConfirmBattle = require('../components/ConfirmBattle');

var ConfirmBattleContainer = React.createClass({
    contextTypes: {
        //Router is in context because the view will require routing from the previous view to this one
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function () {
        return {
            //Notice that the component must have an initalState loaded to reflect the loading view when its triggered
            isLoading: true,
            playerInfo: []
        }
    },
    componentDidMount: function () {
        var query = this.props.location.query;
        console.log('query:', query);
        // Fetch info from github then update state
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