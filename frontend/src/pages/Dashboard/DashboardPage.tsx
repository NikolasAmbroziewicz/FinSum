import H1 from "src/shared/components/Headers/H1";
import H2 from "src/shared/components/Headers/H2";

import IncomesPanel from "src/features/Dashboard/components/IncomesPanel";
import ExpenesePanel from "src/features/Dashboard/components/ExpensesPanel";
import CryptoCurrencyPanel from "src/features/Dashboard/components/CryptoCurrencyPanel";
import NetWorthPanel from "src/features/Dashboard/components/NetWorthPanel";

const DashboardPage = () => {
  return (
    <div className="flex flex-col smplus:h-full h-[200vh]">
      <H1>Dashboard</H1>
      <H2 styles="pb-3">Your Investments Data</H2>
      <div className="
        grid gap-2 
        grid-cols-1 grid-rows-4 h-[200vh]
        smplus:grid-cols-2 smplus:auto-rows-max smplus:h-full smplus:grid-rows-2
      ">
        <IncomesPanel />
        <ExpenesePanel />
        <CryptoCurrencyPanel />
        <NetWorthPanel />
      </div>
    </div>
  );
};

export default DashboardPage;
