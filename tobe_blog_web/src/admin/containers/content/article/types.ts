import type { ITagOption, TopicPropsType } from '../../../../global/types';

export interface LocalDraft {
  articleId: string;
  updatedAt: number;
  title: string;
  subTitle: string;
  content: string;
  coverImgUrl: string;
  tags: ITagOption[];
  contentProtected: boolean;
  topic: TopicPropsType;
} 