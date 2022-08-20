import sprintControls from '../../../../logic/games/sprint/controls';
import renderSprint from './renderSprint';
import './sprint.scss';

function startSprintPage() {
    renderSprint();
    sprintControls();
}

startSprintPage();
