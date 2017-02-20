var React = require('react');

function puke (object) {
    return <pre>{JSON.stringify(object, null, ' ')}</pre>
}

//Notice this is a functional component with passed props as a param
function ConfirmBattle(props) {
    return props.isLoading === true
        ? <p> Loading ...</p>
        : <div> Confirm Battle!: {puke(props)}</div>
}

module.exports = ConfirmBattle;