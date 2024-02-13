import { useBlockHourList } from '@/hooks/useCoin';
import {
  Bar,
  BarChart,
  CartesianAxis,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export default function NewBlockBarChart() {
  const { data } = useBlockHourList();
  return (
    <div className="p-4 bg-white rounded-lg shadow-card dark:bg-light-dark">
      <div className="mb-1 text-base font-medium text-gray-900 dark:text-white sm:text-xl">
        New Blocks 24h
      </div>
      <div className="h-64 2xl:h-72 ">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={700} height={600} data={data}>
            <CartesianAxis strokeDasharray="3 3" />
            <Tooltip />
            <YAxis dataKey="blockCount" fontSize={10} />
            <XAxis dataKey="name" fontSize={10} />
            <Bar dataKey="blockCount" fill="#8884d8" label="name" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
