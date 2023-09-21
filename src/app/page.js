"use client";
import styles from "./page.module.css";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Input } from "@/components/input/input";
import { ImageItem } from "@/components/image-item/image-item";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const swapElements = (_array, index1, index2) => {
  const array = [..._array];
  if (
    index1 < 0 ||
    index1 >= array.length ||
    index2 < 0 ||
    index2 >= array.length
  ) {
    return array; // Indices out of bounds, return the original array
  }

  // Swap the elements at the specified indices
  const temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;

  return array;
};

const captions = [
  "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  "Enim neque veritatis mollitia in ipsum reprehenderit,",
  "quisquam rem,",
  "voluptates qui numquam ratione modi maxime cupiditate aspernatur voluptatem dolor tempora nulla ducimus.",
  "Perferendis impedit hic accusantium est repudiandae.",
  "Impedit quod,",
  "aliquid earum eius minus blanditiis.",
  "Laboriosam quas eligendi fugit saepe voluptas quisquam.",
  "Necessitatibus autem sit animi repellendus",
  "libero molestiae veritatis molestias distinctio mollitia hic veniam,",
  "adipisci at cupiditate asperiores ratione sed laboriosam atque cum fuga?",
  "Necessitatibus, animi? Laborum eum quam quaerat, nostrum officia facere",
  "illo! Ullam inventore saepe temporibus, expedita cumque corrupti, culpa,",
  "modi nemo cum quo tenetur alias pariatur vitae quidem!",
  "consequuntur? Maiores nesciunt porro iste molestiae. Neque dicta eius",
  "quae numquam maxime ex, fugiat velit nisi autem laudantium beatae vel",
  "beatae maxime dolore distinctio laborum voluptatem doloribus odit",
  "veniam saepe molestias! Ipsam quod praesentium animi libero. Rerum ea",
  "aliquam mollitia vero consectetur repudiandae pariatur laboriosam quos",
  "assumenda obcaecati, repellendus laudantium. Cupiditate, nesciunt? Sed",
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [images, setImages] = useState(
    captions.map((caption) => {
      const height = Math.floor(Math.random() * (800 - 400 + 1)) + 400;

      return {
        src: `https://picsum.photos/500/${height}`,
        height,
        caption,
      };
    })
  );
  const { data: session } = useSession();

  if (session === null) {
    return redirect("/signin");
  }

  if (!session) {
    return null;
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Input
          type="search"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter your search query"
        />

        <div style={{ marginTop: "1.5rem" }}>
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 4 }}
          >
            <Masonry>
              {images
                .filter(
                  (image) =>
                    !search ||
                    image.caption.toLowerCase().includes(search.toLowerCase())
                )
                .map((image, i) => {
                  return (
                    <ImageItem
                      key={i}
                      image={image}
                      position={i}
                      swap={([index1, index2]) =>
                        setImages(swapElements(images, index1, index2))
                      }
                    />
                  );
                })}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      </div>
    </main>
  );
}
