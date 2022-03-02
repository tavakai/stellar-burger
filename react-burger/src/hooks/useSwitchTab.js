import { useEffect, useRef, useState } from "react";

export const useSwitchTab = function (options) {
  const [isVisible, setIsVisible] = useState(false);
  const targetRef = useRef(null);

  const callback = function (entries, observer) {
    const [entry] = entries;
    const { rootBounds,isIntersecting, intersectionRect,boundingClientRect,target,intersectionRatio} = entry;
    setIsVisible(isIntersecting);
    const currentTab = boundingClientRect.top - rootBounds.top

    if(isIntersecting && (boundingClientRect.top < 300 && boundingClientRect.top > 270)) {
      console.log({
      target: target.textContent,
      pos: intersectionRect.top,
      y: boundingClientRect.top,
      current: currentTab,
      root: rootBounds.top,
      entry,
    });
    } 
  };

  // const targetElements = document.querySelectorAll(`.${targetSelector}`);
  const observer = new IntersectionObserver(callback, options);

  useEffect(() => {
    if(targetRef.current) {
      observer.observe(targetRef.current);
      // console.log('observe', targetRef.current)
    } else {
      // console.log('else', targetRef.current)
    }
    return () => {
      observer.unobserve(targetRef.current);
      // console.log('not observe', targetRef.current)
    }
  }, [targetRef, isVisible])

  return [
    targetRef, isVisible
  ];
};
