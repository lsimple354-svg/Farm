import React, { useState } from 'react';
import {
  ShieldAlert,
  Send,
  PlusCircle,
  CheckCircle2,
  TrendingUp,
  Store,
  Users,
  Settings,
  Bell,
} from 'lucide-react';

export const AdminCmsPage: React.FC = () => {
  const [alertTitle, setAlertTitle] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('High');
  const [alertCounty, setAlertCounty] = useState('Uasin Gishu');
  const [alertMessage, setAlertMessage] = useState('');
  const [publishedAlerts, setPublishedAlerts] = useState([
    {
      id: 'a-1',
      title: 'Fall Armyworm Early Whorl Scouting Alert',
      severity: 'Critical',
      county: 'Uasin Gishu & Trans Nzoia',
      date: 'Today 08:00 AM',
    },
    {
      id: 'a-2',
      title: 'Subsidized Top-dressing CAN Consignment Arrived at NCPB Eldoret',
      severity: 'Info',
      county: 'Uasin Gishu',
      date: 'Yesterday',
    },
  ]);

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertTitle.trim() || !alertMessage.trim()) return;

    setPublishedAlerts([
      {
        id: `a-${Date.now()}`,
        title: alertTitle.trim(),
        severity: alertSeverity,
        county: alertCounty,
        date: 'Just now',
      },
      ...publishedAlerts,
    ]);

    setAlertTitle('');
    setAlertMessage('');
    alert('Advisory bulletin published to all farmers in county feed!');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-900 text-emerald-300 font-bold text-xs">
              OFFICER CMS
            </span>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
              County Agricultural Extension CMS Portal
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Publish official alerts, moderate agro-dealer verification, and broadcast weather advisories.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-full border border-emerald-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Authenticated Officer: Dr. Beatrice Wangari</span>
        </div>
      </div>

      {/* Main CMS Form & Live Bulletins */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Publish Alert Form (2 cols) */}
        <form
          onSubmit={handlePublish}
          className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4"
        >
          <div className="flex items-center gap-2 text-stone-900 pb-2 border-b border-stone-100">
            <Bell className="w-5 h-5 text-emerald-700" />
            <h2 className="font-serif font-bold text-base">Broadcast Advisory / Subsidy Bulletin</h2>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Bulletin Title *</label>
            <input
              type="text"
              required
              value={alertTitle}
              onChange={(e) => setAlertTitle(e.target.value)}
              placeholder="e.g. Urgent Pest Scouting Alert: Tuta Absoluta outbreak in greenhouses"
              className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Target County</label>
              <select
                value={alertCounty}
                onChange={(e) => setAlertCounty(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl bg-stone-50 border border-stone-300"
              >
                <option value="Uasin Gishu">Uasin Gishu</option>
                <option value="Trans Nzoia">Trans Nzoia</option>
                <option value="Nakuru">Nakuru</option>
                <option value="Kiambu">Kiambu</option>
                <option value="All Counties">All Counties (National)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Severity Level</label>
              <select
                value={alertSeverity}
                onChange={(e) => setAlertSeverity(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl bg-stone-50 border border-stone-300"
              >
                <option value="Critical">🔴 Critical (Pest / Disease Outbreak)</option>
                <option value="High">🟠 High Priority (Weather Warning)</option>
                <option value="Info">🟢 Informational (Subsidy & Field Day)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Advisory Content & Extension Protocol *
            </label>
            <textarea
              required
              rows={4}
              value={alertMessage}
              onChange={(e) => setAlertMessage(e.target.value)}
              placeholder="Provide exact technical guidance, recommended chemicals/fertilizers, and precautionary steps..."
              className="w-full text-xs sm:text-sm p-3 rounded-xl bg-stone-50 border border-stone-300 focus:outline-hidden"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition"
          >
            <Send className="w-4 h-4" />
            <span>Publish Broadcast to Farmer Feeds</span>
          </button>
        </form>

        {/* Live Active Bulletins */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
          <h3 className="font-serif font-bold text-base text-stone-900">Active Published Bulletins</h3>

          <div className="space-y-3">
            {publishedAlerts.map((b) => (
              <div
                key={b.id}
                className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                      b.severity === 'Critical'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {b.severity}
                  </span>
                  <span className="text-stone-400 text-[10px]">{b.date}</span>
                </div>
                <h4 className="font-bold text-stone-900 leading-snug">{b.title}</h4>
                <p className="text-[11px] text-stone-500">Region: {b.county}</p>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
            <span className="font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>SMS Broadcast Integration</span>
            </span>
            <p className="text-[11px] text-emerald-800">
              Critical bulletins are automatically synced with KALRO's bulk SMS farmer gateway.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
