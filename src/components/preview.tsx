import * as React from 'react'
interface PreviewPro {
    html: string
}
export const Preview = (props: PreviewPro) => {
    return <div className="preview">
        <div className="title">preview</div>
        <div className="preview-box" dangerouslySetInnerHTML={{__html: props.html}}></div>
        <div>html</div>
        <div>
            <textarea value={props.html}></textarea>
        </div>
    </div>
}