import { FC, useMemo } from "react";
import style from './Feed.module.css';
import { FeedList } from "../../components/FeedList/FeedList";
import { RootStateOrAny, useSelector } from "react-redux";
import { TOrder } from "../../services/actions/wsActionTypes";
import Preloader from "../../components/Preloader/Preloader";

export const Feed: FC = () => {
  const { orders } = useSelector((store: RootStateOrAny) => store.feed);
  const { authRequest } = useSelector((store: RootStateOrAny) => store.auth);
  const done = useMemo(() => orders.orders?.filter((item: TOrder) => item.status === "done"), [orders.orders]);
  const pending = useMemo(() => orders.orders?.filter((item: TOrder) => item.status === "pending"), [orders.orders]);

  return (
    <section className={style.section}>
      {
        authRequest ? <Preloader /> : (
          <>
            <h2 className={style.feed_title}>Лента заказов</h2>
            <div className={style.wrapper}>
              <FeedList />
              <div className={style.dashboard}>
                <div className={style.process}>
                  <h3 className={style.title}>Готовы:</h3>
                  <h3 className={style.title}>В работе:</h3>
                  <ul className={style.done}>
                    {
                      done && done.slice(0, 10).map((orderNum: TOrder) => {
                        return <li className={style.done_item} key={orderNum.number}>{orderNum.number}</li>
                      })
                    }
                  </ul>
                  <ul className={style.during}>
                    {
                      pending && pending.slice(0, 10).map((orderNum: TOrder) => {
                        return <li className={style.during_item} key={orderNum.number}>{orderNum.number}</li>
                      })
                    }
                  </ul>
                </div>
                <div className={style.process_all}>
                  <h3 className={style.title}>Выполнено за всё время:</h3>
                  <span className={style.count}>{orders.total}</span>
                </div>
                <div className={style.process_today}>
                  <h3 className={style.title}>Выполнено за сегодня:</h3>
                  <span className={style.count}>{orders.totalToday}</span>
                </div>
              </div>
            </div>
          </>
        )
      }
    </section>
  )
}