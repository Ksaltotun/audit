export interface InputProps {
    type: 'text' | 'password',
    placeholder: string,
    changeFunction: Function
}

export type RoutesType = 'main' | '/' | null | 'admin' | 'schema' | 'issues' | 'analitics' | 'observe'

export interface IPagesNames {
    name: Routes,
    isPageLoading: boolean
}

export interface IModalVisible {
    isVisible: bool
}


export interface IButtonProps {
    type: 'login' | 'signin' | 'navigate',
    text: string,
    routeTo?: RoutesType
}

export interface IReportMessage {
    dateApp: Date, //Дата и время события в системе
    idEvent: IdType, //Идентификатор события
    event: EventTagType, // Классификация произошедшего события системой
    appInfo: IAppInfo, // Информация о системе (модуле, подразделении в которой произощло событие)
    user: IUser, //пользователь системы
    message: string, // Человекочитаемый текст, определяется системой
    notes: INotes, // Содержит дополнительную информацию о произошедшем событии
    category?: CategoryType, // Опционально, определяется системой
    id: string, // Id в КИС "Аудит"
}

export type IdType = number | string //либо натуральное число либо GUID (строка)

export type EventTagType = 'security' | 'systemError' | 'systemAction' | 'userAction'// тег(признак) события

export interface IAppInfo {
    appName: AppName, // Имя системы, согласуется системой с КИС 
    systemDetail: string, // Определятеся системой, описывает структуру модуль
    // - подмодуль - функциональная часть и т. д, до 4 уровней вложенности
}                               //строка, где иерархия определяется через точку

export interface IUser {
    userId: IdType, // Уникальный идентификатор пользователя в системе
    userName: string, // Имя пользователя в системе
    userRole: string, // Роль пользователя в системе
}

export interface INotes {
    sourceAddress: string, // IP системы, из которой получено сообщение
    dateKIS: Date, // Дата, когда КИС получил сообщение
}

export type CategoryType = string[] // Пример: в соответствии с регламентом, с нарушением регламента

export interface IDateFilter {
    startDate: string,
    endDate: string
}

export interface IFilters {
    systemsFilter: string[],
    dateFilter: IDateFilter,
    eventFilter: string[],
    applied: boolean
}
