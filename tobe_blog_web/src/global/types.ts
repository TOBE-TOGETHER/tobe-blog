import { EAuthority, EColumnPosition, EFeatureCode, EOperationName } from './enums.ts';

export interface IColumn {
  id: string;
  label: string;
  align?: EColumnPosition;
  format?: (value: any) => string;
}

export interface IOperation {
  name: EOperationName;
  onClick: (id: number | string, data: any) => void;
  hide?: (data: any) => boolean;
}

export interface IUserData {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  phoneNum: string;
}

export interface IPlanInfo extends IBaseUserContentDTO {
  targetStartTime: string;
  targetEndTime: string;
}

export interface IPageItem {
  label: string;
  icon: JSX.Element;
  url: string;
  secondaryUrl?: string;
  requiredRoles: EAuthority[];
  requiredFeature?: EFeatureCode;
}

export interface IPlanProgress {
  id: string;
  planId: string;
  description: string;
  updaterName: string;
  createTime: string;
  updateTime: string;
}

export interface INewsDTO {
  id: string;
  title: string;
  contentType: string;
  description: string;
  ownerId: number;
  ownerName: string;
  avatarUrl: string;
  createTime: string;
  updateTime: string | null;
  recommended: boolean;
  publishTime: string | null;
  viewCount: number;
  tags: ITagOption[];
}

export interface IUserBriefProfileDTO {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  blog: string;
  introduction: string;
  publicContentCount: number;
  viewCount: number;
}

export interface IUserFullProfileDTO extends IUserBriefProfileDTO {
  address: string;
  profession: string;
  backgroundImg: string;
  photoImg: string;
  features: IUserFeatureDTO;
}

export interface IUserFeatureDTO {
  articleModule: boolean;
  planModule: boolean;
  vocabularyModule: boolean;
  collectionModule: boolean;
}

export interface ITagOption {
  readonly value: string;
  readonly label: string;
}

export interface ITagStatisticDTO extends ITagOption {
  readonly count: number;
}

export interface IPlanCreationDTO {
  title: string;
  description: string;
  coverImgUrl: string;
  targetStartTime: Date | null;
  targetEndTime: Date | null;
  tags: ITagOption[];
}

export interface IPlanUpdateDTO extends IPlanCreationDTO {
  id: string;
}

export interface IPlanProgressCreationDTO {
  planId: string;
  description: string;
}

export interface IPlanProgressUpdateDTO extends IPlanProgressCreationDTO {
  id: string;
}

export interface IArticleDetailDTO extends IBaseUserContentDTO {
  content: string;
  subTitle: string;
  contentProtected: boolean;
}

export interface IVocabularyCreationDTO {
  title: string;
  description: string;
  language: string;
  coverImgUrl: string;
  tags: ITagOption[];
}

export interface IVocabularyDetailDTO extends IBaseUserContentDTO {
  language: string;
}

export interface IVocabularyUpdateDTO extends IVocabularyCreationDTO {
  id: string;
}

export interface IUserContentAnalyticsDTO {
  totalCount: number;
  publicCount: number;
  totalViewCount: number;
  totalLikeCount: number;
}

export interface ICollectionUpdateDTO {
  id: string;
  title: string;
  description: string;
  coverImgUrl?: string;
  tags: ITagOption[];
}

export interface IBaseUserContentDTO {
  id: string;
  title: string;
  description: string;
  coverImgUrl: string;
  ownerId: string;
  ownerName: string;
  avatarUrl: string;
  publicToAll: boolean;
  publishTime: string;
  viewCount: number;
  likeCount: number;
  tags: ITagOption[];
  createTime: string;
  updateTime: string;
  contentType: string;
  contentProtected: boolean;
  banned: boolean;
  recommended: boolean;
  reason: string;
}

export interface ICollectionDTO extends IBaseUserContentDTO {
  tags: ITagOption[];
  tagTree: ITagRelationshipDTO[];
}

export interface ITagRelationshipCreateDTO {
  parentId: number | null;
  tagId: number;
  collectionId: string;
}

export interface ITagRelationshipDTO {
  id: number;
  parentId: number;
  tagId: number;
  label: string;
  collectionId: string;
  children: ITagRelationshipDTO[];
  relatedContents: IBaseUserContentDTO[];
}

export interface IRenderTree {
  id: string;
  name: string;
  children?: readonly IRenderTree[];
}

export interface ITagRelationship {
  id: number;
  parentId: number;
  tagId: number;
  label: string;
  children: ITagRelationship[];
}

export interface IBreadcrumbsNode {
  label: string;
  href: string;
}
export interface IWordCreateDTO {
  vocabularyId: string;
  text: string;
  partOfSpeech: string;
  meaningInChinese: string;
  meaningInEnglish: string;
}

export interface IWordGeneralDTO {
  id: number;
  vocabularyId: string;
  text: string;
  partOfSpeech: string;
  meaningInChinese: string;
  meaningInEnglish: string;
}

export interface IWordUpdateDTO {
  id: number;
  text: string;
  partOfSpeech: string;
  meaningInChinese: string;
  meaningInEnglish: string;
}
