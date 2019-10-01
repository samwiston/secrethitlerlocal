package org.bubs.spring;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

public class RoomRepository {
    private static Map<String, Room> rooms = new HashMap<>();

    public Optional<Room> getById(String roomId) {
        if (!rooms.containsKey(roomId)) {
            return Optional.empty();
        }
        return Optional.of(rooms.get(roomId));
    }

    public void delById(String roomId) {
        rooms.remove(roomId);
    }

    public void put(String roomId, Room room) {
        rooms.put(roomId, room);
    }

    public boolean contains(String roomId) {
        return rooms.containsKey(roomId);
    }
}
