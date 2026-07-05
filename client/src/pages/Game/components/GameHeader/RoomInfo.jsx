const RoomInfo = ({ roomId }) => {
  return (
    <div>
      <p className="text-sm text-gray-400">Room</p>

      <h2 className="text-xl font-bold tracking-widest">
        {roomId || "------"}
      </h2>
    </div>
  );
};

export default RoomInfo;
