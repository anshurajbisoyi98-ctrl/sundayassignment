import { useState } from "react";
import { useGetAssignedRequestsQuery, useUpdateStatusMutation } from "../redux/api/pickupApiSlice";

const AgentDashboard = () => {
  const { data: requests, isLoading, refetch } = useGetAssignedRequestsQuery();
  const [updateStatus] = useUpdateStatusMutation();

  const [finalWeights, setFinalWeights] = useState({});

  const handleStatusUpdate = async (requestId, newStatus) => {
    try {
      const finalWeight = finalWeights[requestId];
      await updateStatus({ requestId, status: newStatus, finalWeight }).unwrap();
      alert(`Status updated to ${newStatus}`);
      refetch();
    } catch (err) {
      alert(err?.data?.message || "Failed to update status");
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

  const getNextStatus = (currentStatus) => {
    const workflow = {
      SCHEDULED: "COLLECTED",
      COLLECTED: "RECYCLED",
    };
    return workflow[currentStatus];
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-teal-400">Collection Agent Dashboard</h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <h3 className="text-sm text-gray-400 mb-1">Total Assigned</h3>
          <p className="text-3xl font-bold text-teal-400">{requests?.length || 0}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <h3 className="text-sm text-gray-400 mb-1">Pending Pickup</h3>
          <p className="text-3xl font-bold text-blue-400">
            {requests?.filter(r => r.status === "SCHEDULED").length || 0}
          </p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <h3 className="text-sm text-gray-400 mb-1">Completed</h3>
          <p className="text-3xl font-bold text-green-400">
            {requests?.filter(r => r.status === "RECYCLED").length || 0}
          </p>
        </div>
      </div>

      {/* Assigned Pickups */}
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <h2 className="text-xl font-bold mb-4 text-teal-400">My Assigned Pickups</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : requests?.length === 0 ? (
          <p>No pickups assigned yet.</p>
        ) : (
          <div className="space-y-4">
            {requests?.map((req) => (
              <div key={req._id} className="bg-gray-900 p-4 rounded border border-gray-700">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg text-white">{req.itemType?.name}</h3>
                    <p className="text-sm text-gray-400">Citizen: {req.citizen?.username}</p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded ${getStatusColor(req.status)}`}>
                    {req.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 text-sm">
                  <div>
                    <span className="text-gray-400">Quantity:</span>
                    <p className="text-white">{req.quantity} items</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Approx Weight:</span>
                    <p className="text-white">{req.approxWeight} kg</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Scheduled Date:</span>
                    <p className="text-white">{new Date(req.preferredDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Reward Points:</span>
                    <p className="text-white">{req.rewardPoints || 0}</p>
                  </div>
                </div>

                <div className="mb-3">
                  <span className="text-gray-400 text-sm">Address:</span>
                  <p className="text-white">{req.address}</p>
                </div>

                {/* Action Buttons */}
                {req.status !== "RECYCLED" && (
                  <div className="flex gap-3 items-center">
                    {req.status === "COLLECTED" && (
                      <input
                        type="number"
                        step="0.1"
                        placeholder="Final weight (kg)"
                        value={finalWeights[req._id] || ""}
                        onChange={(e) => setFinalWeights({ ...finalWeights, [req._id]: e.target.value })}
                        className="px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white"
                      />
                    )}
                    {getNextStatus(req.status) && (
                      <button
                        onClick={() => handleStatusUpdate(req._id, getNextStatus(req.status))}
                        className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded"
                      >
                        Mark as {getNextStatus(req.status)}
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentDashboard;
