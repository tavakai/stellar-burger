import { useState, useEffect } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import style from './App.module.css';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import api from '../../utils/api';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';

function App() {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [currentDataInModal, setCurrentDataInModal] = useState(null);
  const [orderDetails, setOrderDetails] = useState(false);

  function showModal(currentInfo) {
    setShow(true);
    if(currentInfo === "order") {
      setOrderDetails(true);
    } else {
      setCurrentDataInModal(currentInfo);
    }
  }

  const hideModal = (boolean) => {
    !boolean && setShow(false);
    setCurrentDataInModal(null);
    setOrderDetails(false);
  }
  
  useEffect(() => {
    api.getIngredients()
      .then(res => {
        return res.data
      })
      .then(res => {
        setData(res);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  return (
    <div className={style.App}>
      <AppHeader />
      <main className={style.main}>
        <BurgerIngredients data={data}
          showModal={showModal}
          hideModal={hideModal}
        />
        <BurgerConstructor
          data={data}
          showModal={showModal} />
        {
          show && currentDataInModal &&
          <Modal show={show} hideModal={hideModal}>
            <IngredientDetails data={currentDataInModal} />
          </Modal>
        }
        {
          show && orderDetails &&
          <Modal show={show} hideModal={hideModal} header >
            <OrderDetails />
          </Modal>
        }
      </main>
    </div>
  );
}

export default App;
