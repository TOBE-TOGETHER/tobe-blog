import { SxProps } from '@mui/material';
import { useState } from 'react';
import { ETopic, ITagOption } from '../../../global/types';

export const useCommonContentState = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [editable, setEditable] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [coverImgUrl, setCoverImgUrl] = useState<string>('');
  const [tagValues, setTagValues] = useState<ITagOption[]>([]);
  const [topic, setTopic] = useState<ETopic | string | null>(null);
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
  topic: ETopic | string | null;
  setTopic: (value: ETopic | string | null) => void;
  editable: boolean;
  sx?: SxProps;
}
