import IngredientDetails from '../../components/IngredientDetails/IngredientDetails';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const IngredientPage = () => {
  const { id } = useParams();
  const { currentIngredient } = useSelector(store => store.ingredients);
  return (
    <section>
      {/* <IngredientDetails /> */}
      <h2>{id}</h2>
    </section>
  )
}

export default IngredientPage;