// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { getAllNotifications } from "../redux/NotificationSlice";

// function NotificationsList() {
//   const dispatch = useDispatch();
//   const { notifications, status, error } = useSelector((state) => state.Noty);

//   useEffect(() => {
//     dispatch(getAllNotifications());
//   }, [dispatch]);

//   if (status === "loading") return <p>Loading...</p>;
//   if (status === "failed") return <p>Error: {error}</p>;

//   return (
//     <ul>
//       {notifications.map((n) => (
//         <li key={n.id}>{n.message}</li>
//       ))}
//     </ul>
//   );
// }

// export default NotificationsList;



import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllNotifications,
  deleteNotification,
} from "../store/slices/notificationSlice";

function NotificationsList() {
  const dispatch = useDispatch();
  const { notifications, status, error } = useSelector((state) => state.Noty);

  useEffect(() => {
    dispatch(getAllNotifications());
  }, [dispatch]);

  if (status === "loading") return <p>Loading notifications...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div>
      <h2 className="font-bold text-lg">Notifications</h2>
      <ul>
        {notifications.map((n) => (
          <li key={n.id} className="flex justify-between items-center">
            <span>{n.message}</span>
            <button
              onClick={() => dispatch(deleteNotification(n.id))}
              className="text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotificationsList;
