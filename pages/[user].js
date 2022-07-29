import letterboxd from "letterboxd";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../styles/user.module.css";

export default function User({ movies }) {
  const router = useRouter();
  console.log(movies);
  return (
    <main className={styles.grid}>
      {movies
        .filter((m) => m.film)
        .map((m, i) => (
          <a href={m.uri} key={i}>
            <Image src={m.film.image.large} layout="fill" objectFit="contain" />
          </a>
        ))}
    </main>
  );
}

export async function getServerSideProps(context) {
  try {
    const movies = await letterboxd(context.query.user);
    return { props: { movies } };
  } catch (err) {
    return { notFound: true };
  }
}
