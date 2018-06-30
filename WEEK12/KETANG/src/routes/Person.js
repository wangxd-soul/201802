import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route, Redirect} from 'react-router-dom';

/*IMPORT COMPONENT*/
import Login from './person/Login';
import Register from './person/Register';
import Info from './person/Info';
import Tip from './person/Tip';

/*IMPORT API*/
import {checkLogin} from '../api/person';
import '../static/css/person.less';

/*RENDER*/
class Person extends React.Component {
    constructor(props, context) {
        super(props, context);

        //=>STATE
        this.state = {
            isLogin: false
        };
    }

    //=>验证是否登录
    async componentWillMount() {
        let result = await checkLogin(),
            isLogin = parseFloat(result.code) === 0 ? true : false;
        this.setState({isLogin});
    }

    render() {
        return <section>
            <Switch>
                {/*
                //=>路由的验证和渲染是同步的，不允许在校验中出现异步，因为这样在异步没有完成之前，根本不知道渲染谁，语法不支持这样的操作
                <Route path='/person/info' render={async () => {
                    //=>是否登录的权限校验
                    let result = await checkLogin();
                    if (parseFloat(result.code) === 0) {
                        return <Info/>;
                    }
                    return <Tip/>;
                }}/>
                */}
                <Route path='/person/info' render={() => {
                    //=>基于RENDER返回的组件不是受路由管控的组件
                    if (this.state.isLogin) {
                        return <Info/>;
                    }
                    return <Tip/>;
                }}/>
                <Route path='/person/login' component={Login}/>
                <Route path='/person/register' component={Register}/>
                <Redirect from='/person' to='/person/info'/>
            </Switch>
        </section>;
    }
}

export default connect()(Person);