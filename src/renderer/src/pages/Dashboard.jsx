import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Activity, Package, DollarSign } from 'lucide-react';

const COLORS = ['#22c55e', '#ef4444', '#3b82f6'];

export default function Dashboard() {
  const salesData = [
    { day: '01.02', amount: 2400 }, { day: '02.02', amount: 3000 },
    { day: '03.02', amount: 4500 }, { day: '04.02', amount: 2800 },
    { day: '05.02', amount: 3200 }, { day: '06.02', amount: 5000 },
  ];

  const statusData = [
    { name: 'Работает', value: 80 },
    { name: 'Ошибка', value: 10 },
    { name: 'ТО', value: 10 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Обзор сети</h2>
        <div className="text-sm text-slate-500 bg-white px-3 py-1 rounded shadow-sm border">Обновлено: сегодня в 12:00</div>
      </div>

      {/* КАРТОЧКИ KPI */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Эффективность', val: '92%', color: 'border-green-500', icon: <Activity className="text-green-500" /> },
          { label: 'Выручка (мес)', val: '128 400 ₽', color: 'border-blue-500', icon: <DollarSign className="text-blue-500" /> },
          { label: 'Всего аппаратов', val: '45 шт.', color: 'border-purple-500', icon: <Package className="text-purple-500" /> },
          { label: 'Продаж сегодня', val: '154', color: 'border-orange-500', icon: <TrendingUp className="text-orange-500" /> }
        ].map((card, i) => (
          <div key={i} className={`bg-white p-5 rounded-xl shadow-sm border-l-4 ${card.color} flex justify-between items-center`}>
            <div>
              <div className="text-slate-500 text-sm font-medium">{card.label}</div>
              <div className="text-2xl font-extrabold">{card.val}</div>
            </div>
            {card.icon}
          </div>
        ))}
      </div>

      {/* ГРАФИКИ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="font-bold text-lg mb-6">Динамика прибыли</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="font-bold text-lg mb-6">Состояние аппаратов</h3>
          <div className="h-72 flex flex-col items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusData} innerRadius={70} outerRadius={90} paddingAngle={5} dataKey="value">
                  {statusData.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-2">
              {statusData.map((s, i) => (
                <div key={i} className="flex items-center gap-2 text-sm font-medium">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  {s.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}