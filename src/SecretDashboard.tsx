import { useState } from 'react';
import { db } from './firebase'; // <--- FIXED: uses ./ instead of ../
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { motion } from 'framer-motion';

const SECRET_PIN = "2025"; 

export function SecretDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === SECRET_PIN) {
      setIsAuthenticated(true);
      // CRITICAL: Mark this browser as Admin so tracking ignores it
      localStorage.setItem('portfolio_admin_user', 'true');
      fetchLogs();
    } else {
      alert("Access Denied");
      setPinInput("");
    }
  };

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, "visitors"), 
        orderBy("timestamp", "desc"), 
        limit(50)
      );
      
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => {
        const d = doc.data();
        // Calculate duration if exitTime exists
        let durationDisplay = d.duration || "Active";
        if (d.timestamp && d.exitTime) {
          const start = d.timestamp.seconds;
          const end = d.exitTime.seconds;
          const diff = end - start;
          durationDisplay = diff < 60 ? `${diff}s` : `${Math.floor(diff/60)}m ${diff%60}s`;
        }
        return { id: doc.id, ...d, durationDisplay };
      });
      setLogs(data);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
    setLoading(false);
  };

  const formatTime = (timestamp: any) => {
    if (!timestamp) return 'Just now';
    return new Date(timestamp.seconds * 1000).toLocaleString('en-US', {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white p-4">
        <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full max-w-xs">
          <h2 className="text-xl font-mono text-center mb-4 text-emerald-500">IDENTIFY YOURSELF</h2>
          <input 
            type="password" 
            value={pinInput}
            onChange={(e) => setPinInput(e.target.value)}
            className="p-3 rounded bg-gray-900 border border-gray-700 text-white text-center tracking-[0.5em] focus:border-emerald-500 outline-none transition-colors"
            placeholder="PIN"
            autoFocus
          />
          <button type="submit" className="bg-white text-black py-3 rounded font-bold hover:bg-emerald-400 transition-colors">
            ACCESS TERMINAL
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-100 p-2 md:p-8 font-mono text-xs md:text-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
          <div>
            <h1 className="text-xl md:text-3xl font-bold text-emerald-400">Traffic Controller</h1>
            <p className="text-gray-500 mt-1">Admin Mode: Active (Tracking Disabled)</p>
          </div>
          <button onClick={fetchLogs} className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors">
            REFRESH SIGNAL
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-900/50 p-4 rounded border border-gray-800">
            <h3 className="text-gray-500 uppercase tracking-wider mb-2">Total Hits</h3>
            <p className="text-3xl font-bold text-white">{logs.length}</p>
          </div>
          <div className="bg-gray-900/50 p-4 rounded border border-gray-800">
            <h3 className="text-gray-500 uppercase tracking-wider mb-2">Downloads</h3>
            <p className="text-3xl font-bold text-blue-400">
              {logs.filter(l => l.eventType?.includes("Download")).length}
            </p>
          </div>
        </div>

        {/* Main Table */}
        <div className="bg-gray-900/30 rounded-xl overflow-hidden border border-gray-800 shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-900 text-gray-400 uppercase">
                <tr>
                  <th className="px-6 py-4">Time</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Action</th>
                  <th className="px-6 py-4">Duration</th>
                  <th className="px-6 py-4 hidden md:table-cell">Device</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                {loading ? (
                   <tr><td colSpan={5} className="p-8 text-center text-emerald-500 animate-pulse">Scanning frequencies...</td></tr>
                ) : logs.map((log) => (
                  <motion.tr 
                    key={log.id} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`hover:bg-white/5 transition-colors ${log.eventType.includes('Download') ? 'bg-blue-900/10' : ''}`}
                  >
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                      {formatTime(log.timestamp)}
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-300 flex items-center gap-2">
                       {log.location === "Unknown" ? "🌐 Unknown" : `📍 ${log.location}`}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        log.eventType === "Page Visit" ? "text-emerald-400 bg-emerald-400/10" : "text-blue-400 bg-blue-400/10"
                      }`}>
                        {log.eventType}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">{log.detail}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-400">
                      {log.durationDisplay}
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-xs hidden md:table-cell max-w-[150px] truncate">
                      {log.userAgent?.includes("Mobile") ? "📱 Mobile" : "💻 Desktop"}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
