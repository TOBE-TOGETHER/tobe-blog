import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Page } from '../../../../components/layout';
import { PlanInfo, PlanUpdateDTO, TagOption } from '../../../../global/types';
import { PlanService } from '../../../../services';
import { PlanProgressModal } from '../../../components';
import ContentEditBar from '../components/ContentEditBar.tsx';
import PlanEditMainSection from './components/PlanEditMainSection.tsx';

export default function PlanDetailPage() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const [editable, setEditable] = useState<boolean>(false);
  const [plan, setPlan] = useState<PlanInfo | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [coverImgUrl, setCoverImgUrl] = useState<string | null>(null);
  const [fromTime, setFromTime] = useState<Date | null>(null);
  const [toTime, setToTime] = useState<Date | null>(null);
  const [tagValues, setTagValues] = useState<TagOption[]>([]);

  const loadData = useCallback(
    (id: string): void => {
      PlanService.getById(id)
        .then(response => {
          setPlan(response.data);
          setFromTime(new Date(response.data.targetStartTime));
          setToTime(new Date(response.data.targetEndTime));
          setTitle(response.data.title);
          setDescription(response.data.description);
          setCoverImgUrl(response.data.coverImgUrl);
          setTagValues(response.data.tags);
        })
        .catch(() => {
          enqueueSnackbar(t('plan-detail-page.msg.error'), {
            variant: 'error',
          });
        });
    },
    [enqueueSnackbar, t]
  );

  useEffect(() => loadData(id || ''), [loadData, id]);

  function handlePlanUpdate(updatedPlan: PlanUpdateDTO): void {
    PlanService.update(updatedPlan)
      .then(() => {
        enqueueSnackbar(t('plan-detail-page.msg.success'), {
          variant: 'success',
        });
      })
      .catch(() => {
        enqueueSnackbar(t('plan-detail-page.msg.error'), {
          variant: 'error',
        });
      });
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
        title: title || '',
        description: description || '',
        coverImgUrl: coverImgUrl || '',
        targetStartTime: fromTime,
        targetEndTime: toTime,
        tags: tagValues,
      });
    }
    setEditable(!editable);
  };

  return plan ? (
    <Page
      openLoading={false}
      pageTitle={title || ''}
    >
      <ContentEditBar
        editable={editable}
        handleEditableChange={handleEditableChange}
      />
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
      />
      {id && (
        <PlanProgressModal
          planId={id}
          viewOnly={false}
        />
      )}
    </Page>
  ) : (
    <></>
  );
}
