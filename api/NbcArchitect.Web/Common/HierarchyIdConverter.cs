using System;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace NbcArchitect.Web.Common;

public class HierarchyIdConverter : JsonConverter<HierarchyId>
{
    public override HierarchyId Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options) {
        return HierarchyId.Parse(reader.GetString());
    }

    public override void Write(Utf8JsonWriter writer, HierarchyId value, JsonSerializerOptions options) {
        writer.WriteStringValue(value.ToString());
    }
}