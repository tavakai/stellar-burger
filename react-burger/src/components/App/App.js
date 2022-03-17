import { useDispatch, useSelector } from 'react-redux';
import AppHeader from '../AppHeader/AppHeader';
import style from './App.module.css';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';
import { hideModal } from '../../services/actions/index';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Preloader from '../Preloader/Preloader';

function App() {
  const dispatch = useDispatch();
  const { modal, currentIngredient } = useSelector(store => store.ingredients);
  const { orderRequest } = useSelector(store => store.order);

  const handleHideModal = () => {
    dispatch(hideModal())
  }

  return (
    <div className={style.App}>
      <AppHeader />
      <main className={style.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
        <BurgerConstructor />
        {
          modal && currentIngredient &&
          <Modal show={modal} hideModal={handleHideModal} title="Детали ингредиента" >
            <IngredientDetails />
          </Modal>
        }
        {
          orderRequest ? (
            <Preloader />
          ) : (
            modal && !currentIngredient &&
          <Modal show={modal} hideModal={handleHideModal} header >
            <OrderDetails />
          </Modal>
          )
        }
        </DndProvider>
      </main>
    </div>
  );
}

export default App;
