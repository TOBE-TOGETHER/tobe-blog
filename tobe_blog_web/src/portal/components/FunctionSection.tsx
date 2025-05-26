import { Container, Grid, SxProps } from '@mui/material';
import { ReactElement, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { EContentType } from '../../global/enums';
import { TopicPropsType } from '../../global/types';
import ContentTypeFilterPanel from './ContentTypeFilterPanel';
import FeaturedNews from './FeaturedNews';
import TagFilterPanel from './TagFilterPanel';

export default function FunctionSection(
  props: Readonly<{
    availableContentTypes: EContentType[];
    extraPanels: ReactElement[];
    topic: TopicPropsType;
    ownerId: string;
    keyword: string;
    sx?: SxProps;
  }>
) {
  const [searchParams] = useSearchParams();
  const paramContentTypes: string = searchParams.get('ct') ?? '';
  const paramTags: string = searchParams.get('g') ?? '';
  
  // Initialize selected content types from URL params or default to empty array
  const initialContentTypes = paramContentTypes 
    ? paramContentTypes.split(',').filter(ct => 
        props.availableContentTypes.includes(ct as EContentType)
      ) as EContentType[]
    : [];
    
  const [checkedTags, setCheckedTags] = useState<number[]>(
    paramTags
      .split(',')
      .filter(i => !isNaN(Number.parseInt(i)))
      .map(i => Number.parseInt(i))
  );
  const [selectedContentTypes, setSelectedContentTypes] = useState<EContentType[]>(initialContentTypes);

  function handleContentTypesChange(newValue: EContentType[]) {
    setSelectedContentTypes(newValue);
    const contentTypeParam = newValue.join(',');
    const tagsParam = checkedTags.join(',');
    const params = new URLSearchParams();
    if (contentTypeParam) params.set('ct', contentTypeParam);
    if (tagsParam) params.set('g', tagsParam);
    window.history.pushState(null, '', `?${params.toString()}`);
  }

  function handleContentTagsChange(newValue: number[]) {
    setCheckedTags(newValue);
    const contentTypeParam = selectedContentTypes.join(',');
    const tagsParam = newValue.join(',');
    const params = new URLSearchParams();
    if (contentTypeParam) params.set('ct', contentTypeParam);
    if (tagsParam) params.set('g', tagsParam);
    window.history.pushState(null, '', `?${params.toString()}`);
  }

  return (
    <Container sx={{ my: 1, ...props.sx }}>
      {props.availableContentTypes && props.availableContentTypes.length > 0 && (
        <Grid
          container
          spacing={1}
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={9}
          >
            <FeaturedNews
              ownerId={props.ownerId}
              tags={checkedTags}
              selectedContentTypes={selectedContentTypes}
              topic={props.topic}
              keyword={props.keyword}
            />
          </Grid>
          <Grid
            container
            item
            sm={false}
            md={3}
            spacing={1}
            direction="column"
          >
            <Grid item>
              <TagFilterPanel
                contentType={selectedContentTypes}
                checked={checkedTags}
                setChecked={handleContentTagsChange}
                ownerId={props.ownerId}
                topic={props.topic}
                keyword={props.keyword}
              />
            </Grid>
            <Grid item>
              <ContentTypeFilterPanel
                availableContentTypes={props.availableContentTypes}
                selectedContentTypes={selectedContentTypes}
                onContentTypesChange={handleContentTypesChange}
              />
            </Grid>
            {props.extraPanels.map((c, i) => (
              <Grid
                item
                key={`side-panel-${i}`}
              >
                {c}
              </Grid>
            ))}
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
