import * as React from 'react'
const { useState } = React

interface selectListItem {
    name: string
}
interface TSelectChange {
    (selectIndex: number): void
}

interface SelectPro {
    list: selectListItem[],
    activeIndex: number,
    change: TSelectChange
}

export const Select = (props: SelectPro) => {
    let activeIndex = props.activeIndex
    let [selectName, setSelectName] = useState(props.list[activeIndex].name)
    let [isShow, setIsShow] = useState(false)
    let hanldeItem = (index: number): void => {
        setSelectName(props.list[index].name)
        props.change(index)
        setIsShow(false)
    }
    let tapShow = (): void => {
        setIsShow(!isShow)
    }
    const styles: any = {
        lists: {
            position: 'absolute',
            top: '1.5em',
            left: '0px',
            backgoundColor: '#fff',
            border: '1px solid #999'
        }
    }
    return <div style={{ position: 'relative' }}>
        <span onClick={tapShow}>{selectName}</span>
        {isShow && <div style={styles.lists}>
            {props.list.map((e, index) =>
                <div key={index} onClick={hanldeItem.bind(null, index)}>{e.name}</div>
            )}
        </div>
        }
    </div>
}
