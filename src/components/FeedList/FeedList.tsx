import { FC, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import style from './FeedList.module.css';
import { FeedItem } from "./FeedItem/FeedItem";
import { IFeedList } from "../../utils/types";
import { wsOrdersConnectionClosed, wsOrdersConnectionStart } from "../../services/actions/wsActionCreators/orders";
import { wsUserConnectionClosed, wsUserConnectionStart } from "../../services/actions/wsActionCreators/user";
import Preloader from "../Preloader/Preloader";
import { userOrders as userOrdersWsUrl, allOrders } from "../../utils/socket";
import { getCookie } from "../../utils/getCookie";
import { useAppDispatch, useAppSelector } from "../../services/types/reduxHooks";
import { TOrder } from "../../services/actions/wsActionTypes";

export const FeedList: FC<IFeedList> = ({space}) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isUserOrdersPage = location.pathname === '/profile/orders';
  const { orders, userOrders } = useAppSelector(store => store.feed)
  const wrapper = space === 'orders' ? style.orders_wrapper : style.wrapper;
  const allOrdersArray = useMemo(() => orders?.orders, [orders.orders]);
  const userOrdersArray = useMemo(() => userOrders, [userOrders]);

  useEffect(() => {
    if(location.pathname === '/profile/orders') {
      dispatch(wsUserConnectionStart(`${userOrdersWsUrl}?token=${getCookie("accessToken")}`))
      userOrdersArray && userOrdersArray?.sort((a,b): 1 | -1 | number => {
        if(a.createdAt > b.createdAt) {
          return 1
        }
          return -1
      })
    } else if (location.pathname === '/feed') {
      dispatch(wsOrdersConnectionStart(`${allOrders}`));
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
              userOrders?.map((item: TOrder) => {
                  return <FeedItem key={item._id} feed={item} />;
                })
            ) : (
              allOrdersArray?.map(item => {
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