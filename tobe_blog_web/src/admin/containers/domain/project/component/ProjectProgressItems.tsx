import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import { Grid } from "@mui/material";
import { PublicDataService } from "../../../../../services";
import { ProjectProgress } from "../../../../../global/types";
import ProjectProgressItem from "./ProjectProgressItem";
import { InfiniteScrollList } from "../../../components";

export default function ProjectProgressItems(props: {
  projectId: string;
  viewOnly: boolean;
  refreshCode: number;
}) {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const DEFAULT_PAGE_SIZE: number = 6;
  const [loading, setLoading] = useState<boolean>(false);
  const [current, setCurrent] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [progresses, setProgresses] = useState<ProjectProgress[]>([]);

  useEffect(() => {
    loadProgressses(0, []);
  }, [props.projectId, props.refreshCode]);

  const loadProgressses = (
    _current: number,
    _progresses: ProjectProgress[]
  ): void => {
    setLoading(true);
    PublicDataService.getProgressesByProjectId(
      props.projectId,
      DEFAULT_PAGE_SIZE,
      _current + 1
    )
      .then((response) => {
        setProgresses(_progresses.concat(response.data.records));
        setCurrent(response.data.current);
        setTotalPage(response.data.pages);
      })
      .catch(() => {
        enqueueSnackbar(t("project-progress.msg.error"), {
          variant: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <InfiniteScrollList
      loading={loading}
      dataSource={progresses}
      renderItem={(progress: ProjectProgress) => (
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          key={`infinite-scroll-item-${progress.id}`}
        >
          <ProjectProgressItem
            progress={progress}
            viewOnly={props.viewOnly}
            key={progress.id}
          />
        </Grid>
      )}
      hasMore={current < totalPage}
      loadMore={() => loadProgressses(current, progresses)}
    />
  );
}
