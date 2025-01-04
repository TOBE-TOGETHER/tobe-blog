import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { StylesConfig } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { useCommonUtils } from '../../../../commons';
import { ITagOption } from '../../../../global/types';
import { styles } from './StyleConfig';
import * as TagService from './TagService';

export default function MultipleTagSelecter(
  props: Readonly<{
    value: ITagOption[];
    setValue: (newValue: ITagOption[]) => void;
    disabled?: boolean;
    styles?: StylesConfig<ITagOption, true>;
  }>
) {
  const [options, setOptions] = useState<ITagOption[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { t } = useCommonUtils();

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
        props.value.push(response.data);
        props.setValue(props.value);
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
      isMulti
      onCreateOption={createTag}
      onChange={(newValue: any) => props.setValue(newValue)}
      onInputChange={(newValue: string) => loadTags(newValue)}
      isDisabled={props.disabled || isLoading}
      options={options}
      value={props.value}
      styles={{ ...styles, ...props.styles }}
      placeholder={t('components.tag-select.placeholder')}
    />
  );
}
