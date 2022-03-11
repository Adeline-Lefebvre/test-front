import React, { useEffect, useState } from "react";
import CarCard from "../CarCard/CarCard";
import { getCars } from "../../services/getCars";
import "./carsList.scss";

const CarsList = () => {
  const [cars, setCars] = useState(null);
  const [colorFilter, setColorFilter] = useState(false);
  const [minKm, setMinKm] = useState(null);
  const [maxKm, setMaxKm] = useState(null);

  const re = /^[0-9\b]+$/;

  const fetchCars = async () => {
    const cars = await getCars();
    setCars(cars);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const mileageFilter = async () => {
    let filteredCars = await getCars();

    if (minKm)
      filteredCars = filteredCars.filter((car) => car.mileage >= minKm);
    if (maxKm)
      filteredCars = filteredCars.filter((car) => car.mileage <= maxKm);

    setCars(filteredCars);
  };

  if (!cars) {
    return <div>loading</div>;
  }

  return (
    <>
      <div className="header">
        <h3>My garage</h3>
        {/* Review: ici j'ai ajouté une ternaire pour éviter la répétition de code */}
        {colorFilter ? (
          // Fix: ici j'ai remplacé le nom de variable 'order' par 'colorFilter' et j'ai créé un state pour pouvoir la modifier.
          <button className="btn" onClick={() => setColorFilter(false)}>
            Reset color filter
          </button>
        ) : (
          <button className="btn" onClick={() => setColorFilter(true)}>
            Only black & white
          </button>
        )}
      </div>
      <div className="subHeader"></div>

      <div className="actionsContainer">
        <p>Mileage</p>

        <div className="mileageFilters">
          <div>
            <label>Minimum</label>
            <input
              type="text"
              inputMode="numeric"
              value={minKm ?? ""}
              onChange={(e) =>
                (e.target.value === "" || re.test(e.target.value)) &&
                setMinKm(e.target.value)
              }
            />
          </div>

          <div>
            <label>Maximum</label>
            <input
              type="text"
              inputMode="numeric"
              value={maxKm ?? ""}
              onChange={(e) =>
                (e.target.value === "" || re.test(e.target.value)) &&
                setMaxKm(e.target.value)
              }
            />
          </div>
        </div>

        <div className="clearFilterBtns">
          <button
            onClick={() => {
              setMinKm(null);
              setMaxKm(null);
              fetchCars();
            }}
          >
            Clear
          </button>
          <button onClick={() => mileageFilter()}>Filter</button>
        </div>
      </div>

      <div className="cardsContainer">
        {cars.length ? (
          cars.map((car) => {
            if (colorFilter) {
              if (car.color === "Black" || car.color === "White") {
                return <CarCard key={car.uid} car={car} />;
              } else {
                return <div key={car.uid}></div>;
              }
            } else {
              return <CarCard key={car.uid} car={car} />;
            }
          })
        ) : (
          <p className="noMatch">
            Sorry, there are no matches for your search...
          </p>
        )}
      </div>
    </>
  );
};

export default CarsList;
