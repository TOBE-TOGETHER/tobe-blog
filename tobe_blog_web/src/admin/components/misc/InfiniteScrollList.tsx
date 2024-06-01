import { Grid } from "@mui/material";
import { ReactNode, useEffect } from "react";

export default function InfiniteScrollList<T>(props: {
  loading: boolean;
  dataSource: Array<T>;
  renderItem: (data: T) => ReactNode;
  renderSkeleton?: () => ReactNode;
  hasMore: boolean;
  loadMore: () => void;
}) {
  const { loading, dataSource, renderItem, renderSkeleton, loadMore, hasMore } =
    props;

  useEffect(() => {
    const scrollEvent = () => {
      if (!hasMore || loading) return;
      if (
        document.documentElement.scrollHeight <=
        document.documentElement.clientHeight +
          document.documentElement.scrollTop
      ) {
        console.log("列表触底");
        loadMore();
      }
    };
    window.addEventListener("scroll", scrollEvent);
    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };
  }, [hasMore, loading]);

  return (
    <Grid container sx={{ overFlowY: "auto" }} spacing={1}>
      {dataSource.map((data) => {
        return renderItem(data);
      })}
      {loading && new Array(4).fill(0).map(() => renderSkeleton?.())}
    </Grid>
  );
}
