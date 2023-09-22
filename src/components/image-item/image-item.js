/* eslint-disable @next/next/no-img-element */
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./image-item.module.css";
import { useDrag, useDrop } from "react-dnd";
import { useEffect, useState } from "react";

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export const ImageItem = ({ image, position, swap }) => {
  const height = Math.floor(Math.random() * (500 - 300 + 1)) + 300;
  const { tag, src } = image;
  const [, drag] = useDrag(
    {
      type: "BOX",
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      item: { height, position },
    },
    [position]
  );
  const [, drop] = useDrop({
    accept: "BOX",
    drop: (props) => {
      swap([props.position, position]);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    loadImage(src)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [src]);

  return (
    <div className={styles.item} ref={drag}>
      <div ref={drop}>
        {loading ? <Skeleton height={height} /> : <img src={src} alt={tag} />}

        <div className={styles.caption}>#{tag}</div>
      </div>
    </div>
  );
};
