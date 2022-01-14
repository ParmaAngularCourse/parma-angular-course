using System;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace PostsApi.Convertors
{
    public class JsonDateTimeConvertor: JsonConverter<DateTime>
    {
    
        public override DateTime Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {

            if (!reader.TryGetDateTime(out DateTime value))
            {
                value = DateTime.Parse(reader.GetString());
            }

            return value;
        }

        public override void Write(Utf8JsonWriter writer, DateTime value, JsonSerializerOptions options)
        {
            writer.WriteStringValue(value.ToString("yyyy-MM-ddTHH:mm:ss"));
        }

    }
}