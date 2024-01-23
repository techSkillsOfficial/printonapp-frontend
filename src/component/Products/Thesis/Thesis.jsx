import { ArrowUpRight } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export function Thesis() {
    const navigate = useNavigate()
  return (
    <div className="flex items-center justify-center m-4">
      <div className="w-[300px] rounded-md border">
        <img
          src="https://as2.ftcdn.net/v2/jpg/01/76/86/99/1000_F_176869953_1ZiF6njc4MkDuqwraMmHe26Klnr9G3z7.jpg"
          alt="Laptop"
          className="h-[200px] w-full rounded-md object-cover"
        />
        <div className="p-4">
          <h1 className="text-lg font-semibold">Thesis Print</h1>
          <p className="mt-3 text-sm text-gray-600">
            A thesis, or dissertation, is a document submitted in support of
            candidature for an academic degree or professional qualification
            presenting the author's research and findings.
          </p>
          <button
            onClick={() => {
            //   console.log("Button clicked!");
              navigate("/thesisform");
            }}
            type="button"
            className="mt-4 rounded-sm bg-black px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Order Now
          </button>
        </div>
      </div>
    </div>

    // <div className="flex max-w-2xl mx-auto md:mx-0">
    //   <div className="h-full w-full md:h-[200px] md:w-[300px]">
    //     <img
    //       src="https://as2.ftcdn.net/v2/jpg/01/76/86/99/1000_F_176869953_1ZiF6njc4MkDuqwraMmHe26Klnr9G3z7.jpg"
    //       alt="Laptop"
    //       className="h-full w-full rounded-md object-cover"
    //     />
    //   </div>
    //   <div>
    //     <div className="p-4">
    //       <h1 className="inline-flex items-center text-lg font-semibold">
    //         About Thesis <ArrowUpRight className="ml-2 h-4 w-4" />
    //       </h1>
    //       <p className="mt-3 text-sm text-gray-600">
    //       A thesis, or dissertation, is a document submitted in support of candidature for an academic degree or professional qualification presenting the author's research and findings.
    //       </p>
    //       <div className="mt-4">
    //         <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
    //           #Thesis
    //         </span>
    //         <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
    //           #PrintOnApp
    //         </span>
    //         <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
    //           #OnlinePrint
    //         </span>
    //       </div>
    //       {/* <div className="mt-3 flex items-center space-x-2">
    //         <img
    //           className="inline-block h-8 w-8 rounded-full"
    //           src="https://overreacted.io/static/profile-pic-c715447ce38098828758e525a1128b87.jpg"
    //           alt="Dan_Abromov"
    //         />
    //         <span className="flex flex-col">
    //           <span className="text-[10px] font-medium text-gray-900">Dan Abromov</span>
    //           <span className="text-[8px] font-medium text-gray-500">@dan_abromov</span>
    //         </span>
    //       </div> */}
    //     </div>
    //   </div>
    // </div>
  );
}
