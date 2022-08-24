import renderGameStartPage from '../../../common/gameStartPage/renderGameStartPage';
import sprintStartPageControls from '../../../../logic/games/sprint/controls';
import './style.scss';

(function startSprintPage() {
    renderGameStartPage('audioCall');
    sprintStartPageControls('audioCall');
})();
