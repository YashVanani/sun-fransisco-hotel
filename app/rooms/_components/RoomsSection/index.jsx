"use client";
import { filterRoomsByDate, getAllRooms } from "@/app/_lib/supabase/rooms";
import styles from "./styles.module.css";
import RoomItem from "../RoomItem";
import { isValid } from "date-fns";

function RoomsSection({ filter, range, allRooms }) {
  console.log("allRooms", allRooms);
  // const rooms = await getAllRooms();
  // console.log({ rooms: rooms.length });

  // let filteredRooms = await filterRoomsByDate();

  // let filteredRooms = rooms;

  // if (
  //   range &&
  //   isValid(new Date(range.split("_")?.at(0))) &&
  //   isValid(new Date(range.split("_")?.at(1)))
  // ) {
  //   const arrivalDate = range.split("_")?.at(0);
  //   const departureDate = range.split("_")?.at(1);
  //   filteredRooms = await filterRoomsByDate(arrivalDate, departureDate);
  // }

  // switch (filter) {
  //   case "high-price":
  //     filteredRooms = filteredRooms.sort((a, b) => b.price - a.price);
  //     break;
  //   case "low-price":
  //     filteredRooms = filteredRooms.sort((a, b) => a.price - b.price);
  //     break;

  //   case "min-guests":
  //     filteredRooms = filteredRooms.sort((a, b) => b.capacity - a.capacity);
  //     break;

  //   case "max-guests":
  //     filteredRooms = filteredRooms.sort((a, b) => a.capacity - b.capacity);
  //     break;
  //   default:
  //     filteredRooms = filteredRooms;
  // }

  return (
    <div className={styles.roomsGrid}>
      {allRooms?.length > 0 && allRooms?.map((item) => (
        <RoomItem
          key={item.id}
          id={item.id}
          title={item.room_type}
          price={item.price}
          imgPath={item.room_img}
          // link="#"
        />
      ))}
    </div>
  );
}

export default RoomsSection;
