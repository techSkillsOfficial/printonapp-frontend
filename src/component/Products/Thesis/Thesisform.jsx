import axios from "axios";
import { Bold } from "lucide-react";
import React, { useEffect, useState } from "react";
import { pdfjs } from "react-pdf";
import { useSelector } from "react-redux";
import PopupComponent from "../../popup/popup";
import { useNavigate } from "react-router-dom";
import Loader from "../../Loader/Loader";

const Thesisform = () => {
  const [printColor, setPrintColor] = useState("");
  const [colorPages, setColorPages] = useState("");
  const [paperType, setPaperType] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [description, setDescription] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [numPages, setNumPages] = useState(null);
  const [pricePerColorPage, setPricePerColorPage] = useState(7); // Default price for Color page
  const [selectedQty, setSelectedQty] = useState("");
  const token = useSelector((state) => state.auth.user.username.access_token)
  const [showPopup, setshowPopup] = useState(false)
  const [popupMessage, setPopupMessage] = useState('');
  const [filepath,setfilepath]=useState('')
  const [loading,setloading]=useState(false)
  const [errors, setErrors] = useState({});



  const [touched, setTouched] = useState({
    printColor: false,
    colorPages: false,
    pdfFile: false,
    selectedQty: false,
  });

  // Calculate the base price for hard binding
  let tempTotalPrice = 200;
  const navigate = useNavigate();
  // Calculate price based on paper type
  const ShowPrice = () => {
    // Calculate the base price for hard binding
    let calculatedTotalPrice = 200;

    // Calculate price based on paper type
    if (paperType === "Bond") {
      calculatedTotalPrice +=
        numPages * (printColor === "B&W" ? 3 : 8);
    } else {
      calculatedTotalPrice +=
        numPages * (printColor === "B&W" ? 2 : 7);
    }

    // Add additional calculations or conditions as needed based on other form inputs

    // Update the total price in the state
    setTotalPrice(calculatedTotalPrice * selectedQty);
  };

  // Load the PDF worker script dynamically
  pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;


  

    const validateForm = () => {
      let formIsValid = true;
      const errors = {};
  
      if (!printColor) {
        errors.printColor = "Please choose print color.";
        formIsValid = false;
      }
  
      if (printColor === "Both" && !colorPages) {
        errors.colorPages = "Please enter the page number which you need to color.";
        formIsValid = false;
      }
  
      if (!paperType) {
        errors.paperType = "Please choose paper type.";
        formIsValid = false;
      }
  
      if (!pdfFile) {
        errors.pdfFile = "Please upload a PDF file.";
        formIsValid = false;
      }
  
      if (!selectedQty) {
        errors.selectedQty = "Please select quantity.";
        formIsValid = false;
      }
  
      setErrors(errors);
      return formIsValid;
    };

    useEffect(()=>{
    const isFormTouched = Object.values(touched).some(value => value);
    if (isFormTouched) {

      validateForm()
    }
  },[selectedQty,pdfFile,paperType,printColor,touched])


  const handlePdfFileChange = (e) => {
    
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
      calculateNumPages(file);
      setTouched((prevTouched) => ({
        ...prevTouched,
        pdfFile: true,
      }));

      
      console.log("token",token)
      
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
  const handleClosePopup = () => {
    console.log("MPP")
    navigate("/userdashboard");
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    if (!pdfFile) {
      return;
    }
    // const formDatapdf = new FormData();
    // formDatapdf.append('pdf', pdfFile);
    // axios.post('https://printonapp-backend-production.up.railway.app/admin/upload-pdf', formDatapdf, {
    //     headers: {
          
    //       Authorization: `Bearer ${token}`
    //     },
    //   })
    //     .then(response => {
    //       // Handle successful upload
    //       console.log('PDF file uploaded successfully:', response.data);
    //       setfilepath(response.data.data.path)
    //     })
    //     .catch(error => {
    //       // Handle upload error
    //       console.error('Error uploading PDF file:', error);
    //     });


    


    console.log("token", token);
    if (validateForm()) {
    try {
      setloading(true)
      const formDatapdf = new FormData();
      formDatapdf.append('pdf', pdfFile);

      const pdfUploadResponse = await axios.post(
        'https://printonapp-backend-production.up.railway.app/admin/upload-pdf',
        formDatapdf,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      );
  
      // Handle successful PDF upload
      console.log('PDF file uploaded successfully:', pdfUploadResponse.data.data.path);
      setfilepath(pdfUploadResponse.data.data.path);

      const formData = {
        color: printColor,
        paper_type: paperType,
        description: description,
        quantity: +selectedQty,
        estimate_cost: totalPrice,
        pdf: pdfUploadResponse.data.data.path
  
        // Add other form fields as needed
      };

      const response = await axios.post(
        'https://printonapp-backend-production.up.railway.app/admin/thesis',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
        }
      );
      // const response = await fetch('https://printonapp-backend-production.up.railway.app/admin/thesis', {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorisation:`Bearer ${token}`
      //   },

      //   body: JSON.stringify(formData),
      // });

      // Handle the response from the server, e.g., show a success message or redirect
      console.log("response", response)
      if (response.data.status == 201) {
        console.log("!!!!!!");
        setshowPopup(true)
        setPopupMessage(response.data.data)
      }
      else {

      }
    } catch (error) {
      console.error("Error submitting order:", error);
      // Handle any errors that occurred during the submission process
    }
    finally{
      setloading(false)
    }
  }
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
            onChange={(e) => {
              setPrintColor(e.target.value);
              // Set touched for the select element
              setTouched((prevTouched) => ({
                ...prevTouched,
                printColor: true,
              }));
            }}
            className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="" disabled>
              Select type
            </option>
            <option value="B&W">B&W</option>
            <option value="Color">Color</option>
            <option value="Both">Both</option>
          </select>
          {errors.printColor && <p className="text-red-500">{errors.printColor}</p>}
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
              onChange={(e) => {setColorPages(e.target.value)
                setTouched((prevTouched) => ({
                  ...prevTouched,
                  colorPages: true,
                }));
              }
              }
              className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.colorPages && <p className="text-red-500">{errors.colorPages}</p>}
          </div>
        )}

        {/* Price Chart Section (assuming it's a separate component) */}
        {/* Please replace this with your actual price chart component */}
        {/* <div className="mb-4">
          <p className="text-lg font-semibold mb-2">Price Chart</p>
          
        </div> */}

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
            onChange={(e) => {setPaperType(e.target.value)
              setTouched((prevTouched) => ({
                ...prevTouched,
                paperType: true,
              }));
            }
            }
            className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="" disabled>
              Select paper type
            </option>
            <option value="Bond">Bond</option>
            <option value="Normal">Normal</option>
          </select>
          {errors.paperType && <p className="text-red-500">{errors.paperType}</p>}
        </div>

        {/* PDF Upload Section */}
        <div className="mb-4">
          <label
            htmlFor="pdfFile"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Upload PDF
          </label>
          <input
            type="file"
            id="pdfFile"
            name="pdfFile"
            onChange={handlePdfFileChange}
            accept=".pdf"
            className="block w-full text-sm text-slate-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-lg file:border-0
            file:text-sm file:font-semibold
            file:bg-gray-700 file:text-white
            hover:file:bg-black"
            // className="mt-1 block w-full"
          />
          {errors.pdfFile && <p className="text-red-500">{errors.pdfFile}</p>}
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
            onChange={(e) => {setSelectedQty(e.target.value)
              setTouched((prevTouched) => ({
                ...prevTouched,
                selectedQty: true,
              }));
            }}
            onMouseOut={() => ShowPrice()}
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
          {errors.selectedQty && <p className="text-red-500">{errors.selectedQty}</p>}
        </div>

        {/* Total Price Section */}
        <div className="mb-4">
          <label
            htmlFor="totalPrice"
            className="block text-sm font-medium text-gray-700"
          >
            Estimated Price
          </label>
          <span className="inline-block mt-1 px-3 py-2 text-lg font-semibold text-gray-800 bg-gray-100 border rounded-md">
            ₹{totalPrice}
          </span>
          {/* calculate amount  */}
          {/* <button
            type="button"
            onClick={() => ShowPrice()}
            className="mt-2 bg-green-500 hover:bg-green-600 text-white text-sm py-1 px-2 rounded-md focus:outline-none focus:ring focus:border-indigo-300 transition duration-300 ease-in-out ml-10 "
          >
            Calculate Amount
          </button> */}
        </div>

        {/* Order Button Section */}
        <div className="mb-4">
          <button
            type="submit"
            onSubmit={() => { handleOrderSubmit() }}
            disabled={!pdfFile} // Disable the button if no PDF file is selected
            className={`${{ pdfFile }
                ? "bg-indigo-500 hover:bg-indigo-600"
                : "bg-gray-300 cursor-not-allowed"
              } text-white py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-indigo-300`}
          >
            Order
          </button>
        </div>
      </form>
      {loading&&<Loader/>}
      {showPopup && <PopupComponent onClose={handleClosePopup} isSuccess={true} message={popupMessage} />}
    </div>
  );
};

export default Thesisform;
