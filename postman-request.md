<!-- USER -->

1. Регистрация пользователя - POST
http://localhost:3000/api/users/register
    body:
        {
        "password": "111",
        "email": "yyy@nnn.nnn"
        }
    ответ:
        {
        "email": "yyy@nnn.nnn",
        "subscription": "starter"
        }

2. Логин - POST
http://localhost:3000/api/users/login
    body:
        {
        "password": "111",
        "email": "yyy@nnn.nnn"
        }
    ответ - token
        {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZDEzNTgwMzU1NTk0ZWQyYjFmNjNhYSIsImlhdCI6MTY5MTQzMjQzNywiZXhwIjoxNjkxNTE1MjM3fQ.l7fW5w2WjtO5JyFTez-uDHTAtnOlTmHVmfwLD7zx0CA"
        }

3. Получить текущего пользователя - GET
http://localhost:3000/api/users/current
    body - нет
    ответ:
        {
        "email": "yyy@nnn.nnn"
        }

4. Разлогиниться- POST
http://localhost:3000/api/users/signout
    body:
        {
        "email": "yyy@nnn.nnn"
        }
    ответ:
        {
        "message": "Signout success"
        }

<!-- CONTACTS -->
<!-- обязательно вставить токен, получнный при логинизации: Authorization => Bearer Token -->

5. Получить все контакты - GET
http://localhost:3000/api/users/contacts
    body - нет
    ответ:
        [
            {
            "_id": "64d13722355594ed2b1f63b1",
            "name": "Ira Smith",
            "email": "ismith@vestibul.co.uk",
            "phone": "(050) 100-3792",
            "favorite": false,
            "owner": {
                "_id": "64d13580355594ed2b1f63aa",
                "password": "$2a$10$EEIkFvCQ36qYnTYe3flW4eIM6lsunLIgoj1pyc0AIZDxlHrVygsta",
                "email": "yyy@nnn.nnn"
                }
            }
        ]

6. Добавить контакт - POST
http://localhost:3000/api/contacts
    body:
        {
        "name": "Ira Smith",
        "email": "ismith@vestibul.co.uk",
        "phone": "(050) 100-3792",
        "favorite": "false"
        } 
    ответ:
        {
        "name": "Ira Smith",
        "email": "ismith@vestibul.co.uk",
        "phone": "(050) 100-3792",
        "favorite": false,
        "owner": "64d13580355594ed2b1f63aa",
        "_id": "64d13722355594ed2b1f63b1",
        "createdAt": "2023-08-07T18:25:38.452Z",
        "updatedAt": "2023-08-07T18:25:38.452Z"
        }

7. Изменить контакт - PUT
http://localhost:3000/api/contacts/64c6a60bf2583a8261235519
    body - все обязательные поля, даже если в них ничего не меняем:
        {
        "name": "Ivchenko",
        "email": "new@email.com",
        "phone": "(050) 111-0755"
        }
    ответ:
        {
        "_id": "64c6a60bf2583a8261235519",
        "name": "Ivchenko",
        "email": "new@email.com",
        "phone": "(050) 111-0755",
        "favorite": false,
        "owner": "64c6a3fe547734f7e28e87f8",
        "createdAt": "2023-07-30T18:03:55.295Z",
        "updatedAt": "2023-08-07T18:49:58.400Z"
        }

8. Изменить поле favorite - PATCH
http://localhost:3000/api/contacts/64c6a60bf2583a8261235519/favorite
    body:
        {
        "favorite": "true"
        }
    ответ:
        {
        "_id": "64c6a60bf2583a8261235519",
        "name": "Ivchenko",
        "email": "new@email.com",
        "phone": "(050) 111-0755",
        "favorite": true,
        "owner": "64c6a3fe547734f7e28e87f8",
        "createdAt": "2023-07-30T18:03:55.295Z",
        "updatedAt": "2023-08-07T18:49:58.400Z"
        }

9. Найти контакт по ID - GET
http://localhost:3000/api/contacts/64c6a8d9e52b5af44a1a2d01 
    body - нет
    ответ: 
        {
        "_id": "64c6a8d9e52b5af44a1a2d01",
        "name": "Poly Molys",
        "email": "poly@vestibul.co.uk",
        "phone": "(063) 987-0888",
        "favorite": false,
        "owner": "64c6a3fe547734f7e28e87f8",
        "createdAt": "2023-07-30T18:15:53.765Z",
        "updatedAt": "2023-07-30T18:15:53.765Z"
    }

10. Удалить контакт - DELETE
http://localhost:3000/api/contacts/64c6a8d9e52b5af44a1a2d01 
    body - нет
    ответ:
        {
        "message": "Contact delete"
        }
