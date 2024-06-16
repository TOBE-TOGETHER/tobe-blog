import { enqueueSnackbar } from 'notistack';
import {
  useEffect,
  useState,
} from 'react';
import { TFuncReturn, useTranslation } from 'react-i18next';
import { StylesConfig } from 'react-select';
import { TagOption } from '../../../global/types';
import { TagService } from '../../../services';

const styles: StylesConfig<TagOption, true> = {};

function CreatableSelect(props: { onCreateOption: (inputValue: string) => Promise<void>, onChange: (newValue: any) => void, onInputChange: (newValue: string) => void, options: TagOption[], styles: StylesConfig<TagOption, true>, isDisabled: boolean, placeholder: TFuncReturn<'translation', string, string, undefined>, value: TagOption | null }) {
  return null;
}

export default function SingleTagSelecter(props: {
  value: TagOption | null;
  setValue: (newValue: TagOption) => void;
  disabled?: boolean;
}) {
  const [options, setOptions] = useState<TagOption[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { t } = useTranslation();
  
  useEffect(() => loadTags(''), []);
  
  function loadTags(inputValue: string) {
    TagService.getTags(inputValue)
      .then((response) => {
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
  
  function isInstanceOfTagOption(object: any): object is TagOption {
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
