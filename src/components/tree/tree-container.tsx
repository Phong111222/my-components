import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';
import { TreeItemProps } from './tree-item';
import { renderTree } from './utils.tsx';

type TreeContext = {
  expandedItems?: TreeItemProps['treeId'][];
  selectedItem?: TreeItemProps['treeId'];
  expandAll?: boolean;
  onClickTreeItem: (treeId: TreeItemProps['treeId']) => void;
  onExpand: (treeId: TreeItemProps['treeId']) => void;
  onClose: (treeId: TreeItemProps['treeId']) => void;
};

type RemoveTreeContextEvent = 'onClickTreeItem' | 'onExpand' | 'onClose';

const TreeContext = createContext<TreeContext>({
  expandedItems: [],
  onClickTreeItem: () => {},
  onExpand: () => {},
  onClose: () => {},
});

const useTreeContext = () => useContext(TreeContext);

export type TreeContainerProps = Omit<TreeContext, RemoveTreeContextEvent> & {
  children: ReactNode;
  onExpand?: (
    treeId: TreeItemProps['treeId'],
    expandedTreeItems: TreeItemProps['treeId'][]
  ) => void;
  onClickTreeItem?: (treeId: TreeItemProps['treeId']) => void;
};

const TreeContainer: FC<TreeContainerProps> = ({
  expandedItems = [],
  selectedItem,
  children,
  onClickTreeItem,
  onExpand,
  expandAll,
}) => {
  const [treeState, setTreeState] = useState<
    Omit<TreeContext, RemoveTreeContextEvent>
  >({
    expandedItems,
    selectedItem,
    expandAll,
  });

  const onSelectItem = useCallback((treeId: TreeItemProps['treeId']) => {
    onClickTreeItem?.(treeId);
    setTreeState((prev) => ({ ...prev, selectedItem: treeId }));
  }, []);

  const onExpandItem = useCallback((treeId: TreeItemProps['treeId']) => {
    setTreeState((prev) => ({
      ...prev,
      expandedItems: [...new Set([...(prev.expandedItems ?? []), treeId])],
    }));

    onExpand?.(treeId, treeState.expandedItems as TreeItemProps['treeId'][]);
  }, []);

  const onClose = useCallback((treeId: TreeItemProps['treeId']) => {
    setTreeState((prev) => ({
      ...prev,
      expandedItems: prev.expandedItems?.filter((ele) => ele !== treeId),
    }));
  }, []);

  return (
    <TreeContext.Provider
      value={{
        expandedItems: treeState.expandedItems,
        selectedItem: treeState.selectedItem,
        expandAll: treeState.expandAll,
        onExpand: onExpandItem,
        onClickTreeItem: onSelectItem,
        onClose,
      }}
    >
      {renderTree(children)}
    </TreeContext.Provider>
  );
};

export default TreeContainer;

export { useTreeContext };
