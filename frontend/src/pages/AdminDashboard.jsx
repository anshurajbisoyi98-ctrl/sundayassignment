import { useState } from "react";
import { 
  useGetAllRequestsQuery, 
  useAssignAgentMutation,
  useGetDashboardStatsQuery 
} from "../redux/api/pickupApiSlice";
import { useGetAgentsQuery } from "../redux/api/usersApiSlice";

const AdminDashboard = () => {
  const { data: requests, isLoading: reqLoading, refetch } = useGetAllRequestsQuery();
  const { data: agents, isLoading: agentsLoading } = useGetAgentsQuery();
  const { data: stats, isLoading: statsLoading } = useGetDashboardStatsQuery();
  const [assignAgent] = useAssignAgentMutation();

  const [selectedAgent, setSelectedAgent] = useState({});

  const handleAssign = async (requestId) => {
    const agentId = selectedAgent[requestId];
    if (!agentId) {
      alert("Please select an agent");
      return;
    }

    try {
      await assignAgent({ requestId, agentId }).unwrap();
      alert("Agent assigned successfully!");
      refetch();
    } catch (err) {
      alert(err?.data?.message || "Failed to assign agent");
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      REQUESTED: "bg-yellow-900 text-yellow-200",
      SCHEDULED: "bg-blue-900 text-blue-200",
      COLLECTED: "bg-purple-900 text-purple-200",
      RECYCLED: "bg-green-900 text-green-200",
    };
    return colors[status] || "bg-gray-900 text-gray-200";
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-teal-400">Admin Dashboard</h1>

      {/* Statistics Cards */}
      {!statsLoading && stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h3 className="text-sm text-gray-400 mb-1">Total Requests</h3>
            <p className="text-3xl font-bold text-teal-400">{stats.totalRequests}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h3 className="text-sm text-gray-400 mb-1">Total Weight (kg)</h3>
            <p className="text-3xl font-bold text-teal-400">{stats.totalWeight.toFixed(1)}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h3 className="text-sm text-gray-400 mb-1">Pending Requests</h3>
            <p className="text-3xl font-bold text-yellow-400">
              {stats.statusStats.find(s => s._id === "REQUESTED")?.count || 0}
            </p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h3 className="text-sm text-gray-400 mb-1">Completed</h3>
            <p className="text-3xl font-bold text-green-400">
              {stats.statusStats.find(s => s._id === "RECYCLED")?.count || 0}
            </p>
          </div>
        </div>
      )}

      {/* Category Breakdown */}
      {!statsLoading && stats && stats.categoryStats.length > 0 && (
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-bold mb-4 text-teal-400">Category-wise Breakdown</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.categoryStats.map((cat) => (
              <div key={cat._id} className="bg-gray-900 p-4 rounded border border-gray-700">
                <h4 className="font-semibold text-white mb-2">{cat.name}</h4>
                <p className="text-sm text-gray-400">Requests: {cat.count}</p>
                <p className="text-sm text-gray-400">Weight: {cat.weight.toFixed(1)} kg</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Requests */}
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <h2 className="text-xl font-bold mb-4 text-teal-400">All Pickup Requests</h2>
        {reqLoading ? (
          <p>Loading...</p>
        ) : requests?.length === 0 ? (
          <p>No requests found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-2 text-gray-300">Citizen</th>
                  <th className="text-left py-3 px-2 text-gray-300">Item Type</th>
                  <th className="text-left py-3 px-2 text-gray-300">Weight (kg)</th>
                  <th className="text-left py-3 px-2 text-gray-300">Address</th>
                  <th className="text-left py-3 px-2 text-gray-300">Date</th>
                  <th className="text-left py-3 px-2 text-gray-300">Status</th>
                  <th className="text-left py-3 px-2 text-gray-300">Assign Agent</th>
                </tr>
              </thead>
              <tbody>
                {requests?.map((req) => (
                  <tr key={req._id} className="border-b border-gray-700">
                    <td className="py-3 px-2 text-white">{req.citizen?.username}</td>
                    <td className="py-3 px-2 text-white">{req.itemType?.name}</td>
                    <td className="py-3 px-2 text-white">{req.approxWeight}</td>
                    <td className="py-3 px-2 text-gray-400 text-xs max-w-xs truncate">{req.address}</td>
                    <td className="py-3 px-2 text-gray-400">{new Date(req.preferredDate).toLocaleDateString()}</td>
                    <td className="py-3 px-2">
                      <span className={`text-xs px-2 py-1 rounded ${getStatusColor(req.status)}`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      {req.status === "REQUESTED" ? (
                        <div className="flex gap-2">
                          <select
                            value={selectedAgent[req._id] || ""}
                            onChange={(e) => setSelectedAgent({ ...selectedAgent, [req._id]: e.target.value })}
                            className="px-2 py-1 bg-gray-900 border border-gray-700 rounded text-white text-xs"
                          >
                            <option value="">Select Agent</option>
                            {!agentsLoading && agents?.map((agent) => (
                              <option key={agent._id} value={agent._id}>{agent.username}</option>
                            ))}
                          </select>
                          <button
                            onClick={() => handleAssign(req._id)}
                            className="px-3 py-1 bg-teal-600 hover:bg-teal-700 text-white rounded text-xs"
                          >
                            Assign
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-xs">{req.agent?.username || "N/A"}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
