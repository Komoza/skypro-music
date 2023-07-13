# Skypro.Music API

Документация в swagger:
https://painassasin.online/swagger/

## Пользователи

| Описание запроса   | Тип запроса | Пример запроса                                 |
| ------------------ | ----------- | ---------------------------------------------- |
| Зарегистрироваться | POST        | https://painassasin.online/user/signup/        |
| Войти              | POST        | https://painassasin.online/user/login/         |
| Получить ключ      | POST        | https://painassasin.online/user/token/         |
| Обновитьключ       | POST        | https://painassasin.online/user/token/refresh/ |

## Треки

| Описание запроса                 | Тип запроса | Пример запроса                                           |
| -------------------------------- | ----------- | -------------------------------------------------------- |
| Получить все треки               | GET         | https://painassasin.online/catalog/track/all/            |
| Получить трек по id              | GET         | https://painassasin.online/catalog/track/<id\>           |
| Добавить трек в избранное по id  | POST        | https://painassasin.online/catalog/track/<id\>/favorite/ |
| Удалить трек из избранного по id | DELETE      | https://painassasin.online/catalog/track/<id\>/favorite/ |
| Получить все избранные треки     | GET         | https://painassasin.online/catalog/track/favorite/all/   |
| Посмотреть подборки              | GET         | https://painassasin.online/catalog/selection/            |
| Посмотреть подборку по id        | GET         | https://painassasin.online/catalog/selection/<id\>/      |
