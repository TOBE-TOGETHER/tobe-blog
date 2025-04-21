import { SxProps } from '@mui/material';
import { useState } from 'react';
import { ITagOption, TopicPropsType } from '../../../global/types';

export const useCommonContentState = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [editable, setEditable] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [coverImgUrl, setCoverImgUrl] = useState<string>('');
  const [tagValues, setTagValues] = useState<ITagOption[]>([]);
  const [topic, setTopic] = useState<TopicPropsType>(null);
  return { loading, setLoading, editable, setEditable, title, setTitle, description, setDescription, coverImgUrl, setCoverImgUrl, tagValues, setTagValues, topic, setTopic };
};

export interface IContentMainSectionProps {
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  coverImgUrl: string;
  setCoverImgUrl: (value: string) => void;
  tagValues: ITagOption[];
  setTagValues: (value: ITagOption[]) => void;
  topic: TopicPropsType;
  setTopic: (value: TopicPropsType) => void;
  editable: boolean;
  sx?: SxProps;
}
