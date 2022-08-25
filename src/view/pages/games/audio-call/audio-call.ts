import renderGameStartPage from '../../../common/gameStartPage/renderGameStartPage';
import './style.scss';
import startPageControls from '../../../../logic/games/sprint/controls';

(function startAudioCallPage() {
    renderGameStartPage('audioCall');
    startPageControls('audioCall');
})();
