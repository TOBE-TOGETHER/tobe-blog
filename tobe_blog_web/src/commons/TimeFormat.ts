import moment from 'moment/min/moment-with-locales';

function getLocale(): 'en' | 'zh-cn' {
  if (localStorage.getItem('i18nextLng') === 'en') {
    return 'en';
  } else {
    return 'zh-cn';
  }
}

type Time = string | undefined | null | number;

export function dateFormat(time: Time) {
  return moment(time).format('YYYY-MM-DD');
}

export function dateMonFormat(time: Time) {
  return moment(time).format('DD MMM YYYY');
}

export function timeFormat(time: Time) {
  return moment(time).format('hh:mm a');
}

export function dateAndTimeFormat(time: Time) {
  return moment(time).format('YYYY-MM-DD HH:mm:ss');
}

export function briefDateFormat(time: Time) {
  return moment(time).locale(getLocale()).fromNow();
}
