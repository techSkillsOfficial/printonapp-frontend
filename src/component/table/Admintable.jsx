import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  FiEdit,
  FiMail,
  FiBook,
  FiUser,
  FiBarChart,
  FiUsers,
} from "react-icons/fi";

function Admintable() {
  const [thesis, setThesis] = useState([]);
  const token = useSelector((state) => state.auth.user.username.access_token);
  const [editingId, setEditingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCollegeId, setSelectedCollegeId] = useState(""); // State for selected college ID
  const [formData, setFormData] = useState({ collegeId: "" }); // State for form data
  const [loadingColleges, setLoadingColleges] = useState(true);
  const [colleges, setColleges] = useState([]);
  useEffect(() => {
    // Fetch data from API on component mount
    fetchData();
  }, [currentPage, selectedCollegeId]);

  const handleEdit = (id) => {
    setEditingId(id); // Set the ID of the item being edited
  };

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await axios.get(
          "https://printonapp-gacom.ondigitalocean.app/homepage/colleges"
        );
        console.log("response.dataresponse.data", response.data);
        setColleges(response.data.data); // assuming the response is an array of colleges
      } catch (error) {
        console.error("Error fetching colleges:", error);
      } finally {
        setLoadingColleges(false);
      }
    };

    fetchColleges();
  }, []);

  const fetchData = async () => {
    try {
      const params = {
        pageSize: 10,
        page: currentPage,
        collegeId: selectedCollegeId,
      };
      const response = await axios.get(
        "https://printonapp-gacom.ondigitalocean.app/admin/thesis",
        {
          params: params,

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response.data", response.data.data);
      setThesis(response.data.data.data);
      setTotalPages(response.data.data.total_page);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleGetById = async (id) => {
    try {
      const response = await axios.get(
        `https://printonapp-gacom.ondigitalocean.app/admin/thesis/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("res", response.data.data);
      setThesis(response.data.data);
      // Handle response
    } catch (error) {
      console.error("Error fetching data by ID:", error);
    }
  };

  const handleSave = async (id, newDescription) => {
    try {
      // Send API request to update the description

      const response = await axios.patch(
        `https://printonapp-gacom.ondigitalocean.app/admin/thesis`,
        { description: newDescription, id: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Reset editing state
      console.log("response", response);
      setEditingId(null);
      // Refetch data or update local state
      fetchData();
    } catch (error) {
      console.error("Error updating description:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleCollegeChange = (e) => {
    setSelectedCollegeId(e.target.value);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "BOOKED":
        return "bg-amber-100 text-amber-800";
      case "IN PROGRESS":
        return "bg-cyan-100 text-cyan-800";
      case "COMPLETED":
        return "bg-green-100 text-green-800";
      default:
        return "bg-red-100 text-red-800"; // Default color if status doesn't match any case
    }
  };
  return (
    <div className="min-h-screen ">
      {/* <div className="grid sm:grid-cols-12 grid-cols-6 gap-1 min-h-screen "> */}
      <div className=" min-h-screen m-2 border border-gray-100">
        <section className="mx-auto w-full max-w-7xl px-4 py-4">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div>
              <h2 className="text-lg font-semibold">Thesis and Dissertation</h2>
              <p className="mt-1 text-sm text-gray-700">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatibus doloremque facere quo architecto deleniti enim sunt
                aperiam iure itaque. Vel a facere perferendis vero commodi,
                itaque inventore molestiae officia tempore?
              </p>
            </div>
            <div className="mt-2 ">
              <select
                name="collegeId"
                value={formData.collegeId}
                onChange={(e) => {
                  setFormData({ ...formData, collegeId: e.target.value });
                  handleCollegeChange(e);
                }}
                className="flex m-1 h-8 w-46 rounded-md border border-gray-300 bg-transparent px-3 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select College Name</option>
                {/* Render colleges options */}
                {loadingColleges ? (
                  <option value="" disabled>
                    Loading Colleges...
                  </option>
                ) : (
                  colleges.map((college) => (
                    <option key={college.id} value={college.id}>
                      {college.collegeName}
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>
          <div className="mt-6 flex flex-col">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                        >
                          Id
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                        >
                          Qty
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                        >
                          Order Date
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                        >
                          Description
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                        >
                          Estimated Cost
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                        >
                          PDF
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                        >
                          Edit
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {thesis.map((person) => (
                        <tr key={person.id}>
                          <td className="whitespace-nowrap px-4 py-4">
                            <button onClick={() => handleGetById(person.id)}>
                              {person.id}
                            </button>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4">
                            <button onClick={() => handleGetById(person.id)}>
                              {person.quantity}
                            </button>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4">
                            {person.created_on}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4">
                            <span
                              className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusColor(
                                person.status
                              )}`}
                            >
                              {person.status}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4">
                            {/* Conditionally render input field if currently editing */}
                            {editingId === person.id ? (
                              <textarea
                                type="text"
                                value={person.description}
                                onChange={(e) => {
                                  const newDescription = e.target.value;
                                  // Update local state immediately
                                  setThesis((prevThesis) =>
                                    prevThesis.map((item) =>
                                      item.id === person.id
                                        ? {
                                            ...item,
                                            description: newDescription,
                                          }
                                        : item
                                    )
                                  );
                                }}
                                className="w-full h-24 resize-none border rounded-md p-2"
                              />
                            ) : (
                              // Render description as text otherwise
                              <button onClick={() => handleGetById(person.id)}>
                                <span>
                                  {person.description.length > 50
                                    ? person.description.substring(0, 50) +
                                      "..."
                                    : person.description}
                                </span>
                              </button>
                            )}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4">
                            {person.estimate_cost}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4">
                            <Link
                              to={person.pdf}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                width="25"
                                height="25"
                                src="https://img.icons8.com/office/30/export-pdf.png"
                                alt="export-pdf"
                              />
                            </Link>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4">
                            {/* <a href="#">
                                                            <img
                                                                width="25"
                                                                height="25"
                                                                src="https://img.icons8.com/ultraviolet/40/edit.png"
                                                                alt="edit"
                                                            />
                                                        </a> */}

                            {/* Render other action buttons */}
                            {editingId === person.id ? (
                              <button
                                onClick={() =>
                                  handleSave(person.id, person.description)
                                }
                              >
                                <img
                                  width="30"
                                  height="30"
                                  src="https://img.icons8.com/ultraviolet/40/save.png"
                                  alt="save"
                                />
                              </button>
                            ) : (
                              <button onClick={() => handleEdit(person.id)}>
                                <img
                                  width="25"
                                  height="25"
                                  src="https://img.icons8.com/ultraviolet/40/edit.png"
                                  alt="edit"
                                />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="mr-2 px-3 py-1 bg-gray-200 rounded-md  hover:bg-indigo-200 hover:text-white"
            >
              Prev
            </button>
            <span className="mr-2">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-200 rounded-md  hover:bg-indigo-200 hover:text-white"
            >
              Next
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Admintable;
