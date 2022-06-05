import { FC, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import style from './FeedList.module.css';
import { FeedItem } from "./FeedItem/FeedItem";
import { IFeedList } from "../../utils/types";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { wsOrdersConnectionClosed, wsOrdersConnectionStart } from "../../services/actions/wsActionCreators/orders";
import { TOrder } from "../../services/actions/wsActionTypes";
import { wsUserConnectionClosed, wsUserConnectionStart } from "../../services/actions/wsActionCreators/user";
import Preloader from "../Preloader/Preloader";

export const FeedList: FC<IFeedList> = ({space}) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isUserOrdersPage = location.pathname === '/profile/orders';
  const { orders, userOrders } = useSelector((store: RootStateOrAny) => store.feed)
  const wrapper = space === 'orders' ? style.orders_wrapper : style.wrapper;
  const allOrdersArray = useMemo(() => orders.orders, [orders.orders]);
  const userOrdersArray = useMemo(() => userOrders.orders, [userOrders.orders]);

  useEffect(() => {
    if(location.pathname === '/profile/orders') {
      dispatch(wsUserConnectionStart())
      userOrdersArray?.sort((a: TOrder,b:TOrder) => {
        if(a.createdAt > b.createdAt) {
          return 1
        } else if(a.createdAt < b.createdAt) {
          return -1
        }
      })
    } else if (location.pathname === '/feed') {
      dispatch(wsOrdersConnectionStart());
    }
    return () => {
      isUserOrdersPage ? dispatch(wsUserConnectionClosed()) : dispatch(wsOrdersConnectionClosed());
    }
  },[])

  return (
    <>
      { !orders ? ( <Preloader /> ) : (
        <div className={wrapper}>
        <ul className={style.list}>
          {
            location.pathname === '/profile/orders' ? (
              userOrdersArray !== undefined && userOrdersArray.map((item: TOrder) => {
                return <FeedItem key={item._id} feed={item} />
              })
            ) : (
              allOrdersArray !== undefined && allOrdersArray.map((item: TOrder) => {
                return <FeedItem space="orders" key={item._id} feed={item} />
              })
            )
          }
        </ul>
      </div>
      ) }
    </>
  )
}