import { FC } from "react";
import style from './Feed.module.css';
import { FeedList } from "../../../components/FeedList/FeedList";
import Nav from "../../../components/Nav/Nav";

export const Feed: FC = () => {
  return (
    <section className={style.section}>
      <Nav />
      <FeedList space="orders" />
    </section>
  )
}