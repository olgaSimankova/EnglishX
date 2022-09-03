import { GamesStat, GameTags } from '../../../constants/types';

export default function getGameStats(gameStat: GamesStat, tag: GameTags): string {
    const { right, wrong } = gameStat[tag];
    const total = right + wrong;
    return `${tag[0].toUpperCase() + tag.slice(1).split('Game').join(' Game')}: ${right} / ${total}`;
}
