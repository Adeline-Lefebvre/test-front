import "./carCard.scss";

// Review: J'ai déstructuré les props pour plus de clareté
const CarCard = ({ car }) => {
  return (
    <div className="cardContainer">
      <div>
        #{car.id} - {car.make_and_model} ({car.color})
      </div>
      {car.doors < 2 && <div>{car.doors} door</div>}
      {car.doors >= 2 && <div>{car.doors} doors</div>}
      <div>{car.mileage} miles</div>
    </div>
  );
};

export default CarCard;
