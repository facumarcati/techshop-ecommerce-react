import { getFirestore, getDocs, collection } from "firebase/firestore";
import { app } from "../firebase/config";
import { useEffect, useState } from "react";

const useFireBaseItems = () => {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const db = getFirestore(app);
    const itemsRef = collection(db, "items");

    const fetchItems = async () => {
      try {
        setLoading(true);
        setError(null);

        const querySnap = await getDocs(itemsRef);

        const data = querySnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setItems(data);
      } catch (err) {
        setError(err);
        setItems(null);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return { items, loading, error };
};

export default useFireBaseItems;
