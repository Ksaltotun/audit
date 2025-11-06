export const MONTHS = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь']
export const SYSTEMS_COLOR_SETTINGS = new Map<string, any>([
  ["KIS", {
    label: "КИС 'Управление'",
    color: "red"
  }],
  ["GSZ", {
    label: "ГСЗ",
    color: "green"
  }],
  ["ASU", {
    label: "АСУ 'Занятость'",
    color: "blue"
  }],
  ["BDN", {
    label: "БДН",
    color: "blue"
  }]
])

export const eventType= {
  "systemError": "Системная ошибка",
  "security": "Событие безопасности",
  "systemAction": "Системное событие",
  "userAction": "Действие пользователя"
}

export const systemNames = {
  "KIS": "КИС 'Управление'",
  "GSZ": "ГСЗ",
  "ASU": "АСУ 'Занятость'",
  "BDN": "БДН"
}

export type KeysOfEvent = keyof typeof eventType
export type KeysOfSystems = keyof typeof systemNames

export function flatToHierarchy(flat: any) {
  const roots: any = [],
    map: any = [],
    id: any = [];
  flat.forEach((item: any) => {
    map.push(Object.assign({}, item));
    id.push(item.title);
  });

  let i;
  map.forEach((item: any) => {
    if (!item.parentName || (i = id.indexOf(item.parentName)) === -1) {
      roots.push(item);
      return;
    }

    if (map[i].children) {
      map[i].children.push(item);
    } else {
      map[i].children = [item];
    }
  });
  return roots;
}
