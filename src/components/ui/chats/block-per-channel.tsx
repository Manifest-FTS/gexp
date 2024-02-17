import Select from '@/components/search/select';
import { useChannelBlockList } from '@/hooks/useCoin';
import { createOptionArray } from '@/utils';
import { useState } from 'react';
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import Loader from '../loader';

const renderLegend = ({ payload }: any) => (
  <div className="max-h-60  overflow-y-auto no-scroll-bar">
    {payload.map(({ value, color }: any) => (
      <div className="flex gap-1 items-center">
        <div className="h-2 w-2" style={{ backgroundColor: color }} />
        <p className="max-w-[200px] overflow-ellipsis text-[10px]">{value}</p>
      </div>
    ))}
  </div>
);

export default function BlockPieChart() {
  const [interval, setInterval] = useState('24 hour');
  const { data, loading } = useChannelBlockList(interval);
  return (
    <div className="p-4 bg-white rounded-lg shadow-card dark:bg-light-dark">
      <div className="flex justify-between">
        <div className="mb-1 text-base font-medium text-gray-900 dark:text-white sm:text-xl">
          Blocks per Channel
        </div>
        <Select
          value={interval}
          className="min-w-[110px]"
          setValue={(e) => setInterval(e as string)}
          options={createOptionArray(['24 hour', '6 hour', '1 hour'])}
        />
      </div>
      <div className="h-64 2xl:h-72">
        {(loading || !data.length) && (
          <div className="w-full h-full flex justify-center items-center">
            {loading ? <Loader /> : <div>No data found !!</div>}
          </div>
        )}
        {!!data.length && (
          <ResponsiveContainer>
            <PieChart width={600} height={600}>
              <Tooltip />
              <Legend
                layout="vertical"
                verticalAlign="middle"
                align="right"
                content={renderLegend}
              />
              <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={'100%'}
                style={{ outline: 'none' }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
