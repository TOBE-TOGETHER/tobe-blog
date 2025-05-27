import moment from 'moment/min/moment-with-locales';
import i18n from '../i18n';

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

/**
 * Format date for comment display with internationalization support
 * @param dateString ISO date string
 * @param t translation function
 * @returns formatted date string
 */
export function formatCommentDate(dateString: string, t: (key: string, options?: any) => string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  
  // Convert to different time units
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  // 5分钟之内显示 "Just now"
  if (diffInMinutes < 5) {
    return t('comments.item.just-now');
  }
  
  // 1小时之内显示几分钟之前
  if (diffInMinutes < 60) {
    return t('comments.item.minutes-ago', { count: diffInMinutes });
  }
  
  // 24小时之内显示几小时之前
  if (diffInHours < 24) {
    return t('comments.item.hours-ago', { count: diffInHours });
  }
  
  // 30天之内显示几天前
  if (diffInDays < 30) {
    return t('comments.item.days-ago', { count: diffInDays });
  }
  
  // 30天之后显示具体日期和时间，根据语言环境格式化
  const currentLang = i18n.language || 'en';
  const locale = currentLang === 'zh' ? 'zh-CN' : 'en-US';
  
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: currentLang !== 'zh' // 中文使用24小时制，英文使用12小时制
  };
  
  return date.toLocaleDateString(locale, options);
}

// Keep existing functions for backward compatibility
export { getLocale };
