export default (io, socket, listRoom, rooms) => {
  socket.on("react:create-room",
    ({ id,
      name,
      fullnameOfHost,
      usernameOfHost,
    }) => {
      rooms[id] = {
        name: name,
        wolf: 1,
        mage: 0,
        guard: 0,
        hunter: 0,
        member: [{
          username: usernameOfHost,
          fullname: fullnameOfHost,
        }]
      };
      listRoom.push({
        id: id,
        name: name,
        numberOfPlayersInRoom: rooms[id].member.length,
        usernameOfHost: usernameOfHost,
      });
      io.emit("server:list-room", listRoom);
      socket.emit("server:get-in-room", rooms[id]);
      socket.join(id);
      checkUserInRoom[usernameOfHost] = id;
    }
  )
}