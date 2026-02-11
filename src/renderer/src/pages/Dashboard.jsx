import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, DollarSign, Package } from 'lucide-react';

const MOCK_DATA = [
  { name: 'Пн', sales: 4000 }, { name: 'Вт', sales: 3000 },
  { name: 'Ср', sales: 2000 }, { name: 'Чт', sales: 2780 },
  { name: 'Пт', sales: 1890 }, { name: 'Сб', sales: 2390 },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Обзор сети</h2>

      {/* КАРТОЧКИ KPI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Выручка" val="150 000 ₽" icon={<DollarSign className="text-green-500"/>} />
        <StatCard label="Активные ТА" val="42 / 45" icon={<Activity className="text-blue-500"/>} />
        <StatCard label="Продажи" val="1,240" icon={<Package className="text-orange-500"/>} />
      </div>

      {/* ГРАФИК */}
      <div className="bg-white p-6 rounded-xl shadow-sm border h-96">
        <h3 className="font-bold text-lg mb-4">Динамика продаж</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={MOCK_DATA}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} dot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function StatCard({ label, val, icon }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-500 font-medium">{label}</p>
        <p className="text-2xl font-bold">{val}</p>
      </div>
      <div className="p-3 bg-gray-50 rounded-lg">{icon}</div>
    </div>
  );
}