import React, { ReactElement, useState } from 'react'
import { projectAstListData } from './model/constant'

interface Tproject {
    name: string,
}
let toProjectList = (path: string) => () => {
    location.href = '/#/' + path
}
let styles: any = {
    box: {
        padding: '30px',
        boxSizing:'border-box',
    },
    ghBth: {"padding":"3px 10px 3px 8px","fontSize":"16px","lineHeight":"22px","borderRadius":"4px","backgroundColor":"#eee","backgroundImage":"linear-gradient(to bottom, #fcfcfc 0, #eee 100%)","filter":"progid:DXImageTransform.Microsoft.gradient(startColorstr='#fcfcfc', endColorstr='#eeeeee', GradientType=0)","backgroundRepeat":"no-repeat","border":"1px solid #d5d5d5","color":"#333","textDecoration":"none","whiteSpace":"nowrap","cursor":"pointer"},
    ghIcon: {"width":"20px","height":"20px","top":"4px","position":"relative","display": "inline-block","marginRight":"4px","backgroundImage":"url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjQwcHgiIGhlaWdodD0iNDBweCIgdmlld0JveD0iMTIgMTIgNDAgNDAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMTIgMTIgNDAgNDAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxwYXRoIGZpbGw9IiMzMzMzMzMiIGQ9Ik0zMiAxMy40Yy0xMC41IDAtMTkgOC41LTE5IDE5YzAgOC40IDUuNSAxNS41IDEzIDE4YzEgMC4yIDEuMy0wLjQgMS4zLTAuOWMwLTAuNSAwLTEuNyAwLTMuMiBjLTUuMyAxLjEtNi40LTIuNi02LjQtMi42QzIwIDQxLjYgMTguOCA0MSAxOC44IDQxYy0xLjctMS4yIDAuMS0xLjEgMC4xLTEuMWMxLjkgMC4xIDIuOSAyIDIuOSAyYzEuNyAyLjkgNC41IDIuMSA1LjUgMS42IGMwLjItMS4yIDAuNy0yLjEgMS4yLTIuNmMtNC4yLTAuNS04LjctMi4xLTguNy05LjRjMC0yLjEgMC43LTMuNyAyLTUuMWMtMC4yLTAuNS0wLjgtMi40IDAuMi01YzAgMCAxLjYtMC41IDUuMiAyIGMxLjUtMC40IDMuMS0wLjcgNC44LTAuN2MxLjYgMCAzLjMgMC4yIDQuNyAwLjdjMy42LTIuNCA1LjItMiA1LjItMmMxIDIuNiAwLjQgNC42IDAuMiA1YzEuMiAxLjMgMiAzIDIgNS4xYzAgNy4zLTQuNSA4LjktOC43IDkuNCBjMC43IDAuNiAxLjMgMS43IDEuMyAzLjVjMCAyLjYgMCA0LjYgMCA1LjJjMCAwLjUgMC40IDEuMSAxLjMgMC45YzcuNS0yLjYgMTMtOS43IDEzLTE4LjFDNTEgMjEuOSA0Mi41IDEzLjQgMzIgMTMuNHoiLz48L3N2Zz4=)","backgroundSize":"100% 100%","backgroundRepeat":"no-repeat"},
    ghText: {"whiteSpace":"nowrap","fontSize":"16px","lineHeight":"22px","color":"#333"},
}
let getStars = (githubName: string, cb: (star: number) => 0) => {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', 'https://api.github.com/repos/' + githubName, true)
    xhr.onload = (e: any) => {
        var stargazers_count = JSON.parse(e.currentTarget.responseText).stargazers_count
        cb && cb(stargazers_count)
    }
    xhr.send(null)
}
export default (): ReactElement => {
    let [star, setstar] = useState(0)
    let githubName = '0123cf/layout-ui'

    star || getStars(githubName, (star) => {
        setstar(star)
        return 0
    })

    return <div className="homeIndex" style={styles.box}>
        <div className="head">
            <div className="logo">
                <img className="logo-ipc" src="https://github.com/0123cf/layout-ui/blob/master/logo.png?raw=true" />
            </div>
        </div>
        <h1 className="title">Layout-UI</h1>
        <div className="text-wrapper">
            <span>在线可视化布局工具, 支持相对布局\ 绝对布局\ 弹性布局, 自适应可视化布局. 适用于专业人员开发专业界面, 适用于经过简单培训设计师使用.</span>
        </div>
        <div className="github-btn github-btn-large">
            <button type="button" onClick={toProjectList('index')} className="ant-btn banner-btn components ant-btn-primary"><span>开始使用</span></button>
            <button type="button" className="ant-btn banner-btn language"><span>教程(暂未编写)</span></button>
            <a style={styles.ghBth} href={`//github.com/${githubName}/`} target="_blank">
                <span style={styles.ghIcon} aria-hidden="true"></span>
                <span style={styles.ghText}>Star</span>
            </a>
            <a className="gh-count" target="_blank" href={`//github.com/${githubName}/stargazers/`}>{star}</a>
        </div>
    </div>
}