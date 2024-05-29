import moment from 'moment';
import 'moment/locale/zh-cn.js';

function getLocale(): 'en' | 'zh-cn' {
  if (localStorage.getItem('i18nextLng') === 'en') {
    return 'en';
  } else {
    return 'zh-cn';
  }
}

export function dateFormat(time: string | undefined | null | number) {
  return moment(time).format('YYYY-MM-DD');
}

export function timeFormat(time: string | undefined | null | number) {
  return moment(time).format('hh:mm a');
}

export function dateAndTimeFormat(time: string | undefined | null | number) {
  return moment(time).format('YYYY-MM-DD HH:mm:ss');
}

export function timestamp(time: string | undefined | null | number) {
  return moment(time).unix();
}

export function briefDateFormat(time: string | undefined | null | number) {
  return moment(time).locale(getLocale()).fromNow();
}
