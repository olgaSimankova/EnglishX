import sprintStartPageControls from '../../../../logic/games/sprint/controls';
import renderGameStartPage from '../../../common/gameStartPage/renderGameStartPage';
import './sprint.scss';

function startSprintPage() {
    renderGameStartPage('sprint');
    sprintStartPageControls();
}

startSprintPage();
