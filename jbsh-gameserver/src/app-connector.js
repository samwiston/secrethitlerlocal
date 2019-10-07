import { connect } from 'react-redux';
import App from './app';

const mapStateToProps = state => {
    return {
        gameState: state
    }
}

export default connect(
    mapStateToProps,
    null
)(App);