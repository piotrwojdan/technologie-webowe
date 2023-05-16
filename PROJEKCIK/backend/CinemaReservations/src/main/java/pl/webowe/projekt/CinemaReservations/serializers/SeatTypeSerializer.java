package pl.webowe.projekt.CinemaReservations.serializers;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import pl.webowe.projekt.CinemaReservations.models.SeatType;

import java.io.IOException;

public class SeatTypeSerializer extends JsonSerializer<SeatType> {

    @Override
    public void serialize(SeatType seatType, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeNumberField("id", seatType.getId());
        jsonGenerator.writeStringField("type", seatType.getType());
        jsonGenerator.writeNumberField("price", seatType.getPrice());
        jsonGenerator.writeEndObject();
    }
}

