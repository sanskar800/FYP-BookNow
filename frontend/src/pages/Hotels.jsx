import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Hotels = () => {
  const { location } = useParams();
  const [filterHot, setFilterHot] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();
  const { hotels } = useContext(AppContext);

  const applyFilter = () => {
    if (location) {
      setFilterHot(hotels.filter((hot) => hot.location === location));
    } else {
      setFilterHot(hotels);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [hotels, location]);
  return (
    <div>
      <p className="text-gray-600">Browse according to hotels location.</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`} onClick={() => (setShowFilter(prev => !prev))}>Filters</button>
        <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          <p
            onClick={() =>
              location === "Biratnagar"
                ? navigate("/hotels")
                : navigate("/hotels/Biratnagar")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${location === "Biratnagar" ? "bg-indigo-100 text-black" : ""
              } `}
          >
            Biratnagar
          </p>
          <p
            onClick={() =>
              location === "Butwal"
                ? navigate("/hotels")
                : navigate("/hotels/Butwal")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${location === "Butwal" ? "bg-indigo-100 text-black" : ""
              } `}
          >
            Butwal
          </p>
          <p
            onClick={() =>
              location === "Chitwan"
                ? navigate("/hotels")
                : navigate("/hotels/Chitwan")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${location === "Chitwan" ? "bg-indigo-100 text-black" : ""
              } `}
          >
            Chitwan
          </p>
          <p
            onClick={() =>
              location === "Dhangadi"
                ? navigate("/hotels")
                : navigate("/hotels/Dhangadi")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${location === "Dhangadi" ? "bg-indigo-100 text-black" : ""
              } `}
          >
            Dhangadi
          </p>
          <p
            onClick={() =>
              location === "Jhapa"
                ? navigate("/hotels")
                : navigate("/hotels/Jhapa")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${location === "Jhapa" ? "bg-indigo-100 text-black" : ""
              } `}
          >
            Jhapa
          </p>
          <p
            onClick={() =>
              location === "Kathmandu"
                ? navigate("/hotels")
                : navigate("/hotels/Kathmandu")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${location === "Kathmandu" ? "bg-indigo-100 text-black" : ""
              } `}
          >
            Kathmandu
          </p>
          <p
            onClick={() =>
              location === "Nepalgunj"
                ? navigate("/hotels")
                : navigate("/hotels/Nepalgunj")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${location === "Nepalgunj" ? "bg-indigo-100 text-black" : ""
              }`}
          >
            Nepalgunj
          </p>
          <p
            onClick={() =>
              location === "Pokhara"
                ? navigate("/hotels")
                : navigate("/hotels/Pokhara")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${location === "Pokhara" ? "bg-indigo-100 text-black" : ""
              } `}
          >
            Pokhara
          </p>
        </div>
        <div className="w-full grid grid-cols-auto gap-4 gap-y-6 ">
          {filterHot.map((item, index) => (
            <div
              onClick={() => navigate(`/booking/${item._id}`)}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
              key={index}
            >
              <img className="bg-blue-50 " src={item.image} alt="" />
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-center text-green-500">
                  <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                  <p>Available</p>
                </div>
                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                <p className="text-gray-600 text-sm">{item.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hotels;
