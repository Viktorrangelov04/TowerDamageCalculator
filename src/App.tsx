import { useState } from "react";
import Header from "./components/header.tsx";
import OverviewCard from "./components/OverviewCard.tsx";
import DamageMenu from "./components/DamageMenu.tsx";
import CritMenu from "./components/CritMenu.tsx";
import UWMenu from "./components/UWMenu.tsx";


function App() {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [totalCritMultiplier, setTotalCritMultiplier] = useState(1);

  return (
    <div className="max-w-6xl mx-auto p-8">
    <Header/>
    <div className="w-4/5 mx-auto my-8 grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      <OverviewCard 
        name="Damage" 
        value={"1"}
        onClick={() => setActiveTab('damage')} 
        active={activeTab === 'damage'} 
      />
      <OverviewCard 
        name="Crit bonus" 
        value={`${totalCritMultiplier.toFixed(2)}x`}
        onClick={() => setActiveTab('crit')} 
        active={activeTab === 'crit'} 
      />
      <OverviewCard 
        name="UW damage" 
        value={"1"}
        onClick={() => setActiveTab('uw')} 
        active={activeTab === 'uw'} 
      />
    </div>
    <div className="bg-white rounded-xl border p-6 shadow-sm min-h-[300px]">
        {!activeTab && (
          <p className="text-center text-muted-foreground pt-10">
            Select a category above to start calculating.
          </p>
        )}
        
        {activeTab === 'damage' && <DamageMenu />}
        {activeTab === 'crit' && <CritMenu onUpdate={(val) => setTotalCritMultiplier(val)} />}
        {activeTab === 'uw' && <UWMenu />}
      </div>
    </div>
  );
}

export default App
