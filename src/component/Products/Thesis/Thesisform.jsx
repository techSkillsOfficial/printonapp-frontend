import { Bold } from "lucide-react";
import React, { useState } from "react";
import { pdfjs } from "react-pdf";

const Thesisform = () => {
  const [printColor, setPrintColor] = useState("B&W");
  const [colorPages, setColorPages] = useState("");
  const [paperType, setPaperType] = useState("Bond");
  const [pdfFile, setPdfFile] = useState(null);
  const [description, setDescription] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [numPages, setNumPages] = useState(null);
  const [pricePerColorPage, setPricePerColorPage] = useState(7); // Default price for Color page
  const [selectedQty, setSelectedQty] = useState("");

  // Calculate the base price for hard binding
  let tempTotalPrice = 200;

  // Calculate price based on paper type
  const ShowPrice = () => {
    // Calculate the base price for hard binding
    let calculatedTotalPrice = 200;

    // Calculate price based on paper type
    if (paperType === "Bond") {
      calculatedTotalPrice +=
        numPages * (printColor === "B&W" ? 2.5 : pricePerColorPage);
    } else {
      calculatedTotalPrice +=
        numPages * (printColor === "B&W" ? 1 : pricePerColorPage);
    }

    // Add additional calculations or conditions as needed based on other form inputs

    // Update the total price in the state
    setTotalPrice(calculatedTotalPrice * selectedQty);
  };

  // Load the PDF worker script dynamically
  pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

  const handlePdfFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
      calculateNumPages(file);
    } else {
      // Reset state if the selected file is not a PDF
      setPdfFile(null);
      setNumPages(null);
    }
  };

  const calculateNumPages = (file) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const buffer = e.target.result;
      const typedArray = new Uint8Array(buffer);
      const pdf = await pdfjs.getDocument({ data: typedArray }).promise;
      setNumPages(pdf.numPages);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // You can access form data in the state variables, including numPages
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Thesis Section</h2>
      <form onSubmit={handleOrderSubmit}>
        {/* Form Section */}
        <div className="mb-4">
          <label
            htmlFor="printColor"
            className="block text-sm font-medium text-gray-700"
          >
            Choose print color
          </label>
          <select
            id="printColor"
            name="printColor"
            value={printColor}
            onChange={(e) => setPrintColor(e.target.value)}
            className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="B&W">B&W</option>
            <option value="Color">Color</option>
            <option value="Both">Both</option>
          </select>
        </div>

        {/* Color Pages Section */}
        {printColor === "Both" && (
          <div className="mb-4">
            <label
              htmlFor="colorPages"
              className="block text-sm font-medium text-gray-700"
            >
              Add page number which you need to color
            </label>
            <input
              type="text"
              id="colorPages"
              name="colorPages"
              value={colorPages}
              onChange={(e) => setColorPages(e.target.value)}
              className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        )}

        {/* Price Chart Section (assuming it's a separate component) */}
        {/* Please replace this with your actual price chart component */}
        <div className="mb-4">
          <p className="text-lg font-semibold mb-2">Price Chart</p>
          {/* Your price chart component goes here */}
        </div>

        {/* Paper Type Section */}
        <div className="mb-4">
          <label
            htmlFor="paperType"
            className="block text-sm font-medium text-gray-700"
          >
            Choose paper type
          </label>
          <select
            id="paperType"
            name="paperType"
            value={paperType}
            onChange={(e) => setPaperType(e.target.value)}
            className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="Bond">Bond</option>
            <option value="Normal">Normal</option>
          </select>
        </div>

        {/* PDF Upload Section */}
        <div className="mb-4">
          <label
            htmlFor="pdfFile"
            className="block text-sm font-medium text-gray-700"
          >
            Upload PDF
          </label>
          <input
            type="file"
            id="pdfFile"
            name="pdfFile"
            onChange={handlePdfFileChange}
            accept=".pdf"
            className="mt-1 block w-full"
          />
          {pdfFile && numPages && (
            <div className="mt-2 text-sm text-green-900">
              Selected PDF with <>{numPages}</> pages.
            </div>
          )}
        </div>

        {/* Description and Comment Section */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
        </div>

        {/* Quantity Selection Section */}
        <div className="mb-4">
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-700"
          >
            Select Quantity
          </label>
          <select
            id="quantity"
            name="quantity"
            value={selectedQty}
            onChange={(e) => setSelectedQty(e.target.value)}
            className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="" disabled>
              Select quantity
            </option>
            {[1, 2, 3, 4, 5].map((qty) => (
              <option key={qty} value={qty}>
                {qty}
              </option>
            ))}
          </select>
        </div>

        {/* Total Price Section */}
        <div className="mb-4">
          <label
            htmlFor="totalPrice"
            className="block text-sm font-medium text-gray-700"
          >
            Total Price
          </label>
          <span className="inline-block mt-1 px-3 py-2 text-lg font-semibold text-gray-800 bg-gray-100 border rounded-md">
            ₹{totalPrice}
          </span>
          {/* calculate amount  */}
          <button
            type="button"
            onClick={() => ShowPrice()}
            className="mt-2 bg-green-500 hover:bg-green-600 text-white text-sm py-1 px-2 rounded-md focus:outline-none focus:ring focus:border-indigo-300 transition duration-300 ease-in-out ml-10 "
          >
            Calculate Amount
          </button>
        </div>

        {/* Order Button Section */}
        <div className="mb-4">
          <button
            type="submit"
            disabled={!pdfFile} // Disable the button if no PDF file is selected
            className={`${
              {pdfFile }
                ? "bg-indigo-500 hover:bg-indigo-600"
                : "bg-gray-300 cursor-not-allowed"
            } text-white py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-indigo-300`}
          >
            Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default Thesisform;
