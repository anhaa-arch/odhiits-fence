import { useEffect, useState } from 'react';
import { fetchFences } from '../api/fenceApi';

function PriceCalculator() {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState(1.5);
  const [fenceOptions, setFenceOptions] = useState([]);
  const [selectedFence, setSelectedFence] = useState(null);
  const [install, setInstall] = useState('no');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFences()
      .then(data => {
        setFenceOptions(data);
        setSelectedFence(data[0] || null);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  // Convert to number for calculation, but allow empty string for input
  const lengthNum = Number(length) || 0;
  const widthNum = Number(width) || 0;
  const area = lengthNum * widthNum;
  const fencePrice = selectedFence ? (install === 'yes' ? selectedFence.prices.with_installation : selectedFence.prices.no_installation) : 0;
  const total = area * fencePrice * (height / 1.5);

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl mx-auto py-8">
      {/* Left: Form */}
      <div className="flex-1 bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6 text-green-900">Үнийн Тооцоолуур</h2>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Газрын урт (Метр)</label>
          <input type="number" min={0} value={length} onChange={e => {
            const v = e.target.value;
            if (v === '' || Number(v) >= 0) setLength(v);
          }} className="w-full border rounded px-3 py-2" />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Газрын өргөн (Метр)</label>
          <input type="number" min={0} value={width} onChange={e => {
            const v = e.target.value;
            if (v === '' || Number(v) >= 0) setWidth(v);
          }} className="w-full border rounded px-3 py-2" />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Хашааны өндөр</label>
          <div className="flex items-center gap-2">
            <input type="range" min={1} max={3} step={0.1} value={height} onChange={e => setHeight(Number(e.target.value))} className="w-full" />
            <span className="ml-2">Метр {height}</span>
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Хашааны сонголт</label>
          {loading ? <div>Уншиж байна...</div> : error ? <div className="text-red-500">{error}</div> : (
            <select className="w-full border rounded px-3 py-2" value={selectedFence?._id || ''} onChange={e => setSelectedFence(fenceOptions.find(f => f._id === e.target.value))}>
              {fenceOptions.map(f => (
                <option key={f._id} value={f._id}>{f.name} - {f.prices.no_installation.toLocaleString()}₮</option>
              ))}
            </select>
          )}
          <div className="text-xs text-gray-500 mt-1">Хашааны сонголт нь суурьлуулалтгүй үнээр бодогдож байгаа болно.</div>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Хашаа суулгалт</label>
          <div className="flex gap-4 mt-1">
            <label className="flex items-center gap-2">
              <input type="radio" name="install" value="no" checked={install === 'no'} onChange={() => setInstall('no')} />
              Суулгалтгүй үнэ
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="install" value="yes" checked={install === 'yes'} onChange={() => setInstall('yes')} />
              Суулгалттай үнэ
            </label>
          </div>
        </div>
      </div>
      {/* Right: Summary */}
      <div className="flex-1 bg-gray-50 rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6 text-green-900">Нийт</h2>
        <table className="w-full mb-4 text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-1">Name</th>
              <th className="text-right py-1">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Газрын Урт (Метр)</td>
              <td className="text-right">{length}</td>
            </tr>
            <tr>
              <td>Газрын Өргөн (Метр)</td>
              <td className="text-right">{width}</td>
            </tr>
            <tr>
              <td>Хашааны Өндөр</td>
              <td className="text-right">{height} Метр</td>
            </tr>
            <tr>
              <td>Хашааны Сонголт</td>
              <td className="text-right">{selectedFence ? selectedFence.prices.no_installation.toLocaleString() + '₮' : '-'}</td>
            </tr>
            <tr>
              <td colSpan={2} className="text-xs text-gray-500">{selectedFence ? `${selectedFence.name} - ${selectedFence.prices.no_installation.toLocaleString()}₮` : ''}</td>
            </tr>
            <tr>
              <td>Хашаа Суулгалт</td>
              <td className="text-right">{install === 'yes' ? 'Суулгалттай үнэ' : 'Суулгалтгүй үнэ'}</td>
            </tr>
          </tbody>
        </table>
        <div className="border-t pt-4 flex justify-between items-center">
          <span className="font-bold text-lg">Нийт Үнэ</span>
          <span className="font-bold text-2xl text-green-900">{total.toLocaleString()} ₮</span>
        </div>
      </div>
    </div>
  );
}

export default PriceCalculator; 