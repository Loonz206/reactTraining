var React = require('react');
var PropTypes = React.PropTypes;
var transparentBg = require('../styles').transparentBg;

// functional stateless components refactoring...
// Do this for components that only render UI and propTypes as a property on the object for cleaner code and separation
// of logic from UI.

function Prompt(props) {
    return (
        <div className="jumbotron col-sm-6 col-sm-offset-3 text-center" style={transparentBg}>
            <h1>{props.header}</h1>
            <div className="col-sm-12">
                <form onSubmit={props.onSubmitUser}>
                    <div className="form-group">
                        <input type="text"
                               className="form-control"
                               onChange={props.onUpdateUser}
                               value={props.username}
                               placeholder="Github Username"/>
                    </div>
                    <div className="form-group col-sm-4 col-sm-offset-4">
                        <button className="btn btn-block btn-success" type="submit">
                            Continue
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

// This would of been a comma separated value on the createClass and now is a object reference on the prompt function
Prompt.propTypes = {
        header: PropTypes.string.isRequired,
        onUpdateUser: PropTypes.func.isRequired,
        onSubmitUser: PropTypes.func.isRequired,
        username: PropTypes.string.isRequired
};

module.exports = Prompt;