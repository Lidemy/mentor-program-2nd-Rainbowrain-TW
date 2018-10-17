## 資料庫欄位型態 VARCHAR 跟 TEXT 的差別是什麼

VARCHAR 可建索引 TEXT 不可
VARCHAR 可限制長度 TEXT 不可
VARCHAR 最長可存 65532 個字元 TEXT 最長可存 65535

基於以上 3 點我認為最大的差別是 varchar 可以限制長度
如果使用 TEXT 有可能因為安全性問題被寫大量資料

其次是索引，但因為太長的索引沒有意義，實際上資料庫也不接受
所以在超過 255 字元的情況下，VARCHAR 跟 TEXT 在儲存資料這點來說沒什麼很大的差別

使用 VARCHAR 時如果需要儲存大量文字有幾點要留意
1. 5 版以前的 mysql 的 VARCHAR 只能存 255 個字元
2. 5 版以後，可以存最多 65532 個 Byte ，還要視編碼決定最多能存幾個字元
    （例如 utf 每個字元佔 3 Byte，故只能存 65532/3 = 21845，超過 255 字元要再拿 1 byte 來儲存長度，所以實際是存 21484）
3. 5 版後某個版本前 VARCHAR(30) 代表的意思不一樣
   較早的版本 VARCHAR(30) 代表的是 30 個 Bytes，存 utf8 時只能存 10 個字
   較新的版本 VARCHAR(30) 代表的是 30 個字元，存 utf8 時可以存 30 個字，但仍會佔用 90 Bytes

另外由於 mysql 的 row 的大小有限制(65535 Bytes)，VARCHAR佔的空間會佔用 row 的大小，而 TEXT 不會，TEXT 只會佔用 9 ~ 12 Bytes 來儲存指標
所以當存放的資料將超過 row 上限時，只能使用 TEXT 來存放

總結的總結，這一點應該才是 VARCHAR 跟 TEXT 最大的差異
只是現實來說依我目前的認知每 row 要存放超過 65535 Bytes，不是情況太特殊，特殊到應該考慮其他資料存放方式
不然就是資料庫設計有問題（例如 1 row 存一本小說之類的）

參考資料：
https://www.cnblogs.com/billyxp/p/3548540.html
http://blog.kejyun.com/2012/09/MySQL-Field-Data-Type-Description-And-Compare.html
https://stackoverflow.com/questions/13506832/what-is-the-mysql-varchar-max-size
https://stackoverflow.com/questions/25300821/difference-between-varchar-and-text-in-mysql/25301046
https://stackoverflow.com/questions/2023481/mysql-large-varchar-vs-text
https://dev.mysql.com/doc/refman/8.0/en/column-count-limit.html
https://dev.mysql.com/doc/refman/8.0/en/column-count-limit.html#row-size-limits

## Cookie 是什麼？在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又會以什麼形式帶去 Server？

由於 HTTP 是無狀態協議，所以每個 request 之間都是沒有關聯的，因此誕生了 Cookie
Cookie 主要的用途是用來記錄一些會重複利用到的訊息，並讓 Server 能認得 Client
（如果 Server 無法辨別 Client 的不同，就很難做會員登入等需要辨識 Client 之後各別做不同處理的工作）

Cookie 的設定應由 Server 端來執行，Server 在收到特定請求後（例如會員登入或選擇商品放到購物車中）
會在 response 的 head 區段中加入 set-cookie 的訊息
而 Browser 會在收到 set-cookie 的訊息後將 cookie 內容存放在專用的儲存位置（依RFC定義的標準設定）
之後發送 request 時便會檢查 cookie 區中有沒有符合條件（網域、目錄位置、期限及安全性）的 cookie
如果有的話就會夾帶在 request 的 head 區段一起發送到 Server

其實這樣看起來我的作業有點問題…我的 cookie 是用 javascript 設定的 orz

參考資料：
https://ithelp.ithome.com.tw/articles/10187441 老師的文章~
https://zhuanlan.zhihu.com/p/27669892
https://blog.miniasp.com/post/2008/02/22/Explain-HTTP-Cookie-in-Detail.aspx

## 我們本週實作的會員系統，你能夠想到什麼潛在的問題嗎？

1. 密碼沒有加密
2. 沒有Email等驗證資訊（帳號被盜或忘記帳號、密碼都沒辦法處理）
3. 無法修改基本資料
4. cookie 沒有成對的 session 做檢查

## 其他

1. 寫了作業之後才又覺得我實作的留言板問題很多，因為我一開始就想實現不換頁的留言板（後來知道是week7的作業…）
   所以 php 只用來做後端，cookie 是靠前端設定，所以 cookie 資訊一但被盜，雖然對現在的留言板是沒什麼差別，
   頂多是被冒用身份留言（但因為留言沒記IP，所以嚴格來講還是個大問題…），但未來增加編輯或刪除甚至修改基本資
   料之類的功能後這問題就大了…所以就算 cookie 靠 javascript 做，執行一些該受到管理的動作時還是要經過後端
   做檢查才對…

2. 作業在 week5 的要求內覺得自己還沒做好的地方
    a. Page 不會隨著留言數量增加跟著增加，要重新讀取才會變更
    b. cookie 時間到期時沒有做檢查，有些顯示會不正常
    c. 同篇文章 comments 過多時沒有折疊功能
    d. 暫時想不到直接把「文章」跟「留言」用一次 sql 撈出來的方式
    e. 留言每篇文章都要撈一次，對資料庫的連線太頻繁
    f. css 跟 js 的 code 還有很多可以精簡的地方

3. 覺得自己做的不錯的地方
    a. 發新文章、留言、登錄及註冊都可以在同一個頁面完成，除了登出之外都不用reload
        （登出其實也行，只是登出沒做 reload 的動作我自己覺得怪怪的，沒有確實登出的感覺）
    b. 新增留言的時候除了同時寫入資料庫也會直接更新頁面
    c. 新增文章時同頁面還是會維持 10 篇文章
    d. 認識很多特效的作法
    e. 查資料的過程中找到用 javascript 實作 jQuery $.ajax 的方法
    f. 後端嚐試用 RESTful 來做，雖然做的很爛但做過就更有體會    

4. 大災難。我發現我的作業只能用 chrome 來開，用 IE11+ 跟 FireFox 跑起來都有問題，而且我查不出來問題是什麼
   這兩種 browser 遇到的問題還不一樣 Orz 希望老師能幫我看一下QQ
   FireFox: 版型跑掉，但我看 CSS 沒有問題，不知道為什麼 navbar 的高度會變這麼高，留言板的 position 座標也跑掉
            week4的化繁為簡那個 q('selector') 執行時會報錯，但我在 console 打明明可以用…
   IE11+：  版型正常，但 javascript 都沒有反應（所有function）
   
   FireFox 的開發者工具還不熟不太知道怎麼運用，IE 好像有個 bug 要先處理，剛剛想到 FireFox 的問題不知道是不是跟
   之前討論到的 normalize 有關係…明天再來測試了。

   雖然還有很多缺陷跟問題要解決，但總算是做完了 QQ 總覺得這個禮拜要追上 week7 希望渺茫阿 OTL