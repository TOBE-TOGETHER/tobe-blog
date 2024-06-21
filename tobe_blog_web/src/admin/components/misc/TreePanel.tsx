import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import Collapse from "@mui/material/Collapse";
import { SvgIconProps } from "@mui/material/SvgIcon";
import { alpha, styled } from "@mui/material/styles";
import { TransitionProps } from "@mui/material/transitions";
import { TreeItem, TreeItemProps, treeItemClasses } from "@mui/x-tree-view/TreeItem";
import { animated, useSpring } from "@react-spring/web";

import { SimpleTreeView } from "@mui/x-tree-view";
import { RenderTree } from "../../../global/types";

export default function TreePanel(props: {
  nodes: RenderTree;
  onNodeFocus: (event: React.SyntheticEvent | null, value: string) => void;
}) {
  const renderTree = (nodes: RenderTree) => (
    <StyledTreeItem key={nodes.id} itemId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </StyledTreeItem>
  );
  return (
    <SimpleTreeView
      aria-label="customized"
      defaultExpandedItems={["root"]}
      slots={{ collapseIcon: MinusSquare, expandIcon: PlusSquare, endIcon: CloseSquare}}
      sx={{
        height: 264,
        flexGrow: 1,
        maxWidth: 400,
        overflowY: "auto",
      }}
      onItemFocus={props.onNodeFocus}
    >
      {renderTree(props.nodes)}
    </SimpleTreeView>
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
  <TreeItem {...props} slots={{ groupTransition: TransitionComponent}} slotProps={{groupTransition: {timeout: 600}}}/>
))(({ theme }) => ({
  [`& .${treeItemClasses.iconContainer}`]: {
    "& .close": {
      opacity: 0.3,
    },
  },
  [`& .${treeItemClasses.groupTransition}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}));
