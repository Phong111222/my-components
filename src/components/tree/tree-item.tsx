import { FC, HTMLProps, ReactNode, useEffect, useId, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import { useTreeContext } from './tree-container';

export type TreeItemProps = {
  children?: ReactNode;
  label?: ReactNode;
  treeId?: string | number;
  parentId?: TreeItemProps['treeId'];
} & HTMLProps<HTMLDivElement>;

const TreeItem: FC<Omit<TreeItemProps, 'parentId'>> = ({
  treeId,
  children = '',
  className,
  label,
  ...props
}) => {
  const {
    onClickTreeItem,
    onExpand,
    selectedItem,
    expandedItems,
    expandAll,
    onClose,
  } = useTreeContext();

  const autoGenId = useId();

  const id = treeId || autoGenId;

  const { parentId, ...elementProps } = props as TreeItemProps;

  const mergedClassNames = useMemo(() => {
    const selectedClassName = id === selectedItem ? 'bg-slate-200' : '';

    return twMerge(className, 'cursor-pointer', selectedClassName);
  }, [selectedItem, id, className]);

  const onClick: HTMLProps<HTMLDivElement>['onClick'] = () => {
    onClickTreeItem(treeId);

    if (expandedItems?.includes(treeId)) {
      onClose(treeId);
    } else {
      onExpand(treeId);
    }
  };

  useEffect(() => {
    if (expandAll) {
      onExpand(treeId);
    }
  }, [expandAll, onExpand, treeId]);

  if (!expandedItems?.includes(parentId) && parentId !== 'root') {
    return null;
  }

  return (
    <>
      <div {...elementProps} onClick={onClick} className={mergedClassNames}>
        {label}
      </div>
      {expandedItems?.includes(id) && children}
    </>
  );
};

export default TreeItem;
