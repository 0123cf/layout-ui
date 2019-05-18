import * as React from 'react'
import { Modal, Input, message } from 'antd'
import { projectAstListData } from '../model/constant'

const confirm = Modal.confirm
declare var window: any

export const showSaveConfirm = () => {
    let projectName = ''
    let tipStyle = {
        color: '#959595',
        marginTop: '20px'
    }
    confirm({
    icon: <div></div>,
      title: '确认保存',
      okText: '保存',
      cancelText: '等下保存',
      content: <div>
          <p style={tipStyle}>请输入<span style={{color: 'rgb(255, 150, 150)'}}>字母(a-z A-Z)</span>，其他字符不会被保存（中文、数字、下划线、横杆）</p>
          <Input placeholder="请输入项目名称" onInput={(e: any) => {
                projectName = e.target.value
          }} />
      </div>,
      onOk() {
        return new Promise((resolve, reject) => {
            let name = projectName.replace(/[^a-zA-Z]/g,'')
            let astStr = ''
            let saveName = `${projectAstListData}_${name}`
            if(!name){
                message.error('项目名不能为空')
                reject()
                return
            }
            if(Object.keys(localStorage).includes(saveName)){
                message.error('项目已存在')
                reject()
                return
            }
            if(window.Store.getState().previewAST.length === 0){
                message.error('未添加任何组件，空空如也，请稍后再试~')
                reject()
                return
            }
            astStr = JSON.stringify(window.Store.getState().previewAST)
            localStorage.setItem(saveName, astStr)
            message.success('保存成功')
            resolve()
        }).catch(() => 0)
      },
      onCancel() {},
    })
}