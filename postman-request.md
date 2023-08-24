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
4. Смана аватарки - PUTCH
http://localhost:3000/api/users/avatars
    body - form-data
    avatar(file) сам файл
    ответ:
        {
        "avatarURL": "avatars\\1691518375790-904011107_avatar.jpg"
        }

5. Разлогиниться- POST
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

1. Получить все контакты - GET
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

2. Добавить контакт - POST
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

3. Изменить контакт - PUT
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

4. Изменить поле favorite - PATCH
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

5. Найти контакт по ID - GET
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

6. Удалить контакт - DELETE
http://localhost:3000/api/contacts/64c6a8d9e52b5af44a1a2d01 
    body - нет
    ответ:
        {
        "message": "Contact delete"
        }


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

echo "export SENDGRID_API_KEY='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'" > sendgrid.env
echo "sendgrid.env" >> .gitignore
source ./sendgrid.env



// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
javascript
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const msg = {
  to: 'test@example.com', // Change to your recipient
  from: 'test@example.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })