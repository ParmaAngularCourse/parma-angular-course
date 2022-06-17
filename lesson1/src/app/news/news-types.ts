export type Information = {
    date: string,
    title: string,
    text?: string,
    isCheck?: boolean,
    newsType?: number
}

export type CommentObj = {
    commentText?: string,
}

export enum NewsTypes {
    Politic = 1,
    Travel,
    Economic,
    Since,
    Internet,
  }

  export type UserRightsObj = {
    isUsercanDeleteNews: boolean,
    isUsercanEditNews: boolean,
}

export type JsonInformationListData = {
    informationList: Information[]
  }

  export type searchData = {
    titleValue?: string,
    newsTypeValue?: number
}