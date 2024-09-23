import { Children, createElement, ReactNode } from 'react';

import TreeItem, { TreeItemProps } from './tree-item';

// const generateFlatArray = (arr: ReactNode[], result: ReactNode[] = []) => {
//   arr.forEach((ele) => {
//     if (Array.isArray(ele)) {
//       generateFlatArray(ele, result);
//     } else {
//       result.push(ele);
//     }
//   });

//   return result;
// };

// const generateFlatArray2 = (arr: any[], result: any[] = []) => {
//   arr.forEach((ele) => {
//     result.push(ele.label);
//     if (ele.children?.length) {
//       generateFlatArray2(ele.children, result);
//     }
//   });

//   return result;
// };

const DEFAULT_MARGIN_LEFT = 0;

export const renderTree = (
  nodes: ReactNode,
  result: ReactNode[] = [],
  props: {
    marginLeft: number;
    parentId: TreeItemProps['treeId'];
  } = {
    marginLeft: DEFAULT_MARGIN_LEFT,
    parentId: 'root',
  }
): ReactNode => {
  Children.forEach(nodes, (child) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { children, ...rest } = (child as any).props as TreeItemProps;

    result.push(
      createElement(TreeItem, {
        ...rest,
        style: {
          marginLeft: props.marginLeft,
        },
        parentId: props.parentId as TreeItemProps['treeId'],
        key: rest.treeId,
      } as TreeItemProps)
    );

    if (Children.toArray(children).length) {
      renderTree(Children.toArray(children), result, {
        marginLeft: props.marginLeft + 5,
        parentId: rest.treeId,
      });
    }
  });

  return result;
};
