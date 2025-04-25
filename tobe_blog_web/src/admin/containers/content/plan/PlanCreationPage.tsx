import { useState } from 'react';
import { useCommonUtils } from '../../../../commons/index.ts';
import { Page } from '../../../../components/layout';
import { URL } from '../../../../routes';
import { SaveButtonPanel } from '../../../components';
import { useCommonContentState } from '../commons.ts';
import { PlanService } from '../UserContentService.ts';
import PlanEditMainSection from './components/PlanEditMainSection';

export default function PlanCreationPage() {
  const { t, enqueueSnackbar, navigate } = useCommonUtils();
  const [fromTime, setFromTime] = useState<Date | null>(null);
  const [toTime, setToTime] = useState<Date | null>(null);
  const { loading, setLoading, title, setTitle, description, setDescription, coverImgUrl, setCoverImgUrl, tagValues, setTagValues, topic, setTopic } = useCommonContentState();

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
    setLoading(true);
    PlanService.create({
      title: title,
      description: description,
      targetStartTime: fromTime,
      targetEndTime: toTime,
      coverImgUrl: coverImgUrl,
      tags: tagValues,
      topic: topic,
    })
      .then(() => {
        enqueueSnackbar(t('msg.success'), {
          variant: 'success',
        });
        navigate(URL.PLANS);
      })
      .catch(() => {
        enqueueSnackbar(t('msg.error'), {
          variant: 'error',
        });
      })
      .finally(() => setLoading(false));
  }

  return (
    <Page
      openLoading={loading}
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
        topic={topic}
        setTopic={setTopic}
      />
      <SaveButtonPanel primaryEvent={handleSubmit} />
    </Page>
  );
}
