## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。
```
<select> 
下拉式選單的容器及控制元件
```
```
<option> 
下拉式選單的選項，必須放在 <select> 元素中
```
```
<canvas> 
HTML5 推出的元素，此元素在網頁上會放置一塊矩形的繪圖區（畫布），並透過 javascript 進行繪圖
可以呈現影像、動畫及特效，甚至也可以用來做影像處理或製作遊戲
```

## 請問什麼是盒模型（box modal）

幾乎所有的 HTML 元素都可以說是一個塊（block）
盒模型用來表示一個塊的尺寸是怎麼組成的。

最外層是 margin 又稱外間距，關係到與其他元素之間的距離，改變margin可能會變動自己或其他元素的位置
然後由外而內是 border 又稱框線、padding 又稱內間距、content 又稱內容，都會影響塊的尺寸
例如有一個 div 設定寬為 30px 高為 30px，padding 為 5px，border 為 2px
實際上在畫面上會佔 44x44 的大小

margin    
╔══border═════════╗   
║&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;　   padding &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;║   
║&nbsp;&nbsp;&nbsp;&nbsp;     ╔═════════╗&nbsp;&nbsp;&nbsp;&nbsp;    ║   
║&nbsp;&nbsp;&nbsp;&nbsp;     ║content&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    ║&nbsp;&nbsp;&nbsp;&nbsp;    ║   
║&nbsp;&nbsp;&nbsp;&nbsp;     ╚═════════╝&nbsp;&nbsp;&nbsp;&nbsp;    ║   
║&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;　　　　　　　║   
╚═══════════════╝   

## 請問 display: inline, block 跟 inline-block 的差別是什麼？

HTML 的元素有不同的 display 屬性預設值，會影響元素在畫面中佔據的空間及可用的屬性

inline : 元素會在同一列排在一起，無法設定 width、height，但實際佔的寬高會因為內容而改變，例如兩個span，一個 font-size 為 12 一個為 20，大小就會不一樣
         設定padding及border時會改變元素 location 的 Y 軸，但不會改變X軸，基本上 inline 元素不完全適用盒模型，修改上下的 margin 完全沒用
block : 元素自己會佔一整列，可設定寬高，設定 padding 及 border 不會改變元素的 location
inline-block : 基本上就是可以跟其他元素處於同一列的 block，可調整的屬性都和 block 相同

越寫越試越覺得 inline 的謎很多阿… 'A`

## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？

static:
元素在網頁中原本的位置（受元素本身在 HTML 標籤的位置及 CSS 屬性所影響的位置），同時 static 是預設的 position

relative: 
元素可相對於原本的位置去改變位置，relative 元素可以用 top、bottom、left、right 來改變位置

fixed: 
元素會固定在 static 的位置座標，即瀏覽器捲動時仍然會位於視窗畫面上一樣的位子
可把設為 fixed 的元素視為一個 relative 但預設位置為 body 最左上角的元素，而 top 及 left 的預設值由 static 來決定

absolute: 
類似 fixed 但預設位置是由『position不為static的父輩容器』來決定，若父容器的 position 是 static 則再找更外層的容器
若一直找到最外層都沒有則預設位置為 body 最左上角，但位置決定後還是會隨著畫面捲動而移動
       