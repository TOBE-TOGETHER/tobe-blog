import { Grid, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useCommonUtils } from '../../../../../commons';
import { FormPanel, HalfRow, OneRow } from '../../../../../components';
import { MultipleTagSelecter } from '../../../../components';
import { IContentMainSectionProps } from '../../commons';
import TopicSelector from '../../components/TopicSelector';

interface IPlanEditMainSectionProps extends IContentMainSectionProps {
  fromTime: Date | null;
  setFromTime: (value: Date | null) => void;
  toTime: Date | null;
  setToTime: (value: Date | null) => void;
}

export default function PlanEditMainSection(props: Readonly<IPlanEditMainSectionProps>) {
  const { t } = useCommonUtils();
  return (
    <FormPanel sx={{ mt: 1, ...props.sx }}>
      <OneRow>
        <TextField
          label={t('plan-detail-page.fields.name')}
          fullWidth
          disabled={!props.editable}
          value={props.title}
          onChange={e => props.setTitle(e.target.value)}
        />
      </OneRow>
      <OneRow>
        <TextField
          label={t('plan-detail-page.fields.description')}
          fullWidth
          autoComplete="description"
          multiline
          minRows={3}
          maxRows={20}
          disabled={!props.editable}
          value={props.description}
          onChange={event => props.setDescription(event.target.value)}
        />
      </OneRow>
      <Grid
        container
        item
        xs={12}
        spacing={3}
      >
        <HalfRow>
          <DatePicker
            label={t('plan-detail-page.fields.target-start-time')}
            value={props.fromTime}
            sx={{ width: '100%' }}
            onChange={newValue => props.setFromTime(newValue)}
            disabled={!props.editable}
          />
        </HalfRow>
        <HalfRow>
          <DatePicker
            label={t('plan-detail-page.fields.target-end-time')}
            value={props.toTime}
            sx={{ width: '100%' }}
            onChange={newValue => props.setToTime(newValue)}
            disabled={!props.editable}
          />
        </HalfRow>
      </Grid>
      <HalfRow>
        <TextField
          label={t('plan-detail-page.fields.cover-img-url')}
          fullWidth
          value={props.coverImgUrl}
          onChange={e => props.setCoverImgUrl(e.target.value)}
          disabled={!props.editable}
        />
      </HalfRow>
      <HalfRow>
        <TopicSelector
          editable={props.editable}
          topic={props.topic}
          setTopic={props.setTopic}
        />
      </HalfRow>
      <OneRow>
        <MultipleTagSelecter
          value={props.tagValues}
          setValue={props.setTagValues}
          disabled={!props.editable}
        />
      </OneRow>
    </FormPanel>
  );
}
