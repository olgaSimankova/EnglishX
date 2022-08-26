import { GameTags } from '../../../../constants/types';
import startPageControls from '../../../../logic/games/sprint/controls';
import renderGameStartPage from '../../../common/gameStartPage/renderGameStartPage';
import './sprint.scss';

function startSprintPage() {
    renderGameStartPage('sprint');
    startPageControls(GameTags.sprintGame, true);
}

startSprintPage();
