import { useState } from "react";
import userData from "../data/users.json"; // Import user data
import Logo from "../assets/logo.png";
import Main from "../assets/main.png";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // For popup modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For mobile menu

  // Update results dynamically as the user types
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredResults([]); // Clear results if search box is empty
    } else {
      const filtered = userData.filter((user) =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(query)
      );
      setFilteredResults(filtered);
    }
  };

  // Open modal and set selected user details
  const handleFetchDetails = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-100">
      {/* Navigation Bar */}
      <header className="w-full flex items-center justify-between p-4 bg-white shadow-md">
        <div className="flex items-center">
          <img src={Logo} alt="Girman Logo" className="h-10 mr-4" />
          <h1 className="text-xl font-bold">Girman Technologies</h1>
        </div>
        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 text-lg font-medium">
          <a href="#" className="text-blue-500 hover:underline">SEARCH</a>
          <a href="https://girmantech.com" className="text-gray-700 hover:underline">WEBSITE</a>
          <a href="https://linkedin.com/company/girmantech" className="text-gray-700 hover:underline">LINKEDIN</a>
          <a href="mailto:contact@girmantech.com" className="text-gray-700 hover:underline">CONTACT</a>
        </nav>
        {/* Hamburger Menu */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col space-y-4 p-4 bg-white shadow-md">
          <a href="#" className="text-blue-500 hover:underline">SEARCH</a>
          <a href="https://girmantech.com" className="text-gray-700 hover:underline">WEBSITE</a>
          <a href="https://linkedin.com/company/girmantech" className="text-gray-700 hover:underline">LINKEDIN</a>
          <a href="mailto:contact@girmantech.com" className="text-gray-700 hover:underline">CONTACT</a>
        </div>
      )}

      {/* Center Section */}
      <div className="flex flex-col items-center mt-20">
        <div className="flex items-center max-sm:hidden">
          <img src={Main} alt="Girman Logo" className="h-24 mb-4" />
          <h1 className="text-8xl font-semibold text-gray-800">Girman</h1>
        </div>

        {/* Search Bar */}
        <div className="relative w-full max-w-xl mt-8 max-sm:mt-0">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearch}
            className="w-full h-[50px] px-4 text-lg border rounded shadow focus:outline-none"
          />
        </div>

        {/* Responsive Grid Results */}
        {filteredResults.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 px-4 w-full max-w-6xl">
            {filteredResults.map((user, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mb-4" />
                  <h2 className="text-lg font-bold">{user.firstName} {user.lastName}</h2>
                  <p className="text-sm text-gray-500">{user.address}</p>
                </div>
                <div className="flex flex-col items-center mt-4">
                  <p className="text-sm text-gray-500">📞 {user.phone}</p>
                  <button
                    onClick={() => handleFetchDetails(user)}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white text-sm rounded shadow hover:bg-blue-600"
                  >
                    Fetch Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for User Details */}
        {isModalOpen && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
              <h2 className="text-lg font-bold mb-4">Fetch Details</h2>
              <p><strong>Name:</strong> {selectedUser.firstName} {selectedUser.lastName}</p>
              <p><strong>Location:</strong> {selectedUser.address}</p>
              <p><strong>Contact Number:</strong> {selectedUser.phone}</p>
              <p><strong>Profile Image:</strong> <span className="italic">Not available</span></p>
              <button
                onClick={closeModal}
                className="mt-4 px-4 py-2 bg-red-500 text-white text-sm rounded shadow hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
