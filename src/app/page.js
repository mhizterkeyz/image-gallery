"use client";
import styles from "./page.module.css";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Input } from "@/components/input/input";
import { ImageItem } from "@/components/image-item/image-item";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
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
  const [images, setImages] = useState([
    {
      src: "./images/Men.jpeg",
      tag: "men's shirt",
    },
    {
      src: "./images/quote.jpeg",
      tag: "quote",
    },

    {
      src: "./images/Outfits_.jpeg",
      tag: "style",
    },

    {
      src: "./images/reality.jpeg",
      tag: "Reality",
    },

    {
      src: "./images/bob.jpeg",
      tag: "Bob's fashion",
    },
    {
      src: "./images/gift.jpeg",
      tag: "dark cars",
    },
    {
      src: "./images/benz.jpeg",
      tag: "Benz",
    },
    {
      src: "./images/art.png",
      tag: "Art",
    },
    {
      src: "./images/animals.jpeg",
      tag: "Cub",
    },
    {
      src: "./images/Essence.jpeg",
      tag: "Unique fashion",
    },
    {
      src: "./images/Collection.png",
      tag: "#",
    },
    {
      src: "./images/teeth.png",
      tag: "Teeth",
    },
    {
      src: "./images/vintage.jpeg",
      tag: "Vintage Car",
    },
    {
      src: "./images/Week.png",
      tag: "£",
    },
    {
      src: "./images/Ride.jpeg",
      tag: "Rides",
    },
    {
      src: "./images/skin.jpeg",
      tag: "&",
    },
    {
      src: "./images/sydney.jpeg",
      tag: "vis-a-vis",
    },
  ]);
  const [searchResult, setSearchResult] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    if (!search) {
      setSearchResult([]);
    } else {
      setSearchResult(images.filter((image) => image.tag.includes(search)));
    }
  }, [search, images]);

  const swap = ([index1, index2]) => {
    if (searchResult.length) {
      setSearchResult(swapElements(searchResult, index1, index2));
    } else {
      setImages(swapElements(images, index1, index2));
    }
  };

  if (session === null) {
    return redirect("/signin");
  }

  if (!session) {
    return null;
  }

  const toDisplay = searchResult.length ? searchResult : images;

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ flexGrow: "1" }}>
            <Input
              type="search"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Enter your search query"
            />
          </div>

          <div style={{ marginLeft: "auto" }}>
            <button
              style={{ height: "100%", display: "block", padding: "0 6px" }}
              onClick={() => signOut({ redirect: false, callbackUrl: "/" })}
            >
              Logout
            </button>
          </div>
        </div>

        <div style={{ marginTop: "1.5rem" }}>
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 4 }}
          >
            <Masonry>
              {toDisplay.map((image, i) => {
                return (
                  <ImageItem key={i} image={image} position={i} swap={swap} />
                );
              })}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      </div>
    </main>
  );
}
