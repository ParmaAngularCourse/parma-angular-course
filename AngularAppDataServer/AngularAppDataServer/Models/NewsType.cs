using System.ComponentModel;
using System.Runtime.Serialization;

namespace AngularAppDataServer.Models
{
    public enum NewsType
    {
        [EnumMember(Value = "Все")]
        [Description("Все")]
        Type0_None,

        [EnumMember(Value = "Политика")]
        [Description("Политика")]
        Type1_Policy,

        [EnumMember(Value = "Туризм")]
        [Description("Туризм")]
        Type2_Tourism ,

        [EnumMember(Value = "Экономика")]
        [Description("Экономика")]
        Type3_Economics,

        [EnumMember(Value = "Наука")]
        [Description("Наука")]
        Type4_Science,

        [EnumMember(Value = "Интернет")]
        [Description("Интернет")]
        Type5_Internet
    }
}