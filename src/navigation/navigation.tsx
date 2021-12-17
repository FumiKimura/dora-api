import './navigation.css';

interface NavigationProps {
  setJSON: (json: any) => void;
}

function Navigation(prop: NavigationProps) {
  //Hooks

  //Handler
  const handleReset = (): void => {
    prop.setJSON({});
  }
  //HTML
  return (
    <div className="navigation">
      <button className="resetBtn" type="button" onClick={handleReset}>Reset</button>
    </div>
  );
}

export default Navigation;