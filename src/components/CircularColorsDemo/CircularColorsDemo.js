"use client";
import React from "react";
import clsx from "clsx";
import { Play, Pause, RotateCcw } from "react-feather";

import Card from "@/components/Card";
import VisuallyHidden from "@/components/VisuallyHidden";

import styles from "./CircularColorsDemo.module.css";
import { color } from "framer-motion";

const COLORS = [
  { label: "red", value: "hsl(348deg 100% 60%)" },
  { label: "yellow", value: "hsl(50deg 100% 55%)" },
  { label: "blue", value: "hsl(235deg 100% 65%)" },
];

function CircularColorsDemo() {
  // TODO: This value should increase by 1 every second:

  // TODO: This value should cycle through the colors in the
  // COLORS array:
  const [selectedColor, setSelectedColor] = React.useState(COLORS[0]);
  const [timeElapsed, setTimeElapsed] = React.useState(0);
  const [played, setPlayed] = React.useState(false);

  React.useEffect(() => {
    let intervalId;

    if (played) {
      intervalId = window.setInterval(() => {
        const nextTimeElapsed = timeElapsed + 1;
        setTimeElapsed(nextTimeElapsed);
        setSelectedColor(COLORS[nextTimeElapsed % 3]);
      }, 1000);
    } else {
      window.clearInterval(intervalId);
    }

    return () => {
      console.log("clearance");
      window.clearInterval(intervalId);
    };
  }, [timeElapsed, played]);

  const resetTimeLapsed = () => {
    setTimeElapsed(0);
    setSelectedColor(COLORS[0]);
  };

  const playHandler = () => {
    setPlayed((draftplayed) => !draftplayed);
  };

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected = color.value === selectedColor.value;

          return (
            <li className={styles.color} key={index}>
              {isSelected && <div className={styles.selectedColorOutline} />}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected && styles.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>{color.label}</VisuallyHidden>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          <button onClick={playHandler}>
            {played ? <Pause /> : <Play />}
            <VisuallyHidden>Play</VisuallyHidden>
          </button>
          <button onClick={resetTimeLapsed}>
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
