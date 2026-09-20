import { useState } from "react";
import { useCreateRequestMutation, useGetMyRequestsQuery, useGetCategoriesQuery } from "../redux/api/pickupApiSlice";
import { useGetMyWalletQuery } from "../redux/api/rewardApiSlice";

const CitizenDashboard = () => {
  const { data: categories, isLoading: catLoading } = useGetCategoriesQuery();
  const { data: myRequests, isLoading: reqLoading } = useGetMyRequestsQuery();
  const { data: wallet, isLoading: walletLoading } = useGetMyWalletQuery();
  
  const [createRequest, { isLoading: isCreating }] = useCreateRequestMutation();

  const [itemType, setItemType] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [approxWeight, setApproxWeight] = useState(1);
  const [address, setAddress] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [msg, setMsg] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createRequest({ itemType, quantity, approxWeight, address, preferredDate }).unwrap();
      setMsg("Pickup request submitted successfully!");
      setItemType("");
      setQuantity(1);
      setApproxWeight(1);
      setAddress("");
      setPreferredDate("");
    } catch (err) {
      setMsg(err?.data?.message || err.error);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Reward Wallet - Full width on mobile, 1 column on large screens */}
      <div className="lg:col-span-3 bg-gray-800 p-6 rounded-lg border border-gray-700">
        <h2 className="text-xl font-bold mb-4 text-teal-400">💰 Reward Wallet</h2>
        {walletLoading ? (
          <p>Loading wallet...</p>
        ) : (
          <div>
            <div className="bg-gradient-to-r from-teal-900 to-blue-900 p-6 rounded-lg mb-4">
              <p className="text-sm text-gray-300 mb-1">Available Points</p>
              <p className="text-4xl font-bold text-white">{wallet?.balance || 0}</p>
            </div>
            
            {wallet?.history && wallet.history.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3 text-gray-300">Transaction History</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {wallet.history.slice().reverse().map((txn, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-gray-900 p-3 rounded">
                      <div>
                        <p className="text-sm text-white">{txn.description}</p>
                        <p className="text-xs text-gray-400">{new Date(txn.date).toLocaleDateString()}</p>
                      </div>
                      <span className={`font-semibold ${txn.type === "EARNED" ? "text-green-400" : "text-red-400"}`}>
                        {txn.type === "EARNED" ? "+" : "-"}{txn.points} pts
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Request Form */}
      <div className="lg:col-span-1 bg-gray-800 p-6 rounded-lg border border-gray-700">
        <h2 className="text-xl font-bold mb-4 text-teal-400">Request a Pickup</h2>
        {msg && <div className="bg-teal-900/50 text-teal-200 px-4 py-2 rounded mb-4">{msg}</div>}
        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm text-gray-300">Category</label>
            <select
              value={itemType}
              onChange={(e) => setItemType(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white"
              required
            >
              <option value="">Select Category</option>
              {!catLoading && categories?.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm text-gray-300">Quantity</label>
              <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white" required />
            </div>
            <div className="w-1/2">
              <label className="block text-sm text-gray-300">Approx Weight (kg)</label>
              <input type="number" min="0.1" step="0.1" value={approxWeight} onChange={(e) => setApproxWeight(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white" required />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-300">Address</label>
            <textarea value={address} onChange={(e) => setAddress(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white" required />
          </div>
          <div>
            <label className="block text-sm text-gray-300">Preferred Date</label>
            <input type="date" value={preferredDate} onChange={(e) => setPreferredDate(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white" required />
          </div>
          <button type="submit" disabled={isCreating} className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded">
            {isCreating ? "Submitting..." : "Submit Request"}
          </button>
        </form>
      </div>

      {/* My Requests */}
      <div className="lg:col-span-2 bg-gray-800 p-6 rounded-lg border border-gray-700">
        <h2 className="text-xl font-bold mb-4 text-teal-400">My Requests</h2>
        {reqLoading ? <p>Loading...</p> : myRequests?.length === 0 ? <p>No requests found.</p> : (
          <ul className="flex flex-col gap-3">
            {myRequests?.map((req) => (
              <li key={req._id} className="bg-gray-900 p-4 rounded border border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-white">{req.itemType?.name} (x{req.quantity})</span>
                  <span className={`text-xs px-2 py-1 rounded ${req.status === 'RECYCLED' ? 'bg-green-900 text-green-200' : 'bg-yellow-900 text-yellow-200'}`}>{req.status}</span>
                </div>
                <div className="text-sm text-gray-400">
                  <p>Date: {new Date(req.preferredDate).toLocaleDateString()}</p>
                  <p>Weight: {req.approxWeight} kg</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CitizenDashboard;
