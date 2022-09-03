import { GamesStat, GameTags } from '../../../constants/types';

export default function getGameStats(gameStat: GamesStat, tag: GameTags): string {
    const { right, wrong } = gameStat[tag];
    const total = right + wrong;
    return `${tag}: ${right} / ${total}`;
}
