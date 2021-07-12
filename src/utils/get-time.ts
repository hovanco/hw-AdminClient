import moment from 'moment';

export function getNumOfDaysUntilExpired(expiredAt: string): number {
    return moment(expiredAt).diff(moment(), 'days');
}