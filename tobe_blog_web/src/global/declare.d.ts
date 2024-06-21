declare module 'react-awesome-slider/dist/autoplay';

interface ExtractFunctionType {
  (elements: React.ReactElement | React.ReactElement[]): void;
}

declare module 'react-meta-tags' {
  export type ExtractFunction = ExtractFunctionType;

  export class MetaTagsContext extends React.Component<{
    extract: ExtractFunctionType;
  }> {}

  export class MetaTags extends React.Component {}

  export class ReactTitle extends React.Component<{ title: string }> {}

  export default MetaTags;
}

declare module 'react-meta-tags/server' {
  export interface MetaTagsInstance {
    extract: ExtractFunctionType;
    renderToString: () => string;
    getTags: () => React.ReactElement[];
  }

  const MetaTagsServer: () => MetaTagsInstance;

  export default MetaTagsServer;
}
