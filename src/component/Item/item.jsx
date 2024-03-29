import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export function Item({title,imageUrl}) {
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const handleNavigate=()=>{
        if(isAuthenticated){
            if(title=="Thesis and Dissertation"){
                navigate('/thesisform')
            }
        }
        else{
            navigate('/signin')
        }
        
    }
  return (
    <div className=" p-4">
      <div className="w-[260px] max-w-[320px] mx-auto relative aspect-[16/9] h-[300px]">
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-full h-auto max-w-full"
        />
        <div className="absolute inset-0 rounded-md bg-gradient-to-t from-gray-900 to-transparent"></div>
        <div className="absolute bottom-4 left-4 text-left text-white">
          <h1 className="text-lg font-semibold">{title}</h1>
          <p className="mt-2 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, debitis?
          </p>
          {title=="Thesis and Dissertation"?
          (<button onClick={handleNavigate} className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold">
            Order now &rarr;
          </button>):(<></>)}
        </div>
      </div>
    </div>
  )
}
