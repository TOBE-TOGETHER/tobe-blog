import { Container, Grid } from '@mui/material';
import { ReactElement, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getContentTypeFromPath, getPathFromContentType } from '../../../commons';
import { EContentType } from '../../../global/enums';
import FeaturedNews from './FeaturedNews';
import TagFilterPanel from './TagFilterPanel';

export default function FunctionSection(
  props: Readonly<{
    availableContentTypes: EContentType[];
    extraPanels: ReactElement[];
    ownerId: string;
  }>
) {
  const [searchParams] = useSearchParams();
  const paramContentType: string = searchParams.get('t') || '';
  const paramTags: string = searchParams.get('g') || '';
  const [checkedTags, setCheckedTags] = useState<number[]>(
    paramTags
      .split(',')
      .filter(i => !isNaN(Number.parseInt(i)))
      .map(i => Number.parseInt(i))
  );
  const [contentType, setContentType] = useState<EContentType>(getContentTypeFromPath(paramContentType));

  function handleContentTypeChange(newValue: EContentType) {
    setCheckedTags([]);
    setContentType(newValue);
    window.history.pushState(null, '', `?t=${getPathFromContentType(newValue)}`);
  }

  function handleContentTagsChange(newValue: number[]) {
    setCheckedTags(newValue);
    window.history.pushState(null, '', `?t=${getPathFromContentType(contentType)}&g=${newValue}`);
  }

  return (
    <Container sx={{ my: 1 }}>
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
              contentType={contentType}
              availableContentTypes={props.availableContentTypes}
              handleContentTypeChange={handleContentTypeChange}
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
                contentType={contentType}
                checked={checkedTags}
                setChecked={handleContentTagsChange}
                ownerId={props.ownerId}
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
