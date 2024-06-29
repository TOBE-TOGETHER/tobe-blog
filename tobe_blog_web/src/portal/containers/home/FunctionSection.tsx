import { Container, Grid } from '@mui/material';
import { ReactElement, useState } from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';
import { getContentTypeFromPath, getPathFromContentType } from '../../../commons';
import { EContentType } from '../../../global/enums';
import FeaturedNews from './FeaturedNews';
import TagStatisticsFilterPanel from './TagStatisticsFilterPanel';

export default function FunctionSection(props: { availableContentTypes: EContentType[]; extraPanels: ReactElement[]; ownerId: string }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const paramContentType = searchParams.get('d') || '';
  const [checkedTags, setCheckedTags] = useState<string[]>([]);
  const [contentType, setContentType] = useState<EContentType>(getContentTypeFromPath(paramContentType));

  function handleContentTypeChange(newValue: EContentType) {
    setCheckedTags([]);
    setContentType(newValue);
    navigate(`?d=${getPathFromContentType(newValue)}`, { replace: true });
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
              <TagStatisticsFilterPanel
                contentType={contentType}
                checked={checkedTags}
                setChecked={setCheckedTags}
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
