import { useState, useEffect } from 'react';
import { db } from '../firebase'; 
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { motion } from 'framer-motion';

// --- CHANGE THIS PIN ---
const SECRET_PIN = "7774"; 

export function SecretDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === SECRET_PIN) {
      setIsAuthenticated(true);
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
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLogs(data);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
    setLoading(false);
  };

  const formatTime = (timestamp: any) => {
    if (!timestamp) return 'Just now';
    return new Date(timestamp.seconds * 1000).toLocaleString();
  };

  if (!isAuthenticated) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white p-4">
        <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full max-w-xs">
          <h2 className="text-xl font-mono text-center mb-4">RESTRICTED ACCESS</h2>
          <input 
            type="password" 
            value={pinInput}
            onChange={(e) => setPinInput(e.target.value)}
            className="p-3 rounded bg-gray-900 border border-gray-700 text-white text-center tracking-[0.5em] focus:border-emerald-500 outline-none transition-colors"
            placeholder="PIN"
            autoFocus
          />
          <button type="submit" className="bg-white text-black py-3 rounded font-bold hover:bg-gray-200 transition-colors">
            UNLOCK
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-100 p-4 md:p-8 font-mono">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-emerald-400">Visitor Logs</h1>
            <p className="text-gray-500 text-sm mt-1">Real-time database feed</p>
          </div>
          <button onClick={fetchLogs} className="text-xs border border-gray-800 px-4 py-2 rounded hover:bg-gray-900 transition-colors w-full md:w-auto">
            REFRESH DATA
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800">
            <h3 className="text-gray-500 text-xs uppercase tracking-wider mb-1">Total Events</h3>
            <p className="text-2xl font-bold">{logs.length}</p>
          </div>
          <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800 col-span-2 md:col-span-2">
            <h3 className="text-gray-500 text-xs uppercase tracking-wider mb-1">Latest Activity</h3>
            <p className="text-lg text-emerald-300 truncate">
              {logs[0] ? `${logs[0].eventType} - ${logs[0].detail}` : "Waiting for data..."}
            </p>
          </div>
        </div>

        <div className="bg-gray-900/30 rounded-xl overflow-hidden border border-gray-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-900 text-gray-400 uppercase text-xs">
                <tr>
                  <th className="px-6 py-4">Time</th>
                  <th className="px-6 py-4">Event</th>
                  <th className="px-6 py-4">Detail</th>
                  <th className="px-6 py-4 hidden md:table-cell">Device</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {loading ? (
                   <tr><td colSpan={4} className="p-8 text-center text-gray-500">Fetching satellite data...</td></tr>
                ) : logs.map((log) => (
                  <motion.tr 
                    key={log.id} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap text-xs md:text-sm">
                      {formatTime(log.timestamp)}
                    </td>
                    <td className="px-6 py-4 font-medium text-emerald-400">
                      {log.eventType}
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {log.detail}
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-xs hidden md:table-cell max-w-[200px] truncate" title={log.userAgent}>
                      {log.screenSize} • {log.userAgent?.includes("Mobile") ? "Mobile" : "Desktop"}
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
