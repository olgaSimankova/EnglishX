import renderGameStartPage from '../../../common/gameStartPage/renderGameStartPage';
import sprintStartPageControls from '../../../../logic/games/sprint/controls';
import './style.scss';
import { GameTags } from '../../../../constants/types';

(function startSprintPage() {
    renderGameStartPage('audioCall');
    sprintStartPageControls(GameTags.audioCallGame);
})();
