import { Grid } from '@mui/material';
import { ITagOption } from '../../../../global/types';
import theme from '../../../../theme';
import { AddIconButton, AdminSearchBox } from '../../../components';
import MultipleTageSelecter from '../../../components/misc/selector/MultipleTagSelecter';

export default function GeneralContentListPageFunctionBar(
  props: Readonly<{
    createNewAction: () => void;
    tagValues: ITagOption[];
    setTagValues: (newValue: ITagOption[]) => void;
    searchKeyword: string;
    onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }>
) {
  return (
    <>
      {/* Function Bar with Add Button and Tag Selector */}
      <Grid
        container
        sx={{ py: 1 }}
        alignItems="center"
      >
        <Grid item>
          <AddIconButton onClick={props.createNewAction} />
        </Grid>
        <Grid item flexGrow={1}>
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
                'minWidth': '285px',
                'border': '1px solid rgba(0,0,0,0.12)',
                'color': 'rgba(0,0,0,0.4)',
                'fontSize': '14px',
                '&:hover': { boxShadow: '0 0 0 1px ' + theme.palette.primary.dark },
                '&:focus-within': { boxShadow: '0 0 0 1px ' + theme.palette.primary.dark, borderColor: theme.palette.primary.dark },
              }),
            }}
          />
        </Grid>
        <Grid item sx={{ width: { xs: '100%', sm: '100%', md: 'auto' }, mt: { xs: 1, sm: 1, md: 0 }, ml: { xs: 0, sm: 0, md: 1 } }}>
          <AdminSearchBox
            value={props.searchKeyword}
            onChange={props.onSearchChange}
            width={{ xs: '100%', sm: '100%', md: 285 }}
          />
        </Grid>
      </Grid>
    </>
  );
}
