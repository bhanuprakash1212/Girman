import  { useState } from "react";
import { Dialog } from "@headlessui/react";
import userData from "../data/users.json";

function SearchResults() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState(userData); // Initially, show all results
  const [selectedUser, setSelectedUser] = useState(null);

  // Handle search query
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const filtered = userData.filter((user) =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredResults(filtered);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch}
          className="px-4 py-2 border rounded w-full sm:w-1/2"
        />
      </div>

      {/* Display Results */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredResults.length > 0 ? (
          filteredResults.map((user, idx) => (
            <div key={idx} className="p-4 bg-white shadow rounded">
              <img src="https://via.placeholder.com/150" alt="placeholder" />
              <h2 className="font-bold">{user.firstName} {user.lastName}</h2>
              <button
                onClick={() => setSelectedUser(user)}
                className="bg-blue-500 text-white py-1 px-2 rounded mt-2"
              >
                View Details
              </button>
            </div>
          ))
        ) : (
          <p>No results found!</p>
        )}
      </div>

      {/* Full Details Popup */}
      {selectedUser && (
        <Dialog
          open={!!selectedUser}
          onClose={() => setSelectedUser(null)}
          className="fixed inset-0 z-10 overflow-y-auto"
        >
          <div className="flex items-center justify-center min-h-screen px-4">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            <div className="bg-white rounded-lg shadow-lg max-w-sm mx-auto p-6">
              <Dialog.Title className="text-lg font-bold">
                {selectedUser.firstName} {selectedUser.lastName}
              </Dialog.Title>
              <Dialog.Description>
                <p><strong>Address:</strong> {selectedUser.address}</p>
                <p><strong>Phone:</strong> {selectedUser.phone}</p>
              </Dialog.Description>
              <button
                onClick={() => setSelectedUser(null)}
                className="mt-4 bg-red-500 text-white py-1 px-3 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
}

export default SearchResults;
