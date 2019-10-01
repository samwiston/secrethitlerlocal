package org.bubs.spring;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.bubs.spring.exception.InvalidTokenException;
import org.bubs.spring.exception.RoomNotFoundException;
import org.bubs.spring.request.CreateRoomRequest;
import org.bubs.spring.response.RoomResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
public class RoomController {
    private static RoomRepository rooms = new RoomRepository();
    private static ObjectMapper mapper = new ObjectMapper();

    /**
     * POST request mapping for the /rooms endpoint.
     * Creates a room with the given server location / name.
     * @param json json String containing server location.
     * @return Room ID, for display on the frontend.
     * @throws Exception Upon the inability to parse a CreateRoomRequest
     *                   from given json.
     */
    @RequestMapping(method = RequestMethod.POST, value = "/rooms", produces = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public Room createRoom(
            @RequestBody String json)
            throws Exception {
        String newRoomId = Room.randId();
        String serverName = mapper.readValue(json, CreateRoomRequest.class).serverName;
        while (rooms.contains(newRoomId)) {
            newRoomId = Room.randId();
        }
        Room newRoom = new Room(newRoomId, serverName);
        rooms.put(newRoomId, newRoom);
        return newRoom;
    }

    /**
     * DELETE request mapping for the /rooms endpoint.
     * Deletes the room with the given room ID, granted
     * the room deletion token is valid.
     * @param roomId ID of the room needing deletion.
     * @param token Token authorizing deletion of the room.
     *              Token is given upon room creation.
     * @throws RoomNotFoundException Upon invalid given room ID.
     * @throws InvalidTokenException Upon invalid deletion token.
     */
    @RequestMapping(method = RequestMethod.DELETE, value = "/rooms/{id}", produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public void deleteRoom(
            @PathVariable("id") String roomId,
            @RequestParam("token") UUID token)
            throws RoomNotFoundException, InvalidTokenException {
        Room room = rooms.getById(roomId)
                .orElseThrow(() -> new RoomNotFoundException(roomId));
        if (!room.getDeltoken().equals(token)) {
            throw new InvalidTokenException();
        }
        rooms.delById(roomId);
    }

    /**
     * GET request mapping for the /rooms endpoint.
     * @param roomId ID of the room the user wishes to connect to.
     * @return Room response containing server location.
     * @throws RoomNotFoundException Upon invalid given room ID.
     */
    @RequestMapping(method = RequestMethod.GET, value = "/rooms/{id}", produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public RoomResponse getRoom(
            @PathVariable("id") String roomId)
            throws RoomNotFoundException {
        String serverName = rooms.getById(roomId)
                .orElseThrow(() -> new RoomNotFoundException(roomId))
                .getGameServer();
        return new RoomResponse(roomId, serverName);
    }
}