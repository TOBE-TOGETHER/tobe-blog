import { Grid } from '@mui/material';
import { ITagOption } from '../../../../global/types';
import theme from '../../../../theme';
import { AddIconButton } from '../../../components';
import MultipleTageSelecter from '../../../components/misc/selector/MultipleTagSelecter';

export default function GeneralContentListPageFunctionBar(
  props: Readonly<{
    createNewAction: () => void;
    tagValues: ITagOption[];
    setTagValues: (newValue: ITagOption[]) => void;
  }>
) {
  return (
    <Grid
      container
      sx={{ py: 1 }}
      alignItems="center"
      justifyContent="space-between"
    >
      <Grid item>
        <AddIconButton onClick={props.createNewAction} />
      </Grid>
      <Grid item>
        <MultipleTageSelecter
          value={props.tagValues}
          setValue={props.setTagValues}
          disabled={false}
          styles={{
            control: baseStyles => ({
              ...baseStyles,
              'marginLeft': '4px',
              'height': '42px',
              'minWidth': '240px',
              'border': '1px solid rgba(0,0,0,0.12)',
              'color': 'rgba(0,0,0,0.4)',
              'fontSize': '14px',
              '&:hover': { boxShadow: '0 0 0 1px ' + theme.palette.primary.dark },
              '&:focus-within': { boxShadow: '0 0 0 1px ' + theme.palette.primary.dark, borderColor: theme.palette.primary.dark },
            }),
          }}
        />
      </Grid>
    </Grid>
  );
}
