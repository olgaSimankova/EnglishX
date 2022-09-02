import { GamesStat, GameTags } from '../constants/types';

export function initDefaultGamesStats(): GamesStat {
    return {
        [GameTags.sprintGame]: {
            right: 0,
            wrong: 0,
            streak: 0,
        },
        [GameTags.audioCallGame]: {
            right: 0,
            wrong: 0,
            streak: 0,
        },
    };
}

export function processGamesStatObject(obj: GamesStat, answer: boolean, tag: GameTags): GamesStat {
    obj[tag].right += answer ? 1 : 0;
    obj[tag].wrong += answer ? 0 : 1;
    obj[tag].streak = answer ? obj[tag].streak + 1 : 0;
    if (!answer) {
        obj.audioCallGame.streak = 0;
        obj.sprintGame.streak = 0;
    }
    return obj;
}
