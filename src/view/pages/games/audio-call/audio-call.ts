import renderGameStartPage from '../../../common/gameStartPage/renderGameStartPage';
import './style.scss';
import startPageControls from '../../../../logic/games/sprint/controls';
import { GameTags } from '../../../../constants/types';

(function startAudioCallPage() {
    renderGameStartPage('audioCall');
    startPageControls(GameTags.audioCallGame);
})();
