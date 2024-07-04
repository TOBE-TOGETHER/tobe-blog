import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CreatableSelect from 'react-select/creatable';
import { ITagOption } from '../../../../global/types';
import { TagService } from '../../../../services';
import { styles } from './StyleConfig';

export default function SingleTagSelecter(props: { value: ITagOption | null; setValue: (newValue: ITagOption) => void; disabled?: boolean }) {
  const [options, setOptions] = useState<ITagOption[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { t } = useTranslation();

  useEffect(() => loadTags(''), []);

  function loadTags(inputValue: string) {
    TagService.getTags(inputValue)
      .then(response => {
        setOptions(response.data.records);
      })
      .catch(() => {
        setOptions([]);
      });
  }

  const createTag = async (inputValue: string) => {
    setIsLoading(true);
    if (inputValue.length >= 32) {
      enqueueSnackbar(t('components.tag-select.msg.warning'), {
        variant: 'warning',
      });
      return;
    }

    try {
      const response = await TagService.createTag(inputValue);
      if (isInstanceOfTagOption(response.data)) {
        props.setValue(response.data);
        options.push(response.data);
        setOptions(options);
      }
    } catch (error: any) {
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  function isInstanceOfTagOption(object: any): object is ITagOption {
    return 'label' in object && 'value' in object;
  }

  return (
    <CreatableSelect
      onCreateOption={createTag}
      onChange={(newValue: any) => props.setValue(newValue)}
      onInputChange={(newValue: string) => loadTags(newValue)}
      isDisabled={props.disabled || isLoading}
      options={options}
      value={props.value}
      styles={styles}
      placeholder={t('components.tag-select.placeholder')}
    />
  );
}
