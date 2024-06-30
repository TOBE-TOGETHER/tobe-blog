import { StylesConfig } from 'react-select';
import { ITagOption } from '../../../../global/types';
import theme from '../../../../theme';

export const styles: StylesConfig<ITagOption, true> = {
  control: baseStyles => ({
    ...baseStyles,
    'height': '56px',
    '&:hover': { boxShadow: '0 0 0 1px ' + theme.palette.primary.dark },
    '&:focus-within': { boxShadow: '0 0 0 1px ' + theme.palette.primary.dark, borderColor: theme.palette.primary.dark },
  }),
  menuList: baseStyles => ({
    ...baseStyles,
    opacity: 1,
  }),
  multiValueLabel: baseStyles => ({
    ...baseStyles,
    padding: '4px',
    paddingLeft: '8px',
    fontSize: '0.85rem',
  }),
  multiValueRemove: baseStyles => ({
    ...baseStyles,
    fontSize: '0.85rem',
  }),
};
