using System.ComponentModel;

namespace AngularAppDataServer.Models
{
    public enum NewsType
    {
        [Description("Пусто")]
        Type0_None,

        [Description("Политика")]
        Type1_Policy,

        [Description("Туризм")]
        Type2_Tourism ,

        [Description("Экономика")]
        Type3_Economics,

        [Description("Наука")]
        Type4_Science,

        [Description("Интернет")]
        Type5_Internet
    }
}