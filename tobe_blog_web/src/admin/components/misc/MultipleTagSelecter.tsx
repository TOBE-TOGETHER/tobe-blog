import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { enqueueSnackbar } from "notistack";
import CreatableSelect from "react-select/creatable";
import { StylesConfig } from "react-select";
import { TagService } from "../../../../services";
import { TagOption } from "../../../../global/types";

const styles: StylesConfig<TagOption, true> = {};

export default function MultipleTagSelecter(props: {
  value: TagOption[];
  setValue: (newValue: TagOption[]) => void;
  disabled?: boolean;
}) {
  const [options, setOptions] = useState<TagOption[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { t } = useTranslation();

  useEffect(() => loadTags(""), []);

  function loadTags(inputValue: string) {
    TagService.getTags(inputValue)
      .then((response) => {
        setOptions(response.data.records);
      })
      .catch((error) => {
        setOptions([]);
      });
  }

  const createTag = async (inputValue: string) => {
    setIsLoading(true);
    if (inputValue.length >= 32) {
      enqueueSnackbar(t("components.tag-select.msg.warning"), {
        variant: "warning",
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
      enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  function isInstanceOfTagOption(object: any): object is TagOption {
    return "label" in object && "value" in object;
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
      styles={styles}
      placeholder={t("components.tag-select.placeholder")}
    />
  );
}
