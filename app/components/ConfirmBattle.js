var React = require('react');

//Notice this is a functional component with passed props as a param
function ConfirmBattle(props) {
    return props.isLoading === true ?
        <p> Loading ...</p> : <p> Confirm Battle! </p>
}

module.exports = ConfirmBattle;