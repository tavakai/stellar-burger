import { useEffect, useState } from "react";

export const useSwitchTab = function (options: IntersectionObserverInit, targetEl: NodeListOf<Element>) {
  const [currentTab, setCurrentTab] = useState<string | null>();

  const callback = function (entries: IntersectionObserverEntry[], observer: any) {
    const [entry] = entries;
    const {isIntersecting,target,intersectionRatio} = entry;
    if(isIntersecting && intersectionRatio > 0.3) {
      setCurrentTab(target.firstChild?.textContent);
    }
  };

  const observer = new IntersectionObserver(callback, options);

  useEffect(() => {
    if(targetEl !== undefined || targetEl !== null) {
      targetEl.forEach(e => {
        observer.observe(e);
      });
    }
    return () => {
      targetEl.forEach(e => {
        observer.unobserve(e);
      });
    }
  })

  return {
    currentTab
  };
};
