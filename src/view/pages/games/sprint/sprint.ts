import { GameTags } from '../../../../constants/types';
import startPageControls from '../../../../logic/games/sprint/controls';
import applyLocalStorage from '../../../../utils/localStorage';
import renderGameStartPage from '../../../common/gameStartPage/renderGameStartPage';
import './sprint.scss';

(function startSprintPage() {
    applyLocalStorage();
    renderGameStartPage('sprint');
    startPageControls(GameTags.sprintGame, true);
})();
