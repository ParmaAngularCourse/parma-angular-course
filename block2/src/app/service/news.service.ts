import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsyncSubject, BehaviorSubject, map, Observable, ReplaySubject, tap } from 'rxjs';
import { INewsData } from 'src/model/INewsData';
import { News } from 'src/model/News';
import { ServerResponse } from 'src/model/ServerResponse';
import { TypeNews } from 'src/model/TypeNews';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private newsArray: News[] = [
    new News(1, new Date(1961,3,12), "Первый человек в космосе", "Советский космонавт Юрий Гагарин на космическом корабле «Восток-1» стартовал с космодрома «Байконур» и впервые в мире совершил орбитальный облёт планеты Земля. Полёт в околоземном космическом пространстве продлился 108 минут.", TypeNews.Type4_Science),
    new News(2, new Date(1917,10,7), "Октябрьская революция", "Временное правительство было свергнуто в ходе вооружённого восстания в Петрограде, главными организаторами которого были В. И. Ленин, Л. Д. Троцкий, Я. М. Свердлов, В. А. Антонов-Овсеенко, П. Е. Дыбенко, И. В. Сталин и другие. Непосредственное руководство захватом власти осуществлял Военно-революционный комитет Петроградского Совета, в который входили также левые эсеры. В результате вооружённого переворота к власти пришло правительство, сформированное II Всероссийским съездом Советов, абсолютное большинство делегатов которого составили большевики (РСДРП(б)) и их союзники левые эсеры, поддержанные также некоторыми национальными организациями, небольшой частью меньшевиков-интернационалистов, и некоторыми анархистами. В ноябре 1917 года новое правительство было поддержано также большинством Чрезвычайного Съезда крестьянских депутатов. Данная революция имела далеко идущие последствия не только для России, но и для всего мира.", TypeNews.Type1_Policy),
    new News(3, new Date(1861,2,3), "Крестьянская реформа", "В Петербурге император Александр II подписал Манифест «О Всемилостивейшем даровании крепостным людям прав состояния свободных сельских обывателей» и Положение о крестьянах, выходящих из крепостной зависимости, состоявшие из 17 законодательных актов.", TypeNews.Type3_Economics),
    new News(4, new Date(1812,8,7), "Бородинское сражение", "Принимая решение на битву, русский главнокомандующий генерал от инфантерии светлейший князь М.И. Голенищев-Кутузов исходил из требований императора Александра I, настроения армии, жаждавшей дать неприятелю бой, и понимания того, что Москву отдавать французам без сражения никак нельзя. Для того, чтобы сразиться, требовалось найти поле, которое бы смогло вместить на боевой позиции большую часть русской армии, позволяло ей маневрировать в ходе битвы, обеспечивало природными препятствиями оборону и перекрывало собой Новую и Старую Смоленские дороги, ведущие к Москве. Такое поле было найдено полковником генерал-квартирмейстерской службы К.И. Толем перед г. Можайском. В центре поля находилось с. Бородино, от которого сражение получило свое название.", TypeNews.Type1_Policy),
    new News(5, new Date(1703,4,27), "Основан город Санкт-Петербург", "В день Святой Троицы, в устье реки Невы на Заячьем острове Петром I была заложена крепость. Именно этот день считается днём основания Санкт-Петербурга, который более 200 лет являлся столицей Российской империи. План будущей крепости начертил сам Пётр. Своё имя — «Санкт-Питербурх» — крепость получила в Петров день, когда здесь была заложена церковь Святых апостолов Петра и Павла. Это имя получил и возникший вокруг острова город. Апостол Пётр, по христианскому преданию, был хранителем ключей от рая, что также казалось русскому царю символичным, поскольку город, носящий имя его небесного покровителя, должен был стать «ключом от Балтийского моря».", TypeNews.Type2_Tourism)
  ];

  private newsListSubject?:BehaviorSubject<INewsData[]>;

  constructor(private httpService:HttpClient){}

  public getNewsList():Observable<INewsData[]>{
    if(!this.newsListSubject){
      this.newsListSubject = new BehaviorSubject<INewsData[]>([]);
      this.httpService.get<ServerResponse<INewsData[]>>('https://localhost:44379/api/NewsData/GetNews')
      .pipe()
      .subscribe({
        next: (response)=> { 
          var newsList:News[] = [];
          if (response.isSuccess === false) {
            console.error(`Ошибка при получении данных c сервера: ${response.errorText}`)
            //throw new TypeError(`Ошибка при получении данных сервера ${response.errorText}`)
          }
          else{
            newsList = response?.data?.map(sNews=>new News(sNews.id,
                                                       new Date(sNews.date),
                                                       sNews.title,
                                                       sNews.body,
                                                       sNews.type)) ?? []
          }
          newsList = newsList.sort((newsF, newsS)=>newsS.date.getTime() - newsF.date.getTime());
          this.newsListSubject?.next(newsList); 
        },
        error:(err)=> { console.error(`Ошибка при получении данных c сервера: ${err}`)}        
      });
    }

    return this.newsListSubject.asObservable();
  }

  public addNews(news: INewsData){
    if(this.newsListSubject){
      var newsArray = this.newsListSubject?.value ?? [];
      var editNews = new News(news.id, news.date, news.title, news.body, news.type);
      if(newsArray.length > 0){
        var newsIndex = newsArray.findIndex(x=>x.id == editNews.id);
        if(newsIndex < 0){
          var maxNewsId = Math.max.apply(Math, newsArray.map(function(n) { return n.id; }));
          editNews.id = maxNewsId + 1;
        }
      }
      else{
        editNews.id = 0;
      }
      this.httpService.post<ServerResponse<void>>('https://localhost:44379/api/NewsData/AddNews',editNews)
      .pipe()
      .subscribe({
        next: (response)=> {
          if (response.isSuccess === false) {
            console.error(`При попытке изменить список новостей возникла ошибка: ${response.errorText}`)            
          }
          else{            
            var newsIndex = newsArray.findIndex(x=>x.id == editNews.id);
            if(newsIndex > -1){
              newsArray[newsIndex] = editNews;
            }
            else{
              newsArray.push(editNews);      
            }       
            newsArray = newsArray.sort((newsF, newsS)=>newsS.date.getTime() - newsF.date.getTime());
            this.newsListSubject?.next(newsArray);
          }           
        },
        error:(err)=> { console.error(`При попытке изменить список новостей возникла ошибка: ${err}`)}        
      });
    }
  }  

  public deleteNews(news:News){
    if(this.newsListSubject){  
      var params = new HttpParams().set('newsId',news.id)    
      this.httpService.delete<ServerResponse<void>>('https://localhost:44379/api/NewsData/DeleteNews',{
        params: params
      })
      .pipe()
      .subscribe({
        next: (response)=> {  
          var newsArray = this.newsListSubject?.value ?? [];         
          if (response.isSuccess === false) {
            console.error(`При попытке удалить новость возникла ошибка: ${response.errorText}`)            
          }
          else{
            var newsIndex = newsArray.indexOf(news, 0);
            if (newsIndex > -1) {

              newsArray.splice(newsIndex, 1);
            }
            this.newsListSubject?.next(newsArray);
          }           
        },
        error:(err)=> { console.error(`При попытке удалить новость возникла ошибка: ${err}`)}        
      });
    }
  }
}
