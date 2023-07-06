import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function PlantList() {
  const dispatch = useDispatch();
  const reduxState = useSelector((store) => store);
  const plants = useSelector((store) => store.plantList);

  const deletePlant = (id) => {
    dispatch({ type: 'REMOVE_PLANT', payload: id })
  }

  useEffect(() => {
    dispatch({ type: "FETCH_PLANTS" });
  }, []);

  return (
    <div>
      <h3>This is the plant list</h3>
      <pre>{JSON.stringify(reduxState)}</pre>
      {plants.map((plant) => {
        return (
        <div key={plant.id}>
          {plant.name} 
          <button onClick={() => deletePlant(plant.id)}>Delete</button>
        </div>
        );
      })}
    </div>
  );
}

export default PlantList;
