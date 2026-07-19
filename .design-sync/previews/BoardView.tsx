import { BoardView } from 'task-manager-front';
import { installPreviewMock } from '../preview-data';

installPreviewMock();

export const Board = () => <BoardView />;
