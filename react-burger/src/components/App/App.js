import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppHeader from '../AppHeader/AppHeader';
import style from './App.module.css';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';
import { SHOW_MODAL, HIDE_MODAL } from '../../services/actions/index';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const dispatch = useDispatch();
  const { modal, currentIngredient, order } = useSelector(store => store.ingredients);
  const { ingredientsInConstructor } = useSelector(store => store.burgerConstructor);
  const [show, setShow] = useState(false);
  const [currentDataInModal, setCurrentDataInModal] = useState(null);
  const [orderDetails, setOrderDetails] = useState(false);
  const [onlyIngredients, setOnlyIngredients] = useState([]);

  const showModal = (currentInfo) => {
    dispatch({
      type: SHOW_MODAL
    })
    // setShow(true);
    if(currentInfo === "order") {
      setOrderDetails(true);
    } else {
      setCurrentDataInModal(currentInfo);
    }
  }

  const hideModal = (boolean) => {
    dispatch({
      type: HIDE_MODAL
    })
    !boolean && setShow(false);
    setCurrentDataInModal(null);
    setOrderDetails(false);
  }

  return (
    <div className={style.App}>
      <AppHeader />
      <main className={style.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
        <BurgerConstructor
          showModal={showModal} />
        {
          modal && currentIngredient &&
          <Modal title="Детали ингредиента" >
            <IngredientDetails />
          </Modal>
        }
        {
          modal && ingredientsInConstructor.length !== 0 &&
          <Modal header >
            <OrderDetails />
          </Modal>
        }
        </DndProvider>
      </main>
    </div>
  );
}

export default App;
