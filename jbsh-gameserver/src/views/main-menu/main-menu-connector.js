import { connect } from 'react-redux';
import { startGame } from '../../actions';
import { MainMenu } from './main-menu';

const mapDispatchToProps = dispatch => {
    return {
        startGame: (players) => {
            dispatch(startGame(players));
        }
    }
}

export default connect(
    null,
    mapDispatchToProps
)(MainMenu);