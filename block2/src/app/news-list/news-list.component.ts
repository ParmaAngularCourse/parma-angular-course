import { Component, OnInit } from '@angular/core';
import { News } from 'src/model/news';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {

  public newsArray:News[];

  constructor()
  {
    this.newsArray = [
      new News(new Date(1961,3,12), "Первый человек в космосе", "Советский космонавт Юрий Гагарин на космическом корабле «Восток-1» стартовал с космодрома «Байконур» и впервые в мире совершил орбитальный облёт планеты Земля. Полёт в околоземном космическом пространстве продлился 108 минут."),
      new News(new Date(1917,10,7), "Октябрьская революция", "Временное правительство было свергнуто в ходе вооружённого восстания в Петрограде, главными организаторами которого были В. И. Ленин, Л. Д. Троцкий, Я. М. Свердлов, В. А. Антонов-Овсеенко, П. Е. Дыбенко, И. В. Сталин и другие. Непосредственное руководство захватом власти осуществлял Военно-революционный комитет Петроградского Совета, в который входили также левые эсеры. В результате вооружённого переворота к власти пришло правительство, сформированное II Всероссийским съездом Советов, абсолютное большинство делегатов которого составили большевики (РСДРП(б)) и их союзники левые эсеры, поддержанные также некоторыми национальными организациями, небольшой частью меньшевиков-интернационалистов, и некоторыми анархистами. В ноябре 1917 года новое правительство было поддержано также большинством Чрезвычайного Съезда крестьянских депутатов. Данная революция имела далеко идущие последствия не только для России, но и для всего мира."),
      new News(new Date(1861,2,3), "Крестьянская реформа", "В Петербурге император Александр II подписал Манифест «О Всемилостивейшем даровании крепостным людям прав состояния свободных сельских обывателей» и Положение о крестьянах, выходящих из крепостной зависимости, состоявшие из 17 законодательных актов."),
      new News(new Date(1812,8,7), "Бородинское сражение", "Принимая решение на битву, русский главнокомандующий генерал от инфантерии светлейший князь М.И. Голенищев-Кутузов исходил из требований императора Александра I, настроения армии, жаждавшей дать неприятелю бой, и понимания того, что Москву отдавать французам без сражения никак нельзя. Для того, чтобы сразиться, требовалось найти поле, которое бы смогло вместить на боевой позиции большую часть русской армии, позволяло ей маневрировать в ходе битвы, обеспечивало природными препятствиями оборону и перекрывало собой Новую и Старую Смоленские дороги, ведущие к Москве. Такое поле было найдено полковником генерал-квартирмейстерской службы К.И. Толем перед г. Можайском. В центре поля находилось с. Бородино, от которого сражение получило свое название."),
      new News(new Date(1703,4,27), "Основан город Санкт-Петербург", "В день Святой Троицы, в устье реки Невы на Заячьем острове Петром I была заложена крепость. Именно этот день считается днём основания Санкт-Петербурга, который более 200 лет являлся столицей Российской империи. План будущей крепости начертил сам Пётр. Своё имя — «Санкт-Питербурх» — крепость получила в Петров день, когда здесь была заложена церковь Святых апостолов Петра и Павла. Это имя получил и возникший вокруг острова город. Апостол Пётр, по христианскому преданию, был хранителем ключей от рая, что также казалось русскому царю символичным, поскольку город, носящий имя его небесного покровителя, должен был стать «ключом от Балтийского моря».")
    ]
  }

  ngOnInit(): void {
  }

}
