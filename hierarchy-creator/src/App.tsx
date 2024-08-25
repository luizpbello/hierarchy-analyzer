import HierarchyEditor from './components/HierarchyEditor/HierarchyEditor';
import LayoutProvider from './providers/LayoutProvider';

const App = () => {
  return (
    <LayoutProvider>
      <div className="space-y-8">
        <h1 className="text-4xl font-bold text-center text-gray-800">Crie sua árvore</h1>
        <HierarchyEditor />
      </div>
    </LayoutProvider>
  );
};

export default App;
