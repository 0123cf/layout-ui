import React, { ReactElement, useState } from 'react'
import { projectAstListData } from './model/constant'
import style from 'react-syntax-highlighter/dist/styles/hljs/atelier-seaside-light';

interface Tproject {
    name: string,
}
let toAL = (path: string) => () => {
    location.href = '/#/al' + path
    location.reload()
}
let styles: any = {
    box: {
        padding: '20px',
        boxSizing:'border-box',
    },
    list: {
        border: '1px solid #dadce0',
        boxSizing:'border-box',
        padding: '13px 16px',
        borderRadius: '6px',    
        display: 'inline-block',
        marginRight: '20px'
    },
    button: {
        "boxShadow": "0 1px 2px 0 rgba(60,64,67,0.302), 0 1px 3px 1px rgba(60,64,67,0.149)",
        "alignItems": "center",
        "backgroundColor": "#fff",
        "backgroundImage": "none",
        "border": "1px solid transparent",
        "borderRadius": "24px",
        "color": "#3c4043",
        "fontFamily": "'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif",
        "fontWeight": "500",
        "fontSize": "14px",
        "height": "48px",
        "letterSpacing": ".15px",
        "lineHeight": "22px",
        "margin": "0",
        "minWidth": "120px",
        "padding": "0 24px 0 5px",
        "textTransform": "none",
        "width": "7em",
        "textAlign": "center",    
        "whiteSpace": 'nowrap'
    },
    addIcon: {
        "borderRadius": "50%",
        "borderWidth": "0",
        "display": "block",
        "margin": "0 15px 0 9px",
        "position": "relative",
        "height": "36px",
        "WebkitBoxShadow": "none",
        "boxShadow": "none",
        "opacity": "1"
    }
}
export default (): ReactElement => {
    let defaultProjectList: Tproject[] = Object.keys(localStorage)
        .filter((key) => 
            key.substr(0, projectAstListData.length) === projectAstListData
        )
        .map(e => ({name: e}))
    let [projectList, setprojectList] = useState(defaultProjectList)
    return <div style={styles.box}>
        <h1>project list</h1>
        <ul>
            {
                projectList.length > 0 ? projectList.map((project: Tproject): ReactElement => {
                    return <li 
                        style={styles.list} 
                        onClick={toAL(`?projectname=${project.name}`)} 
                        key={project.name}>{project.name}</li>
                })
                : <div>暂无项目</div>
            }
        </ul>
        <div style={styles.button} onClick={toAL('')} className="flex flex-center-y">
            <img style={style.addIcon} src='data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><path fill="%2334A853" d="M16 16v14h4V20z"/><path fill="%234285F4" d="M30 16H20l-4 4h14z"/><path fill="%23FBBC05" d="M6 16v4h10l4-4z"/><path fill="%23EA4335" d="M20 16V6h-4v14z"/><path fill="none" d="M0 0h36v36H0z"/></svg>' />
            <span>新建项目</span>
        </div>
    </div>
}