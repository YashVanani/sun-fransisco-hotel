import { useAuth } from "@/app/_context/AuthContext";
import { db } from "@/app/_lib/firebase/firebase";
import Heading from "@/app/_ui/Heading";
import { collection, getDocs, query, where } from "firebase/firestore";
import Link from "next/link";
import ReservationCard from "./_components/ReservationCard";
import styles from "./style.module.css";

export const metadata = {
  title: "Booking History",
  description: "Reservations history at the Hotel Booking App ",
};

async function fetchUserReservations(userId) {
  console.log("userId ::::::", userId);
  try {
    const bookingsRef = collection(db, "room_bookings");
    const q = query(bookingsRef, where("user_id", "==", userId));
    const snapshot = await getDocs(q);
    console.log("snapshot:::::", snapshot);

    const reservations = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("reservations :::::::", reservations);
    return reservations;
  } catch (error) {
    console.log("Error fetching reservations:", error);
    return [];
  }
}

async function History() {
  let reservations = [];
  try {
    const { user } = useAuth();

    if (!user) {
      console.log("No user is logged in.");
      return (
        <>
          <Heading textClassName={styles.heading}>Your History</Heading>
          <p>Please sign in to view your booking history.</p>
        </>
      );
    }

    const userId = user.uid;
    reservations = await fetchUserReservations(userId);
    console.log("reservations :::::::::", reservations);
  } catch (err) {
    console.log(err);
  }

  return (
    <>
      <Heading textClassName={styles.heading}>Your History</Heading>
      <div>
        {reservations.length ? (
          reservations
            .reverse()
            .map((item) => <ReservationCard key={item.id} reservation={item} />)
        ) : (
          <div>
            <p>You have no booked room.</p>
            <Link href={"/rooms"}>View Rooms</Link>
          </div>
        )}
      </div>
    </>
  );
}

export default History;
