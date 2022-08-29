import { listenResultBottomButtons, listenResultTabs, listenSoundResultList } from '../../../logic/games/sprint/events';

export default function gameResultControls(): void {
    listenResultTabs();
    listenSoundResultList();
    listenResultBottomButtons();
}
