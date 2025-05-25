import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCommonUtils } from '../../../../commons/index.ts';
import { IPlanInfo, IPlanUpdateDTO } from '../../../../global/types';
import { useCommonContentState } from '../commons.ts';
import BaseContentPage from '../components/ContentPage.tsx';
import { PlanService } from '../UserContentService.ts';
import PlanEditMainSection from './components/PlanEditMainSection.tsx';
import PlanProgressModal from './components/PlanProgressModal.tsx';

export default function PlanDetailPage() {
  const { t, enqueueSnackbar } = useCommonUtils();
  const { id } = useParams();
  const [plan, setPlan] = useState<IPlanInfo | null>(null);
  const [fromTime, setFromTime] = useState<Date | null>(null);
  const [toTime, setToTime] = useState<Date | null>(null);
  const { loading, setLoading, editable, setEditable, title, setTitle, description, setDescription, coverImgUrl, setCoverImgUrl, tagValues, setTagValues, topic, setTopic } =
    useCommonContentState();

  const loadData = useCallback(
    (id: string): void => {
      setLoading(true);
      PlanService.getById(id)
        .then(response => {
          setPlan(response.data);
          setFromTime(new Date(response.data.targetStartTime));
          setToTime(new Date(response.data.targetEndTime));
          setTitle(response.data.title);
          setDescription(response.data.description);
          setCoverImgUrl(response.data.coverImgUrl);
          setTagValues(response.data.tags);
          setTopic(response.data.topic);
        })
        .catch(() => {
          enqueueSnackbar(t('msg.error'), {
            variant: 'error',
          });
        })
        .finally(() => setLoading(false));
    },
    [enqueueSnackbar, t]
  );

  useEffect(() => loadData(id ?? ''), [loadData, id]);

  function handlePlanUpdate(updatedPlan: IPlanUpdateDTO): void {
    setLoading(true);
    PlanService.update(updatedPlan)
      .then(() => {
        enqueueSnackbar(t('msg.success'), {
          variant: 'success',
        });
      })
      .catch(() => {
        enqueueSnackbar(t('msg.error'), {
          variant: 'error',
        });
      })
      .finally(() => setLoading(false));
  }

  const handleEditableChange = () => {
    if (!plan) {
      return;
    }
    if (!title) {
      return;
    }
    if (editable) {
      handlePlanUpdate({
        id: plan.id,
        title: title ?? '',
        description: description ?? '',
        coverImgUrl: coverImgUrl ?? '',
        targetStartTime: fromTime,
        targetEndTime: toTime,
        tags: tagValues,
        topic: topic,
      });
    }
    setEditable(!editable);
  };

  return (
    <BaseContentPage
      loading={loading}
      id={id}
      title={title}
      editable={editable}
      handleEditableChange={handleEditableChange}
      service={PlanService}
      contentData={plan}
      onVisibilityChange={() => loadData(id ?? '')}
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
        editable={editable}
        topic={topic}
        setTopic={setTopic}
      />
      {id && (
        <PlanProgressModal
          planId={id}
          viewOnly={false}
        />
      )}
    </BaseContentPage>
  );
}
