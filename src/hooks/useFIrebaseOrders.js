import { useEffect, useState } from "react";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { app } from "../firebase/config";

const useFirebaseOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const db = getFirestore(app);
    const ordersRef = collection(db, "orders");

    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        const querySnap = await getDocs(ordersRef);

        const data = querySnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrders(data);
      } catch (err) {
        setError(err);
        setItems(null);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return { orders, loading, error };
};

export default useFirebaseOrders;
