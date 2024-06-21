import { Container, Grid } from "@mui/material";
import { ReactElement, useState } from "react";

import { EContentType } from "../../../global/enums";
import FeaturedNews from "./FeaturedNews";
import TagStatisticsFilterPanel from "./TagStatisticsFilterPanel";

export default function FunctionSection(props: {
  availableContentTypes: EContentType[];
  extraPanels: ReactElement[];
  ownerId: string;
}) {
  const [checkedTags, setCheckedTags] = useState<string[]>([]);
  const [contentType, setContentType] = useState<EContentType>(EContentType.Article);

  function handleContentTypeChange(newValue: EContentType) {
    setCheckedTags([]);
    setContentType(newValue);
  }

  return (
    <Container sx={{ my: 1 }}>
      {props.availableContentTypes && props.availableContentTypes.length > 0 && (
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={9}>
            <FeaturedNews
              ownerId={props.ownerId}
              tags={checkedTags}
              contentType={contentType}
              availableContentTypes={props.availableContentTypes}
              handleContentTypeChange={handleContentTypeChange}
            />
          </Grid>
          <Grid container item sm={false} md={3} spacing={1} direction="column">
            <Grid item>
              <TagStatisticsFilterPanel
                contentType={contentType}
                checked={checkedTags}
                setChecked={setCheckedTags}
                ownerId={props.ownerId}
              />
            </Grid>
            {props.extraPanels.map((c, i) => (
              <Grid item key={`side-panel-${i}`}>
                {c}
              </Grid>
            ))}
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
