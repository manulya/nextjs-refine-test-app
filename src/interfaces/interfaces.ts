export interface IUser {
  id: string; // ID пользователя
  first_name: string; // Имя
  last_name: string; // Фамилия
  job_title: string; // Должность
  seniority_level: string; // Уровень старшинства
  skills: string[]; // Массив навыков
}

export interface IData {
  data: IUser[]; // Массив пользователей
}

export interface IAuth {
  email: string;
  name: string;
  avatar: string;
  roles: string[];
}
