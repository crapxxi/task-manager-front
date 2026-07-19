import { StatsBar } from 'task-manager-front';
import { installPreviewMock } from '../preview-data';

installPreviewMock();

export const Default = () => <StatsBar />;
