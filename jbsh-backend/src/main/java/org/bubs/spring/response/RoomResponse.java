package org.bubs.spring.response;

public class RoomResponse {
    private final String id;         // 4-letter room id
    private final String serverName; // Name of game server

    public RoomResponse(String id, String serverName) {
        this.id = id;
        this.serverName = serverName;
    }

    public String getId() {
        return id;
    }

    public String getServerName() {
        return serverName;
    }
}
