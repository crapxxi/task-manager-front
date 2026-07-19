import { PlanView } from 'task-manager-front';
import { installPreviewMock } from '../preview-data';

installPreviewMock();

export const Plan = () => <PlanView />;
