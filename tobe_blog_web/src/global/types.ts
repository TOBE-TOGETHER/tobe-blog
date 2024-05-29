export interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "left" | "right" | "center";
  format?: (value: any) => string;
}

export interface Operation {
  name: "detail" | "delete" | "active" | "release" | "close";
  onClick: (id: number | string) => void;
  hide?: (data: any) => boolean;
}

export interface UserData {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  phoneNum: string;
}

export interface ProjectInfo {
  id: string;
  name: string;
  description: string;
  statusValue: number;
  ownerName: string;
  ownerId: string;
  publicToAll: boolean;
  publishTime: string;
  targetStartTime: string;
  targetEndTime: string;
  tags: TagOption[];
  viewCount: number;
  createTime: string;
}

export interface PageItem {
  label: string;
  icon: JSX.Element;
  url: string;
  secondaryUrl?: string;
  requiredRoles: string[];
  requiredFeature?: string;
}

export interface ProjectCardProps {
  operations: Operation[];
  project: ProjectInfo;
}

export interface ProjectProgress {
  id: string;
  projectId: string;
  description: string;
  updaterName: string;
  createTime: string;
  updateTime: string;
}

export interface NewsDTO {
  id: string;
  title: string;
  domain: string;
  description: string;
  ownerName: string;
  avatarUrl: string;
  createTime: string;
  updateTime: string | null;
  publishTime: string | null;
  viewCount: number;
  tags: TagOption[];
}

export interface UserBriefProfileDTO {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  blog: string;
  introduction: string;
  publicCreationCount: number;
  viewCount: number;
}

export interface UserFullProfileDTO extends UserBriefProfileDTO {
  address: string;
  position: string;
  backgroundImg: string;
  photoImg: string;
  features: UserFeatureDTO;
}

export interface UserFeatureDTO {
  articleModule: boolean;
  projectModule: boolean;
  vocabularyModule: boolean;
}

export interface TagOption {
  readonly value: string;
  readonly label: string;
}

export interface TagStatisticDTO extends TagOption {
  readonly count: number;
}

export interface ProjectCreationDTO {
  name: string;
  description: string;
  targetStartTime: Date | null;
  targetEndTime: Date | null;
  tags: TagOption[];
}

export interface ProjectUpdateDTO extends ProjectCreationDTO {
  id: string;
}

export interface ProjectProgressCreationDTO {
  projectId: string;
  description: string;
}

export interface ProjectProgressUpdateDTO extends ProjectProgressCreationDTO {
  id: string;
}
export interface ArticleCreationDTO {
  title: string;
  subTitle: string;
  content: string;
  description: string;
  tags: TagOption[];
}

export interface ArticleUpdateDTO extends ArticleCreationDTO {
  id: string;
}

export interface ArticleDetailDTO extends GeneralCardData {
  content: string;
  authorName: string;
  authorId: string;
  likeCount: number;
  viewCount: number;
  publishTime: string;
  subTitle: string;
  avatarUrl: string;
}

export interface VocabularyCreationDTO {
  title: string;
  description: string;
  language: string;
  tags: TagOption[];
}

export interface VocabularyDetailDTO extends GeneralCardData {
  authorName: string;
  authorId: string;
  likeCount: number;
  viewCount: number;
  publishTime: string;
  language: string;
  avatarUrl: string;
}

export interface GeneralCardData {
  id: string;
  title: string;
  description: string;
  publicToAll: boolean;
  tags: TagOption[];
  createTime?: string;
}

export interface VocabularyUpdateDTO extends VocabularyCreationDTO {
  id: string;
}

export enum Domain {
  Article = "ARTICLE",
  Project = "PROJECT",
  Vocabulary = "VOCABULARY",
}

export interface BaseInfoOverview {
  totalNum: number;
  publicNum: number;
  totalViewCount: number;
}

export interface SubjectInfoCreationDTO {
  name: string;
  description: string;
  coverImgUrl?: string;
}

export interface SubjectInfoUpdateDTO {
  id: string;
  name: string;
  description: string;
  coverImgUrl?: string;
}

export interface SubjectInfoGeneralDTO {
  id: string;
  name: string;
  description: string;
  coverImgUrl?: string;
  ownerId: string;
  ownerName: string;
  avatarUrl: string;
  publicToAll: boolean;
  publishTime: string;
  viewCount: number;
  tagTree: TagRelationshipGeneralDTO[];
}

export interface TagRelationshipCreateDTO {
  parentId: number | null;
  tagId: number;
  subjectId: string;
}

export interface TagRelationshipGeneralDTO {
  id: number;
  parentId: number;
  tagId: number;
  label: string;
  subjectId: string;
  relatedArticles: NewsDTO[];
  relatedProjects: NewsDTO[];
  relatedVocabularies: NewsDTO[];
  children: TagRelationshipGeneralDTO[];
}

export interface RenderTree {
  id: string;
  name: string;
  children?: readonly RenderTree[];
}

export interface TagRelationship {
  id: number;
  parentId: number;
  tagId: number;
  label: string;
  children: TagRelationship[];
}

export interface SubjectInfo {
  id: string;
  name: string;
  description: string;
  coverImgUrl: string;
  ownerId: string;
  likeCount: number;
  viewCount: number;
  publicToAll: boolean;
  publishTime: Date;
  tags: TagOption[];
}

export interface BreadcrumbsNode {
  label: string;
  href: string;
}

export interface WordGeneralDTO {
  id: number;
  vocabularyId: string;
  word: string;
  partOfSpeech: string;
  meaningInChinese: string;
  meaningInEnglish: string;
}

export interface WordCreateDTO {
  vocabularyId: string;
  word: string;
  partOfSpeech: string;
  meaningInChinese: string;
  meaningInEnglish: string;
}

export interface WordUpdateDTO extends WordGeneralDTO { }
