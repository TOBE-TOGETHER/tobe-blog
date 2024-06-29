import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Page } from '../../../../components/layout';
import { TagOption } from '../../../../global/types';
import { URL } from '../../../../routes';
import { PlanService } from '../../../../services';
import { SaveButtonPanel } from '../../../components';
import PlanEditMainSection from './components/PlanEditMainSection';

export default function PlanCreationPage() {
  const { t } = useTranslation();
  const [tagValues, setTagValues] = useState<TagOption[]>([]);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [coverImgUrl, setCoverImgUrl] = useState<string | null>(null);
  const [fromTime, setFromTime] = useState<Date | null>(null);
  const [toTime, setToTime] = useState<Date | null>(null);

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }
    handlePlanCreation();
  };

  function validateForm(): boolean {
    if (!title) {
      warn(t('plan-creation-page.msg.warning.name-empty'));
      return false;
    }
    if (!fromTime) {
      warn(t('plan-creation-page.msg.warning.target-start-time-empty'));
      return false;
    }
    if (!toTime) {
      warn(t('plan-creation-page.msg.warning.target-end-time-empty'));
      return false;
    }
    if (fromTime?.getTime() > toTime?.getTime()) {
      warn(t('plan-creation-page.msg.warning.target-invalid-start-end-time'));
      return false;
    }

    return true;
  }

  function warn(msg: string): void {
    enqueueSnackbar(msg, {
      variant: 'warning',
    });
  }

  function handlePlanCreation(): void {
    PlanService.create({
      title: title,
      description: description,
      targetStartTime: fromTime,
      targetEndTime: toTime,
      coverImgUrl: coverImgUrl,
      tags: tagValues,
    })
      .then(() => {
        enqueueSnackbar(t('plan-creation-page.msg.success'), {
          variant: 'success',
        });
        navigate(URL.PLANS);
      })
      .catch(() => {
        enqueueSnackbar(t('plan-creation-page.msg.error'), {
          variant: 'error',
        });
      });
  }

  return (
    <Page
      openLoading={false}
      pageTitle={t('plan-creation-page.form-title')}
    >
      <PlanEditMainSection
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        fromTime={fromTime}
        setFromTime={setFromTime}
        toTime={toTime}
        setToTime={setToTime}
        coverImgUrl={coverImgUrl}
        setCoverImgUrl={setCoverImgUrl}
        tagValues={tagValues}
        setTagValues={setTagValues}
        editable={true}
        sx={{ mt: 6 }}
      />
      <SaveButtonPanel primaryEvent={handleSubmit} />
    </Page>
  );
}
