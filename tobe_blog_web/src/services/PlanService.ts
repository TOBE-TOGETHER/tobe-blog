import DomainService from './DomainService';

const PLAN_URI = 'v1/plans';
export const PlanService: DomainService = new DomainService(PLAN_URI);
