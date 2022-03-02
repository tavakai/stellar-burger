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

function App() {
  const dispatch = useDispatch();
  const { modal, currentIngredient, order } = useSelector(store => store.ingredients);
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

  // const getOnlyIngredients = (burgersData) => {
  //   return burgersData.filter(el => el.type !== 'bun')
  // }
  
  // useEffect(() => {
  //   dispatch(getIngredients());
  //   console.log(ingredients);

  //   api.getIngredients()
  //     .then(res => {
  //       return res.data
  //     })
  //     .then(res => {
  //       // setData(res);
  //       setOnlyIngredients(getOnlyIngredients(res))
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  // }, [])

  return (
    <div className={style.App}>
      <AppHeader />
      <main className={style.main}>
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
          modal && order &&
          <Modal header >
            <OrderDetails />
          </Modal>
        }
      </main>
    </div>
  );
}

export default App;
