import { useEffect, useState } from 'react';
import api from '../api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/stats/summary').then(res => setData(res.data));
  }, []);

  if (!data) return "Загрузка...";

  return (
    <div className="space-y-6">
      <h2 className="text-2xl">Личный кабинет. Главная</h2>

      <div className="grid grid-cols-3 gap-6">
        {/* 1. Эффективность (Gauge) */}
        <div className="bg-white p-4 rounded shadow border-t-2 border-blue-400">
          <h3 className="font-bold border-b pb-2 mb-4">Эффективность сети</h3>
          <div className="h-40 flex flex-col items-center">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                   <Pie data={[{v: 100}]} innerRadius={60} outerRadius={80} startAngle={180} endAngle={0} dataKey="v" fill="#00df00" />
                </PieChart>
             </ResponsiveContainer>
             <span className="text-xs -mt-10 font-bold text-gray-600 text-center">Работающих автоматов - 100%</span>
          </div>
        </div>

        {/* 2. Состояние (Donut) */}
        <div className="bg-white p-4 rounded shadow border-t-2 border-blue-400 text-center">
          <h3 className="font-bold border-b pb-2 mb-4">Состояние сети</h3>
          <div className="h-40 relative flex items-center justify-center">
             <div className="absolute font-bold text-blue-600 text-center">Под вопросом<br/>{data.statuses?.length}</div>
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                   <Pie data={data.statuses} innerRadius={50} outerRadius={70} dataKey="value">
                      {data.statuses.map((_, i) => <Cell key={i} fill={['#00df00', '#ff0000', '#3b82f6'][i]} />)}
                   </Pie>
                </PieChart>
             </ResponsiveContainer>
          </div>
        </div>

        {/* 3. Сводка */}
        <div className="bg-white p-4 rounded shadow border-t-2 border-blue-400">
          <h3 className="font-bold border-b pb-2 mb-4">Сводка</h3>
          <div className="text-[11px] space-y-1">
            <div className="flex justify-between"><span>Денег в ТА</span><b>{data.cashInMachine} р.</b></div>
            <div className="flex justify-between"><span>Сдача в ТА</span><b>12129 р.</b></div>
            <div className="flex justify-between"><span>Выручка, сегодня</span><b>{data.revenueToday} р.</b></div>
            <div className="flex justify-between text-blue-500 pt-1"><span>Выручка, вчера</span><b>{data.revenueYesterday} р.</b></div>
          </div>
        </div>

        {/* 4. График (на 2 колонки) */}
        <div className="col-span-2 bg-white p-4 rounded shadow border-t-2 border-blue-400">
          <h3 className="font-bold mb-4">Динамика продаж за последние 10 дней</h3>
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={data.chartData}>
                <XAxis dataKey="day" tick={{fontSize: 10}} />
                <YAxis tick={{fontSize: 10}} />
                <Tooltip />
                <Bar dataKey="val" fill="#a2e9ff" stroke="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 5. Новости */}
        <div className="bg-white p-4 rounded shadow border-t-2 border-blue-400">
           <h3 className="font-bold border-b pb-2 mb-4">Новости</h3>
           <div className="space-y-4 text-[10px]">
              <div><span className="text-gray-400">29.01.25</span> <p className="text-blue-600 underline">Терминалы KitPos получили эквайринг...</p></div>
              <div><span className="text-gray-400">31.12.24</span> <p className="text-blue-600 underline">Новогоднее поздравление от Kit Vending</p></div>
           </div>
        </div>
      </div>
    </div>
  );
}