import { db } from "../scripts/firebase";
import { doc, setDoc, getDoc, Timestamp } from "firebase/firestore";

const dbName = "heatmaps";

export const setHeatMapVal = async (
  uid: string,
  heatmapVals: number[],
  uv: number
) => {
  try {
    await setDoc(doc(db, dbName, uid), {
      heatmapVals: heatmapVals,
      created: Timestamp.now(),
      uniqueVisits: uv,
    });
  } catch (err) {
    console.log("error setting local vars: ", err);
  }
};

export const retrieveHeatMapVal = async (uid: string) => {
  try {
    const heatmapValData = await getDoc(doc(db, dbName, uid));
    return heatmapValData.data();
  } catch (err) {
    console.log("error retrieving local vars: ", err);
  }
};
