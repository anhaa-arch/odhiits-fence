import { useEffect, useState } from 'react';
import { getFences, getGates } from '../api/fenceApi';

const materialLabels = {
  savx: 'Савх',
  dai: 'Дай',
  shon: 'Шон',
  frame: 'Хүрээ',
  panel: 'Самбар',
  support: 'Багана',
};

function OrderForm({ initialType = 'fence', initialId = '' }) {
  const [itemType, setItemType] = useState(initialType);
  const [fenceOptions, setFenceOptions] = useState([]);
  const [gateOptions, setGateOptions] = useState([]);
  const [itemId, setItemId] = useState(initialId);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [gateLength, setGateLength] = useState('');
  const [height, setHeight] = useState(1.5);
  const [install, setInstall] = useState('no');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  useEffect(() => {
    getFences().then(data => setFenceOptions(data));
    getGates().then(data => setGateOptions(data));
  }, []);

  useEffect(() => {
    // Reset itemId when type changes, unless initialId is set
    if (itemType === 'fence' && fenceOptions.length && !initialId) setItemId(fenceOptions[0]._id);
    if (itemType === 'gate' && gateOptions.length && !initialId) setItemId(gateOptions[0]._id);
  }, [itemType, fenceOptions, gateOptions, initialId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');
    setPhoneError('');
    // Phone validation
    if (!/^\d{8}$/.test(phone)) {
      setPhoneError('Утасны дугаар 8 оронтой байх ёстой!');
      setLoading(false);
      return;
    }
    
    const orderData = {
      name,
      phone,
      itemType,
      itemId,
      height: Number(height),
      install,
      comment,
      // Calculated values
      totalSqm: Number(totalSqm.toFixed(2)),
      unitPrice: sqmPrice,
      totalPrice: finalPrice,
      // Type-specific dimensions
      ...(itemType === 'fence' && { length: Number(length), width: Number(width), perimeter }),
      ...(itemType === 'gate' && { gateLength: Number(gateLength) }),
    };

    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Захиалга илгээхэд алдаа гарлаа');
      }
      setSuccess('Таны захиалга амжилттай илгээгдлээ!');
      // Reset form
      setName(''); setPhone(''); setLength(''); setWidth(''); setGateLength(''); setHeight(1.5); setInstall('no'); setComment('');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const options = itemType === 'fence' ? fenceOptions : gateOptions;
  const selected = options.find(opt => opt._id === itemId) || {};
  
  // New calculation logic
  const lengthNum = Number(length) || 0;
  const widthNum = Number(width) || 0;
  const gateLengthNum = Number(gateLength) || 0;
  const heightNum = Number(height) || 0;

  const perimeter = (lengthNum + widthNum) * 2;
  const fenceSqm = perimeter * heightNum;
  const gateSqm = gateLengthNum * heightNum;

  const totalSqm = itemType === 'fence' ? fenceSqm : gateSqm;

  const sqmPrice = selected.prices?.no_installation || 11000;
  const withInstallPrice = selected.prices?.with_installation || (sqmPrice + 12000);
  const finalPrice = install === 'yes' ? 
    Math.round(totalSqm * withInstallPrice) : 
    Math.round(totalSqm * sqmPrice);


  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white rounded-lg shadow p-6 flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-green-900 mb-2">Захиалгын форм</h2>
      {success && <div className="bg-green-100 text-green-900 p-2 rounded-lg border border-green-300 flex items-center gap-2 mb-2"><span>✔️</span>{success}</div>}
      {error && <div className="bg-red-100 text-red-900 p-2 rounded-lg border border-red-300 flex items-center gap-2 mb-2"><span>❌</span>{error}</div>}
      {/* Product details */}
      {selected && selected._id && (
        <div className="border rounded-xl p-4 mb-2 flex gap-4 bg-gray-50 shadow-sm">
          <img src={selected.image || 'https://via.placeholder.com/120x80'} alt={selected.name || selected.type} className="w-32 h-24 object-cover rounded-lg" />
          <div className="flex-1 flex flex-col gap-1">
            <div className="font-bold text-lg">{selected.name || selected.type}</div>
            {selected.unit && <div className="text-sm">Нэгж: {selected.unit}</div>}
            {selected.size && <div className="text-sm">Хэмжээ: {selected.size}</div>}
            {selected.materials && (
              <div className="text-sm">
                <div className="font-medium">Материал:</div>
                <ul className="ml-4 list-disc">
                  {Object.entries(selected.materials).map(([k, v]) => (
                    typeof v === 'object' ? (
                      <li key={k}>{materialLabels[k] || k}: {v.size} / {v.thickness} мм</li>
                    ) : (
                      <li key={k}>{materialLabels[k] || k}: {v}</li>
                    )
                  ))}
                </ul>
              </div>
            )}
            {selected.colors && selected.colors.length > 0 && (
              <div className="text-sm">
                <div className="font-medium">Өнгө:</div>
                <div className="flex gap-2 flex-wrap">
                  {selected.colors.map((c, i) => (
                    <span key={i} className="inline-block w-6 h-6 rounded-full border" style={{ background: c }} title={c}></span>
                  ))}
                </div>
              </div>
            )}
            {selected.description && <div className="text-sm text-gray-700">{selected.description}</div>}
          </div>
        </div>
      )}
      {/* Form fields */}
      <div>
        <label className="block mb-1 font-medium">Захиалагчийн нэр <span className="text-red-500">*</span></label>
        <input value={name} onChange={e => setName(e.target.value)} required className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-500 transition" />
      </div>
      <div>
        <label className="block mb-1 font-medium">Захиалагчийн утас <span className="text-red-500">*</span></label>
        <input value={phone} onChange={e => setPhone(e.target.value.replace(/[^\d]/g, '').slice(0,8))} required className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-500 transition" maxLength={8} inputMode="numeric" pattern="\d{8}" />
        {phoneError && <div className="text-red-500 text-sm mt-1 flex items-center gap-1">❗ {phoneError}</div>}
      </div>
      <div>
        <label className="block mb-1 font-medium">Төрөл</label>
        <select value={itemType} onChange={e => { setItemType(e.target.value); setItemId(''); }} className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-500 transition">
          <option value="fence">Хашаа</option>
          <option value="gate">Хаалга</option>
        </select>
      </div>
      <div>
        <label className="block mb-1 font-medium">{itemType === 'fence' ? 'Хашааны сонголт' : 'Хаалганы сонголт'}</label>
        <select value={itemId} onChange={e => setItemId(e.target.value)} className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-500 transition">
          {options.map(opt => (
            <option key={opt._id} value={opt._id}>{opt.name || opt.type}</option>
          ))}
        </select>
      </div>

      {itemType === 'fence' ? (
        <>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-1 font-medium">Газрын урт (м)</label>
              <input type="number" min={0} value={length} onChange={e => setLength(e.target.value)} className="w-full border rounded px-3 py-2" />
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-medium">Газрын өргөн (м)</label>
              <input type="number" min={0} value={width} onChange={e => setWidth(e.target.value)} className="w-full border rounded px-3 py-2" />
            </div>
          </div>
          <div>
            <label className="block mb-1 font-medium">Хашааны өндөр</label>
            <input type="range" min={1} max={3} step={0.1} value={height} onChange={e => setHeight(e.target.value)} className="w-full" />
            <span className="ml-2">Метр {height}</span>
          </div>
        </>
      ) : (
        <>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-1 font-medium">Хаалганы урт (м)</label>
              <input type="number" min={0} value={gateLength} onChange={e => setGateLength(e.target.value)} className="w-full border rounded px-3 py-2" />
            </div>
          </div>
          <div>
            <label className="block mb-1 font-medium">Хаалганы өндөр</label>
            <input type="range" min={1} max={3} step={0.1} value={height} onChange={e => setHeight(e.target.value)} className="w-full" />
            <span className="ml-2">Метр {height}</span>
          </div>
        </>
      )}

      <div>
        <label className="block mb-1 font-medium">Суулгалт</label>
        <div className="flex gap-4 mt-1">
          <label className="flex items-center gap-2">
            <input type="radio" name="install" value="no" checked={install === 'no'} onChange={() => setInstall('no')} />
            Суулгалтгүй
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="install" value="yes" checked={install === 'yes'} onChange={() => setInstall('yes')} />
            Суулгалттай
          </label>
        </div>
      </div>
      {/* Price breakdown and total below install */}
      {selected && selected._id && (
        <div className="border rounded-lg p-4 mb-2 flex flex-col gap-2 bg-gray-50">
          <div className="text-sm text-gray-700 mb-1">
            {itemType === 'fence' ? (
              <>
                <span>Нийт периметр: <b>{perimeter}</b> м</span><br />
                <span>Хашааны нийт м²: <b>{totalSqm.toFixed(2)}</b> м²</span><br />
              </>
            ) : (
              <>
                <span>Хаалганы нийт м²: <b>{totalSqm.toFixed(2)}</b> м²</span><br />
              </>
            )}
            <span>1 м² үнэ (суулгалтгүй): <b>{sqmPrice.toLocaleString()}₮</b></span><br />
            <span>1 м² үнэ (суулгалттай): <b>{withInstallPrice.toLocaleString()}₮</b></span>
          </div>
          <div className="bg-green-100 rounded px-3 py-2 flex-1">
            <span className="font-bold">Нийт үнэ:</span> <span className="text-green-900 font-bold">{finalPrice.toLocaleString()} ₮</span>
          </div>
        </div>
      )}
      <div>
        <label className="block mb-1 font-medium">Нэмэлт тайлбар</label>
        <textarea value={comment} onChange={e => setComment(e.target.value)} className="w-full border rounded px-3 py-2" rows={2} />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800 mt-4">
        <h3 className="font-bold mb-2 text-base">Төлбөрийн мэдээлэл</h3>
        <p>Захиалгын төлбөрийг доорх данс руу шилжүүлж, захиалгаа баталгаажуулна уу.</p>
        <div className="mt-2 font-mono bg-blue-100 p-3 rounded">
          <p><strong>Дансны дугаар:</strong> 5023284489</p>
          <p><strong>Хүлээн авагч:</strong> Оюунэрдэнэ Батбаатар</p>
          <p><strong>Гүйлгээний утга:</strong> Та өөрийн утасны дугаарыг бичнэ үү.</p>
        </div>
      </div>

      <button type="submit" disabled={loading} className="bg-green-700 hover:bg-green-800 transition-colors text-white rounded-xl px-6 py-3 font-bold mt-2 shadow-lg flex items-center gap-2 disabled:opacity-50">
        {loading && <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>}
        {loading ? 'Илгээж байна...' : 'Захиалах'}
      </button>
    </form>
  );
}

export default OrderForm; 