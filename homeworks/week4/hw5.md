## 1. 什麼是 DOM？

DOM 的全名為 Document Object Model ，HTML DOM 為每個元素定義為擁有屬性、方法及事件的物件  
並 DOM 定義了將這些物件組合起來的結構樹及事件在此結構中傳遞的方式  

## 2. 什麼是 Ajax？

Ajax 的全名是 Asynchronous Javascript and XML  
以往的網頁在更新頁面資訊時（例如送出表單資料或畫面上的數據改變）都需要重新讀取整個頁面  
除了耗時之外更無謂傳輸了大量的重複資訊，即便只是一行文字甚至一個數字的改變都要重新取得整個頁面的資料  
而 Ajax 便是以多種技術結合起來改善這個問題的技術，總括而言即如 Ajax 字面所言  
```
    以 Asynchronous （非同步請求） 的方式透過 XML 格式的文件來收送資料 
    並透過 Javascript 操作 DOM 在不用刷新頁面的情況下來變動網頁 
```
其中 XML 並不是必備條件，只要資料格式能簡潔的表示所需的資訊即可，現在較常使用 JSON 格式來做資料交換  
因只需要請求將要變更的資訊及採用 JSON 格式文檔節省了檔案大小，等候傳輸的時間減少  
且非同步請求及 Javascript 即時變更頁面的特性，大幅改善了使用者的操作體驗  

## 3. HTTP method 有哪幾個？有什麼不一樣？

HTTP method 共有九種，其中下列前三種方法在制定 HTTP/1.0 規範時被定義  
接著五種在 HTTP/1.1 時被定義，第九種則沒有被定義在 HTTP規範中   

GET: 請求一個指定的資源，通常只用於取得資料。  
HEAD: 等同於 GET ，但只取得資料的 head。  
POST: 發送一份帶有指定資源的請求，通常會改變伺服器的狀態。  
DELETE: 用來刪除指定的資源。  
PUT: 用來新增或更新指定的資源。  
OPTIONS: 用來得到指定資源的相關資訊（伺服器版本之類的）。  
TRACE: 可以用來追蹤指定資源收到請求時的請求內容。  
CONNECT: 用來與指定資源建立連線。  
PATCH: 與POST和PUT雷同，但只能用來對已存在的資源修改或添加內容。  
   
寫是這麼寫，我實在查不到什麼讓我看的懂的教學文章  
倒不如說越看越不懂了…這部份可能之後還要花很多時間學  

## 4. GET 跟 POST 有哪些區別，可以試著舉幾個例子嗎？

在發送請求的時候，GET的請求內容會被放在 head ，而POST會被放在 content  
例如想從 http://rain.bank.tw/queryDeposit.php 查到自己戶頭裡剩下多少錢  
而查詢需要告知帳戶號碼及密碼（例如帳號是rain，密碼是showMeTheMoney)  

這時候如果透過 GET 方法，會對 http://rain.bank.tw/queryDeposit.php 發送請求  
封包的請求行會帶有 ?id=rain&pw=showMeTheMoney 的資訊  
如果透過瀏覽器發送則會看到網址列變成 http://rain.bank.tw/queryDeposit.php?id=rain&pw=showMeTheMoney  
  
而透過 POST 方法時，同樣會對 http://rain.bank.tw/queryDeposit.php 發送請求  
但資訊會被1放在封包的 body 區段中，網址列則不會改變  
  
所以就隱私安全性來說，POST 比起 GET 好一點點，如果電腦畫面不會被透過任何方式被看見  
那POST跟GET其實就隱私安全性來說沒有差別  
又如果有人可以從近端攔截你的封包，那 GET 跟 POST 同樣也是沒有差別的  
  
就資料安全來說，由於 GET 方法通常只用來取得資料，所以是安全的  
而 POST 方法可以改變資料，有可能造成資料遺失等狀況，是不安全的  
但實際上 GET 跟 POST 造成的改變是視 server 端的實作而異，所以同樣也是沒什麼差別的…  
  
就資料傳輸速度來說，GET 則是可以得到全面的勝利  
原因有三，一是 GET 預設可以快取，故如果重複取得相同的資料，可以從快取中拿到資料  
POST 要從快取拿則需要變更設定或在封包上動點手腳  
二是 POST 會在封包 head 區段帶有較多一點的資訊  
三是 POST 會在取得資料前先送一次 head 給 server 做確認，得到回應後才真正發送完整封包  
故 GET 在傳輸速度上是比較理想的  

## 5. 什麼是 RESTful API？

REST 全名 Resource Representational State Transfer ，是一種設計架構  
RESTful API 是指按 RESTful 設計的 API 服務（受到六種約束條件下設計）  
最主要的目的是讓你的 API 在網址就具有可辨視性，以資源為主體  
並運用HTTP規範中沒有人在乎他們生存意義的其他 HTTP Method 來實現資源操作（對應到資料處理的CRUD）  

Create : POST (用來新建資源)  
Read : GET (用來取得資源)  
Upate : PUT (用來更新修改資源)  
Delete : Delete (用來刪除資源)  

## 6. JSON 是什麼？

JSON，全名JavaScript Object Notation  
一種輕量化的資料格式，受到 JavaScript 物件的設計方式啟發  
格式類似 Javascript 的物件屬性及陣列的組合  
但 JSON 撰寫時在 proprety 及 value 都要加上雙引號" "，可視為純字串  

一個JSON格式的資料長得像這個樣子  
{"person" : [{"firstname" : "johnny" , "lastname" : "jhou"} , {"firstname" : "hana" , "lastname" : "rin"} ]}  
解析後可以得到兩個 person 物件，都擁有 firstname 及 lastname 但有不同的值  

## 7. JSONP 是什麼？

JSONP 是 JSON with Padding 的簡稱  
主要是因為透過 `<script> 標籤` 的 src 屬性在取得 js 檔時不會遇到非同源請求問題的特性  
可以利用此特性用來做動態資料交換  

## 8. 要如何存取跨網域的 API？

透過跨來源資源共享（CORS）來實現  
瀏覽器在發出 request 時會在標頭加入 origin 註明自己的來源  
伺服器端如果同意進行 CORS 則會在 response 檔頭加入 Access-Control-Allow-Origin 註明接受的來源  
瀏覽器會解析 origin 是否在 Access-Control-Allow-Origin 的範圍中  
如果是的話才會真正去接收運作這個 response 的內容  
  
## 作業心得

我覺得這次的作業最難的是 hw5 ... 查這些東西應該花了16小時以上  
而且查完還是沒有很懂 orz 我覺得每題認真要寫都可以寫上好幾千字，有的應該要破萬字  

像第 7 題跟第 8 題，我以前有碰過 CORS 的問題  
反而從來沒聽過 JSONP ，所以直覺 JSONP 是新的東西  
但越看資料越覺得奇怪，沒有什麼 JSONP 能做但 CORS做不到的 ...  
那為什麼還會有 JSONP 技術的出現？一直以為是我沒看懂 JSONP 跟 CORS 的差別  
看到後來才發現 JSNOP 是最早用來處理同源政策的手法， CORS 是後來才出現的 orz  
  
同源政策看了一看我也覺得很妙，如果有人自己寫了一套不執行同源政策的瀏覽器  
那不就可以繞過這些檢查…畢竟檢查都是實做在瀏覽器上阿  
  
第 8 題我後來自己在試的時候發現也不是所有 request 都會帶 origin  
不懂什麼情況才會發送，莫非只有用 ajax 的時候才會遇到這種問題？  
為了試這個想說去拿高雄市政府的開放資料，結果不知道他們是有什麼障礙  
API網址都藏起來，去挖 response 才找到 ...  
  
3、4、5 題也是越寫越不懂  
其實 GET 跟 POST 就足夠應付所有的需求了  
畢竟收到 request 之後做什麼事是由 server 端來實作  
甚至要用 GET 來做 CRUD 應該都是可行的，實際上限制 GET 的 queryString 是瀏覽器的網址列  
http method 的定義中好像沒這個限制  
感覺這些 method 跟暗號一樣…只是溝通的方式，但收到暗號要幹嘛還是由收到暗號的人決定  
查 http method 的時候看到這一個文章很有趣  
https://www.quora.com/What-are-HTTP-methods-and-what-are-they-used-for  
裡面最後一段提到  
```
 In my view, every web developer should be familiar with the core four methods of  
 GET, POST, PUT and DELETE.  If you can name TRACE, OPTIONS and HEAD and describe  
 to me what they do, you'd be above the vast majority of developers out there and   
 place you into "web guru" status.
```
他怎麼不把這一段放到文章開頭阿 Q_Q...  
希望之後實作經驗增加之後能更體會內化這些問題的答案…都是些找了答案反而問題變更多的題目  
  
說到實作，來提一下其他作業～  
第一題: 計算機  
　　有實作連續運算跟暫存運算，有限制輸入數字位數上限，還有被玩壞的時候會哭 XD  
　　做這題的時候遇到 flex 的缺點（或者是我不知道怎麼解決）  
　　原本所有的按鍵都是包在同一個 div 底下，我想說應該有辦法可以讓比較大的 div（等號）佔兩格  
　　但試不出來怎麼做  
  
第二題: 問卷表單  
　　這題覺得自己做的還不錯 A_A 幾乎跟 google 的一樣  
　　但 radio button 跟 google 的還是有差，還沒找到辦法做的一模一樣  
　　input text 得到焦點時的底線特效也做不出來，沒概念要怎麼做出從中間往兩邊變粗的效果  
　　另外有做簡單的 Email 驗證  
  
第三題: twitch API  
　　這題我的 HTML BODY 中只有一個 div 標籤，剩下都是動態增加的，自己覺得很厲害 XD  
　　另外想問老師為什麼 Amelie 的 twitch 頁不適合用來當作品？  
　　我本來覺得自己的做的還不錯，看到她做的就覺得輸了…  
　　聽到她的作業被老師打槍我就更挫折了，她的被打槍那我的應該要被炮轟 OTL  
　　要展示自己有運用 API 來更新畫面的能力還有哪些該做的事？  
　　還是與其只 demo 這種小作品不如做一整個功能完整的網站？  
  
第四題: 化繁為簡  
　　這題沒什麼特別的問題，只是好奇 jQuery 現在在業界是怎麼被看待的  
　　我一直覺得 jQuery 好棒棒，但好像聽說過 jQuery 會漸漸被淘汰的傳言，真有其事嗎 @@?  