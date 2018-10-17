//將JSON轉成文章物件
function createPost(obj) {
    var post = {
        pid: obj['pid'],
        user: obj['id'],
        avatar: obj['avatar'],
        title: obj['title'],
        content: obj['content'],
        time: obj['timestamp'],
        title_edited: obj['title_edited'],
        content_edited: obj['content_edited']
    }
    return post;
}

//顯示文章
function showPost(objAry) {
    q('.board>span').style.display = 'none';

    //console.log('objAry :', objAry);
    for (let obj in objAry) {
        //console.log(objAry[obj]);
        createPostElement(objAry[obj]);
    }
}

//將文章顯示到畫面上
function createPostElement(obj) {
    var avatar = "./avatar" + obj.avatar + ".png";
    var useravatar = "./avatar" + (getCookie("useravatar") ? getCookie("useravatar") : 1) + ".png";

    var post = document.createElement('div');
    post.classList.add('post');
    post.data_pid = obj.pid;

    var post__title = document.createElement('div');
    post__title.classList.add('post__title');
    post__title.innerText = obj.title;
    post__title.title = obj.title;

    var post__info = document.createElement('div');
    post__info.classList.add('post__info');
    var post__info__avatar = document.createElement('img');
    post__info__avatar.src = avatar;
    var post__info__id = document.createElement('div');
    post__info__id.innerText = obj.user;
    var post__info__time = document.createElement('div');
    post__info__time.innerText = obj.time;

    var post__content = document.createElement('div');
    post__content.classList.add('post__content');
    post__content.innerText = obj.content;

    var post__comment = document.createElement('div');
    post__comment.classList.add('post__comment');

    var post__newcomment = document.createElement('div');
    post__newcomment.classList.add('post__newcomment');
    post__newcomment.data_pid = obj.pid;
    var post__newcomment__avatar = document.createElement('img');
    post__newcomment__avatar.classList.add('post__newcomment__avatar');
    post__newcomment__avatar.src = useravatar;
    var post__newcomment__textarea = document.createElement('textarea');
    post__newcomment__textarea.classList.add('post__newcomment__textarea');
    post__newcomment__textarea.placeholder = "leave your comment";
    var post__newcomment__submit = document.createElement('div');
    post__newcomment__submit.classList.add('post__newcomment__submit');
    post__newcomment__submit.innerText = "Commet"
    post__newcomment__submit.onclick = function () {
        postComment(this)
    };

    post.appendChild(post__title);
    post.appendChild(post__info);
    post.appendChild(post__content);
    post.appendChild(post__comment);
    post.appendChild(post__newcomment);

    post__info.appendChild(post__info__avatar);
    post__info.appendChild(post__info__id);
    post__info.appendChild(post__info__time);

    post__newcomment.appendChild(post__newcomment__avatar);
    post__newcomment.appendChild(post__newcomment__textarea);
    post__newcomment.appendChild(post__newcomment__submit);

    //q('.board').prepend(post);
    q('.board').appendChild(post);
}

//讀取指定數量的文章
function getPosts(_index) {
    let limit = 10;
    let index = _index ? _index : 0;
    var request = new XMLHttpRequest();
    //request.open('GET', `http://localhost/getPost.php?limit=${limit}&index=${index}`, true);
    request.open('GET', `./get/post/?limit=${limit}&index=${index}`, true);
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            let posts = [];
            var data = JSON.parse(request.responseText);
            console.log("data",data);
            for (var post in data) {
                //console.log(data[post]);
                posts.push(createPost(data[post]));
            }
            showPost(posts);
            getComments();
        } else {
            alert('無法與伺服器連線，請稍候重新嘗試')
        }
    };
    request.send();
}

//清除畫面上所有的文章
function cleanPost() {
    var board = q('.board');
    while (board.firstChild) {
        board.removeChild(board.firstChild); //聽說這樣比直接設定 board.innerHTML = ""; 要來的快，問號？
    }
    var hint = document.createElement('span');
    hint.innerText = "messgae hacking ...";
    board.appendChild(hint);
}

//發表新文章
document.querySelector('.newpost__submit').addEventListener('click', function () {
    var userid = getCookie('userid');
    var payload = {
        uid: userid ? userid : 1,
        title: q('.newpost__title+input').value,
        content: q('.newpost__content+textarea').value
    };

    var xhr = new XMLHttpRequest();
    //xhr.open("POST", "http://localhost/postPost.php");
    xhr.open("POST", "./post/post/");
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8');
    xhr.onload = function () {
        if (xhr.responseText === "success") {
            console.log("留言新增成功");
            document.querySelector('.pages div:first-child').click();
        } else {
            console.log("留言新增失敗，請連絡系統管理員");
        }
    };
    var encodedData = encodeFormData(payload);
    xhr.send(encodedData);
})

//將JSON轉成文章物件
function createComment(obj) {
    var comment = {
        pid: obj['pid'],
        user: obj['id'],
        avatar: obj['avatar'],
        content: obj['content'],
        time: obj['timestamp'],
        content_edited: obj['content_edited']
    }
    return comment;
}

//讀取 comment
function getComments() {
    let posts = document.querySelectorAll('.post');

    for (let i = 0; i < posts.length; i++) {
        //如果直接把 getComment（發 request）放在這個迴圈中會出錯，不知道為什麼
        let pid = posts.item(i).data_pid
        let post = posts.item(i)
        getComment(pid, post);
    }
}

//透過 API 取得個別文章的 Comment
function getComment(pid, post) {
    var request = new XMLHttpRequest();
    request.open('GET', `./get/comment/?pid=${pid}`, true);
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            // Success!                
            let comments = [];
            var data = JSON.parse(request.responseText);
            for (var comment in data) {
                comments.push(createComment(data[comment]));
            }
            for (let obj in comments) {
                showComment(comments[obj], post)
            }
        } else {
            //alert('無法與伺服器連線，請稍候重新嘗試')
            console.log('無法與伺服器連線，請稍候重新嘗試');
            console.log('request.responseText', request);
        };
    }
    request.send();
}


//發表新comment
function postComment(sender) {
    var postid = sender.parentNode.data_pid;
    var userid = getCookie('userid');
    var content = sender.previousElementSibling.value;

    var payload = {
        uid: userid ? userid : 1,
        pid: postid,
        content: content
    };

    var xhr = new XMLHttpRequest();
    //xhr.open("POST", "http://localhost/postComment.php", true);
    xhr.open("POST", "./post/comment/", true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8');
    xhr.onload = function () {
        if (xhr.responseText === "success") {
            console.log("Comment 新增成功");
            console.log("postid:" + postid + "sender.parentNode", sender.parentNode.parentNode);
            let post = sender.parentNode.parentNode
            cleanComment(post);
            getComment(postid, post);
            sender.previousElementSibling.value = "";
        } else {
            console.log("Comment 新增失敗，請連絡系統管理員");
        }
    };
    var encodedData = encodeFormData(payload);
    console.log(encodedData);
    xhr.send(encodedData);
}

//消除指定文章的 Comment
function cleanComment(post) {
    let comments = post.childNodes[3];
    while (comments.firstChild) {
        comments.removeChild(comments.firstChild);
    }
}


//顯示 comment
function showComment(obj, post) {
    var avatar = "./avatar" + obj.avatar + ".png";

    let comment = document.createElement('div');
    comment.classList.add('comment');
    let comment__info = document.createElement('div');
    comment__info.classList.add('comment__info');
    let comment__info__avatar = document.createElement('img')
    comment__info__avatar.classList.add('comment__info__avatar');
    comment__info__avatar.src = avatar;
    let comment__info__user = document.createElement('div')
    comment__info__user.classList.add('comment__info__user');
    comment__info__user.innerText = obj.user;
    let comment__info__time = document.createElement('div')
    comment__info__time.classList.add('comment__info__time');
    comment__info__time.innerText = obj.time;
    let comment__content = document.createElement('div');
    comment__content.classList.add('comment__content');
    comment__content.innerText = obj.content;

    comment__info.appendChild(comment__info__avatar);
    comment__info.appendChild(comment__info__user);
    comment__info.appendChild(comment__info__time);

    comment.appendChild(comment__info);
    comment.appendChild(comment__content);

    post.querySelector('.post__comment').appendChild(comment);
}

//GetPostCount 取得目前所有的文章數量
function getPostCount() {
    var request = new XMLHttpRequest();
    request.open('GET', `./get/post/getCount.php`, true);
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            let pageCount = request.responseText;
            showPages(pageCount);

        } else {
            //alert('無法與伺服器連線，請稍候重新嘗試')
            console.log('無法與伺服器連線，請稍候重新嘗試');
            console.log('request.responseText', request);
        };
    }
    request.send();
}

//顯示留言板的頁數
function showPages(count) {
    var pages = Math.floor(count / 10) + 1;

    for (let i = 1; i <= pages; i++) {
        let page = document.createElement('div');
        page.classList.add('page');
        page.innerText = i;
        page.addEventListener('click', function () {
            q('.currentPage').classList.remove('currentPage');
            this.classList.add('currentPage');
            cleanPost();
            getPosts(i - 1);
            console.log("i-1=" + (i - 1));
        });
        q('.pages').appendChild(page);
    }
    q('.page').classList.add('currentPage');
}

//登入按鈕
q('.navbar__signIn').addEventListener('click', function () {
    if (getCookie("isLogin")) {
        showLogout();
    } else {
        showLogin();
    }
});
q('.navbar__signIn').addEventListener('mouseenter', function () {
    if (getCookie("isLogin")) {
        q('.navbar__signIn').innerText = "Click to logout";
    }
});
q('.navbar__signIn').addEventListener('mouseleave', function () {
    if (getCookie("isLogin")) {
        q('.navbar__signIn').innerText = `Hello , ${getCookie("usernick")}`;
    }
});

//登入視窗
function showLogin() {
    if (document.querySelector('.loginForm')) {
        console.log("form exist");
        return;
    }

    var loginForm = document.createElement('div');
    loginForm.classList.add('loginForm');

    var loginForm__idLabel = document.createElement('div');
    loginForm__idLabel.classList.add('loginForm__idLabel');
    loginForm__idLabel.innerText = "Username";
    var loginForm__idInput = document.createElement('input');
    loginForm__idInput.classList.add('loginForm__idInput');
    loginForm__idInput.setAttribute('type', 'text');
    loginForm__idInput.placeholder = "4~12 character";
    var loginForm__pwLabel = document.createElement('div');
    loginForm__pwLabel.classList.add('loginForm__pwLabel');
    loginForm__pwLabel.innerText = "Password";
    var loginForm__pwInput = document.createElement('input');
    loginForm__pwInput.classList.add('loginForm__pwInput');
    loginForm__pwInput.setAttribute('type', 'password');
    loginForm__pwInput.placeholder = "4~12 character"
    var loginForm__submit = document.createElement('div');
    loginForm__submit.classList.add('loginForm__submit');
    loginForm__submit.innerText = "Sign In";
    loginForm__submit.addEventListener('click', function () {
        login()
    });
    var loginForm__hint = document.createElement('div');
    loginForm__hint.classList.add('loginForm__hint');
    loginForm__hint.style.display = 'none';

    var loginForm__signUp = document.createElement('div');
    loginForm__signUp.classList.add('loginForm__signUp');
    loginForm__signUp.innerText = "Sign up account right now";
    loginForm__signUp.addEventListener('click', function () {
        showSignUp()
    })

    loginForm.appendChild(loginForm__idLabel);
    loginForm.appendChild(loginForm__idInput);
    loginForm.appendChild(loginForm__pwLabel);
    loginForm.appendChild(loginForm__pwInput);
    loginForm.appendChild(loginForm__submit);
    loginForm.appendChild(loginForm__hint);
    loginForm.appendChild(loginForm__signUp);

    document.body.appendChild(loginForm);

    setTimeout(function () {
        q('.loginForm').classList.add('loginForm_show');
    }, 1);
}

//登入    
function login() {
    let id = q('.loginForm__idInput').value;
    let pw = q('.loginForm__pwInput').value;

    if (id.length > 12 || id.length < 4) {
        console.log("id.length:" + id.length)
        showLoginHint("ID must be 4~12 character");
    } else if (pw.length > 12 || pw.length < 4) {
        console.log("pw.length:" + pw.length)
        showLoginHint("Password must be 4~12 character");
    } else {
        var payload = {
            uid: id,
            upw: pw
        };
        console.log(payload);

        var xhr = new XMLHttpRequest();
        //xhr.open("POST", "http://localhost/AccountVerify.php");
        xhr.open("POST", "./AccountVerify.php");
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8');
        xhr.onload = function () {
            if (xhr.responseText === "fail") {
                showLoginHint("Sign in failed, please check ID and Password");
                console.log("登入失敗，請連絡系統管理員", xhr.responseText);
            } else {
                console.log("response ->", xhr.responseText)
                let loginUser = JSON.parse(xhr.responseText);
                console.log("登入成功", loginUser);

                loginSuccess(loginUser);
            }
        };
        var encodedData = encodeFormData(payload);
        console.log(encodedData);
        xhr.send(encodedData);
        return;
    }
    showLoginHint();
}

//顯示登入提示訊息
function showLoginHint(msg) {
    let hint = q('.loginForm__hint');
    hint.style.display = 'initial';
    hint.style.color = 'tomato';
    hint.innerText = msg ? msg : 'Registration failed, please confirm the information entered';
}

//登入成功改變留言板資訊
function loginSuccess(loginUser) {

    let userId = loginUser[0];
    let userNick = loginUser[2];
    let userAvatar = loginUser[3];

    setCookie(userId, userNick, userAvatar);
    console.log('cookies :', document.cookie);

    q('.navbar__signIn').innerText = `Hello , ${userNick}`;

    let hint = q('.loginForm__hint');
    hint.style.display = 'initial';
    hint.style.color = 'chartreuse';
    hint.innerText = 'Registration Successed';

    q('.loginForm').classList.add('loginForm_hidden');

    setTimeout(function () {
        document.body.removeChild(q('.loginForm'));
    }, 3000);

    var avatars = document.querySelectorAll('.post__newcomment__avatar');
    console.log(avatars);
    for (let avatar in avatars) {
        avatars[avatar].src = `./avatar${userAvatar}.png`;
    }
    q('.newpost__foreword').innerText = `Hi ${userNick} , wanna say something?`;
}

//登出視窗
function showLogout() {
    if (document.querySelector('.logoutForm')) {
        console.log("form exist");
        return;
    }
    var logoutForm = document.createElement('div');
    logoutForm.classList.add('logoutForm');

    var logoutForm__submit = document.createElement('div');
    logoutForm__submit.classList.add('logoutForm__submit');
    logoutForm__submit.innerText = "Logout";
    logoutForm__submit.addEventListener('click', function () {
        logout();
    });

    var logoutForm__hint = document.createElement('div');
    logoutForm__hint.classList.add('logoutForm__hint');
    logoutForm__hint.style.display = 'none';

    logoutForm.appendChild(logoutForm__submit);
    logoutForm.appendChild(logoutForm__hint);

    document.body.appendChild(logoutForm);

    setTimeout(function () {
        q('.logoutForm').classList.add('logoutForm_show');
    }, 1);
}
//登出
function logout() {
    killCookie();
    document.body.classList.add('body_hidden');
    setTimeout(function () {
        window.location.reload();
    }, 1600);
}


//註冊視窗
function showSignUp() {
    document.body.removeChild(document.querySelector('.loginForm'))

    var signUpForm = document.createElement('div');
    signUpForm.classList.add('signUpForm');

    var signUpForm__idLabel = document.createElement('div');
    signUpForm__idLabel.classList.add('signUpForm__idLabel');
    signUpForm__idLabel.innerText = "Username";
    var signUpForm__idInput = document.createElement('input');
    signUpForm__idInput.classList.add('signUpForm__idInput');
    signUpForm__idInput.setAttribute('type', 'text');
    signUpForm__idInput.placeholder = "4~12 character";
    var signUpForm__nickLabel = document.createElement('div');
    signUpForm__nickLabel.classList.add('signUpForm__nickLabel');
    signUpForm__nickLabel.innerText = "Nickname";
    var signUpForm__nickInput = document.createElement('input');
    signUpForm__nickInput.classList.add('signUpForm__nickInput');
    signUpForm__nickInput.setAttribute('type', 'text');
    signUpForm__nickInput.placeholder = "2~8 character";
    var signUpForm__pwLabel = document.createElement('div');
    signUpForm__pwLabel.classList.add('signUpForm__pwLabel');
    signUpForm__pwLabel.innerText = "Password";
    var signUpForm__pwInput = document.createElement('input');
    signUpForm__pwInput.classList.add('signUpForm__pwInput');
    signUpForm__pwInput.setAttribute('type', 'password');
    signUpForm__pwInput.placeholder = "4~12 character";
    var signUpForm__avatarHint = document.createElement('div');
    signUpForm__avatarHint.classList.add('signUpForm__avatarHint');
    signUpForm__avatarHint.innerText = "Pick your favor avatar";
    var signUpForm__submit = document.createElement('div');
    signUpForm__submit.classList.add('signUpForm__submit');
    signUpForm__submit.innerText = "Sign Up";
    signUpForm__submit.addEventListener('click', function () {
        signUp()
    });
    var signUpForm__hint = document.createElement('div');
    signUpForm__hint.classList.add('signUpForm__hint');
    signUpForm__hint.style.display = 'none';

    var signUpForm__Avatar = getAvatars();

    signUpForm.appendChild(signUpForm__idLabel);
    signUpForm.appendChild(signUpForm__idInput);
    signUpForm.appendChild(signUpForm__nickLabel);
    signUpForm.appendChild(signUpForm__nickInput);
    signUpForm.appendChild(signUpForm__pwLabel);
    signUpForm.appendChild(signUpForm__pwInput);
    signUpForm.appendChild(signUpForm__avatarHint);
    signUpForm.appendChild(signUpForm__Avatar);
    signUpForm.appendChild(signUpForm__submit);
    signUpForm.appendChild(signUpForm__hint);

    document.body.appendChild(signUpForm);

    setTimeout(function () {
        q('.signUpForm').classList.add('signUpForm_show');
    }, 1);
}

// Avatars
function getAvatars() {
    var ava = document.createElement('div');
    ava.classList.add('ava');

    var ava1 = document.createElement('label');
    ava1.classList.add('ava__lbl');
    var rbn1 = document.createElement('input');
    rbn1.classList.add('ava__rbn');
    rbn1.setAttribute('type', 'radio');
    rbn1.setAttribute('name', 'avatar');
    rbn1.setAttribute('value', '1');
    var img1 = document.createElement('img');
    img1.classList.add('ava__img');
    img1.src = "./avatar" + 1 + ".png";

    var ava2 = document.createElement('label');
    ava2.classList.add('ava__lbl');
    var rbn2 = document.createElement('input');
    rbn2.classList.add('ava__rbn');
    rbn2.setAttribute('type', 'radio');
    rbn2.setAttribute('name', 'avatar');
    rbn2.setAttribute('value', '2');
    var img2 = document.createElement('img');
    img2.classList.add('ava__img');
    img2.src = "./avatar" + 2 + ".png";

    var ava3 = document.createElement('label');
    ava3.classList.add('ava__lbl');
    var rbn3 = document.createElement('input');
    rbn3.classList.add('ava__rbn');
    rbn3.setAttribute('type', 'radio');
    rbn3.setAttribute('name', 'avatar');
    rbn3.setAttribute('value', '3');
    var img3 = document.createElement('img');
    img3.classList.add('ava__img');
    img3.src = "./avatar" + 3 + ".png";

    var ava4 = document.createElement('label');
    ava4.classList.add('ava__lbl');
    var rbn4 = document.createElement('input');
    rbn4.classList.add('ava__rbn');
    rbn4.setAttribute('type', 'radio');
    rbn4.setAttribute('name', 'avatar');
    rbn4.setAttribute('value', '4');
    var img4 = document.createElement('img');
    img4.classList.add('ava__img');
    img4.src = "./avatar" + 4 + ".png";

    var ava5 = document.createElement('label');
    ava5.classList.add('ava__lbl');
    var rbn5 = document.createElement('input');
    rbn5.classList.add('ava__rbn');
    rbn5.setAttribute('type', 'radio');
    rbn5.setAttribute('name', 'avatar');
    rbn5.setAttribute('value', '5');
    var img5 = document.createElement('img');
    img5.classList.add('ava__img');
    img5.src = "./avatar" + 5 + ".png";

    ava.appendChild(ava1);
    ava1.appendChild(rbn1);
    ava1.appendChild(img1);
    ava.appendChild(ava2);
    ava2.appendChild(rbn2);
    ava2.appendChild(img2);
    ava.appendChild(ava3);
    ava3.appendChild(rbn3);
    ava3.appendChild(img3);
    ava.appendChild(ava4);
    ava4.appendChild(rbn4);
    ava4.appendChild(img4);
    ava.appendChild(ava5);
    ava5.appendChild(rbn5);
    ava5.appendChild(img5);

    return ava;
}

//註冊
function signUp() {

    let id = q('.signUpForm__idInput').value;
    let nick = q('.signUpForm__nickInput').value;
    let pw = q('.signUpForm__pwInput').value;

    if (id.length > 12 || id.length < 4) {
        console.log("id.length:" + id.length)
    } else if (nick.length > 8 || nick.length < 2) {
        console.log("nick.length:" + nick.length)
    } else if (pw.length > 12 || pw.length < 4) {
        console.log("pw.length:" + pw.length)
    } else if (!q(".ava input[type='radio']:checked")) {

    } else {
        let avatar = q(".ava input[type='radio']:checked").value;

        var payload = {
            uid: id,
            unick: nick,
            upw: pw,
            uavatar: avatar
        };
        console.log(payload);

        var xhr = new XMLHttpRequest();
        //xhr.open("POST", "http://localhost/postUser.php");
        xhr.open("POST", "./post/user/");
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8');
        xhr.onload = function () {
            if (xhr.responseText.indexOf("success") >= 0) {
                console.log("註冊成功");
                let uid = xhr.responseText.split(",")[1];
                console.log(`uid=${uid},nick=${nick},avatar=${avatar}`);
                signUpSuccess(uid, nick, avatar);
            } else if (xhr.responseText === "idExist") {
                showSignUpHint("Registration failed: ID Exists")
            } else {
                console.log("註冊失敗，請連絡系統管理員", xhr.responseText);
            }
        };
        var encodedData = encodeFormData(payload);
        console.log(encodedData);
        xhr.send(encodedData);
        return;
    }
    showSignUpHint();
}

//註冊成功改變畫面資訊
function signUpSuccess(uid, nick, avatar) {
    let userId = uid;
    let userNick = nick;
    let userAvatar = avatar;

    q('.navbar__signIn').innerText = `Hello , ${userNick}`;

    let hint = q('.signUpForm__hint');
    hint.style.display = 'initial';
    hint.style.color = 'chartreuse';
    hint.innerText = 'Registration Successed';

    q('.signUpForm').classList.add('signUpForm_hidden');

    setTimeout(function () {
        document.body.removeChild(q('.signUpForm'));
    }, 3000);

    var avatars = document.querySelectorAll('.post__newcomment__avatar');
    console.log(avatars);
    for (let ava in avatars) {
        avatars[ava].src = `./avatar${userAvatar}.png`;
    }

    q('.newpost__foreword').innerText = `Hi ${userNick} , wanna say something?`;
}


//顯示註冊提示訊息
function showSignUpHint(msg) {
    let hint = q('.signUpForm__hint');
    hint.style.display = 'initial';
    hint.style.color = 'tomato';
    hint.innerText = msg ? msg : 'Registration failed, please confirm the information entered';
}


//偵測滑鼠是不是點在 loginForm 或 signUpForm 的範圍內
document.addEventListener('click', function (e) {
    console.log(`X: ${e.clientX} , Y: ${e.clientY}`);
    if (q('.signUpForm')) {
        if (!isInside(e, q('.signUpForm'))) {
            document.body.removeChild(q('.signUpForm'));
        }
    } else if (q('.loginForm')) {
        if (e.toElement == q('.navbar__signIn')) {
            console.log('pass2');
            return;
        }
        if (!isInside(e, q('.loginForm'))) {
            document.body.removeChild(q('.loginForm'));
        }
    } else if (q('.logoutForm')) {
        if (e.toElement == q('.navbar__signIn')) {
            console.log('pass3');
            return;
        }
        if (!isInside(e, q('.logoutForm'))) {
            document.body.removeChild(q('.logoutForm'));
        }
    }
})
//偵測滑鼠是否在參考物件的範圍
function isInside(e, obj) {
    if ((e.clientX > obj.offsetLeft && e.clientX < (obj.offsetLeft + obj.offsetWidth)) &&
        (e.clientY > obj.offsetTop && e.clientY < (obj.offsetTop + obj.offsetHeight))) {
        return true;
    }
}

//設定使用者資訊cookie
function setCookie(uid, nick, avatar) {
    let expires = new Date();
    expires.setTime(expires.getTime() + 8 * 60 * 60 * 1000);
    let limit = expires.toUTCString();
    console.log(limit);
    document.cookie = `isLogin=true; expires=${limit}`;
    document.cookie = `userid=${uid};expires=${limit}`;
    document.cookie = `usernick=${nick};expires=${limit}`;
    document.cookie = `useravatar=${avatar};expires=${limit}`;
    console.log(document.cookie);
}

//刪除使用者資訊cookie
function killCookie() {
    let expires = new Date();
    expires.setTime(expires.getTime() - 1000);
    let limit = expires.toUTCString();
    document.cookie = `isLogin=""; expires=${limit}`;
    document.cookie = `userid="";expires=${limit}`;
    document.cookie = `usernick="";expires=${limit}`;
    document.cookie = `useravatar="";expires=${limit}`;
}

//取得指定使用者資訊cookie
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

//檢查使用者資訊 cookie 並回傳 user 物件
function checkCookie() {
    if (getCookie("isLogin") == "true") {
        let user = {
            uid: getCookie("userid"),
            nick: getCookie("usernick"),
            avatar: getCookie("useravatar")
        }
        console.log("cookie-user", user);
        return user;
    }
    return "";
}

//犀牛本 Object to encodeURIComponent
function encodeFormData(data) {
    if (!data) return ""; // Always return a string
    var pairs = []; // To hold name=value pairs
    for (var name in data) { // For each name
        if (!data.hasOwnProperty(name)) continue; // Skip inherited
        if (typeof data[name] === "function") continue; // Skip methods
        var value = data[name].toString(); // Value as string
        name = encodeURIComponent(name.replace(" ", "+")); // Encode name
        //value = encodeURIComponent(value.replace(" ", "+")); // Encode value
        value = encodeURIComponent(value); // Encode value
        pairs.push(name + "=" + value); // Remember name=value pair
    }
    return pairs.join('&'); // Return joined pairs separated with &
}

//頁面讀取後先讀取留言及確認 cookie 狀態
window.addEventListener('load', function () {
    getPosts('0');
    getPostCount();

    let user = checkCookie();
    if (user) {
        q('.navbar__signIn').innerText = `Hello , ${user.nick}`;
        q('.newpost__foreword').innerText = `Hi ${user.nick} , wanna say something?`;
    }
})

//簡易選擇器
function q(selector) {
    return document.querySelector(selector);
}