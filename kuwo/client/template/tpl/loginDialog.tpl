<form action="" ng-submit="submit()">
    <div class="ngdialog-message">
        <h3>酷我音乐2015 <i>听音乐用酷我</i></h3>
            <input type="text" ng-model="user.name">
            <input type="password" ng-model="user.password">
            <input type="checkbox"> 自动登录
            <input type="checkbox"> 记住密码
    </div>
    <div class="ngdialog-buttons">
        <button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="register()">注册</button>
        <button type="submit" class="ngdialog-button ngdialog-button-primary">登录</button>
        <a href="#">找回密码</a>
    </div>
</form>