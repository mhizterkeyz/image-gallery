/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import styles from "./image-item.module.css";
import { useDrag, useDrop } from "react-dnd";

export const ImageItem = ({ image, position, swap }) => {
  const { height, caption, src } = image;
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

  return (
    <div className={styles.item} ref={drag}>
      <div ref={drop}>
        <img src={src} alt={caption} />

        <div className={styles.caption}>{caption}</div>
      </div>
    </div>
  );
};
