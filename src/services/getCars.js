// Review: J'ai modifié le nom pour qu'il soit plus parlant
const getCars = async () => {
  // Review: J'ai ajouté un try catch
  try {
    const response = await fetch(
      `https://random-data-api.com/api/vehicle/random_vehicle?size=21`
    );
    const cars = await response.json();
    // Review: J'ai supprimé le console.log
    return cars;
  } catch (error) {
    console.log(error);
  }
};

export { getCars };
