package org.bubs.spring;

import java.util.Random;
import java.util.UUID;

public class Room {
    private static final Random rand = new Random();

    private final String id;         // 4-letter room id
    private final String serverName; // Name of game server
    private final UUID deltoken;     // UUID required for deleting room..

    public Room(String id, String serverName) {
        this.id = id;
        this.serverName = serverName;
        this.deltoken = UUID.randomUUID();
    }

    public String getId() {
        return id;
    }

    public String getGameServer() {
        return serverName;
    }

    public UUID getDeltoken() {
        return deltoken;
    }

    public static String randId() {
        String id = "";
        for( ; id.length() < 4; ) {
            id += (char)(rand.nextInt(26) + 'A');
        }
        return id;
    }
}
