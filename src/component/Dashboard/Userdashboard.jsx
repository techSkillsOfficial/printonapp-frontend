// Dashboard.jsx

import React from "react";
import { Link } from "react-router-dom";
import { Profile } from "../Profile/Profile";
import { Thesis } from "../Products/Thesis/Thesis";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Wallet,
  Newspaper,
  BellRing,
  Paperclip,
  Brush,
  Wrench,
} from "lucide-react";
const thesis = [
  {
    id: 1,
    name: "John Doe",
    qty: 3,
    orderDate: "2024-02-20",
    status: "IN PROGRESS",
    description: "Lorem ipsum dolor sit amet",
    estimatedCost: "100",
    image: "https://via.placeholder.com/150", // URL to the image
  },
  {
    id: 3,
    name: "Jane Smith",
    qty: 1,
    orderDate: "2024-02-18",
    status: "BOOKED",
    description: "Consectetur adipiscing elit lorem ipsum dolor sit amet lorem",
    estimatedCost: "50",
    image: "https://via.placeholder.com/150", // URL to the image
  },
  {
    id: 3,
    name: "Jane Smith",
    qty: 1,
    orderDate: "2023-02-18",
    status: "COMPLETED",
    description: "Consectetur adipiscing elit",
    estimatedCost: "450",
    image: "https://via.placeholder.com/150", // URL to the image
  },
  {
    id: 3,
    name: "Jane Smith",
    qty: 1,
    orderDate: "2023-02-18",
    status: "COMPLETED",
    description: "Consectetur adipiscing elit",
    estimatedCost: "450",
    image: "https://via.placeholder.com/150", // URL to the image
  },
  {
    id: 3,
    name: "Jane Smith",
    qty: 1,
    orderDate: "2023-02-18",
    status: "CANCELLED",
    description: "Consectetur adipiscing elit",
    estimatedCost: "450",
    image: "https://via.placeholder.com/150", // URL to the image
  },
  {
    id: 3,
    name: "Jane Smith",
    qty: 1,
    orderDate: "2023-02-18",
    status: "COMPLETED",
    description: "Consectetur adipiscing elit",
    estimatedCost: "450",
    image: "https://via.placeholder.com/150", // URL to the image
  },
  {
    id: 3,
    name: "Jane Smith",
    qty: 1,
    orderDate: "2023-02-18",
    status: "COMPLETED",
    description: "Consectetur adipiscing elit",
    estimatedCost: "450",
    image: "https://via.placeholder.com/150", // URL to the image
  },
  // Add more dummy data as needed
];

const Userashboard = () => {
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
  const navigate = useNavigate();
  return (
    <div className="grid sm:grid-cols-12 grid-cols-6 gap-1 min-h-screen ">
      <div className="sm:col-span-2 col-span-2 border border-gray-100">
        left side
      </div>

      <div className="sm:col-span-10 col-span-4 border border-gray-100">
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
            <div>{/* Add new employee button */}</div>
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
                            {person.qty}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4">
                            {person.orderDate}
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
                            {person.description}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4">
                            {person.estimatedCost}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4">
                            <a href="#">
                              <img
                                width="25"
                                height="25"
                                src="https://img.icons8.com/office/30/export-pdf.png"
                                alt="export-pdf"
                              />
                            </a>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4">
                            <a href="#">
                              <img
                                width="25"
                                height="25"
                                src="https://img.icons8.com/ultraviolet/40/edit.png"
                                alt="edit"
                              />
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Userashboard;
