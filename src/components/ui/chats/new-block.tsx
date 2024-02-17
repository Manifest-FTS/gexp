import Select from '@/components/search/select';
import { useBlockHourList } from '@/hooks/useCoin';
import { createOptionArray } from '@/utils';
import { useMemo, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianAxis,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import Loader from '../loader';

export default function NewBlockBarChart() {
  const [interval, setInterval] = useState('24 hour');
  const { data, loading } = useBlockHourList(interval);

  const isEmpty = useMemo(
    () => data.every(({ blockCount }) => !blockCount),
    [data],
  );
  return (
    <div className="p-4 bg-white rounded-lg shadow-card dark:bg-light-dark">
      <div className="flex justify-between">
        <div className="mb-1 text-base font-medium text-gray-900 dark:text-white sm:text-xl">
          New Blocks
        </div>
        <Select
          value={interval}
          className="min-w-[110px]"
          setValue={(e) => setInterval(e as string)}
          options={createOptionArray(['24 hour', '6 hour', '1 hour'])}
        />
      </div>
      <div className="h-64 2xl:h-72 relative">
        {(loading || isEmpty) && (
          <div className="w-full h-full flex justify-center items-center">
            {loading ? <Loader /> : <div>No data found !!</div>}
          </div>
        )}
        {!isEmpty && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart width={700} height={600} data={data}>
              <CartesianAxis strokeDasharray="3 3" />
              <Tooltip />
              <YAxis dataKey="blockCount" fontSize={10} width={25} />
              <XAxis dataKey="name" fontSize={10} height={10} />
              <Bar dataKey="blockCount" fill="#8884d8" label="name" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
