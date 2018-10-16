資料庫名稱：users

| 欄位名稱 | 欄位型態 | 說明 |
|----------|----------|------|
| uid |  int auto_increment | 使用者序號 |
| id | varchar(12) | 使用者登錄帳號 |
| pw | varchar(12) | 使用者登錄密碼 |
| nick | varchar(10) | 使用者暱稱 |
| avatar | int | 使用者頭像 |

資料庫名稱：posts

| 欄位名稱 | 欄位型態 | 說明 |
|----------|----------|------|
| pid | int auto_increment  | 文章序號 |
| uid | foreign key | 發文者序號 |
| title | varchar(100) | 文章主題 |
| content | VARCHAR(6000) | 文章內容 |
| timestamp | datetime | 發文時間 |
| title_edited | tinyint | 文章主題是否編輯過 |
| content_edited | tinyint | 文章內容是否編輯過 |

資料庫名稱：comments

| 欄位名稱 | 欄位型態 | 說明 |
|----------|----------|------|
| rid |  int auto_increment  | 留言序號 | 
| pid |  foreign key | 留言對應的文章序號 | 
| uid |  foreign key | 留言者序號 | 
| content |  VARCHAR(6000)  | 留言內容 | 
| content_edited | tinyint | 留言內容是否編輯過 | 
| timestamp | datetime | 留言時間 | 