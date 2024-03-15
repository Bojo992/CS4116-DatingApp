# Database

<code-block lang="mermaid">
erDiagram
    User ||--|{ CHATS : HAS
    User {
    int UniqueID PK
    int ID PK
    int personalInfo FK
    int course FK
    timestamp dateCreated
    bit isAdmin
    }
    CHATS ||--|{ MESSAGES : CONTAINS
    CHATS{
    int UniqueId PK
    int id PK
    int userID FK
    }
    MESSAGES ||--|{ REACTION: CONTAINS
    MESSAGES{
    int UniqueID PK
    int id PK
    int chatId FK
    varchar(100) message
    int from FK
    int to FK
    int reactionsNum
    int referencedMessageId
    bit isPhoto
    }
    REACTION }|--|| REACTION_TYPE: HAS
    REACTION{
    int UniqueID PK
    int messageID FK
    int reactionTypeID FK
    }
    REACTION_TYPE{
    int UniqueID PK
    int reactionTypeID PK
    varchar(200) location
    varchar(50) name
    }
    User ||--|| PersonalInfo : HAS
    PersonalInfo{
    int UniqueID PK
    int ID PK
    varchar(100) bio
    bit smoking
    int age
    bit vegan
    varchar(50) location
    bit gender
    bit drinking
    }
    User ||--|| Credentials : HAS
    Credentials{
    int UniqueID PK
    varchar(50) email PK
    int UserId FK
    varchar(50) password
    }
    User ||--|| UserCourse : HAS
    UserCourse ||--|| University : HAS
    UserCourse{
    int UniqueID PK
    int id PK
    int universityId FK
    int courseId FK
    }
    UserCourse ||--|| COURSE : HAS
    University ||--|{ COURSE : HAS
    University {
    int UniqueID PK
    int id PK
    varchar(30) name
    }
    COURSE{
    int UniqueID PK
    int id PK
    int universityID FK
    varchar(30) name
    }
    User }o--o{ BanList : HAS
    BanList{
    int UniqueID PK
    int id PK
    int userId FK
    varchar(100) reason
    }
    User ||--|{ PersonalInterests : HAS
    PersonalInterests }|--|{ Interest   : HAS
    PersonalInterests{
    int UniqueID PK
    int UserId FK
    int interestId FK
    }
    Interest }|--|{ INTEREST_TYPE  : HAS
    Interest {
    int UniqueID PK
    int UserId FK
    int interestTypeID FK
    varchar(200) settings
    }
    User }|--|{ likes : HAS
    likes{
    int UniqueId PK
    int userID FK 
    int recommendedUserId FK
    }
    User }|--|{ dislikes : HAS
    dislikes{
    int UniqueID PK
    int userId FK
    int recommendedUserId Fk
    }
    INTEREST_TYPE{ 
    int UniqueId PK 
    int id PK
    varchar(50) description
    varchar(200) type
    bit isImportant
    }

</code-block>