import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import { debounce } from "../src/utils/debounce";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [base, setBase] = useState(90);
  const [shoulder, setShoulder] = useState(0);
  const [elbow, setElbow] = useState(60);
  const [grip, setGrip] = useState(180);

  const updatePosition = async () => {
    try {
      const { data } = await axios(
        `/api/position?base=${base}&shoulder=${shoulder}&elbow=${elbow}&grip=${grip}`
      );
      // console.log(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    const getPositions = async () => {
      const { data } = await axios("/api/position");
      if (data) {
        setBase(data.base);
        setShoulder(data.shoulder);
        setElbow(data.elbow);
        setGrip(data.grip);
      }
    };
    getPositions();
  }, []);

  useEffect(() => {
    const setPosition = async () => {
      await updatePosition();
    };
    setPosition();
  }, [base, shoulder, elbow, grip]);

  const resetHandler = async () => {
    try {
      const { data } = await axios(
        `/api/position?base=${90}&shoulder=${0}&elbow=${60}&grip=${180}`
      );
      if (data) {
        setBase(data.base);
        setShoulder(data.shoulder);
        setElbow(data.elbow);
        setGrip(data.grip);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Robotic Arm</title>
        <meta name="description" content="robotic arm project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <p className={styles.title}>Robotic Arm</p>
        <div className={styles.sliderContainer}>
          <div className={styles.slider}>
            <span>
              <p>Base</p>
              <div>{base}</div>
            </span>
            <input
              type={"range"}
              value={base}
              min={0}
              max={180}
              onChange={(e) => {
                debounce(setBase(e.currentTarget.value));
              }}
            />
          </div>
          <div className={styles.slider}>
            <span>
              <p>Shoulder</p>
              <div>{shoulder}</div>
            </span>
            <input
              type={"range"}
              value={shoulder}
              min={0}
              max={130}
              onChange={(e) => {
                debounce(setShoulder(e.currentTarget.value));
              }}
            />
          </div>
          <div className={styles.slider}>
            <span>
              <p>Elbow</p>
              <div>{elbow}</div>
            </span>

            <input
              type={"range"}
              value={elbow}
              min={0}
              max={180}
              onChange={(e) => {
                debounce(setElbow(e.currentTarget.value));
              }}
            />
          </div>
          <div className={styles.slider}>
            <span>
              <p>Grip</p>
              <div>{grip}</div>
            </span>
            <input
              type={"range"}
              value={grip}
              min={140}
              max={180}
              onChange={(e) => {
                debounce(setGrip(e.currentTarget.value));
              }}
            />
          </div>
        </div>
        <button onClick={resetHandler}>Reset</button>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
