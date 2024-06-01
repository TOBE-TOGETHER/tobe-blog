import { SvgIconProps } from "@mui/material/SvgIcon";
import { alpha, styled } from "@mui/material/styles";
import TreeView from "@mui/lab/TreeView";
import TreeItem, { TreeItemProps, treeItemClasses } from "@mui/lab/TreeItem";
import Collapse from "@mui/material/Collapse";
import { useSpring, animated } from "@react-spring/web";
import { TransitionProps } from "@mui/material/transitions";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";

import { RenderTree } from "../../../../global/types";

export default function TreePanel(props: {
  nodes: RenderTree;
  onNodeFocus: (event: React.SyntheticEvent, value: string) => void;
}) {
  const renderTree = (nodes: RenderTree) => (
    <StyledTreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </StyledTreeItem>
  );
  return (
    <TreeView
      aria-label="customized"
      defaultExpanded={["root"]}
      defaultCollapseIcon={<MinusSquare />}
      defaultExpandIcon={<PlusSquare />}
      defaultEndIcon={<CloseSquare />}
      sx={{
        height: 264,
        flexGrow: 1,
        maxWidth: 400,
        overflowY: "auto",
        backgroundColor: "grey",
      }}
      onNodeFocus={props.onNodeFocus}
    >
      {renderTree(props.nodes)}
    </TreeView>
  );
}

function MinusSquare(props: SvgIconProps) {
  return <RemoveIcon fontSize="inherit" sx={{ width: 14, height: 14 }} />;
}

function PlusSquare(props: SvgIconProps) {
  return <AddIcon fontSize="inherit" sx={{ width: 14, height: 14 }} />;
}

function CloseSquare(props: SvgIconProps) {
  return <CloseIcon fontSize="inherit" sx={{ width: 14, height: 14 }} />;
}

function TransitionComponent(props: TransitionProps) {
  const style = useSpring({
    from: {
      opacity: 0,
      transform: "translate3d(20px,0,0)",
    },
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
    },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

const StyledTreeItem = styled((props: TreeItemProps) => (
  <TreeItem {...props} TransitionComponent={TransitionComponent} />
))(({ theme }) => ({
  [`& .${treeItemClasses.iconContainer}`]: {
    "& .close": {
      opacity: 0.3,
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}));
