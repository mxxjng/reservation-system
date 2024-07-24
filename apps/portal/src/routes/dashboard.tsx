import { AreaChartComponent } from "@/components/Charts/AreaChart";
import { BarChartComponent } from "@/components/Charts/BarChart";
import { BarChartMixedComponent } from "@/components/Charts/BarChartMixed";
import { PieChartComponent } from "@/components/Charts/PieChart";

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-foreground">Dashboard Page</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <AreaChartComponent />
        <BarChartComponent />
        <PieChartComponent />
        <BarChartMixedComponent />
      </div>
    </div>
  );
};
export default Dashboard;
