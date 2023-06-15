# ---Assignment

<br/>

## API Routes :

#### User Routes :-

```
POST    /users/signup/
POST    /users/login/
POST    /users/verifyotp

```

---

<br/>


#### File Routes :-

```
GET    /files/
GET    /files/:fileId
POST   /files/upload
```

---

<br/>

#### user model :-
```
{
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    verify: {
      type: Boolean,
      default: false
    },
    files:[]
}
```
<br/>

#### File model :-
```
{
  filename: String,
  fileType: String,
  fileData:Buffer,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  fileCode: Number
}

```
