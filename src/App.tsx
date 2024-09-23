import Tree from './components/tree';

const { TreeContainer, TreeItem } = Tree;

function App() {
  return (
    <TreeContainer>
      <TreeItem treeId={'1'} label={'Test 1'}>
        <TreeItem treeId={'1-1'} label={'Test 1-1'}>
          <TreeItem treeId={'1-1-1'} label={'Test 1-1-1'}>
            <TreeItem treeId={'1-1-1-1'} label={'Test 1-1-1-1'}></TreeItem>
          </TreeItem>
        </TreeItem>
        <TreeItem treeId={'1-2'} label={'Test 1-2'}></TreeItem>
      </TreeItem>
      <TreeItem treeId={'2'} label={'Test 2'}>
        <TreeItem treeId={'2-1'} label={'Test 2-1'}></TreeItem>
      </TreeItem>
      <TreeItem treeId={'3'} label={'Document'}>
        <TreeItem treeId={'3-1'} label={'folder 1'}>
          <TreeItem treeId={'3-1-1'} label={'folder 2'}></TreeItem>
        </TreeItem>
      </TreeItem>
    </TreeContainer>
  );
}

export default App;
